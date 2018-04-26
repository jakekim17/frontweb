$(document).ready(function () {
    $("#divPaging_CAC40").html(cfGetPagingHtml(totalDataCount, $("#frmList_CAC40 > #currentIndex").val(), $("#frmList_CAC40 > #pageSize").val(), "WorldStockCAC40.SiseDayCAC40List"));
});