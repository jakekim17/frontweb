var CharacterStock = {
    NewsSelDate: function (selDate) {

        $("#StartDate").val(selDate);
        $("#EndDate").val(SetAddDay(selDate, 1));

        CharacterStock.NewsList();

    },
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

            ulHtml += String.format('<li {0} ><a href="javascript:CharacterStock.NewsSelDate(\'{1}\')">{2}</a></li>', classToday, addDate, new Date(addDate).format("MM-dd"));
        }

        $("#ulDate").html(ulHtml);
    },
    NewsList: function (currentIndex) {
        var menuSeq = $("#menuSeq").val();
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
            url: "/Finance/CharacterStock/List?menuSeq=" + menuSeq,
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {

                targetId.html(data);

                CharacterStock.NewsListPagingHtml(currentIndex);
            },
            //결과 받기전
            beforeSend: function () {

                //로딩 처리
                var strLoading = "<div class=\"article-news-list\"><div class=\"contian-news\" style=\"vertical-align:middle;text-align:center;\"><img src='/Content/Images/bigWaiting.gif' width=\"50px\"><br><br>로딩 중입니다.</div></div>";
                targetId.html(strLoading);
            },
            //완료
            complete: function () {

            },
            //에러
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("특징주 리스트 에러..");
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
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "CharacterStock.NewsList"));
        }
    },
    GoDetail: function (articleId) {

        var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;
        var sUrl = String.format("/Finance/CharacterStock/Detail?menuSeq={0}&articleId={1}", menuSeq, articleId);

        $("#articleId").val(articleId);
        $("#articleForm").attr("method", "POST");
        $("#articleForm").attr("action", sUrl);
        $("#articleForm").submit();
    }
}

$(document).ready(function () {

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

            CharacterStock.NewsWeekDate();
        }
    });

    //뉴스 일자 > 이전주
    $("#btnPrev").click(function () {

        //시작일 변경
        $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), -7));

        CharacterStock.NewsWeekDate();
    });

    //뉴스 리스트
    CharacterStock.NewsList();

    //오른쪽 부가 컨텐츠 + AD Area
    //DetailList.RightContent();

});