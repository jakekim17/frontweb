var DomesticStockUpper = {
    UpperKospi: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/UpperKospi?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Upper > #divList").html(data);
            }
        });
        return false;
    },
    UpperKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/UpperKosdaq?menuSeq=" + $("#currentMenuSeq").val(),
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
        //alert("코스피");
        DomesticStockUpper.UpperKospi();
    });
    $("#kosdaqTab").click(function () {
        //alert("코스닥");
        DomesticStockUpper.UpperKosdaq();
    });

    DomesticStockUpper.UpperKospi();
});