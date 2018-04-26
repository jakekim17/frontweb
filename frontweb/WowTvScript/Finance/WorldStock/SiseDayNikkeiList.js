$(document).ready(function () {
    //console.log($("#frmList_timeNikkei > #currentIndex").val());
    $("#divPaging_dayNikkei").html(cfGetPagingHtml(totalDataCount_dayNikkei, $("#frmList_dayNikkei > #currentIndex").val(), $("#frmList_dayNikkei > #pageSize").val(), "WorldStockNikkei.SiseDayNikkeiList"));
});