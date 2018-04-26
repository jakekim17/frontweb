
var WorldStockSANDP500 = {
    SiseTimeSANDP500List: function (currentIndex) {
        $("#frmList_timeSANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeSANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeSANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeSANDP500 > #divList").html(data);
            }
        });

        return false;
    },
    SiseDaySANDP500List: function (currentIndex) {
        $("#frmList_daySANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDaySANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_daySANDP500 > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentSANDP500List: function (currentIndex) {
        $("#frmList_enrollmentSANDP500 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupSANDP500List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_enrollmentSANDP500").serialize(),
            success: function (data, textStatus) {
                $("#frmList_enrollmentSANDP500 > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    //alert("테스트");
    WorldStockSANDP500.SiseTimeSANDP500List(0);
    WorldStockSANDP500.SiseDaySANDP500List(0);
    WorldStockSANDP500.SiseEnrollmentSANDP500List(0);
});

