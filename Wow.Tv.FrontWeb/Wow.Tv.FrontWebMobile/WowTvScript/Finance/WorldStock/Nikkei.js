var WorldStockNikkei = {

    SiseTimeNikkeiList: function (currentIndex) {
        $("#frmList_Nikkei > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseTimeNikkeiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Nikkei").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Nikkei > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayNikkeiList: function (currentIndex) {
        $("#frmList_Nikkei > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/SiseDayNikkeiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Nikkei").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Nikkei > #divList").html(data);
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
            WorldStockNikkei.SiseTimeNikkeiList(0);
        } else if (type == '일별') {
            WorldStockNikkei.SiseDayNikkeiList(0);
        } 

    });

    WorldStockNikkei.SiseTimeNikkeiList(0);
   
});