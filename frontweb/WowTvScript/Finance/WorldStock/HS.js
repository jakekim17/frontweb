
var WorldStockHS = {
    SiseTimeHSList: function (currentIndex) {
        
        $("#frmList_timeHS > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeHSList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeHS").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeHS > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayHSList: function (currentIndex) {
        $("#frmList_dayHS > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayHSList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayHS").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayHS > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockHS.SiseTimeHSList(0);
    WorldStockHS.SiseDayHSList(0);

});

