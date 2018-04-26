var DomesticStockThema = {
    ThemaPartNameList: function (currentPartNum) {
       
        //console.log($("#partNum").val());
        //alert(currentPartNum);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/ThemaPartNameList",
            data: $("#frmList_ThemaPartNameList_" + currentPartNum).serialize(),
            success: function (data, textStatus) {
                $("#frmList_ThemaPartNameList_" + currentPartNum + " > #divList").html(data);
                
            }
        });

        return false;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    },
    DomesticStockDetailNewsNoticeGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "&tabSeq=4#boardContent";
    },
    DomesticStockDetailPredictionChartGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "&tabSeq=2#boardContent";
    }
}

$(document).ready(function () {
    $(".view-detail").click(function () {
        var currentPartNum = $(this).next().val();
        //console.log(currentPartNum);
        $("#frmList_ThemaPartNameList_" + currentPartNum).val(currentPartNum);
        //console.log($("#frmList_ThemaPartNameList_" + currentPartNum).val());
        DomesticStockThema.ThemaPartNameList(currentPartNum);
    });


});
