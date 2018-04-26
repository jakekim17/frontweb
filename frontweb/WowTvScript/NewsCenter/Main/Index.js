
var NewsMain = {

    Search: function () {

        var searchText = $("#searchTerm").val();

        if (searchText.trim().length == 0) {

            alert("검색어를 입력하세요.");
        }
        else {
            $("#totalSearchForm").submit();
        }      
    },

    ManySeeNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/ManySeeNews",
            data: {},
            success: function (data, textStatus) {    
                $("#divManySeeNews").html(data);
            }
        });

        return false;
    },

    Opinion: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/Opinion",
            data: {},
            success: function (data) {
                $("#UlOpinion").html(data);
            }
        });
    },

    WeekReporter: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/WeekReporter",
            data: {},
            success: function (data) {
                $("#UlWeekReporter").html(data);
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
    SectionNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/SectionNews",
            data: {},
            success: function (data) {
                $("#UlSectionNews").html(data);
            }
        });
    },
    HotNews: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Main/HotNews",
            data: {},
            success: function (data) {
                $("#h2HotNews").after(data);
            }
        });
    },
    PhotoNews: function () {
        console.log('PhotoNews1');
        $.ajax({
            async: false,
            type: 'POST',
            url: "/NewsCenter/Main/PhotoNews",
            data: {},
            success: function (data) {
                $("#divPhotoNews").html(data);
                //bottom_slider();
                if ($("#divPhotoNews").find("li").length > 0) {
                    PhotoNewsSlider('photoNewsSlider');
                }
            }
        });
    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //많이본 뉴스
    NewsMain.ManySeeNews();

    //오피니언
    NewsMain.Opinion();

    //금주의 기자
    NewsMain.WeekReporter();

    //카드 뉴스
    NewsMain.CardNews();

    //섹션 뉴스
    NewsMain.SectionNews();

    //핫한 뉴스
    NewsMain.HotNews();

    //이슈 갤러리
    NewsMain.PhotoNews();

    $('.btnGoNewsPhotoView').click(function () {
        if ($(this).hasClass('onPhoto')) {
            NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
        } else {
            $('.btnGoNewsPhotoView').removeClass('onPhoto');
            $(this).addClass('onPhoto');
        }
    });

});


