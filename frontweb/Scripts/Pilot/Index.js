
$(document).ready(function () {

    $("#btnSearch").click(function () {
        PilotIndex.GetList(0);

        return false;
    });


    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });
    $("#btnCreate").click(function () {
        PilotIndex.GoEdit(0);

        return false;
    });
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "PilotIndex.GetList"));
});





var PilotIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Index");
        $("#frmSearch").submit();

        return false;
    },
    GoEdit: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Edit");
        $("#frmSearch").submit();

        return false;
    },
    GoDetail: function (seq) {
        $("#seq").val(seq);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Pilot/Detail");
        $("#frmSearch").submit();

        return false;
    }
};


