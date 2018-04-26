
var WorldStockWT = {
    SiseTimeWTList: function (currentIndex) {
        $("#frmList_WT > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeWTList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_WT").serialize(),
            success: function (data, textStatus) {
                $("#frmList_WT > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayWTList: function (currentIndex) {
        $("#frmList_WT > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayWTList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_WT").serialize(),
            success: function (data, textStatus) {
                $("#frmList_WT > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {

    //$(".tab-area a").on('click', function (e) {
    //    $(this).parent('li').addClass('on').siblings().removeClass('on');
    //    var type = $(this).text();
    //    if (type == '시간대별') {
    //        WorldStockWT.SiseTimeWTList(0);
    //    } else if (type == '일별') {
    //        WorldStockWT.SiseTimeWTList(0);
    //    }

    //});    

    //WorldStockWT.SiseTimeWTList(0);

});

