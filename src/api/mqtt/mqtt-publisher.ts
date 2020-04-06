
// imports and constants
// -----------------------------------------------

var mqtt = require('mqtt')


export class MqttPublisher {

    private _mqttHost = process.env.MQTT_HOST;
    private _mqttOptions = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME, 
        password: process.env.MQTT_PASSWORD
    };
    private _client: any; 

    constructor() {
        this._client  = mqtt.connect(this._mqttHost, this._mqttOptions);  
    }

    /**
     * @param {string} topic - mqtt topic with pattern: PROJECT/OLI_XX/ChargingPoint/activePower/Demand
     * @param {string} data  - stringified payload json for mqtt broker
     */
    public publish(topic: string, data: string) {
            
        this._client.on('error', function (error: any) {
            console.log(error);
        });

        this._client.publish(topic, data);
    }
}
