var EntSpoMain = {
    ManySeeNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/EntSpo/ManySeeNews",
            async: false,
            success: function (data, textStatus) {
                $("#divManySeeNews").html(data);
            }
        });
        return false;
    },
    CardNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/EntSpo/CardNews",
            success: function (data) {
                $("#divCardNews").html(data);
            }
        });
    },
    PhotoNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/EntSpo/PhotoNews",
            async: false,
            success: function (data) {
                $("#divPhotoNews").html(data);
                if ($("#divPhotoNews").find("li").length > 0) {
                    PhotoNewsSlider('photoNewsSlider');
                }
            }
        });
    },
    HotNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/EntSpo/HotNews",
            success: function (data) {
                $("#h2HotNews").after(data);
            }
        });
    }
}


$(document).ready(function () {

    //많이 본 뉴스
    EntSpoMain.ManySeeNews();

    //카드 뉴스
    EntSpoMain.CardNews();

    //이슈 갤러리
    EntSpoMain.PhotoNews();

    //핫한 뉴스
    EntSpoMain.HotNews();


    $(document).on('click','.hotNewsList',function () {
        NewsCommon.GoNewsRead($(this).attr('id'));
    });

    $(document).on('click', '.photoNewsList', function () {
        if ($(this).hasClass('onPhoto')) {
            NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
        } else {
            $('.photoNewsList').removeClass('onPhoto');
            $(this).addClass('onPhoto');
        }
    });
    
});