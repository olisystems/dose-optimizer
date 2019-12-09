"use strict";
// imports and constants
// -----------------------------------------------
var http = require('http');
var app = require('./app');
var config = require('./config');
require('dotenv').config();
http.globalAgent.maxSockets = Infinity;
// server
// -----------------------------------------------
// port
var port = process.env.SERVER_PORT || config.api.ports.dev;
if (process.env.NODE_ENV !== 'production') {
    port = process.env.SERVER_PORT || config.api.ports.prod;
}
// http
var server = http.createServer(app);
server.listen(port);
console.log("server is running on port: " + port);
if (process.env.NODE_ENV === 'development') {
    console.log('developer mode');
}
else {
    console.log('production mode');
}
