
/**
 * Convert string data set of all optimizations in an array to json
 * @param {Array} optimizationList - list of optimizations
 */
export function optimizationDataStringToJson (optimizationList: any) {

    optimizationList.forEach( (element: any, index: any) => {
        element.data = JSON.parse(element.data)
    });

}
