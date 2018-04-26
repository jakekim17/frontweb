var OpinionList = {

    SaerchColumnList: function (currentIndex, isAdd) {
        $('#currentIndex').val(currentIndex);

        if (typeof currentIndex != "undefined" && currentIndex > 0) {
            $('#Page').val(parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1);
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Opinion/SearchColumnList",
            data: $('#frmSearch').serialize(),
            async: false,
            success: function (data) {
                if (isAdd) {
                    $('#ulContents').append(data);
                } else {
                    $('#ulContents').html(data);
                    $('#opinionTitle').text($('#proSel option:selected').text());

                    OpinionList.GetBannerImg();
                }

                var newxtIndex = currentIndex + parseInt($('#PageSize').val())
                if (newxtIndex > parseInt($('#totalDataCount').val())) {
                    $('#currentIndex').val($('#totalDataCount').val());
                }
            }
        });
    },
    ChageContentsData: function (searchText, searchSeq) {
        $("#searchText").val(searchText);
        $("#searchSeq").val(searchSeq);

        OpinionList.SaerchColumnList(0);
    },
    GetBannerImg: function () {
        $.ajax({
            type: "POST",
            url: "/NewsCenter/Opinion/GetBannerImg",
            data: $('#frmSearch').serialize(),
            async: false,
            success: function (data) {
                if (data.resultData != null) {
                    var opinionUploadPath = $("#opinionUploadPath").val();
                    var uploadWebPathRoot = $("#uploadWebPathRoot").val();
                    var imgUrl = String.format("<img src='{0}{1}' alt='Opinion Photo' onerror=\"this.src ='{2}/PcStyle/images/common/no_image_870.jpg'\">", opinionUploadPath, data.resultData.IMG_BANN, uploadWebPathRoot);

                    $("#divOpinionBanner").html(imgUrl);
                }
            }
        });
    },
    ChangeTab: function (searchClass) {
        $('#searchClass').val(searchClass);

        $("#frmSearch").attr("method", "POST");
        $("#frmSearch").attr("action", "/NewsCenter/Opinion/Index?menuSeq=" + $("#CurrentMenuSeq").val());
        $("#frmSearch").submit();
        return false;
    }
};

$(document).ready(function () {

    $('#proSel').change(function () {
        var text = $(this).val();
        if (text.indexOf('_') > -1) {
            var SplitData = text.split("_");
            OpinionList.ChageContentsData(SplitData[1], SplitData[0]);
        }
    });

    $(document).scroll(function () {
        var maxHeight = $(document).height();
        var currentScroll = $(window).scrollTop() + $(window).height();

        if (maxHeight <= currentScroll + 200) {
            var totalPageCnt = parseInt($('#totalDataCount').val()) / parseInt($('#PageSize').val()) + 1;
            var CurrentPageCnt = parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1;

            if (CurrentPageCnt < totalPageCnt) {
                var nextIndex = parseInt($('#currentIndex').val()) + parseInt($('#PageSize').val());

                if (nextIndex > $('#totalDataCount').val()) {
                    var minus = nextIndex - $('#totalDataCount').val();
                    nextIndex = nextIndex - minus;
                }
                OpinionList.SaerchColumnList(nextIndex, true);
            }
        }
    });

    $('#' + searchClass).parent().addClass('on');
    $('#proSel').val(searchSeq + "_" + searchText);
    OpinionList.ChageContentsData(searchText, searchSeq);
});