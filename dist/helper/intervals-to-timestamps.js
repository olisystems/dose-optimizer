"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
/**
 * class made to retrive timestamps for a day.
 * the timestamps start from 00:00 of the day.
 * the frequncy of the timestamp is set by the configuration value optimizationFrequency
 */
var IntervalsToTimestamps = /** @class */ (function () {
    function IntervalsToTimestamps() {
        this._IntervalTimestamps = [];
    }
    /**
     * @param {Date} date - date for timestamp generation
     */
    IntervalsToTimestamps.prototype.createTimestamps = function (date) {
        var startTime = date.getTime() - (config_1.config.gmtTimeZone * 60 * 60 * 1000);
        var calcFreq = (60 * 60 * 24 * 1000) / (config_1.config.optimizationFrequency * 60 * 1000);
        for (var i = 1; i <= calcFreq; i++) {
            this._IntervalTimestamps.push(startTime);
            startTime += (config_1.config.optimizationFrequency * 60 * 1000);
        }
        // console.log(this._IntervalTimestamps)
    };
    return IntervalsToTimestamps;
}());
exports.IntervalsToTimestamps = IntervalsToTimestamps;
