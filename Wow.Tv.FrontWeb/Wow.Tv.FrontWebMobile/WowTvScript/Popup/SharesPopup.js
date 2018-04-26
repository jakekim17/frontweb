var SharesPopup = {
    SharesArt: function (sharesName) {

        if (sharesName == "facebook") {
            //Share.Facebook($("#txtURL").val(), $("#artImg").val());
            NewsFacebookShare($("#articleId").val());

        } else if (sharesName == "twitter") {

            Share.Twitter($("#txtURL").val(), $("#artTitle").val());

        } else if (sharesName == "kakaostory") {

            Share.kakaostory($("#txtURL").val(), $("#artTitle").val());

        } else if (sharesName == "blog") {

            Share.Naver($("#txtURL").val(), $("#artTitle").val());

        } else if (sharesName == "line") {

            Share.Line($("#txtURL").val(), $("#artTitle").val());

        } else if (sharesName == "kakaotalk") {

            Share.KakaoTalk($("#txtURL").val(), $("#artTitle").val());
        } 

        return false;
    }
};

$(document).ready(function () {
    
    // 주소 복사 설정
    var clipboard = new Clipboard('#btnClipboard');
    clipboard.on('success', function (e) {
        alert("주소가 복사되었습니다.");
    });
    clipboard.on('error', function (e) {
        alert("접속중인 기기및 브라우저에서는\n클립보드 복사를 지원하지 않습니다.\nURL을 길게 누르면 복사하실 수 있습니다.");
    });

    $(document).on('click', '.btnPopupClose', function () {
        $("#divSharesPopup").hide();
    });

    $(document).on('click', '#btnClipboard', function () {
        $('#btnClipboard').attr('data-clipboard-text', $('#txtURL').val());
    });
});