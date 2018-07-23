import assign from 'object-assign';
import invariant from 'invariant';

export function noop({ type, ...rest} = {}) {
    invariant(type, 'No-op must have a type');

    return {
        type,
        noop: true,
        ...rest,
    };
}

export function createService(name, params) {
    return {
        type: 'create-service',
        endpoint: {name: 'services'},
        method: 'POST',
        body: assign({}, params, {name})
    };
}

export function removeService(name) {
    return {
        type: 'remove-service',
        endpoint: {name: 'service', params: {name}},
        method: 'DELETE',
    };
}

export function updateService(name, params) {
    return {
        type: 'update-service',
        endpoint: {name: 'service', params: {name}},
        method: 'PATCH',
        body: params
    };
}

export function addServicePlugin(serviceId, pluginName, params) {
    return {
        type: 'add-service-plugin',
        endpoint: {name: 'service-plugins', params: {serviceId, pluginName}},
        method: 'POST',
        body: assign({}, params, {name: pluginName})
    };
}

export function removeServicePlugin(serviceId, pluginId) {
    return {
        type: 'remove-service-plugin',
        endpoint: {name: 'service-plugin', params: {serviceId, pluginId}},
        method: 'DELETE',
    };
}

export function updateServicePlugin(serviceId, pluginId, params) {
    return {
        type: 'update-service-plugin',
        endpoint: {name: 'service-plugin', params: {serviceId, pluginId}},
        method: 'PATCH',
        body: params
    };
}

export function createRoute(serviceName, params) {
    return {
        type: 'create-route',
        endpoint: {name: 'routes'},
        method: 'POST',
        body: assign({}, params, {serviceName})
    };
}

export function removeRoute(name) {
    return {
        type: 'remove-route',
        endpoint: {name: 'route', params: {name}},
        method: 'DELETE',
    };
}

export function updateRoute(name, params) {
    return {
        type: 'update-route',
        endpoint: {name: 'route', params: {name}},
        method: 'PATCH',
        body: params
    };
}

export function addRoutePlugin(routeId, pluginName, params) {
    return {
        type: 'add-route-plugin',
        endpoint: {name: 'route-plugins', params: {routeId, pluginName}},
        method: 'POST',
        body: assign({}, params, {name: pluginName})
    };
}

export function removeRoutePlugin(routeId, pluginId) {
    return {
        type: 'remove-route-plugin',
        endpoint: {name: 'route-plugin', params: {routeId, pluginId}},
        method: 'DELETE',
    };
}

export function updateRoutePlugin(routeId, pluginId, params) {
    return {
        type: 'update-route-plugin',
        endpoint: {name: 'route-plugin', params: {routeId, pluginId}},
        method: 'PATCH',
        body: params
    };
}

export function createApi(name, params) {
    return {
        type: 'create-api',
        endpoint: {name: 'apis'},
        method: 'POST',
        body: assign({}, params, {name})
    };
}

export function removeApi(name) {
    return {
        type: 'remove-api',
        endpoint: {name: 'api', params: {name}},
        method: 'DELETE',
    };
}

export function updateApi(name, params) {
    return {
        type: 'update-api',
        endpoint: {name: 'api', params: {name}},
        method: 'PATCH',
        body: params
    };
}

export function addApiPlugin(apiId, pluginName, params) {
    return {
        type: 'add-api-plugin',
        endpoint: {name: 'api-plugins', params: {apiId, pluginName}},
        method: 'POST',
        body: assign({}, params, {name: pluginName})
    };
}

export function removeApiPlugin(apiId, pluginId) {
    return {
        type: 'remove-api-plugin',
        endpoint: {name: 'api-plugin', params: {apiId, pluginId}},
        method: 'DELETE',
    };
}

export function updateApiPlugin(apiId, pluginId, params) {
    return {
        type: 'update-api-plugin',
        endpoint: {name: 'api-plugin', params: {apiId, pluginId}},
        method: 'PATCH',
        body: params
    };
}

export function addGlobalPlugin(pluginName, params) {
    return {
        type: 'add-global-plugin',
        endpoint: {name: 'plugins', params: {pluginName}},
        method: 'POST',
        body: assign({}, params, {name: pluginName})
    };
}

export function removeGlobalPlugin(pluginId) {
    return {
        type: 'remove-global-plugin',
        endpoint: {name: 'plugin', params: {pluginId}},
        method: 'DELETE',
    };
}

export function updateGlobalPlugin(pluginId, params) {
    return {
        type: 'update-global-plugin',
        endpoint: {name: 'plugin', params: {pluginId}},
        method: 'PATCH',
        body: params
    };
}

export function createConsumer(username, custom_id) {
    return {
        type: 'create-customer',
        endpoint: { name: 'consumers' },
        method: 'POST',
        body: { username, custom_id }
    };
}

export function updateConsumer(consumerId, params) {
    return {
        type: 'update-customer',
        endpoint: {name: 'consumer', params: {consumerId}},
        method: 'PATCH',
        body: params
    };
}

export function removeConsumer(consumerId) {
    return {
        type: 'remove-customer',
        endpoint: {name: 'consumer', params: {consumerId}},
        method: 'DELETE'
    };
}

export function addConsumerCredentials(consumerId, plugin, params) {
    return {
        type: 'add-customer-credential',
        endpoint: {name: 'consumer-credentials', params: {consumerId, plugin}},
        method: 'POST',
        body: params
    };
}

export function updateConsumerCredentials(consumerId, plugin, credentialId, params) {
    return {
        type: 'update-customer-credential',
        endpoint: {name: 'consumer-credential', params: {consumerId, plugin, credentialId}},
        method: 'PATCH',
        body: params
    };
}

export function removeConsumerCredentials(consumerId, plugin, credentialId) {
    return {
        type: 'remove-customer-credential',
        endpoint: {name: 'consumer-credential', params: {consumerId, plugin, credentialId}},
        method: 'DELETE'
    };
}

export function addConsumerAcls(consumerId, groupName) {
    return {
        type: 'add-customer-acls',
        endpoint: {name: 'consumer-acls', params: {consumerId}},
        method: 'POST',
        body: {
            group: groupName
        }
    };
}

export function removeConsumerAcls(consumerId, aclId) {
    return {
        type: 'remove-customer-acls',
        endpoint: {name: 'consumer-acl', params: {consumerId, aclId}},
        method: 'DELETE'
    };
}
