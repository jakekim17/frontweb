var MiddleData = {
    secondConvert: function (h, m, s) {
        ts = ((h * 60) * 60) + (m * 60) + s; //현재시간을 초로 변환
        return ts;
    },
    clientMarketCloseChk: function () {
        var currentDate = new Date();
        var startTime = MiddleData.secondConvert(8, 30, 0);
        var endTime = MiddleData.secondConvert(16, 00, 0);
        var currentTime = MiddleData.secondConvert(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());

        if (startTime <= currentTime && endTime >= currentTime) {
            //실시간
            return false;
        }
        else {
            //정지
            return true;
        }

    },
    //국내증시 > 코스피, 코스닥, 코스피200 실시간에 사용
    CurrentMarket: function (typeVal, codeVal, secVal, classElements, checkHoliday) {
       
        //alert(checkHoliday);

        //하위주석처리 해제필요
        if (checkHoliday == false) {
            setInterval(function () {
                if (MiddleData.clientMarketCloseChk() == false) {
                    var resultData = "";
                    $.ajax({
                        type: "get",
                        //url: "http://192.168.168.52:80/sise/sise.ajax",
                        //url: "http://52.78.201.11:80/sise/sise.ajax",

                        //url: "http://wowtv-nlb-24f10aa9d183dd6a.elb.ap-northeast-2.amazonaws.com:80/sise/sise.ajax",
                        url: "http://sisemid.wowtv.co.kr/sise/sise.ajax",
                        data: { code: codeVal, type: typeVal },
                        //contentType: "application/json; charset=utf-8",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        timeout: 3000,
                        //beforeSend: function (xhr) {
                        //    xhr.setRequestHeader("Connection", "close");
                        //},
                        success: function (data) {
                            //console.log("Market json data success");

                            $(data).each(function (index, item) {
                                resultData += '{';
                                resultData += '"TradePrice" : "' + item.TradePrice + '", ';
                                resultData += '"ChgType" : "' + item.ChgType + '", ';
                                resultData += '"ChgPrice" : "' + item.ChgPrice + '", ';
                                resultData += '"TotalPrice" : "' + item.TotalPrice + '", ';
                                resultData += '"TotalVol" : "' + item.TotalVol + '"'
                                resultData += '}';
                            });
                            //console.log(resultData);
                            resultData = JSON.parse(resultData);

                            classElements.each(function (index, element) {
                                //console.log(resultData.ChgType);
                                if (resultData.TradePrice != "undefined") {
                                    if (typeVal == "INDEX") {           //지수 
                                        if (index == 0) {
                                            //실시간 데이터 타입 체크 후 프론트 단 css class 조정
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //지수
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TradePrice));
                                        }
                                        //if (index == 1) {
                                        //    //전일대비 부호 +, -
                                        //    $(element).text(CommonJs.ChgTypeArrowFormat(resultData.ChgType));
                                        //}
                                        if (index == 1) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //전일대비 등락가
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.ChgPrice));
                                        }
                                        if (index == 2) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //등락률
                                            var chgRateVal_temp;
                                            var chgRateVal_temp2;
                                            var chgRateVal_temp3;

                                            if (resultData.ChgType == "+") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) - parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "-") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) + parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == " ") {
                                                //chgRateVal_temp2 = (resultData.ChgPrice / (resultData.TradePrice + resultData.ChgPrice)) * 10000;
                                                //chgRateVal_temp = parseFloat(Math.floor(chgRateVal_temp2)) * 0.01;
                                                chgRateVal_temp = 0.00;
                                            }
                                            //chgRateVal_temp = 0.1;
                                            //chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            $(element).text(chgRateVal);
                                        }
                                        if (index == 3) {
                                            //체결수량
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TotalVol));
                                        }
                                        if (index == 4) {
                                            //거래대금
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TotalPrice));
                                        }
                                    }

                                }

                            });
                        },
                        error: function (e) {
                            console.log("Sub Market Error ==> " + JSON.stringify(e));
                        }
                    });
                }
                else {
                    console.log("장마감-subPage");
                }
                
            }, secVal * 6000); 
        }
        else {
            console.log("holiday");
        }
        
    },
    BoxAreakospiStock: function (typeVal, codeVal, secVal, classElements, checkHoliday) {
        //checkHoliday = false;
        //checkHoliday = MiddleData.clientMarketCloseChk();
        //console.log(MiddleData.clientMarketCloseChk());

        //하위주석처리 해제필요
        if (checkHoliday == false) {
            setInterval(function () {
                //if (MiddleData.clientMarketCloseChk() == true) {
                if (MiddleData.clientMarketCloseChk() == false) {
                    console.log("실시간");

                    var resultData = "";
                    var xhr = $.ajax({
                        type: "get",
                        //url: "http://192.168.168.52:80/sise/sise.ajax",
                        //url: "http://52.78.201.11:80/sise/sise.ajax",
                        //url: "http://wowtv-nlb-24f10aa9d183dd6a.elb.ap-northeast-2.amazonaws.com:80/sise/sise.ajax",
                        url: "http://sisemid.wowtv.co.kr/sise/sise.ajax",
                        data: { code: codeVal, type: typeVal },
                        //contentType: "application/json; charset=utf-8",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        timeout: 3000,
                        //beforeSend: function (xhr) {
                        //    xhr.setRequestHeader("Connection", "close");
                        //},
                        success: function (data) {
                            console.log("BoxStock Kospi json data success");

                            $(data).each(function (index, item) {
                                resultData += '{';
                                resultData += '"TradePrice" : "' + item.TradePrice + '", ';
                                resultData += '"ChgType" : "' + item.ChgType + '", ';
                                resultData += '"ChgPrice" : "' + item.ChgPrice + '" ';
                                // resultData += '"TotalPrice" : "' + item.TotalPrice + '", ';
                                // resultData += '"TotalVol" : "' + item.TotalVol + '"'
                                resultData += '}';
                            });
                            //console.log(resultData);
                            resultData = JSON.parse(resultData);
                            //ajaxAreaElement.Html(resultData);
                            //console.log(resultData.TradePrice[0])
                            classElements.each(function (index, element) {
                                //console.log(resultData.ChgType);
                                if (resultData.TradePrice != "undefined") {
                                    if (typeVal == "INDEX") {           //지수 
                                        if (index == 0) {
                                            //실시간 데이터 타입 체크 후 프론트 단 css class 조정
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //지수
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TradePrice));
                                        }
                                        //if (index == 1) {
                                        //    //전일대비 부호 +, -
                                        //    $(element).text(CommonJs.ChgTypeArrowFormat(resultData.ChgType));
                                        //}
                                        if (index == 1) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //전일대비 등락가
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.ChgPrice));
                                        }
                                        if (index == 2) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //등락률
                                            var chgRateVal_temp;
                                            var chgRateVal_temp2;
                                            var chgRateVal_temp3;

                                            if (resultData.ChgType == "+") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) - parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "-") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) + parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == " ") {
                                                //chgRateVal_temp2 = (resultData.ChgPrice / (resultData.TradePrice + resultData.ChgPrice)) * 10000;
                                                //chgRateVal_temp = parseFloat(Math.floor(chgRateVal_temp2)) * 0.01;
                                                chgRateVal_temp = 0.00;
                                            }
                                            //chgRateVal_temp = 0.1;
                                            //chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            $(element).text(chgRateVal);
                                        }

                                    }

                                }

                            });
                        },
                        error: function (e) {
                            console.log("BoxStock Kospi Error ==> " + JSON.stringify(e));
                        },
                        complete: function () {
                            xhr.abort();
                        }
                    });
                    
                }
                else {
                    console.log("장마감-box_kospi");
                }
            }, secVal * 6000);
        }
        else {
            console.log("holiday");
        }
        //alert("테스트");
    },
    BoxAreaKosdaqStock: function (typeVal, codeVal, secVal, classElements, checkHoliday) {
        //checkHoliday = false;

        //하위주석처리 해제필요
        if (checkHoliday == false) {
            
            setInterval(function () {
                if (MiddleData.clientMarketCloseChk() == false) {
                    var resultData = "";
                    $.ajax({
                        type: "get",
                        //url: "http://192.168.168.52:80/sise/sise.ajax",
                        //url: "http://52.78.201.11:80/sise/sise.ajax",
                        //url: "http://wowtv-nlb-24f10aa9d183dd6a.elb.ap-northeast-2.amazonaws.com:80/sise/sise.ajax",
                        url: "http://sisemid.wowtv.co.kr/sise/sise.ajax",
                        data: { code: codeVal, type: typeVal },
                        //contentType: "application/json; charset=utf-8",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        timeout: 3000,
                        //beforeSend: function (xhr) {
                        //    xhr.setRequestHeader("Connection", "close");
                        //},
                        success: function (data) {
                            console.log("BoxStock Kosdaq json data success");

                            $(data).each(function (index, item) {
                                resultData += '{';
                                resultData += '"TradePrice" : "' + item.TradePrice + '", ';
                                resultData += '"ChgType" : "' + item.ChgType + '", ';
                                resultData += '"ChgPrice" : "' + item.ChgPrice + '" ';
                                // resultData += '"TotalPrice" : "' + item.TotalPrice + '", ';
                                // resultData += '"TotalVol" : "' + item.TotalVol + '"'
                                resultData += '}';
                            });
                            //console.log(resultData);
                            resultData = JSON.parse(resultData);
                            //ajaxAreaElement.Html(resultData);
                            //console.log(resultData.TradePrice[0])
                            classElements.each(function (index, element) {
                                //console.log(resultData.ChgType);
                                if (resultData.TradePrice != "undefined") {
                                    if (typeVal == "INDEX") {           //지수 
                                        if (index == 0) {
                                            //실시간 데이터 타입 체크 후 프론트 단 css class 조정
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //지수
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TradePrice));
                                        }
                                        //if (index == 1) {
                                        //    //전일대비 부호 +, -
                                        //    $(element).text(CommonJs.ChgTypeArrowFormat(resultData.ChgType));
                                        //}
                                        if (index == 1) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //전일대비 등락가
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.ChgPrice));
                                        }
                                        if (index == 2) {
                                            CommonJs.ChgTypeCheck(resultData.ChgType, $(element));
                                            //등락률
                                            var chgRateVal_temp;
                                            var chgRateVal_temp2;
                                            var chgRateVal_temp3;

                                            if (resultData.ChgType == "+") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) - parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "-") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) + parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == " ") {
                                                //chgRateVal_temp2 = (resultData.ChgPrice / (resultData.TradePrice + resultData.ChgPrice)) * 10000;
                                                //chgRateVal_temp = parseFloat(Math.floor(chgRateVal_temp2)) * 0.01;
                                                chgRateVal_temp = 0.00;
                                            }
                                            //chgRateVal_temp = 0.1;
                                            //chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            $(element).text(chgRateVal);
                                        }

                                    }

                                }

                            });
                        },
                        error: function (e) {
                            console.log("BoxStock Kosdaq Error ==> " + JSON.stringify(e));
                        }
                    });
                    
                }
                else {
                    console.log("장마감-box_kosdaq");
                }
                
            }, secVal * 6000);
        }
        else {
            console.log("holiday");
        }
    },
    // 종목상세 > 단일 종목 실시간에 사용
    CurrentStock: function (typeVal, codeVal, secVal, classElementDetail, classElementBasic, checkHoliday) {
    //CurrentStock : function (codeVal, secVal, classElements){
        //alert("테스트");

        //하위주석처리 해제필요
        if (checkHoliday == false) {
            setInterval(function () {
                if (MiddleData.clientMarketCloseChk() == false) {
                    var resultData = "";
                    $.ajax({
                        type: "get",
                        //url: "http://192.168.168.52:80/sise/sise.ajax",
                        //url: "http://52.78.201.11:80/sise/sise.ajax",
                        //url: "http://wowtv-nlb-24f10aa9d183dd6a.elb.ap-northeast-2.amazonaws.com:80/sise/sise.ajax",
                        url: "http://sisemid.wowtv.co.kr/sise/sise.ajax",
                        //data: JSON.stringify(jsonObject),
                        data: { code: codeVal, type: typeVal },
                        //data: { code: codeVal },
                        //contentType: "application/json; charset=utf-8",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        dataType: "json",
                        timeout: 3000,
                        //beforeSend: function (xhr) {
                        //    xhr.setRequestHeader("Connection", "close");
                        //},
                        success: function (data) {

                            console.log("middle Stock json data success");

                            $(data).each(function (index, item) {
                                resultData += '{';
                                resultData += '"TradePrice" : "' + item.TradePrice + '", ';
                                resultData += '"ChgType" : "' + item.ChgType + '", ';
                                resultData += '"ChgPrice" : "' + item.ChgPrice + '", ';
                                resultData += '"TotalMoney" : "' + item.TotalMoney + '", ';
                                resultData += '"TotalVol" : "' + item.TotalVol + '"'
                                resultData += '}';
                            });

                            resultData = JSON.parse(resultData);

                            console.log(resultData);
                            //ajaxAreaElement.Html(resultData);
                            //console.log(resultData.TradePrice[0])

                            classElementDetail.each(function (index, element) {
                                //console.log(resultData.ChgType);
                                if (resultData.TradePrice != "undefined") {
                                    if (typeVal == "ITEM") {           //지수 
                                        if (index == 0) {
                                            //실시간 데이터 타입 체크 후 프론트 단 css class 조정
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //지수
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TradePrice));
                                        }
                                        //if (index == 1) {
                                        //    //전일대비 부호 +, -
                                        //    $(element).text(CommonJs.ChgTypeArrowFormat(resultData.ChgType));
                                        //}
                                        if (index == 1) {
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //전일대비 등락가
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.ChgPrice));
                                        }
                                        if (index == 2) {
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //등락률
                                            var chgRateVal_temp;
                                            var chgRateVal_temp2;
                                            var chgRateVal_temp3;

                                            if (resultData.ChgType == "1" || resultData.ChgType == "2" || resultData.ChgType == "+") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) - parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "4" || resultData.ChgType == "5" || resultData.ChgType == "-") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) + parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "3") {
                                                //chgRateVal_temp2 = (resultData.ChgPrice / (resultData.TradePrice + resultData.ChgPrice)) * 10000;
                                                //chgRateVal_temp = parseFloat(Math.floor(chgRateVal_temp2)) * 0.01;
                                                chgRateVal_temp = 0.00;
                                            }
                                            //chgRateVal_temp = 0.1;
                                            //chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            $(element).text(chgRateVal);
                                        }
                                        if (index == 3) {
                                            //체결수량
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TotalVol));
                                        }
                                        if (index == 4) {
                                            if (resultData.TotalMoney > 100000000)
                                                //거래대금
                                                $(element).text(CommonJs.NumberAddCommaFormat(Math.round(resultData.TotalMoney / 100000000)));
                                        }
                                    }


                                }

                            }); //each End

                            classElementBasic.each(function (index, element) {
                                //console.log(resultData.ChgType);
                                if (resultData.TradePrice != "undefined") {
                                    if (typeVal == "ITEM") {           //지수 
                                        if (index == 0) {
                                            //실시간 데이터 타입 체크 후 프론트 단 css class 조정
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //지수
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TradePrice));
                                        }
                                        //if (index == 1) {
                                        //    //전일대비 부호 +, -
                                        //    $(element).text(CommonJs.ChgTypeArrowFormat(resultData.ChgType));
                                        //}
                                        if (index == 1) {
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //전일대비 등락가
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.ChgPrice));
                                        }
                                        if (index == 2) {
                                            CommonJs.StockChgTypeCheck(resultData.ChgType, $(element));
                                            //등락률
                                            var chgRateVal_temp;
                                            var chgRateVal_temp2;
                                            var chgRateVal_temp3;

                                            if (resultData.ChgType == "1" || resultData.ChgType == "2" || resultData.ChgType == "+") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) - parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "4" || resultData.ChgType == "5" || resultData.ChgType == "-") {
                                                chgRateVal_temp3 = Math.floor((parseFloat(resultData.TradePrice) + parseFloat(resultData.ChgPrice)));
                                                chgRateVal_temp = (resultData.ChgPrice / chgRateVal_temp3) * 100;
                                                //chgRateVal_temp = parseFloat(chgRateVal_temp2);
                                            }
                                            else if (resultData.ChgType == "3") {
                                                //chgRateVal_temp2 = (resultData.ChgPrice / (resultData.TradePrice + resultData.ChgPrice)) * 10000;
                                                //chgRateVal_temp = parseFloat(Math.floor(chgRateVal_temp2)) * 0.01;
                                                chgRateVal_temp = 0.00;
                                            }
                                            //chgRateVal_temp = 0.1;
                                            //chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            chgRateVal = chgRateVal_temp.toFixed(2) + "%";
                                            $(element).text(chgRateVal);
                                        }
                                        if (index == 3) {
                                            //체결수량
                                            $(element).text(CommonJs.NumberAddCommaFormat(resultData.TotalVol));
                                        }
                                        if (index == 4) {
                                            if (resultData.TotalMoney > 100000000)
                                                //거래대금
                                                $(element).text(CommonJs.NumberAddCommaFormat(Math.round(resultData.TotalMoney / 100000000)));
                                        }
                                    }


                                }

                            }); //each End
                        },
                        error: function (e) {
                            console.log("Single Stock error ==> " + JSON.stringify(e));
                        }
                    });
                }
                else {
                    console.log("장마감-box_singleStock");
                }

                
            }, secVal * 6000);
        }
        else {
            console.log("holiday");
        }
    }
}

