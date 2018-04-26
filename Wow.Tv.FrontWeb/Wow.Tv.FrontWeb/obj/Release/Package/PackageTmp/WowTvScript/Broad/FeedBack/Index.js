

var FeedBackIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/Index",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                //cfShowBlock(true);
                $('#divContent').html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                //cfHideBlock();
            }
        });

        return false;
    },
    GoDetail: function (seq) {
        $("#seq").val(seq);

        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/Detail",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                //cfShowBlock(true);
                $('#divContent').html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                //cfHideBlock();
            }
        });

        return false;
    },
    GoAdd: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/Add",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                //cfShowBlock(true);
                $('#divContent').html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                //cfHideBlock();
            }
        });

        return false;
    },
    BindBanner: function (ingYn) {
        $("#divBanner").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/ProgramMain/Banner",
            data: { "programCode": $("#hidProgramCode").val() },
            success: function (data, textStatus) {
                $("#divBanner").html(data);
            }
        });

        return false;
    }
}



$(document).ready(function () {

    $("#btnSearch").click(function () {

        if (!($("select[name=SearchType]").val() === "ALL")) {
            if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
                $("#txtSearch").focus();
                return false;
            }
        }

        FeedBackIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode === 13) {
            $("#btnSearch").click();

            return false;
        }
    });

    $("#btnAdd").click(function () {

        FeedBackIndex.GoAdd($("#currentIndex").val());

        return false;
    });
    $("#btnGoLogin").click(function () {
        alert("로그인이 필요합니다.");
        var returnUrl = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + $("#hidProgramCode").val() + "&isFeedBack=1&FeedBackContentSeq=" + $("#hidFeedBackSeq").val() + "&FeedBackMenuSeq=" + $("#divContent").find("#hidFeedBackMenuSeq").val();
        location.href = $("#hidLoginUrl").val() + "?returl=" + encodeURIComponent(returnUrl);

        return false;
    });

    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "FeedBackIndex.GetList"));

    if ($("#hidFeedBackSeq").val() != "" && $("#hidFeedBackSeq").val() > 0) {
        FeedBackIndex.GoDetail($("#hidFeedBackSeq").val());
    }


    FeedBackIndex.BindBanner();
});

