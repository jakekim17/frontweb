$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_dayDowJones").html(cfGetPagingHtml(totalDataCount_dayDowJones, $("#frmList_dayDowJones > #currentIndex").val(), $("#frmList_dayDowJones > #pageSize").val(), "WorldStockDowJones.SiseDayDowJonesList"));
});