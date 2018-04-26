
var NewsSearchApi = {
    BindRecommendationKeyWordNews: function (data) {
        // 검색된 키워드 별로 
        $.each(data, function (index, item) {
            // 관련뉴스기사 가져와서
            SearchApi.GetRecommendationKeyWordNews(0, 0, item, function (newsData) {
                // 뉴스기사를 HTML 로 만들어서 넣기
                if (newsData.resultSet.result[0].resultDocuments.length > 0) {
                    var newsDataItem = newsData.resultSet.result[0].resultDocuments[0];
                    NewsSearchApi.AddRecommendationKeyWordNews(item, newsDataItem);
                }
            });
        });
    },
    AddRecommendationKeyWordNews: function (keyWord, newsDataItem) {
        var recommendationKeyWordNewsTag = "";
        
        $.ajax({
            type: 'POST',
            url: "/Common/GetNewsImageUrl",
            data: {
                "thumbnailType": "16B"
                , "thumbnailFile": newsDataItem.THUMBNAIL_FILENM
                , "vodNum": newsDataItem.VOD_NUM
                , "imageDir": newsDataItem.IMGDIR
                , "imagFile": newsDataItem.THUMBNAIL_TYPE1
                , "artDate": newsDataItem.ARTDATE
                , "gubunName": newsDataItem.GUBUN_NAME
            },
            success: function (data) {
                recommendationKeyWordNewsTag += "<li>";
                recommendationKeyWordNewsTag += "    <a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem.ARTID + "');\">";
                recommendationKeyWordNewsTag += "        <span class=\"img\">";
                recommendationKeyWordNewsTag += "            <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                recommendationKeyWordNewsTag += "        </span>";
                recommendationKeyWordNewsTag += "        <span class=\"hash\">" + keyWord + "</span>";
                recommendationKeyWordNewsTag += "        <span class=\"text\">";
                recommendationKeyWordNewsTag += "            " + data.GubunIcon; //<span class=\"box-icon type06\">시황</span>"; //단독, type02 공시
                recommendationKeyWordNewsTag += "           " + newsDataItem.TITLE;
                recommendationKeyWordNewsTag += "        </span>";
                recommendationKeyWordNewsTag += "    </a>";
                recommendationKeyWordNewsTag += "</li>";
                
                $("#ulRecommendationKeyWordNews").append(recommendationKeyWordNewsTag);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    }
};


$(document).ready(function () {

    // 키워드를 우선 검색
    //SearchApi.GetRecommendationKeyWord(4, NewsSearchApi.BindRecommendationKeyWordNews);

    $.each($(".devHiddenKeyWordList"), function (index, item) {
        // 관련뉴스기사 가져와서
        SearchApi.GetRecommendationKeyWordNews(0, 0, $(item).val(), function (newsData) {
            // 뉴스기사를 HTML 로 만들어서 넣기
            if (newsData.resultSet.result[0].resultDocuments.length > 0) {
                var newsDataItem = newsData.resultSet.result[0].resultDocuments[0];
                NewsSearchApi.AddRecommendationKeyWordNews($(item).val(), newsDataItem);
            }
        });
    });

    
});
