
/**
 * NOTE: If used mock data already exist in database, they must be removed befor unit testing
 */


require('dotenv').config();
var request = require('request');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mockData = require('./mock-data');
var url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.API_VERSION}/optimizations`;



describe('Post request response', function() {
    
    it('Properties', async function() {

        let optimizationResponse = await request.post(url, { json: [mockData.optimizationFeeds[0]] })
        optimizationResponse = JSON.parse(optimizationResponse.body)
        optimization = optimizationResponse[0]

        expect(optimization).to.have.all.keys('loadStaticId', 'startDate', 'supplyId', 'tenant', 'supply', 'loadStatic', 'acDemand', 'clDemand', 'acTimeRange', 'clTimeRange', 'acMaxLoad', 'clMaxLoad');
        expect(optimization.supply).to.have.all.keys('oliBox', 'type', 'interval', 'value');
        expect(optimization.loadStatic).to.have.all.keys('oliBox', 'type', 'interval', 'value');
        expect(optimization.acDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
        expect(optimization.clDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
        assert.isArray(optimization.acTimeRange, 'property acTimeRange exists and is Array');
        assert.isArray(optimization.clTimeRange, 'property clTimeRange exists and is Array');
        assert.typeOf(optimization.acMaxLoad, 'number', 'property acMaxLoad exists and is number');
        assert.typeOf(optimization.clMaxLoad, 'number', 'property clMaxLoad exists and is number');        
    });

    it('Structure', async function() {
            
        let optimizationResponse = await request.post(url, { json: [mockData.optimizationFeeds[1]] })
        optimizationResponse = JSON.parse(optimizationResponse.body)
        optimization = optimizationResponse[0]

        assert.lengthOf(optimization.supply.value, 96, 'supply values has length of 96');
        assert.lengthOf(optimization.loadStatic.value, 96, 'loadStatic values has length of 96');
        assert.lengthOf(optimization.acDemand.value, 96, 'acDemand values has length of 96');
        assert.lengthOf(optimization.clDemand.value, 96, 'clDemand values has length of 96');
    });
    
    it('Content', async function() {
        
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let optimizationFeed = mockData.optimizationFeeds[2];
        let optimizationResponse = await request.post(url, { json: [mockData.optimizationFeeds[2]] });
        optimizationResponse = JSON.parse(optimizationResponse.body);
        optimization = optimizationResponse[0];

        sumUnoptiSupply =  optimizationFeed.supply.value.reduce(reducer);
        sumOptiSupply =  optimization.supply.value.reduce(reducer);
        sumUnoptiLoadStatic =  optimizationFeed.loadStatic.value.reduce(reducer);
        sumOptiLoadStatic =  optimization.loadStatic.value.reduce(reducer);
        sumUnoptiAcDemand =  optimizationFeed.acDemand.value.reduce(reducer);
        sumOptiAcDemand =  optimization.acDemand.value.reduce(reducer);
        sumUnoptiClDemand =  optimizationFeed.clDemand.value.reduce(reducer);
        sumOptiClDemand =  optimization.clDemand.value.reduce(reducer);
    });

});
