"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var optimizer_1 = require("../../optimization/optimizer");
// POST
// -----------------------------------------------
/**
 * @param {any} req                     - request
 * @param {IResponseCallback} callback  - callback according to interface IResponseCallback
 */
function optimize(req, callback) {
    var optimizer = new optimizer_1.Optimizer({
        supply: req[0].supply,
        loadStatic: req[0].loadStatic,
        acDemand: req[0].acDemand,
        clDemand: req[0].clDemand,
        acTimeRange: req[0].acTimeRange,
        clTimeRange: req[0].clTimeRange,
        acMaxLoad: req[0].acMaxLoad,
        clMaxLoad: req[0].clMaxLoad
    });
    var controllerRes = {
        status: 200,
        data: [
            optimizer.getOptimization()
        ]
    };
    optimizer.publishOptimization();
    callback(controllerRes);
}
// exports
// -----------------------------------------------
module.exports.optimize = optimize;
