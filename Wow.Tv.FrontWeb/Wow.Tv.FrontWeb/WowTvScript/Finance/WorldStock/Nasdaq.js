
var WorldStockNasdaq = {
    SiseTimeNasdaqList: function (currentIndex) {
        $("#frmList_timeNasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeNasdaq > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayNasdaqList: function (currentIndex) {
        $("#frmList_dayNasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayNasdaq > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentNasdaqList: function (currentIndex) {
        $("#frmList_enrollmentNasdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupNasdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_enrollmentNasdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_enrollmentNasdaq > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockNasdaq.SiseTimeNasdaqList(0);
    WorldStockNasdaq.SiseDayNasdaqList(0);
    WorldStockNasdaq.SiseEnrollmentNasdaqList(0);
});

