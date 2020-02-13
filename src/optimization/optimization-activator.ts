
import { resolve } from "bluebird";

var publishNo: number = 0;


function publish () {

    var tmpCnt: number = 0;
    
    publishNo += 1;
    console.log(publishNo);

    while (tmpCnt < 1000) {
    
        setTimeout(() => {

            publishNo += 1;
            console.log(tmpCnt);
        }, 10000);
    }

    return new Promise ((resolve) => {
        
        resolve({'optimization': 'finished'});
    })

}


module.exports.publish = publish;
