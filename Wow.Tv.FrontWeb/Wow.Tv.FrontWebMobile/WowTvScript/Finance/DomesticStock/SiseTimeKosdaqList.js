$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_Kosdaq").html(cfGetPagingHtml(totalDataCount, $("#frmList_Kosdaq > #currentIndex").val(), $("#frmList_Kosdaq > #pageSize").val(), "DomesticStockKosdaq.SiseTimeKosdaqList"));
});