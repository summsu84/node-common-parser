(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    Const.httpCodeSucceed = 200;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeSeverError = 500;
    Const.httpCodeAuthError = 503;

    Const.responsecodeSucceed = 1;
    Const.responsecodeError = 2;

    Const.TIMEWEATHER_BASE_URL = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/';
    Const.FORECAST_SPACE_URL = 'ForecastSpaceData';
    Const.FORECAST_SPACE_ITEM = 'forecastSpace';

    Const.MID_BASE_URL = 'http://newsky2.kma.go.kr/service/MiddleFrcstInfoService/';
    Const.MID_TEMP_URL = 'getMiddleTemperature';
    Const.MID_TEMP_ITEM = 'middleTemperature';
    Const.MID_LAND_URL = 'getMiddleLandWeather';
    Const.MID_LAND_ITEM = 'middleForecast';
    Const.MID_FORECAST_URL = 'getMiddleForecast';
    Const.MID_FORECAST_ITEM = 'middleForecast';

    // Exports ----------------------------------------------
    module["exports"] = Const;
    //module["exports"] = TestData;

})((this || 0).self || global);
