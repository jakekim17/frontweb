var Rank = {
    GetList: function (time, sect) {
        
        if (time != "") {
            $("input[name='RnkTime']").val(time);
        }
        if (sect != "") {
            $("input[name='Sect']").val(sect);
        }

        //alert(time + "/" + sect);
        $.ajax({
            type: "POST",
            url: "/Finance/Trading/RankData?currentMenuSeq=" + menuSeq,
            data: $("#rankfrm").serialize(),
            success: function (data) {
                //console.log(data);
                $("#dataArea").html(data);
            }
            
        });

    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    }
}


$(document).ready(function () {
    Rank.GetList('', '');

    $("#time > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });

    $("#rankTab > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });
});