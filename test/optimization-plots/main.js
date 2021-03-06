
var graphWidht = document.getElementById('unoptimized1').clientWidth;

// run plots
// ---------------------------------------------------------

plotUnoptimized(optimizationFeeds[0], 'unoptimized1');
plotUnoptimized(optimizationFeeds[1], 'unoptimized2');
plotUnoptimized(optimizationFeeds[2], 'unoptimized3');


function plotOptimized1() {
    plotOptimized([optimizationFeeds[0]], 'optimized1');
}
function plotOptimized2() {
    plotOptimized([optimizationFeeds[1]], 'optimized2');
}
function plotOptimized3() {
    plotOptimized([optimizationFeeds[2]], 'optimized3');
}



// plot unoptimized data
// ---------------------------------------------------------

async function plotUnoptimized(optimizationFeed, unoptimizedDivId) {

    var optimizationData = {...optimizationFeed};

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

    Plotly.relayout(unoptimizedDivId, {   width: graphWidht })


    /*
    // plot summed values
    document.getElementById("sumSupplyUnoptimized").innerHTML = 'sum supply: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + optimizationData.supply.value.reduce(sumArrayElements);
    document.getElementById("sumStaticLoadUnoptimized").innerHTML = 'sum static load: &nbsp;&nbsp;' + optimizationData.loadStatic.value.reduce(sumArrayElements);
    document.getElementById("sumAcDemandUnoptimized").innerHTML = 'sum ac demand: &nbsp;' + optimizationData.acDemand.value.reduce(sumArrayElements);
    document.getElementById("sumClDemandUnoptimized").innerHTML = 'sum cl demand: &nbsp;&nbsp;' + optimizationData.clDemand.value.reduce(sumArrayElements);

    function sumArrayElements(total, num) {
        return total + num;
    }
    */

}



// get optimization data
async function getUnoptimizedData() {

    const requestUrl = `${url}:${port}/${apiVersion}/${resourcePath}`;
    const response = await fetch(requestUrl);
    const optimizationData = await response.json();

    return optimizationData;
}




// plot optimized data
// ---------------------------------------------------------

async function plotOptimized(optimizationFeed, optimizedDivId) {

    var optimizationData = await getOptimizedData(optimizationFeed);
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
    Plotly.newPlot(optimizedDivId, data, layout, {
        showSendToCloud: true
    });

    // plot summed values
    /*
    document.getElementById("sumSupplyOptimized").innerHTML = 'sum supply: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + optimizationData.supply.value.reduce(sumArrayElements);
    document.getElementById("sumStaticLoadOptimized").innerHTML = 'sum static load: &nbsp;&nbsp;' + optimizationData.loadStatic.value.reduce(sumArrayElements);
    document.getElementById("sumAcDemandOptimized").innerHTML = 'sum ac demand: &nbsp;' + optimizationData.acDemand.value.reduce(sumArrayElements);
    document.getElementById("sumClDemandOptimized").innerHTML = 'sum cl demand: &nbsp;&nbsp;' + optimizationData.clDemand.value.reduce(sumArrayElements);

    function sumArrayElements(total, num) {
        return total + num;
    }
    */

}

async function getOptimizedData(optimizationFeed) {

    // get unoptimized data
    const requestUrl = `${url}:${port}/${apiVersion}/${resourcePath}`;    

    // get optimized data
    try {
        
        const optimizationData = await postData(
            requestUrl,
            optimizationFeed
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
