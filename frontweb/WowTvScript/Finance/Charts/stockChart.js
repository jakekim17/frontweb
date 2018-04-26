/**
* 01번 옵션은 주요지수 차트에서 사용되는 옵션이다.
**/
var options_01 = {
    "data": {},
    format: {
        yAxis: function (value) {
            return priceDataFormat(value);
        }
    }
    //'data': [{ Date: '08:59', price: '2370' }, { Date: '09:09', price: '2375' }, { Date: '09:19', price: '2373' }, { Date: '09:29', price: '2374' }, { Date: '09:39', price: '2374' }, { Date: '09:49', price: '2376' }, { Date: '09:59', price: '2377' }, { Date: '10:09', price: '2380' }, { Date: '10:19', price: '2378' }, { Date: '10:29', price: '2373' }, { Date: '10:39', price: '2373' }, { Date: '10:49', price: '2371' }, { Date: '10:59', price: '2371' }, { Date: '11:09', price: '2371' }, { Date: '11:19', price: '2371' }, { Date: '11:29', price: '2371' }, { Date: '11:39', price: '2372' }, { Date: '11:49', price: '2372' }, { Date: '11:59', price: '2374' }, { Date: '12:09', price: '2372' }, { Date: '12:19', price: '2371' }, { Date: '12:29', price: '2370' }, { Date: '12:39', price: '2371' }, { Date: '12:49', price: '2373' }, { Date: '12:59', price: '2372' }, { Date: '13:09', price: '2372' }, { Date: '13:19', price: '2374' }, { Date: '13:29', price: '2373' }, { Date: '13:39', price: '2374' }, { Date: '13:49', price: '2374' }, { Date: '13:59', price: '2374' }, { Date: '14:09', price: '2375' }, { Date: '14:19', price: '2377' }, { Date: '14:29', price: '2377' }, { Date: '14:39', price: '2376' }, { Date: '14:49', price: '2376' }, { Date: '14:59', price: '2377' }, { Date: '15:09', price: '2376' }, { Date: '15:19', price: '2377' }, { Date: '15:29', price: '2377' },]
};

var options_world = {
    data: {},
    format: {
        xAxis: function (_str) {
            return "";
        },
        yAxis: function (value) {
            return priceDataFormat(value);
        }
    }
};

var styles_01 = {
    "main": {
        "layout": {
            "color": "white", "line": { "color": "white" },
            paddingTop: 30, paddingRight: 50, paddingBottom: 10, paddingLeft: 10
            
        },
        "series": {
            "s1": {
                area: {
                    normal: {
                        color: '#505eaf', opacity: 0.4,
                        over: {
                            color: '#505eaf', opacity: 0.4
                        }
                    }
                },
                line: {
                    normal: {
                        color: '#505eaf', width: 3,
                        over: {
                            color: '#505eaf', width: 3
                        }
                    }
                }
            }
        }
    }
};

var series_01 = {
    "main": {
        "s1": { series: 'line', xaxis: 'DT', yaxis: 'price' }
    }
};

/**
 * 04번 옵션은 IndustryPart 차트에서 사용되는 옵션이다. 
 **/
var options_04 = {
    data: {},
    format: {
        xAxis: function (_str) {
            return _str.substr(0, 11);
        },
        yAxis: function (value) {
            return "";
        }
    },
    use: {
        animate: false,
        aCrossLine: true
    },
    text: {
        format: {
            yAxis: function (value) {
                return priceDataFormat(value);
            }
        }
    }
};

