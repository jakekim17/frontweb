var menuType; //default
var DayTrading = {
    GetList: function (part, bong, key1, key2) {
        var condMenu;
        switch (part) {
            case "C1":
                condMenu = "분봉 주가골든크로스";
                break;
            case "C2":
                condMenu = "분봉 거래갱신";
                break;
            case "C3":
                condMenu = "분봉 거래급증";
                break;
            case "C4":
                condMenu = "분봉 N자형 상승패턴";
                break;
            case "C5":
                condMenu = "분봉 신고가";
                break;
            case "C6":
                condMenu = "분봉 지지선 근접";
                break;
            case "C7":
                condMenu = "20일선 눌림목 발생";
                break;
            default:
                condMenu = "분봉 주가골든크로스";
                break;
        }
        menuType = part;

        var condList = key1 + "," + key2;

        $("input[name='CondMenu']").val(condMenu);
        $("input[name='CondList']").val(condList);
        $("input[name='CandleType']").val(bong);

        $.ajax({
            type: "POST",
            url: "/Finance/Trading/KeyData?currentMenuSeq=" + menuSeq,
            data: $("#Dayfrm").serialize(),
            success: function (data) {
                //테이블..
                $("#dataArea").html(data);
                //항목갯수..
                $(".emphasize").text($("#dataCount").val());
                //검색 파라미터 셋팅.. 
                var length1 = $("#" + menuType + "_key1 option").length;
                var length2 = $("#" + menuType + "_key2 option").length;
                var length3 = $("#" + menuType + "_bong option").length;

                for (var i = 0; i < length1; i++) {
                    if ($("#" + menuType + "_key1 option").eq(i).val() == key1) {
                        $("#" + menuType + "_key1 option").eq(i).prop("selected", true);
                        $("label[for='" + menuType + "_key1']").text($("#" + menuType + "_key1 option").eq(i).val());
                    }
                }

                for (var i = 0; i < length2; i++) {
                    if ($("#" + menuType + "_key2 option").eq(i).val() == key2) {
                        $("#" + menuType + "_key2 option").eq(i).prop("selected", true);
                        $("label[for='" + menuType + "_key2']").text($("#" + menuType + "_key2 option").eq(i).val());
                    }
                }

                for (var i = 0; i < length2; i++) {
                    if ($("#" + menuType + "_bong option").eq(i).val() == key2) {
                        $("#" + menuType + "_bong option").eq(i).prop("selected", true);
                        $("label[for='" + menuType + "_key3']").text($("#" + menuType + "_key3 option").eq(i).val());
                    }
                }

                //탭show..
                $("#" + part).siblings().hide();
                $("#" + part).show();
                
            }

        });

    }
}

var Key = {
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    }
};

$(document).ready(function () {
    DayTrading.GetList('C1', '0', '5', '20');

    $("#tabArea > ul > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        //var idx = $(this).index();

        //$("#ChgCont > div").hide();
        //$("#ChgCont > div").eq(idx).show();
    });

    $(".srchButton").on("click", function () {
        var key1 = $("#" + menuType + "_key1 option:selected").val();
        var key2 = $("#" + menuType + "_key2 option:selected").val();
        var bong = $("#" + menuType + "_bong option:selected").val();
        if (typeof key1 == "undefined") {
            key1 = "";
        }

        if (typeof key2 == "undefined") {
            key2 = "";
        }

        if (typeof bong == "undefined") {
            bong = "0";
        }

        //검색
        DayTrading.GetList(menuType, bong, key1, key2);
    });


});