﻿$(document).ready(function(){
    $("#divPaging_DowJones").html(cfGetPagingHtml(totalDataCount, $("#frmList_DownJones > #currentIndex").val(), $("#frmList_DownJones > #pageSize").val(), "WorldStockDowJones.SiseTimeDowJonesList"));
})
