const testForcast = require('./index.js');


const options = {
    "date": "20190721",             //only change this field for testForcast
    "time": "0500",
    "nx" : "59",
    "ny" : "126"
}

const serviceKey = '[Input Forecast KMA Open API Key]';


testForcast.requestWeatherRequest(serviceKey, 0, options, (code, result)=>{
    console.log(result);
}, (err,code, msg) => {
    console.log(err);
} )