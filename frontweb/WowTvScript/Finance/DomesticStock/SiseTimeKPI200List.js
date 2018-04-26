//var AdminManageSearchList = {
//    GetCheckCount: function () {
//        return $("#divList").find("[name='seqList']:checked").length;
//    }
//};


$(document).ready(function () {
    $("#divPaging_timeKPI200").html(cfGetPagingHtml(totalDataCount_timeKPI200, $("#frmList_timeKPI200 > #currentIndex").val(), $("#frmList_timeKPI200 > #pageSize").val(), "DomesticStockKPI200.SiseTimeKPI200List"));
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    //$("#chAll").change(function () {
    //    $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

    //    return false;
    //});

});