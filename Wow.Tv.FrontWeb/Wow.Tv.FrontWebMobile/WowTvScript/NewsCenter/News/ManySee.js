var NewsManySee = {
    ChangeContent: function (elementId) {
        $('#' + elementId).closest('ul').find('li').removeClass('on');
        $('#' + elementId).parent().addClass('on');

        $('.ulContents').hide();
        $('#ul' + elementId).show();
    }
};

$(document).ready(function () {
    if (tabType == "") {
        NewsManySee.ChangeContent('total');
    } else {
        NewsManySee.ChangeContent(tabType);
    }
});