
var TvMainProgramBuy2 = {
    BindProgram: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/GetProgramListJson",
            data: { "ingYn": $("#cboIngYn").val() },
            success: function (data, textStatus) {
                $("#cboProgram option").remove();

                $.each(data.ListData, function (index, item) {
                    $("#cboProgram").append("<option value='" + item.Key + "' >" + item.Value + "</option>");
                });
                $("#hidProgramName").val($("#cboProgram option:selected").text());
            }
        });

        return false;
    },
    OpenZipSearch: function () {
        AddressSearchLayerOpen();

        return false;
    },
    AddressSearchResult: function (zipCode, address) {
        $("#txtPostNumber").val(zipCode);
        $("#txtAddress1").val(address);

        return false;
    },
    Save: function () {

        if ($("#cboProgram").val() == null || $("#cboProgram").val() == "") {
            alert("프로그램을 선택하여 주십시오.");
            $("#cboProgram").focus();
            return false;
        }
        if ($("#txtQuantity").val() == "") {
            alert("구매수량을 입력하여 주십시오.");
            $("#txtQuantity").focus();
            return false;
        }
        if ($("#txtCompanyName").val() == "") {
            alert("기업명을 입력하여 주십시오.");
            $("#txtCompanyName").focus();
            return false;
        }
        if ($("#txtCeoName").val() == "") {
            alert("대표자명을 입력하여 주십시오.");
            $("#txtCeoName").focus();
            return false;
        }

        if ($("#txtCompanyNumber1").val() == "") {
            alert("사업자번호를 입력하여 주십시오.");
            $("#txtCompanyNumber1").focus();
            return false;
        }
        if ($("#txtCompanyNumber2").val() == "") {
            alert("사업자번호를 입력하여 주십시오.");
            $("#txtCompanyNumber2").focus();
            return false;
        }
        if ($("#txtCompanyNumber3").val() == "") {
            alert("사업자번호를 입력하여 주십시오.");
            $("#txtCompanyNumber3").focus();
            return false;
        }
        $("#hidCompanyNumber").val($("#txtCompanyNumber1").val() + "-" + $("#txtCompanyNumber2").val() + "-" + $("#txtCompanyNumber3").val());

        if ($("#txtCompanyAddress").val() == "") {
            alert("사업자주소를 입력하여 주십시오.");
            $("#txtCompanyAddress").focus();
            return false;
        }
        if ($("#txtCompanyType").val() == "") {
            alert("업태를 입력하여 주십시오.");
            $("#txtCompanyType").focus();
            return false;
        }
        if ($("#txtCompanySection").val() == "") {
            alert("업종을 입력하여 주십시오.");
            $("#txtCompanySection").focus();
            return false;
        }

        if ($("#txtPostNumber").val() == "") {
            alert("받을주소를 입력하여 주십시오.");
            $("#txtPostNumber").focus();
            return false;
        }
        if ($("#txtAddress1").val() == "") {
            alert("받을주소를 입력하여 주십시오.");
            $("#txtAddress1").focus();
            return false;
        }
        if ($("#txtAddress2").val() == "") {
            alert("받을주소를 입력하여 주십시오.");
            $("#txtAddress2").focus();
            return false;
        }
        $("#hidAddress").val($("#txtAddress1").val() + " " + $("#txtAddress2").val());

        if ($("#txtCompanyPartName").val() == "") {
            alert("부서명을 입력하여 주십시오.");
            $("#txtCompanyPartName").focus();
            return false;
        }
        if ($("#txtACallNumber").val() == "") {
            alert("직통번호를 입력하여 주십시오.");
            $("#txtACallNumber").focus();
            return false;
        }
        if ($("#txtMobileNumber").val() == "") {
            alert("핸드폰번호를 입력하여 주십시오.");
            $("#txtMobileNumber").focus();
            return false;
        }
        if ($("#txtFaxNUmber").val() == "") {
            alert("팩스번호를 입력하여 주십시오.");
            $("#txtFaxNUmber").focus();
            return false;
        }

        if ($("#txtEmail1").val() == "") {
            alert("이메일을 입력하여 주십시오.");
            $("#txtEmail1").focus();
            return false;
        }
        if ($("#txtEmail2").val() == "") {
            alert("이메일을 입력하여 주십시오.");
            $("#txtEmail2").focus();
            return false;
        }



        var form = $('#frmSave')[0];
        var formData = new FormData(form);

        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/ProgramBuySave",
            data: formData, //$("#frmSave").serialize(),,
            processData: false,
            contentType: false,
            success: function (data, textStatus) {
                if (data.IsSuccess == true) {
                    alert("등록 되었습니다.");
                    self.close();
                }
                else {
                    alert(data.Msg);
                }
            }
        });


        return false;
    }
}

$(document).ready(function () {

    $("#uploadBtn").change(function () {
        $("#txtFileName").val($("#uploadBtn").val());

        return false;
    });



    $(".devNumber").keyup(function (event) {
        if (isNaN($(this).val()) == true) {
            alert("숫자만 가능합니다.");
            $(this).val("");
            return false;
        }
    });


    $("#cboIngYn").change(function () {
        TvMainProgramBuy2.BindProgram();
    });
    $("#cboProgram").change(function () {
        $("#hidProgramName").val($("#cboProgram option:selected").text());
    });



    $("#btnCloseTop").click(function () {
        self.close();

        return false;
    });
    $("#btnClose").click(function () {
        self.close();

        return false;
    });


    $("#btnSearchAddress").click(function () {
        TvMainProgramBuy2.OpenZipSearch();

        return false;
    });

    $("#btnSave").click(function () {
        TvMainProgramBuy2.Save();

        return false;
    });


    TvMainProgramBuy2.BindProgram();

    //AddressSearchLayerOpen();
});


