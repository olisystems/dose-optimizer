
var sqlite3 = require('sqlite-async');


/**
 * @param {string} conditionDescriptoin discription of owm weather condition description
 */
async function getWeatherConditionFactors(conditionDescriptoin: string) {
    
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


/**
 * get factors for correcting pv supply based on weather conditions and temperatures
 */
async function getWeatherTemperatureFactors() {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT * FROM lu_weather_temperature_factor';
    let weatherTemperatureFactors: any;
    
    return new Promise ( async  (resolve) => {

        try {
            
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            
            await db.close();
            resolve({ error: error })
        }

        try {

            weatherTemperatureFactors = await db.all(queryString);
            res = weatherTemperatureFactors
        } catch (error) {

            res = { error: error }
        }

        await db.close();
        resolve(res)
    })
}


module.exports.getWeatherConditionFactors = getWeatherConditionFactors;
module.exports.getWeatherTemperatureFactors = getWeatherTemperatureFactors;
