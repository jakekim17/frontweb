var serviceUrl = "http://news.wowtv.co.kr";
var NewsReadSearchApi = {
    BindRecommendationKeyWordNews: function (data) {
        var tagHtml = "";
        // 검색된 키워드 별로 
        $.each(data, function (index, item) {
            tagHtml += "<span class=\"btn-tag on devNewsReadKeyWord\" onclick=\"return NewsReadSearchApi.KeyWordToggleChange(this);\"><button>" + item + "</button></span>";
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
        $("#divRecomNews").find(".box-select-tags").html(tagHtml);

        NewsReadSearchApi.BindSelectKeyWordNews();

    },
    AddRecommendationKeyWordNews: function (newsDataItem) {
        var recommendationKeyWordNewsTag = "";
        //alert(newsDataItem.TITLE);
        $.ajax({
            type: 'POST',
            url: serviceUrl + "/Common/GetNewsImageUrl",
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
                recommendationKeyWordNewsTag += "<li class=\"news-type2\">";
                recommendationKeyWordNewsTag += "    <a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem.ARTID + "');\">";
                recommendationKeyWordNewsTag += "        <div>";
                recommendationKeyWordNewsTag += "            <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                if (newsDataItem.VOD_NUM != null && newsDataItem.VOD_NUM != "" && newsDataItem.VOD_NUM > "0") {
                    recommendationKeyWordNewsTag += "            <span class=\"icon-play medium\"></span>=\"\">";
                }
                recommendationKeyWordNewsTag += "        </div>";
                recommendationKeyWordNewsTag += "        <strong>";
                recommendationKeyWordNewsTag += data.GubunIcon;
                recommendationKeyWordNewsTag += newsDataItem.TITLE;
                recommendationKeyWordNewsTag += "        </strong>";
                recommendationKeyWordNewsTag += "    </a>";
                recommendationKeyWordNewsTag += "</li>";

                $("#ulNewsReadKeyWordNewsList").append(recommendationKeyWordNewsTag);
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
            if ($(item).hasClass("on")) {
                tagList.push($(item).find("button").text());
            }
        });

        $("#ulNewsReadKeyWordNewsList").html("");

        SearchApi.GetRecommendationKeyWordListNews(0, 9, tagList, function (newsList) {
            $.each(newsList.resultSet.result[0].resultDocuments, function (index2, item2) {
                NewsReadSearchApi.AddRecommendationKeyWordNews(item2);
            });
        });
    },
    KeyWordToggleChange: function (obj) {
        
        if ($(obj).hasClass("on") == true) {
            $(obj).removeClass("on");
        }
        else {
            $(obj).addClass("on");
        }

        NewsReadSearchApi.BindSelectKeyWordNews();

        return false;
    }
};


