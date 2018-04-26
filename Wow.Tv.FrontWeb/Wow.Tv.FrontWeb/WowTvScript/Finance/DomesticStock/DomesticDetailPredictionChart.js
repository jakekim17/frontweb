var DomesticDetailPredictionChart = {
    GetHpChart: function (trId, code, width, height) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    
                    var startDate = data.splitList[4];
                    var endDate = data.splitList[5];

                    if (startDate.substr(0, 4) >= '2000') {
                        startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                        endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                        $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    }
                }
            }
        });
    }
};

$(document).ready(function () {
    //탭 활성화..
    $("#stockPredictionChartTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    CommonJs.ElementsValTotal(".signalCnt", "#signalTotal");

    var arjCode = $("#stockPredictionChart #arjCode").val();

    if (arjCode != "undefined") {
        DomesticDetailPredictionChart.GetHpChart('9101', arjCode, '900', '285');
    }

});
