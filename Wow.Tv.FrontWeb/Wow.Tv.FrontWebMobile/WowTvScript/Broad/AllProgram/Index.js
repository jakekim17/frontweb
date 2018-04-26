
var AllProgramIndex = {
    BindSearchList: function (currentIndex) {
        $("#frmSearch").find("[name='currentIndex']").val(currentIndex);
        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/AllProgram/SearchList",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    ChangeName: function (programNameTermStart, programNameTermEnd) {
        $("#hidProgramNameTermStart").val(programNameTermStart);
        $("#hidProgramNameTermEnd").val(programNameTermEnd);

        AllProgramIndex.BindSearchList(0);

        return false;
    }

};


$(document).ready(function () {


    $("#btnSearch").click(function () {
        AllProgramIndex.BindSearchList(0);

        return false;
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    $("#btnSearch").click();

});
