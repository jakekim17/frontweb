var NewsCommon = {

    GoNewsPopUpView: function (menuSeq, articleId) {

        articleId = $.trim(articleId);

        var sUrl = String.format("/NewsCenter/News/Read?menuSeq={0}&articleId={1}", menuSeq, articleId);
        var openWin = window.open(sUrl, 'OpenNews');
        openWin.focus();
    },


    /**
     * @description 뉴스 메인으로.. 
     * @return {null}  
     */
    GoNewsMain: function () {

        //뉴스
        var sUrl = String.format("/NewsCenter/Main/Index?menuSeq={0}", MENU_SEQ_DEFINE.NEWS.MAIN);

        location.href = sUrl;
    },
    /**
     * @description 뉴스 상세 페이지 이동(subMenu, wowcode, Class를 지정할수 있는곳)
     * @param {string} subMenu 하위 메뉴 구분
     * @param {string} wowcode 색션구분
     * @param {string} class 기사구분
     * @param {string} articleId 기사ID
     * @return {null}  
     */
    GoNewsDetailView: function (subMenu, wowcode, Class, articleId) {

        articleId = $.trim(articleId);

        var menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;

        //오피니언
        if (subMenu == "opinion") {

            menuSeq = MENU_SEQ_DEFINE.NEWS.OPINION.MAIN;
        }

        //카드뉴스
        if (subMenu == "card") {

            menuSeq = MENU_SEQ_DEFINE.NEWS.CARD;
        }

        //연예.스포츠
        if (subMenu == "entspo") {

            menuSeq = MENU_SEQ_DEFINE.ENTSPO.MAIN;
        }

        if (subMenu == "entstar") {

            menuSeq = MENU_SEQ_DEFINE.ENTSPO.ENTSTAR;
        }
        if (subMenu == "sports") {

            menuSeq = MENU_SEQ_DEFINE.ENTSPO.SPORTS;
        }

        //부동산
        if (subMenu == "land") {

            menuSeq = MENU_SEQ_DEFINE.LAND.MAIN;

            if (wowcode == "W010") {
                menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;
            }
            else if (wowcode == "W065") {
                menuSeq = MENU_SEQ_DEFINE.LAND.LOCALSELF;
            }
            //분양 클로즈업
            else if (wowcode == "W025") {
                menuSeq = MENU_SEQ_DEFINE.LAND.CLOSEUP;
            }
            //부동산 투자의 맥
            else if (wowcode == "W066") {
                menuSeq = MENU_SEQ_DEFINE.LAND.INVESTMENT;
            }
            //부동산 컨설팅
            else if (wowcode == "W066") {
                menuSeq = MENU_SEQ_DEFINE.LAND.CONSULTING;
            }
        }

        //포토.영상
        if (subMenu == "photo") {

            menuSeq = MENU_SEQ_DEFINE.PHOTO.PHOTO;
        }
        if (subMenu == "vod") {

            menuSeq = MENU_SEQ_DEFINE.PHOTO.VOD;
        }

        //티비텐플러스
        if (subMenu == "tvtenplus") {

            menuSeq = MENU_SEQ_DEFINE.TVTENPLUS.MAIN;
        }


        if (subMenu == null || subMenu == 0) subMenu = "latest";
        if (wowcode == null || wowcode == 0) wowcode = "";
        if (Class == null || Class == 0) Class = "";

        var sUrl = String.format("/NewsCenter/News/Read?menuSeq={0}&subMenu={1}&wowcode={2}&Class={3}&articleId={4}", menuSeq, subMenu, wowcode, Class, articleId);

        location.href = sUrl;
    },

    /**
     * @description 뉴스 상세 페이지 이동(기사 아이디만.. 최신 아이디로 설정[리스트가 아닌 대부분의 페이지에서 링크])
     * @param {string} articleId 기사ID
     * @return {null}  
     */
    GoNewsRead: function (articleId) {

        articleId = $.trim(articleId);

        var menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;
        var subMenu = $.urlParam('subMenu');
        var wowcode = $.urlParam('wowcode');
        var Class = $.urlParam('Class');

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.LETEST;
        if (subMenu == null || subMenu == 0) subMenu = "latest";
        if (wowcode == null || wowcode == 0) wowcode = "";
        if (Class == null || Class == 0) Class = "";

        var sUrl = String.format("/NewsCenter/News/Read?menuSeq={0}&subMenu={1}&wowcode={2}&Class={3}&articleId={4}", menuSeq, subMenu, wowcode, Class, articleId);

        location.href = sUrl;
    },

    /**
     * @description 뉴스 본문으로 이동 (뉴스 목록 리스트에서 & 상세 페이지 이전기사, 다음기사..)
     * @param {string} articleId 기사ID
     * @return {null}  
     */
    GoNewsView: function (articleId) {

        //alert("뉴스 본문 이동/ " + articleId);
        articleId = $.trim(articleId);

        var menuSeq = $.urlParam('menuSeq');
        var subMenu = $.urlParam('subMenu');
        var wowcode = $.urlParam('wowcode');
        var Class = $.urlParam('Class');

        if (menuSeq == null || menuSeq == 0) menuSeq = MENU_SEQ_DEFINE.NEWS.MAIN;
        if (subMenu == null || subMenu == 0) subMenu = "";
        if (wowcode == null || wowcode == 0) wowcode = "";
        if (Class == null || Class == 0) Class = "";

        //console.log(subMenu); 
        //console.log(wowcode); 
        //console.log(Class); 

        var sUrl = String.format("/NewsCenter/News/Read?menuSeq={0}&subMenu={1}&wowcode={2}&Class={3}&articleId={4}", menuSeq, subMenu, wowcode, Class, articleId);

        if ($("#frmSearch").length > 0) {

            $("#frmSearch").attr("method", "post");
            $("#frmSearch").attr("action", sUrl);
            $('#frmSearch').removeAttr('onsubmit')
            $('#frmSearch').submit();
        }
        else {
            location.href = sUrl;
        }
    },

    /**
     * @description 뉴스(증권) > 증권 리스트..
     * @return {null}  
     */
    GoNewsStockList: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.STOCK;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=stock", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 뉴스(경제) > 경제 리스트..
     * @return {null}  
     */
    GoNewsEconomyList: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.ECONOMY;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=economy", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 뉴스(산업 · IT 과학) > 산업 리스트..
     * @return {null}  
     */
    GoNewsIndustryList: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.INIT;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=industry", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 뉴스(생활문화) 리스트..
     * @return {null}  
     */
    GoNewsLifeList: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.LIFE;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=life", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 뉴스(취업) 리스트..
     * @return {null}  
     */
    GoNewsJobList: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.JOB;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=job", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 포토.영상 > 포토 리스트..
     * @return {null}  
     */
    GoPhotoList: function () {

        var menuSeq = MENU_SEQ_DEFINE.PHOTO.PHOTO;
        var sUrl = String.format("/NewsCenter/Photo/PhotoList?menuSeq={0}&subMenu=photo", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 카드뉴스 리스트로..
     * @return {null}  
     */
    GoCardNewsHome: function () {

        var menuSeq = MENU_SEQ_DEFINE.NEWS.CARD;
        var sUrl = String.format("/NewsCenter/News/Index?menuSeq={0}&subMenu=card", menuSeq);
        location.href = sUrl;
    },

    /**
     * @description 많이본 뉴스 페이스북 게시글
     * @return {html}
     */
    ManySeeNewsFaceBookPosts: function () {
        var limitNum = 15;
        var fields = "message,permalink_url,created_time,picture";
        var sUrl = String.format("https://graph.facebook.com/v2.10/153856151378770?fields=posts.limit({0}){{1}}&access_token={2}", limitNum, fields, FacebookUserToken);
        $.ajax({
            type: "GET",
            url: sUrl,
            //async: false,
            success: function (data) {

                var faceBookPosts = data.posts.data;

                var createdTime = "";
                var picture = "";
                var message = "";
                var linkUrl = "";
                var txtPosts = "";
                var j = 1;

                for (i = 0; i < faceBookPosts.length; i++) {

                    createdTime = faceBookPosts[i]["created_time"];
                    picture = faceBookPosts[i]["picture"];
                    message = faceBookPosts[i]["message"];
                    linkUrl = faceBookPosts[i]["permalink_url"];

                    if (typeof (message) != "undefined" && typeof (linkUrl) != "undefined" && j <= 12) {
                        if (message.length > 45) {
                            message = message.substring(0, 45) + "...";
                        }

                        var faceBookPostTime = jQuery.timeago(createdTime);
                        //liPosts += String.format("<li>NO :{0} / createdTime :{1} / picture :{2} / message :{3} / linkUrl :{4}</li>", j, createdTime, picture, message, linkUrl);
                        var txtPost = "";
                        if (j < 6) {
                            if (typeof (picture) != "undefined" && picture.length > 0) {

                                txtPost += String.format("<a href=\"{0}\" class=\"manyFacebookArt\"  target=\"_blank\"><div class=\"img-area\"><img src=\"{1}\"></div><p class=\"txt\">{2}</p></a>", linkUrl, picture, message);
                            }
                            else {
                                txtPost += String.format("<a href=\"{0}\" class=\"manyFacebookArt\"  target=\"_blank\"><div class=\"img-area\"></div><p class=\"txt\">{2}</p></a>", linkUrl, message);
                            }
                        } else {
                            if (typeof (picture) != "undefined" && picture.length > 0) {

                                txtPosts += String.format("<a href=\"{0}\" class=\"manyFacebookArt\"  target=\"_blank\" style=\"display:none;\"><div class=\"img-area\"><img src=\"{1}\"></div><p class=\"txt\">{2}</p></a>", linkUrl, picture, message);
                            }
                            else {
                                txtPosts += String.format("<a href=\"{0}\" class=\"manyFacebookArt\"  target=\"_blank\" style=\"display:none;\"><div class=\"img-area\"></div><p class=\"txt\">{2}</p></a>", linkUrl, message);
                            }
                        }
                        txtPosts += txtPost;
                        j++;
                    }
                }
                $("#divFaceBookPosts").html(txtPosts);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                var responseText = jQuery.parseJSON(jqXHR.responseText);
                if (typeof (responseText) != "undefined" && typeof (responseText.error.message) != "undefined") {
                    console.log(responseText.error.message);
                    $("#divFaceBookPosts").html("<div>" + responseText.error.message + "</div>");
                }
            }
        });
    },
    /**
    * @description 파트너 카페
    */
    GoCafe: function (nickName) {
        var NickValue = $.trim(nickName);
        var CafeLinkUrl = "";

        switch (NickValue) {
            case "십이지신神":
                CafeLinkUrl = "http://cafe.wownet.co.kr/howto/sub_main.asp?bcode=N53000000&amp;mseq=1093";
                break;
            case "홀짝박사神":
                CafeLinkUrl = "http://cafe.wownet.co.kr/howto/sub_main.asp?bcode=N53000000&amp;mseq=1093";
                break;
            case "愚公김보형":
                CafeLinkUrl = "http://cafe.wownet.co.kr/howto/sub_main.asp?bcode=N53000000&amp;mseq=1093";
                break;
            case "이득재실장":
                CafeLinkUrl = "http://cafe.wownet.co.kr/Research";
                break;
            case "선물채팅방":
                CafeLinkUrl = "javascript:alert('개설된 카페가 없습니다.');"
                break;
            case "330시스템":
                CafeLinkUrl = "http://cafe.wownet.co.kr/Fire";
                break;
            case "서브라더스":
                CafeLinkUrl = "http://cafe.wownet.co.kr/seobrothers";
                break;
            case "백만개미":
                CafeLinkUrl = "http://www.wow100.co.kr";
                break;
            case "세시봉":
                CafeLinkUrl = "http://www.wownet.co.kr/";
                break;
            case "선물김광석":
                CafeLinkUrl = "http://cafe.wownet.co.kr/gold_key";
                break;
            case "양봉파이터스":
                CafeLinkUrl = "http://www.wownet.co.kr/eventhome/event_main.asp?bcode=&mseq=&strpkid=22";
                break;
            case "대박천국15":
                CafeLinkUrl = "http://www.wownet.co.kr/eventhome/daebak24hours/daebak24hours.asp";
                break;
            case "출동반류태형":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1st119";
                break;
            case "출동류태형":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1st119";
                break;
            case "출동김우신":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1st119";
                break;
            case "출동장태웅":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1st119";
                break;
            case "출동이경락":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1st119";
                break;
            case "전투단곽지문":
                CafeLinkUrl = "http://cafe.wownet.co.kr/cecibong1";
                break;
            case "인천여우":
                CafeLinkUrl = "http://cafe.wownet.co.kr/1stfox";
                break;
            case "명성욱대표":
                CafeLinkUrl = "http://cafe.wownet.co.kr/cecibong1";
                break;
            case "대박팀박영호":
                CafeLinkUrl = "http://cafe.wownet.co.kr/dreamteam";
                break;
            case "대박팀한옥석":
                CafeLinkUrl = "http://cafe.wownet.co.kr/dreamteam";
                break;
            default:
                CafeLinkUrl = "http://cafe.wownet.co.kr/common/profileLink.asp?nickname=" + NickValue + "&amp;link=cafe";
                break;
        }
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = CafeLinkUrl;
    }
};


function NewsFacebookShare(articleId) {

    var sUrl = String.format("{0}//{1}/NewsCenter/News/Read?articleId={2}", $(location).attr('protocol'), $(location).attr('host'), articleId);
    //sUrl = encodeURIComponent(sUrl);
    //var shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + sUrl;
    //var openWin = window.open(shareURL, 'FacebookShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=500,left=0,top=0');
    //openWin.focus();
    
    FB.ui(
        {
            method: 'share',
            href: sUrl,
        },
        // CallBack
        function (response) {
            if (response && !response.error_message) {
                //alert('Posting completed.');
            } else {
                //alert('Error while posting.');
            }
        }
    );
    
}

function NewsFacebookCount(articleId, elementId) {

    var sUrl = String.format("{0}//{1}/NewsCenter/News/Read?articleId={2}", $(location).attr('protocol'), $(location).attr('host'), articleId);
    //var sUrl = "https://www.example.com";
    //var sUrl = "http://www.wowtv.co.kr/newscenter/news/view.asp?artid=A201711270193";
    //sUrl = encodeURIComponent(sUrl);
    //alert(sUrl);
    //alert(articleId);
    //lert(elementId);

    FacebookCount(sUrl, elementId);
}

//본문내 이미지가 있을경우 이미지사이즈 조절하는 부분
function imgMobilecheck(imgObj, bool) {

    var imgWidth = '100%'; //설정 이미지 넓이 값

    //이미지가 로딩이 다 된경우
    if (bool) {

        //처리
        imgObj.width = imgWidth;
        imgObj.style.width = imgWidth;
        imgObj.alt = '';
    }
    //이미지 로딩오류
    else {
        //안보이게 스타일시트처리
        imgObj.style.display = 'none';
    }
}

// 글자 확대
function ExpandFont(elementId) {
    var maxNum = 24; // 폰트 사이즈 
    var nimNum = 14; // 폰트 사이즈

    currentFontSize = parseInt($("#" + elementId).css("font-size"));

    if (currentFontSize < maxNum) {
        $("#" + elementId).css({ "font-size": (currentFontSize + 2) + "px" });
    }
}

// 글자 축소
function ReduceFont(elementId) {
    var maxNum = 24; // 폰트 사이즈 
    var nimNum = 14; // 폰트 사이즈

    currentFontSize = parseInt($("#" + elementId).css("font-size"));

    if (currentFontSize > nimNum) {

        $("#" + elementId).css({ "font-size": (currentFontSize - 2) + "px" });
    }
}

function getQuerystring(paramName) {
    var searchUrl = window.location.search.substring(1);
    var splitArray = searchUrl.split('&');
    if (splitArray.length > 1) {
        for (var i = 0; i < splitArray.length; i++) {
            var keyValue = splitArray[i].split('=');
            if (keyValue[0] == paramName) {
                return keyValue[1];
            }
        }
    }
}