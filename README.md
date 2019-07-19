기상청 오픈 API 파싱 모듈

1. 동네예보 정보 파싱

2. 중기 기온 정보 파싱

3. 중기 육상 정보 파싱

사용방법
-------------------------------------------------------------------------------------------
const kmaWeatherApiHelper = require('weather-api-parser-teamjw');
const option = {"url": "", "method": "GET"};
//동네 예보 URL 샘플
option.url = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey=[Service_KEY]&base_date=[date]&base_time=0500&nx=59&ny=126&numOfRows=300&pageNo=1&_type=json"

// 중기 리포트, 육상, 기온 정포 URL 샘플 업데이트 예정

kmaWeatherApiHelper.requestWeatherRequest(0, 'forecastSpace', option, (result) => {
    // 성공시 콜백 함수 재정의
    res.send(result);
}, (err,code, msg) =>{
    // 실패시 콜백 함수 재정의
    res.send(msg);
})
