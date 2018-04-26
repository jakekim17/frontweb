var DomesticStockMarketSum = {
    MarketSumKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/MarketSumKospi",
            data: $("#frmMarketSumMarket > ").serialize(),
            success: function (data, textStatus) {
                $("#frmList_marketSum > #divList").html(data);
            }
        });
        return false;
    },
    MarketSumKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/MarketSumKosdaq",
            data: $("#frmMarketSumMarket").serialize(),
            success: function (data, textStatus) {
                $("#frmList_marketSum > #divList").html(data);
            }
        });
        return false;
    },
    CheckedRadioCount: function (radioElementSelectStr, elem) {

        if ($(radioElementSelectStr).length >= 8) {
            alert("최대 7개 까지만 가능합니다.");
            $(elem).prop("checked", false);
            return false;
        }

        return true;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
}

$(document).ready(function () {
    var radioElements = ".contain-group-checkbox input[type='checkbox']";
    var radioElementsChecked = ".contain-group-checkbox input[type='checkbox']:checked";
    var defaultDisplay = ["totalVol", "per", "openPrice", "highPrice", "lowPrice"];
    var fixedDisplay = ["empty", "indexNum", "korName", "tradePrice", "chgPrice", "chgRate"];

    $(".tab-type1 a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $(radioElements).click(function () {
        //해당종목이 없을때 colspan수를 넣어준다.
        //alert($(radioElementsCheckedStr).length);
        //$(".empty").prop("colspan", $(radioElementsCheckedStr).length + 5)


        $(this).each(function (index, elem) {
            if ($(elem).prop("checked") == true) {

                var checkBool = DomesticStockMarketSum.CheckedRadioCount(radioElementsChecked, elem);
                //if (checkBool) {
                //    var showClass = "." + $(elem).attr("id");
                //    $(showClass).show();
                //}
            }
            else {
                //var showClass = "." + $(elem).attr("id");
                //$(showClass).hide();
            }
        });
    });

    $("#kospi").click(function () {
        DomesticStockMarketSum.MarketSumKospi();
    });
    $("#kosdaq").click(function () {
        DomesticStockMarketSum.MarketSumKosdaq();
    });

    DomesticStockMarketSum.MarketSumKospi();
    
});