var SiseEnrollmentTopKPI200List = {
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert("테스트");
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
}


$(document).ready(function () {
    $("#divPaging_enrollmentTopKPI200").html(cfGetPagingHtml(totalDataCount_enrollmentTopKPI200, $("#frmList_enrollmentTopKPI200 > #currentIndex").val(), $("#frmList_enrollmentTopKPI200 > #pageSize").val(), "DomesticStockKPI200.SiseWowNetKPI200StockGroupList"));
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    //$("#chAll").change(function () {
    //    $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

    //    return false;
    //});

});