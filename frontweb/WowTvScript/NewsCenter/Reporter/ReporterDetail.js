var ReporterDetail = {
    GoIndex: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    },
    GetLatestArtList: function (currentIndex) {
        $('.btnTab').removeClass('on');
        $('#latestArt').addClass('on');
        $('#PageSize').val(20);
        $('#currentIndex').val(currentIndex);

        var targetId = $("#divContent");

        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetLatestArtList",
            data: $('#frmPaging').serialize(),
            success: function (data) {
                targetId.html(data);

                if ($('#totalDataCount').val() > 0) {
                    if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
                    $('#divPaging').html(cfGetPagingHtml($('#totalDataCount').val(), currentIndex, $('#PageSize').val(), "ReporterDetail.GetLatestArtList"));
                } else {
                    $('#divPaging').html('');
                }
            },
            //데이터 받기전
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
                    console.log("기자 > 최신 기사 리스트 에러..");
                }
            }
        });

    },
    GetArticelLikeit: function (articleId) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetArticleLiekIt",
            data: {articleId : articleId},
            success: function (data) {
                //$(".reacts").html(data);
                $("#artLikeit_" + articleId).html(data);
            }
        });
    },
    GetAWordToReporter: function (currentIndex) {
        $('.btnTab').removeClass('on');
        $('#aWordReporter').addClass('on');
        $('#PageSize').val(10);
        $('#currentIndex').val(currentIndex);

        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetAWordToReporter",
            data: $('#frmPaging').serialize(),
            success: function (data) {
                $("#divContent").html(data);

                if ($('#totalDataCount').val() > 0) {
                    if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
                    $('#divPaging').html(cfGetPagingHtml($('#totalDataCount').val(), currentIndex, $('#PageSize').val(), "ReporterDetail.GetAWordToReporter"));
                } else {
                    $('#divPaging').html('');
                }

                if (!IsLogin() && !IsEasyLogin()) {
                    $('#divLogin').show();
                } else {
                    $('#divLogin').hide();
                }
            }
        });
    },
    SaveRecommend: function (reporterId) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/SaveRecommend",
            data: { reporterId: reporterId },
            success: function (data) {
                if (data.isSuccess == true) {
                    if (data.isRecommend == false) {
                        alert('‘추천’ 하였습니다');
                        ReporterDetail.GetRecommend(reporterId);
                    } else {
                        alert('이미 ‘추천’을 하셨습니다.');
                    }
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    GetReporterInfo: function (reporterId){
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetReporterInfo",
            data: { reporterId: reporterId },
            success: function (data) {
                $('#divReporterPopup').html(data);
                $('#divReporterPopup').show();

                $('#divReporterPopup').find('.popup-type1').css('position', 'absolute');

                var scrollTop = $(document).scrollTop() - $('#divReporterInfo').height() / 2.8;
                $('#divReporterInfo').css('margin-top', scrollTop +'px'); 
            }
        });
    },
    GetEmailForm: function (email) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetEmailForm",
            data: { email: email, reporterName: reporterName },
            success: function (data) {
                $('#divEmailPopup').html(data);
                $('#divEmailPopup').show();

                if ($('#divEmail').height() != "undefined" && parseInt($('#divEmail').height()) > 0) {
                    var top = $('#divEmail').height() / -2;
                    $('#divEmail').css('margin-top', top + 'px');
                }
            }
        });
    },
    Reload: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    },
    GetRecommend: function (searchId) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetRecommend",
            data: { searchId: searchId },
            async: false,
            success: function (data) {
                $('#recommendCnt').text(data.recommend);
            }
        });
    },
    GetSubScript: function (searchId) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetSubScript",
            data: { searchId: searchId },
            async: false,
            success: function (data) {
                if (data.isData) {
                    $('.btn-subscribe > button').html('기사<br> 구독취소');
                    $('.btn-subscribe > button').attr('id', 'btnCancleSub');
                } else {
                    $('.btn-subscribe > button').html('기사<br> 구독하기');
                    $('.btn-subscribe > button').attr('id', 'btnSubScribe');
                }
            }
        });
    },
    RightContent: function () {
        /*
        $.ajax({
            method: "POST",
            url: "/NewsCenter/ContentRigth",
            success: function (data, textStatus) {
                $("#divContentRight").html(data);
            }
        });
        */
        $("#divContentRight").load("/html/ContentRigthList.html");
    }
};

$(document).ready(function () {

    ReporterDetail.GetRecommend(reporterId);
    ReporterDetail.GetSubScript(reporterId);

    if (tabType == "2") {
        ReporterDetail.GetAWordToReporter(0);
    } else {
        ReporterDetail.GetLatestArtList(0);
    }

    ReporterDetail.RightContent();

    $(document).on('click', '#btnHankyung', function () {
        var locationURL = location.href;

        if (locationURL.indexOf('searchId') > -1) {
            GoLogin();
        } else {
            GoLogin('&SearchId=' + reporterId);
        }
    });

    $('#btnMyPin').click(function () {
        isLogin = IsLogin();
        if (isLogin == false) {
            if (confirm(CommonMsg.LoginMsg)) {
                var locationURL = location.href;

                if (locationURL.indexOf('SearchId') > -1) {
                    GoLogin();
                } else {
                    GoLogin('&SearchId=' + reporterId);
                }
            }
        } else {
            co.PopupScrap("Report", reporterName, reporterId);
        }
    });

    $('#btnSubScribe').click(function () {
        var locationURL = location.href;

        if (locationURL.indexOf('SearchId') > -1) {
            PopupSubScript(reporterId);
        } else {
            PopupSubScript(reporterId, '&SearchId=' + reporterId);
        }
        
    });

    $('#btnCancleSub').click(function () {
        DeleteSubScript(reporterId);
    });

    $('#btnReporterInfo').click(function () {
        ReporterDetail.GetReporterInfo(reporterId);
    });

    $(document).keydown(function () {
        if (event.keyCode == 116) {
            ReporterDetail.Reload();
        }
    });

    $('body').removeClass('sub');
});