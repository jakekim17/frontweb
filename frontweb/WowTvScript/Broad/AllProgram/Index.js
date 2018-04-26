;

var AllProgramIndex = {
    GoProgramMain: function (programCode) {
        location.href = "/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + programCode;

        return false;
    },
    BindProgramList: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/ProgramList",
            data: {},
            success: function (data, textStatus) {
                $("#divProgramList").html(data);
            }
        });

        return false;
    },
    SearchList: function () {
        var menuSeq = $("#hidCurrentMenuSeq").val();
        var year = $("#cboYear").val();
        var programName = $("#txtProgramName").val();
        location.href = encodeURI("/Broad/AllProgram/Index?menuSeq=" + menuSeq + "&year=" + year + "&programName=" + programName);

        return false;
    },
    SearchListPart: function () {
        AllProgramIndex.BindListPart("ㄱ", "딯", "divList1");
        AllProgramIndex.BindListPart("ㄹ", "빟", "divList2");
        AllProgramIndex.BindListPart("ㅅ", "짛", "divList3");
        AllProgramIndex.BindListPart("ㅊ", "팋", "divList4");
        AllProgramIndex.BindListPart("ㅍ", "힣", "divList5");
        /*
        AllProgramIndex.BindListPart("ㄱ", "ㄷ", "divList1");
        AllProgramIndex.BindListPart("ㄹ", "ㅂ", "divList2");
        AllProgramIndex.BindListPart("ㅅ", "ㅈ", "divList3");
        AllProgramIndex.BindListPart("ㅊ", "ㅌ", "divList4");
        AllProgramIndex.BindListPart("ㅍ", "ㅎ", "divList5");
        */
        AllProgramIndex.BindListPart("Etc", "Etc", "divList6");

        return false;
    },
    BindListPart: function (searchTermStart, searchTermEnd, targetId) {

        $("#" + targetId).html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            //async: false,
            url: "/Broad/AllProgram/SearchList?programNameTermStart=" + encodeURI(searchTermStart) + "&programNameTermEnd=" + encodeURI(searchTermEnd),
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#" + targetId).html(data);
            }
        });

        return false;
    }

}




$(document).ready(function () {

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            AllProgramIndex.SearchList();

            return false;
        }
    });


    $("#btnSearch").click(function () {
        AllProgramIndex.SearchList();

        return false;
    })


    AllProgramIndex.SearchListPart();
    AllProgramIndex.BindProgramList();


    $("#cboYear").change();
});
