

$(document).ready(function () {

    //$("#Search_stTotalCount").text($("#SearchListPartial_hidTotalCount").val() + "개");

});



var totalCount = $("#SearchList_hidTotalCount").val();
var currentIndex = $("#frmSearch").find("[name='currentIndex']").val();
var pageSize = $("#frmSearch").find("[name='pageSize']").val();
//alert(totalCount + ":" + currentIndex + ":" + pageSize);
$("#SearchList_divPaging").html(cfGetPagingHtml(totalCount, currentIndex, pageSize, "BroadWatchIndex.SearchList"));
