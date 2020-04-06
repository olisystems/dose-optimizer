
import { IWeatherDataInterploated } from '../data-models/weather'

var sqlite3 = require('sqlite-async');
var axios = require("axios");
var Spline = require('cubic-spline');
var weatherDB = require('../db/weather');



/**
 * Get the pv supply array of an oli id
 * @param {string} oliId - oli box id pv plant
 * @param {string} zipCode - zip code for weather forcast
 * @param {Data} optimizationDate - date of optimization
 */
async function getSupply( oliId: string, zipCode: string, optimizationDate: Date ) {

    let res: any;
    let db: any; 
    let queryString = 'SELECT data FROM "supply" WHERE oli_id = ?';
    let supply: any;
    let weatherDataFactors: any;

    return new Promise ( async  (resolve) => {
        
        weatherDataFactors = await getWeatherDataFactors ( zipCode, optimizationDate )
        if (weatherDataFactors.error) {
            resolve(weatherDataFactors)    
        } 

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            res = { error: error };
        }

        try {
            
            supply = await db.all(queryString, oliId);
            supply = JSON.parse(supply[0].data)
            
            for (let i = 0; i < supply.value.length; i++ ) {
                supply.value[i] *= weatherDataFactors.condition[i] * weatherDataFactors.temperature[i] ;
            }

            res = supply;

        } catch (error) {
            res = { error: error };
        }

        await db.close();
        resolve(res)
    })
}



/**
 * Get the pv static load array of a tenant identified by an oli id
 * @param {string} oliId
 */
async function getStaticLoad( oliId: string ) {

    let res: any;
    let db: any; 
    let queryString = 'SELECT data FROM "load_static" WHERE oli_id = ?';
    let loadStatic: any;

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



/**
 * Get the weather forcast data for the next 5 days in an intervall of 3H
 * The data are requested from open weather map in the following structure: 
 *  - 3H blocks. 8 times 3H Blocks = 24H day. 1. block 00:00 - 03:00, 2.block 03:00 - 06:00
 *  - The first block time (dt) of the request is the next 3H interval. 
 *    For example: if the weather forcast is requested at 10:06, 
 *    then the the timestamp of the first block is 12:00. 
 * @param {string} zipCode - zip code for weather forcast
 */
async function getWeatherData( zipCode: string ) {

    let owmGetWeatherUrl = `${process.env.OWM_API_URL}zip=${zipCode},de&appid=${process.env.OWM_API_KEY}&units=metric`;
    let weatherData: any;

    return new Promise ( async (resolve) => {
    
        try {
            weatherData = await axios.get(owmGetWeatherUrl);
            resolve(weatherData);    
        } catch (error) {
            resolve( { error: error.response.data } )
        }
    })
}



/**
 * Construct a cubic spline line interpolation to construct 15 min blocks from 3H weather blocks
 * the 15 min blocks are multiplied by the factors of weather conditions and temperatures
 * @param {string} zipCode postal code of tenant adress
 * @param {Data} optimizationDate - date of optimization
 */
async function getWeatherDataFactors( zipCode: string, optimizationDate: Date ) {
    
    let weatherDataFactors: IWeatherDataInterploated = {
        temperature: [],
        condition: []
    }
    let xSpline: number[] = [6, 18, 30, 42, 54, 66, 78, 90, 102];
    let ySpline: number[] = [];
    
    return new Promise ( async (resolve) => {

        let optimizationTimestamp = optimizationDate.getTime() / 1000;
        let tmpCnt: number = 0;
        let weatherData: any;
        let conditionFactors: any;
        let temperatureFactors: any;
        let temperatureFactor: any;
        let weatherDataArr: any;

        // get weather data
        weatherData = await getWeatherData ( zipCode )
        if (weatherData.error) {
            resolve(weatherData);
        }
        
        temperatureFactors = await weatherDB.getWeatherTemperatureFactors();
        if (temperatureFactors.error) {
            resolve(temperatureFactors);
        }

        // construct weather condition factors
        weatherDataArr = weatherData.data.list;
        for (let i = 0; i < weatherDataArr.length; i++ ) {
             
            if ( ( weatherDataArr[i].dt >= optimizationTimestamp ) && ( tmpCnt < 9 ) ) {
                
                ySpline.push(weatherDataArr[i].main.temp)
                
                conditionFactors = await weatherDB.getWeatherConditionFactors(weatherDataArr[i].weather[0].main)
                if (conditionFactors.error) {
                    resolve(conditionFactors)
                }
                
                tmpCnt += 1
                if ( tmpCnt < 9 ) {
                    for ( let i: number = 1; i <= 12; i++ ) {
                        weatherDataFactors.condition.push(conditionFactors)
                    }
                }

            }
        };

        // construct weather temperature factors
        const spline = new Spline(xSpline, ySpline);
        for ( let i: number = 1; i <= 96; i++ ) {
            let temperature = Math.round( spline.at(i) * 100  ) / 100
            temperatureFactor = temperatureFactors.find( (factor: any) => factor.min_temperature < temperature && temperature <= factor.max_temperature ).factor
            weatherDataFactors.temperature.push(temperatureFactor)
        }

        resolve(weatherDataFactors)
    })
}




module.exports.getSupply = getSupply;
module.exports.getStaticLoad = getStaticLoad;
