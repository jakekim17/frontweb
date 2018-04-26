
var TvScheduleIndex = {
    BindSearchyList: function (dateString) {

        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/TvSchedule/SearchList",
            data: { "date": dateString },
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    GoProgram: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    }

};

$(document).ready(function () {

    $("#btnFileDownLoad").click(function () {
        $("#frm").attr("method", "post");
        $("#frm").attr("action", "/Broad/TvSchedule/DownLoad");
        $("#frm").submit();

        return false;
    });


    $("#btnFirst").click();

});

