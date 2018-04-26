var GetAWordToReporter = {
    SaveReply: function (elementId) {

        if (!IsLogin() && !IsEasyLogin()) {
            if (confirm(CommonMsg.LoginMsg)) {
                var locationURL = location.href;

                if (locationURL.indexOf('SearchId') > -1) {
                    GoLogin();
                } else {
                    GoLogin('&SearchId=' + reporterId);
                }
            }
        } else {
            var tmp = $('#' + elementId).find('.txtContent').val().replace(/\s|　/gi, '');

            if (tmp == "") {
                alert('내용을 입력하세요.');
                return false;
            }

            $('#' + elementId).find('.hidContent').val($('#' + elementId).find('.txtContent').val().replaceAll(/\n/g, '<br>'));

            $.ajax({
                method: "POST",
                url: "/NewsCenter/Reporter/SaveReply",
                data: $('#' + elementId).serialize(),
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert(CommonMsg.SaveAfterMsg);
                        ReporterDetail.GetAWordToReporter(0);
                    }
                }
            });
        }

    },
    DeleteReply: function (id) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                method: "POST",
                url: "/NewsCenter/Reporter/DeleteReply",
                data: { replyId: id },
                success: function (data) {
                    if (data.isSuccess == true) {
                        alert(CommonMsg.DeleteAfterMsg);
                        ReporterDetail.GetAWordToReporter(0);
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }
    },
    NaverPopup: function () {
        var locationHref = location.href;

        if (locationHref.indexOf('&') > -1) {
            locationHref = locationHref.split('&')[0];
        }

        NaverLogin.ReturnUrl = locationHref + '&SearchId=' + reporterId + '&tabType=2';

        NaverLogin.OpenPopup();
    },
    KakaoPopup: function () {
        var locationHref = location.href;

        if (locationHref.indexOf('&') > -1) {
            locationHref = locationHref.split('&')[0];
        }

        KakaoLogin.ReturnUrl = locationHref + '&SearchId=' + reporterId + '&tabType=2';
        KakaoLogin.OpenPopup();
    },
    FacebookPopup: function () {
        var locationHref = location.href;

        if (locationHref.indexOf('&') > -1) {
            locationHref = locationHref.split('&')[0];
        }

        FacebookLogin.ReturnUrl = locationHref + '&SearchId=' + reporterId + '&tabType=2';
        FacebookLogin.OpenPopup();
    },
    SnsPopupResult: function () {
        alert('로그인 되었습니다.');
    }
};

$(document).ready(function () {
    //댓글 글자 입력 수
    $(document).on('keyup', '.txtContent', function () {
        var len = $(this).val().length;
        $(this).siblings('p').text(len + '/500');

        if (len > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));

            len = $(this).val().length;
            $(this).siblings('p').text(len + '/500');
        }
    });

    // 댓글 저장
    $(document).on('click', '.btnSaveReply', function () {
        if (!IsLogin() && !IsEasyLogin()) {
            if (confirm(CommonMsg.LoginMsg)) {
                var locationURL = location.href;

                if (locationURL.indexOf('SearchId') > -1) {
                    GoLogin();
                } else {
                    GoLogin('&SearchId=' + reporterId);
                }
            }
        } else {
            var frmid = $(this).parent().parent().parent().attr('id');
            GetAWordToReporter.SaveReply(frmid);
        }
    });

    // 답글 입력 창
    $(document).on('click', '.btnSubReply', function () {
        var id = $(this).attr('id');
        var addDivId = 'SubReply_' + id;

        var txt = '<div class="box-reply-sub"><form id="frmSubReply"><div class="box-write-reply">';
        txt += '<input type="hidden" name="REPORTER_ID" value="' + reporterId + '" /><input type="hidden" name="MSEQ" value="' + id + '"/>';
        txt += '<textarea class="txtContent" cols="30" rows="10"></textarea><div class="inner-right">';
        txt += '<textarea name="CONTENT" class="hidContent" style="display:none;"></textarea>';
        txt += '<input type="button" class="btn-type1 btnSaveReply" value="등록"></div><p class="type">0/500</p></div></form></div>';
        txt += '<div class="box-button-reply" style="padding-top:30px;text-align:right"><span class="btn-type4 btnSubReplyCancle" id="' + id + '"><button type="button">취소</button></span><div>';

        $('#' + addDivId).html(txt);
        $('#' + addDivId).show();
        $('#btnDiv_' + id).hide();
    });

    // 답글 입력 취소
    $(document).on('click', '.btnSubReplyCancle', function () {
        var id = $(this).attr('id');

        $('#SubReply_' + id).html('');
        $('#SubReply_' + id).hide();
        $('#btnDiv_' + id).show();
    });

    // 댓글 수정하기
    $(document).on('click', '.btnReplyEdit', function () {
        var txtContent = $(this).parent().parent().siblings('.txtReply').html();
        txtContent = txtContent.replaceAll('<br>', '\r\n');

        var id = $(this).attr('id');

        var txt = '<div class="box-reply-sub"><form id="frmUpdateReply"><div class="box-write-reply">';
        txt += '<input type="hidden" name="REPORTER_ID" value="' + reporterId + '" /><input type="hidden" name="SEQ" value="' + id + '"/>';
        txt += '<textarea class="txtContent" cols="30" rows="10" style="width:660px">' + txtContent + '</textarea>';
        txt += '<textarea name="CONTENT" class="hidContent" style="display:none;"></textarea>';
        txt += '<div class="inner-right"><input type="button" class="btn-type1 btnSaveReply" value="등록"></div><p class="type">0/500</p></div></form></div>';
        txt += '<div class="box-button-reply" style="padding-top:30px;text-align:right"><span class="btn-type4 btnUpdateCancle" id="' + id + '"><button type="button">취소</button></span><div>';


        $('#txt_' + id).hide();
        $('#btnDiv_' + id).hide();
        $('#updateDiv_' + id).html(txt);
        $('#updateDiv_' + id).show();
    });

    $(document).on('click', '.btnUpdateCancle', function () {
        var id = $(this).attr('id');

        $('#txt_' + id).show();
        $('#btnDiv_' + id).show();
        $('#updateDiv_' + id).html('');
        $('#updateDiv_' + id).hide();
    });

    // 댓글 삭제하기
    $(document).on('click', '.btnReplyDelete', function () {
        GetAWordToReporter.DeleteReply($(this).attr('id'));
    });

    // 네이버 팝업
    $(document).on('click', '#btnNaverLogin', function () {
        GetAWordToReporter.NaverPopup();
    });

    // 카카오 팝업
    $(document).on('click', '#btnKakaoLogin', function () {
        GetAWordToReporter.KakaoPopup();
    });

    // 페이스북 팝업
    $(document).on('click', '#btnFacebookLogin', function () {
        GetAWordToReporter.FacebookPopup();
    });
});