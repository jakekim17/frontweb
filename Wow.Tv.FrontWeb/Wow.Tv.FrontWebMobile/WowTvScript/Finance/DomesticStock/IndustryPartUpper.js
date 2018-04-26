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
    },

}

$(document).ready(function () {
    console.log("로드 테스트");
    $(".tab-area a").on('click', function () {
        //alert('on');
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });
    //console.log($("#kospi").attr("id"));
    $(".tab-area #kospi").click(function () {
        //alert("코스피");
        DomesticStockIndustryPartUpper.IndustryPartUpperKospi();
    });
    $(".tab-area #kosdaq").click(function () {
        //alert("코스닥");
        DomesticStockIndustryPartUpper.IndustryPartUpperKosdaq();
    });
   
    DomesticStockIndustryPartUpper.IndustryPartUpperKospi();

    var prevTab = $("#prevTab").val();
    if (prevTab == 't') {
        DomesticStockIndustryPartUpper.IndustryPartUpperKospi();
    } else if (prevTab == 'k') {
        $("#kosdaq").parent('li').addClass('on').siblings().removeClass('on');
        DomesticStockIndustryPartUpper.IndustryPartUpperKosdaq();
    }

});