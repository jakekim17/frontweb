var OpinionIndex = {
    SaerchColumnData: function (searchClass) {
        $('#searchClass').val(searchClass);

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Opinion/SearchColumnData",
            data: $('#frmSearch').serialize(),
            async: false,
            success: function (data) {
                $("#divContents").html(data);
            }
        });
    },
    ChangeColumnData: function (searchClass) {
        $('#' + searchClass).closest('ul').find('li').removeClass('on');
        $('#' + searchClass).parent().addClass('on');

        OpinionIndex.SaerchColumnData(searchClass);

        return false;
    },
    GetDetailList: function (text) {
        var SplitData = text.split("_");
        //var searchClass = $("#searchClass").val();
        $("#searchText").val(SplitData[1]);
        $("#searchSeq").val(SplitData[0]);
   
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Opinion/List?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();
    },
};

$(document).ready(function () {

    if (searchClass == "P") {
        OpinionIndex.ChangeColumnData('P');
    } else {
        OpinionIndex.ChangeColumnData('S');
    }

    $(document).on('change', '#proSel',function () {
        var text = $(this).val();
        OpinionIndex.GetDetailList(text);
    });

    $(document).scroll(function () {
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if (maxHeight <= currentScroll + 200) {
            var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#PageSize').val()) + 1;
            var CurrentPageCnt = parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1;

            if (CurrentPageCnt < totalPageCnt) {
                var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                if (nextIndex > $('#totalDataCount').val()) {
                    var minus = nextIndex - $('#totalDataCount').val();
                    nextIndex = nextIndex - minus;
                }
                OpinionList.SaerchColumnList(nextIndex, true);
            }
        }
    });
});