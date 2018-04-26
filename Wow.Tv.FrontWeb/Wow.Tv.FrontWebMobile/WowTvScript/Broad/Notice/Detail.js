

var NoticeDetail = {
    GoIndex: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/Notice/Index",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                cfShowBlock(true);
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                cfHideBlock();
            }
        });

        return false;
    }
}


$(document).ready(function () {

});


$("#btnList").click(function () {
    NoticeDetail.GoIndex();

    return false;
});
