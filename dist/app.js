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
//​var session = require('express-session');
//​var Keycloak = require('keycloak-connect');
var routes = require('./api/routes');
var app = express();
// app setups
// -----------------------------------------------
// console logs
app.get('env');
if (process.env.NODE_ENV !== 'production') {
    console.log('in dev');
    app.use(morgan("dev"));
}
// include keycloak
var memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
var keycloak = new Keycloak({
    store: memoryStore
});
app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
}));
// parse response bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// compress response bodies 
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
// -----------------------------------------------
// TODO: Remove for production version
app.use('/', express.static('./test/optimization-plots'));
// request routes
// -----------------------------------------------
app.use('/v1', routes);
// errors
// -----------------------------------------------
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
