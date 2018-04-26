var WorldStockCAC40 = {
    
    SiseDayCAC40List: function (currentIndex) {
        $("#frmList_CAC40 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayCAC40List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_CAC40").serialize(),
            success: function (data, textStatus) {
                $("#frmList_CAC40 > #divList").html(data);
            }
        });

        return false;
    },
}
$(document).ready(function () {
    WorldStockCAC40.SiseDayCAC40List(0);

});