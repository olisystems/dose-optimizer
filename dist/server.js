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
var port = process.env.SERVER_PORT || 3011;
if (process.env.NODE_ENV === 'production') {
    port = process.env.SERVER_PORT || 3010;
}
// http
var server = http.createServer(app);
server.listen(port);
console.log("server is running on port: " + port);
if (process.env.NODE_ENV === 'production') {
    console.log('production mode');
}
else {
    console.log('developer mode');
}
