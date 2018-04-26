var Xecure = {
    Encrypt : function () {
        $.ajax({
            type: 'POST',
            url: "/Example/Xecure/Encrypt",
            data: $("#frmXecure").serialize(),
            success: function (data, textStatus) {
                //if (data.IsSuccess) { 임시 주석
                    $("#txtEncrypt").val(data.EncryptValue);
                //}
                //else {
                //    alert(data.Msg);
                //}
            }
        });

        return false;
    },
    Decrypt : function () {
        $.ajax({
            type: 'POST',
            url: "/Example/Xecure/Decrypt",
            data: $("#frmXecure").serialize(),
            success: function (data, textStatus) {
                //if (data.IsSuccess) {
                    $("#txtDecrypt").val(data.DecryptValue);
                //}
                //else {
                //    alert(data.Msg);
                //}
            }
        });

        return false;
    }
}

$(document).ready(function() {

    $("#btnEncrypt").click(function () {
        Xecure.Encrypt();
    });

    $("#btnDecrypt").click(function () {
        Xecure.Decrypt();
    });
});