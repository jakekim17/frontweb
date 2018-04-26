$(document).ready(function () {
    //console.log("tc: " + totalDatacount_timeStockPrice + "ci : " + $("#frmList_timeStockPrice > #currentIndex").val() + "ps: " + $("#frmList_timeStockPrice > #pageSize").val());
    //alert($("#frmList_timeStockPrice > #currentIndex").val());
    $("#divPaging_timeStockPrice").html(cfGetPagingHtml(totalDatacount_timeStockPrice, $("#frmList_timeStockPrice > #currentIndex").val(), $("#frmList_timeStockPrice > #pageSize").val(), "StockDetailCurPrice.StockPriceTimeList"));
});