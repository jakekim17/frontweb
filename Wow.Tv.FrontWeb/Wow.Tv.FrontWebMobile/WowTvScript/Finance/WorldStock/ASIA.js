var WorldStockASIA = {
    Nikkei: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/Nikkei",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_ASIA > #divList").html(data);
                $("#MarketType").val("999503");
                WorldStockASIA.GetChart();
            }
        });
    },
    SHC: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SHC",
            //data: $("#frmList_dayNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_ASIA > #divList").html(data);
                $("#MarketType").val("999614");
                WorldStockASIA.GetChart();
            }
        });

        return false;
    },
    HS: function () {
        //alert("테스트");
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/HS",
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_ASIA > #divList").html(data);
                $("#MarketType").val("999504");
                WorldStockASIA.GetChart();
            }
        });

        return false;
    },
    WT: function () {
        //alert("테스트");
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/WT",
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_ASIA > #divList").html(data);
                $("#MarketType").val("999505");
                WorldStockASIA.GetChart();
            }
        });

        return false;
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
                        $('#txtChart').html('<span class="font-color03">'+data.splitList[2]+'</span>' + '<span class="num"> ' + startDate + '~' + endDate + '</span>');
                    }
                }
            }
        });
    }
}
    

$(document).ready(function () {

    $(".swiper-wrapper > div").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        var tabMenu = $(this).text();
        if (tabMenu == "일본") {
            WorldStockASIA.Nikkei();

        } else if (tabMenu == "중국") {
            WorldStockASIA.SHC();
        } else if (tabMenu == "홍콩") {
            WorldStockASIA.HS();
        } else if (tabMenu == "대만") {
            WorldStockASIA.WT();
        }
    });

    $(document).on('click', '.btnChart', function () {
        WorldStockASIA.GetChart($(this).attr('id'));
    });

    WorldStockASIA.Nikkei();
});
