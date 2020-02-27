"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var compression = require("compression");
var session = require("express-session");
var Keycloak = require("keycloak-connect");
var routes = require('./api/rest/routes');
// app setups
// -----------------------------------------------
// express
var app = express();
// env
app.get('env');
if (process.env.NODE_ENV !== 'production') {
    console.log('dev mode');
    app.use(morgan("dev"));
}
// keycloak
var memoryStore = new session.MemoryStore();
var kcConfig = {
    clientId: 'tutorial-backend',
    bearerOnly: true,
    serverUrl: 'http://localhost:3015/auth/',
    realm: 'oli',
    sslRequired: "external"
};
var keycloak = new Keycloak({ store: memoryStore }, kcConfig);
app.use(session({
    secret: 'cf08c63a-ca0f-4598-a78d-faf021ce9a12',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(keycloak.middleware());
// parse response bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// compression
app.use(compression());
// cors configurations
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// test website for optoimization-plots
// TODO: Remove for production version
app.use('/test', express.static('./test/optimization-plots'));
// request routes
app.use('/v1', routes);
// api tests routes
app.get('/test/public', function (req, res, next) {
    res.status(200).json({ "status": "200", "type": "public" });
});
app.get('/test/protected', keycloak.protect(), function (req, res, next) {
    res.status(200).json({ "status": "200", "type": "protected" });
});
// errors
app.use(function (req, res, next) {
    var error = new Error("Not found");
    res.status(404).json({
        error: {
            message: error.message
        }
    });
});
// exports
// -----------------------------------------------
module.exports = app;
