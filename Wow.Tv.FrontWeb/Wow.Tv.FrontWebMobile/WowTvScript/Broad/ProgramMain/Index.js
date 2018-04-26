
var ProgramMainIndex = {
    OpenTvProgramBuy: function () {
        var popOption = "width=665, height=700, resizable=no, scrollbars=no, status=no;";
        window.open("/Broad/TvMain/ProgramBuy1", "_blank", popOption);

        return false;
    },
    OpenContentsBuy: function () {
        window.open("https://mhelp.wowtv.co.kr/ServiceInfo/Hankyung/BroadInfo?menuSeq=562 ", "_blank");

        return false;
    },
    OpenPopup: function (url) {
        if (url == "") {
            alert("준비된 페이지가 없습니다.");
        }
        else {
            window.open(url);
        }

        return false;
    },
    GoProgramMain: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    },
    BindUnion: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/ProgramMain/UnionPartial",
            data: { "programCode": $("#hidProgramCode").val() },
            success: function (data, textStatus) {
                $("#divContent").html(data);
            }
        });

        return false;
    },
    BindContentPartial: function (url, contentSeq, broadWatchNumber, menuSeq) {
        $("#divContent").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: url,
            data: { "programCode": $("#hidProgramCode").val(), "contentSeq": contentSeq, "broadWatchNumber": broadWatchNumber, "menuSeq": menuSeq },
            success: function (data, textStatus) {
                $("#divContent").html(data);
            }
        });

        return false;
    },
    GoLogin: function (contentSeq, menuSeq) {
        alert("로그인이 필요합니다.");
        var returnUrl = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + $("#hidProgramCode").val() + "&isFeedBack=1&FeedBackContentSeq=" + 0 + "&FeedBackMenuSeq=" + menuSeq;
        location.href = $("#hidLoginUrl").val() + "?returl=" + encodeURIComponent(returnUrl);

        return false;
    }
};


$(document).ready(function () {

    $("#btnProgramPin").click(function () {
        co.PopupScrap("Program", $("#hidProgramName").val(), $("#hidProgramCode").val());

        var offset = $("body").offset();
        $('html, body').animate({ scrollTop: offset.top }, 400);

        return false;
    });


    if ($("#hidProgramType").val() == "Union") {
        ProgramMainIndex.BindUnion();
    }
    else if ($("#hidBroadWatchNumber").val() == "-1") {
        ProgramMainIndex.BindContentPartial("/Broad/BroadWatch/Index", 0, 0);
        $(".devMenuItem").removeClass("on");
        $("[devBroadWatchYn='Y']").addClass("on");
    }
    else if ($("#hidBroadWatchNumber").val() != null && $("#hidBroadWatchNumber").val() != "" && $("#hidBroadWatchNumber").val() > "0") {
        ProgramMainIndex.BindContentPartial("/Broad/BroadWatch/Index", 0, $("#hidBroadWatchNumber").val());
        $(".devMenuItem").removeClass("on");
        $("[devBroadWatchYn='Y']").addClass("on");
    }
    else if ($("#hidIsNotice").val() == "1") {
        ProgramMainIndex.BindContentPartial("/Broad/Notice/Index", $("#hidNoticeContentSeq").val(), 0, $("#hidNoticeMenuSeq").val());
        $(".devMenuItem").removeClass("on");
        //$("[devNoticeYn='Y']").addClass("on");
        $("[devProgramMenuSeq='" + $("#hidNoticeMenuSeq").val() + "']").addClass("on");
    }
    else if ($("#hidIsFeedBack").val() == "1") {
        ProgramMainIndex.BindContentPartial("/Broad/FeedBack/Index", $("#hidFeedBackContentSeq").val(), 0, $("#hidFeedBackMenuSeq").val());
        $(".devMenuItem").removeClass("on");
        //$("[devFeedBackYn='Y']").addClass("on");
        $("[devProgramMenuSeq='" + $("#hidFeedBackMenuSeq").val() + "']").addClass("on");
    }
    else {
        $(".devMenuItem:first").find("span").click();
    }
});
