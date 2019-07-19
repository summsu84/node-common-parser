const Const = require('./const');


let parsingResultOfMiddleForecastAndSpaceAndTemp = (type, body, onSuccess, onError) =>
{
    const datas = JSON.parse(body);

    const newGenVal =
        {
            "header" : null,
            "items" : null,
            "itemType" : type
        };
    const newGenValBase = {
        items:[]
    };
    const newGenValItem = {
        item : {
            type: null,
            header: null,
            result: null
        }
    }

    // header parsing
    if(datas.hasOwnProperty("Response"))
    {
        if(datas.response.header.resultCode === "12")
            onSuccess(datas.response.header,Const.responsecodeError);
    }else {
        const successYN = datas.response.header.resultCode;
        let retVal;
        if (successYN !== "0000") {
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = [];
            //newGenVal.header = retVal;
            onSuccess(newGenValItem, Const.responsecodeError);
        } else {
            retVal = datas.response.body.items.item;
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            const tmpArray = [];
            for(const key in retVal)
            {
                let value = retVal[key];
                const tmpObject = {
                    title: key,
                    value: value,
                    description: '',
                    range: '',
                    useYn: (key === "code" || key === "areaNo" || key === "date" || key === "regId") ? 'N' : 'Y'
                }
                // check if staring 'ta'
                if(key.substring(0, 2) === "ta"){
                    if(key.indexOf("High") > 0 || key.indexOf("Low") > 0|| key.slice(-3) =='Min')
                        tmpObject.useYn = 'N';
                }
                if(tmpObject.useYn === "Y")
                    tmpArray.push(tmpObject);

            }
            newGenValItem.item.result = tmpArray;
            const typeObject = {};
            typeObject[type] = retVal;
            newGenVal.items = typeObject;
            onSuccess(newGenValItem);
        }
    }
}


let parsingResultOfForecastSpaceData = (type, body, onSuccess, onError) =>
{
    const datas = JSON.parse(body);

    const newGenVal =
        {
            "header" : null,
            "items" : null,
            "itemType" : type
        };
    const newGenValBase = {
        items:[]
    };
    const newGenValItem = {
        item : {
            type: null,
            header: null,
            result: null
        }
    }

    // header parsing
    if(datas.hasOwnProperty("Response"))
    {
        if(datas.response.header.resultCode === "12")
            onSuccess(datas.response.header,Const.responsecodeError);
    }else {
        const successYN = datas.response.header.resultCode;
        let retVal;
        if (successYN !== "0000") {
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = [];
            //newGenVal.header = retVal;
            onSuccess(newGenValItem, Const.responsecodeError);
        } else {
            retVal = datas.response.body.items.item;
            // retVal을 시간별로 나눠서
            let changedRetVal = generateForecastSpaceResultByTime(retVal);
            newGenValItem.item.header = datas.response.header;
            newGenValItem.item.type = type;
            newGenValItem.item.result = changedRetVal;
            onSuccess(newGenValItem);
        }
    }
}

// generate result data of forecast space data
let generateForecastSpaceResultByTime = (items) =>
{
    let prevFcstTime = "";
    let curFcstTime = "";
    let tmpItems = [

    ];
    let idx = -1;
    items.forEach((v, i) => {

        let tmpFcstTimeHour;
        if(typeof v.fcstTime === "number")
        {
            v.fcstTime = v.fcstTime.toString();
            tmpFcstTimeHour = Number((v.fcstTime.toString()).substring(0, 2));
        }else
        {
            tmpFcstTimeHour = Number(v.fcstTime.substring(0, 2));
        }

        // Exception check in case of date difference
        let baseDate = v.baseDate;
        let fcstDate = v.fcstDate;
        curFcstTime = v.fcstTime;

        if(baseDate === fcstDate)
        {
            // get current time
            let currentTimeHour = getCurrentHour() ;
            if(tmpFcstTimeHour >= currentTimeHour)
            {
                // If time is same
                if(prevFcstTime === curFcstTime)
                {
                    tmpItems[idx].time.push(v);
                }
                // If time is different
                else
                {
                    tmpItems.push({
                        time:[v]
                    });

                    idx++;
                }
                prevFcstTime = curFcstTime;
            }

        }else
        {
            if(prevFcstTime === curFcstTime)
            {
                tmpItems[idx].time.push(v);
            }
            else
            {
                tmpItems.push({
                    time:[v]
                });

                idx++;
            }
            prevFcstTime = curFcstTime;
        }

    });

    return tmpItems;
}

let getCurrentHour = () =>
{
    const today = new Date();

    return today.getHours();
}


exports.parsingResultOfMiddleForecastAndSpaceAndTemp = parsingResultOfMiddleForecastAndSpaceAndTemp;
exports.parsingResultOfForecastSpaceData = parsingResultOfForecastSpaceData;
