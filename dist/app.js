"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var compression = require("compression");
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