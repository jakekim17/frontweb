
var OnAirIndex = {
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
    },
    MoveFAQ: function () {
        alert("TODO");

        return false;
    },
    OpenVod: function () {
        PopupPlayLiveTv();

        return false;
    },
    OpenPopup: function (url) {
        if (url == "") {
            alert("준비된 페이지가 없습니다.");
        }
        else {
            window.open(url);
        }

        return false;
    }
};




$(document).ready(function () {
    
    OnAirIndex.BindProgramList();

});

