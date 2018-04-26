
$(document).ready(function () {
    $("#txtCONTENT").keyup(function (e) {
        var content = $(this).val();
        //$(this).height(((content.split('\n').length + 1) * 1.5) + 'em');
        $("#pWriteCount").html(content.length + "/500");
    });
    $("#txtCONTENT").keyup();


    $("#btnCommentSave").click(function () {



        if (!window.co.validation("#txtCONTENT", "댓글을 확인해주세요.")) {
            $("#txtCONTENT").focus();
            return false;
        }

        if (confirm("댓글을 등록하시겠습니까?")) {

            ReplyList.CommentSave();
        }

        return false;
    });
});


var ReplyList = {
    CommentSave: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/CommentSave",
            data: $("#frmComment").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    FeedBackDetail.BindReplyList();
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
    CommentDelete: function (seq) {
        if (confirm("댓글을 삭제하시겠습니까?")) {
            $.ajax({
                type: 'POST',
                url: "/Broad/FeedBack/CommentDelete",
                data: {seq:seq},
                success: function (data, textStatus) {
                    if (data.IsSuccess) {
                        confirm(CommonMsg.DeleteAfterMsg);
                        FeedBackDetail.BindReplyList();
                    }
                    else {
                        alert(data.Msg);
                        if (data.Redirect.length !== 0) {
                            window.location = data.Redirect;
                        }
                    }
                }
            });
        }
        return false;
    },
    ShowUpdate: function(seq, obj) {
        //$("#div-" + seq).show();
        $(obj).closest(".box-button-reply").hide();
        $(obj).closest(".artic-reply").find(".devReplyView").hide();
        $(obj).closest(".artic-reply").find(".devReplyEdit").show();

    },
    CommentUpdate: function (seq) {
        if (confirm("댓글을 수정하시겠습니까?")) {
            $.ajax({
                type: 'POST',
                url: "/Broad/FeedBack/CommentUpdate",
                data: { seq: seq, CONTENT: $("#" + seq).val() },
                success: function (data, textStatus) {
                    if (data.IsSuccess) {
                        confirm(CommonMsg.SaveAfterMsg);
                        FeedBackDetail.BindReplyList();
                    }
                    else {
                        alert(data.Msg);
                        if (data.Redirect.length !== 0) {
                            window.location = data.Redirect;
                        }
                    }
                }
            });
        }
        return false;
        
    },
    ShowHide: function () {
        $("#divReply").find(".reply-body").slideToggle(500);

        return false;
    }
}