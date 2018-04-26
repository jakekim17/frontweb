
$(document).ready(function() {
    $('.datepicker').datepicker();
    
    $("#btnEmailCheck").click(function () {
        var emailValue = $("#txtEmail").val();
        window.co.checkEmail(emailValue);
    });
    

    $('#dateRangePicker').datepicker({
        format: "YYYY-MM-DD",
        language: "kr"
    });


    $("#dtpTest").click(function() {
        $('#datepicker').datepicker('show');
    });
    
    $('#showDatepicker').datepicker()
        .on('changeDate', function (ev) {
            //if (ev.date.valueOf() > endDate.valueOf()) {
            //    $('#alert').show().find('strong').text('종료일자가 시작일자보다 작을 수 없습니다.');
            //} else {
            //    $('#alert').hide();
                //var startDate = new Date(ev.date);
                $('#startDate').val($('#showDatepicker').data('date'));
            //}
                $('#showDatepicker').datepicker('hide');
        });
});