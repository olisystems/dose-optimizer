
import { IOptimizationFeed } from '../data-models/energy-profile';
import { MqttPublisher } from "./mqtt-publisher";

export class Optimizer {

    // fields
    private _optimizatoinFeed: IOptimizationFeed;
    private _optimization: IOptimizationFeed; 

    private _acStartInterval: number;
    private _acEndInterval: number;
    private _clStartInterval: number;
    private _clEndInterval: number;

    private _acMaxLoad: number;
    private _clMaxLoad: number;

    // constructor
    constructor (

        optimizatoinFeed: IOptimizationFeed
    ) {
        
        this._optimizatoinFeed = optimizatoinFeed;
        this._optimization =  JSON.parse(JSON.stringify(this._optimizatoinFeed));
        this._acStartInterval = optimizatoinFeed.acTimeRange[0];
        this._acEndInterval = optimizatoinFeed.acTimeRange[1];
        this._clStartInterval = optimizatoinFeed.clTimeRange[0];
        this._clEndInterval = optimizatoinFeed.clTimeRange[1];
        this._acMaxLoad = optimizatoinFeed.acMaxLoad;
        this._clMaxLoad = optimizatoinFeed.clMaxLoad;
    }

    
    public getOptimization () {
        
        // ac demand optimization
        if (this.optimizationIsNecessary(this._optimizatoinFeed.supply.value, this._optimizatoinFeed.loadStatic.value, this._optimizatoinFeed.acDemand.value)) {

            this._optimization.acDemand.value = this.optimizeAc();
        } 
        // cl demand optimization
        if (this.optimizationIsNecessary(this._optimizatoinFeed.supply.value, this._optimizatoinFeed.loadStatic.value, this._optimizatoinFeed.clDemand.value)) {
            
            this._optimization.clDemand.value = this.optimizeCl();
        } 

        return this._optimization;
    }


