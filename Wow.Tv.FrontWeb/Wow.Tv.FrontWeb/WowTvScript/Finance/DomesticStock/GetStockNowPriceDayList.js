$(document).ready(function () {
    //console.log("tc: " + totalDatacount_timeStockPrice + "ci : " + $("#frmList_timeStockPrice > #currentIndex").val() + "ps: " + $("#frmList_timeStockPrice > #pageSize").val());
    //alert($("#frmList_timeStockPrice > #currentIndex").val());
    $("#divPaging_dayStockPrice").html(cfGetPagingHtml(totalDatacount_dayStockPrice, $("#frmList_dayStockPrice > #currentIndex").val(), $("#frmList_dayStockPrice > #pageSize").val(), "StockDetailCurPrice.StockPriceDayList"));
});