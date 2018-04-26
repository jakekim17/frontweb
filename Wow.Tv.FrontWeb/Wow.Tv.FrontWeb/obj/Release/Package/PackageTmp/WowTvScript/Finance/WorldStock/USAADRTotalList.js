var WorldStockUSAADRTotalList = {
    DetailView: function (currentEngPartName) {
        //alert($("#currentMenuSeq").val()); 
        //console.log($("#partNum").val());
        $.ajax({
            type: 'POST',
            url: "/Finance/WorldStock/USAADRDetailList?menuSeq=" + $("#currentMenuSeq").val(),
            data: $("#frmList_USAADRTotalList_" + currentEngPartName).serialize(),
            success: function (data, textStatus) {
                //alert("#frmList_USAADRTotalList_" + currentEngPartName);
                //$("#frmList_USAADRTotalList_" + currentEngPartName).closest(".accordion").addClass("on");
                $("#frmList_USAADRTotalList_" + currentEngPartName + " > #divList").html(data);
                
                return false;
            }
        });
    },
    SortColumn: function (sortObj, sortThElements) {
        var sortdir;
        sortThElements.each(function (column) {
            $(this).click(function () {
                //alert(column);
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
                        console.log($(a).children('td').eq(column).children('span').attr("class"));

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

}

$(document).ready(function () {
    $(".btn-type4.view-detail").click(function () {
        var currentEngPartName = $(this).next().val()
        //console.log(currentEngPartName);
        //$("#frmList_USAADRTotalList_" + currentPartName).val(currentPartName);
        //console.log($("#frmList_ThemaPartNameList_" + currentPartNum).val());
        
        WorldStockUSAADRTotalList.DetailView(currentEngPartName);

        $('.btn-type4.view-detail button').text('보기');
        if ($(this).parent().parent().hasClass('on')) {

            $(this).parent().parent('tr').removeClass('on');
            $(this).parent().parent().next('.accordion').removeClass('on');
            $(this).children('button').text('보기');
        } else {

            $('tr').removeClass('on');
            $(this).parent().parent('tr').addClass('on');
            $(this).parent().parent().next('.accordion').addClass('on');
            $(this).children('button').text('닫기');
        }
        return false;
    });
    $(".btn-close-accordion").click(function () {
        $(this).parent().parent().parent().removeClass('on').prev().removeClass('on');
        $('.btn-type4.view-detail button').text('보기');
        return false;
    });

    $("#usaadrTotalListTbl .btn-type-sort").click(function () {
        //console.log("테스트");
        WorldStockUSAADRTotalList.SortColumn($("#usaadrTotalListTbl"), $("#usaadrTotalListTbl .btn-type-sort"));
        return false;
    });
});
