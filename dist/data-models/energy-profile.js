"use strict";
// Ernergy value model
// -----------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var EnergyProfile = /** @class */ (function () {
    function EnergyProfile(oliBox, type, interval, value) {
        if (oliBox === void 0) { oliBox = ''; }
        if (type === void 0) { type = ''; }
        if (interval === void 0) { interval = []; }
        if (value === void 0) { value = []; }
        this.oliBox = oliBox;
        this.type = type;
        this.interval = interval;
        this.value = value;
    }
    return EnergyProfile;
}());
exports.EnergyProfile = EnergyProfile;
