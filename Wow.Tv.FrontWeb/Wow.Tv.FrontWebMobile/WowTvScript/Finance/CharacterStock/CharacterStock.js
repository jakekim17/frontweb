var CharacterStock = {

    //NewsList: function (currentIndex) {
    //    var menuSeq = $("#menuSeq").val();
    //    $("#currentIndex").val(currentIndex);
    //    var currentPage = $("#currentIndex").val() / $("#PageSize").val()+1;
    //   // $("#Page").val(currentPage);
    //    //alert("page>" + $("#Page").val());

    //    $.ajax({
    //        type: "POST",
    //        url: "/Finance/CharacterStock/List?menuSeq=" + menuSeq,
    //        data: $("#frmSearch").serialize(),
    //        success: function (data, textStatus) {

    //            $("#divNewsList").html(data);

    //            //CharacterStock.NewsListPagingHtml(currentIndex);
    //        }
    //    });
    //}

    NewsList: function (currentIndex) {
        var menuSeq = $("#menuSeq").val();
        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
        else { $("#currentIndex").val(currentIndex); }

        currentIndex = parseInt(currentIndex)
        var pageSize = parseInt($("#PageSize").val());
        var currentPageNo = Math.floor(currentIndex / pageSize);

        if (currentPageNo == 0) {
            currentPageNo = 1;
        } else {
            currentPageNo++;
        }

        $("#Page").val(currentPageNo);

        $.ajax({
            type: "POST",
            url: "/Finance/CharacterStock/List?menuSeq=" + menuSeq,
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {

                $("#divNewsList").html(data);

                CharacterStock.NewsListPagingHtml(currentIndex);
            }
        });
    },

    GoDetail: function (articleId) {

        var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;
        var sUrl = String.format("/Finance/CharacterStock/Detail?menuSeq={0}&articleId={1}", menuSeq, articleId);

        $("#articleId").val(articleId);
        $("#articleForm").attr("method", "POST");
        $("#articleForm").attr("action", sUrl);
        $("#articleForm").submit();
    },

    NewsListPagingHtml: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "CharacterStock.NewsList"));
        }
    },
}

$(document).ready(function () {

    //$(document).on('change', 'select[name="SearchComp"]', function () {
    //    $("#SearchComp").val($(this).val());
    //    CharacterStock.NewsList();
    //});

    CharacterStock.NewsList();
})