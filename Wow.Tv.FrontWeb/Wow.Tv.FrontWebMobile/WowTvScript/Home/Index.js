var HomeIndex = {
    MarketIssue: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/MarketIssue",
            data: {},
            success: function (data) {
                $("#divMarketIssue").html(data);
            }
        });
    },
    Opinion: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/Opinion",
            data: {},
            success: function (data) {
                $("#divOpinion").html(data);
            }
        });
    },
    ManySeeNews: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/ManySeeNews",
            data: {},
            success: function (data, textStatus) {
                $("#divManySeeNews").html(data);

                moresee_toggle();
            }
        });

        return false;
    },
    CardNews: function () {
        $.ajax({
            type: 'POST',
            url: "/Home/CardNews",
            data: {},
            success: function (data) {
                $("#divCardNews").html(data);
            }
        });
    },
    PhotoNews: function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: "/Home/PhotoNews",
            data: {},
            success: function (data) {
                $("#divPhotoNews").html(data);
            }
        });
    },
    NewsSome: function (typeCode) {
        $.ajax({
            async: false,
            type: 'POST',
            url: "/Home/NewsSome",
            data: { "typeCode": typeCode },
            success: function (data) {
                $("#divSome").html(data);
            }
        });
    },
    NewsSubMainTop: function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: "/Home/NewsSubMainTop",
            data: {},
            success: function (data) {
                $("#divNewsSubMainTop").html(data);
            }
        });
    },
    ChangeSome: function (typeCode) {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        HomeIndex.NewsSome(typeCode);
    },
    GoBroadWatch: function (programCode, broadWatchNumber) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&broadWatchNumber=" + broadWatchNumber;

        return false;
    },
    ChangeTv: function (isTv, num) {
        if (isTv == 1) {
            //alert(isTv + ":" + num);
            TvPlayer.PlayTvReplay(num);
        }
        else if (isTv == 2) {
            TvPlayer.PlayLiveTv();
        }
        else {
            //alert(isTv + "_" + num);
            TvPlayer.PlayVod(num);
        }
        $('.box-cont-box .box-wowPort-cont').hide();

        return false;
    }
}

$(document).ready(function () {

    HomeIndex.NewsSome('LATEST');
    HomeIndex.NewsSubMainTop();
    HomeIndex.MarketIssue();
    HomeIndex.Opinion();
    HomeIndex.ManySeeNews();
    HomeIndex.CardNews();
    HomeIndex.PhotoNews();
    
    //이슈 겔러리 클릭
    $(document).on('click', '.photoNews', function () {
        NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
    });

    //쉽게보는 뉴스
    $(document).on('click', '.seeNewsList', function () {
        NewsCommon.GoNewsRead($(this).attr('id'));
    });

    // 많이 보는 뉴스 (종합) 더보기
    //$(document).on('click', '#btnManyTotal', function () {
    //    if ($(this).children().hasClass('on')) {
    //        if ($('.manyTotalArt').length > 5) {
    //            for (var i = 5; i < $('.manyTotalArt').length; i++) {
    //                $('.manyTotalArt').eq(i).hide();
    //            }
    //        }
    //        //$(this).children().removeClass('on');

    //        ManySeeNewsScroll('divManySeeNews');

    //    } else {
    //        $('.manyTotalArt').show();
    //       // $(this).children().addClass('on');
    //    }
    //});

    // 많이 보는 뉴스 (종합) 더보기 => design.js가 적용되기 때문에 순서 바꿈...
    $(document).on('click', '#btnManyTotal', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyTotalArt').show();
        } else {
            if ($('.manyTotalArt').length > 5) {
                for (var i = 5; i < $('.manyTotalArt').length; i++) {
                    $('.manyTotalArt').eq(i).hide();
                }
            }
            ManySeeNewsScroll('divManySeeNews');
        }
    });

    // 많이 보는 뉴스(연예) 더보기
    $(document).on('click', '#btnManyEntSpo', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyEntSpoArt').show();
        } else {
            if ($('.manyEntSpoArt').length > 5) {
                for (var i = 5; i < $('.manyEntSpoArt').length; i++) {
                    $('.manyEntSpoArt').eq(i).hide();
                }
            }
            ManySeeNewsScroll('divManySeeNews');
        }
    });

    // 많이 보는 뉴스(페이스북) 더보기
    $(document).on('click', '#btnManyFacebook', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyFacebookArt').show();
        } else {
            if ($('.manyFacebookArt').length > 5) {
                for (var i = 5; i < $('.manyFacebookArt').length; i++) {
                    $('.manyFacebookArt').eq(i).hide();
                }
            }
            ManySeeNewsScroll('divManySeeNews');
        }
    });



    $("#divVodPartnerImage").click(function () {
        TvPlayer.Stop();
        $('.box-cont-box .box-wowPort-cont').show();

        return false;
    });

    // ========================================
    // 통합검색 API 사용

    var colorClassList = ["type1", "type2", "type3", "type4", "type5", "type1", "type2", "type3", "type4", "type5"];
    var randomCount = Math.floor(Math.random() * 10);

    var recommendationKeyWordTag = "";
    //alert("A");
    SearchApi.GetRecommendationKeyWord(10, function (recommendationKeyWord) {
        //$.each(recommendationKeyWord.resultSet.result[0].groupResult[0].ids, function (index, item) {
        $.each(recommendationKeyWord, function (index, item) {
            //recommendationKeyWordTag += "<a href=\"javascript: HashTagLink('" + item + "'); \"><span class=\"" + colorClassList[randomCount] + "\">" + item + "</span></a>";
            recommendationKeyWordTag += "<span class=\"hash-tag " + colorClassList[randomCount] + "\" onclick=\"return HashTagLink('" + item + "');\">" + item + "</span>";
            randomCount = Math.floor(Math.random() * 10);
        });
        $("#divRecommendationKeyWord").html(recommendationKeyWordTag);
        //alert("B");
    });
    //alert("C");

    // 통합검색 API 사용
    // ========================================


    TvPlayer.PlayLiveTv();


});

