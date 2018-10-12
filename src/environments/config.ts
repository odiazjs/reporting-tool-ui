/**
 * Example config file,
 * replace with your own
 * url configuration json object.
 */
// http://192.168.0.134:8000/api/v1/orders
const configFile = {
    'protocol': 'http',
    'scheme': 'Bearer',
    'api': {
        'baseUrl': 'localhost:8000/api',
        'apiVersion': 'v1'
    },
    'urlConfig': {
        'auth': {
            'version': 'v1',
            'url': 'localhost:8000/api',
            'signup': 'signup',
            'loginEndpoint': 'auth/token',
            'logoutEndpoint': 'auth/logout',
            'refreshTokenEndpoint': 'auth/refresh'
        },
        'orders': {
            'getAllOrders': 'orders'
        },
        'products': {
            'getAllProducts': 'products'
        }
    }
};

const {
    protocol,
    api: {
        baseUrl,
        apiVersion
    },
    urlConfig: {
        auth: { url, version, loginEndpoint },
        orders: { getAllOrders },
        products: { getAllProducts }
    }
} = configFile;

export const urlConfig = {
    getOrdersUrl: `${protocol}://${baseUrl}/${apiVersion}/${getAllOrders}`,
    getProductsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getAllProducts}`
};

