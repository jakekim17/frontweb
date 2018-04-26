
var WorldStockUSAADR = {
    
    Total: function (currentMenuSeq) {
        
        //alert(currentMenuSeq);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADRTotalList?menuSeq=" + currentMenuSeq,
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                $("#frmList_USAADR > #divList").html(data);
            }
        });
        return false;
    },
    DowJones: function (currentMenuSeq) {
        //alert(currentMenuSeq);
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADRDowJones?menuSeq=" + currentMenuSeq,
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_USAADR > #divList").html(data);
            }
        });
        return false;
    },
    Nasdaq: function (currentMenuSeq) {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADRNasdaq?menuSeq=" + currentMenuSeq,
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_USAADR > #divList").html(data);
            }
        });
        return false;
    },
    SANDP500: function (currentMenuSeq) {
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADRSANDP500?menuSeq=" + currentMenuSeq,
            //data: $("#frmList_timeDowJones").serialize(),
            success: function (data, textStatus) {
                //console.log("테스트");
                $("#frmList_USAADR > #divList").html(data);
            }
        });
        return false;
    }
}


$(document).ready(function () {
    var currentMenuSeq = $("#currentMenuSeq").val();

    $(".sub-type1 a").on('click', function (e) {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#usaadr_total").click(function () {
        //alert("테스트");
        WorldStockUSAADR.Total(currentMenuSeq);
    });
    $("#usaadr_dowjones").click(function () {
        //alert("테스트");
        WorldStockUSAADR.DowJones();
    });
    $("#usaadr_nasdaq").click(function () {
        WorldStockUSAADR.Nasdaq();
    });
    $("#usaadr_sandp500").click(function () {
        WorldStockUSAADR.SANDP500();
    });

    WorldStockUSAADR.Total(currentMenuSeq);
    
});

