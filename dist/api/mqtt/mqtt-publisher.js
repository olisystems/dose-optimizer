"use strict";
// imports and constants
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var intervals_to_timestamps_1 = require("../../helper/intervals-to-timestamps");
var mqtt = require('mqtt');
var MqttPublisher = /** @class */ (function () {
    function MqttPublisher() {
        this._mqttHost = process.env.MQTT_HOST;
        this._mqttOptions = {
            port: process.env.MQTT_PORT,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        };
        this._intervalsToTimestamps = new intervals_to_timestamps_1.IntervalsToTimestamps();
        this._client = mqtt.connect(this._mqttHost, this._mqttOptions);
    }
    /**
     * @param {string} topic - mqtt topic with pattern: PROJECT/OLI_XX/ChargingPoint/activePower/Demand
     * @param {object} data  - json payload for mqtt broker
     */
    MqttPublisher.prototype.publish = function (topic, data) {
        //this._intervalsToTimestamps.createTimestamps(new Date("Tuesday, Januaray 28, 2020 10:00:00 AM"));
        //this._intervalsToTimestamps.createTimestamps(new Date("2020-01-28T00:01:00.000Z"));
        this._intervalsToTimestamps.createTimestamps(new Date("2020-01-28"));
        /*
        this._client.on('connect', () => {

            //console.log('mqtt is connected');
            this._client.publish(topic, data);
            
        });

        this._client.on('error', function (error: any) {
            console.log('mqtt error');
            console.log(error);
        });
        */
    };
    return MqttPublisher;
}());
exports.MqttPublisher = MqttPublisher;
