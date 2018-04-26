var Login = {
    Admin: function () {
        $.ajax({
            type: 'POST',
            url: "/Example/Login/AdminLogin",
            data: null,//frmCookie
            success: function (data, textStatus) {
                if (data.IsSuccess) { 
                    $("#txtAdmin").val();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}

$(document).ready(function () {

    $("#btnAdminLogin").click(function () {
        Login.Admin();
    });

});