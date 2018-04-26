
var DomesticStockDetailRight = {
    StockConsultList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRightCommonStockConsult",
            data: $("#frmList_DSDRightConsultInvestList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDRightConsultInvestList > #divList").html(data);

                $('.list-type-thumnail.bxslider ul').bxSlider({
                    minSlides: 1,
                    maxSlides: 1,
                    slideWidth: 250,
                    slideMargin: 0,
                    pager: true,
                    controls: false,
                    touchEnabled: true
                });
            }
        });
        return false;
    },
    InvestList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRightCommonInvestList",
            data: $("#frmList_DSDRightConsultInvestList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDRightConsultInvestList > #divList").html(data);

                $('.list-type-thumnail.bxslider ul').bxSlider({
                    minSlides: 1,
                    maxSlides: 1,
                    slideWidth: 250,
                    slideMargin: 0,
                    pager: true,
                    controls: false,
                    touchEnabled: true
                });
            }
        });
        return false;
    },
    HotSearchList: function () {
        //alert("호출");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRightCommonStockHotSearch",
            data: $("#frmList_DSDRightHFList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDRightHFList > #divList").html(data);

                $('.list-type-thumnail.bxslider ul').bxSlider({
                    minSlides: 1,
                    maxSlides: 1,
                    slideWidth: 250,
                    slideMargin: 0,
                    pager: true,
                    controls: false,
                    touchEnabled: true
                });
            }
        });
        return false;
    },
    FavoriteList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRightCommonFavoriteStock",
            data: $("#frmList_DSDRightHFList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDRightHFList > #divList").html(data);

                $('.list-type-thumnail.bxslider ul').bxSlider({
                    minSlides: 1,
                    maxSlides: 1,
                    slideWidth: 250,
                    slideMargin: 0,
                    pager: true,
                    controls: false,
                    touchEnabled: true
                });
            }
        });
        return false;
    },
    ToDayBoardCastList: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRightCommonTBrodCast",
            data: $("#frmList_DSDRightTBList").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDRightTBList > #divList").html(data);
            }
        });
        return false;
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    },
}


$(document).ready(function () {

    //탭 활성화..
    $("#consultInvestTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });
    $("#hotSearchFavoriteTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#consultInvestTab #stockConsult").on("click", function () {
        DomesticStockDetailRight.StockConsultList();
    });

    $("#consultInvestTab #invest").on("click", function () {
        DomesticStockDetailRight.InvestList();
    });

    $("#hotSearchFavoriteTab #hotSearch").on("click", function () {
        DomesticStockDetailRight.HotSearchList();
    });

    $("#hotSearchFavoriteTab #favorite").on("click", function () {
        DomesticStockDetailRight.FavoriteList();
    });

    var arjCode = $("#frmList_DSDRightConsultInvestList #arjCode").val();

    if (arjCode != "") {
        DomesticStockDetailRight.StockConsultList();
        DomesticStockDetailRight.HotSearchList();
    }
    DomesticStockDetailRight.ToDayBoardCastList();
});