var DomesticStockForeignHold = {
    ForeignHoldKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/ForeignHoldKospi?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Upper > #divList").html(data);
            }
        });
        return false;
    },
    ForeignHoldKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/ForeignHoldKosdaq?menuSeq=" + $("#currentMenuSeq").val(),
            success: function (data, textStatus) {
                $("#frmList_Upper > #divList").html(data);
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
        DomesticStockForeignHold.ForeignHoldKospi();
    });
    $("#kosdaqTab").click(function () {
        DomesticStockForeignHold.ForeignHoldKosdaq();
    });

    DomesticStockForeignHold.ForeignHoldKospi();
});