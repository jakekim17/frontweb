$(document).ready(function () {
    //console.log($("#frmList_timeSHC > #currentIndex").val());
    $("#divPaging_daySHC").html(cfGetPagingHtml(totalDataCount_daySHC, $("#frmList_daySHC > #currentIndex").val(), $("#frmList_daySHC > #pageSize").val(), "WorldStockSHC.SiseDaySHCList"));
});