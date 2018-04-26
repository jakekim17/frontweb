var ArticleComment = {
    SearchArtComment: function (currentIndex, isAdd) {
        $('#cmtCurrentIndex').val(currentIndex);

        $.ajax({
            method: 'POST',
            url: '/NewsCenter/News/GetArtComment',
            data: $('#frmSearchCmt').serialize(),
            success: function (data) {
                if (isAdd) {
                    $('#divGetComment').append(data);
                } else {
                    $('#divGetComment').html(data);
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
    },
    SaveComment: function (frmId) {

        if (!IsLogin() && !IsEasyLogin()) {
            if (confirm(CommonMsg.LoginMsg)) {
                GoLogin();
            }
        } else {
            var tmp = $('#' + frmId).find('.txtComment').val().replace(/\s|　/gi, '');

            if (tmp == "") {
                alert('내용을 입력하세요.');
                return false;
            }

            $('#' + frmId).find('.hidComment').val($('#' + frmId).find('.txtComment').val().replaceAll(/\n/g, '<br>'));

            $.ajax({
                method: 'POST',
                url: '/NewsCenter/News/SaveComment',
                data: $('#' + frmId).serialize(),
                success: function (data) {
                    if (data.isSuccess) {
                        if (frmId == "frmAdd") {
                            $('#frmAdd').find('.txtComment').val('');
                            $('#frmAdd').find('.txtLen').text('0/500');
                        }

                        alert(CommonMsg.SaveAfterMsg);
                        ArticleComment.SearchArtComment(0);
                    }
                }
            });
        }
        return false;
    },
    DeleteComment: function (deleteId) {
        if(confirm(CommonMsg.DeleteConfirmMsg) == true){
            $.ajax({
                method: 'POST',
                url: '/NewsCenter/News/DeleteComment',
                data: { deleteId: deleteId },
                success: function (data) {
                    if (data.isSuccess) {
                        alert(CommonMsg.DeleteAfterMsg);
                        ArticleComment.SearchArtComment(0);
                    }
                }
            });
        }
        return false;
    }
};

$(document).ready(function () {

    // 댓글 저장(등록) 버튼 클릭 시
    $(document).on('click','#btnAdd', function () {
        var isLogin = IsLogin();
        var isEasyLogin = IsEasyLogin();

        if ( !isLogin && !isEasyLogin) {
            LoginConfirm();
            return false;
        } else {
            ArticleComment.SaveComment('frmAdd');
        }
    });

    // 삭제 버튼 클릭 시
    $(document).on('click', '.btnDelete', function () {
        ArticleComment.DeleteComment($(this).parent().attr('id'));
    });

    // 수정버튼 클릭 시
    $(document).on('click', '.btnUpdate', function () {

        var id = $(this).parent().attr('id');
        var commentTxt = $('#txt_' + id).html().replaceAll('<br>', '\r\n');

        var txt = '<div class="box-write-reply"><form id="frm_' + id + '">';
        txt += '<textarea name="COMMENT" class="txtComment" id="txtComment txt_' + id + '" cols="30" rows="10">' + commentTxt + '</textarea>';
        txt += '<div class="inner-right"><input type="button" id="btnUp_'+id+'" class="btn-type1 btnSaveUpdate" value="등록"></div>';
        txt += '<p id="txtlen_' + id + '" class="type txtLen">0/500</p><input type="hidden" name="COMMENT_SEQ" value="' + id + '" /></form></div>';
        txt += '<div style="padding-top:30px;text-align:right"><button type="button" class="btn-type4 btnUpdateCancle" id="' + id +'" style="width:50px;">취소</button></div>';

        $('#btnDiv_' + id).hide();
        $('#txt_' + id).hide();
        $('#updateDiv_' + id).html(txt);
        $('#updateDiv_' + id).show();
    });

    // 수정 취소버튼 클릭 시
    $(document).on('click', '.btnUpdateCancle', function () {
        var id = $(this).attr('id');

        $('#btnDiv_' + id).show();
        $('#txt_' + id).show();
        $('#updateDiv_' + id).html('');
        $('#updateDiv_' + id).hide();
    });

    // 수정 저장버튼 클릭 시
    $(document).on('click', '.btnSaveUpdate', function () {
        var id = $(this).attr('id').split('_')[1];
        ArticleComment.SaveComment('frm_' + id);
    });

    // 글자 입력 시
    $(document).on('keyup', '.txtComment', function () {
        var len = $(this).val().length;
        $('#txtLen').text(len + '/500');

        if (len > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));

            len = $(this).val().length;
            $('#txtLen').text(len + '/500');
        }
    });

    // 더보기 버튼 클릭 시
    $(document).on('click', '#ArtCommentMore', function () {
        var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#cmtPageSize').val()) + 1;
        var CurrentPageCnt = parseInt($('#cmtCurrentIndex').val()) / parseInt($('#cmtPageSize').val()) + 1;

        if (CurrentPageCnt < totalPageCnt) {
            var nextIndex = parseInt($('#cmtCurrentIndex').val()) + parseInt($('#cmtPageSize').val());
            ArticleComment.SearchArtComment(nextIndex,true);
        }
    });
});