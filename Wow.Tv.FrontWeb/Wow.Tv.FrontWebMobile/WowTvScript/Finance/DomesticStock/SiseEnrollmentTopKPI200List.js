var SiseEnrollmentTopKPI200List = {
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert("테스트");
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
}

$(document).ready(function () {
    //console.log($("#frmList_timeDowJones > #currentIndex").val());
    //alert("테스트");
    $("#divPaging_KPI200").html(cfGetPagingHtml(totalDataCount, $("#frmList_KPI200 > #currentIndex").val(), $("#frmList_KPI200 > #pageSize").val(), "DomesticStockKPI200.SiseWowNetKPI200StockGroupList"));
});