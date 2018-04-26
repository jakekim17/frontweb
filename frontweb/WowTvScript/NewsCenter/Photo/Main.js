$(document).ready(function () {
    $("#mainTabArea > ul > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        if ($(this).text() == "포토") {
            $("#galleryArea").show();
            $("#vodArea").hide();
        } else {
            $("#vodArea").show();
            $("#galleryArea").hide();
        }
    });

    if ($('#PhotoNewsSlider').find('li').length > 0) {
        PhotoNewsSlider('PhotoNewsSlider');
    }
});