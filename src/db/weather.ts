
const sqlite3 = require('sqlite-async');



async function getWeatherConditionCode(conditionDescriptoin: string) {
    
    var res: any;
    var db: any; 
    var queryString = 'SELECT * FROM lu_weather_condition WHERE description = ?';
    var weatherConditions: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            res = { error: error }
        }

        try {

            weatherConditions = await db.all(queryString, conditionDescriptoin);
            if (weatherConditions[0] === undefined) {
                res = 0.6 // default condition factor
            } else {
                res = weatherConditions[0].factor
            }

        } catch (error) {
            res = { error: error }
        }

        await db.close();
        resolve(res)
    })
}



module.exports.getWeatherConditionCode = getWeatherConditionCode;
