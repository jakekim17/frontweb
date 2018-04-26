var DomesticStockForeignHold = {
    ForeignHoldKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/ForeignHoldKospi",
            data: $("#frmForeignHoldMarket > ").serialize(),
            success: function (data, textStatus) {
                $("#frmList_foreignHold > #divList").html(data);
            }
        });
        return false;
    },
    ForeignHoldKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/ForeignHoldKosdaq",
            data: $("#frmForeignHoldMarket").serialize(),
            success: function (data, textStatus) {
                $("#frmList_foreignHold > #divList").html(data);
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

                var checkBool = DomesticStockForeignHold.CheckedRadioCount(radioElementsChecked, elem);
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
        DomesticStockForeignHold.ForeignHoldKospi();
    });
    $("#kosdaq").click(function () {
        DomesticStockForeignHold.ForeignHoldKosdaq();
    });

    DomesticStockForeignHold.ForeignHoldKospi();

});