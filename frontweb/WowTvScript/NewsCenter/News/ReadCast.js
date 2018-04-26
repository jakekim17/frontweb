
var serviceUrl = "http://news.wowtv.co.kr";

var NewsRead = {
    GoNewsList: function () {

        var strUrl = serviceUrl + "/NewsCenter/News/NewsList";
        var menuSeq = $("#menuSeq").val();
        var subMenu = $("#subMenu").val();
        var wowcode = $("#wowcode").val();
        var Class = $("#Class").val();
        var frm = $("#frm");

        //오피니언
        if (subMenu == "opinion") {

            strUrl = serviceUrl + "/Opinion/SerialColumn/ColumnList";

            if (Class == "S") {
                menuSeq = MENU_SEQ_DEFINE.NEWS.OPINION.CLASS_S;
            } GoNewsList

            if (Class == "P") {
                menuSeq = MENU_SEQ_DEFINE.NEWS.OPINION.CLASS_P;
            }
        }

        //포토
        if (subMenu == "photo") {

            menuSeq = MENU_SEQ_DEFINE.PHOTO.PHOTO;

            strUrl = serviceUrl + "/NewsCenter/Photo/PhotoList";
        }

        //부동산
        if (subMenu == "land") {

            strUrl = serviceUrl + "/NewsCenter/Land/Index";
        }

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.MAIN;
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
    GetArtComment: function () {
        $.ajax({
            method: 'POST',
            url: serviceUrl + '/NewsCenter/News/ArticleComment',
            data: { articleId: $('#articleId').val() },
            success: function (data) {
                $('#divComment').html(data);
            }
        });
    },
    NaverPopup: function () {
        NaverLogin.OpenPopup();
    },

    NaverPopupResult: function () {
        //alert("네이버로 로그인.\r\nId: " + NaverLogin.Id + "\r\nName: " + NaverLogin.Name + "\r\nEmail: " + NaverLogin.Email);
    },

    KakaoPopup: function () {
        KakaoLogin.OpenPopup();
    },

    KakaoPopupResult: function () {
        //alert("카카오로 로그인.\r\nId: " + KakaoLogin.Id + "\r\nName: " + KakaoLogin.Nickname + "\r\nEmail: " + KakaoLogin.Email);
    },

    FacebookPopup: function () {
        FacebookLogin.OpenPopup();
    },

    FacebookPopupResult: function () {
        //alert("페이스북으로 로그인.\r\nId: " + FacebookLogin.Id + "\r\nName: " + FacebookLogin.Name + "\r\nEmail: " + FacebookLogin.Email);
    },

    /**
     * @description NewsPrint
     */
    GetPrintPopUp: function () {

        /*
        var articleId = $("#articleId").val();

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadPrintNews",
            data: { articleId: articleId },
            success: function (data) {

                $("#divPrintPopup").html(data);
                $("#divPrintPopup").show();
            }
        });
        */
        $("#divPrintPopup").show();
    },
    GetPrintPopUpClose: function () {
        $("#divPrintPopup").hide();
    },

    /**
      * @description Jquery Print
      */
    Print: function () {

        $("#divPrintArea").printThis({
            pageTitle: "한국경제TV",
            importCSS: true,
            importStyle: true
        });
    },

    /**
     * @description Text&Link
     */
    GetTextAndLinkBanner: function () {
        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReadTextAndLinkNews",
            success: function (data, textStatus) {
                $("#divTextAndLinkBanner").html(data);
            }
        });
    },
    /**
     * @description 기자정보
     */
    GetReporterInfo: function (reporterId, tag) {
        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReporterInfo",
            data: $('#frm').serialize(),
            success: function (data, textStatus) {
                $("#reporterArea").html(data);
            }
        });
    },
    /**
     * @description 이기사와 관련된 종목정보
     */
    GetStockInfo: function (articleId) {
        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/StockInfo",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                $("#stockArea").html(data);
            }
        });
    },

    /**
     * @description 이전,다음기사 정보
     */
    GetNewsPrevNext: function () {
        //alert('GetNewsPrevNext');
        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/NewsPrevNext",
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

                                //var prevAreaHtml = String.format("<a href=\"javascript:void(0)\" class=\"btn-prev\">prev</a><a href=\"javascript:NewsCommon.GoNewsView('{0}')\">{1}</a>", newsArticleid, newsTitle);
                                var prevAreaHtml = String.format("<span class=\"btn-prev\">prev</span><a href=\"javascript:NewsCommon.GoNewsView('{0}')\">{1}</a>", newsArticleid, newsTitle);
                                $(".prev-area").html(prevAreaHtml);

                                var spPrevHtml = String.format("<a href=\"javascript: NewsCommon.GoNewsView('{0}')\" class=\"btn-prev\">prev</a>", newsArticleid);
                                $("#spPrev").html(spPrevHtml);
                            }

                            //다음기사
                            if (newsType == "NEXT_NEWS") {

                                //var nextAreaHtml = String.format("<a href=\"javascript:NewsCommon.GoNewsView('{0}')\">{1}</a><a href=\"javascript:void(0)\" class=\"btn-next\">next</a>", newsArticleid, newsTitle);
                                var nextAreaHtml = String.format("<a href=\"javascript:NewsCommon.GoNewsView('{0}')\">{1}</a><span class=\"btn-next\">next</span>", newsArticleid, newsTitle);
                                $(".next-area").html(nextAreaHtml);

                                var spNextHtml = String.format("<a href=\"javascript: NewsCommon.GoNewsView('{0}')\" class=\"btn-next\">next</a>", newsArticleid);
                                $("#spNext").html(spNextHtml);
                            }
                        }
                    }
                }
            },
            beforeSend: function () {
                //로딩 처리
                //var loadingImg = "<img src='http://img.wowtv.co.kr/PcStyle/images/common/ajax-loader.gif' >"
                //$(".prev-area").html(loadingImg);
                //$("#spPrev").html(loadingImg);
                //$(".next-area").html(loadingImg);
                //$("#spNext").html(loadingImg);
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
    GetLikeit: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divLikeit");

        $.ajax({
            //async: false,
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReadLikeit",
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
            url: serviceUrl + "/NewsCenter/News/SetLikeit",
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
     * @description 당신이 좋아할 만한 기사(포토리스트)
     */
    GetReadPhotoNews: function () {

        var articleId = $("#articleId").val();
        var targetId = $("#divReadPhotoNews");

        $.ajax({
            //async: false,
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReadPhotoNews",
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
     * @description 당신에게 맞는 추천 뉴스
     */
    GetRecomNews: function () {

        /*
        var targetId = $("#divRecomNews");
       
        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadRecomNews",
            success: function (data, textStatus) {
                alert(data);
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                targetId.html("처리 중입니다. 잠시 기다려 주세요.");
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('당신에게 맞는 추천 뉴스 에러..');
            }
        });
        */

        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReadRecomNews",
            success: function (data, textStatus) {
                $("#divRecomNews").html(data);

                // 키워드를 우선 검색
                SearchApi.GetRecommendationKeyWord(7, NewsReadSearchApi.BindRecommendationKeyWordNews);
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
            url: serviceUrl + "/NewsCenter/News/ReadManySeeNews",
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
                /*
                alert(jqXHR.status);
                alert(jqXHR.statusText);
                alert(jqXHR.responseText);
                alert(jqXHR.readyState);

                alert(textStatus);
                alert(errorThrown);
                */
            }
            , timeout: 30000 // sets timeout to 30 seconds
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
            url: serviceUrl + "/NewsCenter/News/ReadBestPhotoNews",
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
                    console.log("베스트 포토 에러..");
                }
            }
        });
    },
    /**
     * @description 관련 뉴스
     */
    GetReadRelationNews: function () {
        var articleId = $('#articleId').val();
        var targetId = $("#ulRelationNews");

        $.ajax({
            type: "POST",
            url: serviceUrl + "/NewsCenter/News/ReadRelationNews",
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

        $("#divContentRight").load(serviceUrl + "/html/ContentRigth.html");;

    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //이전, 다음 기사
    NewsRead.GetNewsPrevNext();

    //페이스북 노출    
    NewsFacebookCount($("#articleId").val(), 'faceBookNum');

    /****** 로그인 버튼 ******/
    //한국 경제 TV
    $(document).on('click', '#btnHankyung', function () {
        //LoginConfirm();
        GoLogin();
    });

    //네이버
    $("#btnNaverLogin").click(function () {
        NewsRead.NaverPopup();
        return false;
    });

    //카카오톡
    $("#btnKakaoLogin").click(function () {
        NewsRead.KakaoPopup();
        return false;
    });

    //페이스북
    $("#btnFacebookLogin").click(function () {
        NewsRead.FacebookPopup();
        return false;
    });

    /**
    * @description 인쇄하기
    */
    $("[name='spanNewsPrint']").click(function () {
        NewsRead.GetPrintPopUp();
    });

    /**
     * @description Text&link And Banner(허브사업영역[뷰페이지 하단])
     */
    NewsRead.GetTextAndLinkBanner();

    /**
     * @description 좋아요.
     */
    NewsRead.GetLikeit();

    /**
     * @description 관련기사
     */
    NewsRead.GetReadRelationNews();

    //오른쪽 부가 컨텐츠 + AD Area
    NewsRead.RightContent();

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

    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
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