var DomesticStockMarketSum = {
    MarKetSumKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/MarketSumKospi?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Upper > #divList").html(data);
            }
        });
        return false;
    },
    MarKetSumKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/MarketSumKosdaq?menuSeq=" + $("#currentMenuSeq").val(),
            success: function (data, textStatus) {
                $("#frmList_Upper > #divList").html(data);
            }
        });
        return false;
    }
}


$(document).ready(function () {
    $("tab-area a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#kospiTab").click(function () {
        DomesticStockMarketSum.MarKetSumKospi();
    });
    $("#kosdaqTab").click(function () {
        DomesticStockMarketSum.MarKetSumKosdaq();
    });

    DomesticStockMarketSum.MarKetSumKospi();
});