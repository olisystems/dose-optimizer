
import { optimizationDataStringToJson } from '../helper/optimization-data-string-to-json';
import { MqttPublisher } from "../api/mqtt/mqtt-publisher";
import { config } from '../config';

var schedule = require('node-schedule');
var optimizationDb = require('../db/optimization');
var tenantDb = require('../db/tenant');


/**
 * Manages optimizaiton commands:
 * at a certain time every day, all open jobs are searched
 * these optimizations are passed into a mqtt publishing loop
 */
export async function optimizationCommander() {
        
    schedule.scheduleJob(config.optimizationActivationFrequency, async function(){
             
        let today = new Date();
        let dd;
        let mm; 
        let yyyy = today.getFullYear().toString();
        let todayDate;
        if(today.getDate() < 10) {dd = '0' + today.getDate().toString();} 
        if(today.getMonth() + 1 < 10) {mm = '0' + (today.getMonth() + 1).toString();} 
        
        todayDate = yyyy + '-' + mm + '-' + dd;

        let openOptimizations = await optimizationDb.getOpenOptimizationsByDate(todayDate)

        optimizationDataStringToJson(openOptimizations.data)
        openOptimizations.data.forEach((optimization: any) => {
            loopBlockDistribution(optimization)
        });
    
    });
    
}


/**
 * This Function loops through the optimization and publishes the optimization commands every 15 min
 * @param {any} optimization optimization object
 */
async function loopBlockDistribution(optimization: any) {

    let cntValue: number = 0;
    let mqttPublisher: MqttPublisher = new MqttPublisher();
    let distributionInterval = setInterval(sendOptimizationBlocks, 3000 /* optimizationTimeBlockSize * 1000 */);
    async function sendOptimizationBlocks() {

        let mqttPayload = {
            timestamp: Date.now(),
            value: optimization.data.clDemand.value[cntValue]
        }
        let mqttTopic = `${config.mqttPublishing.project}/${optimization.tenant}/${config.mqttPublishing.energyDirection}`
        let tenantIsActive = await tenantDb.getActiveStatus(optimization.tenant)

        // if client is not active shut down interval loop
        if (tenantIsActive !== 1) {
            clearInterval(distributionInterval);
        } 
        // if interval over lenght of value array, shut down interval loop
        else if (cntValue >= optimization.data.clDemand.value.length) {
            clearInterval(distributionInterval);
        }
        // if value > 0, then publish at mqtt broaker
        else if (optimization.data.clDemand.value[cntValue] > 0) {
            mqttPublisher.publish(mqttTopic, JSON.stringify(mqttPayload));
        } else {
            console.log('publish')
            mqttPublisher.publish(mqttTopic, JSON.stringify(mqttPayload));
        }

        cntValue += 1

    }
}
