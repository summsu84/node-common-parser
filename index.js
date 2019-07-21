'use strict';
const KmaApiRequest = require('./lib/kma-api-request');
const Const = require('./lib/const');
module.exports = {

    //service_key, request_type, options, success callback, error callback
    'requestWeatherRequest' : (serviceKey, type, options, onSuccess, onError) => {

        // forecast space request
        if(type === 0)
        {
            KmaApiRequest.getForecastSpaceDate(serviceKey, options, (result) => {
                // success
                onSuccess(Const.responsecodeSucceed, result);
            },(err,code, msg)=>{
                // error
                if(err){
                    onError(Const.responsecodeError, {
                        code : Const.responsecodeError,
                        data : msg
                    })

                }else{
                    onError(Const.responsecodeError, {
                        code : Const.responsecodeError,
                        data : msg
                    })
                }
            });
        }
        // middle forecast, middle forecast temp and middle forecast land request
        else if(type === 1)
        {
            const retVal = {
                items:[]
            };

            KmaApiRequest.getMiddleForecastWeather(serviceKey, options, (result) => {
                // success
                retVal.items.push(result);
                KmaApiRequest.getMiddleTemperature(serviceKey, options, (result) => {
                    // success
                    retVal.items.push(result);
                    KmaApiRequest.getMiddleLandWeather(serviceKey, options, (result) => {
                        // success
                        retVal.items.push(result);
                        onSuccess(Const.responsecodeSucceed, retVal);
                    },(err,code, msg)=>{
                        // error
                        if(err){
                            onError(Const.responsecodeError, {
                                code : Const.responsecodeError,
                                data : msg
                            })

                        }else{
                            onError(Const.responsecodeError, {
                                code : Const.responsecodeError,
                                data : msg
                            })
                        }
                    });
                },(err,code, msg)=>{
                    // error
                    if(err){
                        onError(Const.responsecodeError, {
                            code : Const.responsecodeError,
                            data : msg
                        })

                    }else{
                        onError(Const.responsecodeError, {
                            code : Const.responsecodeError,
                            data : msg
                        })
                    }

                });
            },(err,code, msg)=>{
                // error
                if(err){
                    onError(Const.responsecodeError, {
                        code : Const.responsecodeError,
                        data : msg
                    })

                }else{
                    onError(Const.responsecodeError, {
                        code : Const.responsecodeError,
                        data : msg
                    })
                }
            });
        }
    }
};