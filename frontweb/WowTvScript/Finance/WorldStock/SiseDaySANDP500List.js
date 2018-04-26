$(document).ready(function () {
    //console.log($("#frmList_timeSANDP500 > #currentIndex").val());
    $("#divPaging_daySANDP500").html(cfGetPagingHtml(totalDataCount_daySANDP500, $("#frmList_daySANDP500 > #currentIndex").val(), $("#frmList_daySANDP500 > #pageSize").val(), "WorldStockSANDP500.SiseDaySANDP500List"));
});