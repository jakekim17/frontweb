$(document).ready(function () {
    //console.log($("#frmList_timeSHC > #currentIndex").val());
    $("#divPaging_timeSHC").html(cfGetPagingHtml(totalDataCount_timeSHC, $("#frmList_timeSHC > #currentIndex").val(), $("#frmList_timeSHC > #pageSize").val(), "WorldStockSHC.SiseTimeSHCList"));
});