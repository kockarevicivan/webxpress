const expressApp = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || ["http://localhost:3000/"].indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const logLevels = {
    FATAL: "fatal",
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
    TRACE: "trace",
    ALL: "all",
};

class Server {
    constructor() {
        process.on('exit', this.exitHandler);

        // Catches Ctrl+c event.
        process.on('SIGINT', this.exitHandler);

        // Catches "kill pid" (for example: nodemon restart).
        process.on('SIGUSR1', this.exitHandler);
        process.on('SIGUSR2', this.exitHandler);

        // Catches uncaught exceptions.
        process.on('uncaughtException', this.exitHandler);

        expressApp.options('*', cors());
    }

    get = (route, handler) => expressApp.get(route, cors(corsOptions), (...params) => this.executeHandler(handler, params));
    post = (route, handler) => expressApp.post(route, cors(corsOptions), (...params) => this.executeHandler(handler, params));
    put = (route, handler) => expressApp.put(route, cors(corsOptions), (...params) => this.executeHandler(handler, params));
    patch = (route, handler) => expressApp.patch(route, cors(corsOptions), (...params) => this.executeHandler(handler, params));
    delete = (route, handler) => expressApp.delete(route, cors(corsOptions), (...params) => this.executeHandler(handler, params));

    start = (port) => {
        expressApp.listen(port, this.onStart);
    }

    log = (object, level = logLevels.INFO) => {
        this.onLog(object, level);
    }

    executeHandler = (handler, params) => {
        try {
            handler(...params);
        } catch (error) {
            this.onError(error, params[0], params[1]);
        }
    }

    exitHandler = () => {
        this.onEnd();

        process.exit();
    }


    // Overridable events.
    onStart = () => {
        console.log(`\n\n\n\n*********************\n\nApp running...\n\n*********************`);
    }

    onClose = () => {
        console.log(`\n\n\n\n*********************\n\nApp stopping...\n\n*********************`);
    }

    onError = (error, request, response) => {
        response.send(error);
    }

    onLog = (object, level = logLevels.INFO) => {
        console.log(level + ": ", object);
    }
}

const server = new Server();

module.exports.app = server;

module.exports.get = server.get;
module.exports.post = server.post;
module.exports.put = server.put;
module.exports.patch = server.patch;
module.exports.delete = server.delete;

module.exports.log = server.log;