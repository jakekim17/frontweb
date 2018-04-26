
var WorldStockDowJones = {
    SiseTimeDowJonesList: function (currentIndex) {
        $("#frmList_timeDowJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeDowJones > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayDowJonesList: function (currentIndex) {
        $("#frmList_dayDowJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayDowJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayDowJones > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentDowJonesList: function (currentIndex) {
        $("#frmList_enrollmentDowJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_enrollmentDowJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_enrollmentDowJones > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    WorldStockDowJones.SiseTimeDowJonesList(0);
    WorldStockDowJones.SiseDayDowJonesList(0);
    WorldStockDowJones.SiseEnrollmentDowJonesList(0);
});

