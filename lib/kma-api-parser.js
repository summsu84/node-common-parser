const Const = require('../const/const');
const DateUtil = require('./dateUtil');

let parsingResultOfMiddleForecastInfo = (type, body, onSuccess, onError) =>
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

    // header 정보 파싱
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
                // ta로 시작하는 경우 체크 한다.
                if(key.substring(0, 2) === "ta"){
                    if(key.indexOf("High") > 0 || key.indexOf("Low") > 0|| key.slice(-3) =='Min')
                        tmpObject.useYn = 'N';
                }
                if(tmpObject.useYn === "Y")
                    tmpArray.push(tmpObject);
                /*                if(tmpObject.useYn == 'Y')
                                {
                                    const tmpResult = getDescriptionInfo(type, value);
                                    tmpObject.description = tmpResult.description;
                                    tmpObject.range = tmpResult.range;
                                    tmpArray.push(tmpObject);
                                }*/

            }
            newGenValItem.item.result = tmpArray;
            const typeObject = {};
            typeObject[type] = retVal;
            newGenVal.items = typeObject;
            onSuccess(newGenValItem);
        }
    }
}


let parsingResultOfMiddleForecastISpaceNew = (type, body, onSuccess, onError) =>
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

    // header 정보 파싱
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

// Time Weather
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
            let currentTimeHour = DateUtil.getCurrentHour() ;
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

let parsingResultOfForecastSpace = (body) =>
{

    const datas = JSON.parse(body);
    const resultData = {
        "response": {
            "header": {
                "resultCode": "0000",
                "resultMsg": "OK"
            },
            "body": {
                "items": {
                    "item": [
                        {
                            "baseDate": 20190530,
                            "baseTime": "0500",
                            "category": "POP",
                            "fcstDate": 20190530,
                            "fcstTime": "0900",
                            "fcstValue": 10,
                            "nx": 59,
                            "ny": 126
                        }
                    ]
                }
            }
        }
    };
    const checkCategories = ['PTY', 'SKY', 'T3H', 'TMN', 'TMX'];
    let prevFcstDate = 0;
    let curFcstDate = 0;
    let prevFcstTime = "";
    let curFcstTime = "";
    let tmpItems = [];
    const items = datas.response.body.items.item;
    items.forEach((v, i) => {
        // 현재 날씨 정보를 파싱한다.
        if(i === 0)
        {
            curFcstDate = v.fcstDate;
            prevFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
            prevFcstTime = v.fcstTime;
        }else
        {
            curFcstDate = v.fcstDate;
            curFcstTime = v.fcstTime;
        }
        //날짜가 같은 경우
        if(prevFcstDate === curFcstDate)
        {
            //시간이 같은 경우
            if(prevFcstTime === curFcstTime)
            {
                if(checkCategories.indexOf(v.category) !== -1)
                {
                    tmpItems.push(v);
                }
            }
        }
        //날짜가 다른 경우
        else
        {
            if(checkCategories.indexOf(v.category) !== -1)
            {
                tmpItems.push(v);
            }
        }

        prevFcstDate = curFcstDate;
        prevFcstTime = curFcstTime;

    });

    // 현재 시점에서 필요한 데이터
    // 1. 기온, SKY,

    // 내일 필요한 데이터
    // 1. 오전 최저, 오후 최고,
    // 2. 오전 SKY, 오후 SKY

    // 모레 필요한 데이터
    // 1. 오전 최저, 오후 최고,
    // 2. 오전 SKY, 오후 SKY

    // 우선 6시 15시 기준 데이터를 가져온다.
    // 현재 시간
    const date = new Date();
    const dateWithoutTime = getWithoutTime(date);
    let strDay = (date.getMonth() + 1) < 10 ? "0".concat((date.getMonth() + 1).toString()) : (date.getMonth() + 1).toString();
    let numberDate = Number((date.getFullYear()).toString() + strDay + (date.getDate().toString()));
    let numberHour = date.getHours();
    let currentT3h = null;
    let currentSky = null;
    let retVal = [];
    let prevfcstDate = null;
    let object = {};
    let idx = -1;
    tmpItems.forEach((v, i) => {
        // 오늘 시간
        if(v.fcstDate == numberDate)
        {
            //fcstTime이 숫자인지 스트링인지 판단한다.
            let fcstTime = null;
            if(typeof v.fcstTime === "number")
            {
                v.fcstTime = v.fcstTime.toString();
                fcstTime = Number((v.fcstTime.toString()).substring(0, 2));
            }else
            {
                fcstTime = Number(v.fcstTime.substring(0, 2));
            }

            if(fcstTime < numberHour)
            {
                if(v.category === "T3H"){
                    currentT3h = v;
                }else if(v.category === "SKY")
                    currentSky = v;
            }
        }else
        {
            // 오늘이 아닌 경우
            if(prevfcstDate != v.fcstDate)
            {
                // 날이 달라지는 경우
                retVal.push({
                    item: []
                });
                idx++;
            }

            if(v.fcstTime === "0600")
            {
                retVal[idx].item.push(v);
            }else if(v.fcstTime === "1500" || v.fcstTime === 1500)
            {
                v.fcstTime = v.fcstTime.toString();
                retVal[idx].item.push(v);
            }
        }
        prevfcstDate = v.fcstDate;
    });
    let itemtmp =
        {
            item : []
        };
    itemtmp.item.push(currentSky);
    itemtmp.item.push(currentT3h);

    retVal.unshift(itemtmp);

    return retVal;
}

exports.parsingResultOfMiddleForecastInfo = parsingResultOfMiddleForecastInfo;
exports.parsingResultOfMiddleForecastISpaceNew = parsingResultOfMiddleForecastISpaceNew;
