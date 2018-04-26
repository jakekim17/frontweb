var PopupScrap = {
    Save: function () {

        $.ajax({
            type: "POST",
            url: "/popup/SaveScrap",
            data: { "PinType": pinType, "ScrapId": scrapId },
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

    $(".pop-btn").click(function () {
        $('.popup-area').fadeOut();
    });

    $("#btnCancel").click(function () {
        $('.popup-area').fadeOut();
    });

    $("#btnPinSave").click(function () {
        PopupScrap.Save();
    });

});