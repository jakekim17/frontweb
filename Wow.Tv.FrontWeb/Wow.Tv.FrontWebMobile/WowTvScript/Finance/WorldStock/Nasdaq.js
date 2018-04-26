
var WorldStockNasdaq = {
    SiseTimeNasdaqList: function (currentIndex) {
        
        $("#frmList_Nasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Nasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Nasdaq > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayNasdaqList: function (currentIndex) {
        $("#frmList_Nasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Nasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Nasdaq > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentNasdaqList: function (currentIndex) {
        $("#frmList_Nasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Nasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Nasdaq > #divList").html(data);
            }
        });

        return false;
    }

}

$(document).ready(function () {
    //console.log("테스트");
    FinanceChartJs.UsaTimeChartData("N", "D", $(".chart-view"));
    $("#nasdaqTab a").on('click', function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var type = $(this).text();
        if (type == '시간대별') {
            WorldStockNasdaq.SiseTimeNasdaqList(0);
        } else if (type == '일별') {
            WorldStockNasdaq.SiseDayNasdaqList(0);
        } else if (type == '편입종목상위') {
            WorldStockNasdaq.SiseEnrollmentNasdaqList(0);
        }

    });

    WorldStockNasdaq.SiseTimeNasdaqList(0);
});



