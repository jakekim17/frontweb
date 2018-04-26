$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_Fut").html(cfGetPagingHtml(totalDataCount, $("#frmList_Fut > #currentIndex").val(), $("#frmList_Fut > #pageSize").val(), "DomesticStockFut.SiseDayFutList"));
});