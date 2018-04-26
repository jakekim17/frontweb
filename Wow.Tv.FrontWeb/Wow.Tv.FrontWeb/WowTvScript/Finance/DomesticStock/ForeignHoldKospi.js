var DomesticStockForeignHoldKospi = {
    PageInit: function (defaultDisplay, fixedDisplay) {

        $(".foreignHoldTbl colgroup col").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultDisplay));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {
                $(elem).hide();
            }
        });
        $(".foreignHoldTbl tr th").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultDisplay));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {
                $(elem).hide();
            }
        });
        $(".foreignHoldTbl tr td").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultDisplay));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {
                $(elem).hide();
            }
        });

        //$(".checkbox").css("background", "red");
        $(".contain-group-checkbox input[type='checkbox']").each(function (index, elem) {
            //alert($(elem).attr("id"));
            if ($.inArray($(elem).attr("id"), defaultDisplay) != -1) {

                $(elem).prop("checked", true);

                //alert($(elem).attr("id"));
                var showClass = "." + $(elem).attr("id");
                $(showClass).show();

            }
            else {
                //alert("타냐");
                $(elem).prop("checked", false);

                var showClass = "." + $(elem).attr("id");
                $(showClass).hide();

            }
        });

        /**** 퍼블에서 사용하는 함수(없으면 checkbox checked가 동작되지 않는다. *****/
        checkBox_Ck();
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

    /*적용하기*/
    $(".btn-type1 button").click(function () {
        //alert("적용하기");
        $(radioElements).each(function (index, elem) {
            //$(".empty").prop("colspan", $(radioElementsCheckedStr).length + 5)
            if ($(elem).prop("checked") == true) {
                var showClass = "." + $(elem).attr("id");
                $(showClass).show();
            }
            else {
                var showClass = "." + $(elem).attr("id");
                $(showClass).hide();
            }
        });
    });
    $(".btn-type2 button").click(function () {
        //alert("초기");
        DomesticStockForeignHoldKospi.PageInit(defaultDisplay, fixedDisplay);
    });

    DomesticStockForeignHoldKospi.PageInit(defaultDisplay, fixedDisplay);
});