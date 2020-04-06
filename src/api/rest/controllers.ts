
// imports and constants
// -----------------------------------------------

import { IOptimizationFeed } from '../../data-models/energy-profile';
import { Optimizer } from '../../optimization/optimizer';

var constructOptimizationFeed = require('../../optimization/construct-optimization-feed');
var errors = require('../../assets/responses/errors.json');
var optimizationDb = require('../../db/optimization');
var tenantInfo = require('../../db/tenant');


// POST
// -----------------------------------------------

/**
 * Construct an optimization according to following workflow:
 *  - construct optimization feed
 *  - run optimizatoin
 *  - store optimizaiton results
 * @param {any} req request
 */
async function optimize(req: any ) {
    
    let optimizer: Optimizer;
    let optimization: IOptimizationFeed;
    let storeOptimizationRes: any;
    let zipCode: any;
    let acMetaData: any;
    let clMetaData: any;
    let supply: any;
    let loadStatic: any;
    

    return new Promise ( async (resolve) => {
        
        // construct optimization feed 
        zipCode = await tenantInfo.getZipCode(req[0].tenant);
        if (zipCode.error) {
            resolve({
                status: 500,
                error: zipCode.error
            })
        }
        
        acMetaData = await tenantInfo.getAcMetaData(req[0].acDemand.oliBox);
        if (acMetaData.error) {
            resolve({
                status: 500,
                error: acMetaData.error
            })
        }

        clMetaData = await tenantInfo.getClMetaData(req[0].clDemand.oliBox);
        if (clMetaData.error) {
            resolve({
                status: 500,
                error: clMetaData.error
            })
        }

        loadStatic = await constructOptimizationFeed.getStaticLoad(req[0].loadStaticId);
        if (loadStatic.error) {
            resolve({
                status: 500,
                error: loadStatic.error
            })
        }

        supply = await constructOptimizationFeed.getSupply(req[0].supplyId, zipCode, new Date(req[0].startDate) );
        if (supply.error) {
            resolve({
                status: 500,
                error: supply.error
            })
        }

        
        // run optimization
        optimizer = new Optimizer(
            {
                supply: supply,
                loadStatic: loadStatic,
                acDemand: req[0].acDemand,
                clDemand: req[0].clDemand,
                acTimeRange: acMetaData.timeRange,
                clTimeRange: clMetaData.timeRange,
                acMaxLoad: acMetaData.maxLoad,
                clMaxLoad: clMetaData.maxLoad
            }
        );
        
        try {
            optimization = optimizer.getOptimization();
        } catch (error) {
            resolve({
                status: 400,
                error: errors.invalidRequestParameter
            })
        }


        // store optimization results
        storeOptimizationRes = await optimizationDb.storeOptimization(req[0].tenant, req[0].startDate, optimization);
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



// exports
// -----------------------------------------------

module.exports.optimize = optimize;
