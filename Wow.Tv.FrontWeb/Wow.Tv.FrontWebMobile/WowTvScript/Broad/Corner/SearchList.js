


$(document).ready(function () {

});


var totalCount = $("#CornerSearchList_hidTotalCount").val();
var currentIndex = $("#frmSearch").find("[name='currentIndex']").val();
var pageSize = $("#frmSearch").find("[name='pageSize']").val();
//alert(totalCount + ":" + currentIndex + ":" + pageSize);
$("#divPaging").html(cfGetPagingHtml(totalCount, currentIndex, pageSize, "CornerIndex.SearchList"));

