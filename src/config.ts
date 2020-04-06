
export const config = {
    
    roundingDemands: {
        direction: 'up',
        to: 200
    },
    
    optimizationTimeBlockSize: 15,  // frequency in minutes
    
    optimizationActivationFrequency: '0 0 * * *', // every day at 00:00

    gmtTimeZone: 1,
    
    keycloak: {
        secret: 'e2c8dcd1-436e-4674-a8c9-076a93d09077',
        role: 'realm:technician'
    },

    mqttPublishing: {
        project: 'DOSE',
        energyDirection: 'activeEnergy'
    }
    
}
