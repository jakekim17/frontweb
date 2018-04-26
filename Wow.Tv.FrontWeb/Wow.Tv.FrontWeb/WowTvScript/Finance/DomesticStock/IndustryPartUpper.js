var DomesticStockIndustryPartUpper = {
    IndustryPartUpperKospi: function () {
        //alert($("#currentMenuSeq").val());
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/IndustryPartUpperKospi?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_industryPartUpper > #divList").html(data);
            }
        });
        return false;
    },
    IndustryPartUpperKosdaq: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/IndustryPartUpperKosdaq?menuSeq=" + $("#currentMenuSeq").val(),
            //data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_industryPartUpper > #divList").html(data);
            }
        });
        return false;
    }
}

$(document).ready(function () {
    $(".tab-type1 a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#kospi").click(function () {
        DomesticStockIndustryPartUpper.IndustryPartUpperKospi();
    });
    $("#kosdaq").click(function () {
        DomesticStockIndustryPartUpper.IndustryPartUpperKosdaq();
    });

    DomesticStockIndustryPartUpper.IndustryPartUpperKospi();
});