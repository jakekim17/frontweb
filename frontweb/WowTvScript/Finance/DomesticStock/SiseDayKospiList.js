//var AdminManageSearchList = {
//    GetCheckCount: function () {
//        return $("#divList").find("[name='seqList']:checked").length;
//    }
//};


$(document).ready(function () {
    $("#divPaging_dayKospi").html(cfGetPagingHtml(totalDataCount_dayKospi, $("#frmList_dayKospi > #currentIndex").val(), $("#frmList_dayKospi > #pageSize").val(), "DomesticStockKospi.SiseDayKospiList"));
    //$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "AdminManageIndex.SearchList"));

    //$("#chAll").change(function () {
    //    $("#divList").find("[name='seqList']").prop("checked", $(this).prop("checked"));

    //    return false;
    //});

});