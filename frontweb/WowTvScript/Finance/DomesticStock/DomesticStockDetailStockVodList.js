

$(document).ready(function () {
    $("#stockVodSearchVal #btnSearch").on("click", function () {
        //alert("테스트");
        var tempCurrentIndex = $("#stockVodTab").find("#currentIndex").val();

        if (tempCurrentIndex == null || tempCurrentIndex == "") {
            tempCurrentIndex = 0;
        }
        DomesticStockDetailStockVod.StockVodList(tempCurrentIndex);
        return false;
    });
    $("#frmList_SubNewsTab").keydown(function () {
        //console.log(event.keyCode);
        if (event.keyCode == 13) {
            $("#stockVodSearchVal #btnSearch").click();

            return false;
        }
    });

    $("#divPaging_vodList").html(cfGetPagingHtml(totalDataCount_stockVodList, $("#frmList_stockVod > #currentIndex").val(), $("#frmList_stockVod > #pageSize").val(), "DomesticStockDetailStockVod.StockVodList"));
});