
// imports and constants
// -----------------------------------------------

import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import compression = require('compression'); 
const routes = require('./api/routes');

const app: express.Application = express();



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



// request routes
// -----------------------------------------------

app.use('/v1', routes);



// errors
// -----------------------------------------------

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