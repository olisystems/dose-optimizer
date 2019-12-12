"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = require('mqtt');
var MqttPublisher = /** @class */ (function () {
    // constructor
    function MqttPublisher() {
        // fields
        this._mqttHost = process.env.MQTT_HOST;
        this._mqttOptions = {
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD
        };
        this._client = mqtt.connect(this._mqttHost, this._mqttOptions);
    }
    MqttPublisher.prototype.publish = function (topic, data) {
        var _this = this;
        this._client.on('connect', function () {
            console.log('mqtt is connected in class');
            setInterval(function () {
                _this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');
            }, 3000);
            //this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');
        });
        this._client.on('error', function (error) {
            console.log('mqtt error');
            console.log(error);
        });
    };
    MqttPublisher.prototype.subscribe = function (topic, data) {
        var _this = this;
        this._client.on('connect', function () {
            console.log('mqtt is connected in class');
            setInterval(function () {
                _this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');
            }, 3000);
            //this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');
        });
        this._client.on('error', function (error) {
            console.log('mqtt error');
            console.log(error);
        });
        this._client.on('connect', function () {
            _this._client.subscribe('myTopic');
        });
        this._client.on('message', function (topic, message) {
            var context = message.toString();
            console.log(context);
        });
    };
    return MqttPublisher;
}());
exports.MqttPublisher = MqttPublisher;
