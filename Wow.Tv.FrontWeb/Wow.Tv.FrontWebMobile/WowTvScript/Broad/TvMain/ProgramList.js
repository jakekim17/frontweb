
var TvMainProgramList = {
    MoveBroad: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    }
};

$(document).ready(function () {
});


$("#divProgramList").children("ul").children("li").click(function () {
    $(this).find(".cont-area").toggle();
});
