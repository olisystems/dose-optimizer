
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
     * @param {Date} date - date for timestamp generation
     */
    public createTimestamps(date: Date) {
        
        var startTime: number  =  date.getTime() - (config.gmtTimeZone * 60 * 60 * 1000);

        var calcFreq: number = (60 * 60 * 24 * 1000) / (config.optimizationFrequency * 60 * 1000);

        for (var i: number = 1; i <= calcFreq; i++) {

            this._IntervalTimestamps.push(startTime);
            startTime += ( config.optimizationFrequency * 60 * 1000);
        }

        // console.log(this._IntervalTimestamps)
    }
}
