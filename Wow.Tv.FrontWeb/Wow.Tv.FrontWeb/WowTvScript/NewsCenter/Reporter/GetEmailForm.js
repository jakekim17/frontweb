var GetEmailForm = {
    Save: function () {
        if ($('input[name=UserName]').val() == "") {
            alert('이름/아이디를 입력하세요.');
            return false;
        } else if ($('input[name=UserEmail]').val() == "") {
            alert('이메일을 입력하세요.');
            return false;
        } else if ($('input[name=Title]').val() == "") {
            alert('제목을 입력하세요.');
            return false;
        } else if ($('#textEmailCt').val() == "") {
            alert('내용을 입력하세요.');
            return false;
        }

        $('#hidtextEmailCt').val($('#textEmailCt').val().replace(/(?:\r\n|\r|\n)/g, '<br/>'));

        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/SendEmail",
            data: $('#frmSendEmail').serialize(),
            success: function (data) {
                if (data.isSuccess) {
                    alert("이메일 발송되었습니다.");
                    $('.btnClose').click();
                } else {
                    alert(data.msg);
                }
            }
        });
    }
}

$(document).ready(function () {
    $(".btnClose").click(function () {
        $("#divEmailPopup").hide();
        $('#divEmailPopup').html('');
    });

    $('#btnSendEmail').click(function () {
        GetEmailForm.Save();
    });
});

