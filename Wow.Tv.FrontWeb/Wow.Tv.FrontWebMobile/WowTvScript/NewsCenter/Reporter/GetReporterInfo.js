var GetReporterInfo = {
    Save: function () {
        var form = $('#frmReporterInfo')[0];
        var formData = new FormData(form);

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Reporter/SaveReporterInfo",
            data: formData,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    GetReporterInfo.GoReporterDetail();
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

    $(document).on('keyup', '#txtIntro', function () {
        var len = $(this).val().length;
        $(this).siblings('.byte').html(len + '/<span>500</spam>');

        if (len > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
            $(this).val($(this).val().substring(0, 500));
        }
    });

    $('#uploadBtn').change(function () {
        var path = $(this).val();
        var splitPath = path.split('\\');
        $('.file-name').val(splitPath[(splitPath.length) - 1]);
    });

    $('#btnSaveInfo').click(function () {
        GetReporterInfo.Save();
    });

    $('#btnCancle').click(function () {
        GetReporterInfo.GoReporterDetail();
    });
});