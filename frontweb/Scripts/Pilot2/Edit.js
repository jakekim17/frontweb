
$(document).ready(function () {


    $("#btnSave").click(function () {
        var obj = $(this).closest(".ui-dialog-content");
        PilotEdit.Save(obj);

        return false;
    });
    $("#btnClose").click(function () {
        $(this).closest(".ui-dialog-content").dialog("close");

        return false;
    });

    SmartEditor.Create();

});


var PilotEdit = {
    Save: function (obj) {
        SmartEditor.SaveData();
        $.ajax({
            type: 'POST',
            url: "/Pilot2/Save",
            data: $("#frmSave").serialize(),
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    //alert("성공");
                    $(obj).dialog("close");
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}