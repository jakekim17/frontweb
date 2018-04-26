
var NewsContentRigthRead = {

    GetFaceBookPosts: function () {

        var limitNum = 15;
        var fields = "message,permalink_url";
        var sUrl = String.format("https://graph.facebook.com/v2.10/153856151378770?fields=posts.limit({0}){{1}}&access_token={2}", limitNum, fields, FacebookUserToken);

        $.ajax({
            type: "GET",
            url: sUrl,
            //async: false,
            success: function (data) {

                var faceBookPosts = data.posts.data;

                var createdTime = "";
                var message = "";
                var linkUrl = "";
                var liPosts = "";
                var j = 1;

                for (i = 0; i < faceBookPosts.length; i++) {

                    message = faceBookPosts[i]["message"];
                    linkUrl = faceBookPosts[i]["permalink_url"];

                    if (typeof (message) != "undefined" && typeof (linkUrl) != "undefined" && j <= 12) {

                        liPosts += String.format("<li><a href='{0}' target=\"_blank\"><em>{1}</em>{2}</a></li>", linkUrl, j, message);
                        j++;
                    }
                }
                $("#ulFaceBookPosts").html(liPosts);
            },
            beforeSend: function () {
                //로딩 처리
            },
            complete: function () {
                //완료.
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("많이본 뉴스(오른쪽+AD) 에러..");

                var responseText = jQuery.parseJSON(jqXHR.responseText);
                if (typeof (responseText) != "undefined" && typeof (responseText.error.message) != "undefined") {
                    console.log(responseText.error.message);
                    $("#ulFaceBookPosts").html("<li>" + responseText.error.message + "</li>");
                }
            }
        });
    }
}

$(document).ready(function () {
    NewsContentRigthRead.GetFaceBookPosts();

    /* 많이본 기사 상세 탭 */
    $('.tab-area .tab-body .tab-cont').hide();
    $('.tab-area .tab-body .tab-cont:first').show();
    $('.tab-area .tabs > li').on('click', function () {
        $('.tab-area .tabs > li').removeClass('on');
        $(this).addClass('on');
        $('.tab-area .tab-body .tab-cont').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });

    /* 뉴스 최신기사 상세 - 카드뉴스 */
    $('.img-over-chann .img-area > .img-s img').on('mouseover', function () {
        var imgSrc = $(this).attr('src');
        $('.img-over-chann .img-area > .img-b img').attr('src', imgSrc);
    });

    // 티비텐 플러스
    $('.box-plus-type ul').bxSlider({
        minSlides: 1,
        slideWidth: 300,
        pager: true,
        touchEnabled: false,
        auto: false // 이미지 회전이 자동으로 됨
    });

    $('.img-silder ul').bxSlider({
        minSlides: 1,
        slideWidth: 300,
        pager: true,
        touchEnabled: false,
        auto: false // 이미지 회전이 자동으로 됨
    });

    // 가상화폐
    $('.bitcoin-slider > ul').bxSlider({
        minSlides: 1,
        slideWidth: 300,
        touchEnabled: false,
        auto: false // 이미지 회전이 자동으로 됨
    });

});
