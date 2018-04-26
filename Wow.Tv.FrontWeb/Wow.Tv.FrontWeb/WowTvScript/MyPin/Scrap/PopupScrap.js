$(document).ready(function () {

    $("#btnExit").click(function () {
        $("#divPopupCatagory").hide();
    });

    $("#btnCancle").click(function () {
        $("#divPopupCatagory").hide();
    });
    

    $("#btnFinSave").click(function () {
        PopupScrap.Save();
    });

});

var PopupScrap = {
    Save: function() {

        $.ajax({
            type: "POST",
            url: "/MyPin/Scrap/SaveScrap",
            data: { "PinType": pinType, "ScrapId": scrapId },
            success: function(data) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    $("#divPopupCatagory").hide();
                    //PopupScrap.BindNewsPin("divTabContent");
                } else {
                    alert(data.Msg);
                }
            }
        });
        return false;
    }
}
