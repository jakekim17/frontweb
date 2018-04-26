var GetAWordToReporter = {
    SaveReply: function (elementId) {
        var textLen = $('#' + elementId).find('.txtContent').val().length;
        var txt = $('#' + elementId).find('.txtContent').val().replace(/\s|　/gi, '');

        if (txt == "") {
            alert("내용을 입력하세요.");
            return false;
        }
        if (textLen > 500) {
            alert("내용은 500 글자 이상 입력할 수 없습니다.");
            $('#' + elementId).find('.txtContent').siblings('.byte').html(textLen + '/<span>500</span>');

            return false;
        }
        
        $('#' + elementId).find('.hidContent').val($('#' + elementId).find('.txtContent').val().replaceAll(/\n/g, '<br>'));

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/SaveAWordToReporter",
            data: $('#' + elementId).serialize(),
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    ReporterDetail.GetAWordToReporter(0);
                }
            }
        });
    },
    DeleteReply: function (id) {
        if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
            $.ajax({
                type: "POST",
                url: "/NewsCenter/Reporter/DeleteAWordToReporter",
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
    $(document).on('keyup', '.txtContent', function () {
        var len = $(this).val().length;
        $(this).siblings('.byte').html(len + '/<span>500</span>');

        if (len > 500) {
            alert("내용은 500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));

            len = $(this).val().length;
            $(this).siblings('.byte').html(len + '/<span>500</span>');
        }
    });

    //textbox 클릭 시 비로그인 경우 처리
    $(document).on('click', '.txtContent', function () {
        if (!IsLogin()&& !IsEasyLogin()) {
            LoginConfirm();
        }
    });

    $(document).on('click', '.btnSaveReply', function () {
        if (!IsLogin() && !IsEasyLogin()) {
            LoginConfirm();
        } else {
            var frmid = $(this).parent().parent().attr('id');
            GetAWordToReporter.SaveReply(frmid);
        }
    });

    $(document).on('click', '.btnSubReply', function () {
        var id = $(this).attr('id');
        $('#divSubReply_' + id).show();
        $('#btnArea_' + id).hide();
    });

    $(document).on('click', '.btnSubReplyCancle', function () {
        var id = $(this).attr('id');

        $('#divSubReply_' + id).find('.txtContent').val('');
        $('#divSubReply_' + id).find('.byte').val('0/<span>500</span>');
        $('#divSubReply_' + id).hide();
        $('#btnArea_' + id).show();
    });

    $(document).on('click', '.btnReplyEdit', function () {
        var id = $(this).attr('id');
        var txtContent = $('#txt_' + id).html();
        txtContent = txtContent.replaceAll('<br>', '\r\n');
        
        var txt = '<div><form id= "frm_' + id + '" ><input type="hidden" name="REPORTER_ID" value="' + reporterId + '" />';
        txt += '<input type="hidden" name="SEQ" value="' + id + '" />';
        txt += '<textarea placeholder="내용을 입력하세요." class="txtContent">' + txtContent + '</textarea>';
        txt += '<textarea name="CONTENT" class="hidContent" style="display:none;"></textarea>';
        txt += '<div class="byte">0/<span>500</span></div><div class="btn-area position"><a href="javascript:void(0);" class="btn type02 btnSaveReply" style="width:44px;">등록</a>';
        txt += '<a href= "javascript:void(0);" class="btn type02 btnUpdateCancle" id="' + id + '" style="width:44px;margin-left:5px;">취소</a></div></form ></div>';

        $('#txt_' + id).hide();
        $('#btnArea_' + id).hide();
        $('#updateDiv_' + id).html(txt);
        $('#updateDiv_' + id).show();
        $('#data_' + id).hide();
    });

    $(document).on('click', '.btnUpdateCancle', function () {
        var id = $(this).attr('id');

        $('#txt_' + id).show();
        $('#btnArea_' + id).show();
        $('#updateDiv_' + id).html('');
        $('#updateDiv_' + id).hide();
        $('#data_' + id).show();
    });


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

    $(document).on('click', '#btnHankyung', function () {
        var locationURL = location.href;

        if (locationURL.indexOf('searchId') > -1) {
            GoLogin();
        } else {
            GoLogin('&SearchId=' + reporterId);
        }
    });
});

