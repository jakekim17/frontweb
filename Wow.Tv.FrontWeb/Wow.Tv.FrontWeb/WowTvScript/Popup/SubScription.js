var SubScription = {
    Save: function () {
        if ($('#EMAIL_1').val() == "" || $('#txtEmail').val() == "") {
            alert('이메일을 입력해주세요');
            return false;
        }

        if ($("#EMAIL_2 option:selected").val() == "") {
            $('#EMAIL').val($('#EMAIL_1').val() + "@" + $("#txtEmail").val());
        } else {
            $('#EMAIL').val($('#EMAIL_1').val() + "@" + $("#EMAIL_2 option:selected").val());
        }

        var isEmail = $('#EMAIL').val().isEmail();
        console.log('isEmail: ' + isEmail);

        if (!isEmail) {
            alert("올바른 E-mail 주소가 아닙니다. E-mail 주소를 확인하시고 다시 입력하여 주십시오.");
            return false;
        } else if ($('input[name=SUBSCRIPTION_YN]:checked').val() == "N" || typeof $('input[name=SUBSCRIPTION_YN]:checked').val() == "undefined") {
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
                        if (typeof $('#txtParam').val() != "") {
                            var locationURL = location.href;
                            locationURL = locationURL.replace('#none', '');
                            locationURL = locationURL.replace('#', '');

                            location.href = locationURL + $('#txtParam').val();

                        } else {
                            location.reload();
                        }
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
    $(".btnCloase").click(function () {
        $("#divSubScriptPopup").hide();
    });

    $('#btnSubScription').click(function () {
        SubScription.Save();
    });

    $('.radio').click(function () {
        radioBtn_Ck();
    });

    $(document).on('change', '#EMAIL_2', function () {
        $('#lbEmail2').text($("#EMAIL_2 option:selected").text());

        if ($("#EMAIL_2 option:selected").val() == "") {
            $('#txtEmail').attr('disabled', false);
            $('#txtEmail').val('');
        } else {
            $('#txtEmail').attr('disabled', true);
            $('#txtEmail').val($("#EMAIL_2 option:selected").text());
        }
    });
});
