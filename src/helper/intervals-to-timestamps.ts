
import { config } from '../config';


/**
 * class made to retrive timestamps for a day.
 * the timestamps start from 00:00 of the day.
 * the frequncy of the timestamp is set by the configuration value optimizationFrequency
 */
export class IntervalsToTimestamps {

    private _IntervalTimestamps: number[];
    
    constructor () {
        this._IntervalTimestamps = [];
    }

    /**
     *  Return 
     *  @param {Date} date - date for timestamp generation
     */
    public createTimestamps(date: Date) {
        
        let startTime: number  =  date.getTime() - (config.gmtTimeZone * 60 * 60 * 1000);
        let calcFreq: number = (60 * 60 * 24 * 1000) / (config.optimizationFrequency * 60 * 1000);

        for (let i: number = 1; i <= calcFreq; i++) {

            this._IntervalTimestamps.push(startTime);
            startTime += ( config.optimizationFrequency * 60 * 1000);
        }
    }

}
