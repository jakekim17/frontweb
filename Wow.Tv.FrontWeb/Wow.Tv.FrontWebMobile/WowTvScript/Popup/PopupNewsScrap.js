
var PopupNewsScrap = {
    Save: function () {
        var locationURL = window.location.pathname + window.location.search;

        $.ajax({
            type: "POST",
            url: "/popup/SaveScrapNews",
            data: {
                "Url": locationURL.replace(/&amp;/g, '&'),
                "Name": name,
                "ScrapId": scrapId,
                "bSeq": $(":input[name=MSEQ]:checked").val()
            },
            success: function (data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    $('.popup-area').fadeOut();
                } else {
                    alert(data.Msg);
                }
            }
        });

        return false;
    }
}

$(document).ready(function () {
    $("#btnCancel").click(function () {
        $('.popup-area').fadeOut();
    });

    $("#btnPinSave").click(function () {
        PopupNewsScrap.Save();
    });

    $(".pop-btn").click(function () {
        $('.popup-area').fadeOut();
    });
});
