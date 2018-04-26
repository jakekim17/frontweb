var ReporterIndex = {
    SearchReporterList: function () {
        $.ajax({
            method: 'POST',
            url: '/NewsCenter/Reporter/SearchReporterList',
            data: $('#frmSearch').serialize(),
            success: function (data) {
                $('#divReporterList').html(data);
            }
        });
        return false;
    },
    GoReporterDetail: function (searchId) {
        $('#hdSearchId').val(searchId);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + searchId);
        $("#frmSearch").submit();
    },
    ChangeData: function (obj) {
        var searchInitial = $(obj).text();
        if (searchInitial == "전체") {
            $("#hdSearchInitial").val("");
        } else {
            $("#hdSearchInitial").val(searchInitial);
        }

        $("#txtSearchName").val("");
        ReporterIndex.SearchReporterList();
        return false;
    }
};

$(document).ready(function () {
    ReporterIndex.SearchReporterList();

    $('#txtSearchName').keypress(function (event) {
        if (event.which == 13) {
            $('#btnSearch').click();
            return false;
        }
    });

    $("#btnSearch").click(function () {
        if ($("#txtSearchName").val().length == 0) {
            alert("기자명을 입력 하세요.");
            $("#txtSearchName").focus();
            return false;
        }

        $("#hdSearchInitial").val("");

        ReporterIndex.SearchReporterList();
    });
});