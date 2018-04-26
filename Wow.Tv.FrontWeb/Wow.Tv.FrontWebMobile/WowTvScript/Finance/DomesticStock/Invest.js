var DomesticStockInvest = {
    InvestDay: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestDay",
            data: $("#frmList_Invest").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                //alert("일 성공");
                
                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    },
    InvestWeek: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestWeek",
            data: $("#frmList_Invest").serialize(),
            success: function (data, textStatus) {
                //alert("달 성공");
               
                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    },
    InvestMonth: function () {
        //alert("테스트");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestMonth",
            data: $("#frmList_Invest").serialize(),
            success: function (data, textStatus) {

                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    },
    InvestQuarter: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestQuarter",
            data: $("#frmList_Invest").serialize(),
            success: function (data, textStatus) {

                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    }
}


$(document).ready(function () {

    $("#Trading").on('change', function () {

        var tradeVal = $("#Trading").val();
        //alert(tradeVal);
        if (tradeVal == 'day') {
            //alert("day");
            
            DomesticStockInvest.InvestDay();
        } else if (tradeVal == 'week') {
            //alert("week");
            DomesticStockInvest.InvestWeek();
        } else if (tradeVal == 'month') {
            //alert("month");
            DomesticStockInvest.InvestMonth();
        } else if (tradeVal == 'quarter') {
            //alert("quater");
            DomesticStockInvest.InvestQuarter();
        }        
    });

    //$("#Security").click(function () {

    //    $("#menuTab").val("Security");
        
    //});

    $(".swiper-wrapper > div").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        $("#menuTab").val($(this).attr("id"));
        //alert($("#menuTab").val());
        var tradeVal = $("#Trading").val();
        if (tradeVal == 'day') {
            DomesticStockInvest.InvestDay();
        } else if (tradeVal == 'week') {
            DomesticStockInvest.InvestWeek();
        } else if (tradeVal == 'month') {
            DomesticStockInvest.InvestMonth();
        } else if (tradeVal == 'quarter') {
            DomesticStockInvest.InvestQuarter();
        }      
    })




    DomesticStockInvest.InvestDay();

});