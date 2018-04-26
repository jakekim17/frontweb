window.onload = function () {
    $.ajax({
        method: "post",
        url: "/Example/Chart/GetList",
        success: function (data) {
            //console.log('data: ' + JSON.stringify(data))
            Loadchart(data);
        },
        error: function () {
            console.log("error");
        }
    });
};

function Loadchart(data) {
    options.data.data = data;
    options.data.use = 'STOCK_CNT';

    pie = webponent.visual.pie.init($(".pie"), styles, options);
    $('.WEBPONENT-TRIAL-UI').css('background', '');
}

var pie;
var styles = {
    layout: {
        position: {
            x: 0,
            y: 0
        }
    },
    pie: {
        radius: 80,
        area: {
            color: [
                '#d6de1d', '#2bcdba', '#34b8ef', '#ffa4d8',
                '#ff625f', '#838bf0', '#ffbb16'
            ]
        },
        line: {
            color: '#fff',
            width: 1
        },
        hover: {
            use: true,
            area: {
                color: {
                    src: '/Content/Images/webPonent/pattern_hover.png'
                }
            }
        }
    },
    base: {
        use: true,
        radius: 80,
        area: {
            color: '#fff'
        },
        line: {
            color: '#e9e9e9',
            width: 20
        }

    },
    donut: {
        use: true,
        radius: 35,
        area: {
            color: '#fff'
        },
        line: {
            color: '#fff',
            width: 2
        }

    },
    legend: {
        use: true,
        stackedGap: 5,
        type: 'brokenLine',
        text: {
            family: 'Nanum Gothic',
            size: 14,
            color: '#333333',
            style: 'normal',
            opacity: 1
        }
    }
};

var options = {
    data: { },
    legend: {
        func: function (pie) {
            var legend = [];
            var dataTotal = pie.settings.data.dataTotalValue;
            var data = pie.settings.data.renderedData;

            for (var i = 0; i < data.length; i++) {
                var per = (data[i].STOCK_CNT / dataTotal * 100).toFixed(2);

                legend.push(data[i].NAME + ': ' + per + '%');
            }

            return legend;
        }
    },
    toolTip: {
        use: true,
        func: function (pie, data, tipElement) {
            var dataTotal = pie.settings.data.dataTotalValue;
            tipElement.html('주식수(지분율) : ' + data.STOCK_CNT + '( ' + (data.STOCK_CNT / dataTotal * 100).toFixed(2) + '% )');
        }
    }
};