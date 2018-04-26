var DomesticStockThemaPart = {

    Detail: function (partNum, partName) {
        $("#currentPartNum").val(partNum);
        $("#currentPartName").val(partName);
        $("#frmList_ThemaPartNameList").attr("method", "POST");
        $("#frmList_ThemaPartNameList").attr("action", "/Finance/DomesticStock/ThemaPartNameList?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frmList_ThemaPartNameList").submit();
        return false;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
};

$(document).ready(function () {

    $(document).on('click', '.detail', function () {   
        var partNum = $(this).next().val();
        var partName = $(this).text();
        DomesticStockThemaPart.Detail(partNum,partName);
    });

});

