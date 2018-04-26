
var WorldStockSANDP500 = {
    SiseTimeSANDP500List: function (currentIndex) {
        $("#frmList_SANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeSANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_SANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SANDP500 > #divList").html(data);
            }
        });

        return false;
    },
    SiseDaySANDP500List: function (currentIndex) {
        $("#frmList_SANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDaySANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_SANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SANDP500 > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentSANDP500List: function (currentIndex) {
        $("#frmList_SANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupSANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_SANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SANDP500 > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {

    $(".tab-area a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var type = $(this).text();
        if (type == '시간대별') {
            WorldStockSANDP500.SiseTimeSANDP500List(0);
        } else if (type == '일별') {
            WorldStockSANDP500.SiseDaySANDP500List(0);
        } else if (type == '편입종목상위') {
            WorldStockSANDP500.SiseEnrollmentSANDP500List(0);
        }

    });

    WorldStockSANDP500.SiseTimeSANDP500List(0);

    //alert("테스트");
    
});

