
var ProgramIntroIndex = {
    OpenPopup: function (url) {
        if (url == "") {
            alert("준비된 페이지가 없습니다.");
        }
        else {
            window.open(url);
        }

        return false;
    },
    PartnerPin: function (parnterNickName, parnterNumber) {
        co.PopupScrap("Partner", parnterNickName, parnterNumber);

        var offset = $("body").offset();
        $('html, body').animate({ scrollTop: offset.top }, 400);

        return false;
    }
};


$(document).ready(function () {

});