var styles_04 = {
    main: {
        layout: {
            paddingTop: 1,
            paddingRight: 10,
            color: 'white',
            line: { color: 'white', width: 1 }
        },
        yAxis: {
            width: 0,
            position: 'left',
            paddingRight: 0,
            paddingLeft: 0,
            baseAtZero: false,
            useValue: { min: false, max: false },
            text: {
                family: 'dotum', size: 11, color: '#aaa', align: 'left', style: 'normal', opacity: 1
            },
            line: {
                color: '#ddd', width: 0, opacity: 1
            }
        },

        series: {
            s1: {
                itemWidth: 15,
                area: {
                    normal: {
                        color: '#505eaf',
                        over: {
                            color: '#505eaf'
                        }
                    }
                },
                text: {
                    use: true,
                    size: 11,
                    format: priceDataFormat
                }
            }
        }
    }
};

var series_security = {
    "main": {
        "s1": { series: 'column', xaxis: 'PartName', yaxis: 'Security' }
    }
};

var series_foreigner = {
    "main": {
        "s1": { series: 'column', xaxis: 'PartName', yaxis: 'Foreigner' }
    }
}

var series_personal = {
    "main": {
        "s1": { series: 'column', xaxis: 'PartName', yaxis: 'Personal' }
    }
}




var options_themaUpDownChart = {
    data: {
        /* url: '/WEB-APP/webponent/chart/sample_svg/chart/data/chart01_txt.txt',
        type: 'text' */
        data: [{
            Date: '20140101',
            Mprc: 10000
        }]
    },
    format: {
        xAxis: function (_str) {
            return _str.substr(0, 4) + '.' + _str.substr(4, 2) + '.' + _str.substr(6, 2);
        },
        yAxis: 'priceDataFormat'
    },
    use: {
        animate: false,
        aCrossLine: true
    }
};
var styles_themaUpDownChart = {
    main: {
        layout: {
            paddingTop: 0,
            paddingRight: 10,
            color: 'white',
            line: { color: 'white', width: 1 }
        },
        graph: {
            color: '#f8f8f8',
            line: {
                top: {
                    color: '#cccccc'
                },
                left: {
                    width: 0
                },
                right: {
                    width: 0
                },
                bottom: {
                    color: '#cccccc'
                }
            }
        },
        crossLine: {
            color: '#465866'
        },
        xAxis: {
            paddingTop: 13,
            height: 30,
            text: {
                family: 'Nanum Gothic',
                size: 12,
                color: '#666'
            },
            line: {
                color: '#e3e3e3',
                width: 1
            }
        },
        yAxis: {
            width: 0,
            position: 'left',
            paddingRight: 0,
            paddingLeft: 0,
            baseAtZero: false,
            useValue: { min: false, max: false },
            text: {
                family: 'dotum', size: 11, color: '#aaa', align: 'left', style: 'normal', opacity: 1
            },
            line: {
                color: '#ddd', width: 0, opacity: 1
            }
        },
        tip: {
            className: 'tip'
        },
        series: {
            s1: {
                area: {
                    normal: {
                        color: [
                            [0, '#2bcdba'],
                            [100, '#6bdccf']
                        ],
                        over: {
                            color: {
                                src: '../webponent/chart/sample/chart/img/over.png',
                                color: '#4e6679'
                            }
                        }
                    }
                },
                line: {
                    normal: {
                        width: 0,
                        over: {
                            width: 0
                        }
                    }
                },
                gradient: {
                    direction: 'vertical'
                },
                text: {
                    use: true,
                    color: '#666666',
                    family: 'Nanum Gothic',
                    size: 12,
                    format: 'priceDataFormat'
                }
            }
        }
    }
};
var series_themaUpDownChart = {
    "main": {
        "s1": {
            series: 'bar',
            xaxis: 'Date',
            yaxis: 'Mprc'
        }
    }
};

