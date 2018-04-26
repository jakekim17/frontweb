var DSDSubNewsTab = {
    StockNewsList: function (currentIndex) {
        $("#frmList_SubNewsTab > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailStockNewsList",
            data: $("#frmList_SubNewsTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SubNewsTab > #divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    $("#frmList_SubNewsTab #btnSearch").click(function () {
        DSDSubNewsTab.StockNewsList(0);

        return false;
    });

    $("#frmList_SubNewsTab").keydown(function () {
        //console.log(event.keyCode);
        if (event.keyCode == 13) {
            $("#frmList_SubNewsTab #btnSearch").click();

            return false;
        }
    });

    var tempCurrentIndex = $("#frmList_SubNewsTab").find("#currentIndex").val();

    if (tempCurrentIndex == null || tempCurrentIndex == "") {
        tempCurrentIndex = 0;
    }

    DSDSubNewsTab.StockNewsList(tempCurrentIndex);
});