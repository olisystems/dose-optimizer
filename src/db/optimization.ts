
import { IOptimizationFeed } from '../data-models/energy-profile';
var sqlite3 = require('sqlite-async');


/**
 * store an optimization into the local sqlite db
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
                status: 200,
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



module.exports.storeOptimization = storeOptimization;
