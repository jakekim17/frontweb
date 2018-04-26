var NewsIndex = {
    SearchList: function (currentIndex, isAdd) {
        $('#currentIndex').val(currentIndex);

        if (typeof currentIndex != "undefined" && currentIndex > 0) {
            $('#Page').val(parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1);
        }

        if (typeof isAdd != "undefined" && isAdd) {
            $('#IsAppend').val('Y');
        } else {
            $('#IsAppend').val('N');
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/SearchList",
            data: $("#frmSearch").serialize(),
            async: false,
            success: function (data) {
                if (isAdd) {
                    $("#divContents").append(data);
                } else {
                    $("#divContents").html(data);
                }

                var newxtIndex = currentIndex + parseInt($('#PageSize').val())
                if (newxtIndex > parseInt($('#totalDataCount').val())) {
                    $('#currentIndex').val($('#totalDataCount').val());
                }
            }
        });
    }
};

$(document).ready(function () {
    NewsIndex.SearchList(0);

    $('#selSearchComp').change(function () {
        $('#SearchComp').val($(this).val());
        NewsIndex.SearchList(0);
    });

    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
        }

        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if (maxHeight <= currentScroll + 200) {
            var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#PageSize').val()) + 1;
            var CurrentPageCnt = parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1;

            if (CurrentPageCnt < totalPageCnt) {
                var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                if (nextIndex > $('#totalDataCount').val()) {
                    var minus = nextIndex - $('#totalDataCount').val();
                    nextIndex = nextIndex - minus;
                }
                NewsIndex.SearchList(nextIndex, true);
            }
        }
    });

    $(document).on('click', '.skiptranslate > .goog-te-gadget-simple', function () {
        if ($('.goog-te-menu-frame').hasClass('on')) {
            $('.goog-te-menu-frame').css('display', 'none');
            $('.goog-te-menu-frame').removeClass('on');
        } else {
            $('.goog-te-menu-frame').css('display', 'black');
            $('.goog-te-menu-frame').addClass('on');
        }
    });

    var language = getQuerystring('language');
    if (typeof language != "undefined") {
        if (!language.includes('/ko/')) {
            language = '/kr/' + language;
        }
        cookies = 'googtrans' + '=' + escape(language) + '; path=/ ';
        document.cookie = cookies;
    }
});