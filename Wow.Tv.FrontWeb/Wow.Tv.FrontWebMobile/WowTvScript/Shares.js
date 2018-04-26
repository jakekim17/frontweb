
/*********************************************************************************************************************
 * Share(공유하기)
 * 네이버           :https://developers.naver.com/docs/share/navershare/
 * 카카오 스토리    : https://developers.kakao.com/docs/js/kakaostory-share
 * 카카오스토리(웹) : https://developers.kakao.com/docs/js/demos/story-create-share-button
 * 트위터          : https://dev.twitter.com/web/tweet-button
 * 페이스북        : https://developers.facebook.com/docs/plugins/share-button
 *********************************************************************************************************************/
var baseUrl = "";

var Share = {
    Naver: function (sUrl, sTitle) {
        sUrl = baseUrl + sUrl
        sUrl = encodeURI(encodeURIComponent(sUrl));
        sTitle = encodeURI(sTitle);
        var shareURL = "http://share.naver.com/web/shareView.nhn?url=" + sUrl + "&title=" + sTitle;
        var openWin = window.open(shareURL, 'NaverShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700,left=0,top=0');
        openWin.focus();
    },
    kakaostory: function (sUrl, sTitle) {
        sUrl = baseUrl + sUrl
        sTitle = sTitle;

        window.kakaoAsyncInit = function () {
            Kakao.init('11c287f51dba1e01c2977a8b4e395f7e');
        };
        Kakao.Story.share({
            url: sUrl,
            text: sTitle
        });
    },
    Twitter: function (sUrl, sTitle) {
        sUrl = baseUrl + sUrl
        sUrl = encodeURIComponent(sUrl);
        sTitle = encodeURIComponent(sTitle);

        var shareURL = "https://twitter.com/intent/tweet?text=" + sTitle + "&url=" + sUrl;
        var openWin = window.open(shareURL, 'TwitterShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=470,width=500,left=0,top=0');
        openWin.focus();
    },
    Facebook: function (sUrl, sImg) {
        $('meta#metaImg').attr('content', sImg);
        sUrl = baseUrl + sUrl;
        sUrl = encodeURIComponent(sUrl);
        var shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + sUrl;
        var openWin = window.open(shareURL, 'FacebookShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=500,left=0,top=0');
        openWin.focus();
    },
    Line: function (sUrl, sTitle) {
        var shareURL = "http://line.me/R/msg/text/?" + encodeURIComponent(sTitle + '\n' + sUrl);
       
        var openWin = window.open(shareURL, 'LineShareWin', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=470,width=500,left=0,top=0');
    },
    KakaoTalk: function (sUrl, sTitle) {
        Kakao.cleanup()
        Kakao.init('11c287f51dba1e01c2977a8b4e395f7e');

        var shareImg = $("meta[property='og:image']").attr('content');

        if (typeof shareImg != "undefined" && shareImg != "") {
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: sTitle,
                    imageUrl: shareImg,
                    link: {
                        mobileWebUrl: sUrl,
                        webUrl: sUrl
                    }
                }
            });
        } else {
            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: sTitle,
                    imageUrl: 'http://img.wowtv.co.kr/MobileStyle/images/common/no_image_11m.jpg', //기본이미지
                    link: {
                        mobileWebUrl: sUrl,
                        webUrl: sUrl
                    }
                }
            });
        }
    }
}


