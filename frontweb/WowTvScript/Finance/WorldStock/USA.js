
var WorldStockUSA = {
    DowJones: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/DowJones",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_USA > #divList").html(data);
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
                        //$('#txtChart').html(data.splitList[2] + '<span class="text-number"> ' + startDate + '~' + endDate + '</span>');
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

    $("#dowJones").click(function () {
        //alert("테스트");
        WorldStockUSA.DowJones();
    });
    $("#nasdaq").click(function () {
        WorldStockUSA.Nasdaq();
    });
    $("#sandp500").click(function () {
        WorldStockUSA.SANDP500();
    });
    $("#usaAdr").click(function () {
        WorldStockUSA.USAADR();
    });
    $("#koreaAdr").click(function () {
        //alert("테스트");
        WorldStockUSA.KoreaADR();
    });

    $(document).on('click','.btnChart',function () {
        WorldStockUSA.GetChart($(this).attr('id'));
    });

    WorldStockUSA.DowJones();

    //WorldStockDowJones.SiseTimeDowJonesList(0);
    //WorldStockDowJones.SiseDayDowJonesList(0);
    //WorldStockDowJones.SiseEnrollmentDowJonesList(0);
});

