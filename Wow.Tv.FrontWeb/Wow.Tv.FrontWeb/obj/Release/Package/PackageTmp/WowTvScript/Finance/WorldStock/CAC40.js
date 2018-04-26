
var WorldStockCAC40 = {
    SiseDayCAC40List: function (currentIndex) {
        $("#frmList_dayCAC40 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayCAC40List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayCAC40").serialize(),
            success: function (data, textStatus) {
                //alert("테스트");
                $("#frmList_dayCAC40 > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    //alert("테스트");
    WorldStockCAC40.SiseDayCAC40List(0);
});

