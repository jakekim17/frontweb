var WorldStockDowJones = {
    SiseTimeDowJonesList: function (currentIndex) {
        $("#frmList_DownJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_DownJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DownJones > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayDowJonesList: function (currentIndex) {
        $("#frmList_DownJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_DownJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DownJones > #divList").html(data);
            }
        });

        return false;
    },
    SiseEnrollmentDowJonesList: function (currentIndex) {
        $("#frmList_DownJones > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseStockGroupDowJonesList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_DownJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DownJones > #divList").html(data);
            }
        });

        return false;
    }

}

