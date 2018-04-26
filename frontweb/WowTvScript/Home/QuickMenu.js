var QuickMenu = {
    Join: function (type) {
        if (IsLogin() == false) {
            //alert("로그인 후 이용하실 수 있습니다.");
            LoginConfirm();
        } else {
            var url;
            if (type == 1) {
                url = "https://billing.wownet.co.kr/fillup/pop_purchase_select.asp?priceid=551&itemorpack=1&price=22000";
                window.open(url, 700, 700);
            } else if (type == 2) {
                url = "https://billing.wownet.co.kr/fillup/pop_purchase_select.asp?priceid=552&itemorpack=1&price=55000";
                window.open(url, 700, 700);
            } else {
                url = "http://wowpro.wownet.co.kr/pro/intro.asp?bcode=N04000000&mseq=177";
                window.open(url, "_blank");
            }
        }
        return false;
    },

    BillingLink: function () {
        window.open("https://billing.wownet.co.kr/fillup/pop_payment_select.asp?isPopup=1",
            "cash_add",
            "status=no,toolbar=no");

        return false;
    },

    Inquiry1: function () {
        var url = domainUrlHelp + "/IntegratedBoard/Inquiry/Index?menuSeq=" + MENU_SEQ_DEFINE.HELP.ONEINQUIRY;
        if (IsLogin()) {
            window.open(url, "_blank");
        } else {
            //alert("로그인 후 이용하실 수 있습니다.");
            LoginConfirm();
        }

        return false;
    },

    Inquiry2: function () {
        var url = domainUrlHelp + "/IntegratedBoard/Inquiry/Index?menuSeq=" + MENU_SEQ_DEFINE.HELP.CITIZENINQUIRY;

        if (IsLogin()) {
            window.open(url, "_blank");
        } else {
            //alert("로그인 후 이용하실 수 있습니다.");
            LoginConfirm();
        }

        return false;
    }, 

    ProgramLink: function (prgcd) {
        var url = domainUrlFront + "/Broad/ProgramMain/Index?menuSeq=644&programCode=" + prgcd;
        window.open(url, "_blank");

        return false;
    },

    PartnerLink: function (proId) {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = "http://wowpro.wownet.co.kr/pro/pro_main_new/profile.asp?ptype=11&proID=" + proId;
    },

    EventLink: function (seq) {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = domainUrlHelp + "/LecturesAndEvent/Event/Detail?menuSeq=" + MENU_SEQ_DEFINE.HELP.EVENT + "&Seq=" + seq +"&EventType=1";
    },

    LectureLink: function (seq, mseq) {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = domainUrlHelp + "/LecturesAndEvent/Lecture/Detail?menuSeq=" + MENU_SEQ_DEFINE.LECTURE.DETAIL + "&seq=" + seq + "&Schseq=" + mseq;
    },

    NoticeLink: function (seq) {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = domainUrlHelp + "/IntegratedBoard/Notice/Detail?menuSeq=" + MENU_SEQ_DEFINE.HELP.NOTICE + "&seq=" + seq;
    },

    YouTubeLink: function () {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = "https://www.youtube.com/user/hkwowtv";
    },

    FacebookLink: function () {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = "https://www.facebook.com/HKWOWTV";
    },

    TwitterLink: function () {
        var openNewWindow = window.open("about:blank");
        openNewWindow.location.href = "https://twitter.com/HKWOWTV";
    }

}