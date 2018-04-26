$(document).ready(function () {
    //console.log($("#frmList_timeHS > #currentIndex").val());
    $("#divPaging_timeHS").html(cfGetPagingHtml(totalDataCount_timeHS, $("#frmList_timeHS > #currentIndex").val(), $("#frmList_timeHS > #pageSize").val(), "WorldStockHS.SiseTimeHSList"));
});