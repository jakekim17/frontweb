
var IngSearchListPartial = {
    GoBroadWatch: function (programCode, broadWatchNumber) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&broadWatchNumber=" + broadWatchNumber;

        return false;
    }

};


$(document).ready(function () {
    
});



var totalCount = $("#hidTotalCount").val();
var currentIndex = $("#frmSearch").find("[name='currentIndex']").val();
var pageSize = $("#frmSearch").find("[name='pageSize']").val();
$("#divPaging").html(cfGetPagingHtml(totalCount, currentIndex, pageSize, "IngIndex.BindSearchList"));
