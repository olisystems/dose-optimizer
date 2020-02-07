"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var Keycloak = require("keycloak-connect");
var config_1 = require("../../config");
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
router.post('/', keycloak.protect(config_1.config.keycloak.role), function (req, res) {
    controlers.optimize(req.body, function (optimizationRes) {
        if (optimizationRes.status === 200) {
            res.status(optimizationRes.status).json(optimizationRes.data);
        }
        else {
            res.status(optimizationRes.status).json({ errors: [errors.internalServer] });
        }
    });
});
router.post('/test', keycloak.protect(config_1.config.keycloak.role), function (req, res) {
    res.status(200).json({ origin: 'test rout', secured: true });
});
// exports
// -----------------------------------------------
module.exports = router;
