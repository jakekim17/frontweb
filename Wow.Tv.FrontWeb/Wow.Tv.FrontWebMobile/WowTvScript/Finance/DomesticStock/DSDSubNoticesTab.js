var DSDSubNoticesTab = {
    StockNoticesList: function (currentIndex) {
        $("#frmList_SubNoticesTab > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailStockNoticesList",
            data: $("#frmList_SubNoticesTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SubNoticesTab > #divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    //$("#frmList_SubNoticesTab #btnSearch").click(function () {
    //    DSDSubNewsTab.StockNewsList(0);

    //    return false;
    //});

    //$("#frmList_SubNoticesTab").keydown(function () {
    //    //console.log(event.keyCode);
    //    if (event.keyCode == 13) {
    //        $("#frmList_SubNoticesTab #btnSearch").click();

    //        return false;
    //    }
    //});

    var tempCurrentIndex = $("#frmList_SubNoticesTab").find("#currentIndex").val();

    if (tempCurrentIndex == null || tempCurrentIndex == "") {
        tempCurrentIndex = 0;
    }
    //alert(tempCurrentIndex);
    DSDSubNoticesTab.StockNoticesList(tempCurrentIndex);
});