$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_WT").html(cfGetPagingHtml(totalDataCount, $("#frmList_WT > #currentIndex").val(), $("#frmList_WT > #pageSize").val(), "WorldStockWT.SiseTimeWTList"));
});