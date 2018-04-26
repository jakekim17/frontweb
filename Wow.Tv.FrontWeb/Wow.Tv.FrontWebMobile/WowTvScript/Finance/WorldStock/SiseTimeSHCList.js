$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_SHC").html(cfGetPagingHtml(totalDataCount, $("#frmList_SHC > #currentIndex").val(), $("#frmList_SHC > #pageSize").val(), "WorldStockSHC.SiseTimeSHCList"));
});