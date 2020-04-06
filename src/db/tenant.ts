
var sqlite3 = require('sqlite-async');



/**
 * get zip code of tenant by oli id
 * @param {string} oliId oliId of tenant
 */
async function getZipCode(oliId: string) {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT zip_code FROM tenant WHERE pk = ?';
    let zipCode: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({ error: error })
        }

        try {

            zipCode = await db.all(queryString, oliId);
            res = zipCode[0].zip_code;

        } catch (error) {
            res = { error: error };
        }

        await db.close();
        resolve(res)
    })
}


/**
 * get active status of tenant
 * @param {string} oliId oliId of tenant
 */
async function getActiveStatus(oliId: string) {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT active FROM tenant WHERE pk = ?';
    let active: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({ error: error })
        }

        try {

            active = await db.all(queryString, oliId);
            res = active[0].active;

        } catch (error) {
            res = { error: error };
        }

        await db.close();
        resolve(res)
    })
}


/**
 * get metadata of air condition device by oli id
 * @param {string} oliId oliId of tenant
 */
async function getAcMetaData(oliId: string) {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT range_start, range_end, max_power FROM oli_device_meta_info WHERE pk = ?';
    let acMetaData: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({ error: error })
        }

        try {

            acMetaData = await db.all(queryString, oliId);
            res = { 
                timeRange: [ acMetaData[0].range_start, acMetaData[0].range_end ],
                maxLoad: acMetaData[0].max_power
            };

        } catch (error) {
            res = { error: error };
        }

        await db.close();
        resolve(res)
    })
}


/**
 * get metadata of car loading station by oli id
 * @param {string} oliId oliId of tenant
 */
async function getClMetaData(oliId: string) {
    
    let res: any;
    let db: any; 
    let queryString = 'SELECT range_start, range_end, max_power FROM oli_device_meta_info WHERE pk = ?';
    let clMetaData: any;
    
    return new Promise ( async  (resolve) => {

        try {
            db = await sqlite3.open("optimizations.db");
        } catch (error) {
            await db.close();
            resolve({ error: error })
        }

        try {

            clMetaData = await db.all(queryString, oliId);
            res = { 
                timeRange: [ clMetaData[0].range_start, clMetaData[0].range_end ],
                maxLoad: clMetaData[0].max_power
            };

        } catch (error) {
            res = { error: error };
        }

        await db.close();
        resolve(res)
    })
}



module.exports.getZipCode = getZipCode;
module.exports.getAcMetaData = getAcMetaData;
module.exports.getClMetaData = getClMetaData;
module.exports.getActiveStatus = getActiveStatus;
