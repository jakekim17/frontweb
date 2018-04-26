
var DomesticStockIndex = {
    
    CharactorStockDetialGo: function (domainUrl, articleId) {
        var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;
        
        var sUrl = domainUrl + "/Finance/CharacterStock/Detail?menuSeq=" + menuSeq + "&articleId=" + articleId;
        //alert(sUrl);
        location.href = sUrl;
        return false;
    },

    IndustryPart: function (domainUrl) {
        location.href = domainUrl + "/Finance/DomesticStock/IndustryPart?menuSeq=1086";
    },
    ThemaPart: function (domainUrl) {
        location.href = domainUrl + "/Finance/DomesticStock/ThemaPart?menuSeq=1426";
    },
    Rank: function (domainUrl) {
        location.href = domainUrl + "/Finance/Trading/Rank?menuSeq=1433";
    },

    TodayInvestGo: function () {
        location.href = "http://m.wownet.co.kr/invest/superior/list.asp";
    },
    TodayInvestDetailGo: function (seq, bcode, ref, refStep) {
        location.href = "http://m.wownet.co.kr/invest/superior/view.asp?seq=" + seq + "&bcode=" + bcode + "&ref_step=" + refStep + "&ref=" + ref;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
    },
    WowBand: function () {
        
        if (isMobile.Android() == true) {
            location.href = "https://play.google.com/store/apps/details?id=kr.co.futurewiz.android.wowband";
        }
        else if (isMobile.IOS() == true) {
            //alert("아이폰");
            location.href = "https://itunes.apple.com/kr/app/%EC%99%80%EC%9A%B0%EB%B0%B4%EB%93%9C/id1079686651?mt=8";
        }
        else {
            
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
    ThemaPartgo: function (partNum, partName) {
        $("#currentPartNum").val(partNum);
        $("#currentPartName").val(partName);
        //alert(partNum + "/" + partName);
        $("#frmList_ThemaPartNameList").attr("method", "POST");
        $("#frmList_ThemaPartNameList").attr("action", "/Finance/DomesticStock/ThemaPartNameList?menuSeq=" + MENU_SEQ_DEFINE.FINANCE.ThemaPart);
        $("#frmList_ThemaPartNameList").submit();
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
    MyFavoriteGo: function (domainUrlMyPageStr) {
        location.href = domainUrlMyPageStr + "/MyAction/MyStock/Index?menuSeq=" + MENU_SEQ_DEFINE.MYPAGE.MY_STOCK;
        //return false;
    }

    
}

function GoLecturesDetail(lectureSeq, scheduleSeq) {
    //location.href = SITE_DOMAIN.HELP + "/LecturesAndEvent/Lecture/Detail?menuSeq=508&seq=" + lectureSeq + "&Schseq=" + scheduleSeq;
    //alert("테스트");
    window.open(SITE_DOMAIN.HELP + "/LecturesAndEvent/Lecture/Detail?menuSeq=508&seq=" + lectureSeq + "&Schseq=" + scheduleSeq);
}


$(document).ready(function () {    
   
    $(".tab-area a").on('click', function () {

        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var tabMenu = $(this).attr("name");
        if (tabMenu == "Domestic") {
            //국내 코스피,코스닥,코스피200 차트
            FinanceChartJs.CurrentDbKospiChartData($("#chart_Kospi"));
            FinanceChartJs.CurrentDbKosdaqChartData($("#chart_Kosdaq"));
            FinanceChartJs.CurrentDbKPI200ChartData($("#chart_Kospi200"));
        } else if (tabMenu == "Usa") {
            //미국 다우존스,나스닥,S&P500 차트
            FinanceChartJs.UsaTimeChartData("D", "D", $("#chart_Dowjones"));
            FinanceChartJs.UsaTimeChartData("N", "D", $("#chart_Nasdaq"));
            FinanceChartJs.UsaTimeChartData("S", "D", $("#chart_SAndP500"));
        } else if (tabMenu == "Asia") {
            //아시아 
            //FinanceChartJs.AsiaTimeChartData("CH#SHC", "D", $("#chart_SHC"));
            //FinanceChartJs.AsiaTimeChartData("JP#NI225", "D", $("#chart_Nikkei"));
            //FinanceChartJs.AsiaTimeChartData("HK#HS", "D", $("#chart_HS"));
        } else if (tabMenu == "ExchangeRate") {

        }


    });

    //국내 코스피,코스닥,코스피200 차트
    FinanceChartJs.CurrentDbKospiChartData($("#chart_Kospi"));
    FinanceChartJs.CurrentDbKosdaqChartData($("#chart_Kosdaq"));
    FinanceChartJs.CurrentDbKPI200ChartData($("#chart_Kospi200"));

    DomesticStockIndex.GetRankList('', '0', $('#rank100'));

    $(window).on("orientationchange", function () {
        if (window.orientation == 0)    //Portait
        {
            //alert("가로");
            $(".chart-view").empty();
            //국내 코스피,코스닥,코스피200 차트
            setInterval(FinanceChartJs.CurrentDbKospiChartData($("#chart_Kospi")), 1 * 400);
            setInterval(FinanceChartJs.CurrentDbKosdaqChartData($("#chart_Kosdaq")), 1 * 400);
            setInterval(FinanceChartJs.CurrentDbKPI200ChartData($("#chart_Kospi200")), 1 * 400);

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
            //alert("세로");
            $(".chart-view").empty();
            //국내 코스피,코스닥,코스피200 차트
            setInterval(FinanceChartJs.CurrentDbKospiChartData($("#chart_Kospi")), 1 * 400);
            setInterval(FinanceChartJs.CurrentDbKosdaqChartData($("#chart_Kosdaq")), 1 * 400);
            setInterval(FinanceChartJs.CurrentDbKPI200ChartData($("#chart_Kospi200")), 1 * 400);

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

    $("#btnWowBand").click(function () {
        //alert("밴트");
        DomesticStockIndex.WowBand();
    });

    $("#btnStock").click(function () {
        //alert("주식창");
        DomesticStockIndex.StockWindow();
    });

    $("#btnVOD").click(function () {
        //alert("vod");
        DomesticStockIndex.VOD();
    });

    $(document).on('click', '.themaPartDetail', function () {
        var partNum = $(this).next().val();
        var partName = $(this).text();
        DomesticStockIndex.ThemaPartgo(partNum, partName);
    });        
});

