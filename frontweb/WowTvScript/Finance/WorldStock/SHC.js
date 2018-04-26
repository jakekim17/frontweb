
var WorldStockSHC = {
    SiseTimeSHCList: function (currentIndex) {
        $("#frmList_timeSHC > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeSHCList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeSHC").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeSHC > #divList").html(data);
            }
        });

        return false;
    },
    SiseDaySHCList: function (currentIndex) {
        $("#frmList_daySHC > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDaySHCList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_daySHC").serialize(),
            success: function (data, textStatus) {
                $("#frmList_daySHC > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockSHC.SiseTimeSHCList(0);
    WorldStockSHC.SiseDaySHCList(0);

});