    private optimizationIsNecessary (supply: number[], loadStatic: number[], demand: number[]): boolean {

        var optimizationIsNecessary: boolean = false; 

        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });

        // check if any demand value exceeds a supply value 
        supply.forEach(function(supplyValue, index) {
            
            if ( ((supplyValue - loadSum[index]) < 0) && (demand[index] > 0 ) ) {
                optimizationIsNecessary = true;
            }
        });

        return optimizationIsNecessary;
    }


    private sumOfExceedingDemand (supply: number[], loadStatic: number[], demand: number[]): number {

        var sumOfExceedingDemand: number = 0; 

        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });

        // check if any demand value exceeds a supply value 
        supply.forEach(function(supplyValue, index) {
            
            if ( ((supplyValue - loadSum[index]) < 0) && (demand[index] > 0) ) {
                
                
                if (loadStatic[index] > supply[index]) {

                    sumOfExceedingDemand += demand[index];
                } else {

                    sumOfExceedingDemand += (loadSum[index] - supplyValue);
                }
            }
        });

        return sumOfExceedingDemand;
    }


    private deleteExceedingDemand (supply: number[], loadStatic: number[], demand: number[], deletedExceedingDemands: number[]): number[] {

        var deletedExceedingDemands: number[] = deletedExceedingDemands;
        var deleteAmount: number;
        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });

        // check if any demand value exceeds a supply value 
        supply.forEach(function(supplyValue, index) {
            
            if ( ((supplyValue - loadSum[index]) < 0) && (demand[index] > 0) ) {
                
                
                if (loadStatic[index] > supply[index]) {

                    deleteAmount = demand[index];
                } else {

                    deleteAmount = (loadSum[index] - supplyValue);
                }

                deletedExceedingDemands[index] -= deleteAmount; 
            }

        });
        
        return deletedExceedingDemands;
    }

    
    private optimizeAc (): number[] {
        
        let supplyValues = [...this._optimizatoinFeed.supply.value];
        let loadValues = [...this._optimizatoinFeed.loadStatic.value];
        let optimizedDemandValues = [...this._optimizatoinFeed.acDemand.value];
        let acStartInterval = this._acStartInterval;
        let acMaxLoad: number = this._acMaxLoad;
        
        // loop through demand values
        // if there is a demand for a block, then take it and try to distrbute it in the ac range
        optimizedDemandValues.forEach(function(value, index) {
            
            // set demand to distribute by cutting demand with the supply 
            var demandToDistribute: number = (value + loadValues[index] - supplyValues[index]);
            // if demand is more than the maximum ac load, then reduce the demand to maximum ac load
            if ( (supplyValues[index] - loadValues[index]) >= acMaxLoad ) {

                demandToDistribute = value - acMaxLoad;
            }

            if (value > 0) {
                
                // loop from ac-start to ac-end
                for (var i: number = index - 1; i >= acStartInterval -1; i--) {
                    
                    // calculate free supply 
                    // if free supply is more than (acMaxLoad - optimizedDemandValues[i]) 
                    // then free supply = (acMaxLoad - optimizedDemandValues[i]). 
                    //var freeSupply: number = Math.floor( Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (acMaxLoad - optimizedDemandValues[i])) / 100) * 100;
                    var freeSupply: number = Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (acMaxLoad - optimizedDemandValues[i]));

                    // if free capacity and the acMaxLoad is not yet fully used then distribute
                    if (freeSupply > 0) {
                        
                        // if demandToDistribute fits completly in free supply and demandToDistribute <= acMaxLoad 
                        // then shift whole demandToDistribute block in free supply Block
                        if ((freeSupply - demandToDistribute) >= 0) {

                            optimizedDemandValues[i] += demandToDistribute;
                            optimizedDemandValues[index] -= demandToDistribute;

                            break;
                        } 
                        // sift a part of demandToDistribute block in the free supply block (free supply block is full now) 
                        else {

                            optimizedDemandValues[i] += freeSupply;
                            optimizedDemandValues[index] -= freeSupply;                            
                            demandToDistribute -= freeSupply;
                        }
                    }
                }
            }
        });

        return optimizedDemandValues;
    }


    private optimizeCl (): number[] {
        
        let supplyValues = [...this._optimizatoinFeed.supply.value];
        let loadValues = [...this._optimizatoinFeed.loadStatic.value];
        let acDemandValues = this._optimization.acDemand.value;
        let optimizedDemandValues = [...this._optimizatoinFeed.clDemand.value];
        let clStartInterval = this._clStartInterval;
        let clEndInterval = this._clEndInterval;
        let clMaxLoad: number = this._clMaxLoad;
        let sumOfExceedingDemand: number; 


        // set new load values by summing up the static loads and the ac demand
        loadValues = loadValues.map(function (num, index) {
            return num + acDemandValues[index];
        });
        
        // loop through demand values
        // if there is a demand for a block, then take it and try to distrbute it in the ac range
        optimizedDemandValues.forEach(function(value, index) {
            
            // distribute ac demand in the 
            var demandToDistribute: number = value;
            
            if (value > 0) {
                
                // loop from ac-start to ac-end
                for (var i: number = clStartInterval - 1; i < clEndInterval; i++) {
                    
                    // calculate free supply
                    // if free supply is more than (acMaxLoad - optimizedDemandValues[i]) 
                    // then free supply = (acMaxLoad - optimizedDemandValues[i]). 
                    //var freeSupply: number = Math.floor( Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (clMaxLoad - optimizedDemandValues[i])) / 100) * 100;
                    var freeSupply: number = Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (clMaxLoad - optimizedDemandValues[i]));

                    // if free capacity and the acMaxLoad is not yet fully used then distribute
                    if (freeSupply > 0) {
                        
                        // if demandToDistribute fits in free supply and demandToDistribute <= acMaxLoad 
                        // then shift whole demandToDistribute block in free supply Block
                        if ((freeSupply - demandToDistribute) >= 0) {

                            optimizedDemandValues[i] += demandToDistribute;
                            optimizedDemandValues[index] -= demandToDistribute

                            break;
                        } 
                        // sift a part of demandToDistribute block in the free supply block (free supply block is full now) 
                        else {

                            optimizedDemandValues[i] += freeSupply;
                            optimizedDemandValues[index] -= freeSupply;                            
                            demandToDistribute -= freeSupply;
                        }
                    }
                }
            }
        });

        // distribute rest if exists
        sumOfExceedingDemand = this.sumOfExceedingDemand(supplyValues, loadValues, optimizedDemandValues);
        if (sumOfExceedingDemand > 0) {
            
            // delete rest from optimizedDemandValues
            optimizedDemandValues = this.deleteExceedingDemand(supplyValues, loadValues, optimizedDemandValues, optimizedDemandValues);
            
            // distribute the rest
            var i: number = this._clStartInterval
            while (sumOfExceedingDemand > 0) {

                for (var i: number = clStartInterval - 1; i < clEndInterval; i++) {

                    if (sumOfExceedingDemand >= 100) {
                        
                        optimizedDemandValues[i] += 100; 
                        sumOfExceedingDemand -= 100;
                    } else {
                        
                        optimizedDemandValues[i] += sumOfExceedingDemand; 
                        sumOfExceedingDemand -= sumOfExceedingDemand;
                    }

                    if (sumOfExceedingDemand <= 0) {
                        
                        break;
                    }
                }
            }
        }

        // return optimized cl values
        return optimizedDemandValues;
    }

    
    public publishOptimization () {

        var publisher: MqttPublisher = new MqttPublisher();
        publisher.publish('myTestTopic', '{"key1": "val1", "key2": "val2", "key3": "val3"}');
    }

}
