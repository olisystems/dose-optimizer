"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var publishNo = 0;
function publish() {
    var tmpCnt = 0;
    publishNo += 1;
    console.log(publishNo);
    while (tmpCnt < 1000) {
        setTimeout(function () {
            publishNo += 1;
            console.log(tmpCnt);
        }, 10000);
    }
    return new Promise(function (resolve) {
        resolve({ 'optimization': 'finished' });
    });
}
module.exports.publish = publish;
