
var request = require('request');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mockData = require('./mock-data');
require('dotenv').config();
var url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.API_VERSION}`;



describe('Scenario 1', function() {
    
    var optimizationFeed = mockData.optimizationFeeds[0];
    
    describe('Response data structure', function() {

        it('Properties', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0]

                assert.notExists(error, 'error is undefined');
                expect(optimization).to.have.all.keys('supply', 'loadStatic', 'acDemand', 'clDemand', 'acTimeRange', 'clTimeRange', 'acMaxLoad', 'clMaxLoad');
                expect(optimization.supply).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.loadStatic).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.acDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.clDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                assert.isArray(optimization.acTimeRange, 'property acTimeRange exists and is Array');
                assert.isArray(optimization.clTimeRange, 'property clTimeRange exists and is Array');
                assert.typeOf(optimization.acMaxLoad, 'number', 'property acMaxLoad exists and is number');
                assert.typeOf(optimization.clMaxLoad, 'number', 'property clMaxLoad exists and is number');

                done();
            })
        });

        it('Structure', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0];

                assert.lengthOf(body, 1, 'response body has length of 1');
                assert.lengthOf(optimization.supply.value, 96, 'supply values has length of 6');
                assert.lengthOf(optimization.loadStatic.value, 96, 'loadStatic values has length of 6');
                assert.lengthOf(optimization.acDemand.value, 96, 'acDemand values has length of 6');
                assert.lengthOf(optimization.clDemand.value, 96, 'clDemand values has length of 6');
                
                done();
            })
        });

        it('Content', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimized = body[0];    

                const reducer = (accumulator, currentValue) => accumulator + currentValue;            

                sumUnoptiSupply =  optimizationFeed.supply.value.reduce(reducer);
                sumOptiSupply =  optimized.supply.value.reduce(reducer);
                sumUnoptiLoadStatic =  optimizationFeed.loadStatic.value.reduce(reducer);
                sumOptiLoadStatic =  optimized.loadStatic.value.reduce(reducer);
                sumUnoptiAcDemand =  optimizationFeed.acDemand.value.reduce(reducer);
                sumOptiAcDemand =  optimized.acDemand.value.reduce(reducer);
                sumUnoptiClDemand =  optimizationFeed.clDemand.value.reduce(reducer);
                sumOptiClDemand =  optimized.clDemand.value.reduce(reducer);
                
                console.log(sumUnoptiClDemand);
                console.log(sumOptiClDemand);
                
                expect(optimized.acTimeRange).to.deep.equal(optimizationFeed.acTimeRange, 'unoptimized and optimized acTimeRange values are the same');
                expect(optimized.clTimeRange).to.deep.equal(optimizationFeed.clTimeRange, 'unoptimized and optimized clTimeRange values are the same');
                expect(optimized.acMaxLoad).to.deep.equal(optimizationFeed.acMaxLoad, 'unoptimized and optimized acMaxLoad values are the same');
                expect(optimized.clMaxLoad).to.deep.equal(optimizationFeed.clMaxLoad, 'unoptimized and optimized clMaxLoad values are the same');
                expect(sumUnoptiSupply).to.deep.equal(sumOptiSupply, 'sum of unoptimized and optimized supply values are the same');
                expect(sumUnoptiLoadStatic).to.deep.equal(sumOptiLoadStatic, 'sum of unoptimized and optimized loadStatic values are the same');
                expect(sumUnoptiAcDemand).to.deep.equal(sumOptiAcDemand, 'sum of unoptimized and optimized acDemand values are the same');
                //expect(sumUnoptiClDemand).to.deep.equal(sumOptiClDemand, 'sum of unoptimized and optimized clDemand values are the same');
                
                done();
            })
        });

        it('Rules', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimized = body[0];    

                //TODO: test if optimized ac and cl values are in in the optimization ranges 
                expect(sumUnoptiClDemand).to.deep.equal(sumOptiClDemand, 'sum of unoptimized and optimized clDemand values are the same');
                
                done();
            })
        });
    })
})


describe('Scenario 2', function() {
    
    var optimizationFeed = mockData.optimizationFeeds[1];
    
    describe('Response data structure', function() {

        it('Properties', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0]

                assert.notExists(error, 'error is undefined');
                expect(optimization).to.have.all.keys('supply', 'loadStatic', 'acDemand', 'clDemand', 'acTimeRange', 'clTimeRange', 'acMaxLoad', 'clMaxLoad');
                expect(optimization.supply).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.loadStatic).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.acDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.clDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                assert.isArray(optimization.acTimeRange, 'property acTimeRange exists and is Array');
                assert.isArray(optimization.clTimeRange, 'property clTimeRange exists and is Array');
                assert.typeOf(optimization.acMaxLoad, 'number', 'property acMaxLoad exists and is number');
                assert.exists(optimization.clMaxLoad, 'number', 'property clMaxLoad exists and is number');

                done();
            })
        });

        it('Structure', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0];

                assert.lengthOf(body, 1, 'response body has length of 1');
                assert.lengthOf(optimization.supply.value, 96, 'supply values has length of 6');
                assert.lengthOf(optimization.loadStatic.value, 96, 'loadStatic values has length of 6');
                assert.lengthOf(optimization.acDemand.value, 96, 'acDemand values has length of 6');
                assert.lengthOf(optimization.clDemand.value, 96, 'clDemand values has length of 6');
                
                done();
            })
        });

        it('Content', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimized = body[0];    

                const reducer = (accumulator, currentValue) => accumulator + currentValue;            

                sumUnoptiSupply =  optimizationFeed.supply.value.reduce(reducer);
                sumOptiSupply =  optimized.supply.value.reduce(reducer);
                sumUnoptiLoadStatic =  optimizationFeed.loadStatic.value.reduce(reducer);
                sumOptiLoadStatic =  optimized.loadStatic.value.reduce(reducer);
                sumUnoptiAcDemand =  optimizationFeed.acDemand.value.reduce(reducer);
                sumOptiAcDemand =  optimized.acDemand.value.reduce(reducer);
                sumUnoptiClDemand =  optimizationFeed.clDemand.value.reduce(reducer);
                sumOptiClDemand =  optimized.clDemand.value.reduce(reducer);
                
                expect(optimized.acTimeRange).to.deep.equal(optimizationFeed.acTimeRange, 'unoptimized and optimized acTimeRange values are the same');
                expect(optimized.clTimeRange).to.deep.equal(optimizationFeed.clTimeRange, 'unoptimized and optimized clTimeRange values are the same');
                expect(optimized.acMaxLoad).to.deep.equal(optimizationFeed.acMaxLoad, 'unoptimized and optimized acMaxLoad values are the same');
                expect(optimized.clMaxLoad).to.deep.equal(optimizationFeed.clMaxLoad, 'unoptimized and optimized clMaxLoad values are the same');
                expect(sumUnoptiSupply).to.deep.equal(sumOptiSupply, 'sum of unoptimized and optimized supply values are the same');
                expect(sumUnoptiLoadStatic).to.deep.equal(sumOptiLoadStatic, 'sum of unoptimized and optimized loadStatic values are the same');
                expect(sumUnoptiAcDemand).to.deep.equal(sumOptiAcDemand, 'sum of unoptimized and optimized acDemand values are the same');
                //expect(sumUnoptiClDemand).to.deep.equal(sumOptiClDemand, 'sum of unoptimized and optimized clDemand values are the same');
                
                done();
            })
        });
    })
})


describe('Scenario 3', function() {
    
    var optimizationFeed = mockData.optimizationFeeds[2];
    
    describe('Response data structure', function() {

        it('Properties', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0]

                assert.notExists(error, 'error is undefined');
                expect(optimization).to.have.all.keys('supply', 'loadStatic', 'acDemand', 'clDemand', 'acTimeRange', 'clTimeRange', 'acMaxLoad', 'clMaxLoad');
                expect(optimization.supply).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.loadStatic).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.acDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                expect(optimization.clDemand).to.have.all.keys('oliBox', 'type', 'interval', 'value');
                assert.isArray(optimization.acTimeRange, 'property acTimeRange exists and is Array');
                assert.isArray(optimization.clTimeRange, 'property clTimeRange exists and is Array');
                assert.typeOf(optimization.acMaxLoad, 'number', 'property acMaxLoad exists and is number');
                assert.exists(optimization.clMaxLoad, 'number', 'property clMaxLoad exists and is number');

                done();
            })
        });

        it('Structure', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimization = body[0];

                assert.lengthOf(body, 1, 'response body has length of 1');
                assert.lengthOf(optimization.supply.value, 96, 'supply values has length of 6');
                assert.lengthOf(optimization.loadStatic.value, 96, 'loadStatic values has length of 6');
                assert.lengthOf(optimization.acDemand.value, 96, 'acDemand values has length of 6');
                assert.lengthOf(optimization.clDemand.value, 96, 'clDemand values has length of 6');
                
                done();
            })
        });

        it('Content', function(done) {
            
            request.post(url, { json: [optimizationFeed] }, function(error, response, body) {
                
                if (error) {
                    console.log(error);
                }

                let optimized = body[0];    

                const reducer = (accumulator, currentValue) => accumulator + currentValue;            

                sumUnoptiSupply =  optimizationFeed.supply.value.reduce(reducer);
                sumOptiSupply =  optimized.supply.value.reduce(reducer);
                sumUnoptiLoadStatic =  optimizationFeed.loadStatic.value.reduce(reducer);
                sumOptiLoadStatic =  optimized.loadStatic.value.reduce(reducer);
                sumUnoptiAcDemand =  optimizationFeed.acDemand.value.reduce(reducer);
                sumOptiAcDemand =  optimized.acDemand.value.reduce(reducer);
                sumUnoptiClDemand =  optimizationFeed.clDemand.value.reduce(reducer);
                sumOptiClDemand =  optimized.clDemand.value.reduce(reducer);
                
                expect(optimized.acTimeRange).to.deep.equal(optimizationFeed.acTimeRange, 'unoptimized and optimized acTimeRange values are the same');
                expect(optimized.clTimeRange).to.deep.equal(optimizationFeed.clTimeRange, 'unoptimized and optimized clTimeRange values are the same');
                expect(optimized.acMaxLoad).to.deep.equal(optimizationFeed.acMaxLoad, 'unoptimized and optimized acMaxLoad values are the same');
                expect(optimized.clMaxLoad).to.deep.equal(optimizationFeed.clMaxLoad, 'unoptimized and optimized clMaxLoad values are the same');
                expect(sumUnoptiSupply).to.deep.equal(sumOptiSupply, 'sum of unoptimized and optimized supply values are the same');
                expect(sumUnoptiLoadStatic).to.deep.equal(sumOptiLoadStatic, 'sum of unoptimized and optimized loadStatic values are the same');
                expect(sumUnoptiAcDemand).to.deep.equal(sumOptiAcDemand, 'sum of unoptimized and optimized acDemand values are the same');
                //expect(sumUnoptiClDemand).to.deep.equal(sumOptiClDemand, 'sum of unoptimized and optimized clDemand values are the same');
                
                done();
            })
        });
    })
})