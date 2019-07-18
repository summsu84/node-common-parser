'use strict';
const KmaApiParser = require('./lib/kma-api-parser');


module.exports = {
    'parsingResultOfMiddleForecastInfo': (type, body, onSuccess, onError) => {
        KmaApiParser.parsingResultOfMiddleForecastInfo(type, body, onSuccess, onError);
    },
    'parsingResultOfMiddleForecastISpaceNew': (type, body, onSuccess, onError) => {
        KmaApiParser.parsingResultOfMiddleForecastISpaceNew(type, body, onSuccess, onError);
    },
};