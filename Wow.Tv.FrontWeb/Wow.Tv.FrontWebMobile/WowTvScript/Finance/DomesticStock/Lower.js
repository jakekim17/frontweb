var DomesticStockLower = {
    LowerKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/LowerKospi?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Lower > #divList").html(data);
            }
        });
        return false;
    },
    LowerKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/LowerKosdaq?menuSeq=" + $("#currentMenuSeq").val(),
            success: function (data, textStatus) {
                $("#frmList_Lower > #divList").html(data);
            }
        });
        return false;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
}

$(document).ready(function () {
    $("tab-area a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#kospiTab").click(function () {
        DomesticStockLower.LowerKospi();
    });
    $("#kosdaqTab").click(function () {
        DomesticStockLower.LowerKosdaq();
    });

    DomesticStockLower.LowerKospi();
});