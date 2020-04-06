
import { IOptimizationFeed } from '../data-models/energy-profile';
var sqlite3 = require('sqlite-async');


/**
 * Store an optimization into the local sqlite db
 * @param {string} tenant 
 * @param {string} startDate 
 * @param {IOptimizationFeed} optimizationFeed 
 */
async function storeOptimization( tenant: string, startDate: string, optimizationFeed: IOptimizationFeed ) {
    
    let res: object;
    let db: any; 
    let queryString = 'INSERT INTO "optimizations" ("tenant", "start_date", "in_progress", "data") VALUES (?, ?, ?, ?)';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            await db.run(queryString, tenant, startDate, 0, JSON.stringify(optimizationFeed))
            res = {
                status: 201,
                message: 'successfully stored optimization'
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}


/**
 * Get all open optimizations for a date
 * @param {string} startDate date of optimizations
 */
async function getOpenOptimizationsByDate( startDate: string ) {
    
    let res: object;
    let optimizations: any;
    let db: any; 
    let queryString = 'SELECT * FROM optimizations WHERE start_date = ? AND in_progress = 0';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            optimizations = await db.all(queryString, startDate)
            res = {
                status: 200,
                data: optimizations
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}


/**
 * Get all open optimizations of a tenant
 * @param {string} oliId oli id of tenant
 */
async function getOptimizationsByTenant( oliId: string ) {
    
    let res: object;
    let optimizations: any;
    let db: any; 
    let queryString = 'SELECT * FROM optimizations WHERE tenant = ?';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            optimizations = await db.all(queryString, oliId)
            res = {
                status: 200,
                data: optimizations
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}


/**
 * Get tenant activation status
 * @param {string} oliId oli id of tenant
 * @param {number} activate sqlite boolen (0/1) to activat optimations
 */
async function getTenantActivationStatus( oliId: string ) {
    
    let res: object;
    let activeStatus: any;
    let db: any; 
    let queryString = 'SELECT active FROM tenant WHERE pk = ?';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            activeStatus = await db.all(queryString, oliId)
            res = {
                status: 200,
                data: activeStatus
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}


/**
 * Activate and deactivate the optimization for a tenant
 * @param {string} oliId oli id of tenant
 */
async function activateTenant( oliId: string, active: number ) {
    
    let res: object;
    let activation: any;
    let db: any; 
    let queryString = 'UPDATE tenant SET active = ? WHERE pk = ?';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            activation = await db.run(queryString, active, oliId)
            res = {
                status: 200,
                data: { oli: oliId, activationStatus: active }
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}


/**
 * Delete an optimization
 * @param {string} oliId oli id of tenant
 */
async function deleteOptimization( optimizationPk: number ) {
    
    let res: object;
    let optimizations: any;
    let db: any; 
    let queryString = 'DELETE FROM optimizations WHERE pk = ?';
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({
                status: 500,
                error: error
            })
        }

        try {
            optimizations = await db.run(queryString, optimizationPk)
            res = {
                status: 200,
                data: { optimizationPk: optimizationPk, message: "deleted"}
            }
        } catch (error) {
            res = {
                status: 500,
                error: error
            }
        }

        await db.close();
        resolve(res)
    })
}



module.exports.storeOptimization = storeOptimization;
module.exports.getOpenOptimizationsByDate = getOpenOptimizationsByDate;
module.exports.getOptimizationsByTenant = getOptimizationsByTenant;
module.exports.getTenantActivationStatus = getTenantActivationStatus;
module.exports.activateTenant = activateTenant;
module.exports.deleteOptimization = deleteOptimization;
