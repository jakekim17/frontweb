var DomesticStockIndex = {
    StockInfo: function (sc, sn, ct, cp, chgp) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/CharacterStockInfor",
            data: { arjCode: sc, stockName: sn, chgType: ct, Price: cp, chgPrice: chgp },
            success: function (data) {
                $(".chart-cont > .obj").html(data);
            },
            error: function (xhr, status, error) {
                alert(error);
            } 
        });
        return false;
    },
    CharacterNewsMouseOver: function (stockCode, stockName, chgType, currPrice, chgPrice) {
        DomesticStockIndex.GetHpChart("7551", stockCode, "301", "247");
        DomesticStockIndex.StockInfo(stockCode, stockName, chgType, currPrice, chgPrice);
        //return false;
    },
    GetHpChart: function (trId, code, width, height) {
        //alert(code);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#characterChart").attr("src", data.splitList[3]);
                    //var startDate = data.splitList[4];
                    //var endDate = data.splitList[5];

                    //if (startDate.substr(0, 4) >= '2000') {
                    //    startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                    //    endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                    //    $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    //}
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            } 
        });
        return false;
    }
}


$(document).ready(function () {
    DomesticStockIndex.StockInfo('102210', '해덕파워웨이', '1', '17550', '4050');
});