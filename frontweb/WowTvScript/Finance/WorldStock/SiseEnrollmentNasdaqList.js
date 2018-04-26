var WorldStockUSAEnrollment = {
    SortColumn: function (sortObj, sortThElements) {
        var sortdir;
        sortThElements.each(function (column) {
            $(this).click(function () {
                //alert($(this).attr("class"));
                if ($(this).is('.sort-up')) {
                    //console.log("desc");
                    $(this).removeClass("sort-up");
                    $(this).addClass('sort-down');
                    sortdir = -1;
                }
                else {
                    //console.log("sort-up");
                    $(this).addClass("sort-up");
                    $(this).removeClass('sort-down');
                    sortdir = 1;
                }

                $(this).siblings().removeClass("sort-up");
                $(this).siblings().removeClass("sort-down");

                var rec = sortObj.find('tbody tr').get();
                var val1, val2;

                rec.sort(function (a, b) {
                    if (column == 1 || column == 2 || column == 3 || column == 4 || column == 5 || column == 6) {
                        val1 = $(a).children('td').eq(column).text();
                        //console.log($(a).children('td').eq(column).children('span').attr("class"));

                        // -값인지 여부는 class 속성값 중 data-down 값이 있으면 음수처리
                        if ($(a).children('td').eq(column).children('span').hasClass("data-down")) {
                            val1 = "-" + val1;
                        }

                        val1 = CommonJs.ReplaceAll(val1, ",", "");
                        val1 = CommonJs.ReplaceAll(val1, "%", "");
                        val2 = $(b).children('td').eq(column).text();

                        // -값인지 여부는 class 속성값 중 data-down 값이 있으면 음수처리
                        if ($(b).children('td').eq(column).children('span').hasClass("data-down")) {
                            val2 = "-" + val2;
                        }

                        val2 = CommonJs.ReplaceAll(val2, ",", "");
                        val2 = CommonJs.ReplaceAll(val2, "%", "");
                        //alert(val1 + " / " + val2);
                        //console.log(column + " / " + val1 + " / " + val2);
                        val1 = parseFloat(val1);
                        val2 = parseFloat(val2);
                        console.log(column + " / " + val1 + " / " + val2);

                    }
                    else {
                        val1 = $(a).children('td').eq(column).text().toUpperCase();
                        val2 = $(b).children('td').eq(column).text().toUpperCase();
                    }

                    return (val1 < val2) ? -sortdir : (val1 > val2) ? sortdir : 0;
                });
                $.each(rec, function (index, row) {
                    sortObj.find('tbody').append(row);
                });
            });
        });
    }
};

$(document).ready(function () {
    $("#enrollmentStockTbl .btn-type-sort").click(function () {
        //console.log("테스트");
        WorldStockUSAEnrollment.SortColumn($("#enrollmentStockTbl"), $("#enrollmentStockTbl .btn-type-sort"));
        //return false;
    });
    //console.log($("#frmList_timeNasdaq > #currentIndex").val());
    $("#divPaging_enrollmentNasdaq").html(cfGetPagingHtml(totalDataCount_enrollmentNasdaq, $("#frmList_enrollmentNasdaq > #currentIndex").val(), $("#frmList_enrollmentNasdaq > #pageSize").val(), "WorldStockNasdaq.SiseEnrollmentNasdaqList"));
});


