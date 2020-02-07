
// imports and constants
// -----------------------------------------------

import { Optimizer } from '../../optimization/optimizer'
import { IResponseCallback, IResponseObject } from '../../data-models/callback';



// POST
// -----------------------------------------------

/**
 * @param {any} req                     - request
 * @param {IResponseCallback} callback  - callback according to interface IResponseCallback
 */
async function optimize(req: any, callback: IResponseCallback ) : void {

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
    
    var optimization = optimizer.getOptimization();

    var controllerRes: IResponseObject = {
        status: 200,
        data: [
            optimization
        ]
    }

    // TODO: outsource the publishing process
    // optimizer.publishOptimization();

    // TODO: 
    // write optimization in database

    callback( controllerRes )
}



// exports
// -----------------------------------------------

module.exports.optimize = optimize;
