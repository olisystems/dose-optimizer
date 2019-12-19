
import { Optimizer } from '../../src/optimization/optimizer';
import { expect } from 'chai';
import 'mocha';



import { optimizationTests } from './test-data';

var optimizer = new Optimizer(
    {
        supply: optimizationTests[0].supply,
        loadStatic: optimizationFeeds[0].loadStatic,
        acDemand: optimizationFeeds[0].acDemand,
        clDemand: optimizationFeeds[0].clDemand,
        acTimeRange: optimizationFeeds[0].acTimeRange,
        clTimeRange: optimizationFeeds[0].clTimeRange,
        acMaxLoad: optimizationFeeds[0].acMaxLoad,
        clMaxLoad: optimizationFeeds[0].clMaxLoad
    }
);
    