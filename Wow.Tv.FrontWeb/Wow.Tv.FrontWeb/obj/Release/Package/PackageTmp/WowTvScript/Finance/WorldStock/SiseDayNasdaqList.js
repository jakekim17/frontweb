$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_dayNasdaq").html(cfGetPagingHtml(totalDataCount_dayNasdaq, $("#frmList_dayNasdaq > #currentIndex").val(), $("#frmList_dayNasdaq > #pageSize").val(), "WorldStockNasdaq.SiseDayNasdaqList"));
});