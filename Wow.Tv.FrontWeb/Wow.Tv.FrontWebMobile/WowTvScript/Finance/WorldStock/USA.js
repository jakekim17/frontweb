var WorldStockUSA = {

    DowJones: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/DowJones",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_USA > #divList").html(data);
                $("#MarketType").val("999501");               
                WorldStockUSA.GetChart();
            }
        });

        return false;
    },
    Nasdaq: function () {
        
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/Nasdaq",
            //data: $("#frmList_dayNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_USA > #divList").html(data);
                $("#MarketType").val("999502"); 
                WorldStockUSA.GetChart();
            }
        });

        return false;
    },
    SANDP500: function () {
        //alert("테스트");
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SANDP500",
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_USA > #divList").html(data);
                $("#MarketType").val("999509"); 
                WorldStockUSA.GetChart();
            }
        });

        return false;
    },

    USAADR: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADR?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_USA > #divList").html(data);
            }
        });

        return false;
    },
    KoreaADR: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/KoreaADR",
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_USA > #divList").html(data);
            }
        });
    },
    GetChart: function (trId, code) {
        //code = $('.swiper-slide.on').attr('id');
        code = $("#MarketType").val();
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

    $(".swiper-wrapper > div").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        
        var tabMenu = $(this).text();

        if (tabMenu == "다우지수") {
           
            WorldStockUSA.DowJones();

        } else if (tabMenu == "나스닥지수") {
            WorldStockUSA.Nasdaq();

        } else if (tabMenu == "S&P500") {
            WorldStockUSA.SANDP500();

        } else if (tabMenu == "주요업종지수") {
            WorldStockUSA.USAADR();

        } else if (tabMenu == "한국물ADR") {
            WorldStockUSA.KoreaADR();
        }        
    });
       

    $(document).on('click', '.btnChart', function () {
        WorldStockUSA.GetChart($(this).attr('id'));
    });

    WorldStockUSA.DowJones();
    
    if ($("#menuTab").val() == "USAADR") {
        $(".swiper-wrapper > div").siblings().removeClass("on");
        $("#usaAdr").addClass("on");
        WorldStockUSA.USAADR();
    }
    
});