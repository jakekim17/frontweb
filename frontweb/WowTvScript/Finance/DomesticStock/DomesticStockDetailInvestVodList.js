$(document).ready(function () {
    $("#stockVodSearchVal #btnSearch").on("click", function () {
        //alert("테스트");
        var tempCurrentIndex = $("#stockVodTab").find("#currentIndex").val();

        if (tempCurrentIndex == null || tempCurrentIndex == "") {
            tempCurrentIndex = 0;
        }
        DomesticStockDetailStockVod.InvestVodList(tempCurrentIndex);
        return false;
    });
    $("#frmList_SubNewsTab").keydown(function () {
        //console.log(event.keyCode);
        if (event.keyCode == 13) {
            $("#stockVodSearchVal #btnSearch").click();

            return false;
        }
    });
    $("#divPaging_investVodList").html(cfGetPagingHtml(totalDataCount_investVodList, $("#frmList_stockVod > #currentIndex").val(), $("#frmList_stockVod > #pageSize").val(), "DomesticStockDetailStockVod.InvestVodList"));
});