var WorldStockIndex = {
    DowJonesChart: function () {
        FinanceChartJs.UsaTimeChartData("D", "D", $("#dowJoneTimeChart"));
    },
    NasDaqChart: function () {
        FinanceChartJs.UsaTimeChartData("N", "D", $("#nasdaqTimeChart"));
    },
    SAndP500Chart: function () {
        FinanceChartJs.UsaTimeChartData("S", "D", $("#sandp500TimeChart"));
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
    TodayInvestGo: function () {
        location.href = "http://invest.wownet.co.kr/invest/superior/list.asp?currPage=66&seq=&pseq=&bcode=N01020100&listType=&nickname=&code=N01020100&mseq=152&ref_step=&ref=&gubun=&sval=";
        //return false;
    },
    TodayInvestDetailGo: function (seq, bcode, ref, refStep) {
        //alert("http://invest.wownet.co.kr/invest/superior/view.asp?seq=" + seq + "&bcode=" + bcode + "&ref_step=" + refStep + "&ref=" + ref)
        location.href = "http://invest.wownet.co.kr/invest/superior/view.asp?seq=" + seq + "&bcode=" + bcode + "&ref_step=" + refStep + "&ref=" + ref;
    },
    USAADRGo: function (domainUrl, viewMode) {
        var menuSeq = MENU_SEQ_DEFINE.FINANCE.WorldStockUSA;
        var sUrl = domainUrl + "/Finance/WorldStock/USA?menuSeq=" + menuSeq + "&viewMode="+ viewMode;
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
    }
}