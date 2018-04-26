
var TvMainNotice = {
    ChangeTab: function (objTab, objList) {
        $(objTab).closest("ul").find("li").removeClass("on");
        $(objTab).parent().addClass("on");

        $("#ulNoticeTab1").hide();
        $("#ulNoticeTab2").hide();
        $("#ulNoticeTab3").hide();

        $(objList).show();

        return false;
    },
    OpenLecture: function (seq, Schseq) {
        window.open(SITE_DOMAIN.HELP + "/LecturesAndEvent/Lecture/Detail?menuSeq=" + MENU_SEQ_DEFINE.LECTURE.DETAIL + "&seq=" + seq + "&Schseq=" + Schseq);

        return false;
    },
    GoLoginFeedBack: function (programCode, contentSeq, menuSeq) {
        alert("로그인이 필요합니다.");
        var returnUrl = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&isFeedBack=1&FeedBackContentSeq=" + contentSeq + "&FeedBackMenuSeq=" + menuSeq;
        location.href = $("#hidLoginUrl").val() + "?returl=" + encodeURIComponent(returnUrl);

        return false;
    },
    GoNotice: function (programCode, contentSeq, menuSeq) {
        var url = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&isNotice=1&noticeContentSeq=" + contentSeq + "&noticeMenuSeq=" + menuSeq;
        location.href = url;
    },
    GoFeedBack: function (programCode, contentSeq, menuSeq) {
        var returnUrl = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode + "&isFeedBack=1&FeedBackContentSeq=" + contentSeq + "&FeedBackMenuSeq=" + menuSeq;
        //location.href = $("#hidLoginUrl").val() + "?returl=" + encodeURIComponent(returnUrl);
        location.href = returnUrl;
    }

}



$(document).ready(function () {
    $("#btnNoticaTab1").click(function () {
        TvMainNotice.ChangeTab($("#btnNoticaTab1"), $("#ulNoticeTab1"));

        return false;
    });
    $("#btnNoticaTab2").click(function () {
        TvMainNotice.ChangeTab($("#btnNoticaTab2"), $("#ulNoticeTab2"));

        return false;
    });
    $("#btnNoticaTab3").click(function () {
        TvMainNotice.ChangeTab($("#btnNoticaTab3"), $("#ulNoticeTab3"));

        return false;
    });
});