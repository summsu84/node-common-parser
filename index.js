'use strict';
const KmaApiParser = require('./lib/kma-api-parser');
const request = require('request');

module.exports = {
    'parsingResultOfMiddleForecastAndSpaceAndTemp': (type, body, onSuccess, onError) => {
        KmaApiParser.parsingResultOfMiddleForecastAndSpaceAndTemp(type, body, onSuccess, onError);
    },
    'parsingResultOfForecastSpaceData': (type, body, onSuccess, onError) => {
        KmaApiParser.parsingResultOfForecastSpaceData(type, body, onSuccess, onError);
    },
    'requestWeatherRequest' : (reqService, type, options, onSuccess, onError) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                if (onError)
                    onError(error, null);
            } else if (response.statusCode !== 200) {
                console.error(body);
            } else {
                //reqService 0 : ForecastSpaceData
                if(reqService === 0)
                {
                    KmaApiParser.parsingResultOfForecastSpaceData(type, body, onSuccess, onError);
                }else
                {
                    KmaApiParser.parsingResultOfMiddleForecastAndSpaceAndTemp(type, body, onSuccess, onError);
                }
            }
        });
    }
};