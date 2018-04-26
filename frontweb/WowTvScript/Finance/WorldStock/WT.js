
var WorldStockWT = {
    SiseTimeWTList: function (currentIndex) {
        $("#frmList_timeWT > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeWTList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeWT").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeWT > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayWTList: function (currentIndex) {
        $("#frmList_dayWT > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayWTList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayWT").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayWT > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockWT.SiseTimeWTList(0);
    WorldStockWT.SiseDayWTList(0);

});

