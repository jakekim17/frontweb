var menuType = "C1"; //default
var Key = {
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    },
    GetList: function(part, key1, key2, key3){
        var condMenu;
        switch(part){
            case "C1":
                condMenu = "N자형상승패턴";
                break;
            case "C2":
                condMenu = "박스권 돌파 양봉";
                break;
            case "C3":
                condMenu = "5일선 스윙전략";
                break;
            case "C4":
                condMenu = "주가골든크로스";
                break;
            case "C5":
                condMenu = "대량거래지속";
                break;
            case "C6":
                condMenu = "거래급증";
                break;
            case "C7":
                condMenu = "20일선 눌림목 발생";
                break;
            case "C8":
                condMenu = "횡보 바닥 탈출 종목";
                break;
        }
        menuType = part;


        var condList = key1 + "," + key2 + "," + key3;
        var date =$("#date").val();
        date = date.replace(/[^0-9]/g, '');      


        $("input[name='CondMenu']").val(condMenu);
        $("input[name='CondList']").val(condList);    
        $("input[name='DateStr']").val(date);

        $.ajax({
            type: "POST",
            url: "/Finance/Trading/KeyData?currentMenuSeq=" + menuSeq,
            data: $("#Keyfrm").serialize(),
            success: function (data) {
                //테이블 ..
                $("#dataArea").html(data);
                //항목갯수..
                $(".emphasize").text($("#dataCount").val());
                //검색 파라미터 셋팅.. 
                var length1 = $("#" + menuType + "_key1 option").length;
                var length2 = $("#" + menuType + "_key2 option").length;
                var length3 = $("#" + menuType + "_key3 option").length;

                for (var i = 0; i < length1; i++) {
                    if ($("#" + menuType + "_key1 option").eq(i).val() == key1) {
                        $("#" + menuType + "_key1 option").eq(i).prop("selected", true);
                        //alert($("#" + menuType + "_key1 option").eq(i).val());
                        $("label[for='" + menuType + "_key1']").text($("#" + menuType + "_key1 option").eq(i).val());
                    }
                }

                for (var i = 0; i < length2; i++) {
                    if ($("#" + menuType + "_key2 option").eq(i).val() == key2) {
                        $("#" + menuType + "_key2 option").eq(i).prop("selected", true);
                        
                        $("label[for='" + menuType + "_key2']").text($("#" + menuType + "_key2 option").eq(i).val());
                    }
                }

                for (var i = 0; i < length3; i++) {
                    if ($("#" + menuType + "_key3 option").eq(i).val() == key3) {
                        $("#" + menuType + "_key3 option").eq(i).prop("selected", true);
                        
                        $("label[for='" + menuType + "_key3']").text($("#" + menuType + "_key3 option").eq(i).val());
                    }
                }

                //탭show..
                //$("#datePicker").datepicker("setDate", new Date());
                $("#" + part).siblings().hide();
                $("#" + part).show();
            }
            
        });

    }
}

$(document).ready(function () {
    
    Key.GetList('C1', '0', '5', '20');
    

    $("#tabArea > ul > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        //var idx = $(this).index();

        //$("#ChgCont > div").hide();
        //$("#ChgCont > div").eq(idx).show();
        //$("#datePicker").datepicker("setDate", new Date());

        
    });

    $("#srchButton").on("click", function () {
        var key1 = $("#" + menuType + "_key1 option:selected").val();
        var key2 = $("#" + menuType + "_key2 option:selected").val();
        var key3 = $("#" + menuType + "_key3 option:selected").val();

        if (typeof key1 == "undefined") {
            key1 = "";
        }

        if (typeof key2 == "undefined") {
            key2 = "";
        }

        if (typeof key3 == "undefined") {
            key3 = "";
        }


        //검색
        Key.GetList(menuType, key1, key2, key3);
    });


    $("#datePicker, #date").removeClass('hasDatepicker').datepicker({
        dateFormat: "yyyy-mm-dd",
        language: "kr",
    }).on("changeDate", function (ev) {
        $("#date").val(ev.date.format("yyyy-MM-dd"));
        $(this).datepicker('hide');
    }).datepicker("setDate", new Date());
    
});