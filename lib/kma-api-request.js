'use strict';
const KmaApiParser = require('./kma-api-parser');
const Const = require('./const');
const request = require('request');

const KmaApiRequest = {

    /**
     *  This function is to request middle forecast land information.
     *  It require kma's open api service key, base date, base time, nx and ny.
     * @param serviceKey
     * @param params
     * @param onSuccess
     * @param onError
     */
    getForecastSpaceDate : (serviceKey, params, onSuccess, onError) => {
        const date = params.date;
        const time = params.time;
        const nx = params.nx;
        const ny = params.ny;

        const requestUrl = `${Const.TIMEWEATHER_BASE_URL}${Const.FORECAST_SPACE_URL}?serviceKey=${serviceKey}&base_date=${date}&base_time=${time}&nx=${nx}&ny=${ny}&numOfRows=300&pageNo=1&_type=json`;
        const options = {
            url: requestUrl,
            method: 'GET',
        };


        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(error, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                KmaApiParser.parsingResultOfForecastSpaceData(Const.FORECAST_SPACE_ITEM, body, onSuccess, onError);
            }
        });

    },

    /**
     *  This function is to request middle forecast temperature information.
     *  It require kma's open api service key, regId, and tmFc
     * @param serviceKey
     * @param params
     * @param onSuccess
     * @param onError
     */
    getMiddleTemperature : (serviceKey, params, onSuccess, onError) => {
        const options = getMiddleForecastTempUrl(params, Const.MID_BASE_URL, Const.MID_TEMP_URL, serviceKey);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //성공인 경우..
                KmaApiParser.parsingResultOfMiddleForecastAndSpaceAndTemp(Const.MID_TEMP_ITEM, body, onSuccess, onError);
            }
        });
    },
    /**
     *  This function is to request middle forecast land information.
     *  It require kma's open api service key, regId, and tmFc.
     * @param params
     * @param onSuccess
     * @param onError
     */
    getMiddleLandWeather : (serviceKey, params, onSuccess, onError) => {
        const options = getMiddleForecastLandUrl(params, Const.MID_BASE_URL, Const.MID_LAND_URL, serviceKey);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                KmaApiParser.parsingResultOfMiddleForecastAndSpaceAndTemp(Const.MID_LAND_ITEM, body, onSuccess, onError);
            }
        });
    },

    /**
     *  This function is to request middle forecast information.
     *  It require kma's open api service key, stnId, and tmFc
     * @param params
     * @param onSuccess
     * @param onError
     */
    getMiddleForecastWeather : (serviceKey, params, onSuccess, onError) => {
        const options = getMiddleForecastUrl(params, Const.MID_BASE_URL, Const.MID_FORECAST_URL, serviceKey);
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(err, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                KmaApiParser.parsingResultOfMiddleForecastAndSpaceAndTemp(Const.MID_FORECAST_ITEM, body, onSuccess, onError);

            }
        });
    },

};

let getRequestUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const areaNo = params.areaNo;
    const time = params.date;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&areaNo=${areaNo}&time=${time}&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

let getMiddleForecastLandUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const regid = params.landRegId;
    const time = params.time;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&regId=${regid}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

let getMiddleForecastTempUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const regid = params.tempRegId;
    const time = params.time;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&regId=${regid}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}


let getMiddleForecastUrl = (params, baseUrl, serviceUrl, serviceKey) =>
{
    const time = params.time;
    const stnId = params.stnId;
    const requestUrl = `${baseUrl}${serviceUrl}?serviceKey=${serviceKey}&stnId=${stnId}&tmFc=${time}&pageNo=1&numOfRows=10&_type=json`;
    const options = {
        url: requestUrl,
        method: 'GET',
    };

    return options;
}

module["exports"] = KmaApiRequest;