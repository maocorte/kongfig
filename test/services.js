import expect from 'expect.js';
import {services, servicePlugins, serviceRoutes, routePlugins} from '../src/core.js';
import {
    noop,
    createService,
    removeService,
    updateService,
    addServicePlugin,
    removeServicePlugin,
    updateServicePlugin,
    createRoute,
    removeRoute,
    updateRoute,
    addRoutePlugin,
    removeRoutePlugin,
    updateRoutePlugin
} from '../src/actions.js';

describe("services", () => {
    it("should add new service using url attribute", () => {
        var actual = services([{
            "ensure": "present",
            "name": "service-by-url",
            "attributes": {
                "url": "bar"
            }
        }])
        .map(x => x({hasService: () => false}));

        expect(actual).to.be.eql([
            createService('service-by-url', {url: "bar"})
        ]);
    });

    it("should add new service using host attribute", () => {
        var actual = services([{
            "ensure": "present",
            "name": "service-by-host",
            "attributes": {
                "host": "foo"
            }
        }])
        .map(x => x({hasService: () => false}));

        expect(actual).to.be.eql([
            createService('service-by-host', {host: "foo"})
        ]);
    });

    it("should remove service", () => {
        var actual = services([{
            "ensure": "removed",
            "name": "service-by-url",
            "attributes": {
                "url": "bar"
            }
        }])
        .map(x => x({hasService: () => true}));

        expect(actual).to.be.eql([
            removeService('service-by-url')
        ]);
    });

    it("should do no op if service is already removed", () => {
        const service = {
            "ensure": "removed",
            "name": "service-by-url",
            "attributes": {
                "url": "bar"
            }
        };
        var actual = services([service])
        .map(x => x({hasService: () => false}));

        expect(actual).to.be.eql([
            noop({ type: 'noop-service', service })
        ]);
    });

    it("should update service", () => {
        var actual = services([{
            "ensure": "present",
            "name": "service-by-host",
            "attributes": {
                "host": "foo.bar"
            }
        }])
        .map(x => x({hasService: () => true, isServiceUpToDate: () => false}));

        expect(actual).to.be.eql([
            updateService('service-by-host', {host: "foo.bar"})
        ]);
    });

    it("should validate ensure enum", () => {
        expect(() => services([{
            "ensure": "not-valid",
            "name": "not-working"
        }])).to.throwException(/Invalid ensure/);
    });

    it('should add service with plugins', () => {
        var actual = services([{
            "ensure": "present",
            "name": "service-by-host",
            "attributes": {
                "host": "foo.bar"
            },
            'plugins': [{
                "name": 'cors',
                "ensure": "present",
                'attributes': {
                    'config.foo': "bar"
                }
            }]
        }]).map(x => x({
            hasService: () => false,
            hasServicePlugin: () => false,
            getServiceId: () => 'abcd-1234'
        }));

        expect(actual).to.be.eql([
            createService('service-by-host', {host: "foo.bar"}),
            addServicePlugin('abcd-1234', 'cors', {'config.foo': "bar"})
        ]);
    });

    describe("plugins", () => {
        it("should add a plugin to a service", () => {
            var actual = servicePlugins(
                'leads', [{
                    "name": "cors",
                    'attributes': {
                        "config.foo": 'bar'
                    }}]
            ).map(x => x({hasServicePlugin: () => false, getServiceId: () => 'abcd-1234'}));

            expect(actual).to.be.eql([
                addServicePlugin('abcd-1234', 'cors', {"config.foo": 'bar'})
            ]);
        });

        it("should remove service plugin", () => {
            var actual = servicePlugins(
                'leads', [{
                    "name": "cors",
                    "ensure": "removed"}]
            ).map(x => x({
                hasServicePlugin: () => true,
                getServicePluginId: () => 123,
                getServiceId: () => 'abcd-1234',
            }));

            expect(actual).to.be.eql([
                removeServicePlugin('abcd-1234', 123)
            ]);
        });

        it('should update service plugin', () => {
            var actual = servicePlugins(
                'leads', [{
                    'name': 'cors',
                    'attributes': {
                        'config.foo': 'bar'
                    }}]
            ).map(x => x({
                hasServicePlugin: () => true,
                getServicePluginId: () => 123,
                getServiceId: () => 'abcd-1234',
                isServicePluginUpToDate: () => false
            }));

            expect(actual).to.be.eql([
                updateServicePlugin('abcd-1234', 123, {'config.foo': 'bar'})
            ])
        });

        it("should validate ensure enum", () => {
            expect(() => servicePlugins("leads", [{
                "ensure": "not-valid",
                "name": "leads"
            }])).to.throwException(/Invalid ensure/);
        });
    });

    describe("routes", () => {
        it("should add a route to a service", () => {
            var actual = serviceRoutes(
                'leads', [{
                    'attributes': {
                        "paths": ["/"]
                    }}]
            ).map(x => x({hasServiceRoute: () => false}));

            expect(actual).to.be.eql([
                createRoute('leads', {"paths": ["/"]})
            ]);
        });

        it("should remove service route", () => {
            var actual = serviceRoutes(
                'leads', [{
                    'attributes': {
                        "paths": ["/"]
                    },
                    "ensure": "removed"}]
            ).map(x => x({
                hasServiceRoute: () => true,
                getServiceRouteId: () => 123
            }));

            expect(actual).to.be.eql([
                removeRoute(123)
            ]);
        });

        it("should do no op if route is already removed", () => {
            const route = {
                'attributes': {
                    "paths": ["/"]
                },
                "ensure": "removed"
            };
            var actual = serviceRoutes('leads', [route])
            .map(x => x({hasServiceRoute: () => false}));
    
            expect(actual).to.be.eql([
                noop({ type: 'noop-route', route })
            ]);
        });

        it('should update service plugin', () => {
            var actual = serviceRoutes(
                'leads', [{
                    'attributes': {
                        "paths": ["/bar"]
                    }}]
            ).map(x => x({
                hasServiceRoute: () => true,
                getServiceRouteId: () => 123,
                isServiceRouteUpToDate: () => false
            }));

            expect(actual).to.be.eql([
                updateRoute(123, {'paths': ["/bar"]})
            ])
        });

        it("should validate ensure enum", () => {
            expect(() => serviceRoutes("leads", [{
                'attributes': {
                    "paths": ["/"]
                },
                "ensure": "not-valid"
            }])).to.throwException(/Invalid ensure/);
        });

        describe("plugins", () => {
            it("should add a plugin to a route", () => {
                true
            });

            it("should remove route plugin", () => {
                true
            });
    
            it('should update route plugin', () => {
                true
            });
    
            it("should validate ensure enum", () => {
                expect(() => routePlugins("leads", [{
                    "ensure": "not-valid",
                    "id": "leads"
                }])).to.throwException(/Invalid ensure/);
            });
        });
    });
});