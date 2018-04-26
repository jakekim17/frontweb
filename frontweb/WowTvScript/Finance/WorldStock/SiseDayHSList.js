$(document).ready(function () {
    //console.log($("#frmList_timeHS > #currentIndex").val());
    $("#divPaging_dayHS").html(cfGetPagingHtml(totalDataCount_dayHS, $("#frmList_dayHS > #currentIndex").val(), $("#frmList_dayHS > #pageSize").val(), "WorldStockHS.SiseDayHSList"));
});