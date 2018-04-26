$(document).ready(function () {

    $("#divPaging_noticesList").html(cfGetPagingHtml(totalDatacount_stockNotices, $("#frmList_SubNoticesTab > #currentIndex").val(), $("#frmList_SubNoticesTab > #pageSize").val(), "DSDSubNoticesTab.StockNoticesList"));
});