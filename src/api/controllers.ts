
// imports and constants
// -----------------------------------------------

import { Optimizer } from '../optimization/optimizer'
import { IOptimizationFeed, EnergyProfile } from '../data-models/energy-profile';
import { supplyProfile, loadStatic, acProfile, clProfile, acProfileLow } from '../mocks/optimization-data';
import { IResponseCallback, IResponseObject } from '../data-models/callback';



// GET
// -----------------------------------------------

function getOptimizationInfo( callback: IResponseCallback ) : void {

    var supplyProfileInput = new EnergyProfile(
        supplyProfile.oliBox,
        supplyProfile.type,
        supplyProfile.interval,
        supplyProfile.value
    )
    var loadStaticInput = new EnergyProfile(
        loadStatic.oliBox,
        loadStatic.type,
        loadStatic.interval,
        loadStatic.value
    )
    var acDemandInput = new EnergyProfile(
        acProfile.oliBox,
        acProfile.type,
        acProfile.interval,
        acProfile.value
    )
    var clDemandInput = new EnergyProfile(
        clProfile.oliBox,
        clProfile.type,
        clProfile.interval,
        clProfile.value
    )
    
    var optimizatoin: IOptimizationFeed = {
        supply: supplyProfileInput,
        loadStatic: loadStaticInput,
        acDemand: acDemandInput,
        clDemand: clDemandInput,
        acTimeRange: [45, 65],
        clTimeRange: [40, 75],
        acMaxLoad: 1000,
        clMaxLoad: 2000
    }

    var controllerRes: IResponseObject = {
        status: 200,
        data: [
            optimizatoin
        ]
    }

    callback( controllerRes )
}



// POST
// -----------------------------------------------

function optimize(req: any, callback: IResponseCallback ) : void {

    var optimizer = new Optimizer(
        {
            supply: req[0].supply,
            loadStatic: req[0].loadStatic,
            acDemand: req[0].acDemand,
            clDemand: req[0].clDemand,
            acTimeRange: req[0].acTimeRange,
            clTimeRange: req[0].clTimeRange,
            acMaxLoad: req[0].acMaxLoad,
            clMaxLoad: req[0].clMaxLoad
        }
    );
    
    var controllerRes: IResponseObject = {
        status: 200,
        data: [
            optimizer.getOptimization()
        ]
    }

    callback( controllerRes )
}



// exports
// -----------------------------------------------

module.exports.getOptimizationInfo = getOptimizationInfo;
module.exports.optimize = optimize;
