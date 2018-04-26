var DomesticStockDetailStockVod = {
    StockVodList: function (currentIndex) {
        $("#frmList_stockVod > #currentIndex").val(currentIndex);
        $("#frmList_stockVod > #searchType").val($("#stockVodSearchVal #title").attr("id"));
        $("#frmList_stockVod > #searchText").val($("#stockVodSearchVal #title").val());

        //console.log("1");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailStockVodList",
            data: $("#frmList_stockVod").serialize(),
            success: function (data, textStatus) {
                //alert("테스트" + currentIndex);
                $("#frmList_stockVod > #div_List").html(data);
            }
        });

        return false;
    },
    InvestVodList: function (currentIndex) {
        //console.log("1");
        $("#frmList_stockVod > #currentIndex").val(currentIndex);
        $("#frmList_stockVod > #searchType").val($("#stockVodSearchVal #title").attr("id"));
        $("#frmList_stockVod > #searchText").val($("#stockVodSearchVal #title").val());
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailInvestVodList",
            data: $("#frmList_stockVod").serialize(),
            success: function (data, textStatus) {
                //alert("테스트");
                $("#frmList_stockVod > #div_List").html(data);
            }
        });

        return false;
    }
};

$(document).ready(function () {
    var serachText;
    var tempCurrentIndex = $("#stockVodTab").find("#currentIndex").val();

    if (tempCurrentIndex == null || tempCurrentIndex == "") {
        tempCurrentIndex = 0;
    }

    $("#stockVodTab #stockConsult").parent("li").addClass("on");

    //탭 활성화..
    $("#stockVodTab li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#stockVodTab #stockConsult").on("click", function () {
        DomesticStockDetailStockVod.StockVodList(tempCurrentIndex);
    });

    $("#stockVodTab #strategy").on("click", function () {
        DomesticStockDetailStockVod.InvestVodList(tempCurrentIndex);
    });

    DomesticStockDetailStockVod.StockVodList(tempCurrentIndex);
});