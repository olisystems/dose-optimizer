"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controlers = require('./controllers');
var errors = require('../assets/responses/errors.json');
var router = express.Router();
// GET
// -----------------------------------------------
router.get('/', function (req, res, next) {
    controlers.getOptimizationInfo(function (optimizationRes) {
        if (optimizationRes.status === 200) {
            res.status(optimizationRes.status).json(optimizationRes.data);
        }
        else {
            res.status(optimizationRes.status).json({ errors: [errors.internalServer] });
        }
    });
});
// POST
// -----------------------------------------------
router.post('/', function (req, res, next) {
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
