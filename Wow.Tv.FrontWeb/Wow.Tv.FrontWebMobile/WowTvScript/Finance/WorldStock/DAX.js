var WorldStockDAX = {

    SiseDayDAXList: function (currentIndex) {
        $("#frmList_DAX > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayDAXList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_DAX").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DAX > #divList").html(data);
            }
        });

        return false;
    },
}
$(document).ready(function () {
    WorldStockDAX.SiseDayDAXList(0);

});