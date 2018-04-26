

var TvMainNotice = {
    GoLecture: function (seq, Schseq) {
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
