
var DetailList = {

    NewsSelDate: function (selDate) {

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

            ulHtml += String.format('<li {0} ><a href="javascript:NewsIndex.NewsSelDate(\'{1}\')">{2}</a></li>', classToday, addDate, new Date(addDate).format("MM-dd"));
        }

        $("#ulDate").html(ulHtml);
    },
    /**
     * @description 뉴스 리스트 
     */
    NewsList: function (currentIndex, text) {

        if (text == "" || typeof text == "undefined") {
            var textVal = $("#selector01 option:selected").val().split("_");
            text = textVal[1];
        }

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

        var data = $('#frmSearch').serializeArray();
        data.push({ name: 'text', value: text });

        var targetId = $("#divNewsList");

        $.ajax({
            type: "POST",
            url: "/Opinion/SerialColumn/DetailListData",
            data: data,
            success: function (data, textStatus) {

                targetId.html(data);

                DetailList.NewsListPagingHtml(currentIndex);
            },
            //데이터 받기전
            beforeSend: function () {

                //로딩 처리
                var strLoading = "<div class=\"article-news-list\"><div class=\"contian-news\" style=\"vertical-align:middle;text-align:center;\"><img src='/Content/Images/bigWaiting.gif' width=\"50px\"><br><br>로딩 중입니다.</div></div>";
                targetId.html(strLoading);
            },
            //완료
            complete: function () {

                if (currentPageNo == 1) {
                    //오른쪽 부가 컨텐츠 + AD Area
                    NewsCommon.RightContent();
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
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "DetailList.NewsList"));
        }
    },

    BannerImg: function (seq) {
        var params = {};
        params.Seq = seq;
        params.Class = classId;
        $.ajax({
            type: "POST",
            url: "/Opinion/SerialColumn/ColumnListBannerImg",
            data: params,
            success: function (data) {
                if (data == null || data.data == null) {

                }
                else {

                    var opinionUploadPath = $("#opinionUploadPath").val();
                    var uploadWebPathRoot = $("#uploadWebPathRoot").val();
                    var imgUrl = String.format("<img src='{0}{1}' alt='Opinion Photo' onerror=\"this.src ='{2}/PcStyle/images/common/no_image_870.jpg'\">", opinionUploadPath, data.data.IMG_BANN, uploadWebPathRoot);

                    $(".obj-view").html(imgUrl);

                    //if (data.data.CLASS == "S") {
                    //    $(".obj-view").html('<img src="http://image.wownet.co.kr/static/image/main/' + data.data.IMG_BANN + '" alt="" style="width:868px;height:92px;">');
                    //} else if (data.data.CLASS == "P") {
                    //    $(".obj-view").html('<img src="http://image.wownet.co.kr/static/image/news/' + data.data.IMG_BANN + '" alt="" style="width:868px;height:92px;">');
                    //}
                }
            }
        });
    }

}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //뉴스 리스트
    DetailList.NewsList($("#currentIndex").val(), text);
    DetailList.BannerImg(seq);

    $("#selector01").change(function(){
        var text = $("#selector01 option:selected").val();
        var splitData = text.split("_");
        DetailList.NewsList(0, splitData[1]);
        DetailList.BannerImg(splitData[0]);
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
});
