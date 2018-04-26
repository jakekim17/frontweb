$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_Kospi").html(cfGetPagingHtml(totalDataCount, $("#frmList_Kospi > #currentIndex").val(), $("#frmList_Kospi > #pageSize").val(), "DomesticStockKospi.SiseDayKospiList"));
});