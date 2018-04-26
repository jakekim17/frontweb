var BuyingProspects = {
    GetData: function (patternNum, patternTabId) {
        $('.btnPattern').removeClass('on');
        $('#' + patternTabId).addClass('on');

        $.ajax({
            type: "POST",
            url: "/Finance/Trading/GetBuyingData",
            data: { patternNum: patternNum },
            success: function (data) {
                $("#dataArea").html(data);

                $('.DivPattern').hide();
                $('#Div' + patternTabId).show();

                $('.radioPattern').attr('checked', false);
                $('#radio_' + patternNum).parent('label ').addClass('checked');
            }
        });
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    }
};

$(document).ready(function () {
    BuyingProspects.GetData('6001', '6001');

    $('.btnPattern').click(function () {
        var patternNum = $(this).attr('id');
        BuyingProspects.GetData(patternNum, patternNum);
    });

    $('.radioPattern').click(function () {
        var patternNum = $(this).attr('id');
        patternNum = patternNum.split('_')[1];
        var patternTabId = $('.btnPattern.on').attr('id');
        BuyingProspects.GetData(patternNum, patternTabId);
    });
});