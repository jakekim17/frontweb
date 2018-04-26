var rankingIndex = 0;

var NewsEntSpoSearchApi = {
    BindRecommendationKeyWordNews: function (data) {
        var keyWordList = "";
        // 검색된 키워드 별로 
        $.each(data, function (index, item) {
            NewsEntSpoSearchApi.AddKeyWord(item);
            //NewsEntSpoSearchApi.AddIssueCollection(index + 1, item);
        });
        
        NewsEntSpoSearchApi.GetNewsArticle();
    },
    AddKeyWord: function (keyWord) {
        var keyWordHtml = "";
        var isExist = false;

        $.each($(".devIssueKeyWord"), function (index, item) {
            if (keyWord == $(item).text()) {
                isExist = true;
            }
        });

        if (isExist == false) {
            var colorClassList = ["type1", "type2", "type3", "type4", "type1", "type2", "type3", "type4", "type3", "type4"];
            var randomCount = Math.floor(Math.random() * 10);

            keyWordHtml += "<div class=\"swiper-slide on\">";
            keyWordHtml += "    <span class=\"hash-tag devIssueKeyWord\">" + keyWord + "</span>";
            keyWordHtml += "</div>";

            $("#divIssueKeyWord").append(keyWordHtml);
        }
    },
    AddKeyWordAfterNewsBind: function (keyWord) {
        NewsEntSpoSearchApi.AddKeyWord(keyWord);

        NewsEntSpoSearchApi.GetNewsArticle();
    },
    AddIssueCollection: function (index, keyWord) {
        var capyTag = "";

        capyTag += "<li onclick=\"return NewsEntSpoSearchApi.AddKeyWordAfterNewsBind('" + keyWord + "');\"><span class=\"num\">" + index + "</span><a href=\"#none\">" + keyWord + "</a></li>";

        $("#ulIssueCollection").append(capyTag);

        return false;
    },
    AddAutoCompleteWord: function (index, keyWord) {
        NewsEntSpoSearchApi.AddKeyWord(keyWord);
        NewsEntSpoSearchApi.AddIssueCollection(index, keyWord);
        $("#divAutoComplete").hide();

        return false;
    },
    GetNewsArticle: function () {
        var tagList = new Array();
        $.each($(".devIssueKeyWord"), function (index, item) {
            tagList.push($(item).text());
        });

        SearchApi.GetEntSpoRecommendationKeyWordListNews(0, 8, tagList, NewsEntSpoSearchApi.BindNewsArticle);
    },
    BindNewsArticle: function (newsList) {
        var addTag = "";
        $("#divIssueNewsArticle").html("");

        $.each(newsList, function (index, newsDataItem) {
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
                    var issueNewsArticleTag = "";
                    
                    issueNewsArticleTag += "<a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem.ARTID + "');\">";
                    issueNewsArticleTag += "    <div class=\"img-area\"><img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"Img\"></div>";
                    issueNewsArticleTag += "    <p class=\"txt\">&nbsp;" + data.GubunIcon + newsDataItem.TITLE +  "</p> ";
                    issueNewsArticleTag += "</a>";

                    if (index < 5) {
                        $("#divIssueNewsArticle").append(issueNewsArticleTag);
                    }
                    else {
                        addTag += issueNewsArticleTag;
                    }
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        });

        addTag = "<div class=\"list-moresee-area\">" + addTag + "</div>";
        $("#divIssueNewsArticle").append(addTag);
    },
    DeleteKeyWord: function (obj) {
        $(obj).parent().remove();

        NewsEntSpoSearchApi.GetNewsArticle();
    },
    GetAutoComplete: function () {
        SearchApi.GetAutoComplete($("#txtAutoCompleteWord").val(), NewsEntSpoSearchApi.BindAutoComplete);
    },
    BindAutoComplete: function (wordList) {
        var liTag = "";
        $("#divAutoComplete").find("ul").html("");
        $("#divAutoComplete").show();

        $.each(wordList, function (index, item) {
            liTag = "";
            
            liTag += "<li>";
            liTag += "    <a href=\"#\" onclick=\"return NewsEntSpoSearchApi.AddAutoCompleteWord('-', '" + item.KEYWORD + "');\">";
            item.KEYWORD = item.KEYWORD.replaceAll($("#txtAutoCompleteWord").val(), "<strong class=\"keyword\">" + $("#txtAutoCompleteWord").val() + "</strong>"); 
            //alert(item.KEYWORD);
            liTag += "        " + item.KEYWORD;
            liTag += "    </a>";
            liTag += "</li>";
            $("#divAutoComplete").find("ul").append(liTag);
        });

    },
    BindRankingNews: function (wordList) {
        $("#ulRankingTag").html("");
        $("#ulRankingNews").html("");

        $.each(wordList, function (index, item) {
            if (index < 3) {
                NewsEntSpoSearchApi.GetRankingNewsItem(item);
            }
            else {
                $("#ulRankingTag").append("<li><span class=\"num\">#</span><a href=\"javascript: HashTagLink('" + item + "');\">" + item + "</a></li>");
            }
        });
    },
    GetRankingNewsItem: function (keyword) {
        var searchTermList = new Array();
        searchTermList.push(keyword);
        SearchApi.GetEntSpoRecommendationKeyWordListNews(0, 0, searchTermList, NewsEntSpoSearchApi.BindRankingNewsItem);
    },
    BindRankingNewsItem: function (newsItemList) {
        if (newsItemList.length > 0) {
            var newsItem = newsItemList[0];

            $.ajax({
                type: 'POST',
                url: "/Common/GetNewsImageUrl",
                data: {
                    "thumbnailType": "16M"
                    , "thumbnailFile": newsItem.THUMBNAIL_FILENM
                    , "vodNum": newsItem.VOD_NUM
                    , "imageDir": newsItem.IMGDIR
                    , "imagFile": newsItem.THUMBNAIL_TYPE1
                    , "artDate": newsItem.ARTDATE
                    , "gubunName": newsItem.GUBUN_NAME
                },
                success: function (data) {
                    var rankingNewsTag = "";
                    rankingIndex++;

                    rankingNewsTag += "<a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsItem.ARTID + "');\" class=\"box-cont\">";
                    rankingNewsTag += "    <span class=\"num\">" + rankingIndex + "</span>";
                    rankingNewsTag += "    <p class=\"txt-area\">";
                    rankingNewsTag += "        <strong class=\"tit\">" + newsItem.KEYWORDS + "</strong>";
                    rankingNewsTag += "        <span class=\"txt\">" + newsItem.TITLE + "</span>";
                    rankingNewsTag += "    </p>";
                    rankingNewsTag += "    <p class=\"img-area\"><img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"Img\"></p>";
                    rankingNewsTag += "</a>";

                    $("#ulRankingNews").append(rankingNewsTag);
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }
    }
};


$(document).ready(function () {
    

    $("#txtAutoCompleteWord").keyup(function () {
        //$("#divTest").html($("#txtAutoCompleteWord").val());
        NewsEntSpoSearchApi.GetAutoComplete();
    });

    // 키워드를 우선 검색
    SearchApi.GetEntSpoRecommendationKeyWord(10, NewsEntSpoSearchApi.BindRecommendationKeyWordNews);

    // 랭킹 키워드
    SearchApi.GetEntSpoRankingKeyWord(0, 7, NewsEntSpoSearchApi.BindRankingNews);


    $("#AAA").click(function () {
        //NewsEntSpoSearchApi.GetRankingNewsItem("방송");
    });

});
