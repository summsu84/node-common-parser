
# KMA(Korea Meteorological Administration) Open API Helper  - Simple KMA Open API Client

## Summary

This is designed to help request KMA's open API such as forecast, middle forecast.
It just need KMA's open API service key, forecast date, area code which is download KMA's web site.

## Forecast Request

This is forecast weather per 3 hours by 3 days.

```js
const KmaHelper = require('./index.js');

const options = {
    "date": "YYYYMMDD",             //only change this field 
    "time": "0500",                 //base time (no change needed)
    "nx" : "59",                    //area nx code
    "ny" : "126"                    //area ny code
};

// nx, ny area code can be found on KMA's web site.

const serviceKey = '[Input Forecast KMA Open API Key]';

/**
*  params
*  serviceKey : serviceKey,
*  type : service Type, (0 : forecast request, 1 : middle forecast request)
*  success callback
*  error callback
*/
KmaHelper.requestWeatherRequest(serviceKey, 0, options, (code, result)=>{
    // This function is success callback which you need to customize.
    console.log(result);
}, (err,code, msg) => {
    // This function is error callback which you need to customize.
    console.log(err);
} );
```

---


## Middle Forecast

This is forecast middle weather land information, forecast report and middle temperature information.

```js
const KmaHelper = require('./index.js');

const options = {
    "landRegId": "11B00000",        // landRegId for middle weather land forecast
    "tempRegId": "11B20101",        // tempRegId for middle weather temperature forecast
    "stnId" : "109",                //stnId code for weather forecast summary
    "time" : "YYYYMMDD0600"         //only change this field but time is not needed to change.
};

// landRegId, tempRegId, stnId code can be found on KMA's web site.
const serviceKey = '[Input Middle Forecast KMA Open API Key]';

/**
*  params
*  serviceKey : serviceKey,
*  type : service Type, (0 : forecast request, 1 : middle forecast request)
*  success callback
*  error callback
*/
KmaHelper.requestWeatherRequest(serviceKey, 1, options, (code, result) =>{
    // This function is success callback which you need to customize.
    console.log(code, result);
}, (err,code, msg) => {
     // This function is error callback which you need to customize.
    console.log(err);
} );
```


---

