var ArticleComment = {
    SearchArtComment: function (currentIndex, isAdd) {
        $('#cmtCurrentIndex').val(currentIndex);

        $.ajax({
            method: 'POST',
            url: '/NewsCenter/News/SearchArtComment',
            data: $('#frmSearchCmt').serialize(),
            success: function (data) {
                if (isAdd) {
                    $('#ulComment').append(data);
                } else {
                    $('#ulComment').html(data);
                    if ($('#totalDataCount').val() > 0) {
                        $('#ulComment').css('display', 'block');
                    } else {
                        $('#ulComment').css('display', 'none');
                    }
                }

                var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#cmtPageSize').val());
                var nextPageCnt = (parseInt($('#cmtCurrentIndex').val()) + parseInt($('#cmtPageSize').val())) / parseInt($('#cmtPageSize').val());

                if (nextPageCnt < totalPageCnt) {
                    $('#ArtCommentMore').show();
                } else {
                    $('#ArtCommentMore').hide();
                }
            }
        });
        return false;
    },
    SaveComment: function (elementId) {
        var textLen = $('#' + elementId).find('.txtComment').val().length;
        var txt = $('#' + elementId).find('.txtComment').val().replace(/\s|　/gi, '');

        if (txt == "") {
            alert("내용을 입력하세요.");
            return false;
        }
        if (textLen > 500) {
            alert("내용은 500 글자 이상 입력할 수 없습니다.");
            $('#' + elementId).find('.txtComment').siblings('.btn-area.txt-r').find('.textLen').html(textLen + '/<span>500</span>');

            return false;
        }

        $('#' + elementId).find('.hidComment').val($('#' + elementId).find('.txtComment').val().replaceAll(/\n/g, '<br>'));

        $.ajax({
            method: 'POST',
            url: '/NewsCenter/News/SaveComment',
            data: $('#' + elementId).serialize(),
            success: function (data) {
                if (elementId == "frmAddComment") {
                    $('#frmAddComment').find('.txtComment').val('');
                    $('#frmAddComment').find('.textLen').html('0/<span>500</span>');
                }

                alert(CommonMsg.SaveAfterMsg);
                ArticleComment.SearchArtComment(0);
            }
        });
        return false;
    },
    DeleteComment: function (elementId) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                method: "POST",
                url: "/NewsCenter/News/DeleteComment",
                data: { commentId: elementId },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert(CommonMsg.DeleteAfterMsg);
                        ArticleComment.SearchArtComment(0);
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
        return false;
    },
    NaverPopup: function () {
        NaverLogin.ReturnUrl = location.href;
        NaverLogin.OpenPopup();
    },
    KakaoPopup: function () {
        KakaoLogin.ReturnUrl = location.href;
        KakaoLogin.OpenPopup();
    },
    FacebookPopup: function () {
        FacebookLogin.ReturnUrl = location.href;
        FacebookLogin.OpenPopup();
    },
    SnsPopupResult: function () {
        alert('로그인 되었습니다.');
    }
};

$(document).ready(function () {
    $(document).on('keyup', '.txtComment', function () {
        var textlen = $(this).val().length;
        $(this).siblings('.btn-area.txt-r').find('.textLen').html(textlen + '/<span>500</span>');

        if (textlen > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));

            textlen = $(this).val().length;
            $(this).siblings('.btn-area.txt-r').find('.textLen').html(textlen + '/<span>500</span>');
        }
    });

    //textbox 클릭 시 비로그인 경우 처리
    $(document).on('click', '.txtComment', function () {
        if ( !IsLogin() && !IsEasyLogin()) {
            LoginConfirm();
        }
    });

    //댓글 저장
    $(document).on('click', '.btnSaveCmt', function () {
        if (!IsLogin() && !IsEasyLogin()) {
            LoginConfirm();
        } else {
            var frmid = $(this).parent().parent().attr('id');

            if ($('#' + frmid).find('.txtComment').val() == "") {
                alert('댓글을 입력해주세요');
                return false;
            }

            ArticleComment.SaveComment(frmid);
        }
    });

    //댓글 수정폼
    $(document).on('click', '.btnUpdate', function () {
        var id = $(this).attr('id');
        var contents = $('#divCmt_' + id).html().replaceAll('<br>', /\n/g);

        var text = '<form id="frmUpdate_' + id + '"><input type="hidden" name="COMMENT_SEQ" value="' + id + '" />';
        text += '<textarea class="reply txtComment" placeholder="내용을 입력하세요" >' + contents + '</textarea>';
        text += '<textarea name="COMMENT" class="hidComment" style="display:none;"></textarea><div class="btn-area txt-r">';
        text += '<span class="text-byte textLen">0/<span>500</span></span><a href="javascript:void(0)" class="btn type02 w-auto btnSaveCmt" style="margin-left:5px;">등록</a>'
        text += '<a href="javascript:void(0)" class="btn type02 w-auto btnUpdateCancle" id="' + id + '" style="margin-left:3px;">취소</a></div></form > ';

        $('#divDate_' + id).hide();
        $('#divCmt_' + id).hide();
        $('#updateDiv_' + id).html(text);
        $('#updateDiv_' + id).show();
        $('#btnDiv_' + id).hide();
    });

    //댓글 수정 취소
    $(document).on('click', '.btnUpdateCancle', function () {
        var id = $(this).attr('id');

        $('#divDate_' + id).show();
        $('#divCmt_' + id).show();
        $('#updateDiv_' + id).html('');
        $('#updateDiv_' + id).hide();
        $('#btnDiv_' + id).show();
    });

    //댓글 삭제
    $(document).on('click', '.btnDelete', function () {
        var id = $(this).attr('id');

        ArticleComment.DeleteComment(id);
    });

    // 네이버 팝업
    $(document).on('click', '#btnNaver', function () {
        ArticleComment.NaverPopup();
    });

    // 카카오 팝업
    $(document).on('click', '#btnKakao', function () {
        ArticleComment.KakaoPopup();
    });

    // 페이스북 팝업
    $(document).on('click', '#btnFacebook', function () {
        ArticleComment.FacebookPopup();
    });

    //한경 로그인
    $(document).on('click', '#btnHankyung', function () {
        location.href = '/Login/LoginTest?ReturnUrl=' + location.pathname + '/' + location.search;
    });

    $(document).on('click', '#ArtCommentMore', function () {
        var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#cmtPageSize').val()) + 1;
        var CurrentPageCnt = parseInt($('#cmtCurrentIndex').val()) / parseInt($('#cmtPageSize').val()) + 1;

        if (CurrentPageCnt < totalPageCnt) {
            var nextIndex = parseInt($('#cmtCurrentIndex').val()) + parseInt($('#cmtPageSize').val());
            ArticleComment.SearchArtComment(nextIndex, true);
        }
    });
  
});
