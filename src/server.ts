
// imports and constants
// -----------------------------------------------

const http = require('http');
const app = require('./app');

require('dotenv').config();

http.globalAgent.maxSockets = Infinity; 


// server
// -----------------------------------------------

// port
var port = process.env.SERVER_PORT || 3011;
if (process.env.NODE_ENV !== 'production') {
    
    port = process.env.SERVER_PORT || 3010;
}

// http
const server = http.createServer(app);
server.listen(port);

console.log(`server is running on port: ${port}`);
if (process.env.NODE_ENV === 'development') {
    
    console.log('developer mode');
} else {
    
    console.log('production mode');
}
