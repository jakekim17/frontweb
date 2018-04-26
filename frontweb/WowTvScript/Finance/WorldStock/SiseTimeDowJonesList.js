$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    $("#divPaging_timeDowJones").html(cfGetPagingHtml(totalDataCount_timeDowJones, $("#frmList_timeDowJones > #currentIndex").val(), $("#frmList_timeDowJones > #pageSize").val(), "WorldStockDowJones.SiseTimeDowJonesList"));
});