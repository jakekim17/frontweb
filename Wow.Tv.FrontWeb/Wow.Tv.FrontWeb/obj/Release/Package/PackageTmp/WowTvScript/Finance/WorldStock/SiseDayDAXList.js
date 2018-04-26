$(document).ready(function () {
    //console.log($("#frmList_timeDAX > #currentIndex").val());
    $("#divPaging_dayDAX").html(cfGetPagingHtml(totalDataCount_dayDAX, $("#frmList_dayDAX > #currentIndex").val(), $("#frmList_dayDAX > #pageSize").val(), "WorldStockDAX.SiseDayDAXList"));
});