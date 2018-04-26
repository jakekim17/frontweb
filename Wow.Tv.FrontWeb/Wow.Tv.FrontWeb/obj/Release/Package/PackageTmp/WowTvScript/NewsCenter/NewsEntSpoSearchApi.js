var rankingIndex = 0;

var NewsEntSpoSearchApi = {
    RankingNews1: "",
    RankingNews2: "",
    BindRecommendationKeyWordNews: function (data) {
        var keyWordList = "";
        // 검색된 키워드 별로 
        $.each(data, function (index, item) {
            NewsEntSpoSearchApi.AddKeyWord(item);
            NewsEntSpoSearchApi.AddIssueCollection(index + 1, item);
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

            keyWordHtml += "<span class=\"hash-tag " + colorClassList[randomCount] + "\">";
            keyWordHtml += "    <a href=\"javascript:void();\" class=\"hash-link devIssueKeyWord\">" + keyWord + "</a>";
            keyWordHtml += "    <a href=\"javascript:void();\" class=\"del\" onclick=\"return NewsEntSpoSearchApi.DeleteKeyWord(this);\">삭제</a>";
            keyWordHtml += "</span>";

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
        $("#divIssueNewsArticle").html("");

        $.each(newsList, function (index, newsDataItem) {
            $.ajax({
                type: 'POST',
                url: "/Common/GetNewsImageUrl",
                data: {
                    "thumbnailType": "34M"
                    , "thumbnailFile": newsDataItem.THUMBNAIL_FILENM
                    , "vodNum": newsDataItem.VOD_NUM
                    , "imageDir": newsDataItem.IMGDIR
                    , "imagFile": newsDataItem.THUMBNAIL_TYPE1
                    , "artDate": newsDataItem.ARTDATE
                    , "gubunName": newsDataItem.GUBUN_NAME
                },
                success: function (data) {
                    var issueNewsArticleTag = "";

                    issueNewsArticleTag += "<div class=\"bx-type1\">";
                    issueNewsArticleTag += "    <a href=\"#\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem.ARTID + "');\">";
                    issueNewsArticleTag += "        " + data.GubunIcon;
                    issueNewsArticleTag += "        <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                    issueNewsArticleTag += "            <span class=\"title\">";
                    issueNewsArticleTag += "               " + newsDataItem.TITLE;
                    issueNewsArticleTag += "            </span>";
                    issueNewsArticleTag += "        </a>";
                    issueNewsArticleTag += "    </div>";

                    $("#divIssueNewsArticle").append(issueNewsArticleTag);
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        });
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
        SearchApi.GetEntSpoRecommendationKeyWordListNews(0, 2, searchTermList, NewsEntSpoSearchApi.BindRankingNewsItem);
    },
    BindRankingNewsItem: function (newsItemList) {
        if (newsItemList.length > 0) {
            var newsItem = newsItemList[0];

            // 1위 바인딩시
            if (NewsEntSpoSearchApi.RankingNews1 == "") {
                NewsEntSpoSearchApi.RankingNews1 = newsItem.ARTID;
            }
            // 2위 바인딩시
            else if (NewsEntSpoSearchApi.RankingNews2 == "") {
                if (newsItemList.length >= 2) {
                    if (NewsEntSpoSearchApi.RankingNews1 == newsItem.ARTID) {
                        newsItem = newsItemList[1];
                    }
                }
                
                NewsEntSpoSearchApi.RankingNews2 = newsItem.ARTID;
            }
            // 3위 바인딩시
            else {
                if (newsItemList.length >= 3) {
                    for (i = 0; i <= 2; i++) {
                        if (NewsEntSpoSearchApi.RankingNews1 == newsItem.ARTID || NewsEntSpoSearchApi.RankingNews2 == newsItem.ARTID) {
                            newsItem = newsItemList[i];
                        }
                        else {
                            break;
                        }
                    }
                }

                NewsEntSpoSearchApi.RankingNews2 = newsItem.ARTID;
            }

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

                    rankingNewsTag += "<li>";
                    rankingNewsTag += "    <a href=\"#\" onclick=\"return NewsCommon.GoNewsRead('" + newsItem.ARTID + "');\">";
                    rankingNewsTag += "        <strong class=\"tit\"><span class=\"num\">" + rankingIndex + "</span>" + newsItem.KEYWORDS + "<span class=\"best\"></span></strong>";
                    rankingNewsTag += "        <span class=\"img-area\">";
                    rankingNewsTag += "            <img src=\"" + data.Href + "\" onerror=\"this.src='" + data.ErrorHref + "'\" alt=\"\">";
                    rankingNewsTag += "        </span>";
                    rankingNewsTag += "        <span class=\"cont\">" + data.GubunIcon + newsItem.TITLE + "</span>";
                    rankingNewsTag += "    </a>";
                    rankingNewsTag += "</li>";

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

    $("#txtAutoCompleteWord").keydown(function () {
        if (event.keyCode == 13) {
            NewsEntSpoSearchApi.AddAutoCompleteWord("-", $("#txtAutoCompleteWord").val());
            NewsEntSpoSearchApi.GetNewsArticle();
            return false;
        }
    });

    $('#btnSearchCompleteWord').click(function () {
        NewsEntSpoSearchApi.AddAutoCompleteWord("-", $("#txtAutoCompleteWord").val());
        NewsEntSpoSearchApi.GetNewsArticle();
    });

    // 키워드를 우선 검색
    SearchApi.GetEntSpoRecommendationKeyWord(10, NewsEntSpoSearchApi.BindRecommendationKeyWordNews);

    // 랭킹 키워드
    SearchApi.GetEntSpoRankingKeyWord(0, 7, NewsEntSpoSearchApi.BindRankingNews);


    $("#AAA").click(function () {
        //NewsEntSpoSearchApi.GetRankingNewsItem("방송");
    });

});
