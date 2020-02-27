"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require('sqlite-async');
var axios = require("axios");
var Spline = require('cubic-spline');
var weatherDB = require('../db/weather');
/**
 * Get the pv supply array of an oli id
 * @param {string} oliId - oli box id pv plant
 * @param {string} zipCode - zip code for weather forcast
 * @param {Data} optimizationDate - date of optimization
 */
function getSupply(oliId, zipCode, optimizationDate) {
    return __awaiter(this, void 0, void 0, function () {
        var res, db, queryString, supply, weatherData;
        var _this = this;
        return __generator(this, function (_a) {
            queryString = 'SELECT data FROM "supply" WHERE oli_id = ?';
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var error_1, i, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getWeatherDataFactors(zipCode, optimizationDate)];
                            case 1:
                                weatherData = _a.sent();
                                if (weatherData.error) {
                                    resolve(weatherData);
                                }
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, sqlite3.open("optimizations.db")];
                            case 3:
                                db = _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _a.sent();
                                res = { error: error_1 };
                                return [3 /*break*/, 5];
                            case 5:
                                _a.trys.push([5, 7, , 8]);
                                return [4 /*yield*/, db.all(queryString, oliId)];
                            case 6:
                                supply = _a.sent();
                                supply = JSON.parse(supply[0].data);
                                console.log(supply.value);
                                for (i = 0; i < supply.value.length; i++) {
                                    supply.value[i] *= weatherData.condition[i];
                                }
                                console.log(supply.value);
                                res = supply;
                                return [3 /*break*/, 8];
                            case 7:
                                error_2 = _a.sent();
                                res = { error: error_2 };
                                return [3 /*break*/, 8];
                            case 8: return [4 /*yield*/, db.close()];
                            case 9:
                                _a.sent();
                                resolve(res);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
/**
 * Get the pv static load array of a tenant identified by an oli id
 * @param {string} oliId
 */
function getStaticLoad(oliId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, db, queryString, loadStatic;
        var _this = this;
        return __generator(this, function (_a) {
            queryString = 'SELECT data FROM "load_static" WHERE oli_id = ?';
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var error_3, error_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, sqlite3.open("optimizations.db")];
                            case 1:
                                db = _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                error_3 = _a.sent();
                                res = { error: error_3 };
                                return [3 /*break*/, 3];
                            case 3:
                                _a.trys.push([3, 5, , 6]);
                                return [4 /*yield*/, db.all(queryString, oliId)];
                            case 4:
                                loadStatic = _a.sent();
                                res = JSON.parse(loadStatic[0].data);
                                return [3 /*break*/, 6];
                            case 5:
                                error_4 = _a.sent();
                                res = { error: error_4 };
                                return [3 /*break*/, 6];
                            case 6: return [4 /*yield*/, db.close()];
                            case 7:
                                _a.sent();
                                resolve(res);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
/**
 * Get the weather forcast data for the next 5 days in an intervall of 3H
 * The data are requested from open weather map in the following structure:
 *  - 3H blocks. 8 times 3H Blocks = 24H day. 1. block 00:00 - 03:00, 2.block 03:00 - 06:00
 *  - The first block time (dt) of the request is the next 3H interval.
 *    For example: if the weather forcast is requested at 10:06,
 *    then the the timestamp of the first block is 12:00.
 * @param {string} zipCode - zip code for weather forcast
 */
function getWeatherData(zipCode) {
    return __awaiter(this, void 0, void 0, function () {
        var owmGetWeatherUrl, weatherData;
        var _this = this;
        return __generator(this, function (_a) {
            owmGetWeatherUrl = process.env.OWM_API_URL + "zip=" + zipCode + ",de&appid=" + process.env.OWM_API_KEY + "&units=metric";
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var error_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, axios.get(owmGetWeatherUrl)];
                            case 1:
                                weatherData = _a.sent();
                                resolve(weatherData);
                                return [3 /*break*/, 3];
                            case 2:
                                error_5 = _a.sent();
                                resolve({ error: error_5.response.data });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
/**
 * Get weather in 3H Blocks and construct a cubic spline line interpolation
 * to construct 15 min weather blocks
 * @param {string} zipCode postal code of tenant adress
 * @param {Data} optimizationDate - date of optimization
 */
function getWeatherDataFactors(zipCode, optimizationDate) {
    return __awaiter(this, void 0, void 0, function () {
        var weatherDataFactors, xSpline, ySpline;
        var _this = this;
        return __generator(this, function (_a) {
            weatherDataFactors = {
                temperature: [],
                condition: []
            };
            xSpline = [6, 18, 30, 42, 54, 66, 78, 90, 102];
            ySpline = [];
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var optimizationTimestamp, tmpCnt, weatherData, conditionCode, weatherDataArr, i, i_1, spline, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                optimizationTimestamp = optimizationDate.getTime() / 1000;
                                tmpCnt = 0;
                                return [4 /*yield*/, getWeatherData(zipCode)];
                            case 1:
                                weatherData = _a.sent();
                                if (weatherData.error) {
                                    resolve(weatherData);
                                }
                                weatherDataArr = weatherData.data.list;
                                i = 0;
                                _a.label = 2;
                            case 2:
                                if (!(i < weatherDataArr.length)) return [3 /*break*/, 5];
                                if (!((weatherDataArr[i].dt >= optimizationTimestamp) && (tmpCnt < 9))) return [3 /*break*/, 4];
                                ySpline.push(weatherDataArr[i].main.temp);
                                return [4 /*yield*/, weatherDB.getWeatherConditionCode(weatherDataArr[i].weather[0].main)];
                            case 3:
                                conditionCode = _a.sent();
                                if (conditionCode.error) {
                                    resolve(conditionCode);
                                }
                                tmpCnt += 1;
                                if (tmpCnt < 9) {
                                    for (i_1 = 1; i_1 <= 12; i_1++) {
                                        weatherDataFactors.condition.push(conditionCode);
                                    }
                                }
                                _a.label = 4;
                            case 4:
                                i++;
                                return [3 /*break*/, 2];
                            case 5:
                                ;
                                spline = new Spline(xSpline, ySpline);
                                for (i = 1; i <= 96; i++) {
                                    weatherDataFactors.temperature.push(Math.round(spline.at(i) * 100) / 100);
                                }
                                //console.log(weatherDataFactors.temperature);
                                //console.log(weatherDataFactors.condition);
                                //console.log('lenght: ' + weatherDataFactors.temperature.length );
                                //console.log('lenght: ' + weatherDataFactors.condition.length );
                                resolve(weatherDataFactors);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
module.exports.getSupply = getSupply;
module.exports.getStaticLoad = getStaticLoad;
