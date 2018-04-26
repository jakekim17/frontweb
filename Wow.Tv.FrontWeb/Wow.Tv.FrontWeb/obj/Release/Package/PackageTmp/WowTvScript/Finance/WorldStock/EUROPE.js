
var WorldStockEUROPE = {
    CAC40: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/CAC40",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_EUROPE > #divList").html(data);
                WorldStockEUROPE.GetChart();
            }
        });

        return false;
    },
    DAX: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/DAX",
            //data: $("#frmList_dayNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_EUROPE > #divList").html(data);
                WorldStockEUROPE.GetChart();
            }
        });

        return false;
    },
    GetChart: function (trId, code) {
        code = $('.btnMarketType.on').attr('id');
        if (typeof trId == "undefined") {
            trId = "7551";
        }
        $.ajax({
            type: 'POST',
            url: '/Finance/WorldStock/GetChart',
            data: { trId: trId, code: code },
            success: function (data) {
                if (data != null) {
                    $('#ImgChart').attr('src', data.splitList[3]);
                    $('.btnChart').removeClass('on');
                    $('#' + trId).addClass('on');

                    var startDate = data.splitList[4];
                    var endDate = data.splitList[5];

                    if (startDate.substr(0, 4) >= '2000') {
                        startDate = startDate.substr(0, 4) + '-' + startDate.substr(4, 2) + '-' + startDate.substr(6, 2);
                        endDate = endDate.substr(0, 4) + '-' + endDate.substr(4, 2) + '-' + endDate.substr(6, 2);
                        $('#txtChart').html(data.splitList[2] + '<span class="text-number"> ' + startDate + '~' + endDate + '</span>');
                    }
                }
            }
        });
    }
}


$(document).ready(function () {

    $(".tab-type1 a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#cac40").click(function () {
        //alert("프랑스테스트");
        WorldStockEUROPE.CAC40();
    });
    $("#dax").click(function () {
        //alert("독일테스트");
        WorldStockEUROPE.DAX();
    });

    $(document).on('click', '.btnChart', function () {
        WorldStockEUROPE.GetChart($(this).attr('id'));
    });


    WorldStockEUROPE.CAC40();

});

