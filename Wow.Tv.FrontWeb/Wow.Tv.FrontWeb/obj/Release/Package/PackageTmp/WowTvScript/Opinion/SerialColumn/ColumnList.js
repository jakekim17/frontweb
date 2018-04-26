var ColumnList = {
    GetDetailList: function (text) {
        var SplitData = text.split("_");
        var classId = $("#classId").val();
        $("#text").val(SplitData[1]);
        $("#seq").val(SplitData[0]);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Opinion/SerialColumn/DetailList?subMenu=opinion&Class=" + classId + "&menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();

    },

    GetColumnList: function (currentIndex) {
        $("#currentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/Opinion/SerialColumn/ColumnList?subMenu=opinion&menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();
    }
}

$(document).ready(function(){
    
    $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "ColumnList.GetColumnList"));

    $("#selector01").change(function(){
        var text = $("#selector01 option:selected").val();
        ColumnList.GetDetailList(text);
    });

    //오른쪽 부가 컨텐츠 + AD Area
    NewsCommon.RightContent();

    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
        }
    });

    $(document).on('click', '.skiptranslate > .goog-te-gadget-simple', function () {
        if ($('.goog-te-menu-frame').hasClass('on')) {
            $('.goog-te-menu-frame').css('display', 'none');
            $('.goog-te-menu-frame').removeClass('on');
        } else {
            $('.goog-te-menu-frame').css('display', 'black');
            $('.goog-te-menu-frame').addClass('on');
        }
    });
});