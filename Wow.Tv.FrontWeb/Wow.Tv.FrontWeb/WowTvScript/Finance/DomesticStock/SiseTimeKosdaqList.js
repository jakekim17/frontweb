//var AdminManageSearchList = {
//    GetCheckCount: function () {
//        return $("#divList").find("[name='seqList']:checked").length;
//    }
//};


$(document).ready(function () {
    $("#divPaging_timeKosdaq").html(cfGetPagingHtml(totalDataCount_timeKosdaq, $("#frmList_timeKosdaq > #currentIndex").val(), $("#frmList_timeKosdaq > #pageSize").val(), "DomesticStockKosdaq.SiseTimeKosdaqList"));
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    //$("#chAll").change(function () {
    //    $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

    //    return false;
    //});

});