$(document).ready(function () {

    $("#btnExit").click(function () {
        $("#divPopupCatagory").hide();
    });

    $("#btnCancle").click(function () {
        $("#divPopupCatagory").hide();
    });

    $("#btnPinSave").click(function () {
        PopupNewsScrap.Save();
    });

    $("#btnFolderAdd").click(function () {
        $("#txtFolderName").css("display", "");
    });


});

var PopupNewsScrap = {

    Save: function () {
        var locationURL = window.location.pathname + window.location.search;

        $.ajax({
            type: "POST",
            url: "/MyPin/Scrap/SaveScrapNews",
            data: {
                "Url": locationURL.replace(/&amp;/g, '&'),
                "Name": name,
                "ScrapId": scrapId,
                "bSeq": $(":input[name=MSEQ]:checked").val()
            },
            success: function (data) {
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
