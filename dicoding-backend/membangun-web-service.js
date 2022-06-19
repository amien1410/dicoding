// MEMBANGUN WEB SERVICE DENGAN NODEJS

// 1 - Membuat HTTP Service

const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
 
    response.statusCode = 200;
    response.end('<h1>Halo HTTP Server!</h1>');
};
 
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// 2 - Method/Verb Request

const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    const { method } = request;
 
    if(method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }
 
    if(method === 'POST') {
        response.end('<h1>Hai!</h1>');
    }
 
    if(method === 'PUT') {
        response.end('<h1>Bonjour!</h1>');
    }
 
    if(method === 'DELETE') {
        response.end('<h1>Salam!</h1>');
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// 3 - Body Request

const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    const { method } = request;
 
    if(method === 'GET') {
        response.end('<h1>Hello!</h1>');
    }
 
    if(method === 'POST') {
        let body = [];
 
        request.on('data', (chunk) => {
          body.push(chunk);
        });

        request.on('end', () => {
          body = Buffer.concat(body).toString();
          const { name } = JSON.parse(body);
          response.end(`<h1>Hai, ${name}!</h1>`);
        });
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// 4 - Routing Request

const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;
 
    const { method, url } = request;
 
    if(url === '/') {
        if(method === 'GET') {
            response.end('<h1>Ini adalah homepage</h1>');
        } else {
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }
    } else if(url === '/about') {
        if(method === 'GET') {
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
        } else if(method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    } else {
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

// 5 - Response Status, Header & Body

const http = require('http');
 
const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');
 
    const { method, url } = request;
 
    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else if(url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        } else if(method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method}, request`
            }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

/**
Web Framework adalah sebuah kerangka yang dapat membantu mempermudah pengembangan web termasuk dalam membuat web server. 
Dengan menggunakan framework, penulisan kode akan lebih terstruktur, mudah dipelihara, dan gampang dikembangkan.  

Web Framework menyediakan sekumpulan tools dan library yang dapat menyederhanakan hal-hal yang sering dilakukan dalam pengembangan web, 
seperti pembuatan server, routing, menangani permintaan, interaksi dengan database, otorisasi, hingga meningkatkan ketahanan web dari serangan luar.

Expressjs merupakan web framework tertua dan terpopuler di Node.js saat ini. Framework ini sangat ringan, 
mudah diintegrasikan dengan aplikasi web front-end, dan penulisan kodenya tidak jauh beda dengan Node.js native. 

Namun karena sifat ringannya tersebut, ia menjadi framework yang unopinionated alias tidak memiliki aturan untuk menggunakannya. 
Express tidak menyediakan struktur atau kerangka kerja yang baku untuk diikuti oleh developer. 
Sehingga, developer menjadi sulit menentukan seperti apa kode yang optimal.

Framework lainnya seperti Hapi menyediakan environment yang lengkap untuk mengembangkan web server yang kompleks. 
Bila menggunakan Hapi, kita tak perlu tools lain untuk menerapkan layer authentication, tokenize, cors, dan lain sebagainya. 

Kelemahan Hapi adalah abstraksinya yang terlalu jauh dari Node.js native. Kita perlu belajar secara dalam, untuk menguasai framework ini.

Penggunaan framework menjadi pilihan personal. Salah satu faktornya adalah kasus yang hendak Anda hadapi. 
Ketika ingin membangun server yang sederhana, katakanlah untuk mendukung aplikasi front-end di-render di sisi server, express adalah pilihan yang tepat. 

Namun, bila Anda ingin membangun web server yang kompleks tanpa membutuhkan effort yang besar, Hapi adalah pilihan yang tepat.
*//
