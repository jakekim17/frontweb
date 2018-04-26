var ReporterDetail = {
    GoIndex: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/Index?menuSeq=" + $('#CurrentMenuSeq').val());
        $("#frm").submit();
    },
    Reload: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + $('input[name="SearchId"]').val());
        $("#frm").submit();
    },
    GetLatestArtList: function (currentIndex, isAdd) {
        $('.btnSubTab').removeClass('on');
        $('#latestArt').addClass('on');
        $('#currentIndex').val(currentIndex);

        if (!isAdd) {
            $('#PageSize').val(20);
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/GetLatestArtList",
            data: $('#frm').serialize(),
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
    GetArticelLikeit: function (articleId) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/GetArticleLikeIt",
            data: { articleId: articleId },
            success: function (data) {
                $("#artLikeit_" + articleId).html(data);
            }
        });
    },
    GetAWordToReporter: function (currentIndex, isAdd) {
        $('.btnSubTab').removeClass('on');
        $('#aWordReporter').addClass('on');
        $('#currentIndex').val(currentIndex);

        if (!isAdd) {
            $('#PageSize').val(20);
        }
        if (typeof isAdd != "undefined") {
            $('#isAdd').val('Y');
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/GetAWordToReporter",
            data: $('#frm').serialize(),
            success: function (data) {
                if (isAdd) {
                    $("#divContents").append(data);
                } else {
                    $("#divContents").html(data);
                }

                if (IsLogin() == false && IsEasyLogin() == false) {
                    $('#ulLogin').show();
                    console.log('aaaaa');
                } else {
                    $('#ulLogin').hide();
                }

                $('#isAdd').val('');
            }
        });
    },
    SaveRecommend: function (reporterId) {
        $.ajax({
            type: "POST",
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
    GoReporterInfo: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/GetReporterInfo?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + $('#SearchId').val());
        $("#frm").submit();
    },
    GoEmailForm: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/GetEmailForm?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + $('#SearchId').val());
        $("#frm").submit();
    },
    GetRecommend: function (searchId) {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/GetRecommend",
            data: { searchId: searchId },
            success: function (data) {
                $("#recommendCnt").text(data.recommendCnt);
            }
        });
    },
};

$(document).ready(function () {

    ReporterDetail.GetRecommend(reporterId);

    if (tabType == "2") {
        ReporterDetail.GetAWordToReporter(0);
    } else {
        ReporterDetail.GetLatestArtList(0);
    }

    $('#btnMyPin').click(function () {
        co.PopupScrap("Report", reporterName, reporterId);
    });

    $(document).on('click', '.btnSubScribe', function () {
        var id = $(this).children().attr('id');
        if (id == 'btnSubScribe') {
            PopupSubScript(reporterId);
        } else if (id == 'btnCancleSub') {
            DeleteSubScript(reporterId);
        }
    });

    $(document).keydown(function () {
        if (event.keyCode == 116) {
            ReporterDetail.Reload();
        }
    });

    // 스크롤 이벤트
    $(document).scroll(function () {
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if (maxHeight  <= currentScroll + 100 ) {
            var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#PageSize').val()) + 1;
            var CurrentPageCnt = parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1;

            if (CurrentPageCnt < totalPageCnt) {
                var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                if (nextIndex > $('#totalDataCount').val()) {
                    var minus = nextIndex - $('#totalDataCount').val();
                    nextIndex = nextIndex - minus;
                }else {
                    $('#PageSize').val(20);
                }

                var currentTab = $('.tab-area').find('.on').attr('id');

                if (currentTab == "latestArt") {
                    ReporterDetail.GetLatestArtList(nextIndex, true);
                } else if (currentTab == "aWordReporter") {
                    ReporterDetail.GetAWordToReporter(nextIndex, true)
                }
            }
        }
    });
});

