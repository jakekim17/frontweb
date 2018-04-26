
$(document).ready(function () {


    $("#divDetail_btnModify").click(function () {
        PilotIndex.OpenEdit($("#seq").val());
        $(this).closest(".ui-dialog-content").dialog("close");

        return false;
    });

    $("#divDetail_btnClose").click(function () {
        $(this).closest(".ui-dialog-content").dialog("close");

        return false;
    });

    $("#divDetail_btnDelete").click(function () {
        if (confirm("삭제 하시겠습니까?") == true) {
            PilotDetail.Delete($("#seq").val());
            $(this).closest(".ui-dialog-content").dialog("close");
        }

        return false;
    });


});



var PilotDetail = {
    Delete: function (seq) {
        $.ajax({
            type: 'POST',
            url: "/Pilot/Delete",
            data: { "seq": seq},
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    //alert("성공");
                    PilotIndex.GetList(0);
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}