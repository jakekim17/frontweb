var NewsMain = {
    ManySeeNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/ManySeeNews",
            data: {},
            success: function (data, textStatus) {
                $("#divManySeeNews").html(data);
                moresee_toggle();
            }
        });

        return false;
    },
    WeekReporter: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/WeekReporter",
            data: {},
            success: function (data) {
                $("#divOpinReporter").html(data);
            }
        });
    },
    Opinion: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/Opinion",
            data: {},
            success: function (data) {
                $("#divOpinReporter").html(data);
            }
        });
    },
    CardNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/CardNews",
            data: {},
            success: function (data) {
                $("#divCardNews").html(data);
            }
        });
    },
    PhotoNews: function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: "/NewsCenter/Main/PhotoNews",
            data: {},
            success: function (data) {
                $("#divPhotoNews").html(data);
            }
        });
    }
}

$(document).ready(function () {
    //많이본 뉴스
    NewsMain.ManySeeNews();

    //오피니언
    NewsMain.Opinion();

    //카드 뉴스
    NewsMain.CardNews();

    //이슈 갤러리
    NewsMain.PhotoNews();

    $('.photoNews').click(function () {
        NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
    });

    $('.newsList').click(function () {
        NewsCommon.GoNewsRead($(this).attr('id'));
    });

    $(document).on('click','#btnManyTotal', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyTotalArt').show();
        } else {
            if ($('.manyTotalArt').length > 5) {
                for (var i = 5; i < $('.manyTotalArt').length; i++) {
                    $('.manyTotalArt').eq(i).hide();
                }
            }
        }
    });

    $(document).on('click','#btnManyEntSpo', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyEntSpoArt').show();
        } else {
            if ($('.manyEntSpoArt').length > 5) {
                for (var i = 5; i < $('.manyEntSpoArt').length; i++) {
                    $('.manyEntSpoArt').eq(i).hide();
                }
            } 
        }
    });

    $(document).on('click', '#btnManyFacebook', function () {
        if ($(this).children().hasClass('on')) {
            $('.manyFacebookArt').show();
        } else {
            if ($('.manyFacebookArt').length > 5) {
                for (var i = 5; i < $('.manyFacebookArt').length; i++) {
                    $('.manyFacebookArt').eq(i).hide();
                }
            } 
        }
    });
});