
var NewsStandSearchApi = {

    AddRecommendKeyWordNews: function (listIdx, keyWord, newsDataItem) {

        var recommendKeyWordNewsTag = "";

        var ARTID_YYYYMMDD = newsDataItem.ARTID.substring(1, 9)

        if (newsDataItem.ARTID.substring(0, 3) == "AKR")
        {
            ARTID_YYYYMMDD = newsDataItem.ARTID.substring(3, 11)
        }

        //list 2 ~ 4. 제목 텍스트만.. <span>[정치]</span>
        if (listIdx > 0)
        {
            recommendKeyWordNewsTag = "<li>";
            //recommendKeyWordNewsTag += "<a href=\"http://cast.wowtv.co.kr/news/" + ARTID_YYYYMMDD + "/"+ newsDataItem.ARTID + ".html\" target='_blank'><span>[" + keyWord + "]</span> " + newsDataItem.TITLE + "</a>";
            recommendKeyWordNewsTag += "<a href=\"http://news.wowtv.co.kr/NewsCenter/News/Read?articleId="+ newsDataItem.ARTID + "\" target='_blank'><span>[" + keyWord + "]</span> " + newsDataItem.TITLE + "</a>";
            recommendKeyWordNewsTag += "</li>";

            $("#ulKeyWordNewsList").append(recommendKeyWordNewsTag);

        }
        //list 1. 이미지 표현
        else
        {
            $.ajax({
                type: 'POST',
                url: "/Common/GetNewsImageUrl",
                data: {
                    "thumbnailType": "11S"
                    , "thumbnailFile": newsDataItem.THUMBNAIL_FILENM
                    , "vodNum": newsDataItem.VOD_NUM
                    , "imageDir": newsDataItem.IMGDIR
                    , "imagFile": newsDataItem.THUMBNAIL_TYPE1
                    , "artDate": newsDataItem.ARTDATE
                    , "gubunName": newsDataItem.GUBUN_NAME
                },
                success: function (data) {

                    //recommendKeyWordNewsTag = "<a href=\"http://cast.wowtv.co.kr/news/" + ARTID_YYYYMMDD + "/" + newsDataItem.ARTID + ".html\" class=\"thumbnail\" target='_blank'>";
                    recommendKeyWordNewsTag = "<a href=\"http://news.wowtv.co.kr/NewsCenter/News/Read?articleId=" + newsDataItem.ARTID + "\" class=\"thumbnail\" target='_blank'>";
                    recommendKeyWordNewsTag += "    <span class=\"photo\">";
                    recommendKeyWordNewsTag += "       <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"기사이미지\">";
                    recommendKeyWordNewsTag += "    </span>";
                    recommendKeyWordNewsTag += "    <dl>";
                    recommendKeyWordNewsTag += "        <dt><span>[" + keyWord +"]</span> " + newsDataItem.TITLE + "</dt>";
                    recommendKeyWordNewsTag += "        <dd>" + newsDataItem.CONTENT.substring(0, 40) + "</dd>";
                    recommendKeyWordNewsTag += "    </dl>";
                    recommendKeyWordNewsTag += "</a>";

                    $("#spanKeyWordNews").append(recommendKeyWordNewsTag); 
                },
                error: function (e) {
                    console.log(json.stringify(e));
                }
            });
        }

        return false;
    }
};

$(document).ready(function () {

    // HOT 키워드 
    $.each($(".hdKeyWordList"), function (index, item) {

        var listIdx = index; 
        //alert(listIdx);
        // 키워드 추출 단어 --> 통합검색 API 
        SearchApi.GetRecommendationKeyWordNews(0, 0, $(item).val(), function (newsData) {
           
            // 통합 검색 결과 --> 키워드 뉴스 Area Append
            if (newsData.resultSet.result[0].resultDocuments.length > 0) {

                var newsDataItem = newsData.resultSet.result[0].resultDocuments[0];
                NewsStandSearchApi.AddRecommendKeyWordNews(listIdx, $(item).val(), newsDataItem);
            }
        });
    });
});


