var LandMain = {
    LandList: function (wowCode) {

        var menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;

        if (wowCode == "W010") {
            menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;
        }
        else if (wowCode == "W065") {
            menuSeq = MENU_SEQ_DEFINE.LAND.LOCALSELF;
        }
        //분양 클로즈업
        else if (wowCode == "W025") {
            menuSeq = MENU_SEQ_DEFINE.LAND.CLOSEUP;
        }
        //부동산 투자의 맥
        else if (wowCode == "W066") {
            menuSeq = MENU_SEQ_DEFINE.LAND.INVESTMENT;
        }
        //부동산 컨설팅
        else if (wowCode == "W066") {
            menuSeq = MENU_SEQ_DEFINE.LAND.CONSULTING;
        }

        var sUrl = String.format("/NewsCenter/Land/List?menuSeq={0}&subMenu={1}&wowcode={2}", menuSeq, 'land', wowCode);
        location.href = sUrl;
    },
    CardNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Land/CardNews",
            success: function (data) {
                $("#ulCardNews").html(data);
            }
        });
    },
    PhotoNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Land/PhotoNews",
            async: false,
            success: function (data) {
                $("#divPhotoNews").html(data);
            }
        });
    },
    GetAdBanner: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Land/GetAdBanner",
            async: false,
            success: function (data) {
                $("#divAdBanner").html(data);
            }
        });
    }
}

$(document).ready(function () {

    // AD
    LandMain.GetAdBanner();

    //카드 뉴스
    LandMain.CardNews();

    //이슈 갤러리
    LandMain.PhotoNews();

    $('.tabArea').click(function () {
        var id = $(this).attr('id');
        var splitId = id.split('_')[1];

        $('.bodyArea').hide();
        $('#body_' + splitId).show();
    });
});