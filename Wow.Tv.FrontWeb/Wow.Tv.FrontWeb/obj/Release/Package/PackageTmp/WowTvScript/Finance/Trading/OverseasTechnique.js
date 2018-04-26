var OverseasTechnique = {
    GetData: function (condMenu, condMenuId, dateStr) {
        $('.btnCondMenu').removeClass('on');
        $('#' + condMenuId).addClass('on');

        condMenu = condMenu.trim();
        if (condMenu === "니콜라스이론") {
            condMenu = "니콜라스박스이론";
        }

        $.ajax({
            type: "POST",
            url: "/Finance/Trading/GetTechniqueData",
            data: { condMenu: condMenu, SearchDate: dateStr },
            success: function (data) {
                $("#dataArea").html(data);
                
                $('.divCondMenu').hide();
                $('#div' + condMenuId).show();

                $(document).find("#datePicker").removeClass('hasDatepicker').datepicker({
                    dateFormat: "yyyy-mm-dd",
                    language: "kr"
                }).on('changeDate', function (ev) {
                    $('#txtDate').val(ev.date.format("yyyy-MM-dd"));
                    $(this).datepicker('hide');
                });
            }
        });
    },
    DomesticStockDetailGo: function (domainUrl, arjCode) {
        location.href = domainUrl + "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + arjCode + "&menuSeq=" + MENU_SEQ_DEFINE.FINANCE.DomesticStockDetail;
        //alert(MENU_SEQ_DEFINE.Finance.DomesticStockDetail);
        return false;
    }
};

$(document).ready(function () {
    
    OverseasTechnique.GetData($('.btnCondMenu').eq(0).children().text(), $('.btnCondMenu').eq(0).attr('id'));

    $('.btnCondMenu').click(function () {
        var condMenu = $(this).children().text();
        var condMenuId = $(this).attr('id');

        OverseasTechnique.GetData(condMenu, condMenuId);
    });

    $(document).on('click','#btnSearch', function () {
        var date = $('#txtDate').val();
        if (date === "") {
            alert('검색할 날짜를 선택해주세요');
            return false;
        }
        var condMenu = $('.btnCondMenu.on').text();
        var condMenuId = $('.btnCondMenu.on').attr('id');
        OverseasTechnique.GetData(condMenu, condMenuId,date);
    });
});