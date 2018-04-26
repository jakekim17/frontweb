$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_KPI200").html(cfGetPagingHtml(totalDataCount, $("#frmList_KPI200 > #currentIndex").val(), $("#frmList_KPI200 > #pageSize").val(), "DomesticStockKPI200.SiseTimeKPI200List"));
});