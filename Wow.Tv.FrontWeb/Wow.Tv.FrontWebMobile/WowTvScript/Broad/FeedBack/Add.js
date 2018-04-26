﻿

var FeedBackAdd = {
    Save: function () {
        var form = $("#frmSave")[0];
        var formData = new FormData(form);
        $.ajax({
            type: "POST",
            url: "/Broad/FeedBack/FileSave",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess) {
                    confirm(CommonMsg.SaveAfterMsg);
                    FeedBackAdd.GoIndex();
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
        $("#frmSearch").attr("method", "POST");

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

        return false; egh
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
        //                    $("#cboPRG_CD").append('<option value="' + code.PGM_ID + '">' + code.PGM_NAME + "</option>");
        //                });
        //        } else {
        //            $("#cboPRG_CD").hide();
        //        }
        //    },
        //    error: function (ex) {
        //    }
        //});
    }
}



$(document).ready(function () {

});


$("#uploadBtn").change(function () {
    //$("#fileText").val($("#uploadBtn").val());
    if (window.FileReader) {
        var filename = $(this)[0].files[0].name;
        $(".file-btn").addClass("on")
        $(".file-btn").click(function () {
            $(this).removeClass("on")
        });
        // 파일 리셋
        $('.file-btn').on('click', function (e) {
            var $el = $('.file-name');
            $el.wrap('<form>').closest('form').get(0).reset();
            $el.unwrap();
        });
    } else {
        var filename = $(this).val().split('/').pop().split('\\').pop();
    }
    $(this).siblings('.file-name').val(filename);

    return false;
});

$("#btnList").click(function () {
    FeedBackAdd.GoIndex();

    return false;
});

$("#btnSave").click(function () {
    if (!window.co.validation("#TITLE", "제목을 확인해주세요.")) {
        $("#TITLE").focus();
        return false;
    }

    if (confirm(CommonMsg.SaveConfirmMsg)) {

        FeedBackAdd.Save();
    }

    return false;
});

//Dropdownlist Selectedchange event  
$("#cboIngYn").change(function () {
    if ($("#cboIngYn").val() !== "" && $("#cboIngYn").val() !== "ALL") {
        $("#cboPRG_CD").empty();
        FeedBackAdd.CodeBind();
    } else {
        $("#cboPRG_CD").hide();
    }

    return false;
});
$("#cboPRG_CD").hide();

