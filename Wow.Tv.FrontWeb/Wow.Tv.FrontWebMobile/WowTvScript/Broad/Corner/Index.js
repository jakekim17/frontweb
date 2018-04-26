
var CornerIndex = {
    OpenVod: function (seq) {
        PopupPlayVod(seq);

        return false;
    },
    SearchList: function (currentIndex) {
        $("#divList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $("#frmSearch").find("[name='currentIndex']").val(currentIndex);

        $.ajax({
            type: 'POST',
            url: "/Broad/Corner/SearchList",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {
                $("#divList").html(data);
            }
        });

        return false;
    }
};


$(document).ready(function () {
});


var swiper = new Swiper('.sub-visual-lnb03 .sub-lnb01.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
        nextEl: '.sub-visual-lnb03 .swiper-button-next',
        prevEl: '.sub-visual-lnb03 .swiper-button-prev',
    },
});

    //CornerIndex.SearchList(0);
