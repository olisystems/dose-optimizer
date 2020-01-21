"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var Keycloak = require("keycloak-connect");
var controlers = require('./controllers');
var errors = require('../assets/responses/errors.json');
var router = express.Router();
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });
// POST
// -----------------------------------------------
router.post('/', keycloak.protect('usr'), function (req, res, next) {
    console.log('####Here are the headers:');
    console.log(req.headers);
    controlers.optimize(req.body, function (optimizationRes) {
        if (optimizationRes.status === 200) {
            res.status(optimizationRes.status).json(optimizationRes.data);
        }
        else {
            res.status(optimizationRes.status).json({ errors: [errors.internalServer] });
        }
    });
});
// exports
// -----------------------------------------------
module.exports = router;
