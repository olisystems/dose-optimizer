
require('dotenv').config();
const axios = require("axios");
const mockData = require('./mock-data');

const optimizationFeed = mockData.optimizationFeeds[0];
const url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.API_VERSION}`;
var cnt = 0;

async function getData(url) {
    
    var stopper = false;
    while(!stopper) {
        cnt += 1;
        try {

            const response = await axios.post(url, [optimizationFeed]);
            const data = response.data;
            console.log('request no: ' + cnt);
        } catch (error) {
            stopper = true;
            console.log(error);
        }
    }
};

getData(url);
