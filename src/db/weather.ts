
var sqlite3 = require('sqlite-async');



async function getWeatherConditionCode(conditionDescriptoin: string) {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT * FROM lu_weather_condition WHERE description = ?';
    let weatherConditions: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({ error: error })
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
