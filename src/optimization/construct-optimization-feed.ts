
import { IEnergyProfile, IOptimizationFeed } from '../data-models/energy-profile';
const sqlite3 = require('sqlite-async');



async function getSupply( oliId: string ) {

    var res: any;
    var db: any; 
    var queryString = 'SELECT data FROM "supply" WHERE oli_id = ?';
    var supply: any;

    return new Promise ( async  (resolve) => {

        try {

            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            
            res = { error: error };
        }

        try {

            supply = await db.all(queryString, oliId);
            res = JSON.parse(supply[0].data);
        } catch (error) {

            res = { error: error };
        }

        await db.close();
        resolve(res)
    })

}



async function getStaticLoad( oliId: string ) {

    var res: any;
    var db: any; 
    var queryString = 'SELECT data FROM "load_static" WHERE oli_id = ?';
    var loadStatic: any;

    return new Promise ( async  (resolve) => {

        try {

            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            
            res = { error: error };
        }

        try {

            loadStatic = await db.all(queryString, oliId);
            res = JSON.parse(loadStatic[0].data);
        } catch (error) {

            res = { error: error };
        }

        await db.close();
        resolve(res)
    })

}



async function getWeatherData() {

    return new Promise ( (resolve) => {


    })

}



module.exports.getSupply = getSupply;
module.exports.getStaticLoad = getStaticLoad;
