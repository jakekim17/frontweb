$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_Nikkei").html(cfGetPagingHtml(totalDataCount, $("#frmList_Nikkei > #currentIndex").val(), $("#frmList_Nikkei > #pageSize").val(), "WorldStockNikkei.SiseTimeNikkeiList"));
});