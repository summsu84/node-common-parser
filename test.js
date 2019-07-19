const test = require('./index.js');


const options = {

    "url": "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey=[SERVICE_KEY]&base_date=20190719&base_time=0500&nx=59&ny=126&numOfRows=300&pageNo=1&_type=json",
    "method": "GET"

}

test.requestWeatherRequest(0, 'test', options, (result)=>{
    console.log(result);
}, (err,code, msg) => {
    console.log(err);
} )