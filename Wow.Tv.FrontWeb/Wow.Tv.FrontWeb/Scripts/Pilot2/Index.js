
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
        PilotIndex.OpenEdit(0);

        return false;
    });


    $("#btnSearch").click();
});





var PilotIndex = {
    GetList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Pilot2/List",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    OpenEdit: function (seq) {
        $("#divEdit").dialog({
            autoOpen: false,
            height: 500,
            width: 950,
            modal: true,
            open: function (event, ui) {
                $.ajax({
                    type: "POST",
                    url: "./Edit",
                    data: { "seq": seq},
                    success: function (data) {
                        $("#divEdit").html(data);
                    },
                    error: function (xhr, status, error) {
                        alert(error);

                        return false;
                    }
                });
            },
            close: function (event, ui) {
                $("#divEdit").html("");
                PilotIndex.GetList($("#currentIndex").val());
            }

        }).dialog("open");

        return false;
    }
};


