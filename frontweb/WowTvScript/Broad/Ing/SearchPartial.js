
var IngSearchPartial = {
    SearchList: function (currentIndex) {
        var divObj = $("#divSearchPartial");

        $(divObj).find(".devList").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $(divObj).find("form").find("[name='currentIndex']").val(currentIndex);
        
        $.ajax({
            type: 'POST',
            url: "/Broad/Ing/SearchListPartial",
            data: $(divObj).find("form").serialize(),
            success: function (data, textStatus) {
                $(divObj).find(".devList").html(data);
            }
        });

        return false;
    }

};


$(document).ready(function () {

    $("#SearchPartial_frmSearch").keydown(function () {
        if (event.keyCode == 13) {
            IngSearchPartial.SearchList(0);

            return false;
        }
    });


    var selectTarget = $('.selector select');
    selectTarget.change(function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    }); 

    IngSearchPartial.SearchList(0);
});
