var options = {
    data: {
            data: [
                { "Date": "20140411", "Mprc": "58100", "HiPrc": "59500", "Lprc": "57900", "Cprc": "59400", "data1": "32473", "data2": "57901" },
                { "Date": "20140410", "Mprc": "59700", "HiPrc": "59800", "Lprc": "57600", "Cprc": "58600", "data1": "42617", "data2": "57551" },
                { "Date": "20140409", "Mprc": "60400", "HiPrc": "61200", "Lprc": "58400", "Cprc": "59200", "data1": "45822", "data2": "58151" },
                { "Date": "20140408", "Mprc": "60200", "HiPrc": "61000", "Lprc": "60000", "Cprc": "60700", "data1": "27574", "data2": "58601" },
                { "Date": "20140407", "Mprc": "60600", "HiPrc": "60800", "Lprc": "59800", "Cprc": "60700", "data1": "28635", "data2": "59251" },
                { "Date": "20140404", "Mprc": "61000", "HiPrc": "61300", "Lprc": "60500", "Cprc": "60900", "data1": "34192", "data2": "59651" },
                { "Date": "20140403", "Mprc": "61500", "HiPrc": "61600", "Lprc": "60000", "Cprc": "60600", "data1": "35100", "data2": "60021" },
                { "Date": "20140402", "Mprc": "60500", "HiPrc": "61300", "Lprc": "60500", "Cprc": "60800", "data1": "40694", "data2": "60248" },
                { "Date": "20140401", "Mprc": "59000", "HiPrc": "60000", "Lprc": "58800", "Cprc": "59700", "data1": "33243", "data2": "59004" },
                { "Date": "20140331", "Mprc": "59800", "HiPrc": "60200", "Lprc": "58900", "Cprc": "59300", "data1": "32872", "data2": "58887" },
                { "Date": "20140328", "Mprc": "58800", "HiPrc": "59800", "Lprc": "58500", "Cprc": "59500", "data1": "31254", "data2": "58525" },
                { "Date": "20140327", "Mprc": "59500", "HiPrc": "59700", "Lprc": "58900", "Cprc": "59700", "data1": "30812", "data2": "58322" },
                { "Date": "20140326", "Mprc": "58600", "HiPrc": "59500", "Lprc": "58100", "Cprc": "59200", "data1": "34604", "data2": "57047" },
                { "Date": "20140325", "Mprc": "58100", "HiPrc": "58600", "Lprc": "57400", "Cprc": "57900", "data1": "27810", "data2": "57657" },
                { "Date": "20140324", "Mprc": "58800", "HiPrc": "58900", "Lprc": "57800", "Cprc": "58300", "data1": "30083", "data2": "57852" },
                { "Date": "20140321", "Mprc": "57500", "HiPrc": "58400", "Lprc": "57300", "Cprc": "58400", "data1": "33878", "data2": "57354" },
                { "Date": "20140320", "Mprc": "57000", "HiPrc": "57400", "Lprc": "56700", "Cprc": "56900", "data1": "30955", "data2": "56884" },
                { "Date": "20140319", "Mprc": "56900", "HiPrc": "57700", "Lprc": "56700", "Cprc": "57100", "data1": "32225", "data2": "56687" },
                { "Date": "20140318", "Mprc": "57100", "HiPrc": "57300", "Lprc": "56200", "Cprc": "56900", "data1": "32965", "data2": "56041" },
                { "Date": "20140317", "Mprc": "54600", "HiPrc": "56600", "Lprc": "54600", "Cprc": "56600", "data1": "33955", "data2": "53847" },
                { "Date": "20140314", "Mprc": "54100", "HiPrc": "55200", "Lprc": "53800", "Cprc": "54900", "data1": "30176", "data2": "53987" },
                { "Date": "20140313", "Mprc": "55800", "HiPrc": "56300", "Lprc": "54700", "Cprc": "54800", "data1": "31902", "data2": "54054" },
                { "Date": "20140312", "Mprc": "56700", "HiPrc": "57000", "Lprc": "55600", "Cprc": "55700", "data1": "32895", "data2": "54126" },
                { "Date": "20140311", "Mprc": "54800", "HiPrc": "55900", "Lprc": "54700", "Cprc": "55800", "data1": "30438", "data2": "54254" },
                { "Date": "20140310", "Mprc": "55100", "HiPrc": "55400", "Lprc": "54500", "Cprc": "54800", "data1": "28380", "data2": "54012" },
                { "Date": "20140307", "Mprc": "55800", "HiPrc": "55900", "Lprc": "55100", "Cprc": "55600", "data1": "28032", "data2": "53884" },
                { "Date": "20140306", "Mprc": "56400", "HiPrc": "56700", "Lprc": "55300", "Cprc": "55800", "data1": "30609", "data2": "53541" },
                { "Date": "20140305", "Mprc": "56400", "HiPrc": "56900", "Lprc": "56000", "Cprc": "56700", "data1": "32790", "data2": "53810" },
                { "Date": "20140304", "Mprc": "55600", "HiPrc": "56500", "Lprc": "55200", "Cprc": "55800", "data1": "32115", "data2": "54054" },
                { "Date": "20140303", "Mprc": "55600", "HiPrc": "56900", "Lprc": "54500", "Cprc": "56000", "data1": "36788", "data2": "54454" }
        ]
    }
};
var styles = {
    main: {
        graph: {
            color: '#fafafa'
        },
        yAxis: {
            text: {
                align: 'right'
            }
        },
        series: {
            s1: {
               
            },
            s2: {
                area: {
                    normal: {
                        color: '#8EABFF' 
                    }
                },
                gradient: {
                    direction: 'vertical'
                }
            },
            s3: {
                line: {
                    normal: {
                        normal: {
                            color: 'red', width: 2, opacity: 0.5,
                            over: {
                                color: 'red', width: 2, opacity: 1
                            }
                        }
                    }
                }
            }
        }
    }
};
var series = {
    "main": {
        "s1": { series: 'candle', xaxis: 'Date', open: 'Mprc', high: 'HiPrc', low: 'Lprc', close: 'Cprc' },
        "s2": { series: 'column', xaxis: 'Date', yaxis: 'data1' },
        "s3": { series: 'line', xaxis: 'Date', yaxis: 'data2' }
    }
};
window.onload = function () {
    var chart = webponent.chart.init($('.chart'), options, styles, series);
    $('.WEBPONENT-TRIAL-UI').css('background', '');
};
