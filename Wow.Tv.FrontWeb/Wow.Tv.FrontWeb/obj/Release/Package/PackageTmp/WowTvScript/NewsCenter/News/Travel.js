
var Travel = {

    /**
     * @description 리스트 
     */
    List: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
        else { $("#currentIndex").val(currentIndex); }

        var targetId = $("#divNewsList");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelList",
            data: $("#frmSearch").serialize(),
            //결과 받기전
            beforeSend: function () {

                //로딩 처리
                var strLoading = "<div class=\"article-news-list\"><div class=\"contian-news\" style=\"vertical-align:middle;text-align:center;\"><img src='/Content/Images/bigWaiting.gif' width=\"50px\"><br><br>로딩 중입니다.</div></div>";
                targetId.html(strLoading);
            },
            //성공
            success: function (data, textStatus) {

                targetId.html(data);
                Travel.ListPagingHtml(currentIndex);
            },
            //완료
            complete: function () {

                if ($("#currentIndex").val() == 0) {
                    //오른쪽 부가 컨텐츠 + AD Area
                    Travel.RightContent();
                }
            },
            //에러
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("리스트 에러..");
                }
            }
        });
    },
    /**
     * @description 페이징 HTML
     */
    ListPagingHtml: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "Travel.List"));
        }
    },
    /**
     * @description 부가 컨텐츠 + AD
     */
    RightContent: function () {
        /*
        $.ajax({
            type: "POST",
            url: "/NewsCenter/ContentRigth",
            success: function (data, textStatus) {

                $("#divContentRight").html(data);
            }
        });
        */
        $("#divContentRight").load("/html/ContentRigthList.html");
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

        if ($("#frmSearch").length > 0) {

            $("#frmSearch").attr("method", "post");
            $("#frmSearch").attr("action", sUrl);
            $('#frmSearch').removeAttr('onsubmit')
            $('#frmSearch').submit();
        }
        else {
            location.href = sUrl;
        }
    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //리스트
    Travel.List();

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