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
    
    //뉴스 목록으로 돌아가기
    NewsGoBackList: function (currentIndex) {
        $("#frmList_newsNoticesENotices").find("[name='currentIndex']").val(currentIndex);
        DomesticStockDetailNewsNotices.SubNewsTab();

        return false;
    },
    //뉴스 상세
    NewsGoDetail: function (arjCode, articleId, tabSeq, boardType, currentIndex) {
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
    //공시 상세
    NoticeGoDetail: function (fSeq, fDataDay, stockCode, fContent, currentIndex) {
        //alert("상세: " + currentIndex)
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailSNoticeView?fSeq=" + fSeq + "&fDataDay=" + fDataDay + "&stockCode=" + stockCode + "&fContent=" + encodeURI(fContent) + "&currentIndex=" + currentIndex,
            data: $("#frmList_newsNoticesENotices > #divList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_newsNoticesENotices > #divList").html(data);
            }
        });
    },
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

    ////탭 활성화..
    //$("#newsNoticesENoticeTab ul li a").on("click", function () {
    //    $(this).parent('li').addClass('on').siblings().removeClass('on');
    //});

    $("#stockNews").on("click", function () {
        DomesticStockDetailNewsNotices.SubNewsTab();
    });

    $("#stockNotices").on("click", function () {
        DomesticStockDetailNewsNotices.SubNoticesTab();
    });

    ////$("#newsNoticesENoticeTab #stockENotices").on("click", function () {
    ////    DomesticStockDetailNewsNotices.SubENoticesTab();
    ////});

    if (boardType == "1") {
        $("#newsNoticesENoticeTab #stockNews").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetailNewsNotices.SubNewsTab();
    }
    else if (boardType == "2") {
        $("#newsNoticesENoticeTab #stockNotices").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetailNewsNotices.SubNoticesTab();
    }
    //else if (boardType == "3") {
    //    $("#newsNoticesENoticeTab #stockENotices").parent('li').addClass('on').siblings().removeClass('on');
    //    DomesticStockDetailNewsNotices.SubENoticesTab();
    //}
    else {
        $("#newsNoticesENoticeTab #stockNews").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetailNewsNotices.SubNewsTab();
    }

    DomesticStockDetailNewsNotices.SubNewsTab();
});