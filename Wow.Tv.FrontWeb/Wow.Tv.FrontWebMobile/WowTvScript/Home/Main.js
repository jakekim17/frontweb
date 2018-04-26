
var DomesticStockIndex = {

    CharactorStockDetialGo: function (domainUrl, articleId) {
        var menuSeq = MENU_SEQ_DEFINE.FINANCE.CHARACTERSTOCK;

        var sUrl = domainUrl + "/Finance/CharacterStock/Detail?menuSeq=" + menuSeq + "&articleId=" + articleId;
        //alert(sUrl);
        location.href = sUrl;
        return false;
    }
};
