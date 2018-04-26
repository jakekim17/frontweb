$(document).ready(function () {
    //console.log($("#frmList_timeSANDP500 > #currentIndex").val());
    $("#divPaging_timeSANDP500").html(cfGetPagingHtml(totalDataCount_timeSANDP500, $("#frmList_timeSANDP500 > #currentIndex").val(), $("#frmList_timeSANDP500 > #pageSize").val(), "WorldStockSANDP500.SiseTimeSANDP500List"));
});