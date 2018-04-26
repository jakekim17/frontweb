
$(document).ready(function () {


    $("#btnModify").click(function () {
        PilotDetail.GoEdit();

        return false;
    });

    $("#btnList").click(function () {
        PilotDetail.GoIndex();

        return false;
    });

    $("#btnDelete").click(function () {
        if (confirm("삭제 하시겠습니까?") == true) {
            PilotDetail.Delete($("#seq").val());
        }

        return false;
    });


});



var PilotDetail = {
    GoEdit: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Edit");
        $("#frmSearch").submit();

        return false;
    },
    GoIndex: function () {
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Index");
        $("#frmSearch").submit();

        return false;
    },
    Delete: function (seq) {
        $.ajax({
            type: 'POST',
            url: "/Pilot/Delete",
            data: { "seq": seq},
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    //alert("성공");
                    PilotDetail.GoIndex();
                }
                else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}