var WorldStockUSAADRTotalList = {
    DetailView: function (currentEngPartName) {
        $("#currentEngPartName").val(currentEngPartName);
        $("#frmList_USAADDRList").attr("method", "POST");
        $("#frmList_USAADDRList").attr("action", "/Finance/WorldStock/USAADRDetailList?menuSeq=" + $('#currentMenuSeq').val());
        $("#frmList_USAADDRList").submit();
        return false;
    }
};


$(document).ready(function () {

    $(document).on("click", ".detail", function () {
        var currentEngPartName = $(this).next().val();
        WorldStockUSAADRTotalList.DetailView(currentEngPartName);
    });

});