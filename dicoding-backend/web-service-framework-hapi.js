// Membuat http server
const Hapi = require('@hapi/hapi');
 
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });
 
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();

// Membuat Method/Ver Request dan Routing
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
 
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });
    
    // tambahkan routing di sini
    server.route(routes);
 
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// Route.js
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    // Method Path Parameter
    {
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
           const { name = "stranger" } = request.params;
           
           // Method with Query Parameter
           const { lang } = request.query;
 
           if(lang === 'id') {
               return `Hai, ${name}!`;
           }
            
           return `Hello, ${name}!`;
       },
    },
    // Body/Payload Request
    // Hapi secara default akan mengubah payload JSON menjadi objek JavaScript. Dengan begitu, Anda tak lagi berurusan dengan JSON.parse()!
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `Welcome ${username}!`;
        },
    },
    
    // Response Toolkit
    // Ketika Anda butuh mengubah nilai status response, di situlah Anda membutuhkan parameter h.
    {
        method: 'POST',
        path: '/user',
        handler: (request, h) => {
            return h.response('created').code(201);
        },
    }
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];
 
module.exports = routes;


// Menetapkan header response dengan 2 cara

// Detailed notation
const handler = (request, h) => {
    const response = h.response('success');
    response.type('text/plain');
    response.header('X-Custom', 'some-value');
    return response;
};
 
// Chained notation
const handler = (request, h) => {
    return h.response('success')
        .type('text/plain')
        .header('X-Custom', 'some-value');
};

