
var NewsReadSearchApi = {
    NewsCount: 0,
    LastWrapDiv: null,
    BindRecommendationKeyWordNews: function (data) {
        var tagHtml = "";
        // 검색된 키워드 별로 
        $.each(data, function (index, item) {
            tagHtml += "<span class=\"hash-tag type4 devNewsReadKeyWord\" onclick=\"return NewsReadSearchApi.KeyWordToggleChange(this);\">" + item + "</span>";
            //// 관련뉴스기사 가져와서
            //SearchApi.GetRecommendationKeyWordNews(0, 0, item, function (newsData) {
            //    // 뉴스기사를 HTML 로 만들어서 넣기
            //    if (newsData.resultSet.result[0].resultDocuments.length > 0) {
            //        var newsDataItem = newsData.resultSet.result[0].resultDocuments[0];
            //        NewsSearchApi.AddRecommendationKeyWordNews(item, newsDataItem);
            //    }
            //});
        });

        // 키워드 태그 생성
        $("#divRecomNews").find("#divRecomHash").html(tagHtml);

        NewsReadSearchApi.BindSelectKeyWordNews();

    },
    AddRecommendationKeyWordNews: function (newsDataItem) {
        var recommendationKeyWordNewsTag = "";
        //alert(newsDataItem.TITLE);
        $.ajax({
            type: 'POST',
            url: "/Common/GetNewsImageUrl",
            async: false,
            data: {
                "thumbnailType": "16M"
                , "thumbnailFile": newsDataItem.THUMBNAIL_FILENM
                , "vodNum": newsDataItem.VOD_NUM
                , "imageDir": newsDataItem.IMGDIR
                , "imagFile": newsDataItem.THUMBNAIL_TYPE1
                , "artDate": newsDataItem.ARTDATE
                , "gubunName": newsDataItem.GUBUN_NAME
            },
            success: function (data) {
                if (NewsReadSearchApi.NewsCount == 0 || NewsReadSearchApi.NewsCount % 4 == 0) {
                    var lastWrapDiv = "";
                    lastWrapDiv += "<div class=\"swiper-slide\">";
                    lastWrapDiv += "<div class=\"box-news-img pl0 pr0\">";
                    lastWrapDiv += "</div>";
                    lastWrapDiv += "</div>";
                    $("#ulNewsReadKeyWordNewsList").append(lastWrapDiv);
                    NewsReadSearchApi.LastWrapDiv = $("#ulNewsReadKeyWordNewsList").children("div").last().children("div");
                    
                }

                recommendationKeyWordNewsTag = "";
                recommendationKeyWordNewsTag += "<a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem.ARTID + "');\" class=\"news-img-cont\">";
                recommendationKeyWordNewsTag += "    <div class=\"img-area\">";
                recommendationKeyWordNewsTag += "        <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"Img\">";
                recommendationKeyWordNewsTag += "            " + data.GubunIcon;
                //recommendationKeyWordNewsTag += "            <span class=\"icon-play\"></span>";
                recommendationKeyWordNewsTag += "    </div>";
                recommendationKeyWordNewsTag += "        <div class=\"txt-area\"><p class=\"txt\">" + newsDataItem.TITLE + "</p></div>";
                recommendationKeyWordNewsTag += "</a>";

                NewsReadSearchApi.LastWrapDiv.append(recommendationKeyWordNewsTag);

                NewsReadSearchApi.NewsCount++;
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    BindSelectKeyWordNews: function () {

        var tagList = new Array();
        $.each($(".devNewsReadKeyWord"), function (index, item) {
            if ($(item).hasClass("type4")) {
                tagList.push($(item).text());
            }
        });

        $("#ulNewsReadKeyWordNewsList").html("");

        SearchApi.GetRecommendationKeyWordListNews(0, 9, tagList, function (newsList) {
            $.each(newsList.resultSet.result[0].resultDocuments, function (index2, item2) {
                NewsReadSearchApi.AddRecommendationKeyWordNews(item2);
            });

            visual_slider();
        });

    },
    KeyWordToggleChange: function (obj) {
        
        if ($(obj).hasClass("type4") == true) {
            $(obj).removeClass("type4");
        }
        else {
            $(obj).addClass("type4");
        }

        NewsReadSearchApi.BindSelectKeyWordNews();

        return false;
    }
};


