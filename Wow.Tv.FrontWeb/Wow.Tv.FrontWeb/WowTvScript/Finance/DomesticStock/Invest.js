
var DomesticStockInvest = {
    InvestDay: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestDay",
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    },
    InvestWeek: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/InvestWeek",
            //data: $("#frmList_dayNasdaq").serialize(),
            success: function (data, textStatus) {
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
            //data: $("#frmList_daySANDP500").serialize(),
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
            //data: $("#frmList_daySANDP500").serialize(),
            success: function (data, textStatus) {

                $("#frmList_Invest > #divList").html(data);
            }
        });

        return false;
    }

}


$(document).ready(function () {

    $(".tab-type1 a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#day").click(function () {
        //alert("테스트");
        DomesticStockInvest.InvestDay();
    });
    $("#week").click(function () {
        DomesticStockInvest.InvestWeek();
    });
    $("#month").click(function () {
        DomesticStockInvest.InvestMonth();
    });
    $("#quarter").click(function () {
        //alert("테스트");
        DomesticStockInvest.InvestQuarter();
    });

    DomesticStockInvest.InvestDay();
    
});

