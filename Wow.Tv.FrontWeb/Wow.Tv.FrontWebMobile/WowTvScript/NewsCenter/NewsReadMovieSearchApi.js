
var contentCount = 0;
var movieContentTag = "";

var NewsReadMovieSearchApi = {
    NewsCount: 0,
    LastWrapDiv: null,
    GetTvMovieKeyWord: function (num) {
        SearchApi.GetTvMovieKeyWord(num, "NEWS", NewsReadMovieSearchApi.GetTvMovieContentByKeyWord);

        return false;
    },
    GetTvMovieContentByKeyWord: function (keyWrodList) {
        SearchApi.GetTvMovieContentByKeyWord(0, 11, "NEWS", keyWrodList, function (resultDocumentList) {


            if (resultDocumentList != null) {
                var tempTag = "";
                $.each(resultDocumentList, function (index, item) {

                    if (contentCount < 10) {
                        contentCount++;

                        //movieContentTag += NewsReadMovieSearchApi.MakeTagItem(item);
                        tempTag = NewsReadMovieSearchApi.MakeTagItem(item);
                        NewsReadMovieSearchApi.BindContent(tempTag);
                    }
                    //else if (contentCount == 10) {
                    //    contentCount++;

                    //    movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                    //}
                    //else if (contentCount == 11) {
                    //    contentCount++;

                    //    movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                    //}
                });
            }


            if (contentCount < 10) {
                SearchApi.GetTvMovieContentByDay(0, 11, "NEWS", function (resultDocumentList) {

                    $.each(resultDocumentList, function (index, item) {

                        if (contentCount < 10) {
                            contentCount++;

                            //movieContentTag += NewsReadMovieSearchApi.MakeTagItem(item);
                            tempTag = NewsReadMovieSearchApi.MakeTagItem(item);
                            NewsReadMovieSearchApi.BindContent(tempTag);
                        }
                        //else if (contentCount == 10) {
                        //    contentCount++;

                        //    movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                        //}
                        //else if (contentCount == 11) {
                        //    contentCount++;

                        //    movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                        //}
                    });

                    //NewsReadMovieSearchApi.BindContent(movieContentTag);
                });
            }
            else {
                //NewsReadMovieSearchApi.BindContent(movieContentTag);
            }
            visual_slider();
        });

        return false;
    },
    MakeTagItem: function (item) {
        var tagItem = "";

        //tagItem += "<li>";

        $.ajax({
            type: 'POST',
            url: "/Common/GetNewsImageUrl",
            async: false,
            data: {
                "thumbnailType": "16B"
                , "thumbnailFile": item.THUMBNAIL_FILENM
                , "vodNum": item.ID
                , "imageDir": item.IMGDIR
                , "imagFile": item.THUMBNAIL_TYPE1
                , "artDate": item.DATE
                , "gubunName": item.GUBUN
            },
            success: function (data) {
                tagItem += "<div class=\"img-cont\">";
                tagItem += "    <a href=\"javascript:void(0)\" onclick=\"return NewsReadMovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\" class=\"box-img-01\">";
                tagItem += "        <div class=\"img-area\">";
                tagItem += "            <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"photo\">";
                tagItem += "            " + data.GubunIcon;
                tagItem += "            <span class=\"icon-play\"></span>";
                tagItem += "        </div>";
                tagItem += "        <p class=\"txt\">" + item.TITLE + "</p>";
                tagItem += "    </a>";
                tagItem += "</div>";
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        //tagItem += "</li>";

        return tagItem;
    },
    MakeTagAddContentItem: function (id, item) {
        var tagItem = "";


        //$.ajax({
        //    type: 'POST',
        //    url: "/Common/GetNewsImageUrl",
        //    async: false,
        //    data: {
        //        "thumbnailType": "16B"
        //        , "thumbnailFile": item.THUMBNAIL_FILENM
        //        , "vodNum": item.ID
        //        , "imageDir": item.IMGDIR
        //        , "imagFile": item.THUMBNAIL_TYPE1
        //        , "artDate": item.DATE
        //        , "gubunName": item.GUBUN
        //    },
        //    success: function (data) {
        //        tagItem += "<a href=\"#\" onclick=\"return NewsReadMovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\">";
        //        tagItem += "    <span class=\"box-icon type07\">AD</span>";
        //        tagItem += "    <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
        //        tagItem += "    <span class=\"cont\">" + item.TITLE + "</span>";
        //        tagItem += "</a>";
        //    },
        //    error: function (e) {
        //        console.log(JSON.stringify(e));
        //    }
        //});

        //$("#" + id).html(tagItem);

        return false;
    },
    BindContent: function (tag) {
        //$("#ulNewsReadMovieRefContent").html(tag);
        if (NewsReadMovieSearchApi.NewsCount == 0 || NewsReadMovieSearchApi.NewsCount % 3 == 0) {
            var lastWrapDiv = "";
            lastWrapDiv += "<div class=\"swiper-slide\">";
            lastWrapDiv += "</div>";
            $("#ulNewsReadMovieRefContent").append(lastWrapDiv);
            NewsReadMovieSearchApi.LastWrapDiv = $("#ulNewsReadMovieRefContent").children("div").last();
        }

        NewsReadMovieSearchApi.LastWrapDiv.append(tag);
        NewsReadMovieSearchApi.NewsCount++;

        //$('.arti-video.full ul').bxSlider({
        //    minSlides: 1,
        //    maxSlides: 4,
        //    slideWidth: 167,
        //    slideMargin: 20,
        //    arrows: false,
        //    pager: false,
        //    touchEnabled: false
        //});
    },
    GoNewsRead: function (articleId) {
        NewsCommon.GoNewsRead(articleId);
        return false;
    }
}


$(document).ready(function () {

    if ($("#hidNewsReadMovieVodNum").val() != null && $("#hidNewsReadMovieVodNum").val() != "" && $("#hidNewsReadMovieVodNum").val() > 0) {
        NewsReadMovieSearchApi.GetTvMovieKeyWord($("#hidNewsReadMovieVodNum").val());
    }

});
