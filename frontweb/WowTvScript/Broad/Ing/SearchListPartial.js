
var IngSearchListPartial = {
    GoBroadWatch: function (programCode, broadWatchNumber) {        
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&broadWatchNumber=" + broadWatchNumber;

        return false;
    }

};


$(document).ready(function () {
    
    $("#SearchPartial_stTotalCount").text($("#SearchListPartial_hidTotalCountFormat").val() + "개");

    var totalCount = $("#SearchListPartial_hidTotalCount").val();
    var currentIndex = $("#SearchPartial_frmSearch").find("[name='currentIndex']").val();
    var pageSize = $("#SearchPartial_frmSearch").find("[name='pageSize']").val();
    //alert(totalCount + ":" + currentIndex + ":" + pageSize);
    $("#SearchListPartial_divPaging").html(cfGetPagingHtml(totalCount, currentIndex, pageSize, "IngSearchPartial.SearchList"));

});


