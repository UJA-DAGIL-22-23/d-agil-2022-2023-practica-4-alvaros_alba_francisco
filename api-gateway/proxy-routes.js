/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/halterofilia',
        proxy: {
            target: "http://localhost:8007",
            changeOrigin: true,
            pathRewrite: {
                [`^/halterofilia`]: '',
            },
        }
    },
    {
        url: '/volley',
        proxy: {
            target: "http://localhost:8074",
            changeOrigin: true,
            pathRewrite: {
                [`^/volley`]: '',
            },
        }
    },
    {
        url: '/surferos',
        proxy: {
            target: "http://localhost:8023",
            changeOrigin: true,
            pathRewrite: {
                [`^/surferos`]: '',
            },
        }
    },
    {
        url: '/voleyPlaya',
        proxy: {
            target: "http://localhost:8033",
            changeOrigin: true,
            pathRewrite: {
                [`^/voleyPlaya`]: '',
            },
        }
    } 
    
]

exports.routes = ROUTES;