$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_timeNasdaq").html(cfGetPagingHtml(totalDataCount_timeNasdaq, $("#frmList_timeNasdaq > #currentIndex").val(), $("#frmList_timeNasdaq > #pageSize").val(), "WorldStockNasdaq.SiseTimeNasdaqList"));
});