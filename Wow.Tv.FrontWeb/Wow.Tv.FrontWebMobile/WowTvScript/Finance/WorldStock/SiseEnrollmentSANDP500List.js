$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_SANDP500").html(cfGetPagingHtml(totalDataCount, $("#frmList_SANDP500 > #currentIndex").val(), $("#frmList_SANDP500 > #pageSize").val(), "WorldStockSANDP500.SiseEnrollmentSANDP500List"));
});