
// imports and constants
// -----------------------------------------------

import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import compression = require('compression'); 
import session = require('express-session');
import Keycloak = require('keycloak-connect');
import {config} from './config';

var routes = require('./api/rest/routes');
var app: express.Application = express();


// app setups
// -----------------------------------------------


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
}
var keycloak = new Keycloak({ store: memoryStore }, kcConfig);



app.use(session({
    secret: 'cf08c63a-ca0f-4598-a78d-faf021ce9a12', //config.keycloak.secret,                         
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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// test website for optoimization-plots
app.use('/test', express.static('./test/optimization-plots'));


// request routes
app.use('/v1', routes);

// api tests routes
app.get('/test/public', (req, res, next) => {
    res.status(200).json({"status": "200", "type": "public"})
});
app.get('/test/protected', keycloak.protect(), (req, res, next) => {
    res.status(200).json({"status": "200", "type": "protected"})
});


// errors
app.use((req, res, next) => {
    
    const error = new Error("Not found");
    res.status(404).json({
        error: {
            message: error.message
        }
    });
});



// exports
// -----------------------------------------------

module.exports = app;
