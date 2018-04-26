
var DomesticStockIndustryPart = {
    IndustryPartList: function () {
        
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/IndustryPartList?menuSeq=" + $("#currentMenuSeq").val(),
            data: $("#frmIndustryPartSearch").serialize(),
            success: function (data, textStatus) {
                $("#frmList_industryPart > #divList").html(data);
                var marketVal = $("#market").val();
                var targetDtVal = $(".targetDt").val();
                $("#targetDt").val(targetDtVal);
                //console.log(targetDtVal);

                FinanceChartJs.IndustryPartSecurityChart($(".securityChart"), marketVal, "s", targetDtVal);
                FinanceChartJs.IndustryPartForeignerChart($(".foreignerChart"), marketVal, "f", targetDtVal);
                FinanceChartJs.IndustryPartPersonalChart($(".personalChart"), marketVal, "p", targetDtVal);
            }
        });
        return false;
    },
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

                var rec = sortObj.find('tbody > tr').get();
                var val1, val2;

                rec.sort(function (a, b) {
                    if (column == 1 || column == 2 || column == 3) {
                        val1 = $(a).children('td').eq(column).text();
                        val1 = CommonJs.ReplaceAll(val1, ",", "");
                        val2 = $(b).children('td').eq(column).text();
                        val2 = CommonJs.ReplaceAll(val2, ",", "");
                        //alert(val1 + " / " + val2);
                        val1 = parseInt(val1);
                        val2 = parseInt(val2);
                        //console.log(column + " / " + val1 + " / " + val2);
                        
                    }
                    else {
                        val1 = $(a).children('td').eq(column).text().toUpperCase();
                        val2 = $(b).children('td').eq(column).text().toUpperCase();
                    }

                    return (val1 < val2) ? -sortdir : (val1 > val2) ? sortdir : 0;
                });
                $.each(rec, function (index, row) {
                    $('tbody').append(row);
                });
            });
        });
    }
}


$(document).ready(function () {
    //alert("테스트");
    var parseDate = function (value) {
        var m = value.match(/^(\d{4})(\/|-)?(\d{1,2})(\/|-)?(\d{1,2})$/);
        if (m)
            value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

        return value;
    }

    var nowDate = function () {
        var date = new Date();

        var year = date.getFullYear();

        var month = new String(date.getMonth() + 1);

        var day = new String(date.getDate());

        // 한자리수일 경우 0을 채워준다. 
        if (month.length == 1) {
            month = "0" + month;
        }

        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }

    var checkDate = function (value, alertStr) {
        var m = value.match(/^(\d{4})(\/|-)?(\d{1,2})(\/|-)?(\d{1,2})$/);
        if (m) {
            return value;
        }
        else {
            alert(alertStr);
            //console.log(nowDate());
            //return nowDate();
            return "2017-06-23";
        }
    }

    $(".btnMarket").click(function () {
        var markStr = $(this).attr("id");
        if (markStr == "T") {
            $("#market").val(markStr);
            //alert($("#market").val());
        }
        else if (markStr == "K") {
            $("#market").val(markStr);
        }
        DomesticStockIndustryPart.IndustryPartList();
        return false;
    });

    $(".viewMode").click(function () {
        DomesticStockIndustryPart.IndustryPartList();
    });

    //$('.btn-calendar button').datepicker({
    $('.search-local.date').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        language: "kr"
    }).on('changeDate', function (e) {
        $(".targetDt").val(e.format(0, "yyyy-mm-dd"));
        //$(".targetDt").val("2017-06-23");
    });

    $('.btn-type3').click(function () {
        //console.log($(".targetDt").val());
        //$(".targetDt").val(checkDate($(".targetDt").val()));
        $(".targetDt").val(checkDate($(".targetDt").val(), "날짜 형식에 맞지 않습니다."));
        DomesticStockIndustryPart.IndustryPartList();
    });

    $('.btnRefresh').click(function () {
        DomesticStockIndustryPart.IndustryPartList();
    });

    DomesticStockIndustryPart.IndustryPartList();
    
});

