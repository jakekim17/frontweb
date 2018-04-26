var serviceUrl = "http://news.wowtv.co.kr";
var contentCount = 0;
var movieContentTag = "";

var NewsReadMovieSearchApi = {
    GetTvMovieKeyWord: function (num) {
        SearchApi.GetTvMovieKeyWord(num, "NEWS", NewsReadMovieSearchApi.GetTvMovieContentByKeyWord);

        return false;
    },
    GetTvMovieContentByKeyWord: function (keyWrodList) {
        SearchApi.GetTvMovieContentByKeyWord(0, 11, "NEWS", keyWrodList, function (resultDocumentList) {


            if (resultDocumentList != null) {
                $.each(resultDocumentList, function (index, item) {

                    if (contentCount < 10) {
                        contentCount++;

                        movieContentTag += NewsReadMovieSearchApi.MakeTagItem(item);
                    }
                    else if (contentCount == 10) {
                        contentCount++;

                        movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                    }
                    else if (contentCount == 11) {
                        contentCount++;

                        movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                    }
                });
            }


            if (contentCount < 10) {
                SearchApi.GetTvMovieContentByDay(0, 11, "NEWS", function (resultDocumentList) {

                    $.each(resultDocumentList, function (index, item) {

                        if (contentCount < 10) {
                            contentCount++;

                            movieContentTag += NewsReadMovieSearchApi.MakeTagItem(item);
                        }
                        else if (contentCount == 10) {
                            contentCount++;

                            movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                        }
                        else if (contentCount == 11) {
                            contentCount++;

                            movieContentTag += NewsReadMovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                        }
                    });

                    NewsReadMovieSearchApi.BindContent(movieContentTag);
                });
            }
            else {
                NewsReadMovieSearchApi.BindContent(movieContentTag);
            }
        });

        return false;
    },
    MakeTagItem: function (item) {
        var tagItem = "";

        tagItem += "<li>";

        $.ajax({
            type: 'POST',
            url: serviceUrl + "/Common/GetNewsImageUrl",
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
                tagItem += "    <a href=\"#\" onclick=\"return NewsReadMovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\">";
                tagItem += "        <div>";
                tagItem += "            <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\" />";
                tagItem += "            <span class=\"icon-play medium\"></span>";
                tagItem += "        </div>";
                tagItem += "        <p>" + item.TITLE + "</p>";
                tagItem += "    </a>";
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        tagItem += "</li>";

        return tagItem;
    },
    MakeTagAddContentItem: function (id, item) {
        var tagItem = "";

        $.ajax({
            type: 'post',
            url: serviceUrl + "/Common/GetNewsImageUrl",
            async: false,
            data: {
                "thumbnailtype": "16b"
                , "thumbnailfile": item.thumbnail_filenm
                , "vodnum": item.id
                , "imagedir": item.imgdir
                , "imagfile": item.thumbnail_type1
                , "artdate": item.date
                , "gubunname": item.gubun
            },
            success: function (data) {
                tagItem += "<a href=\"#\" onclick=\"return NewsReadMovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\">";
                //tagitem += "    <span class=\"box-icon type07\">ad</span>";
                tagItem += "    <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                tagItem += "    <span class=\"cont\">" + item.TITLE + "</span>";
                tagItem += "</a>";
            },
            error: function (e) {
                console.log(json.stringify(e));
            }
        });

        $("#" + id).html(tagItem);

        return false;
    },
    BindContent: function (tag) {
        $("#ulNewsReadMovieRefContent").html(tag);

        $('.arti-video.full #ulNewsReadMovieRefContent').bxSlider({
            minSlides: 1,
            maxSlides: 4,
            slideWidth: 167,
            slideMargin: 20,
            arrows: false,
            pager: false,
            touchEnabled: false
        });
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
