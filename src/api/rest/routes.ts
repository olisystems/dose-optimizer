
// imports and constants
// -----------------------------------------------

import express = require('express');
import { IResponseObject } from '../../data-models/callback';
import session = require('express-session');
import Keycloak = require('keycloak-connect');
import { config } from '../../config';

const controlers = require('./controllers');
const errors: any = require('../../assets/responses/errors.json');

const router = express.Router();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });



// POST
// -----------------------------------------------

/** 
 * Optimization Route
 * protected 
 */
router.post('/', keycloak.protect(config.keycloak.role), (req, res) => {

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


router.post('/test', keycloak.protect(config.keycloak.role), (req, res) => {

    res.status(200).json({origin: 'test rout', secured: true})
});



// exports
// -----------------------------------------------

module.exports = router;
