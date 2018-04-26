var LifeList = {
    SearchLifeList: function (currentIndex, isAdd) {
        $('#currentIndex').val(currentIndex);

        if (typeof currentIndex != "undefined" && currentIndex > 0) {
            $('#Page').val(parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1);
        }

        if (typeof isAdd != "undefined" && isAdd) {
            $('#IsAppend').val('Y');
        } else {
            $('#IsAppend').val('N');
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/SearchList",
            data: $("#frmSearch").serialize(),
            async: false,
            success: function (data) {

               if (isAdd) {
                    $("#divContents").append(data);
                } else {
                    $("#divContents").html(data);
                }

                var newxtIndex = currentIndex + parseInt($('#PageSize').val())
                if (newxtIndex > parseInt($('#totalDataCount').val())) {
                    $('#currentIndex').val($('#totalDataCount').val());
                }
            },
            //결과 받기전
            beforeSend: function () {

                //로딩 처리
                //$("#divLoading").show();
                //var strLoading = "<ul><li style='background-color:#FFFFFF;text-align:center;vertical-align:middle;padding-top:5px'><img src='/Content/Images/bigWaiting.gif' style='width:30px;height:30px'> <br> 로딩 중입니다...</li></ul>";
                //$("#divContents").append(strLoading);
            },
            //완료
            complete: function () {

            },
            //에러
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("리스트 에러..");
                }
            }
        });
    },
    SearchTravelList: function (currentIndex, isAdd) {

        $('#currentIndex').val(currentIndex);

        if (typeof isAdd != "undefined" && isAdd) {
            $('#IsAppend').val('Y');
        } else {
            $('#IsAppend').val('N');
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/TravelList",
            data: $("#frmSearch").serialize(),
            async: false,
            success: function (data) {
                if (isAdd) {
                    $("#divContents").append(data);
                } else {
                    $("#divContents").html(data);
                }
            }
        });
    },

    //생활.문화 > 탭 클릭
    ListGubun: function (gubun) {

        if (gubun == "" || typeof gubun == "undefined"){
            gubun = "basic"
        }

        $("#SearchTabGubun").val(gubun);
        
        //
        $(".tab-area ul li").each(function (index) {
            //console.log(index + ": " + $(this).text());
            $(this).removeClass('on');;
        });

        $("#" + gubun).addClass('on');
        

        if (gubun == "basic" || gubun == "") {

            $("IsAppend").val("N");
            $("#Page").val("1");
            $("#SearchGubun").val("");

            LifeList.SearchLifeList(0, false);
        }
        else
        {
            $("#IsAppend").val("N");
            $("#Page").val("1");
            $("#SearchGubun").val(gubun);

            LifeList.SearchTravelList(0, false);
        }
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
};

$(document).ready(function () {

    LifeList.ListGubun($("#SearchTabGubun").val());

    $(document).scroll(function () {
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if (maxHeight <= currentScroll + 200) {

            //생활.문화 > 일반
            if ($("#SearchTabGubun").val() == "basic" || $("#SearchTabGubun").val() == "") {

                var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#PageSize').val()) + 1;
                var CurrentPageCnt = parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1;

                if (CurrentPageCnt < totalPageCnt) {
                    var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                    if (nextIndex > $('#totalDataCount').val()) {
                        var minus = nextIndex - $('#totalDataCount').val();
                        nextIndex = nextIndex - minus;
                    }

                    LifeList.SearchLifeList(nextIndex, true);
                }              
            }
            else
            {
                var totalCount = parseInt($('#totalDataCount').val());
                var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                if (totalCount > nextIndex) {

                    LifeList.SearchTravelList(nextIndex, true);
                }
            }

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