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
        } else if ($('#contents').val() == "") {
            alert('내용을 입력하세요.');
            return false;
        }

        $('#hidContents').val($('#contents').val().replace(/(?:\r\n|\r|\n)/g, '<br/>'));

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/SendEmail",
            data: $('#frmSendEmail').serialize(),
            success: function (data) {
                if (data.isSuccess) {
                    alert("이메일 발송되었습니다.");
                    GetEmailForm.GoReporterDetail();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    GoReporterDetail: function () {
        $("#frm").attr("method", "POST");
        $("#frm").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + $('#SearchId').val());
        $("#frm").submit();
    }
};

$(document).ready(function () {
    $('body').addClass('news sub');

    $('#btnSendEmail').click(function () {
        GetEmailForm.Save();
    });

    $('#btnCancle').click(function () {
        GetEmailForm.GoReporterDetail();
    });

    $(document).on('keyup', '#contents', function () {
        var len = $(this).val().length;
        $(this).siblings('.byte').html(len + '/<span>500</spam>');

        if (len > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));
        }
    });
});