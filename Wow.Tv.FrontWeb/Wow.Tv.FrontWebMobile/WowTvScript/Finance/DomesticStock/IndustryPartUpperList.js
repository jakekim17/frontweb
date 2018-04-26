var IndustryPartUpperList = {

    Detail: function (Market, TargetDt, PartName, PartCode, MenuSeq) {
        $("#PartCode").val(PartCode);
        $("#Market").val(Market);
        $("#TargetDt").val(TargetDt);
        $("#PartName").val(PartName);
        $("#MenuSeq").val(MenuSeq);
        $("#frmPartUpperDetail").attr("method", "POST");
        $("#frmPartUpperDetail").attr("action", "/Finance/DomesticStock/IndustryPartUpperDetail?menuSeq=" + $("#currentMenuSeq").val());
        $("#frmPartUpperDetail").submit();
        return false;
    },

}
