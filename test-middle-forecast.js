const test = require('./index.js');

const options = {
    "landRegId": "11B00000",
    "tempRegId": "11B20101",
    "stnId" : "109",
    "time" : "YYYYMMDD0600"         //only change this field for test
}

const serviceKey = '[Input Middle Forecast KMA Open API Key]';

test.requestWeatherRequest(serviceKey, 1, options, (code, result)=>{
    console.log(code, result);
}, (err,code, msg) => {
    console.log(err);
} )