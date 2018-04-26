

$(document).ready(function () {
   

    $("#cboNameType1").change(function () {

        $("#txtcode").val($("#cboNameType1").val());
        $("#txtcodename").val($(':selected', cboNameType1).text());
    });

    

    $("#cboNameType2").change(function () {

        $("#txtcode").val($("#cboNameType2").val());
        $("#txtcodename").val($(':selected', cboNameType2).text());
    });

    $("#btnGetTelno").click(function () {
        var data = HtmlHelper.GetJsonDataFromHtml("column");
        $("#lblTelno").val(data.Telno);
        $("#lblMobile").val(data.Mobile); 
    });
});
