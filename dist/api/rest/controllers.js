"use strict";
// imports and constants
// -----------------------------------------------
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
var optimizer_1 = require("../../optimization/optimizer");
var constructOptimizationFeed = require('../../optimization/construct-optimization-feed');
var errors = require('../../assets/responses/errors.json');
var optimizationDb = require('../../db/optimization');
var tenantInfo = require('../../db/tenant');
// POST
// -----------------------------------------------
/**
 * Construct an optimization according to following workflow:
 *  - construct optimization feed
 *  - run optimizatoin
 *  - store optimizaiton results
 * @param {any} req request
 */
function optimize(req) {
    return __awaiter(this, void 0, void 0, function () {
        var optimizer, optimization, storeOptimizationRes, zipCode, acMetaData, clMetaData, supply, loadStatic;
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, tenantInfo.getZipCode(req[0].tenant)];
                            case 1:
                                // construct optimization feed 
                                zipCode = _a.sent();
                                if (zipCode.error) {
                                    resolve({
                                        status: 500,
                                        error: zipCode.error
                                    });
                                }
                                return [4 /*yield*/, tenantInfo.getAcMetaData(req[0].acDemand.oliBox)];
                            case 2:
                                acMetaData = _a.sent();
                                if (acMetaData.error) {
                                    resolve({
                                        status: 500,
                                        error: acMetaData.error
                                    });
                                }
                                return [4 /*yield*/, tenantInfo.getClMetaData(req[0].clDemand.oliBox)];
                            case 3:
                                clMetaData = _a.sent();
                                if (clMetaData.error) {
                                    resolve({
                                        status: 500,
                                        error: clMetaData.error
                                    });
                                }
                                return [4 /*yield*/, constructOptimizationFeed.getStaticLoad(req[0].loadStaticId)];
                            case 4:
                                loadStatic = _a.sent();
                                if (loadStatic.error) {
                                    resolve({
                                        status: 500,
                                        error: loadStatic.error
                                    });
                                }
                                return [4 /*yield*/, constructOptimizationFeed.getSupply(req[0].supplyId, zipCode, new Date(req[0].startDate))];
                            case 5:
                                supply = _a.sent();
                                if (supply.error) {
                                    resolve({
                                        status: 500,
                                        error: supply.error
                                    });
                                }
                                // run optimization
                                optimizer = new optimizer_1.Optimizer({
                                    supply: supply,
                                    loadStatic: loadStatic,
                                    acDemand: req[0].acDemand,
                                    clDemand: req[0].clDemand,
                                    acTimeRange: acMetaData.timeRange,
                                    clTimeRange: clMetaData.timeRange,
                                    acMaxLoad: acMetaData.maxLoad,
                                    clMaxLoad: clMetaData.maxLoad
                                });
                                try {
                                    optimization = optimizer.getOptimization();
                                }
                                catch (error) {
                                    resolve({
                                        status: 400,
                                        error: errors.invalidRequestParameter
                                    });
                                }
                                return [4 /*yield*/, optimizationDb.storeOptimization(req[0].tenant, req[0].startDate, optimization)];
                            case 6:
                                // store optimization results
                                storeOptimizationRes = _a.sent();
                                if (storeOptimizationRes.error) {
                                    resolve({
                                        status: storeOptimizationRes.status,
                                        error: storeOptimizationRes.error
                                    });
                                }
                                else {
                                    resolve({
                                        status: storeOptimizationRes.status,
                                        data: [
                                            optimization
                                        ]
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// exports
// -----------------------------------------------
module.exports.optimize = optimize;
