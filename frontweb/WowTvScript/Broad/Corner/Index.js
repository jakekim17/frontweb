
var CornerIndex = {
    OpenVod: function (seq) {
        PopupPlayVod(seq);

        return false;
    },
    SearchList: function (currentIndex) {
        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $("#frmSearch").find("[name='currentIndex']").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/Corner/SearchList",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    }
};


$(document).ready(function () {

    CornerIndex.SearchList(0);

});
