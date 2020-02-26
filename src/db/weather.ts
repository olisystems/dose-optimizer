
import { IOptimizationFeed } from '../data-models/energy-profile';
const sqlite3 = require('sqlite-async');



async function getWeatherConditionCode() {
    
    var res: object;
    var db: any; 
    var queryString = 'SELECT * FROM lu_weather_condition WHERE description = ?';
    var weatherConditions: any;
    
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
            weatherConditions = await db.all(queryString);
            // *****************************
            //console.log(weatherConditions)
            res = weatherConditions;
        } catch (error) {
            res = { error: error }
        }

        await db.close();
        resolve(res)
    })
}



module.exports.getWeatherConditionCode = getWeatherConditionCode;
