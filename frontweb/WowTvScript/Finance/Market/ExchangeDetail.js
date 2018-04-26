
var MarketExchangeDetail = {
    CalSel: function () {
        var subject = $('#selector01>option:selected').text();
        var id = $('#selector01>option:selected').val();
        if (subject == "미국 USD") {
            $("#cal-unit1").text("$");
        }
        if (subject == "영국 GBP") {
            $("#cal-unit1").text("￡");
        }
        if (subject == "유럽연합 EUR") {
            $("#cal-unit1").text("€");
        }
        if (subject == "일본 JPY(100엔)") {
            $("#cal-unit1").text("￥");
        }
        if (subject == "중국 CNY") {
            $("#cal-unit1").text("￥");
        }
        if (subject == "태국 THB") {
            $("#cal-unit1").text("B");
        }
        if (subject == "호주 AUD") {
            $("#cal-unit1").text("A$");
        }
        MarketExchangeDetail.CalcExchange();
    },
    CalSel1: function () {
        var subject = $('#selector02>option:selected').text();
        var id = $('#selector02>option:selected').val();
        if (subject == "미국 USD") {
            $("#cal-unit2").text("$");
        }
        if (subject == "영국 GBP") {
            $("#cal-unit2").text("￡");
        }
        if (subject == "유럽연합 EUR") {
            $("#cal-unit2").text("€");
        }
        if (subject == "일본 JPY(100엔)") {
            $("#cal-unit2").text("￥");
        }
        if (subject == "중국 CNY") {
            $("#cal-unit2").text("￥");
        }
        if (subject == "태국 THB") {
            $("#cal-unit2").text("B");
        }
        if (subject == "호주 AUD") {
            $("#cal-unit2").text("A$");
        }
        if (subject == "대한민국 원 KRW") {
            $("#cal-unit2").html('&#8361;');
        }
        MarketExchangeDetail.CalcExchange();
    },
    SetCommaVal: function (n) {
        var reg = /(^[+-]?\d+)(\d{3})/;
        n += '';
        while (reg.test(n))
            n = n.replace(reg, '$1' + ',' + '$2');

        return n;
    },
    CalcExchange: function () {
        val = $('#calculator-money01').val().replace(/[^0-9]/gi, "")
        $('#calculator-money01').val(MarketExchangeDetail.SetCommaVal(val));
        var id = $('#selector01>option:selected').val();
        var id2 = $('#selector02>option:selected').val();
        val1 = (val * id) / id2;
        val1 = val1.toFixed(2);
        $('#calculator-money02').val(MarketExchangeDetail.SetCommaVal(val1));
       
    }
}


$(document).ready(function () {
    $("#calculator-money01").val("1");
    var id = $("#selector01>option:selected").val();
    val1 = 1 * id;
    $("#calculator-money02").val(MarketExchangeDetail.SetCommaVal(val1));
    //alert("테스트");

    $("#selector01").change(function () {
        MarketExchangeDetail.CalSel();
    });

    $("#selector02").change(function () {
        MarketExchangeDetail.CalSel1();
    });
});

