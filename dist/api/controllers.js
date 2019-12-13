"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var optimizer_1 = require("../optimization/optimizer");
var energy_profile_1 = require("../data-models/energy-profile");
var optimization_data_1 = require("../mocks/optimization-data");
// GET
// -----------------------------------------------
function getOptimizationInfo(callback) {
    var supplyProfileInput = new energy_profile_1.EnergyProfile(optimization_data_1.supplyProfile.oliBox, optimization_data_1.supplyProfile.type, optimization_data_1.supplyProfile.interval, optimization_data_1.supplyProfile.value);
    var loadStaticInput = new energy_profile_1.EnergyProfile(optimization_data_1.loadStatic.oliBox, optimization_data_1.loadStatic.type, optimization_data_1.loadStatic.interval, optimization_data_1.loadStatic.value);
    var acDemandInput = new energy_profile_1.EnergyProfile(optimization_data_1.acProfile.oliBox, optimization_data_1.acProfile.type, optimization_data_1.acProfile.interval, optimization_data_1.acProfile.value);
    var clDemandInput = new energy_profile_1.EnergyProfile(optimization_data_1.clProfile.oliBox, optimization_data_1.clProfile.type, optimization_data_1.clProfile.interval, optimization_data_1.clProfile.value);
    var optimizatoin = {
        supply: supplyProfileInput,
        loadStatic: loadStaticInput,
        acDemand: acDemandInput,
        clDemand: clDemandInput,
        acTimeRange: [45, 65],
        clTimeRange: [40, 75],
        acMaxLoad: 1000,
        clMaxLoad: 2000
    };
    var controllerRes = {
        status: 200,
        data: [
            optimizatoin
        ]
    };
    callback(controllerRes);
}
// POST
// -----------------------------------------------
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
    callback(controllerRes);
}
// exports
// -----------------------------------------------
module.exports.getOptimizationInfo = getOptimizationInfo;
module.exports.optimize = optimize;
