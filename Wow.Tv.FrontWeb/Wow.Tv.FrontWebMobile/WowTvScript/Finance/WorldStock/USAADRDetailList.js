$(document).ready(function () {

    $("#btnPrev").click(function () {

        $("#frm_USAADRDetail").attr("method", "POST");
        $("#frm_USAADRDetail").attr("action", "/Finance/WorldStock/USA?menuSeq=" + $('#currentMenuSeq').val());
        $("#frm_USAADRDetail").submit();
        //location.href = '/Finance/WorldStock/USA?menuSeq=' + $('#currentMenuSeq').val();
    });

});