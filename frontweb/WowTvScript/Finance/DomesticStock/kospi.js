
var DomesticStockKospi = {
    SiseTimeKospiList: function (currentIndex) {
        $("#frmList_timeKospi > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseTimeKospiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeKospi").serialize(),
            //beforeSend: function (xhr) {
            //    xhr.setRequestHeader("Connection", "close");
            //},
            success: function (data, textStatus) {
                $("#frmList_timeKospi > #divList").html(data);
            }
        });

        return false;
    }, 
    SiseDayKospiList: function (currentIndex) {
        $("#frmList_dayKospi > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseDayKospiList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayKospi").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayKospi > #divList").html(data);
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

                    if(startDate.substr(0, 4) >= '2000'){
                        startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                        endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                        //$("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    }
                }
            }
        });
    }
}


$(document).ready(function () {
    
    //$("#btnSearch").click(function () {
    //    AdminManageIndex.SearchList(0);

    //    return false;
    //});

    //$("#frmSearch").keydown(function () {
    //    if (event.keyCode == 13) {
    //        $("#btnSearch").click();

    //        return false;
    //    }
    //});

    //$("#btnDelete").click(function () {
    //    AdminManageIndex.DeleteList();

    //    return false;
    //});

    //$("#btnCreate").click(function () {
    //    AdminManageIndex.OpenEdit(0);

    //    return false;
    //});

    //$("#btnExcel").click(function () {
    //    AdminManageIndex.ExcelExport();

    //    return false;
    //});

    //$("#btnSearch").click();
    DomesticStockKospi.SiseTimeKospiList(0);
    DomesticStockKospi.SiseDayKospiList(0);
    DomesticStockKospi.GetHpChart('7551', '999901');

    //탭 활성화..
    $("#hpChart > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });
});

