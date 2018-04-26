

var FeedBackEdit = {
    Save: function () {
        var form = $("#frmSave")[0];
        var formData = new FormData(form);
        $.ajax({
            type: "POST",
            url: "/Broad/FeedBack/FileUpdate",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.ModifyAfterMsg);
                    FeedBackEdit.GoIndex();
                }
                else {
                    alert(data.Msg);
                    if (data.Redirect.length !== 0) {
                        window.location = data.Redirect;
                    }
                }
            }
        });
        return false;
    },

    GoIndex: function () {

        $.ajax({
            type: 'POST',
            url: "/Broad/FeedBack/Index",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divContent").html(data);
            },
            beforeSend: function (xmlHttpRequest) {
                //cfShowBlock(true);
                $("#divContent").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");
            },
            complete: function (xhr, textStatus) {
                //처리중 UI 제거
                //cfHideBlock();
            }
        });

        return false;
    },
    CodeBind: function () {
        //$.ajax({
        //    type: "POST",
        //    url: "/Broad/FeedBack/GetProgramCode",
        //    data: { ingYn: $("#cboIngYn").val() },
        //    success: function (codes) {
        //        if (codes.programList.length > 0) {
        //            $("#cboPRG_CD").show();
        //            $.each(codes.programList,
        //                function (i, code) {
        //                    if (code.PGM_ID === commonCode) {
        //                        $("#cboPRG_CD").append('<option selected="selected" value="' + code.PGM_ID + '">' + code.PGM_NAME + "</option>");

        //                    } else {
        //                        $("#cboPRG_CD").append('<option value="' + code.PGM_ID + '">' + code.PGM_NAME + "</option>");
        //                    }
        //                });
        //        } else {
        //            $("#cboPRG_CD").hide();
        //        }
        //    },
        //    error: function (ex) {
        //    }
        //});
    },
    BindBanner: function (ingYn) {
        $("#divBanner").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/ProgramMain/Banner",
            data: { "programCode": $("#hidProgramCode").val() },
            success: function (data, textStatus) {
                $("#divBanner").html(data);
            }
        });

        return false;
    }
}



$(document).ready(function () {

});


$("#uploadBtn").change(function () {
    $("#fileText").val($("#uploadBtn").val());

    return false;
});


$("#btnList").click(function () {
    FeedBackEdit.GoIndex();

    return false;
});

$("#btnModify").click(function () {

    if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
        $("#TITLE").focus();
        return false;
    }

    if (confirm(CommonMsg.ModifyConfirmMsg)) {

        FeedBackEdit.Save();
    }

    return false;
});

//Dropdownlist Selectedchange event  
$("#cboIngYn").change(function () {
    if ($("#cboIngYn").val() !== "" && $("#cboIngYn").val() !== "ALL") {
        $("#cboPRG_CD").empty();
        FeedBackEdit.CodeBind();
    } else {
        $("#cboPRG_CD").hide();
    }

    return false;
});
FeedBackEdit.CodeBind();
//$("#cboPRG_CD").hide();


//FeedBackEdit.BindBanner();

