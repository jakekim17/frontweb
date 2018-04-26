var StockDetailCurPrice = {
    ElementsValTotal: function (elements, totalArea) {
        var sumVal = 0;
        $(elements).each(function () {
            sumVal += Number($(this).text().replace(/(,)/g, ""));
            //console.log($(this).text().replace(/(,)/g, ""));
        });

        $(totalArea).text(CommonJs.StrAddComma("" + sumVal));
    },
    RecentlyStockTimeList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/RecentlyStockTimeTop10List",
            data: $("#frmList_StockDayTimeTop10").serialize(),
            success: function (data, textStatus) {

                $("#frmList_StockDayTimeTop10 > #divList").html(data);
            }
        });

        return false;
    },
    RecentlyStockDayList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/RecentlyStockDayTop10List",
            data: $("#frmList_StockDayTimeTop10").serialize(),
            success: function (data, textStatus) {
                $("#frmList_StockDayTimeTop10 > #divList").html(data);
            }
        });

        return false;
    },
    StockPriceTimeList: function (currentIndex) {
        $("#frmList_timeStockPrice > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetStockNowPriceTimeList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeStockPrice").serialize(),
            success: function (data, textStatus) {
                
                $("#frmList_timeStockPrice > #divList").html(data);
            }
        });

        return false;
    },
    StockPriceDayList: function (currentIndex) {
        $("#frmList_dayStockPrice > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetStockNowPriceDayList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayStockPrice").serialize(),
            success: function (data, textStatus) {

                $("#frmList_dayStockPrice > #divList").html(data);
            }
        });

        return false;
    }
}

$(document).ready(function () {
    //최근 시간대별, 일별 주가탭 활성화
    $("#recentlyStockTDTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#recentlyStockTimeTop10").on("click", function () {
        StockDetailCurPrice.RecentlyStockTimeList();
    });

    $("#recentlyStockDayTop10").on("click", function () {
        StockDetailCurPrice.RecentlyStockDayList();
    });
    
    StockDetailCurPrice.RecentlyStockDayList();

    StockDetailCurPrice.StockPriceTimeList(0);
    StockDetailCurPrice.StockPriceDayList(0);

    var hogaBidVolObjs = $("#tblHoga .hogaBid");
    var hogaAskVolObjs = $("#tblHoga .hogaAsk");

    StockDetailCurPrice.ElementsValTotal(hogaAskVolObjs, $("#totalAskVol"));
    StockDetailCurPrice.ElementsValTotal(hogaBidVolObjs, $("#totalBidVol"));


});