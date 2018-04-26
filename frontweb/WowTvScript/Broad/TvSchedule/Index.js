
var TvScheduleIndex = {
    BindProgramList: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/ProgramList",
            data: {},
            success: function (data, textStatus) {
                $("#divProgramList").html(data);
            }
        });

        return false;
    },
    SearchList: function (date) {

        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");


        $.ajax({
            type: 'POST',
            url: "/Broad/TvSchedule/SearchList",
            data: { "date": date },
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    GoProgramMain: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    },
};




$(document).ready(function () {

    $(".devWeek").click(function () {
        TvScheduleIndex.SearchList($(this).find("input").val());

        return false;
    });

    $("#btnFileDownLoad").click(function () {
        $("#frm").attr("method", "post");
        $("#frm").attr("action", "/Broad/TvSchedule/DownLoad");
        $("#frm").submit();

        return false;
    });
    
    TvScheduleIndex.SearchList($("#hidNowDate").val());
    TvScheduleIndex.BindProgramList();

});

