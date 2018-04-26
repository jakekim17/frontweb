$(document).ready(function () {
    //console.log($("#frmList_timeCAC40 > #currentIndex").val());
    $("#divPaging_dayCAC40").html(cfGetPagingHtml(totalDataCount_dayCAC40, $("#frmList_dayCAC40 > #currentIndex").val(), $("#frmList_dayCAC40 > #pageSize").val(), "WorldStockCAC40.SiseDayCAC40List"));
});