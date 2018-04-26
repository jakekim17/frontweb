var DomesticStockUpper = {
    PageInit: function (defaultRadioTrue, fixedDisplay, radioElements) {

        $(".upperTbl colgroup col").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultRadioTrue));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {
                $(elem).hide();
            }
        });
        $(".upperTbl tr th").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultRadioTrue));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {
                $(elem).hide();
            }
        });
        $(".upperTbl tr td").each(function (index, elem) {
            //alert($(elem).attr("class"));
            //alert($.inArray($(elem).attr("class"), defaultRadioTrue));
            if ($.inArray($(elem).attr("class"), fixedDisplay) == -1) {

                //alert($(elem).attr("class"));
                $(elem).hide();
            }
            
        });

        //$(".checkbox").css("background", "red");
        radioElements.each(function (index, elem) {
            if ($.inArray($(elem).attr("id"), defaultRadioTrue) != -1) {

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
    CheckedRadioCount: function (elem, checkedCount) {
        //alert(checkedCount);
        if (checkedCount >= 8) {
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
    var radioElements = $(".contain-group-checkbox input[type='checkbox']");
    var radioElementsChecked = ".contain-group-checkbox input[type='checkbox']:checked";
    var defaultRadioTrue = ["totalVol", "per", "openPrice", "highPrice", "lowPrice"];
    var fixedDisplay = ["empty", "indexNum", "korName", "tradePrice", "chgPrice", "chgRate"];
    var checkedCount = 0;
    
    DomesticStockUpper.PageInit(defaultRadioTrue, fixedDisplay, radioElements);
    //alert($(radioElementsCheckedStr).length);
    /*radio 클릭*/
    radioElements.click(function () {
        //alert("클릭");

        checkedCount = $(radioElementsChecked).length;

        $(this).each(function (index, elem) {
            if ($(elem).prop("checked") == true) {
                //checkedCount += 1;
                var checkBool = DomesticStockUpper.CheckedRadioCount(elem, checkedCount);
            }
            else {
                //var showClass = "." + $(elem).attr("id");
                //$(showClass).hide();
            }
        });
    });

    /*적용하기*/
    $(".btn-type1 button").click(function () {
        //alert("적용하기");
        //alert(radioElements.is("checked").length);
        radioElements.each(function (index, elem) {
            //해당종목이 없을때 colspan수를 넣어준다.
            $(".empty").prop("colspan", $(radioElementsChecked).length + 5)
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
        DomesticStockUpper.PageInit(defaultRadioTrue, fixedDisplay, radioElements);
    });
});

