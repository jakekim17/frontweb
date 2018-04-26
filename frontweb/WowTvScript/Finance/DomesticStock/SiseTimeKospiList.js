$(document).ready(function () {
    
    $("#divPaging_timeKospi").html(cfGetPagingHtml(totalDataCount_timeKospi, $("#frmList_timeKospi > #currentIndex").val(), $("#frmList_timeKospi > #pageSize").val(), "DomesticStockKospi.SiseTimeKospiList"));
});