var LectureIndex = {
    GoDetail: function (seq) {
        $('#seq').val(seq);
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Lecture/Detail");
        $("#frmSearch").submit();
        return false;
    },
    Search: function (currentIndex) {
        $("#CurrentIndex").val(currentIndex);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/ServiceCenter/Lecture/Index");
        $("#frmSearch").submit();
        return false;
    },
};

$(document).ready(function() {
    if (totalDataCount != 0) {
        $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, $("#pageSize").val(), "LectureIndex.Search"));
    }
    $('select[name="MainCtgr"]').val(MainCtgr).attr("selected", true);

    if (SearchType == "") {
        $('select[name="SearchType"]').val("ALL").attr("selected", true);
    } else {
        $('select[name="SearchType"]').val(SearchType).attr("selected", true);
    }

    $('#btnSearch').click(function () {
        LectureIndex.Search();
    });
});