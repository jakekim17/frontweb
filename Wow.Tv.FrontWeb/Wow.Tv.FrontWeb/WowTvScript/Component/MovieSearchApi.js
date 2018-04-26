
var contentCount = 0;
var movieContentTag = "";
var getImageType = "";

var MovieSearchApi = {
    GetTvMovieKeyWord: function (num) {
        SearchApi.GetTvMovieKeyWord(num, getImageType, MovieSearchApi.GetTvMovieContentByKeyWord);

        return false;
    },
    GetTvMovieContentByKeyWord: function (keyWrodList) {
        SearchApi.GetTvMovieContentByKeyWord(0, 11, getImageType, keyWrodList, function (resultDocumentList) {


            if (resultDocumentList != null) {
                $.each(resultDocumentList, function (index, item) {

                    if (contentCount < 10) {
                        contentCount++;

                        movieContentTag += MovieSearchApi.MakeTagItem(item);
                    }
                    else if (contentCount == 10) {
                        contentCount++;

                        movieContentTag += MovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                    }
                    else if (contentCount == 11) {
                        contentCount++;

                        movieContentTag += MovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                    }
                });
            }

            if (contentCount <= 10) {
                SearchApi.GetTvMovieContentByDay(0, 11, getImageType, function (resultDocumentList) {

                    $.each(resultDocumentList, function (index, item) {
                        
                        if (contentCount < 10) {
                            contentCount++;

                            movieContentTag += MovieSearchApi.MakeTagItem(item);
                        }
                        else if (contentCount == 10) {
                            contentCount++;

                            movieContentTag += MovieSearchApi.MakeTagAddContentItem("liAddContent1", item);
                        }
                        else if (contentCount == 11) {
                            contentCount++;

                            movieContentTag += MovieSearchApi.MakeTagAddContentItem("liAddContent2", item);
                        }
                    });

                    MovieSearchApi.BindContent(movieContentTag);
                });
            }
            else {
                MovieSearchApi.BindContent(movieContentTag);
            }
        });

        return false;
    },
    MakeTagItem: function (item) {
        var tagItem = "";

        tagItem += "<li>";
        if (getImageType == "DNRS") {
            $.ajax({
                type: 'POST',
                url: "/Common/GetProgramImageUrl",
                async: false,
                data: {
                    "vodNum": item.ID
                },
                success: function (data) {
                    tagItem += "    <a href=\"javascript:void(0)\" onclick=\"return MovieSearchApi.GoTvMovie('" + item.ID + "');\">";
                    tagItem += "        <img src=\"" + data.Href + "\" onerror=\"this.src='" + $("#hidStyleUrl").val() + "/images/common/no_image_16m.jpg'\" alt=\"movieImg\">";
                    tagItem += "        <p>" + item.TITLE + "</p>";
                    tagItem += "    </a>";
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }
        else {
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
                    tagItem += "    <a href=\"javascript:void(0)\" onclick=\"return MovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\">";
                    tagItem += "        <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"movieImg\">";
                    tagItem += "        <p>" + item.TITLE + "</p>";
                    tagItem += "    </a>";
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }
        tagItem += "</li>";

        return tagItem;
    },
    MakeTagAddContentItem: function (id, item) {
        var tagItem = "";

        if (getImageType == "DNRS") {
            $.ajax({
                type: 'POST',
                url: "/Common/GetProgramImageUrl",
                async: false,
                data: {
                    "vodNum": item.ID
                },
                success: function (data) {
                    tagItem += "<a href=\"#\" onclick=\"return MovieSearchApi.GoTvMovie('" + item.ID + "');\">";
                    //tagItem += "    <span class=\"box-icon type07\">AD</span>";
                    tagItem += "    <img src=\"" + data.Href + "\" onerror=\"this.src='" + $("#hidStyleUrl").val() + "/images/common/no_image_16m.jpg'\" alt=\"\">";
                    //tagItem += "    <span class=\"cont\">" + item.TITLE + "</span>";
                    tagItem += "</a>";
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }
        else {
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
                    tagItem += "<a href=\"#\" onclick=\"return MovieSearchApi.GoNewsRead('" + item.ARTICLEID + "');\">";
                    //tagItem += "    <span class=\"box-icon type07\">AD</span>";
                    tagItem += "    <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                    //tagItem += "    <span class=\"cont\">" + item.TITLE + "</span>";
                    tagItem += "</a>";
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }
        
        $("#" + id).html(tagItem);

        return false;
    },
    BindContent: function (tag) {
        $("#ulMovieContent").html(tag);

        // tv실시간보기 - 팝업
        $('.movie-slider ul').bxSlider({
            minSlides: 5,
            maxSlides: 10,
            slideWidth: 136,
            pager: false,
            touchEnabled: false,
            auto: false // 이미지 회전이 자동으로 됨
        });
    },
    GoTvMovie: function (num) {
        var url = "/Component/TvPlayer/PlayTvReplay?num=" + num;
        document.location.href = url;

        return false;
    },
    GoNewsRead: function (articleId) {
        var url = NewsCommon.GetNewsRead(articleId);
        document.location.href = url;

        return false;
    }
}


$(document).ready(function () {

    if ($("#hidPlayType").val() == "TvReplay") {
        getImageType = "DNRS";
    }
    else if ($("#hidPlayType").val() == "LiveTv") {
        getImageType = "NEWS";
    }
    else if ($("#hidPlayType").val() == "Vod") {
        getImageType = "NEWS";
    }

    MovieSearchApi.GetTvMovieKeyWord($("#hidNum").val());

});
