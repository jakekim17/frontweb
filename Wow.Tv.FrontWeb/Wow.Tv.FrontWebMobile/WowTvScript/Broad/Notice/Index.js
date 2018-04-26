

var NoticeIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/Notice/Index",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                cfShowBlock(true);
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                cfHideBlock();
            }
        });

        return false;
    },
    GoDetail: function (seq) {
        $("#seq").val(seq);

        $.ajax({
            type: 'POST',
            url: "/Broad/Notice/Detail",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                cfShowBlock(true);
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                cfHideBlock();
            }
        });

        return false;
    }
}



$(document).ready(function () {
    
});


$("#btnSearch").click(function () {
    if (!($("select[name=SearchType]").val() === "ALL")) {
        if (!window.co.validation("#txtSearch", AlertMsg.KeyWordisNotMsg)) {
            $("#txtSearch").focus();
            return false;
        }
    }

    NoticeIndex.GetList(0);

    return false;
});


$("#frmSearch").keydown(function () {
    if (event.keyCode === 13) {
        $("#btnSearch").click();

        return false;
    }
});

$("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "NoticeIndex.GetList"));

if ($("#hidNoticeSeq").val() != "" && $("#hidNoticeSeq").val() > 0) {
    NoticeIndex.GoDetail($("#hidNoticeSeq").val());
}
