

var FeedBackDetail = {
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");

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
    GoEdit: function () {

        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/Edit",
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
    BindReplyList: function () {
        
        $.ajax({
            type: "POST",
            url: "/Broad/FeedBack/ReplyList",
            data: { seq: boardContentSeq},
            success: function (data) {
                $("#divReply").html(data);
            }
        });

        return false;
    },
    GoProgramView : function(prgcd) {
      alert("페이지 이동 미구현");  
    },
    Delete: function (seq) {
        $.ajax({
            type: "POST",
            url: "/Broad/FeedBack/Delete",
            data: { "seq": $("#hidSeq").val() },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.DeleteAfterMsg);
                    FeedBackDetail.GoIndex();
                }
                else {
                    alert(data.Msg);
                    if (data.Redirect.length !== 0) {
                        window.location = data.Redirect;
                    }
                }
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
    $("#btnList").click(function () {
        FeedBackDetail.GoIndex();

        return false;
    });

    $("#btnModify").click(function () {
        FeedBackDetail.GoEdit();
    });

    $("#btnDelete").click(function () {
        var confirmMsg = "삭제 하시겠습니까? \n삭제 된 데이터는 복구가 불가합니다.";
        if (confirm(confirmMsg)) {
            FeedBackDetail.Delete($("#BOARD_CONTENT_SEQ").val());
        }
        return false;
    });

    setTimeout(function () {
        FeedBackDetail.BindReplyList();
    }, 1000);


    FeedBackDetail.BindBanner();
});



