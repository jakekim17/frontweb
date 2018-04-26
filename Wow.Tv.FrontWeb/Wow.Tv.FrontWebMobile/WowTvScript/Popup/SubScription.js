var SubScription = {
    Save: function () {

        if ($('#EMAIL1').val() == "" || $('#txtEmail2').val() == "") {
            alert('이메일 주소를 입력하세요.');
            return false;
        }

        if ($("#EMAIL_2 option:selected").val() == "") {
            $('#EMAIL').val($('#EMAIL_1').val() + "@" + $("#txtEmail2").val());
        } else {
            $('#EMAIL').val($('#EMAIL_1').val() + "@" + $("#EMAIL_2 option:selected").val());
        }

        var isEmail = $('#EMAIL').val().isEmail();

        if (!isEmail) {
            alert("올바른 E-mail 주소가 아닙니다. E-mail 주소를 확인하시고 다시 입력하여 주십시오.");
            return false;
        } else if ($('input[name=SUBSCRIPTION_YN]:checked').val() == "N") {
            alert('개인정보 수집 및 이용에 동의 하셔야 합니다.');
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/Popup/SaveSubScription",
            data: $('#frmSubScription').serialize(),
            success: function (data) {
                console.log(data);
                if (data.isSuccess == true) {
                    if (data.isSave == true) {
                        alert("구독되었습니다.");
                        location.reload();
                    } else {
                        alert('이미 구독하셨습니다.');
                    }
                } else {
                    alert(data.msg);
                }
            }
        });
    }
}

$(document).ready(function () {
    $(document).on("click",".btnClose",function () {
        $("#divSubScriptPopup").hide();
    });

    $(document).on("click",'#btnSubScription',function () {
        SubScription.Save();
    });

    $(document).on('change', '#EMAIL_2', function () {
        if ($("#EMAIL_2 option:selected").val() == "") {
            $('#txtEmail2').attr('disabled', false);
            $('#txtEmail2').val('');
        } else {
            $('#txtEmail2').attr('disabled', true);
            $('#txtEmail2').val($("#EMAIL_2 option:selected").text());
        }
    });
});
