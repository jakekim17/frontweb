var IndustryStockList = {

    Detail: function (Market, TargetDt, PartName, PartCode, MenuSeq, menuTab) {
       
        $("#PartCode").val(PartCode);
        $("#MenuTab").val(menuTab);
        $("#Market").val(Market);
        $("#TargetDt").val(TargetDt);
        $("#PartName").val(PartName);        
        $("#MenuSeq").val(MenuSeq);
        $("#frmPartDetail").attr("method", "POST");
        $("#frmPartDetail").attr("action", "/Finance/DomesticStock/IndustryPartDetail?menuSeq=" + $("#currentMenuSeq").val());
        $("#frmPartDetail").submit();
        return false;
    },
}
