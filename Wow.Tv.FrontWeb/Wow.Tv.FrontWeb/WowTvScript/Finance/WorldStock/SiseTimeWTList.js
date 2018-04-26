$(document).ready(function () {
    //console.log($("#frmList_timeWT > #currentIndex").val());
    $("#divPaging_timeWT").html(cfGetPagingHtml(totalDataCount_timeWT, $("#frmList_timeWT > #currentIndex").val(), $("#frmList_timeWT > #pageSize").val(), "WorldStockWT.SiseTimeWTList"));
});