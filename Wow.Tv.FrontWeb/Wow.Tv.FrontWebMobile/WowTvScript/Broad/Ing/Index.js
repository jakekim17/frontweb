
var IngIndex = {
    ChangeTab: function (obj, ingYn) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).parent().addClass("on");

        $("#frmSearch").find("[name='SearchText']").val("");

        IngIndex.BindSearchList(0, ingYn);

        return false;
    },
    BindSearchList: function (currentIndex, ingYn) {
        
        if (typeof ingYn == "undefined") {
            ingYn = $("#hidIngYn").val();
        }
        if (ingYn == null || ingYn == "") {
            ingYn = $("#hidIngYn").val();
        }
        else {
            $("#hidIngYn").val(ingYn);
        }

        $("#frmSearch").find("[name='currentIndex']").val(currentIndex);
        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/Ing/SearchListPartial",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    }
}




$(document).ready(function () {
    
    $("#btnSearch").click(function () {
        IngIndex.BindSearchList(0);

        return false;
    });

    $("#frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearch").click();

            return false;
        }
    });


    IngIndex.BindSearchList(0, "Y");

});
