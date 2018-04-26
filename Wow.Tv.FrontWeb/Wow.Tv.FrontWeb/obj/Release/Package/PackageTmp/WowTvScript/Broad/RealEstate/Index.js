;

var IngIndex = {
    ChangeTab: function (obj, ingYn) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).parent().addClass("on");

        IngIndex.BindSearch(ingYn);

        return false;
    },
    BindSearch: function (ingYn) {
        $("#divSearchPartial").html("<div style='text-align:center;'><img src='/Content/images/bigWaiting.gif' width='30px;' /></div>");

        $.ajax({
            type: 'POST',
            url: "/Broad/Ing/SearchPartial",
            data: { "broadSectionCode": "RealEstate", "ingYn": ingYn },
            success: function (data, textStatus) {
                $("#divSearchPartial").html(data);
            }
        });

        return false;
    },
    BindProgramList: function () {
        $.ajax({
            type: 'POST',
            url: "/Broad/TvMain/ProgramList",
            data: {},
            success: function (data, textStatus) {
                $("#divProgramList").html(data);
            }
        });

        return false;
    }

}




$(document).ready(function () {


    var selectTarget = $('.selector select');
    selectTarget.change(function () {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    });


    IngIndex.BindSearch("Y");
    //IngIndex.BindSearch("N");
    IngIndex.BindProgramList();

});
