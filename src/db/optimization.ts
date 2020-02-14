
import { IOptimizationFeed } from '../data-models/energy-profile';
const sqlite3 = require('sqlite-async');


async function storeOptimization( tenant: string, startDate: string, optimizationFeed: IOptimizationFeed ) {
    
    var res: object;
    var db: any; 
    var queryString = 'INSERT INTO "optimizations" ("tenant", "start_date", "in_progress", "data") VALUES (?, ?, ?, ?)';
    
    return new Promise ( async  (resolve) => {

        try {

            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            
            res = {
                status: 500,
                error: error
            }
        }

        try {

            await db.run(queryString, tenant, startDate, 0, JSON.stringify(optimizationFeed))
            
            res = {
                status: 200,
                message: 'successfully stored optimization'
            }

        } catch (error) {

            console.log(error)
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
