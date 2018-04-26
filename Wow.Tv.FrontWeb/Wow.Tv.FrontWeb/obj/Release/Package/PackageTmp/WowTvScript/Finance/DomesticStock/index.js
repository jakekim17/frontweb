var DomesticStockIndex = {
    KospiChart: function () {
        FinanceChartJs.CurrentDbKospiChartData($("#kospiTimeChart"));
    },
    KosdaqChart: function () {
        FinanceChartJs.CurrentDbKosdaqChartData($("#kosdaqTimeChart"));
    },
    Kospi200Chart: function () {
        FinanceChartJs.CurrentDbKPI200ChartData($("#kospi200TimeChart"));
    },
    DowJonesChart: function () {
        FinanceChartJs.UsaTimeChartData("D", "D", $("#dowJoneTimeChart"));
    },
    NasDaqChart: function () {
        FinanceChartJs.UsaTimeChartData("N", "D", $("#nasdaqTimeChart"));
    },
    SAndP500Chart: function () {
        FinanceChartJs.UsaTimeChartData("S", "D", $("#sandp500TimeChart"));
    },
    USDExchangeChart: function () {
        FinanceChartJs.ExchangeTimeChartData("USD", $("#usdExchangeChart"));
    },
    JPYExchangeChart: function () {
        FinanceChartJs.ExchangeTimeChartData("JPY", $("#jpyExchangeChart"));
    },
    EURExchangeChart: function () {
        FinanceChartJs.ExchangeTimeChartData("EUR", $("#eurExchangeChart"));
    },
    CNYExchcangeChart: function () {
        FinanceChartJs.ExchangeTimeChartData("CNY", $("#cnyExchangeChart"));
    },
    SHCChart: function () {
        FinanceChartJs.AsiaTimeChartData("CH#SHC", "D", $("#shcTimeChart"));
    },
    NikkeiChart: function () {
        FinanceChartJs.AsiaTimeChartData("JP#NI225", "D", $("#nikkeiTimeChart"));
    },
    HSChart: function () {
        FinanceChartJs.AsiaTimeChartData("HK#HS", "D", $("#hsTimeChart"));
    },
    StockInfo: function (sc, sn, ct, cp, chgp) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/CharacterStockInfor",
            data: { arjCode: sc, stockName: sn, chgType: ct, Price: cp, chgPrice: chgp },
            success: function (data) {
                $(".chart-cont > .obj").html(data);
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
            }
        });
        return false;
    },
    MyFavoriteGo: function (domainUrlMyPageStr) {
        location.href = domainUrlMyPageStr + "/MyAction/MyStock/Index?menuSeq=525";
        //return false;
    },
    TodayInvestGo: function () {
        location.href = "http://invest.wownet.co.kr/invest/superior/list.asp?bcode=N01020100&mseq=152";
        //return false;
    },
    TodayInvestDetailGo: function (seq, bcode, ref, refStep) {
        //alert("http://invest.wownet.co.kr/invest/superior/view.asp?seq=" + seq + "&bcode=" + bcode + "&ref_step=" + refStep + "&ref=" + ref)
        location.href = "http://invest.wownet.co.kr/invest/superior/view.asp?seq=" + seq + "&bcode=" + bcode + "&ref_step=" + refStep + "&ref=" + ref;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    },
    ThemaPartgo: function (domainUrl, partNum) {
        //alert(domainUrl + "/Finance/DomesticStock/ThemaPart?partNum=" + partNum + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail);
        location.href = domainUrl + "/Finance/DomesticStock/ThemaPart?partNum=" + partNum + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.ThemaPart;
    },
    CharactorStockDetialGo: function (domainUrl, articleId) {
        var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;

        var sUrl = domainUrl + "/Finance/CharacterStock/Detail?menuSeq=" + menuSeq + "&articleId=" +  articleId;
        //alert(sUrl);
        location.href = sUrl;
        return false;
    },
    RankingStock100Go: function (domainUrl) {
        var menuSeq = MENU_SEQ_DEFINE.FINANCE.Ranking100;
        var sUrl = domainUrl + "/Finance/Trading/Rank?menuSeq=" + menuSeq;
        location.href = sUrl;
        return false;
    },
    GoNewsRead: function (articleId) {

        articleId = $.trim(articleId);

        var menuSeq = $.urlParam('menuSeq');
        var subMenu = $.urlParam('subMenu');
        var wowcode = $.urlParam('wowcode');
        var Class = $.urlParam('Class');

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;
        if (subMenu == null || subMenu == 0) subMenu = "latest";
        if (wowcode == null || wowcode == 0) wowcode = "";
        if (Class == null || Class == 0) Class = "";

        var sUrl = String.format("/NewsCenter/News/Read?menuSeq={0}&subMenu={1}&wowcode={2}&Class={3}&articleId={4}", menuSeq, subMenu, wowcode, Class, articleId);

        location.href = sUrl;
        return false;
    },
    GetRankList: function (time, sect, displayObj) {
        //alert(sect);
        if (time != "") {
            $("input[name='RnkTime']").val(time);
            //alert($("input[name='RnkTime']").val());
        }
        if (sect != "") {
            $("input[name='Sect']").val(sect);
            //alert($("input[name='Sect']").val());
        }


        $.ajax({
            type: "POST",
            url: "/Finance/Trading/MainRankData",
            data: $("#rankfrm").serialize(),
            success: function (data) {
                //console.log(data);
                displayObj.html(data);
            }

        });

    },
    EconomyStockColumnGo: function (domainUrl) {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.OPINION.CLASS_S;
        var sUrl = domainUrl + "/Opinion/SerialColumn/ColumnList?menuSeq=" + menuSeq + "&subMenu=opinion&Class=S";
        location.href = sUrl;
        return false;
    }
}




