const http = require("http");
const sessions = require("client-sessions");

const DB = require("./app/db");
const Config = require("./app/config");

const middleware = require("./routes/middleware");
const {GameManager} = require("./app/game");

let server = null;

const runSession = sessions({
    cookieName: 'session',
    secret: 'secretkey',
    duration: 7 * 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
});

DB.connect(Config.DB_SCHEME + Config.DB_LOGIN + ':' + Config.DB_PASSWORD + Config.DB_URL, Config.DB_NAME, (err) => {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        /**
         * Create HTTP server.
         */

        console.log('Connected ok on port: ' + Config.PORT);

        server = http.createServer((req, res) => {

            runSession(req, res, () => {
                GameManager.init();

                middleware(req, res);
            });

        });
        server.listen(Config.PORT, Config.HOST);

        server.on('error', onError);
    }
});

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    try{
        DB.get().close();
    }catch(e){

    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}