
var WorldStockHS = {
    SiseTimeHSList: function (currentIndex) {
        $("#frmList_HS > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeHSList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_HS").serialize(),
            success: function (data, textStatus) {
                $("#frmList_HS > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayHSList: function (currentIndex) {
        $("#frmList_HS > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayHSList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_HS").serialize(),
            success: function (data, textStatus) {
                $("#frmList_HS > #divList").html(data);
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
            WorldStockHS.SiseTimeHSList(0);
        } else if (type == '일별') {
            WorldStockHS.SiseDayHSList(0);
        }
    });

    WorldStockHS.SiseTimeHSList(0);
    

});

