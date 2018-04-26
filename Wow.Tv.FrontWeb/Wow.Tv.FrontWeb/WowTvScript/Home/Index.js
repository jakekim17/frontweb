var flatSeeNews = null;
var flatIssueNews = null;

var HomeIndex = {
    RotationVodCurrentIndex: 0,
    RotationVodInterval: (60 * 1000) * 10,
    //RotationVodInterval: (1 * 1000) * 10,
    BindSome: function (typeCode) {
        $("#divSome").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/Some",
            data: { "typeCode": typeCode },
            success: function (data, textStatus) {
                $("#divSome").html(data);

                //var ttt = ["", "방송", "", ""];

                $.each($(".devSomeArticle"), function (index, item) {
                    SearchApi.GetSomeNews(0, 2, $(item).val(), function (newsList) {
                    //SearchApi.GetSomeNews(0, 1, ttt[index], function (newsList) {
                        var someNewsSubTag = "";
                        var relCount = 0;
                        $.each(newsList.resultSet.result[0].resultDocuments, function (index2, item2) {
                            if (relCount < 2 && $(item).prev().val() != item2.ARTID) {
                                someNewsSubTag += "<dd><a href=\"javascript:NewsCommon.GoNewsRead('" + item2.ARTID + "');\">" + item2.TITLE + "</a></dd>";
                                relCount++;
                            }
                        });
                        $(item).next().append(someNewsSubTag);
                    });

                });
            }
        });

        return false;
    },
    BindSome2: function (typeCode) {
        $("#divSome2").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/Some2",
            data: { "typeCode": typeCode },
            success: function (data, textStatus) {
                $("#divSome2").html(data);
            }
        });

        return false;
    },
    BindMarketIssue: function (typeCode) {
        $("#divMarketIssue").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/MarketIssue",
            data: { },
            success: function (data, textStatus) {
                $("#divMarketIssue").html(data);
            }
        });

        return false;
    },
    BindOpinion: function (typeCode) {
        $("#divOpinion").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/Opinion",
            data: { },
            success: function (data, textStatus) {
                $("#divOpinion").html(data);
            }
        });

        return false;
    },
    BindSeeNews: function () {
        $("#divSeeNews").show();
        $("#divIssueNews").find("#IssueNewsSlider").find("ul").html('');
        $("#divIssueNews").hide();
        $("#divTvLive").hide();
        $("#divSeeNews").find("#SeeNewsSlider").find("ul").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;'/></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/SeeNews",
            data: {},
            success: function (data, textStatus) {
                $("#divSeeNews").find("#SeeNewsSlider").find("ul").html(data);
                if ($("#divSeeNews").find("#SeeNewsSlider").find("li").length > 0) {
                    SeeNewsSlider('SeeNewsSlider');
                    $('#SeeNewsSlider').find('li[data-index=0]').addClass('onSeeNews');
                }
            }
        });

        return false;
    },
    BindIssueNews: function () {
        $("#divSeeNews").find("#SeeNewsSlider").find("ul").html('');
        $("#divSeeNews").hide();
        $("#divIssueNews").show();
        $("#divTvLive").hide();
        $("#divIssueNews").find("#IssueNewsSlider").find("ul").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/IssueNews",
            data: {},
            success: function (data, textStatus) {
                $("#divIssueNews").find("#IssueNewsSlider").find("ul").html(data);
                if ($("#divIssueNews").find("#IssueNewsSlider").find("li").length > 0) {
                    PhotoNewsSlider('IssueNewsSlider');
                }
                
            }
        });

        return false;
    },
    BindTvLive: function () {
        $("#divSeeNews").hide();
        $("#divIssueNews").hide();
        $("#divTvLive").show();
        $("#divTvLive").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/TvLive",
            data: {},
            success: function (data, textStatus) {
                $("#divTvLive").html(data);
            }
        });

        return false;
    },
    BindHotNews: function () {
        $("#divHotNews").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Home/HotNews",
            data: { },
            success: function (data, textStatus) {
                $("#divHotNews").html(data);
            }
        });

        return false;
    },
    ChangePhoto: function (obj, typeCode) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).parent().addClass("on");

        if (typeCode == "See") {
            HomeIndex.BindSeeNews();
        }
        else if (typeCode == "Issue") {
            HomeIndex.BindIssueNews();
        }
        else if (typeCode == "TvLive") {
            HomeIndex.BindTvLive();
        }

        return false;
    },
    ChangeSome: function (obj, typeCode) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).parent().addClass("on");

        HomeIndex.BindSome(typeCode);
        //HomeIndex.BindSome2(typeCode);

        return false;
    },
    ChangeTv: function (isTv, num, obj) {
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
        $(obj).closest('.movie-list').find('span.icon-play-01').remove();
        $(obj).after('<span class="icon-play-01">play</span>');
        $(".hide-visual").removeClass("on");

        return false;
    },
    OpenPopup: function (url) {
        window.open(url, "_blank");

        return false;
    },
    MoveBroad: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    },
    RotationVod: function () {
        HomeIndex.RotationVodCurrentIndex++;
        if (HomeIndex.RotationVodCurrentIndex > 3) {
            HomeIndex.RotationVodCurrentIndex = 1;
        }
        $("#imgRotationVod" + HomeIndex.RotationVodCurrentIndex).click();

        setTimeout(HomeIndex.RotationVod, HomeIndex.RotationVodInterval);

        return false;
    }
}

