
import { IWeatherDataInterploated } from '../data-models/weather'

const sqlite3 = require('sqlite-async');
const axios = require("axios");
const Spline = require('cubic-spline');
const weatherDb = require('../db/weather');



/**
 * Get the pv supply array of an oli id
 * @param {string} oliId - oli box id pv plant
 * @param {string} zipCode - zip code for weather forcast
 * @param {Data} optimizationDate - date of optimization
 */
async function getSupply( oliId: string, zipCode: string, optimizationDate: Date ) {

    var res: any;
    var db: any; 
    var queryString = 'SELECT data FROM "supply" WHERE oli_id = ?';
    var supply: any;
    var weatherData: any;

    return new Promise ( async  (resolve) => {
        
        weatherData = await getWeatherDataInterpolated ( zipCode, optimizationDate )
        if (weatherData.error) {
            resolve(weatherData)    
        }   

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



/**
 * Get the pv static load array of a tenant identified by an oli id
 * @param {string} oliId
 */
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

    var owmGetWeatherUrl = `${process.env.OWM_API_URL}zip=${zipCode},de&appid=${process.env.OWM_API_KEY}&units=metric`;
    var weatherData: any;

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
 * Get weather in 3H Blocks and construct a cubic spline line interpolation
 * to construct 15 min weather blocks 
 * @param {string} zipCode postal code of tenant adress 
 * @param {Data} optimizationDate - date of optimization
 */
async function getWeatherDataInterpolated( zipCode: string, optimizationDate: Date ) {
    
    var weatherDataInterpolated: IWeatherDataInterploated = {
        temperature: [],
        condition: []
    }
    var xSpline: number[] = [6, 18, 30, 42, 54, 66, 78, 90, 102];
    var ySpline: number[] = [];
    
    return new Promise ( async (resolve) => {

        var optimizationTimestamp = optimizationDate.getTime() / 1000;
        var tmpCnt: number = 0;
        var weatherData: any = await getWeatherData ( zipCode );
        var conditionCode: number = 9;

        if (weatherData.error) {
            resolve(weatherData);
        }


        weatherData.data.list.forEach( async (element: any, index: any) => {
            if ( ( element.dt >= optimizationTimestamp ) && ( tmpCnt < 9 ) ) {
                
                tmpCnt += 1
                ySpline.push(element.main.temp);
            
                
                conditionCode = await weatherDb.getWeatherConditionCode();
                // *******************************************************
                //console.log('##########################################');
                //console.log(conditionCode);
                
                if ( tmpCnt < 9 ) {
                    for ( let i: number = 1; i <= 12; i++ ) {
                        
                        //console.log(element.weather[0].description);
                        weatherDataInterpolated.condition.push(conditionCode)
                    }
                }
            
            }
        });

        const spline = new Spline(xSpline, ySpline);

        for ( let i: number = 1; i <= 96; i++ ) {
            weatherDataInterpolated.temperature.push( Math.round( spline.at(i) * 100  ) / 100  );
        }


        //console.log(weatherDataInterpolated.temperature);
        //console.log(weatherDataInterpolated.condition);
        //console.log('lenght: ' + weatherDataInterpolated.temperature.length );
        //console.log('lenght: ' + weatherDataInterpolated.condition.length );

        resolve(weatherDataInterpolated)
    })
}



module.exports.getSupply = getSupply;
module.exports.getStaticLoad = getStaticLoad;