//@Class_1 char(1), --Item(P: Kospi, D: Kosdaq, T: Kospi200, F: Kospi200 Future, H: 한경와이즈프리미어지수)
//@Class_2 char(1)-- Term(D: Day, W: Week, M: Month, Q: Quarter, Y: Year)
var FinanceChartJs = {
    ThemaUpDownChartDisplay: function (chartAreaElement, chartData) {
        //console.log(chartData.TotalCnt + "/" + chartData.RiseCnt + "/" + chartData.FallCnt);
        webponent.chart.init(chartAreaElement, options_themaUpDownChart, styles_themaUpDownChart, series_themaUpDownChart);
        $('.WEBPONENT-TRIAL-UI').css('background', '');
    },
    ExchangeTimeChartData: function (exchangeGubun, chartAreaElement) {
        var jsonObj = { Code: exchangeGubun }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/ExchangeTimeData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("exchange chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.insertDT.substr(11, 16) + '" , "price" : "' + item.Price + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(chartAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKospiChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "P", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKospiData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("kospi chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKosdaqChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "D", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKosdaqData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("kosdaq chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                    //console.log(item.Price);
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";

                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbFutChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "F", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeFutData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("fut chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";

                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKPI200ChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "T", Class_2: "D" };
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKPI200Data",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("kospi200 chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    UsaTimeChartData: function (marketSort, priod, chartAreaElement) {
        var jsonObj = { Class_1: marketSort, Class_2: priod };
        //alert(jsonObj.Class_1 + "/" + jsonObj.Class_2);
        
        $.ajax({
            type: "post",
            url: "/Finance/WorldStock/UsaTimeChartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    //var dt = item.DT.getHours() + ":" + item.DT.getMinutes(); 09:12

                    //var parsed = json.parse(data, function (key, value) {
                    //    if (typeof value === 'string') {
                    //        var d = /\/date\((\d*)\)\//.exec(value);
                    //        return (d) ? new date(+d[1]) : value;
                    //    }
                    //    return value;
                    //});
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(item.DT);
                    var dt = new Date(parseFloat(results[1]));
                    //var resultHour = dt.getHours() > 9 ? dt.getHours() : "0" + dt.getHours();
                    //var resultMinutes = dt.getMinutes > 9 ? dt.getMinutes() : "0" + dt.getMinutes();
                    
                    //var resultDt = resultHour + ":" + resultMinutes;

                    chartData += '{ "DT" : "' + dt.getHours() + ":" + dt.getMinutes() + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_world.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(chartAreaElement, options_world, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    AsiaTimeChartData: function (marketSort, priod, chartAreaElement) {
        var jsonObj = { Class_1: marketSort, Class_2: priod };
        //alert(jsonObj.Class_1 + "/" + jsonObj.Class_2);

        $.ajax({
            type: "post",
            url: "/Finance/WorldStock/AsiaTimeChartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {

                    //console.log(item.Price);
                    //var dt = item.DT.getHours() + ":" + item.DT.getMinutes(); 09:12

                    //var parsed = json.parse(data, function (key, value) {
                    //    if (typeof value === 'string') {
                    //        var d = /\/date\((\d*)\)\//.exec(value);
                    //        return (d) ? new date(+d[1]) : value;
                    //    }
                    //    return value;
                    //});



                    //var pattern = /Date\(([^)]+)\)/;
                    //var results = pattern.exec(item.DT);
                    //var dt = new Date(parseFloat(results[1]));
                    ////var resultHour = dt.getHours() > 9 ? dt.getHours() : "0" + dt.getHours();
                    ////var resultMinutes = dt.getMinutes > 9 ? dt.getMinutes() : "0" + dt.getMinutes();

                    ////var resultDt = resultHour + ":" + resultMinutes;

                    //chartData += '{ "DT" : "' + dt.getHours() + ":" + dt.getMinutes() + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';


                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(chartAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    IndustryPartSecurityChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartSecurityData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Security" : "' + item.Security + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";


                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_security);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }
            }
        });

    },
    IndustryPartForeignerChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartForeignerData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Foreigner" : "' + item.Foreigner + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";

                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_foreigner);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }

            }
        });

    },
    IndustryPartPersonalChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartPersonalData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Personal" : "' + item.Personal + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";

                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_personal);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }
                
            }
        });

    }
}