$(document).ready(function () {

    HomeIndex.BindSome("LATEST");
    HomeIndex.BindSome2("LATEST");
    HomeIndex.BindMarketIssue();
    HomeIndex.BindOpinion();
    //HomeIndex.BindIssueNews();
    HomeIndex.BindSeeNews();
    HomeIndex.BindHotNews();

    //이슈 겔러리 클릭
    $(document).on('click', '.photoNewsList', function () {
        if ($(this).hasClass('onPhoto')) {
            NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
        } else {
            //var idx = $(this).index();
            $('.photoNewsList').removeClass('onPhoto');
            $(this).addClass('onPhoto');
        }
    });

    //쉽게보는 뉴스
    $(document).on('click', '.seeNewsList', function () {
        if ($(this).hasClass('onSeeNews')) {
            NewsCommon.GoNewsRead($(this).attr('id'));
        } else {
            $('.seeNewsList').removeClass('onSeeNews');
            $(this).addClass('onSeeNews');
        }
    });


    // ========================================
    // 통합검색 API 사용

    var colorClassList = ["bg_red", "bg_green", "bg_blue", "", "bg_red", "bg_green", "bg_blue", "", "bg_red", "bg_green"];
    var randomCount = Math.floor(Math.random() * 10);

    var recommendationKeyWordTag = "";
    SearchApi.GetRecommendationKeyWord(10, function (recommendationKeyWord) {
        //$.each(recommendationKeyWord.resultSet.result[0].groupResult[0].ids, function (index, item) {
        $.each(recommendationKeyWord, function (index, item) {
            recommendationKeyWordTag += "<a href=\"javascript: HashTagLink('" + item + "'); \"><span class=\"" + colorClassList[index] + "\">" + item + "</span></a>";
            randomCount = Math.floor(Math.random() * 10);
        });
        $("#divRecommendationKeyWord").html(recommendationKeyWordTag);
    });

    // 통합검색 API 사용
    // ========================================

    $("#divVodPartnerImage").click(function () {
        TvPlayer.Stop();
        $(this).closest('.movie-list').find('span.icon-play-01').remove();
        $(".hide-visual").addClass("on");

        return false;
    });

    TvPlayer.PlayLiveTv();
    
    setTimeout(HomeIndex.RotationVod, HomeIndex.RotationVodInterval);
});

