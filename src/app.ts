
// imports and constants
// -----------------------------------------------

import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import compression = require('compression'); 
import session = require('express-session');
import Keycloak = require('keycloak-connect');
import {config} from './config';

const routes = require('./api/rest/routes');



// app setups
// -----------------------------------------------

// express
const app: express.Application = express();


// env
app.get('env');
if (process.env.NODE_ENV !== 'production') {
    console.log('dev mode');
    app.use(morgan("dev"));
} 


// keycloak
var memoryStore = new session.MemoryStore();                       
var keycloak = new Keycloak({ store: memoryStore });

app.use(session({
    secret: config.keycloak.secret,                         
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
// TODO: Remove for production version
app.use('/test', express.static('./test/optimization-plots'));


// request routes
app.use('/v1', routes);


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
