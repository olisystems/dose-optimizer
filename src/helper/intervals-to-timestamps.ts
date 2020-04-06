
import { config } from '../config';



/**
 * function to retrive timestamps for a day.
 * the timestamps start from 00:00 of the day.
 * the frequncy of the timestamp is set by the configuration value optimizationTimeBlockSize 
 * @param {Date} date - date for timestamp generation
 */
export function createBlockTimestamps(date: Date) {
        
    let intervalTimestamps: number[] = [];
    let startTime: number  =  date.getTime() - (config.gmtTimeZone * 60 * 60 * 1000);
    let calcFreq: number = (60 * 60 * 24 * 1000) / (config.optimizationTimeBlockSize * 60 * 1000);

    for (let i: number = 1; i <= calcFreq; i++) {

        intervalTimestamps.push(startTime);
        startTime += ( config.optimizationTimeBlockSize * 60 * 1000);
    }
}

