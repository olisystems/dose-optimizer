
import { IntervalsToTimestamps } from '../../helper/intervals-to-timestamps';

const mqtt = require('mqtt')


export class MqttPublisher {

    private _mqttHost = process.env.MQTT_HOST;
    private _mqttOptions = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME, 
        password: process.env.MQTT_PASSWORD
    };
    private _client: any;
    private _intervalsToTimestamps = new IntervalsToTimestamps();

    constructor() {
        this._client  = mqtt.connect(this._mqttHost, this._mqttOptions);  
    }


    /**
     * @param {string} topic - mqtt topic with pattern: PROJECT/OLI_XX/ChargingPoint/activePower/Demand
     * @param {object} data  - json payload for mqtt broker
     */
    public publish(topic: string, data: string) {

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
        
    }

}
