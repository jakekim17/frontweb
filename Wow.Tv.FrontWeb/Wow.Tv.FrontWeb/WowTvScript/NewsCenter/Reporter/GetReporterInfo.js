var GetReporterInfo = {
    Save: function () {
        $('#hidTextArea').val($('#txtIntro').val().replaceAll(/\n/g, '<br>'));

        var form = $('#frmReporterInfo')[0];
        var formData = new FormData(form);

        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/SaveReporterInfo",
            data: formData,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.isSuccess == true) {
                    alert(CommonMsg.SaveAfterMsg);
                    $('.btnClose').click();
                    ReporterDetail.Reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    readImgURL: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#reporterImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

$(document).ready(function () {
    $(".btnClose").click(function () {
        $("#divReporterPopup").hide();
        $('#divReporterPopup').html('');
    });

    $('#lenCheck').text($('#txtIntro').val().length + '/500');

    $('#btnSaveInfo').click(function () {
        GetReporterInfo.Save();
    });

    $('.checkbox').click(function () {
        checkBox_Ck();
    });

    $('#uploadBtn').change(function () {
        var path = $(this).val();
        var splitPath = path.split('\\');
        $('.file-name').val(splitPath[(splitPath.length) - 1]);

        GetReporterInfo.readImgURL(this);
    });

    $(document).on('keyup', '#txtIntro', function () {
        var len = $(this).val().length;
        $('#lenCheck').text(len + '/500');

        if (len > 500) {
            alert("500 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. "); 
            $(this).val($(this).val().substring(0, 500));
        }
    });
});

