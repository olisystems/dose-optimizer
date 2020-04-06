
// Ernergy value model
// -----------------------------------------------

export interface IEnergyProfile {

    oliBox: string;
    type: string;
    interval: number[];
    value: number[];
}

export class EnergyProfile implements IEnergyProfile {

    oliBox: string;
    type: string;
    interval: number[];
    value: number[];

    constructor (

        oliBox: string = '',
        type: string = '',
        interval: number[] = [],
        value: number[] = []
    ) {
        
        this.oliBox = oliBox;
        this.type = type;
        this.interval = interval;
        this.value = value;
    }
}

export interface ICallbackEnergyProfile {
    
    ( energyProfile: IEnergyProfile ) : void;
}


// Optimization model
// -----------------------------------------------

export interface IOptimizationFeed {

    supply: IEnergyProfile, 
    loadStatic: IEnergyProfile,
    acDemand: IEnergyProfile,
    clDemand: IEnergyProfile,
    acTimeRange: [number, number],
    clTimeRange: [number, number],
    acMaxLoad: number,
    clMaxLoad: number
}

export interface ICallbackIOptimizationFeed {
    
    ( optimization: IOptimizationFeed ) : void;
}
