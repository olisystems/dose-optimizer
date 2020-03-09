
// imports and constants
// -----------------------------------------------

import express = require('express');
import session = require('express-session');
import Keycloak = require('keycloak-connect');
import { config } from '../../config';

var controlers = require('./controllers');
var errors = require('../../assets/responses/errors.json');

var router = express.Router();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });



// POST
// -----------------------------------------------

/** 
 * Optimization Route
 * protected 
 */
router.post('/', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await controlers.optimize(req.body);

    if (optimizationRes.status === 200 ) {
                
        res.status(optimizationRes.status).json(optimizationRes.data)
    } else {
        
        if (optimizationRes.error) {
            res.status(optimizationRes.status).json( { errors: [ optimizationRes.error ] } )
        } else { 
            res.status(optimizationRes.status).json( { errors: [ errors.internalServer ] } )
        }
    }  

});


router.get('/publish', /*keycloak.protect(config.keycloak.role),*/ async (req, res) => {

    controlers.publish(40);
    res.status(200).json({ 'publisherStarted': true })
});




// exports
// -----------------------------------------------

module.exports = router;
