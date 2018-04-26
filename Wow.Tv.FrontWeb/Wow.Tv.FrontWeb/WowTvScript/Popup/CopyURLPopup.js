var copyPopup = {
    CopyURL: function () {

        var agent = navigator.userAgent.toLowerCase();
        
        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
            var url = $("#txtURL").val();
            window.clipboardData.setData('Text', url);
            alert("주소가 복사되었습니다. 원하는 곳에 붙여넣기(Ctrl + V) 해주세요.");
            $("#divPopupLinkCopy").hide();
        } else {
            var copyTextarea = document.createElement("textarea");

            copyTextarea.value = $("#txtURL").val();
            document.body.appendChild(copyTextarea);

            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                if (successful) alert("주소가 복사되었습니다. 원하는 곳에 붙여넣기(Ctrl + V) 해주세요."); $("#divPopupLinkCopy").hide();
            } catch (err) {
                console.log('Unable to copy');
            }
            document.body.removeChild(copyTextarea);
        }

    }
}


$(document).ready(function () {

    $(".btnCloase, .pop-close-btn").click(function () {
        $("#divPopupLinkCopy").hide();
    });

    //URL 복사하기 버튼 
    $("#copyBtn").on("click", function () {
        copyPopup.CopyURL();
    });

});
