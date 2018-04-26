var DomesticStockIndustryPartDetail = {
    IndustryStockList: function (currentIndex) {
        //alert(currentIndex);
        $("#frmList_industryStock > #currentIndex").val(currentIndex);
        //alert($("#frmList_industryStock > #currentIndex").val())
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/IndustryPartStock",
            data: $("#frmList_industryStock").serialize(),
            success: function (data, textStatus) {
                $("#frmList_industryStock > #divList").html(data);
            }
        });

        return false;
    },

    Prev: function () {

        $("#frmPrev").attr("method", "POST");
        $("#frmPrev").attr("action", "/Finance/DomesticStock/IndustryPart?menuSeq=" + $("#MenuSeq").val());
        $("#frmPrev").submit();
    },

    PrevUpper: function () {
        $("#frmPrev").attr("method", "POST");
        $("#frmPrev").attr("action", "/Finance/DomesticStock/IndustryPartUpper?menuSeq=" + $("#MenuSeq").val());
        $("#frmPrev").submit();
    }
}

$(document).ready(function () {
    DomesticStockIndustryPartDetail.IndustryStockList(0)
});
