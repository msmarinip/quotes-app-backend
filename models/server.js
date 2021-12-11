const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            author: '/api/author',
            genre: '/api/genre',
            book: '/api/book',
            keyWords: '/api/keyWords',
            quotes: '/api/quotes',
            search: '/api/search'
        }
        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );
    }
    //Rutas
    routes() {
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.author, require('../routes/author'));
        this.app.use(this.paths.genre, require('../routes/genre'));
        this.app.use(this.paths.book, require('../routes/book'));
        this.app.use(this.paths.keyWords, require('../routes/keyWords'));
        this.app.use(this.paths.quotes, require('../routes/quotes'));
        this.app.use(this.paths.search, require('../routes/search'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`)
        })
    }
}

module.exports = Server;