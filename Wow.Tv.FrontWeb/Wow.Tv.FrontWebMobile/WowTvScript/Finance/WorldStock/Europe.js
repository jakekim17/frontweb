var WorldStockEUROPE = {

    CAC40: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/CAC40",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_EUROPE > #divList").html(data);
                $("#MarketType").val("999514");
                WorldStockEUROPE.GetChart();
            }
        });
    },

    DAX: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/DAX",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_EUROPE > #divList").html(data);
                $("#MarketType").val("999507");
                WorldStockEUROPE.GetChart();
            }
        });
    },

    GetChart: function (trId, code) {
        code = $("#MarketType").val();
        //code = $('.btnMarketType.on').attr('id');
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
                        $('#txtChart').html('<span class="font-color03">' + data.splitList[2] + '</span>' + '<span class="num"> ' + startDate + '~' + endDate + '</span>');
                    }
                }
            }
        });
    }

}



$(document).ready(function () {    

    $(document).on('click', '.btnChart', function () {
        WorldStockEUROPE.GetChart($(this).attr('id'));
    });
    WorldStockEUROPE.CAC40();

    $(".swiper-wrapper > div").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        var tabMenu = $(this).text();

        if (tabMenu == "프랑스") {
            WorldStockEUROPE.CAC40();
        } else if (tabMenu == "독일") {
            WorldStockEUROPE.DAX();
        }
    });
})