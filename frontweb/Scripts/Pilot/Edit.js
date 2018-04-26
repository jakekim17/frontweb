
$(document).ready(function () {


    $("#btnSave").click(function () {
        PilotEdit.Save();

        return false;
    });
    $("#btnList").click(function () {
        PilotEdit.GoIndex();

        return false;
    });

    SmartEditor.Create();

});


var PilotEdit = {
    Save: function () {
        SmartEditor.SaveData();
        $.ajax({
            type: 'POST',
            url: "/Pilot/Save",
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    //alert("성공");
                    PilotEdit.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Index");
        $("#frmSearch").submit();

        return false;
    }
}