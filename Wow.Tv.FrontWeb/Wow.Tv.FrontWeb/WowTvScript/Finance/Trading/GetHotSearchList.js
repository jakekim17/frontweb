var GetHotSearchList = {
    GetData: function () {
        var searchDate = $('#searchDate').val();

        if (searchDate == "") {
            searchDate = new Date();
            var month = searchDate.getMonth() + 1;
            var day = searchDate.getDate();
            var year = searchDate.getFullYear();

            month = month.toString();
            day = day.toString();
            year = year.toString();

            if (month.length < 2) {
                month = "0" + month;
            }
            if (day.length < 2) {
                day = "0" + day;
            }

            searchDate = "" + year + month + day;

            //alert(searchDate);

            var inputDate = year + "/" + month + "/" + day;
            $('#searchDate').val(inputDate);
        }

        $.ajax({
            type: "POST",
            url: "/Finance/Trading/GetHotSearchData",
            data: { searchDate: searchDate },
            success: function (data) {
                $("#dataArea").html(data);
            }
        });
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        //alert(domainUrl + "/" + arjCode)
        //alert(domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    }
    ,
    DomesticStockDetailNewsGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "&tabSeq=4&boardType=1#boardContent";
    },
    DomesticStockDetailNoticeGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "&tabSeq=4&boardType=2#boardContent";
    },
    DomesticStockDetailPredictionChartGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "&tabSeq=2#boardContent";
    }
};

$(document).ready(function () {
    GetHotSearchList.GetData();

    $('#btnsearch').click(function () {
        GetHotSearchList.GetData();
    });
});