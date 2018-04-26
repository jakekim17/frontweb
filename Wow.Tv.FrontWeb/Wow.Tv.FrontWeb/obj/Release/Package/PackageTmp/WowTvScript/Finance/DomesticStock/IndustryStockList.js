var IndustryStockList = {
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
};
$(document).ready(function () {
    //console.log(totalDataCount_industryStock + "/" + $("#frmList_industryStock > #currentIndex").val() + "/" + $("#frmList_industryStock > #pageSize").val() + "/");
    $("#divPaging_industryStock").html(cfGetPagingHtml(totalDataCount_industryStock, $("#frmList_industryStock > #currentIndex").val(), $("#frmList_industryStock > #pageSize").val(), "DomesticStockIndustryPartDetail.IndustryStockList"));
});