
var DomesticStockKPI200 = {
    SiseTimeKPI200List: function (currentIndex) {
        $("#frmList_timeKPI200 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseTimeKPI200List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_timeKPI200").serialize(),
            success: function (data, textStatus) {
                $("#frmList_timeKPI200 > #divList").html(data);
            }
        });
        
        return false;
    },
    SiseDayKPI200List: function (currentIndex) {
        $("#frmList_dayKPI200 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseDayKPI200List?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_dayKPI200").serialize(),
            success: function (data, textStatus) {
                $("#frmList_dayKPI200 > #divList").html(data);
            }
        });

        return false;
    },
    SiseWowNetKPI200StockGroupList: function (currentIndex) {
        $("#frmList_enrollmentTopKPI200 > #currentIndex").val(currentIndex);
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/SiseWowNetKPI200StockGroupList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
            data: $("#frmList_enrollmentTopKPI200").serialize(),
            success: function (data, textStatus) {
                $("#frmList_enrollmentTopKPI200 > #divList").html(data);
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
    //SearchList: function (currentIndex) {
    //    $("#currentIndex").val(currentIndex);

    //$.ajax({
    //    type: 'POST',
    //    url: "/OperateManage/AdminManage/SearchList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
    //    data: $("#frmSearch").serialize(),
    //    success: function (data, textStatus) {
    //        $("#divList").html(data);
    //    }
    //});

    //    return false;
    //},
    //DeleteList: function () {
    //    if (AdminManageSearchList.GetCheckCount() == 0) {
    //        alert("삭제할 운영자를 선택하여 주십시오.");
    //        return false;
    //    }

    //    if (confirm(CommonMsg.DeleteConfirmMsg) == true) {
    //        $.ajax({
    //            type: 'POST',
    //            url: "/OperateManage/AdminManage/DeleteList?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
    //            data: $("#frmList").serialize(),
    //            success: function (data, textStatus) {
    //                if (data.IsSuccess == true) {
    //                    AdminManageIndex.SearchList(0);
    //                }
    //                else {
    //                    alert(data.Msg);
    //                }
    //            }
    //        });
    //    }

    //    return false;
    //},
    //OpenEdit: function (seq) {
    //    $.ajax({
    //        type: 'POST',
    //        url: "/OperateManage/AdminManage/Edit?currentMenuSeq=" + $("#hidCurrentMenuSeq").val(),
    //        data: { "seq": seq },
    //        success: function (data, textStatus) {
    //            $("#divEdit").html(data);
    //            $("#divEdit").modal("show");
    //        }
    //    });

    //    return false;
    //},
    //ExcelExport: function () {
    //    $("#frmSearch").attr("method", "POST");
    //    $("#frmSearch").attr("action", "/OperateManage/AdminManage/Excel?currentMenuSeq=" + $("#hidCurrentMenuSeq").val());
    //    $("#frmSearch").submit();

    //    return false;
    //}
};


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
    DomesticStockKPI200.SiseTimeKPI200List(0);
    DomesticStockKPI200.SiseDayKPI200List(0);
    DomesticStockKPI200.SiseWowNetKPI200StockGroupList(0);
    DomesticStockKPI200.GetHpChart('7551', '999990');

    //탭 활성화..
    $("#hpChart > li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });
});

