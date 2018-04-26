

var NewsIndex = {

    NewsSelDate: function (selDate, index) {

        console.log(index);

        $('.calendar-news-week ul li a').removeClass('on');
        $("[name='aNewsSelDate']").each(function (index) {

            //console.log(selDate.substring(5, 10));
            //console.log($(this).text());

            if (selDate.substring(5, 10) == $(this).text()) {
                $(this).addClass('on');
            }
        });

        $("#selDateIndex").val(index);
        $("#StartDate").val(selDate);
        $("#EndDate").val(SetAddDay(selDate, 1));
        $("#btnWowNewsOff").click();
    },
    //상단 뉴스 일자 표기
    NewsWeekDate: function () {

        var today = $("#hdToday").val();
        var basicDate = $("#hdBasicDate").val();

        var ulHtml = "";

        for (i = 0; i >= -6; i--) {
            var classToday = "";
            var addDate = SetAddDay(basicDate, i);
            
            if (today == addDate) {

                classToday = "class='today'";
            }

            ulHtml += String.format('<li {0} ><a href="javascript:NewsIndex.NewsSelDate(\'{1}\', {2})" name="aNewsSelDate">{3}</a></li>', classToday, addDate, i, new Date(addDate).format("MM-dd"));
        }

        $("#ulDate").html(ulHtml);
    },
    /**
     * @description 뉴스 리스트 
     */
    NewsList: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
        else { $("#currentIndex").val(currentIndex); }

        currentIndex = parseInt(currentIndex)
        var pageSize = parseInt($("#PageSize").val());
        var currentPageNo = Math.floor(currentIndex / pageSize);

        if (currentPageNo == 0) {
            currentPageNo = 1;
        } else {
            currentPageNo++;
        }

        $("#Page").val(currentPageNo);

        var targetId = $("#divNewsList");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/List",
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
                NewsIndex.NewsListPagingHtml(currentIndex);
            },
            //완료
            complete: function () {
                
                if (currentPageNo == 1) {
                    //오른쪽 부가 컨텐츠 + AD Area
                    NewsIndex.RightContent();
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
    NewsListPagingHtml: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "NewsIndex.NewsList"));
        }
    },
    /**
     * @description 부가 컨텐츠 + AD
     */
    RightContent: function () {

        $.ajax({
            type: "POST",
            url: "/NewsCenter/ContentRigth",
            //data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {

                $("#divContentRight").html(data);
            }
        });
    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //기사 상세 페이지서 목록으로 올때.등.한국경제 기사만.. 제어
    if ($("#SearchComp").val() == "WO") {

        $("#btnWowNewsOn").parent().addClass("on");
        $("#btnWowNewsOff").parent().removeClass("on");
    }
    else {
        $("#btnWowNewsOn").parent().removeClass("on");
        $("#btnWowNewsOff").parent().addClass("on");
    }

    //뉴스 리스트
    NewsIndex.NewsList();

    //오른쪽 부가 컨텐츠 + AD Area
    //NewsIndex.RightContent();

    //뉴스 일자 > 다음주
    $("#btnNext").click(function () {

        var basicDate = $("#hdBasicDate").val();
        var today = $("#hdToday").val();

        if (today == basicDate) {
            //alert(0);
            return false;
        }
        else
        {
            //시작일 변경
            $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), 7));

            NewsIndex.NewsWeekDate();
        }
    });

    //뉴스 일자 > 이전주
    $("#btnPrev").click(function () {

        //시작일 변경
        $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), -7));
        
        NewsIndex.NewsWeekDate();
    });

    //한국경제 기사만 ON
    $("#btnWowNewsOn").click(function () {

        $("#SearchComp").val("WO");

        $("#btnWowNewsOn").parent().addClass("on");
        $("#btnWowNewsOff").parent().removeClass("on");
        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");
        NewsIndex.NewsList()
    });

    //한국경제 기사만 OFF
    $("#btnWowNewsOff").click(function () {
        $("#SearchComp").val("");

        $("#btnWowNewsOn").parent().removeClass("on");
        $("#btnWowNewsOff").parent().addClass("on");

        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");

        NewsIndex.NewsList()
    });

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
