
// imports and constants
// -----------------------------------------------

import { Optimizer } from '../../optimization/optimizer'
const storeOptimization = require('../../db/optimization');



// POST
// -----------------------------------------------

/**
 * @param {any} req - request
 */
async function optimize(req: any ) {

    var controllerRes: object;
    var storeOptimizationRes: any; 
    // TODO: outsource a function which creats the optimizer variable
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

    storeOptimizationRes = await storeOptimization.storeOptimization(req[0].tenant, req[0].startDate, optimization);
    if (storeOptimizationRes.error) {
        controllerRes = {
            status: storeOptimizationRes.status,
            error: storeOptimizationRes.error
        }
    } else {
        controllerRes = {
            status: storeOptimizationRes.status,
            data: [
                optimization
            ]
        }
    }

    return new Promise ( (resolve) => {

        resolve(controllerRes)
    })

}




// ------------------------------------------------------
// TODO: remove this function
var publishNo: number = 0;
let publish: (i: number) => void = (i: number) => {
    
    publishNo += 1;

    setTimeout(() => {

        if (--i) {
            
            console.log('publishNo: ' + publishNo + ' -> ' + i);
            publish(i);
        }
    }, 3000);

};

// ------------------------------------------------------




// exports
// -----------------------------------------------

module.exports.optimize = optimize;
module.exports.publish = publish;
