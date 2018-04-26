$(document).ready(function () {
    //console.log($("#frmList_timeNikkei > #currentIndex").val());
    $("#divPaging_timeNikkei").html(cfGetPagingHtml(totalDataCount_timeNikkei, $("#frmList_timeNikkei > #currentIndex").val(), $("#frmList_timeNikkei > #pageSize").val(), "WorldStockNikkei.SiseTimeNikkeiList"));
});