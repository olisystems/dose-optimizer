import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants";

const mqtt = require('mqtt')

export class MqttPublisher {
    
    // fields
    private _mqttHost = process.env.MQTT_HOST;
    private _mqttOptions = {
        username: process.env.MQTT_USERNAME, 
        password: process.env.MQTT_PASSWORD
    };
    _client: any;

    // constructor
    constructor() {
        this._client  = mqtt.connect(this._mqttHost, this._mqttOptions);  
    }

    public publish(topic: string, data: string) {

        this._client.on('connect', () => {
            console.log('mqtt is connected in class');
            this._client.publish('myTopic', '{"key1": "val1", "key2": "val2"}');

        });

        this._client.on('error', function (error: any) {
            console.log('mqtt error');
            console.log(error);
        });
        
    }
    
 }
