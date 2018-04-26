
$(document).ready(function () {
    
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


    $('.reply-head').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).children().children().next().next().removeClass("on")
            $('.reply-area').slideUp();
        } else {
            $(this).addClass('on');
            $(this).children().children().next().next().addClass("on")
            $('.reply-area').slideDown();

        }
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
                data: { seq: seq },
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
    ShowUpdate: function (seq, obj) {
        $(obj).closest("li").hide();
        $(obj).closest("li").next().show();

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

    }
}
