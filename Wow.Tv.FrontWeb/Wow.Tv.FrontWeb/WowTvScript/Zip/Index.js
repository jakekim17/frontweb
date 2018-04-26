
var ZipIndex = {
    ChangeTab: function (obj, typeCode) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).addClass("on");

        if (typeCode == "Road") {
            $(".devRoad").show();
            $(".devDong").hide();
        }
        else {
            $(".devRoad").hide();
            $(".devDong").show();
        }

        return false;
    },
    SearchRoad: function () {
        $("#divList").html("");

        $.ajax({
            type: 'POST',
            url: "/Zip/SearchRoad",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    SearchDong: function () {
        $("#divList").html("");

        $.ajax({
            type: 'POST',
            url: "/Zip/SearchDong",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    },
    SelectItem: function (zipCode, address) {
        var zipData = { "ZipCode": zipCode, "Address": address };
        opener.SetZipData(zipData);

        self.close();

        return false;
    }
}



$(document).ready(function () {

    $("#txtRoad").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearchRoad").click();

            return false;
        }
    });

    $("#txtDong").keydown(function () {
        if (event.keyCode == 13) {
            $("#btnSearchDong").click();

            return false;
        }
    });

    $("#btnSearchRoad").click(function () {
        if ($("#txtRoad").val() == "") {
            alert("도로명을 입력하여 주십시오.");
            return false;
        }
        ZipIndex.SearchRoad();

        return false;
    });


    $("#btnSearchDong").click(function () {
        if ($("#txtDong").val() == "") {
            alert("지번주소를 입력하여 주십시오.");
            return false;
        }
        ZipIndex.SearchDong();

        return false;
    });


    $("#btnClose").click(function () {
        self.close();

        return false;
    });

});



