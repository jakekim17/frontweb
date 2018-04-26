var DomesticStockDetailNewsNotices = {
    SubNewsTab: function () {
        //console.log("1");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailSubNewsTab",
            data: $("#frmList_newsNoticesENotices").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });

        return false;
    },
    SubNoticesTab: function () {

        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailSubNoticesTab",
            data: $("#frmList_newsNoticesENotices").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });

        return false;
    },
    SubENoticesTab: function () {

        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailSubENoticesTab",
            data: $("#frmList_newsNoticesENotices").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });

        return false;
    },
    //뉴스 목록으로 돌아가기
    NewsGoBackList: function (currentIndex) {
        $("#frmList_newsNoticesENotices").find("[name='currentIndex']").val(currentIndex);
        DomesticStockDetailNewsNotices.SubNewsTab();

        return false;
    },
    //뉴스 상세
    NewsGoDetail: function (arjCode, articleId, tabSeq, boardType, currentIndex) {
        ////alert(articleId +"/" +  tabSeq + "/" +  boardType);
        ////var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;
        //var sUrl = String.format("/Finance/DomesticStock/DomesticStockDetailStockNewsView?searchStr={0}&tabSeq={1}&boardType={2}&articleId={3}&currentIndex={4}", arjCode, tabSeq, boardType, articleId, currentIndex);
        //alert(sUrl);
        ////$("#articleId").val(articleId);
        //$("#frmList_newsNoticesENotices").attr("method", "POST");
        //$("#frmList_newsNoticesENotices").attr("action", sUrl);
        //$("#frmList_newsNoticesENotices").submit();
        //alert("테스트");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailStockNewsView?articleId=" + articleId + "&arjCode=" + arjCode + "&tabSeq=" + tabSeq + "&boardType=" + boardType + "&currentIndex=" + currentIndex,
            data: $("#frmList_newsNoticesENotices > #divList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });

        return false;
    },
    /*삭제 대상*/
    //공시 상세
    NoticeGoDetail: function (fSeq, fDataDay, stockCode, fContent, currentIndex) {
        //alert("상세: " + currentIndex)
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailSNoticeView?fSeq=" + fSeq + "&fDataDay=" + fDataDay + "&stockCode=" + stockCode + "&fContent=" + fContent + "&currentIndex=" + currentIndex,
            data: $("#frmList_newsNoticesENotices > #divList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });
    },
    /*삭제 대상*/
    //공시 목록으로 돌아가기
    NoticeGoBackList: function (currentIndex) {
        //alert(currentIndex);
        $("#frmList_newsNoticesENotices").find("[name='currentIndex']").val(currentIndex);
        DomesticStockDetailNewsNotices.SubNoticesTab();

        return false;
    }
}

$(document).ready(function () {
    var boardType = $("#boardType").val();

    //탭 활성화..
    $("#newsNoticesENoticeTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#newsNoticesENoticeTab #stockNews").on("click", function () {
        DomesticStockDetailNewsNotices.SubNewsTab();
    });

    $("#newsNoticesENoticeTab #stockNotices").on("click", function () {
        DomesticStockDetailNewsNotices.SubNoticesTab();
    });

    $("#newsNoticesENoticeTab #stockENotices").on("click", function () {
        DomesticStockDetailNewsNotices.SubENoticesTab();
    });


    
});