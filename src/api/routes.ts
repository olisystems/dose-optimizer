
// imports and constants
// -----------------------------------------------

import express = require('express');
import { IResponseObject } from '../data-models/callback';
import session = require('express-session');
import Keycloak = require('keycloak-connect');

const controlers = require('./controllers');
const errors: any = require('../assets/responses/errors.json');

const router = express.Router();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });



// POST
// -----------------------------------------------


/** 
 * Productive route
 * protected 
 */
router.post('/', /* keycloak.protect('usr'), */ (req, res, next) => {

    controlers.optimize( 
        req.body,
        ( optimizationRes: IResponseObject ) : void => {

            if (optimizationRes.status === 200 ) {
                
                res.status(optimizationRes.status).json(optimizationRes.data)
            } else {
                
                res.status(optimizationRes.status).json( {errors: [errors.internalServer]} )
            }  
        }
    );
});



// exports
// -----------------------------------------------

module.exports = router;
