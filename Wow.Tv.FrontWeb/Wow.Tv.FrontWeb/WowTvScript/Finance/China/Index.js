
var China_Index = {
    BindData: function (obj, typeCode) {
        $(obj).closest("ul").find("li").removeClass("on");
        $(obj).closest("li").addClass("on");

        if (typeCode == "Total") {
            $("#ulTotal").show();
            $("#ulMarket").hide();
            $("#ulEvent").hide();
            $("#ulNetwork").hide();
        }
        else if (typeCode == "Market") {
            $("#ulTotal").hide();
            $("#ulMarket").show();
            $("#ulEvent").hide();
            $("#ulNetwork").hide();
        }
        else if (typeCode == "Event") {
            $("#ulTotal").hide();
            $("#ulMarket").hide();
            $("#ulEvent").show();
            $("#ulNetwork").hide();
        }
        else if (typeCode == "Network") {
            $("#ulTotal").hide();
            $("#ulMarket").hide();
            $("#ulEvent").hide();
            $("#ulNetwork").show();
        }
        else if (typeCode == "Attention") {
            $("#ulAttention").show();
            $("#ulEnterprise").hide();
        }
        else if (typeCode == "Enterprise") {
            $("#ulAttention").hide();
            $("#ulEnterprise").show();
        }

        return false;
    }
}


$(document).ready(function () {
    $(".contain-aside").hide();
    //$(".contain-content").addClass("main");
    $(".location-page").hide();
    $('.contain-content').css({ 'width': 'auto' });

});




