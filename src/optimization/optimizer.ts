
import { IOptimizationFeed, EnergyProfile, IEnergyProfile } from '../data-models/energy-profile';
import { start } from 'repl';

export class Optimizer {

    // fields
    public _optimizatoinFeed: IOptimizationFeed;
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
        
        // 1. check if ac optimizaiton is necessary 
        // if yes, then optimize
        // if not then next
        if (this.optimizationIsNecessary(this._optimizatoinFeed.supply.value, this._optimizatoinFeed.acDemand.value)) {

            let acDemandOptimized: number[];
            acDemandOptimized = this.optimizeAC();
            this._optimization.acDemand.value = acDemandOptimized;
        } 
        // 2. check if ac optimizaiton is necessary 
        // if yes, then optimize
        // if not then next
        if (this._optimizatoinFeed.supply.value, this._optimizatoinFeed.clDemand.value) {
            
            console.log('in 2.) cl optimization')
        } 
        // optimizaiton is not necessary
        else {

            this._optimization = this._optimizatoinFeed;
        }

        return this._optimization;
    }


    private optimizationIsNecessary (supply: number[], demand: number[]): boolean {

        var optimizationIsNecessary: boolean = false; 
        supply.forEach(function(value, index) {
            
            if ((value - demand[index]) < 0) {
                optimizationIsNecessary = true;
            }
        });

        return optimizationIsNecessary;
    }


    private optimizeAC (): number[] {
        
        let demandValues = [...this._optimizatoinFeed.acDemand.value];
        let supplyValues = [...this._optimizatoinFeed.supply.value]
        let loadValues = [...this._optimizatoinFeed.loadStatic.value]
        let optimizedDemandValues = [...this._optimizatoinFeed.acDemand.value];
        
        let acStartInterval = this._acStartInterval;
        let acEndInterval = this._acEndInterval;

        let acMaxLoad: number = this._acMaxLoad;
        
        // loop through demand values
        // if there is a demand for a block, then take it and try to distrbute it in the ac range
        demandValues.forEach(function(value, index) {
            
            if (value > 0) {
                
                // distribute ac demand in the 
                var demandToDistribute: number = value;
                var freeSupply: number;

                // loop from ac-start to ac-end
                var i: number;
                for (i = acStartInterval - 1; i < acEndInterval; i++) {
                    
                    // calculate free supply
                    freeSupply = supplyValues[i] - loadValues[i];
                    // if free supply is more than (acMaxLoad - optimizedDemandValues[i]) then free supply = (acMaxLoad - optimizedDemandValues[i]). 
                    //freeSupply = Math.min(freeSupply, (acMaxLoad - optimizedDemandValues[i]));
                    freeSupply = Math.floor( (Math.min(freeSupply, (acMaxLoad - optimizedDemandValues[i]))) / 100) * 100;
                    //Math.round(number/100) * 100 
                    // if free capacity and the acMaxLoad is not yet fully used then distribute
                    if (freeSupply > 0) {
                        
                        // if demandToDistribute fits in free supply and demandToDistribute <= acMaxLoad then shift whole demandToDistribute block in free supply Block
                        if ((freeSupply - demandToDistribute) >= 0) {

                            optimizedDemandValues[i] += demandToDistribute;
                            optimizedDemandValues[index] = 0
                            demandValues[index] = 0;
                            loadValues[i] += demandToDistribute;

                            break;
                        } 
                        // sift a part of demandToDistribute block in the free supply block (free supply block is full now) 
                        else {

                            optimizedDemandValues[i] += freeSupply;
                            optimizedDemandValues[index] -= freeSupply;
                            demandValues[index] -= freeSupply;
                            loadValues[i] += freeSupply;
                            
                            demandToDistribute -= freeSupply;
                        }
                    }
                }
            }
        });

        return optimizedDemandValues;
    }
}
