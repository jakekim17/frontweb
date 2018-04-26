var CharacterStockDetail = {

    GoIndex: function () {

    },

    GoReporterDetail: function (reporterId) {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.REPORTER;
        alert(menuSeq);
        $("#hdSearchId").val(reporterId);
        $("#CurrentMenuSeq").val(menuSeq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + menuSeq);
        $("#frmSearch").submit();
    },
    GetHpChart: function (trId, code, width, height) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    //var startDate = data.splitList[4];
                    //var endDate = data.splitList[5];

                    //if (startDate.substr(0, 4) >= '2000') {
                    //    startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                    //    endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                    //    $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    //}
                }
            }
        });
    },
    GetHpChart: function (trId, code, width, height) {
       // alert(trId+" : " + code + " : " + width +" : " + height);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    //var startDate = data.splitList[4];
                    //var endDate = data.splitList[5];

                    //if (startDate.substr(0, 4) >= '2000') {
                    //    startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                    //    endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                    //    $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    //}
                }
            }
        });
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
};

$(document).ready(function () {

    $(document).on('click', '#btnSubScribe', function () {
        PopupSubScript(articleId);
    });

    var arjCode = $("#arjCode").val();
    CharacterStockDetail.GetHpChart("7551", arjCode, "450", "350")

});
