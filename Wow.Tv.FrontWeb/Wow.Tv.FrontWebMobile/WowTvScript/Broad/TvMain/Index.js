
var TvMainIndex = {
    TimeValue: [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
        , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
        , "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
        , "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ],
    MoveTime: function (num) {
        var oParams = getUrlParams();
        var timeValue = TvMainIndex.TimeValue[num];
        document.location.href = "/Broad/TvMain/Index?menuSeq=" + oParams.menuSeq + "&selectTime=" + timeValue

        return false;
    },
    MoveBroad: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    },
    //BindBroadWatch: function () {
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Broad/TvMain/BroadWatch",
    //        data: {},
    //        success: function (data, textStatus) {
    //            $("#ulBroadWatch").html(data);
    //        }
    //    });

    //    return false;
    //},
    BindPopularityNews: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/PopularityNews",
            data: {},
            success: function (data, textStatus) {
                $("#divPopularityNews").html(data);
            }
        });

        return false;
    },
    BindStock: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/Stock",
            data: {},
            success: function (data, textStatus) {
                $("#divStock").html(data);
            }
        });

        return false;
    },
    BindMarket: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/Market",
            data: {},
            success: function (data, textStatus) {
                $("#divMarket").html(data);
            }
        });

        return false;
    },
    BindWebDrama: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/WebDrama",
            data: {},
            success: function (data, textStatus) {
                $("#divWebDrama").html(data);
            }
        });

        return false;
    },
    BindBroadLive: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/BroadLive",
            data: {},
            success: function (data, textStatus) {
                $("#divBroadLive").html(data);

                $("#stBroadLiveTitleLeftTop").text($("#stBroadLiveTitle").text());
            }
        });

        return false;
    },
    BindProgramList: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/ProgramList",
            data: {},
            success: function (data, textStatus) {
                $("#divProgramList").html(data);
            }
        });

        return false;
    },
    BindNotice: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/Notice",
            data: {},
            success: function (data, textStatus) {
                $("#divNotice").html(data);
            }
        });

        return false;
    },

    ViewStock: function () {
        $("#divStock").show();
        $("#divMarket").hide();

        $("#liStock").addClass("on");
        $("#liMarket").removeClass("on");

        return false;
    },
    ViewMarket: function () {
        $("#divStock").hide();
        $("#divMarket").show();

        $("#liStock").removeClass("on");
        $("#liMarket").addClass("on");

        return false;
    },

    OpenVod: function (vodNum) {
        PopupPlayVod(vodNum);
        return false;
    },
    OpenStockItem: function (stockCode) {
        //location.href = "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + stockCode + "&tabSeq=6&boardType=1";
        location.href = "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + stockCode + "&tabSeq=6&boardType=1&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail + "#boardContent";

        return false;
    },
    OpenNews: function (vodNum) {
        //NewsCommon.GoNewsView(vodNum);
        NewsCommon.GoNewsPopUpView(MENU_SEQ_DEFINE.NEWS.MAIN, vodNum)
        return false;
    },
    OpenStockConsulting: function () {
        window.open("http://board.wownet.co.kr/board/consultation/list.asp?bcode=N03010100&mseq=166", "_blank");

        return false;
    },
    OpenTvProgramBuy: function () {
        //var popOption = "width=665, height=700, resizable=no, scrollbars=no, status=no;";
        window.open("/Broad/TvMain/ProgramBuy1", "_blank");

        return false;
    },
    OpenContentsBuy: function () {
        window.open("https://mhelp.wowtv.co.kr/ServiceInfo/Hankyung/BroadInfo?menuSeq=562 ", "_blank");

        return false;
    },
    OpenUseMethod: function () {
        window.open("https://mhelp.wowtv.co.kr/UsageGuide/UsageGuide/PaymentInfo?menuSeq=503", "_blank");

        return false;
    },
    OpenChinaMore: function () {
        window.open("/Finance/China/Index?menuSeq=" + MENU_SEQ_DEFINE.FINANCE.CHINA_INDEX, "_blank");

        return false;
    },
    OpenPopup: function (url) {
        window.open(url, "_blank");

        return false;
    },
    GoBroadWatch: function (programCode, broadWatchNumber) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&broadWatchNumber=" + broadWatchNumber;

        return false;
    },
    aaa: function () {
        $('.broad-tv-slider').show();
        $('.broad-tv-slider ul').bxSlider2({
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 419,
            moveSlides: 1,
            mode: 'vertical',
            //captions: true,
            infiniteLoop: false,
            pager: false,
            //speed: 500,
            //auto: true
            //touchEnabled:false
            //preloadImages: 'all' ,
            startSlide: $("#hidCurrentIndex").val()
        });
        //$('.broad-tv-slider').hide(0, function () { $(this).show() });
        setTimeout(TvMainIndex.bbb, 10);
    },
    bbb: function () {
        $(".tv-view-slider").show();
        $('.tv-view-slider ul').bxSlider2({
            minSlides: 1,
            maxSlides: 3,
            slideWidth: 570,
            slideMargin: 0,
            pager: true,
            speed: 500,
            //captions: true,
            //mode:'horizontal',
            autoControls: false,
            controls: false,
            //touchEnabled:false,
            //auto: true, // 이미지 회전이 자동으로 됨
            //pagerCustom: '.bx-controls-auto .bx_pager'
        });

        //$(".tv-view-slider").hide(0, function () { $(this).show() });
    }
}



$(document).ready(function () {
    
    TvMainIndex.BindNotice();
    TvMainIndex.BindBroadLive();
    TvMainIndex.BindProgramList();

    TvMainIndex.BindPopularityNews();
    TvMainIndex.BindStock();
    TvMainIndex.BindMarket();
    
});


