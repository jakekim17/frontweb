var ReporterIndex = {
    //기자 리스트
    ReporterList: function () {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/ReporterList",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divReporterList").html(data);

                //Right AD
                ReporterIndex.RightContent();
            }
        });
    },
    GoReporterDetail: function (searchId) {
        $("#hdSearchId").val(searchId);
        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Reporter/ReporterDetail?menuSeq=" + $('#CurrentMenuSeq').val() + '&SearchId=' + searchId);
        $("#frmSearch").submit();
    },
    GetEmailForm: function (email, reporterName) {
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Reporter/GetEmailForm",
            data: { email: email, reporterName: reporterName},
            success: function (data) {
                $('#divEmailPopup').html(data);
                $('#divEmailPopup').show();

                if ($('#divEmail').height() != "undefined" && parseInt($('#divEmail').height()) > 0) {
                    var top = $('#divEmail').height() / -2;
                    $('#divEmail').css('margin-top', top + 'px');
                }
            }
        });
        return false;
    },
    GetSubScript: function (searchId) {
        PopupSubScript(searchId);
        return false;
    },
    RightContent: function () {
        /*
        $.ajax({
            method: "POST",
            url: "/NewsCenter/ContentRigth",
            success: function (data, textStatus) {
                $("#divContentRight").html(data);
            }
        });
        */
        $("#divContentRight").load("/html/ContentRigthList.html");
    }
}

$(document).ready(function () {
    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //검색어
    $('#txtSearchName').keypress(function (event) {
        if (event.which == 13) {
            $('#btnSearch').click();
            return false;
        }
    });

    //검색 버튼
    $("#btnSearch").click(function () {

        if ($("#txtSearchName").val().length == 0) {
            alert("기자명을 입력 하세요.");
            $("#txtSearchName").focus();
            return false;
        }

        $("span[name='spanSearchInitial']").each(function () {
            $(this).removeClass("on");
        });
        $("#spanSearchInitial_All").addClass("on");

        $("#hdSearchInitial").val("");

        ReporterIndex.ReporterList();
    });

    //초성검색
    $("span[name='spanSearchInitial'").click(function () {

        $("span[name='spanSearchInitial']").each(function () {
            $(this).removeClass("on");
        });
            
        $(this).addClass("on");

        var txtInitial = $(this).find("button").text();

        if (txtInitial == "전체") {

            $("#hdSearchInitial").val("");
        }
        else {
            $("#hdSearchInitial").val(txtInitial);
        }
        
        $("#txtSearchName").val("");
        ReporterIndex.ReporterList();
    });

    //기자 리스트
    ReporterIndex.ReporterList();

    //Right AD
    //ReporterIndex.RightContent();

    $('body').removeClass('sub');
});
