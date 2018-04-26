
var TravelRead = {
    GoList: function () {

        var strUrl = "/NewsCenter/News/Travel";

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
     * @description Print
     */
    GetPrintPopUp: function () {

        $("#divPrintPopup").show();
    },
    GetPrintPopUpClose: function () {
        $("#divPrintPopup").hide();
    },
    /**
      * @description Jquery Print
      */
    Print: function () {

        $("#divPrintPopup").printThis({
            pageTitle: "한국경제TV",
            importCSS: true,
            importStyle: true
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
     * @description 이전,다음기사 정보
     */
    GetPrevNext: function () {
        //alert('GetNewsPrevNext');
        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelPrevNext",
            dataType: "json",
            data: $("#frm").serialize(),
            success: function (data, textStatus) {

                var jdata = jQuery.parseJSON(JSON.stringify(data));

                if (typeof (jdata.NewsPrevNext) != "undefined" && jdata.NewsPrevNext.length > 0) {

                    for (var i = 0; i < jdata.NewsPrevNext.length; i++) {

                        if (jdata.NewsPrevNext[i] != '') {

                            var newsType = jdata.NewsPrevNext[i].NEWS;
                            var newsTitle = jdata.NewsPrevNext[i].TITLE;
                            var newsArticleid = jdata.NewsPrevNext[i].ARTICLEID;

                            //이전 기사
                            if (newsType == "PREV_NEWS") {

                                var prevAreaHtml = String.format("<span class=\"btn-prev\">prev</span><a href=\"javascript:TravelRead.GoTravelView('{0}')\">{1}</a>", newsArticleid, newsTitle);
                                $(".prev-area").html(prevAreaHtml);

                                var spPrevHtml = String.format("<a href=\"javascript: TravelRead.GoTravelView('{0}')\" class=\"btn-prev\">prev</a>", newsArticleid);
                                $("#spPrev").html(spPrevHtml);
                            }

                            //다음기사
                            if (newsType == "NEXT_NEWS") {

                                var nextAreaHtml = String.format("<a href=\"javascript:TravelRead.GoTravelView('{0}')\">{1}</a><span class=\"btn-next\">next</span>", newsArticleid, newsTitle);
                                $(".next-area").html(nextAreaHtml);

                                var spNextHtml = String.format("<a href=\"javascript:TravelRead.GoTravelView('{0}')\" class=\"btn-next\">next</a>", newsArticleid);
                                $("#spNext").html(spNextHtml);
                            }
                        }
                    }
                }
            },
            beforeSend: function () {
                //로딩 처리

            },
            complete: function () {
                //완료..

            },
            error: function (jqXHR, textStatus, errorThrown) {
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
                //targetId.html("로딩중 입니다.");
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
     * @description 인기 겔러리
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
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("당신이 좋아할 만한 기사 에러..");
                }
            }
        });
    },

    /**
     * @description 관련 뉴스
     */
    GetReadRelationNews: function () {
        
        var targetId = $("#ulRelationNews");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelReadRelationNews",
            data: $("#frm").serialize(),
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
     * @description 상세 페이지 이동
     * @param {string} articleId 기사ID
     * @return {null}  
     */
    GoTravelView: function (articleId) {

        articleId = $.trim(articleId);

        var menuSeq = $.urlParam('menuSeq');
        var subMenu = $.urlParam('subMenu');
        var searchGubun = $.urlParam('SearchGubun');

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LIFE;
        if (subMenu == null || subMenu == 0) subMenu = "life";
        if (searchGubun == null || searchGubun == 0) searchGubun = "";

        var sUrl = String.format("/NewsCenter/News/TravelRead?menuSeq={0}&subMenu={1}&SearchGubun={2}&articleId={3}", menuSeq, subMenu, searchGubun, articleId);

        location.href = sUrl;
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
     * @description 당신에게 맞는 추천 뉴스
     */
    GetRecomNews: function () {

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadRecomNews",
            success: function (data, textStatus) {
                $("#divRecomNews").html(data);

                // 키워드를 우선 검색
                SearchApi.GetRecommendationKeyWord(7, NewsReadSearchApi.BindRecommendationKeyWordNews);
            }
        });
    },
    /**
     * @description 부가 컨텐츠 + AD.
     * @return {html}
     */
    RightContent: function () {
        /*
        $.ajax({
            type: "POST",
            url: "/NewsCenter/ContentRigth/Read",
            data: $("#frm").serialize(),
            success: function (data, textStatus) {

                $("#divContentRight").html(data);
            }
        });
        */
        $("#divContentRight").load("/html/ContentRigth.html");
    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    /**
    * @description 인쇄하기
    */
    $("[name='spanNewsPrint']").click(function () {
        TravelRead.GetPrintPopUp();
    });

    /**
     * @description 좋아요.
     */
    TravelRead.GetLikeit();

    /**
     * @description 이전,다음기사 정보
     */
    TravelRead.GetPrevNext();

    /**
     * @description 관련뉴스
     */
    TravelRead.GetReadRelationNews();

    /**
     * @description 이 기사와 많이본 기사
     */
    TravelRead.GetReadManySeeNews();

    /**
     * @description 인기 갤러리
     */
    TravelRead.GetReadPhotoNews();

    /**
     * @description 당신에게 맞는 추천 뉴스
     */
    TravelRead.GetRecomNews();

    /**
     * @description 오른쪽 부가 컨텐츠 + AD Area
     */
    TravelRead.RightContent();

    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
        }
    });

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