
var NewsSearchList = {

    /**
     * @description 뉴스 리스트 
     */
    NewsList: function (currentIndex) {

        if (typeof currentIndex == "undefined") {
            currentIndex = $("#currentIndex").val();
        }
        else {
            $("#currentIndex").val(currentIndex);
        }
         
        var startIndex = currentIndex;
        var endIndex = parseInt(currentIndex) + (parseInt($("#PageSize").val()) - 1);
        var searchSection = $("#SearchSection").val();
        var searchComp = $("#SearchComp").val();
        var searchStartDate = $("#StartDate").val();
        var searchEndDate = $("#EndDate").val();
        var searchEndDate = $("#EndDate").val();
        var searchWowCode = $("#SearchWowCode").val();
       
        //검색 기간
        if (searchStartDate == "") {
            searchStartDate = SetAddYear(new Date().format("yyyy-MM-dd"), -1).replace(/-/g, '');
            searchEndDate = SetAddDay(new Date().format("yyyy-MM-dd"), 1).replace(/-/g, '');
        }
        else {
            searchEndDate = searchStartDate.replace(/-/g, '') + "235959";
            searchStartDate = searchStartDate.replace(/-/g, '') + "000000";
        }
        
        /* 최신뉴스(연예 코드 제외 / 신규 WOWCODE 추가 시 관리 필요) */ 
        var queryWowcode = "'W001'; 'W004'; 'W005'; 'W007'; 'W008'; 'W009'; 'W010'; 'W012'; 'W015'; 'W019'; 'W024'; 'W025'; 'W026'; 'W027'; 'W033'; 'W034'; 'W035'; 'W036'; 'W040'; 'W050'; 'W051'; 'W052'; 'W053'; 'W054'; 'W060'; 'W061'; 'W064'; 'W065'; 'W066'; 'W067'; 'W070'; 'W071' ";

        //와우코드 있을경우
        if (searchWowCode.length > 0) {
 
            queryWowcode = String.format("'{0}'", searchWowCode);
        }
        //증권
        else if (searchSection == "stock") {
            queryWowcode = "'W034'; 'W035'; 'W035'; 'W001'; 'W070' ";
        }
        //가상화폐
        else if (searchSection == "virtualcurrency") {
            queryWowcode = "'W071'";
        }
        //경제
        else if (searchSection == "economy") {
            queryWowcode = "'W005'";
        }
        //산업.IT
        else if (searchSection == "init") {
            queryWowcode = "'W004'; 'W007'";
        }
        //정치.사회.국제
        else if (searchSection == "politics") {
            queryWowcode = "'W008'; 'W033'; 'W019'";
        }
        //생활문화
        else if (searchSection == "life") {
            queryWowcode = "'W005'; 'W009'; 'W036'; 'W015'";
        }
        //취업
        else if (searchSection == "job") {
            queryWowcode = "'W050'; 'W051'; 'W052'; 'W053'; 'W054'";
        }
        //연예.스타
        else if (searchSection == "entstar") {
            queryWowcode = "'W014'; 'W016'; 'W021'; 'W022'; 'W023'; 'W014'; 'W028'; 'W029'; 'W030'; 'W031'";
        }
        //스포츠
        else if (searchSection == "sports") {
            queryWowcode = "'W013'";
        }
        //VOD
        //else if (searchSection == "vod") {
        //    queryWowcode = "''";
        //}

        var subMenuHan = "뉴스";

        if (searchSection == "entstar" || searchSection == "sports") {
            subMenuHan = "연예·스타";
        }
        else if (searchSection == "vod") {
            subMenuHan = "포토·영상";
        }
        else if (searchSection == "tvtenplus") {
            subMenuHan = "티비텐플러스";
        }
         
        var queryString = '{ ';
        queryString += ' "querySet" : { ';
        queryString += '    "version" : 42, ';
        queryString += '    "query" : [{ ';
        queryString += '      "selectSet": '; 
        queryString += '       {';
        queryString += '        "fields": ';
        queryString += '         ["ARTID(NONE)","TITLE(NONE)","ARTDATE(NONE)","CONTENT(HIGHLIGHT;SUMMARIZE|300)","VOD_NUM(NONE)", "THUMBNAIL_FILENM(NONE)", "IMGDIR(NONE)", "THUMBNAIL_TYPE1(NONE)","COMPCODE(NONE)","SECTION_NAME(NONE)","COMP_NAME(NONE)","TAG(NONE)","KEYWORDS(NONE)"] ';
        queryString += '       }, ';
        queryString += '      "whereSet": ';
        queryString += '       { ';
        queryString += '        "fields": ';
        queryString += '           ["BRACE_OPEN", ';
        if (searchComp == "WO") {
            queryString += '           "COMPCODE(HASALL|\'WO\')", AND , ';
        }
        queryString += '               "WOWCODE(HASANY| ' + queryWowcode + ')", ';
        queryString += '           "BRACE_CLOSE"] ';
        queryString += '        }, ';
        queryString += '      "filterSet": ';
        queryString += '       { ';
        queryString += '          "fields": [ ';
        if (searchSection == "vod") {
            queryString += '           "VOD_NUM(RANGE|\'1\';\'99999999\')", ';
        }
        queryString += '                "ARTDATE(RANGE|\'' + searchStartDate.replace(/-/g, '') + '\';\'' + searchEndDate.replace(/-/g, '') + '\')" ';
        queryString += '           ] ';
        queryString += '       }, ';
        queryString += '      "orderBySet": ';
        queryString += '       { ';
        queryString += '          "fields": ["ARTDATE(ASC|POSTWEIGHT)"]';
        queryString += '       }, ';
        queryString += '       "fromSet": { "collection": "WOWNEWS_2017", "result": [' + startIndex + ', ' + endIndex + '] }';
        queryString += '      ,"useCache":true ';
        queryString += '      ,"debugOption":{ "printQuery":false, "debug":false, "faultless":false } ';
        queryString += '    }] ';
        queryString += ' } ';
        queryString += '} ';

        console.log(queryString);
        var targetId = $("#divNewsList");

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SITE_DOMAIN.SEARCH + "/collections/search",
            data: queryString,
            //결과 받기전
            beforeSend: function () {

                //로딩 처리
                var strLoading = "<div class=\"article-news-list\"><div class=\"contian-news\" style=\"vertical-align:middle;text-align:center;\"><img src='/Content/Images/bigWaiting.gif' width=\"50px\"><br><br>로딩 중입니다.</div></div>";
                targetId.html(strLoading);
            },
            //성공
            success: function (data, textStatus) {

                //targetId.html(data);
                var newsListHtml = '';
                var totalSize = data.resultSet.result[0].totalSize;
                $("#totalDataCount").val(totalSize)

                if (data.resultSet.result[0].resultDocuments.length > 0) {

                    var newsListItem = data.resultSet.result[0].resultDocuments;

                    $.each(newsListItem, function (index, item) {

                        var hashTag = item.TAG;
                        if (hashTag == '') {
                            hashTag = item.KEYWORDS;
                        }

                        var artdate = item.ARTDATE;
                        artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);

                        newsListHtml += '<div class="article-news-list">';
                        newsListHtml += '    <div class="contian-news photo-right">';

                        if ($.trim(item.THUMBNAIL_TYPE1).length > 0 || ($.trim(item.THUMBNAIL_FILENM).length > 0 && $.trim(item.IMGDIR).length > 0) ) {

                            var thumbnailUrl = GetNewsThumbnail('11S', item.THUMBNAIL_FILENM, item.VOD_NUM, item.IMGDIR, item.THUMBNAIL_TYPE1, artdate);

                            newsListHtml += '    <div class="photo-news">';
                            newsListHtml += '    <img src="' + thumbnailUrl + '" onerror="this.src=\'http://img.wowtv.co.kr/PcStyle/images/common/no_image_11s.jpg\'" alt="">';

                            if (parseInt(item.VOD_NUM) > 0) {
                                newsListHtml += '      <span class="icon-play medium"></span>';
                            }
                            newsListHtml += '    </div>';
                        }

                        newsListHtml += '        <a href="javascript:NewsCommon.GoNewsView(\'' + item.ARTID + '\')">';
                        newsListHtml += '            <p class="title-text">' + item.TITLE + '<span class="date">' + artdate + '</span></p>';
                        newsListHtml += '            <p class="main-text">' + item.CONTENT + '</p>';
                        newsListHtml += '        </a>';
                        newsListHtml += '        <div class="footer-text">';
                        newsListHtml += '            <p class="category-text">';
                        newsListHtml += subMenuHan + ' &gt; ' + item.SECTION_NAME;
                        newsListHtml += '            </p>';
                        newsListHtml += '            <span class="division-bar"></span>';
                        newsListHtml += '            <p class="reporter">';
                        newsListHtml += item.COMP_NAME;
                        newsListHtml += '            </p>';

                        if (hashTag.length > 0) {
                            newsListHtml += '                <span class="division-bar"></span>';
                            newsListHtml += '                <div class="tags">';

                            var hashTagList = hashTag.split(",");

                            for (var j = 0; j < (hashTagList.length > 3 ? 3 : hashTagList.length); j++) {
                                newsListHtml += '           <a href=\"javascript:HashTagLink(\'' + hashTagList[j] + '\');\" class="hash-tag02">' + hashTagList[j] + '</a>';
                            }
                            newsListHtml += '                </div>';
                        }
                        newsListHtml += '        </div>';
                        newsListHtml += '    </div>';
                        newsListHtml += '</div>';

                    });
                   
                }
                else if (totalSize == "0") {
                    newsListHtml = '<div class="article-news-list"><div class="contian-news"><div class="contian-news" style="vertical-align:middle;text-align:center;">검색결과가 없습니다.</div></div></div>';
                }
                targetId.html(newsListHtml);

                NewsSearchList.NewsListPagingHtml(currentIndex);
            },
            //완료
            complete: function () {


            },
            //에러
            error: function (jqXHR, textStatus, errorThrown) {

                newsListHtml = '<div class="article-news-list"><div class="contian-news"><div class="contian-news" style="vertical-align:middle;text-align:center;">결과가 없습니다.</div></div></div>';

                targetId.html(newsListHtml);
                 
                if (console && console.log) {
                    console.log("리스트 에러.."); 
                }
            }
        });
    },

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

            ulHtml += String.format('<li {0} ><a href="javascript:NewsSearchList.NewsSelDate(\'{1}\', {2})" name="aNewsSelDate">{3}</a></li>', classToday, addDate, i, new Date(addDate).format("MM-dd"));
        }

        $("#ulDate").html(ulHtml);
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
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "NewsSearchList.NewsList"));
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
            //data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {

                $("#divContentRight").html(data);
            }
        });
        */
        $("#divContentRight").load("/html/ContentRigthList.html");
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
    NewsSearchList.NewsList();

    //오른쪽 부가 컨텐츠 + AD Area
    NewsSearchList.RightContent();

    //뉴스 일자 > 다음주
    $("#btnNext").click(function () {

        var basicDate = $("#hdBasicDate").val();
        var today = $("#hdToday").val();

        if (today == basicDate) {
            //alert(0);
            return false;
        }
        else {
            //시작일 변경
            $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), 7));

            NewsSearchList.NewsWeekDate();
        }
    });

    //뉴스 일자 > 이전주
    $("#btnPrev").click(function () {

        //시작일 변경
        $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), -7));

        NewsSearchList.NewsWeekDate();
    });

    //한국경제 기사만 ON
    $("#btnWowNewsOn").click(function () {

        $("#SearchComp").val("WO");

        $("#btnWowNewsOn").parent().addClass("on");
        $("#btnWowNewsOff").parent().removeClass("on");
        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");
        NewsSearchList.NewsList()
    });

    //한국경제 기사만 OFF
    $("#btnWowNewsOff").click(function () {
        $("#SearchComp").val("");

        $("#btnWowNewsOn").parent().removeClass("on");
        $("#btnWowNewsOff").parent().addClass("on");

        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");

        NewsSearchList.NewsList()
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
