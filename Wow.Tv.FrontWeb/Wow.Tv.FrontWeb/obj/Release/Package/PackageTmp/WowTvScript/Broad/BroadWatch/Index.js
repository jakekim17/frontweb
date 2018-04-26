
var BroadWatchIndex = {
    BindPlayInfoPartial: function (broadWatchNumber, isScroll) {
        //$("#divPlayInfo").html("<div style='text-align:center;'><img src='/content/images/bigwaiting.gif' width='200px;' /></div>");

        $.ajax({
            type: 'post',
            url: "/Broad/BroadWatch/PlayInfo",
            data: { "broadWatchNumber": broadWatchNumber },
            success: function (data, textstatus) {
                $("#divPlayInfo").html(data);

                if (isScroll == true) {
                    var offset = $("#divPlayInfo").offset();
                    $('html, body').animate({ scrollTop: offset.top }, 400);
                }

                var ThumNailUrl = $('.sub-visual-area').css('background-image').replace(/(?:^url\(["']?|["']?\)$)/g, "");
                var txtMeta = '<meta property="og:title" content="' + $('#broadWatchtitle').text() + '"/>';
                txtMeta += '<meta property="og:description" content="' + $('#broadWathTxt').text().substr(0, 200) + '">';
                txtMeta += '<meta property="og:image" content="' + ThumNailUrl + '" />';
                $('head').append(txtMeta);
            }
        });

        return false;
    },
    SearchList: function (currentIndex, callBack) {
        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $("#frmSearch").find("[name='currentIndex']").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/BroadWatch/SearchList",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);

                if (callBack != null) {
                    callBack();
                }
            }
        });

        return false;
    },
    BindBanner: function (ingYn) {
        $("#divBanner").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/ProgramMain/Banner",
            data: { "programCode": $("#hidProgramCode").val() },
            success: function (data, textStatus) {
                $("#divBanner").html(data);
            }
        });

        return false;
    }
};


$(document).ready(function () {
    
    if ($("#BroadWatch_hidBroadWatchNumber").val() != null && $("#BroadWatch_hidBroadWatchNumber").val() != "" && $("#BroadWatch_hidBroadWatchNumber").val() > "0") {
        BroadWatchIndex.BindPlayInfoPartial($("#BroadWatch_hidBroadWatchNumber").val());
        BroadWatchIndex.SearchList(0);
    }
    else {
        BroadWatchIndex.SearchList(0, function () {
            $("#divList").find(".img-area").first().find("a").click();
        });
    }

    BroadWatchIndex.BindBanner();

});



