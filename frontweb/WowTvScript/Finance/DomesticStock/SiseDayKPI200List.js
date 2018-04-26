//var AdminManageSearchList = {
//    GetCheckCount: function () {
//        return $("#divList").find("[name='seqList']:checked").length;
//    }
//};


$(document).ready(function () {
    $("#divPaging_dayKPI200").html(cfGetPagingHtml(totalDataCount_dayKPI200, $("#frmList_dayKPI200 > #currentIndex").val(), $("#frmList_dayKPI200 > #pageSize").val(), "DomesticStockKPI200.SiseDayKPI200List"));
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    //$("#chAll").change(function () {
    //    $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

    //    return false;
    //});

});