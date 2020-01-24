
const mqtt = require('mqtt')

export class MqttPublisher {
    
    // fields
    private _mqttHost = process.env.MQTT_HOST;
    private _mqttOptions = {
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME, 
        password: process.env.MQTT_PASSWORD
    };
    private _client: any;

    // constructor
    constructor() {
        this._client  = mqtt.connect(this._mqttHost, this._mqttOptions);  
    }

    public publish(topic: string, data: string) {

        this._client.on('connect', () => {

            console.log('mqtt is connected in class');
            setInterval(() => { 
                
                console.log('publish: ' + topic);
                console.log(data);
                this._client.publish(topic, data);     
            }, 5000);

        });

        this._client.on('error', function (error: any) {
            console.log('mqtt error');
            console.log(error);
        });
        
    }

    public subscribe(topic: string, data: string) {

        this._client.on('connect', () => {
            console.log('mqtt is connected in class');
            setInterval(() => { 
                this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');     
            }, 3000);

            //this._client.publish('DOSE/test', '{"key1": "val1", "key2": "val2"}');

        });

        this._client.on('error', function (error: any) {
            console.log('mqtt error');
            console.log(error);
        });


        this._client.on('connect', () => {
        
            this._client.subscribe('myTopic')
        })
    
        this._client.on('message', (topic: any, message: any) => {
            
            var context = message.toString();
            console.log(context)
        })

    }
    
 }
