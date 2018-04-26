var DomesticStockKosdaq = {
    SiseTimeKosdaqList: function (currentIndex) {
        $("#frmList_Kosdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseTimeKosdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Kosdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Kosdaq > #divList").html(data);
            }
        });

        return false;
    },
    SiseDayKosdaqList: function (currentIndex) {
        $("#frmList_Kosdaq > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseDayKosdaqList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_Kosdaq").serialize(),
            success: function (data, textStatus) {
                $("#frmList_Kosdaq > #divList").html(data);
            }
        });

        return false;
    },
    GetHpChart: function (trId, code) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    var startDate = data.splitList[4];
                    var endDate = data.splitList[5];

                    if (startDate.substr(0, 4) >= '2000') {
                        startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                        endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);
                        $('#txtChart').html('<span class="font-color03">KOSDAQ</span>' + '<span class="num"> ' + startDate + '~' + endDate + '</span>');
                    }
                }
            }
        });
    }
}


$(document).ready(function () {

    $(".tab-area a").on('click', function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
        var type = $(this).text();

        if (type == "시간대별") {
            DomesticStockKosdaq.SiseTimeKosdaqList(0);
        } else if (type == "일별") {
            DomesticStockKosdaq.SiseDayKosdaqList(0);
        }
    })

    DomesticStockKosdaq.SiseTimeKosdaqList(0);    
    DomesticStockKosdaq.GetHpChart('7551', '999201');

    //탭 활성화..
    $("#hpChart > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });
});

