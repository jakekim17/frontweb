$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_HS").html(cfGetPagingHtml(totalDataCount, $("#frmList_HS > #currentIndex").val(), $("#frmList_HS > #pageSize").val(), "WorldStockHS.SiseTimeHSList"));
});