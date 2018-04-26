var DomesticStockIndustryPart = {
    IndustryPartList: function (menuTab) {
        
        if (menuTab != undefined) {
            $("#menuTab").val(menuTab);
        } else {
            $("#menuTab").val("Security");
        }

        var marketVal = $("#market").val();
        var targetDtVal = $(".targetDt").val();

        $("#targetDt").val(targetDtVal);
        $("#market").val(marketVal);

        //alert("targetDt: " + $("#targetDt").val() + "/market: " + $("#market").val());

        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/IndustryPartList?menuSeq=" + $("#currentMenuSeq").val(),
            data: $("#frmList_industryPart").serialize(),
            success: function (data, textStatus) {
                $("#frmList_industryPart > #divList").html(data);
                //alert($("#market").val());
                
                //console.log(targetDtVal);
            }
        });
        return false;
    },
}

$(document).ready(function () {
    var targetDtVal = $("#searchDate").val();
    
    $("#targetDt").val(targetDtVal);

    //상세페이지에서 목록으로 돌아올때
    var prevTargetDt = $("#prevTargetDt").val();
    var prevMarket = $("#prevMarket").val();
    var prevMenuTab = $("#preMenuTab").val();
    

    $(".tab-area a").on('click', function () {
       
       $(this).parent('li').addClass('on').siblings().removeClass('on');
        var market = $(this).attr("id");
        $("#market").val(market);
        $("#statusTab .swiper-slide").removeClass('on');
        $("#Security").addClass('on');
        DomesticStockIndustryPart.IndustryPartList();

        return false;
    });

    $("#searchDate").change(function () {
        $(".targetDt").val($("#searchDate").val());
        DomesticStockIndustryPart.IndustryPartList();
    })

    $(".swiper-wrapper > div").click(function () {
        
        var menuStr = $(this).attr("id");
        DomesticStockIndustryPart.IndustryPartList(menuStr);
    });

    $('#btnRefresh').click(function () {
        DomesticStockIndustryPart.IndustryPartList();
    });

    DomesticStockIndustryPart.IndustryPartList();

    if (prevTargetDt != "") {
        $('.targetDt').val(prevTargetDt);
        $('#searchDate').val(prevTargetDt);

        $('#' + prevMarket).parent('li').addClass('on').siblings().removeClass('on');
        $('#market').val(prevMarket);

        $('#' + prevMenuTab).addClass('on').siblings().removeClass('on');

        DomesticStockIndustryPart.IndustryPartList(prevMenuTab);      
    }
})