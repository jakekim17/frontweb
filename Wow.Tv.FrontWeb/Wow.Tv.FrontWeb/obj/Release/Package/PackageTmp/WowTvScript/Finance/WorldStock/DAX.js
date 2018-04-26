
var WorldStockDAX = {
    SiseDayDAXList: function (currentIndex) {
        $("#frmList_dayDAX > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayDAXList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayDAX").serialize(),
            success: function (data, textStatus) {
                //alert("테스트");
                $("#frmList_dayDAX > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {
    //alert("테스트");
    WorldStockDAX.SiseDayDAXList(0);
});

