$(document).ready(function () {
    $("#divPaging_DAX").html(cfGetPagingHtml(totalDataCount, $("#frmList_DAX > #currentIndex").val(), $("#frmList_DAX > #pageSize").val(), "WorldStockDAX.SiseDayDAXList"));
});