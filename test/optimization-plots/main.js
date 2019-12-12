
// config
// ---------------------------------------------------------

const url = 'http://192.168.43.55';
const port = '3011';
const apiVersion = 'v1';



// mock optimization feeds
// ---------------------------------------------------------

const optimizationFeeds = [
    
    

    {
        "supply": {
          "oliBox": "OLI_33",
          "type": "activeEnery",
          "interval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
          "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 21, 41, 93, 173, 203, 226, 322, 367, 373, 438, 967, 858, 750, 1577, 1695, 1736, 1781, 1794, 1786, 1768, 1785, 1778, 1714, 1687, 1603, 1492, 1422, 1290, 1290, 1005, 821, 844, 677, 525, 355, 229, 146, 82, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "loadStatic": {
          "oliBox": "OLI_33",
          "type": "activeEnery",
          "interval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
          "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 200, 200, 300, 400, 450, 500, 500, 550, 550, 600, 650, 700, 850, 900, 1000, 1000, 900, 850, 850, 800, 750, 700, 650, 600, 300, 300, 350, 350, 200, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "acDemand": {
          "oliBox": "OLI_33",
          "type": "activeEnery",
          "interval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
          "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1400, 1500, 1800, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "clDemand": {
          "oliBox": "OLI_33",
          "type": "activeEnery",
          "interval": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
          "value": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1600, 1400, 1800, 1100, 1200, 800, 1000, 1400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        "acTimeRange": [
          45,
          65
        ],
        "clTimeRange": [
          40,
          75
        ],
        "acMaxLoad": 1000,
        "clMaxLoad": 2000
    },

    
    
    {
        id: "OLI_12",
        supply: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 21, 41, 93, 173, 203, 226, 322, 367, 373, 438, 967, 858, 750, 1577, 1695, 1736, 1781, 1794, 1786, 1768, 1785, 1778, 1714, 1687, 1603, 1492, 1422, 1290, 1290, 1005, 821, 844, 677, 525, 355, 229, 146, 82, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        loadStatic: { 
            value:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 200, 200, 300, 400, 450, 500, 500, 550, 550, 600, 650, 700, 850, 900, 1000, 1000, 900, 850, 850, 800, 750, 700, 650, 600, 300, 300, 350, 350, 200, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1400, 1500, 1800, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },    
        clDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1600, 1400, 1800, 1100, 1200, 800, 1000, 1400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acTimeRange: [45, 65],
        clTimeRange: [40, 75],
        acMaxLoad: 1000,
        clMaxLoad: 2000
    },
    {
        id: "OLI_45",
        supply: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 21, 41, 93, 173, 203, 226, 322, 367, 373, 438, 967, 858, 750, 1577, 1695, 1736, 1781, 1794, 1786, 1768, 1785, 1778, 1714, 1687, 1603, 1492, 1422, 1290, 1290, 1005, 821, 844, 677, 525, 355, 229, 146, 82, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        loadStatic: { 
            value:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 200, 200, 300, 400, 450, 500, 500, 550, 550, 600, 650, 700, 850, 900, 1000, 1000, 900, 850, 850, 800, 750, 700, 650, 600, 300, 300, 350, 350, 200, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 3400, 1500, 1800, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },    
        clDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1600, 1400, 1800, 1100, 1200, 800, 1000, 1400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acTimeRange: [45, 65],
        clTimeRange: [40, 75],
        acMaxLoad: 1000,
        clMaxLoad: 2000
    },
    {
        id: "OLI_230",
        supply: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 21, 41, 93, 173, 203, 226, 322, 367, 373, 438, 967, 858, 750, 1577, 1695, 1736, 1781, 1794, 1786, 1768, 1785, 1778, 1714, 1687, 1603, 1492, 1422, 1290, 1290, 1005, 821, 844, 677, 525, 355, 229, 146, 82, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        loadStatic: { 
            value:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100, 100, 100, 100, 200, 200, 300, 400, 450, 500, 500, 550, 550, 600, 650, 700, 850, 900, 1000, 1000, 900, 850, 850, 800, 750, 700, 650, 600, 300, 300, 350, 350, 200, 100, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1400, 1500, 1800, 1200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },    
        clDemand: { 
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1600, 1600, 3400, 1800, 1100, 1200, 800, 1000, 1400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        acTimeRange: [45, 65],
        clTimeRange: [40, 75],
        acMaxLoad: 1000,
        clMaxLoad: 2000
    }
]



// run plots
// ---------------------------------------------------------

plotUnoptimized(optimizationFeeds[0], 'unoptimized1');
plotUnoptimized(optimizationFeeds[1], 'unoptimized2');
plotUnoptimized(optimizationFeeds[2], 'unoptimized3');

/*
function plotOptimized1(optimizationFeeds[0], 'unoptimized1') {

}
*/



// plot unoptimized data
// ---------------------------------------------------------

async function plotUnoptimized(optimizationFeed, unoptimizedDivId) {

    var optimizationData = {...optimizationFeed};
    var optiFeed = await getOptimizedData();
    console.log(optiFeed)

    x1 = optimizationData.supply.interval;
    x2 = optimizationData.loadStatic.interval;
    x3 = optimizationData.acDemand.interval;
    x4 = optimizationData.clDemand.interval;

    y1 = optimizationData.supply.value;
    y2 = optimizationData.loadStatic.value;
    y3 = optimizationData.acDemand.value;
    y4 = optimizationData.clDemand.value;

    var trace1 = {
        x: x1,
        y: y1,
        mode: 'lines',
        line: {
            shape: 'hvh'
        },
        type: 'scatter',
        marker: {
            color: '#FF0000'
        },
        name: 'supply'
    };

    var trace2 = {
        x: x2,
        y: y2,
        type: 'bar',
        marker: {
            color: '#808080'
        },
        name: 'static load'
    };

    var trace3 = {
        x: x3,
        y: y3,
        type: 'bar',
        marker: {
            color: '#3333ff'
        },
        name: 'ac demand'
    };

    var trace4 = {
        x: x4,
        y: y4,
        type: 'bar',
        marker: {
            color: '#ff8000'
        },
        name: 'cl demand'
    };

    var trace5 = {
        x: [optimizationData.acTimeRange[0] - 0.5, optimizationData.acTimeRange[0] - 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'ac start',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#3333ff'
        },
    };

    var trace6 = {
        x: [optimizationData.acTimeRange[1] + 0.5, optimizationData.acTimeRange[1] + 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'ac end',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#3333ff'
        },
    };

    var trace7 = {
        x: [optimizationData.clTimeRange[0] - 0.5, optimizationData.clTimeRange[0] - 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'cl start',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#ff8000'
        },
    };

    var trace8 = {
        x: [optimizationData.clTimeRange[1] + 0.5, optimizationData.clTimeRange[1] + 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'cl end',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#ff8000'
        },
    };


    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];

    var layout = {
        barmode: 'stack',
        title: {
            text: 'Unoptimized Plot',
            font: {
                family: 'Courier New, monospace',
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: {
                text: 't (15 min blocks)',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
        },
        yaxis: {
            title: {
                text: 'power [kWh]',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }
    };

    // plot graph
    Plotly.newPlot(unoptimizedDivId, data, layout, {
        showSendToCloud: true
    });

    // plot summed values
    document.getElementById("sumSupplyUnoptimized").innerHTML = 'sum supply: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + optimizationData.supply.value.reduce(sumArrayElements);
    document.getElementById("sumStaticLoadUnoptimized").innerHTML = 'sum static load: &nbsp;&nbsp;' + optimizationData.loadStatic.value.reduce(sumArrayElements);
    document.getElementById("sumAcDemandUnoptimized").innerHTML = 'sum ac demand: &nbsp;' + optimizationData.acDemand.value.reduce(sumArrayElements);
    document.getElementById("sumClDemandUnoptimized").innerHTML = 'sum cl demand: &nbsp;&nbsp;' + optimizationData.clDemand.value.reduce(sumArrayElements);

    function sumArrayElements(total, num) {
        return total + num;
    }

}



// get optimization data
async function getUnoptimizedData() {

    const requestUrl = `${url}:${port}/${apiVersion}`;
    const response = await fetch(requestUrl);
    const optimizationData = await response.json();

    return optimizationData;
}




// plot optimized data
// ---------------------------------------------------------

async function plotOptimized1() {

    var optimizationData = await getOptimizedData();
    optimizationData = optimizationData[0];

    x1 = optimizationData.supply.interval;
    x2 = optimizationData.loadStatic.interval;
    x3 = optimizationData.acDemand.interval;
    x4 = optimizationData.clDemand.interval;

    y1 = optimizationData.supply.value;
    y2 = optimizationData.loadStatic.value;
    y3 = optimizationData.acDemand.value;
    y4 = optimizationData.clDemand.value;

    var trace1 = {
        x: x1,
        y: y1,
        mode: 'lines',
        line: {
            shape: 'hvh'
        },
        type: 'scatter',
        marker: {
            color: '#FF0000'
        },
        name: 'supply'
    };

    var trace2 = {
        x: x2,
        y: y2,
        type: 'bar',
        marker: {
            color: '#808080'
        },
        name: 'static load'
    };

    var trace3 = {
        x: x3,
        y: y3,
        type: 'bar',
        marker: {
            color: '#3333ff '
        },
        name: 'ac demand'
    };

    var trace4 = {
        x: x4,
        y: y4,
        type: 'bar',
        marker: {
            color: '#ff8000 '
        },
        name: 'cl demand'
    };

    var trace5 = {
        x: [optimizationData.acTimeRange[0] - 0.5, optimizationData.acTimeRange[0] - 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'ac start',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#3333ff'
        },
    };

    var trace6 = {
        x: [optimizationData.acTimeRange[1] + 0.5, optimizationData.acTimeRange[1] + 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'ac end',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#3333ff'
        },
    };

    var trace7 = {
        x: [optimizationData.clTimeRange[0] - 0.5, optimizationData.clTimeRange[0] - 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'cl start',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#ff8000'
        },
    };

    var trace8 = {
        x: [optimizationData.clTimeRange[1] + 0.5, optimizationData.clTimeRange[1] + 0.5],
        y: [0, Math.max(...optimizationData.supply.value) * 1.3],
        name: 'cl end',
        mode: 'lines',
        line: {
            shape: 'linear'
        },
        marker: {
            color: '#ff8000'
        },
    };


    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];

    var layout = {
        barmode: 'stack',
        title: {
            text: 'Optimized Plot',
            font: {
                family: 'Courier New, monospace',
                size: 24
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: {
                text: 't (15 min blocks)',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            },
        },
        yaxis: {
            title: {
                text: 'power [kWh]',
                font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                }
            }
        }
    };

    // plot graph
    Plotly.newPlot('optimized', data, layout, {
        showSendToCloud: true
    });

    // plot summed values
    document.getElementById("sumSupplyOptimized").innerHTML = 'sum supply: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + optimizationData.supply.value.reduce(sumArrayElements);
    document.getElementById("sumStaticLoadOptimized").innerHTML = 'sum static load: &nbsp;&nbsp;' + optimizationData.loadStatic.value.reduce(sumArrayElements);
    document.getElementById("sumAcDemandOptimized").innerHTML = 'sum ac demand: &nbsp;' + optimizationData.acDemand.value.reduce(sumArrayElements);
    document.getElementById("sumClDemandOptimized").innerHTML = 'sum cl demand: &nbsp;&nbsp;' + optimizationData.clDemand.value.reduce(sumArrayElements);

    function sumArrayElements(total, num) {
        return total + num;
    }

}

async function getOptimizedData() {

    // get unoptimized data
    const requestUrl = `${url}:${port}/${apiVersion}`;
    const response = await fetch(requestUrl);
    const unoptimizedData = await response.json();

    // get optimized data
    try {
        
        const optimizationData = await postData(
            requestUrl,
            unoptimizedData
        );

        return optimizationData;
    } catch (error) {
        
        console.error(error);
    }    
}


async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}