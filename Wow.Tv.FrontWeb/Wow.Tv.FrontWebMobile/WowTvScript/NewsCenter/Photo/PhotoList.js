var PhotoList = {

};

$(document).ready(function () {
    $('.photoTopList').click(function(){
        var idx = $(this).index();

        $('.photoList').removeClass('on');
        $('.photoList').eq(idx).addClass('on');

        $('.photoList').hide();
        $('.photoList').eq(idx).show();
    });

    $('#btnNext').click(function () {
        var idx = $('.photoList.on').index();
        var cnt = $('.photoList').length;

        if (idx != cnt - 1) {
            $('.photoList').removeClass('on');
            $('.photoList').eq(idx + 1).addClass('on');

            $('.photoList').hide();
            $('.photoList').eq(idx + 1).show();

            $('.photoTopList').removeClass('on');
            $('.photoTopList').eq(idx + 1).addClass('on');

            var translateX = 0;
            translateX = - $('.photoTopList').find('img').width() * parseInt(idx + 1) * 1.1;

            $('.box-photo-slider .swiper-wrapper').css({
                '-webkit-transform': 'translate3d(' + translateX + 'px, 0px, 0px)',
                '-ms-transform': 'translate3d(' + translateX + 'px, 0px, 0px)',
                'transform': 'translate3d(' + translateX + 'px, 0px, 0px)'
            });
        }
    });

    $('#btnPrev').click(function () {
        var idx = $('.photoList.on').index();

        if (idx != 0) {
            $('.photoList').removeClass('on');
            $('.photoList').eq(idx - 1).addClass('on');

            $('.photoList').hide();
            $('.photoList').eq(idx - 1).show();

            $('.photoTopList').removeClass('on');
            $('.photoTopList').eq(idx - 1).addClass('on');

            var translateX = 0;
            translateX = - $('.photoTopList').find('img').width() * parseInt(idx - 1) * 1.1;

            $('.box-photo-slider .swiper-wrapper').css({
                '-webkit-transform': 'translate3d(' + translateX + 'px, 0px, 0px)',
                '-ms-transform': 'translate3d(' + translateX + 'px, 0px, 0px)',
                'transform': 'translate3d(' + translateX + 'px, 0px, 0px)'
            });

        }
    });

    setTimeout(function () {
        $('#btnNext').removeClass('swiper-button-disabled');
        $('#btnPrev').removeClass('swiper-button-disabled');
    }, 500);
});
