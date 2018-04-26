$(document).ready(function () {
    //console.log("tc: " + totalDatacount_stockNews + "ci : " + $(""#frmList_SubNewsTab > #currentIndex").val() + "ps: " + $("#frmList_SubNewsTab > #pageSize").val());
    //alert($("#frmList_timeStockPrice > #currentIndex").val());
    $("#divPaging_newsList").html(cfGetPagingHtml(totalDatacount_stockNews, $("#frmList_SubNewsTab > #currentIndex").val(), $("#frmList_SubNewsTab > #pageSize").val(), "DSDSubNewsTab.StockNewsList"));
});