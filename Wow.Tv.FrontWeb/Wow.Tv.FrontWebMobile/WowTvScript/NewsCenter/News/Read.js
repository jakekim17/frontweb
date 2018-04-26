
var NewsRead = {

    GoNewsList: function () {

        var strUrl = "/NewsCenter/News/Index";
        var menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;
        var subMenu = $("#subMenu").val();
        var wowcode = $("#wowcode").val();
        var Class = $("#Class").val();
        var frm = $("#frm");

        
        //오피니언
        if (subMenu == "opinion") {

            menuSeq = MENU_SEQ_DEFINE.NEWS.OPINION.MAIN;

            strUrl = "/NewsCenter/Opinion/Index";
        }

        //포토
        if (subMenu == "photo") {

            menuSeq = MENU_SEQ_DEFINE.PHOTO.PHOTO;

            strUrl = "/NewsCenter/Photo/PhotoList";
        }

        //부동산
        if (subMenu == "land") {

            strUrl = "/NewsCenter/Land/List";
        }

        //생활.문화
        if (subMenu == "life") {

            strUrl = "/NewsCenter/News/LifeList";
        }

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;
        if (subMenu == null || subMenu == 0) subMenu = "";
        if (wowcode == null || wowcode == 0) wowcode = "";
        if (Class == null || Class == 0) Class = "";

        var sUrl = String.format("{0}?menuSeq={1}&subMenu={2}&wowcode={3}&Class={4}", strUrl, menuSeq, subMenu, wowcode, Class);

        if (frm.length > 0) {

            frm.attr("method", "post");
            frm.attr("action", sUrl);
            frm.removeAttr('onsubmit')
            frm.submit();
        }
        else {
            location.href = sUrl;
        }
    },
    /**
     * @description 관련종목 정보
     */
    GetStockInfo: function (articleId) {

        var targetId = $("#ulStockArea");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/StockInfo",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //targetId.html("<li>관련종목 로딩 중입니다.</li>");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("관련종목 정보 에러..");
                }
            }
        });
    },
    /**
     * @description 포토 뉴스 베스트 포토
     */
    GetReadBestPhotoNews: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divBestPhoto");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadBestPhotoNews",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("<div>베스트 포토 로딩 중입니다.</div>");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("베스트 포토 에러..");
                }
            }
        });
    },
    /**
     * @description 기자정보
     */
    GetReporterInfo: function (reporterId, tag) {

        var targetId = $("#reporterArea");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReporterInfo",
            data: $('#frm').serialize(),
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("기자정보 에러..");
                }
            }
        });
    },
    /**
     * @description 이전,다음기사 정보
     */
    GetNewsPrevNext: function () {
        //alert('GetNewsPrevNext');

        var targetId = $(".news-btn-area");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/NewsPrevNext",
            dataType: "json",
            data: $("#frm").serialize(),
            success: function (data, textStatus) {

                var jdata = jQuery.parseJSON(JSON.stringify(data));

                if (typeof (jdata.NewsPrevNext) != "undefined" && jdata.NewsPrevNext.length > 0) {

                    var prevAreaHtml = "";
                    var nextAreaHtml = "";

                    for (var i = 0; i < jdata.NewsPrevNext.length; i++) {

                        if (jdata.NewsPrevNext[i] != '') {

                            var newsType = jdata.NewsPrevNext[i].NEWS;
                            var newsTitle = jdata.NewsPrevNext[i].TITLE;
                            var newsArticleid = jdata.NewsPrevNext[i].ARTICLEID;

                            //이전 기사
                            if (newsType == "PREV_NEWS") {

                                prevAreaHtml = String.format("<a href=\"javascript:NewsCommon.GoNewsView('{0}')\" class=\"prev\"><span></span>이전기사</a>", newsArticleid);
                            }

                            //다음기사
                            if (newsType == "NEXT_NEWS") {

                                nextAreaHtml = String.format("<a href=\"javascript:NewsCommon.GoNewsView('{0}')\" class=\"next\">다음기사<span></span></a>", newsArticleid);
                            }
                        }
                    }

                    targetId.html(prevAreaHtml + nextAreaHtml);
                }
            },
            beforeSend: function () {
                //로딩 처리
                //var loadingImg = "<div><img src='/Content/images/ajax-loader.gif' ></div>"
                //targetId.html("이전 / 다음기사 로딩 중입니다.");
            },
            complete: function () {
                //완료..

            },
            error: function (jqXHR, textStatus, errorThrown) {

                //targetId.html("이전 / 다음기사 로딩 에러");
                //Error
                if (console && console.log) {
                    console.log("이전,다음기사 에러..");
                }
            }
        });
    },
    /**
     * @description 좋아요.
     */
    GetLikeit: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divLikeit");

        $.ajax({
            //async: false,
            type: "POST",
            url: "/NewsCenter/News/ReadLikeit",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("좋아요 에러..");
                }
            }
        });
    },

    /**
     * @description 좋아요.
     */
    Likeit: function (gubun) {

        var articleId = $("#articleId").val();
        var targetId = $("#divLikeit");

        $.ajax({
            async: false,
            type: "POST",
            url: "/NewsCenter/News/SetLikeit",
            data: { articleId: articleId, likeitGubun: gubun },
            success: function (data, textStatus) {

                if (data.isSuccess == true) {
                    if (data.isLikeit == false) {
                        NewsRead.GetLikeit();
                    } else {
                        alert("이미 선택 하셨습니다.");
                    }                    
                } else {
                    alert(data.msg);
                }
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("좋아요 클릭 에러..");
                }
            }
        });
    },
    /**
     * @description 관련 뉴스
     */
    GetReadRelationNews: function () {
        var articleId = $('#articleId').val();
        var targetId = $("#spanRelationNews");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadRelationNews",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("관련 뉴스 에러..");
                }
            }
        });
    },
    /**
     * @description 이기사와 많이본 기사
     */
    GetReadManySeeNews: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divReadManySeeNews");

        $.ajax({
            type: "POST",
            async: false,
            url: "/NewsCenter/News/ReadManySeeNews",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {

                if (console && console.log) {
                    console.log("이기사와 많이본 기사 에러..");
                }
            }
            , timeout: 30000 // sets timeout to 30 seconds
        });
    },
    /**
     * @description 인기 갤러리(포토리스트)
     */
    GetReadPhotoNews: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divReadPhotoNews");

        $.ajax({
            //async: false,
            type: "POST",
            url: "/NewsCenter/News/ReadPhotoNews",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                //targetId.html("로딩 중입니다.");
            },
            complete: function () {
                //완료..
                //targetId.html("완료.");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("인기 갤러리 에러..");
                }
            }
        });
    },
    /**
     * @description 당신에게 맞는 추천 뉴스
     */
    GetRecomNews: function () {

        var targetId = $("#divRecomNews");
       
        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadRecomNews",
            success: function (data, textStatus) {
                targetId.html(data);
                
                // 키워드를 우선 검색
                SearchApi.GetRecommendationKeyWord(7, NewsReadSearchApi.BindRecommendationKeyWordNews);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('당신에게 맞는 추천 뉴스 에러..');
            }
        });
    },
    /**
     * @description 기사 댓글
     */
    GetArticleComment: function () {
        $.ajax({
            method: 'POST',
            url: '/NewsCenter/News/ArticleComment',
            data: { articleId: $('#articleId').val()},
            success: function (data) {
                $('#divComment').html(data);

                if (!IsLogin() && !IsEasyLogin()) {
                    $('#divLogin').show();
                } else {
                    $('#divLogin').hide();
                }

                ArticleComment.SearchArtComment(0);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("댓글(GetArticleComment) 에러..");
                }
            }
        });
    },

    /**
     * @description SNS DIV Area
     */
    GetPopSns: function () {

        var cookieVal = $.cookie("PopSnsTodyClose") || "NO";

        if (cookieVal != "YES") {
            $(".pop-sns-channel").show();        
        }
    },
    /**
     * @description SNS DIV Area Set Cookie
     */
    SetPopSnsCookie: function () {

        $.cookie('PopSnsTodyClose', 'YES', { expires: 1, path: '/' });
        $(".pop-sns-channel").hide();
    },
    /**
     * @description 기사본문 Ad Iframe 추가
     */
    SetContentBannerScript: function (isPhotoAddition) {
        
        var contentEmlid = $("#divNewsContent");
        var photoBanner = "<div><iframe width='100%' height='52' src='http://adgrp1.ad4989.co.kr/cgi-bin/PelicanC.dll?impr?pageid=00mD&out=iframe' allowTransparency='true' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' style='width:320px;min-width:100%'></iframe></div>";
        var contentBanner = "<div class='banner-area type4'><iframe src='http://ad.wowtv.co.kr/NetInsight/html/m.wowtv/m.wowtv/m.wowtv@m.wowtv_200200' width='200' height='200' frameborder='0' scrolling='no' topmargin='0' leftmargin='0' marginwidth='0' marginheight='0'></iframe></div>";

        //일반기사,포토기사(동영상제외,카드뉴스제외 등..)
        if (isPhotoAddition == "true" && typeof (isPhotoAddition) != "undefined") {

            // 이미지 있을 경우.. 첫번째 이미지 다음으로..
            var findImg = contentEmlid.find("img:first");
            if (findImg.length > 0) {

                findImg.after(photoBanner);
            }
        }

        // 위치 "다." 2번째
        var intPost = indexOf_N(contentEmlid.html(), "다.", 2);

        // "다." 2개 있을 경우..
        if (intPost > -1) {

            intPost = (intPost + 2);

            var contentArea1 = contentEmlid.html().substring(0, intPost);
            var contentArea2 = contentEmlid.html().substr(intPost);

            contentEmlid.html(contentArea1 + contentBanner + contentArea2);
        }
        else {

            contentEmlid.html(contentEmlid.html() + contentBanner);
        }
    }    
}

$(document).ready(function () {

    //주석 페이스북 노출    
    NewsFacebookCount($("#articleId").val(), 'faceBookNum');

    //이전, 다음 기사
    NewsRead.GetNewsPrevNext();

    /**
     * @description 좋아요.
     */
    NewsRead.GetLikeit();

    /**
     * @description 관련뉴스
     */
    NewsRead.GetReadRelationNews();

    // 스크롤시 구글 셀렉트 박스 안보이게 함
    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
        }
    });

    $('body').removeClass('main');

    $(document).on('click', '.skiptranslate > .goog-te-gadget-simple', function () {
        if ($('.goog-te-menu-frame').hasClass('on')) {
            $('.goog-te-menu-frame').css('display', 'none');
            $('.goog-te-menu-frame').removeClass('on');
        } else {
            $('.goog-te-menu-frame').css('display', 'black');
            $('.goog-te-menu-frame').addClass('on');
        }
    });

    var language = getQuerystring('language');
    if (typeof language != "undefined") {
        if (!language.includes('/ko/')) {
            language = '/kr/' + language;
        }
        cookies = 'googtrans' + '=' + escape(language) + '; path=/ ';
        document.cookie = cookies;
    }
});