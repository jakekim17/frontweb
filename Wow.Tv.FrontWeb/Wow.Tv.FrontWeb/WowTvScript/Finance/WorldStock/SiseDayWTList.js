$(document).ready(function () {
    //console.log($("#frmList_timeWT > #currentIndex").val());
    $("#divPaging_dayWT").html(cfGetPagingHtml(totalDataCount_dayWT, $("#frmList_dayWT > #currentIndex").val(), $("#frmList_dayWT > #pageSize").val(), "WorldStockWT.SiseDayWTList"));
});