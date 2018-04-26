var WorldStockIndex = {

    WowBand: function () {
        if (isMobile.Android() == true) {
            location.href = "https://play.google.com/store/apps/details?id=kr.co.futurewiz.android.wowband";
        }
        else if (isMobile.IOS() == true) {
            location.href = "https://itunes.apple.com/kr/app/%EC%99%80%EC%9A%B0%EB%B0%B4%EB%93%9C/id1079686651?mt=8";
        }
    },

    StockWindow: function () {
        if (isMobile.Android() == true) {
            location.href = "https://play.google.com/store/apps/details?id=kr.co.wowtv.StockTalk";
        }
        else if (isMobile.IOS() == true) {
            location.href = "https://itunes.apple.com/kr/app/%EC%A3%BC%EC%8B%9D%EC%B0%BD-%EC%A3%BC%EC%8B%9D-%EC%A6%9D%EA%B6%8C1%EC%9C%84-%EC%95%B1-%EC%A6%9D%EA%B6%8C%EC%8B%9C%EC%84%B8-%EC%A3%BC%EC%8B%9D%EB%B9%84%ED%83%80%EB%AF%BC/id577658269?mt=8";
        }
    },

    VOD: function () {
        if (isMobile.Android() == true) {
            location.href = "http://m.wownet.co.kr/board/movie/list_android.asp";
        }
        else if (isMobile.IOS() == true) {
            location.href = "http://m.wownet.co.kr/board/movie/list_iphone.asp";
        }
    },

    TodayBroadCast: function () {
        if (isMobile.Android() == true) {

            location.href = "https://play.google.com/store/apps/details?id=co.kr.wownet.daebak";
        }
        else if (isMobile.IOS() == true) {

            location.href = "https://itunes.apple.com/kr/app/%EC%99%80%EC%9A%B0%EB%84%B7/id442902802?mt=8";
        }
    },

    WordPartner: function () {

        if (isMobile.Android() == true) {
            location.href = "https://play.google.com/store/apps/details?id=kr.co.futurewiz.android.wowband";
        }
        else if (isMobile.IOS() == true) {
            location.href = "https://itunes.apple.com/kr/app/%EC%99%80%EC%9A%B0%EB%B0%B4%EB%93%9C/id1079686651?mt=8";
        }

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

$(document).ready(function () {
    //alert("테스트");
    $(".tab-area a").on('click', function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var tabMenu = $(this).attr("id");

        if (tabMenu == "worldUsa") {
            FinanceChartJs.UsaTimeChartData("D", "D", $("#chart-Dowjonse"));
            FinanceChartJs.UsaTimeChartData("N", "D", $("#chart-Nasdaq"));
            FinanceChartJs.UsaTimeChartData("S", "D", $("#chart-SANDP500"));
        } else if (tabMenu == "worldAsia") {
            //아시아 
            //FinanceChartJs.AsiaTimeChartData("CH#SHC", "D", $("#chart_SHC"));
            //FinanceChartJs.AsiaTimeChartData("JP#NI225", "D", $("#chart_Nikkei"));
            //FinanceChartJs.AsiaTimeChartData("HK#HS", "D", $("#chart_HS"));
        } else if (tabMenu == "worldEurope") {
            // 유럽은 제외
        }
    });

    $(window).on("orientationchange", function () {
        if (window.orientation == 0)    //Portait
        {
            $(".chart-view").empty();
            //미국 다우존스,나스닥,S&P500 차트
            setInterval(FinanceChartJs.UsaTimeChartData("D", "D", $("#chart_Dowjones")), 1 * 400);
            setInterval(FinanceChartJs.UsaTimeChartData("N", "D", $("#chart_Nasdaq")), 1 * 400);
            setInterval(FinanceChartJs.UsaTimeChartData("S", "D", $("#chart_SAndP500")), 1 * 400);

            //아시아 
            //setInterval(FinanceChartJs.AsiaTimeChartData("CH#SHC", "D", $("#chart_SHC")), 1 * 400);
            //setInterval(FinanceChartJs.AsiaTimeChartData("JP#NI225", "D", $("#chart_Nikkei")), 1 * 400);
            //setInterval(FinanceChartJs.AsiaTimeChartData("HK#HS", "D", $("#chart_HS")), 1 * 400);
        }
        else {
            $(".chart-view").empty();
            //미국 다우존스,나스닥,S&P500 차트
            setInterval(FinanceChartJs.UsaTimeChartData("D", "D", $("#chart_Dowjones")), 1 * 400);
            setInterval(FinanceChartJs.UsaTimeChartData("N", "D", $("#chart_Nasdaq")), 1 * 400);
            setInterval(FinanceChartJs.UsaTimeChartData("S", "D", $("#chart_SAndP500")), 1 * 400);

            //아시아 
            //setInterval(FinanceChartJs.AsiaTimeChartData("CH#SHC", "D", $("#chart_SHC")), 1 * 400);
            //setInterval(FinanceChartJs.AsiaTimeChartData("JP#NI225", "D", $("#chart_Nikkei")), 1 * 400);
            //setInterval(FinanceChartJs.AsiaTimeChartData("HK#HS", "D", $("#chart_HS")), 1 * 400);
        }
    });

    FinanceChartJs.UsaTimeChartData("D", "D", $("#chart-Dowjonse"));
    FinanceChartJs.UsaTimeChartData("N", "D", $("#chart-Nasdaq"));
    FinanceChartJs.UsaTimeChartData("S", "D", $("#chart-SANDP500"));

    $("#btnWowBand").click(function () {
        WorldStockIndex.WowBand();
    });

    $("#btnStock").click(function () {
        WorldStockIndex.StockWindow();
    });

    $("#btnVOD").click(function () {
        WorldStockIndex.VOD();
    });
})