
$(document).ready(function () {
    
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, $("#currentIndex").val(), $("#pageSize").val(), "PilotIndex.GetList"));

});





var PilotList = {
    OpenDetail: function (seq) {
        $("#divDetail").dialog({
            autoOpen: false,
            height: 500,
            width: 950,
            modal: true,
            open: function (event, ui) {
                $.ajax({
                    type: "POST",
                    url: "./Detail",
                    data: { "seq": seq },
                    success: function (data) {
                        $("#divDetail").html(data);
                    },
                    error: function (xhr, status, error) {
                        alert(error);

                        return false;
                    }
                });
            },
            close: function (event, ui) {
                $("#divDetail").html("");
                //PilotIndex.GetList($("#CurrentPageIndex").val());
            }

        }).dialog("open");

        return false;
    }
};


