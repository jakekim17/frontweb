var WorldStockSHC = {

    SiseTimeSHCList: function (currentIndex) {
        $("#frmList_SHC > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeSHCList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_SHC").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SHC > #divList").html(data);
            }
        });

        return false;
    },
    SiseDaySHCList: function (currentIndex) {
        $("#frmList_SHC > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDaySHCList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_SHC").serialize(),
            success: function (data, textStatus) {
                $("#frmList_SHC > #divList").html(data);
            }
        });

        return false;
    }
}

$(document).ready(function () {

    $(".tab-area a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var type = $(this).text();
        if (type == '시간대별') {
            WorldStockSHC.SiseTimeSHCList(0);
        } else if (type == '일별') {
            WorldStockSHC.SiseDaySHCList(0);
        }

    });

    WorldStockSHC.SiseTimeSHCList(0);

});