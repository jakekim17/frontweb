var LandList = {
    SearchList: function (currentIndex, isAdd) {
        $('#currentIndex').val(currentIndex);

        if (typeof currentIndex != "undefined" && currentIndex > 0) {
            $('#Page').val(parseInt($('#currentIndex').val()) / parseInt($('#PageSize').val()) + 1);
        }

        if (typeof isAdd != "undefined" && isAdd) {
            $('#IsAppend').val('Y');
        } else {
            $('#IsAppend').val('N');
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Land/SearchList",
            data: $("#frmSearch").serialize(),
            async: false,
            success: function (data) {
                if (isAdd) {
                    $("#divContents").append(data);
                } else {
                    $("#divContents").html(data);
                    //LandList.GetSectionData();
                }

                var newxtIndex = currentIndex + parseInt($('#PageSize').val())
                if (newxtIndex > parseInt($('#totalDataCount').val())) {
                    $('#currentIndex').val($('#totalDataCount').val());
                }
            }
        });
    },
    GetAddress: function () {
        var sido = $("#sido option:selected").val();
        var gugun = $("#gugun option:selected").val();

        if (typeof sido == "undefined") {
            sido = "";
        }

        if (typeof gugun == "undefined") {
            gugun = "";
        }

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Land/GetAddress",
            data: { Sido: sido, Gugun: gugun },
            success: function (data, textStatus) {
                var txt = '';
                var prevDong = "";

                if (sido != "") { //시가 선택되어있다면
                    if (sido != "세종") {

                        if (gugun == "") {//구,군이 선택이 안되어있다면
                            txt += '<option value="">시/군/구</option>';
                            for (var i = 0; i < data.data.Gugun.length; i++) {
                                txt += '<option value="' + data.data.Gugun[i].trim() + '">' + data.data.Gugun[i].trim() + '</option>';
                            }
                            $("#gugun").html(txt);
                        }

                    } else {//세종시 선택되었을때
                        txt += '<option value=""> - </option>';
                        $("#gugun").html(txt);
                    }
                } else {
                    txt += '<option value="">시/도</option>';
                    for (var i = 0; i < data.data.Sido.length; i++) {
                        txt += '<option value="' + data.data.Sido[i].trim() + '">' + data.data.Sido[i].trim() + '</option>';
                    }
                    $("#sido").html(txt);

                    txt = '<option value="">시/군/구</option>';
                    $('#gugun').html(txt);
                }

                var searchText = ""; // 검색할 주소

                if (sido != "") {
                    searchText = sido;
                    if (sido != "세종") {
                        if (gugun != "") {
                            searchText += "," + gugun;
                        }
                    } else {
                        if (dong != "") {
                            searchText += "," + dong;
                        }
                    }

                }

                $("#SearchText").val(searchText);
                LandList.SearchList(0);
            }
        });
    }
};

$(document).ready(function () {
    LandList.GetAddress();

    // 스크롤 이벤트
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
                LandList.SearchList(nextIndex, true);
            }
        }
    });

    $("#sido").on("change", function () {
        $("#gugun").html('<option value="">시/군/구</option>');
        LandList.GetAddress();
    });

    $("#gugun").on("change", function () {
        LandList.GetAddress();
    });

});