
// imports and constants
// -----------------------------------------------

import { Optimizer } from '../../optimization/optimizer';
import { IOptimizationFeed } from '../../data-models/energy-profile';
const storeOptimization = require('../../db/optimization');
const constructOptimizationFeed = require('../../optimization/construct-optimization-feed');



// POST
// -----------------------------------------------

/**
 * @param {any} req request
 */
async function optimize(req: any ) {
    
    var optimizer: Optimizer;
    var optimization: IOptimizationFeed;
    var storeOptimizationRes: any;
    var supply: any;
    var loadStatic: any;

    return new Promise ( async (resolve) => {

        loadStatic = await constructOptimizationFeed.getStaticLoad(req[0].loadStaticId);
        if (loadStatic.error) {
            resolve({
                status: 500,
                error: loadStatic.error
            })
        }

        // TODO: zip has to token out of the database
        supply = await constructOptimizationFeed.getSupply(req[0].supplyId, '83471', new Date(req[0].startDate) );
        if (supply.error) {
            resolve({
                status: 500,
                error: supply.error
            })
        }


        optimizer = new Optimizer(
            {
                supply: supply,
                loadStatic: loadStatic,
                acDemand: req[0].acDemand,
                clDemand: req[0].clDemand,
                acTimeRange: req[0].acTimeRange,
                clTimeRange: req[0].clTimeRange,
                acMaxLoad: req[0].acMaxLoad,
                clMaxLoad: req[0].clMaxLoad
            }
        );
        

        optimization = optimizer.getOptimization();


        storeOptimizationRes = await storeOptimization.storeOptimization(req[0].tenant, req[0].startDate, optimization);
        if (storeOptimizationRes.error) {
            resolve({
                status: storeOptimizationRes.status,
                error: storeOptimizationRes.error
            })
        } else {
            resolve({
                status: storeOptimizationRes.status,
                data: [
                    optimization
                ]
            })
        }
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
