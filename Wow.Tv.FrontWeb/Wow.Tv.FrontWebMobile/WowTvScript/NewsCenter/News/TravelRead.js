var TravelRead = {
    GoList: function () {

        var strUrl = "/NewsCenter/News/LifeList";

        var menuSeq = $("#menuSeq").val();
        var subMenu = $("#subMenu").val();
        var SearchGubun = $("#SearchGubun").val();

        var frm = $("#frm");

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LIFE;
        if (subMenu == null || subMenu == 0) subMenu = "life";
        if (SearchGubun == null || SearchGubun == 0) SearchGubun = "";

        var sUrl = String.format("{0}?menuSeq={1}&subMenu={2}&SearchGubun={3}", strUrl, menuSeq, subMenu, SearchGubun);

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
     * @description 좋아요.
     */
    GetLikeit: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divLikeit");

        $.ajax({
            //async: false,
            type: "POST",
            url: "/NewsCenter/News/TravelReadLikeit",
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
            url: "/NewsCenter/News/SetTravelLikeit",
            data: { articleId: articleId, likeitGubun: gubun },
            success: function (data, textStatus) {

                if (data.isSuccess == true) {
                    if (data.isLikeit == false) {

                        TravelRead.GetLikeit();
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
     * @description 이전,다음기사 정보
     */
    GetNewsPrevNext: function () {

        var targetId = $(".news-btn-area");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelPrevNext",
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

                                prevAreaHtml = String.format("<a href=\"javascript:TravelRead.GoTravelView('{0}')\" class=\"prev\"><span></span>이전기사</a>", newsArticleid);
                            }

                            //다음기사
                            if (newsType == "NEXT_NEWS") {

                                nextAreaHtml = String.format("<a href=\"javascript:TravelRead.GoTravelView('{0}')\" class=\"next\">다음기사<span></span></a>", newsArticleid);
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
     * @description 상세 페이지 이동
     * @param {string} articleId 기사ID
     * @return {null}  
     */
    GoTravelView: function (articleId) {

        articleId = $.trim(articleId);

        var menuSeq = $.urlParam('menuSeq');
        var subMenu = $.urlParam('subMenu');
        var searchGubun = $('#SearchGubun').val();

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LIFE;
        if (subMenu == null || subMenu == 0) subMenu = "life";
        if (searchGubun == null || searchGubun == 0) searchGubun = "";

        var sUrl = String.format("/NewsCenter/News/TravelRead?menuSeq={0}&subMenu={1}&SearchGubun={2}&articleId={3}", menuSeq, subMenu, searchGubun, articleId);

        if ($("#frm").length > 0) {

            $("#frm").attr("method", "post");
            $("#frm").attr("action", sUrl);
            $('#frm').removeAttr('onsubmit')
            $('#frm').submit();
        }
        else {
            location.href = sUrl;
        }
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
            url: "/NewsCenter/News/TravelReadManySeeNews",
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
     * @description 관련 뉴스
     */
    GetReadRelationNews: function () {
        var articleId = $('#articleId').val();
        var targetId = $("#spanRelationNews");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelReadRelationNews",
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
     * @description SNS DIV Area
     */
    GetPopSns: function () {

        var cookieVal = $.cookie("PopSnsTodyClose") || "NO";

        if (cookieVal != "YES") {
            $(".pop-sns-channel").show();
        }
    }
}

$(document).ready(function () {

    /**
     * @description 좋아요.
     */
    TravelRead.GetLikeit();

    /**
     * @description 이전, 다음 기사
     */
    TravelRead.GetNewsPrevNext();

    /**
     * @description 관련뉴스
     */
    TravelRead.GetReadRelationNews();

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