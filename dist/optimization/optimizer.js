"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Optimizer = /** @class */ (function () {
    // constructor
    function Optimizer(optimizatoinFeed) {
        this._optimizatoinFeed = optimizatoinFeed;
        this._optimization = JSON.parse(JSON.stringify(this._optimizatoinFeed));
        this._acStartInterval = optimizatoinFeed.acTimeRange[0];
        this._acEndInterval = optimizatoinFeed.acTimeRange[1];
        this._clStartInterval = optimizatoinFeed.clTimeRange[0];
        this._clEndInterval = optimizatoinFeed.clTimeRange[1];
        this._acMaxLoad = optimizatoinFeed.acMaxLoad;
        this._clMaxLoad = optimizatoinFeed.clMaxLoad;
    }
    Optimizer.prototype.getOptimization = function () {
        // ac demand optimization
        if (this.optimizationIsNecessary(this._optimizatoinFeed.supply.value, this._optimizatoinFeed.loadStatic.value, this._optimizatoinFeed.acDemand.value)) {
            this._optimization.acDemand.value = this.optimizeAc();
        }
        // cl demand optimization
        if (this.optimizationIsNecessary(this._optimizatoinFeed.supply.value, this._optimizatoinFeed.loadStatic.value, this._optimizatoinFeed.clDemand.value)) {
            this._optimization.clDemand.value = this.optimizeCl();
        }
        return this._optimization;
    };
    Optimizer.prototype.optimizationIsNecessary = function (supply, loadStatic, demand) {
        var optimizationIsNecessary = false;
        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });
        // check if any demand value exceeds a supply value 
        supply.forEach(function (supplyValue, index) {
            if (((supplyValue - loadSum[index]) < 0) && (demand[index] > 0)) {
                optimizationIsNecessary = true;
            }
        });
        return optimizationIsNecessary;
    };
    Optimizer.prototype.sumOfExceedingDemand = function (supply, loadStatic, demand) {
        var sumOfExceedingDemand = 0;
        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });
        // check if any demand value exceeds a supply value 
        supply.forEach(function (supplyValue, index) {
            if (((supplyValue - loadSum[index]) < 0) && (demand[index] > 0)) {
                if (loadStatic[index] > supply[index]) {
                    sumOfExceedingDemand += demand[index];
                }
                else {
                    sumOfExceedingDemand += (loadSum[index] - supplyValue);
                }
            }
        });
        return sumOfExceedingDemand;
    };
    Optimizer.prototype.deleteExceedingDemand = function (supply, loadStatic, demand, deletedExceedingDemandsP) {
        var deletedExceedingDemands = deletedExceedingDemandsP;
        var deleteAmount;
        // sum up static load and demand
        var loadSum = loadStatic.map(function (loadSum, index) {
            return loadSum + demand[index];
        });
        // check if any demand value exceeds a supply value 
        supply.forEach(function (supplyValue, index) {
            if (((supplyValue - loadSum[index]) < 0) && (demand[index] > 0)) {
                if (loadStatic[index] > supply[index]) {
                    deleteAmount = demand[index];
                }
                else {
                    deleteAmount = (loadSum[index] - supplyValue);
                }
                deletedExceedingDemands[index] -= deleteAmount;
            }
        });
        return deletedExceedingDemands;
    };
    Optimizer.prototype.optimizeAc = function () {
        var supplyValues = __spreadArrays(this._optimizatoinFeed.supply.value);
        var loadValues = __spreadArrays(this._optimizatoinFeed.loadStatic.value);
        var optimizedDemandValues = __spreadArrays(this._optimizatoinFeed.acDemand.value);
        var acStartInterval = this._acStartInterval;
        var acMaxLoad = this._acMaxLoad;
        // loop through demand values
        // if there is a demand for a block, then take it and try to distrbute it in the ac range
        optimizedDemandValues.forEach(function (value, index) {
            // set demand to distribute by cutting demand with the supply 
            var demandToDistribute = (value + loadValues[index] - supplyValues[index]);
            // if demand is more than the maximum ac load, then reduce the demand to maximum ac load
            if ((supplyValues[index] - loadValues[index]) >= acMaxLoad) {
                demandToDistribute = value - acMaxLoad;
            }
            if (value > 0) {
                // loop from ac-start to ac-end
                for (var i = index - 1; i >= acStartInterval - 1; i--) {
                    // calculate free supply 
                    // if free supply is more than (acMaxLoad - optimizedDemandValues[i]) 
                    // then free supply = (acMaxLoad - optimizedDemandValues[i]). 
                    //let freeSupply: number = Math.floor( Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (acMaxLoad - optimizedDemandValues[i])) / 100) * 100;
                    var freeSupply = Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (acMaxLoad - optimizedDemandValues[i]));
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
    };
    Optimizer.prototype.optimizeCl = function () {
        var supplyValues = __spreadArrays(this._optimizatoinFeed.supply.value);
        var loadValues = __spreadArrays(this._optimizatoinFeed.loadStatic.value);
        var acDemandValues = this._optimization.acDemand.value;
        var optimizedDemandValues = __spreadArrays(this._optimizatoinFeed.clDemand.value);
        var clStartInterval = this._clStartInterval;
        var clEndInterval = this._clEndInterval;
        var clMaxLoad = this._clMaxLoad;
        var sumOfExceedingDemand;
        // set new load values by summing up the static loads and the ac demand
        loadValues = loadValues.map(function (num, index) {
            return num + acDemandValues[index];
        });
        // loop through demand values
        // if there is a demand for a block, then take it and try to distrbute it in the ac range
        optimizedDemandValues.forEach(function (value, index) {
            // distribute ac demand in the 
            var demandToDistribute = value;
            if (value > 0) {
                // loop from ac-start to ac-end
                for (var i = clStartInterval - 1; i < clEndInterval; i++) {
                    // calculate free supply
                    // if free supply is more than (acMaxLoad - optimizedDemandValues[i]) 
                    // then free supply = (acMaxLoad - optimizedDemandValues[i]). 
                    //let freeSupply: number = Math.floor( Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (clMaxLoad - optimizedDemandValues[i])) / 100) * 100;
                    var freeSupply = Math.min((supplyValues[i] - loadValues[i] - optimizedDemandValues[i]), (clMaxLoad - optimizedDemandValues[i]));
                    // if free capacity and the acMaxLoad is not yet fully used then distribute
                    if (freeSupply > 0) {
                        // if demandToDistribute fits in free supply and demandToDistribute <= acMaxLoad 
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
        // distribute rest if exists
        sumOfExceedingDemand = this.sumOfExceedingDemand(supplyValues, loadValues, optimizedDemandValues);
        if (sumOfExceedingDemand > 0) {
            // delete rest from optimizedDemandValues
            optimizedDemandValues = this.deleteExceedingDemand(supplyValues, loadValues, optimizedDemandValues, optimizedDemandValues);
            // distribute the rest
            var i = this._clStartInterval;
            while (sumOfExceedingDemand > 0) {
                for (var i_1 = clStartInterval - 1; i_1 < clEndInterval; i_1++) {
                    if (sumOfExceedingDemand >= 100) {
                        optimizedDemandValues[i_1] += 100;
                        sumOfExceedingDemand -= 100;
                    }
                    else {
                        optimizedDemandValues[i_1] += sumOfExceedingDemand;
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
    };
    return Optimizer;
}());
exports.Optimizer = Optimizer;
