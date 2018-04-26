var EntSpoMain = {
    ManySeeNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/EntSpo/ManySeeNews",
            success: function (data, textStatus) {
                $("#divManySeeNews").html(data);
            }
        });
        return false;
    },
    CardNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/EntSpo/CardNews",
            success: function (data) {
                $("#divCardNews").html(data);
            }
        });
    },
    PhotoNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/EntSpo/PhotoNews",
            async: false,
            success: function (data) {
                $("#divPhotoNews").html(data);
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

    $(document).on('click', '.photoNewsList', function () {
       NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
    });

    $(document).on('click', '.newsList', function () {
        NewsCommon.GoNewsDetailView('entspo', '', '', $(this).attr('id'));
    });

    $('#btnTotalManySee').click(function () {
        if ($(this).hasClass('on')) {
            if ($('.manyNewsArt').length > 5) {
                for (var i = 5; i < $('.manyNewsArt').length; i++) {
                    $('.manyNewsArt').eq(i).hide();
                }
            }
            $(this).removeClass("on");
            ManySeeNewsScroll('#divManySeeNews');
        } else {
            $('.manyNewsArt').show();
        }
    });

    $('#btnEntList').click(function () {
        if ($(this).hasClass('on')) {
            if ($('.entListArt').length > 5) {
                for (var i = 5; i < $('.entListArt').length; i++) {
                    $('.entListArt').eq(i).hide();
                }
            }
            //$(this).removeClass('on');
            if ($(document).scrollTop() > 500) {
                ManySeeNewsScroll('#divEntList');
            }
            
        } else {
            $('.entListArt').show();
            //$(this).addClass('on');
        }
    });
});