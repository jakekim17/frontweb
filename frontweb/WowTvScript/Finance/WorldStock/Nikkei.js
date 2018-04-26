
var WorldStockNikkei = {
    SiseTimeNikkeiList: function (currentIndex) {
        $("#frmList_timeNikkei > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeNikkeiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeNikkei").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeNikkei > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayNikkeiList: function (currentIndex) {
        $("#frmList_dayNikkei > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayNikkeiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayNikkei").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayNikkei > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockNikkei.SiseTimeNikkeiList(0);
    WorldStockNikkei.SiseDayNikkeiList(0);
    
});

