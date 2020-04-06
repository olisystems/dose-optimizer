
// imports and constants
// -----------------------------------------------

import express = require('express');
import session = require('express-session');
import Keycloak = require('keycloak-connect');
import { config } from '../../config';
import { logger } from '../../logger'
import { optimizationDataStringToJson } from '../../helper/optimization-data-string-to-json';

var controlers = require('./controllers');
var errors = require('../../assets/responses/errors.json');
var optimizationDb = require('../../db/optimization');
var router = express.Router();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });



/** 
 * GET
 * Get optimizations by Tenant
 * protected 
 */
router.get('/optimizations/:oliId', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await optimizationDb.getOptimizationsByTenant(req.params.oliId)

    if (optimizationRes.error) {
        logger.error({ endpoint: 'GET /optimizations/:oliId', response: optimizationRes.error })
        res.status(optimizationRes.status).json(optimizationRes.error)
    } else {
        optimizationDataStringToJson(optimizationRes.data)
        logger.info({ endpoint: 'GET /optimizations/:oliId', response: optimizationRes.data })
        res.status(optimizationRes.status).json(optimizationRes.data)
    }
});


/** 
 * POST
 * Create optimization Route
 * protected 
 */
router.post('/optimizations', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await controlers.optimize(req.body);

    if (optimizationRes.status === 200 ) {
        logger.info({ endpoint: 'POST /optimizations', response: optimizationRes.data })
        res.status(optimizationRes.status).json(optimizationRes.data)
    } else {
        
        if (optimizationRes.error) {
            logger.error({ endpoint: 'POST /optimizations', response: optimizationRes.error })
            res.status(optimizationRes.status).json( { errors: [ optimizationRes.error ] } )
        } else {
            logger.error({ endpoint: 'POST /optimizations', response: optimizationRes.error })
            res.status(optimizationRes.status).json( { errors: [ errors.internalServer ] } )
        }
    }  
});


/** 
 * DELETE
 * Delete an optimization
 * protected 
 */
router.delete('/optimizations/:optimizationPk', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await optimizationDb.deleteOptimization(req.params.optimizationPk)
    
    if (optimizationRes.error) {
        logger.error({ endpoint: 'DELETE /optimizations/:optimizationPk', response: optimizationRes.error })
        res.status(optimizationRes.status).json(optimizationRes.error)
    } else {
        logger.info({ endpoint: 'DELETE /optimizations/:optimizationPk', response: optimizationRes.data })
        res.status(optimizationRes.status).json(optimizationRes.data)
    }
});


/** 
 * GET
 * Get optimizations status by Tenant. 0 = deactivated 1 = activated
 * protected 
 */
router.get('/tenant/activation/:oliId', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await optimizationDb.getTenantActivationStatus(req.params.oliId)

    if (optimizationRes.error) {
        logger.error({ endpoint: 'GET /tenant/activation/:oliId', response: optimizationRes.error })
        res.status(optimizationRes.status).json(optimizationRes.error)
    } else {
        logger.info({ endpoint: 'GET /tenant/activation/:oliId', response: optimizationRes.data })
        res.status(optimizationRes.status).json(optimizationRes.data)
    }
});


/** 
 * PATCH
 * Activate and deactivate the optimization for a tenant
 * protected 
 */
router.patch('/tenant/:oliId', /*keycloak.protect(),*/ async (req, res) => {
    
    let optimizationRes = await optimizationDb.activateTenant(req.params.oliId, req.body.active)
    
    if (optimizationRes.error) {
        logger.error({ endpoint: 'PATCH /tenant/:oliId', response: optimizationRes.error })
        res.status(optimizationRes.status).json(optimizationRes.error)
    } else {
        logger.info({ endpoint: 'PATCH /tenant/:oliId', response: optimizationRes.data })
        res.status(optimizationRes.status).json(optimizationRes.data)
    }
});



// exports
// -----------------------------------------------

module.exports = router;
