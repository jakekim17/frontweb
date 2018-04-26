
var DomesticStockDetail = {
    TotalInfo: function () {
        //$("#frmList_DomesticStockDetailTotalInfo > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailTotalInfo",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    CurPrice: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailCurPrice",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    PredictionChart: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailPredictionChart",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    ForeignerSecurity: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailForeignerSecurity",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    NewsNotices: function (boardType) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailNewsNotices?boardType=" + boardType,
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

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

        $("#boardContent li").removeClass("on");
        $("#boardContent #newsNotices").parent('li').addClass("on");
        
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/RecentlyNewsNoticeView?articleId=" + articleId + "&arjCode=" + arjCode + "&tabSeq=" + tabSeq + "&boardType=" + boardType + "&currentIndex=" + currentIndex,
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
                //$("#frmList_newsNoticesENotices > #divList").text("바보야");
                $.ajax({
                    type: 'POST',
                    url: "/Finance/DomesticStock/DomesticStockDetailStockNewsView?articleId=" + articleId + "&arjCode=" + arjCode + "&tabSeq=" + tabSeq + "&boardType=" + boardType + "&currentIndex=" + currentIndex,
                    data: $("#frmList_newsNoticesENotices").serialize(),
                    success: function (data, textStatus) {
                        $("#frmList_newsNoticesENotices > #divList").html(data);
                    }
                });
            }
        });


        return false;
    },
    //공시상세
    NoticeGoDetail: function (fSeq, fDataDay, stockCode, fContent, currentIndex) {
        $("#boardContent li").removeClass("on");
        $("#boardContent #newsNotices").parent('li').addClass("on");

        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/RecentlyNewsNoticeView",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
                $("#newsNoticesENoticeTab li").removeClass("on");
                $("#newsNoticesENoticeTab #stockNotices").parent('li').addClass("on");
                $.ajax({
                    type: 'POST',
                    url: "/Finance/DomesticStock/DomesticStockDetailSNoticeView?fSeq=" + fSeq + "&fDataDay=" + fDataDay + "&StockCode=" + stockCode,
                    data: $("#frmList_newsNoticesENotices").serialize(),
                    success: function (data, textStatus) {
                        $("#frmList_newsNoticesENotices > #divList").html(data);
                    }
                });
            }
        });
    },
    CompanyAnalysis: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailCompanyAnalysis",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    StockVod: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailStockVod",
            data: $("#frmList_DSDTab").serialize(),
            success: function (data, textStatus) {
                
                $("#frmList_DSDTab > #divList").html(data);
            }
        });

        return false;
    },
    FavoriteStockReg: function (arjCode) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SaveMyFavoriteStock?arjCode",
            data: { stockCode: arjCode },
            success: function (data, textStatus) {
                $(data).each(function (index, item) {
                    if (item.IsSuccess == true) {
                        alert("등록되었습니다.");
                    }
                    else {
                        alert(item.Msg);
                    }
                    
                });
            }
        });

        return false;
    }
}


$(document).ready(function () {
    
    //탭 활성화..
    $("#boardContent ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    //종목상세
    $("#boardContent #totalInfo").on("click", function () {
        DomesticStockDetail.TotalInfo();
    });

    //현재가
    $("#boardContent #currPrice").on("click", function () {
        DomesticStockDetail.CurPrice();
    });

    //주가예측차트
    $("#boardContent #predictionChart").on("click", function () {
        DomesticStockDetail.PredictionChart();
    });

    //외국인,기관
    $("#boardContent #foreignerSecurity").on("click", function () {
        DomesticStockDetail.ForeignerSecurity();
    });

    //뉴스,공시
    $("#boardContent #newsNotices").on("click", function () {
        DomesticStockDetail.NewsNotices();
    });

    //기업분석
    $("#boardContent #companyAnalysis").on("click", function () {
        DomesticStockDetail.CompanyAnalysis();
    });

    //종목동영상
    $("#boardContent #stockVod").on("click", function () {
        DomesticStockDetail.StockVod();
    });

    var tabSeq = $("#tabSeq").val();
    var boardType = $("#boardType").val();
    var articleId = $("#articleId").val();

    //종목상세 탭 분기
    //0: 종목상세, 1: 현재가, 2: 주가예측차트, 3: 외국인,기관, 4: 뉴스,공시, 5: 기업분석, 6: 종목동영상
    if (tabSeq == "0") {
        DomesticStockDetail.TotalInfo();
    }
    else if (tabSeq == "1") {
        $("#boardContent #currPrice").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.CurPrice();
    }
    else if (tabSeq == "2") {
        $("#boardContent #predictionChart").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.PredictionChart();
    }
    else if (tabSeq == "3") {
        $("#boardContent #foreignerSecurity").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.ForeignerSecurity();
    }
    else if (tabSeq == "4") {
        $("#boardContent #newsNotices").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.NewsNotices(boardType);
    }
    else if (tabSeq == "5") {
        $("#boardContent #companyAnalysis").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.CompanyAnalysis();
    }
    else if (tabSeq == "6") {
        $("#boardContent #stockVod").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.StockVod();
    }
    else {
        $("#boardContent #currPrice").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockDetail.CurPrice();
    }

    $("#favoriteBtnAlertLogin").on("click", function () {
        var loginUrl = $("#loginUrl").val();
        alert("로그인 하세요.");
        location.href = loginUrl;
    });

    var arjCode = $("#arjCode").val().replace("A", "");
    $("#favoriteStockReg").on("click", function () {
        DomesticStockDetail.FavoriteStockReg(arjCode);
    });

    //if (articleId != null || articleId != "" || articleId != "undefined")
    //{
    //    DomesticStockDetail.
    //}
});

