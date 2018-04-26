var PhotoMain = {
    //BestPhosoList: function () {
    //    $.ajax({
    //        type: 'POST',
    //        url: "/NewsCenter/Photo/BestPhotoList",
    //        success: function (data, textStatus) {
    //            $("#divBestPhoto").html(data);
    //        }
    //    });
    //    return false;
    //},
    ManySeeVodList: function () {
        $.ajax({
            type: 'POST',
            url: "/NewsCenter/Photo/ManySeeVodList",
            success: function (data) {
                $("#divManySeeVod").html(data);
            }
        });
    }
}


$(document).ready(function () {

    ////인기 포토
    //PhotoMain.BestPhosoList();

    //많이 본 영상
    PhotoMain.ManySeeVodList();

    $(document).on('click', '.photoList', function () {
        NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
    });
});