var LandMain = {

    LandList: function (wowCode) {

        var menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;

        if (wowCode == "W010") {
            menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;
        }
        else if (wowCode == "W065") {
            menuSeq = MENU_SEQ_DEFINE.LAND.LOCALSELF;
        }
        //분양 클로즈업
        else if (wowCode == "W025") {
            menuSeq = MENU_SEQ_DEFINE.LAND.CLOSEUP;
        }
        //부동산 투자의 맥
        else if (wowCode == "W066") {
            menuSeq = MENU_SEQ_DEFINE.LAND.INVESTMENT;
        }
        //부동산 컨설팅
        else if (wowCode == "W066") {
            menuSeq = MENU_SEQ_DEFINE.LAND.CONSULTING;
        }

        var sUrl = String.format("/NewsCenter/Land/Index?menuSeq={0}&subMenu={1}&wowcode={2}", menuSeq, 'land', wowCode);

        location.href = sUrl;

        return false;
    },
    ManySeeNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/Land/ManySeeNews",
            async: false,
            success: function (data, textStatus) {
                $("#divManySeeNews").html(data);
            }
        });
        return false;
    },
    CardNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/Land/CardNews",
            success: function (data) {
                $("#divCardNews").html(data);
            }
        });
        return false;
    },
    PhotoNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/Land/PhotoNews",
            async: false,
            success: function (data) {
                $("#divPhotoNews").html(data);
                if ($("#divPhotoNews").find("li").length > 0) {
                    PhotoNewsSlider('photoNewsSlider');
                }
            }
        });
        return false;
    },
    HotNews: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/Land/HotNews",
            success: function (data) {
                $("#h2HotNews").after(data);
            }
        });
        return false;
    },
    GetMap: function (searchAddress) {
        if (searchAddress == "") {
            searchAddress = "서울";
        } else {
            searchAddress = searchAddress.replace(",", " ");
        }

        var map = new naver.maps.Map('map', {
            zoom: 10,
            scrollWheel: false,
            zoomControl: true, //줌 컨트롤의 표시 여부
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT
            }
        });

        naver.maps.Service.geocode({ address: searchAddress }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                //return alert(address + '의 검색 결과가 없거나 기타 네트워크 에러');
                LandMain.GetMap("서울");
            } else {
                var result = response.result, item = result.items[0];
                var myaddr = new naver.maps.LatLng(item.point.y, item.point.x);
                map.setCenter(myaddr);
            }
        });
        return false;
    },
    GetAddress: function () {
        var sido = $("#sido option:selected").val() == "도/시" ? "" : $("#sido option:selected").val().trim();
        var gugun = $("#gugun option:selected").val() == "구/시/군" ? "" : $("#gugun option:selected").val().trim();
        var dong = $("#dong option:selected").val() == "읍/면/동" ? "" : $("#dong option:selected").val().trim();
        
        $.ajax({
            method: "POST",
            url: "/NewsCenter/Land/GetAddress",
            data: { Sido: sido, Gugun: gugun },
            success: function (data, textStatus) {
                var txt = '';
                var prevDong = "";

                if (sido != "") { //시가 선택되었다면
                    if (sido != "세종") {
                        if (gugun != "") {//구,군이 선택되었다면 동정보 가져오기
                            txt += '<option value="">읍/면/동</option>';
                            for (var i = 0; i < data.data.Dong.length; i++) {
                                var splitDong = data.data.Dong[i].split(" ");
                                if (splitDong[0] != prevDong) {
                                    txt += '<option value="' + splitDong[0] + '">' + splitDong[0] + '</option>';
                                }
                                prevDong = splitDong[0];
                            }
                            $("#dong").html(txt);

                            if (dong != "") {
                                $("#dong").val(dong).prop("selected", true);
                            }
                        } else {
                            txt += '<option value="">구/시/군</option>';
                            for (var i = 0; i < data.data.Gugun.length; i++) {
                                txt += '<option value="' + data.data.Gugun[i] + '">' + data.data.Gugun[i] + '</option>';
                            }
                            $("#gugun").html(txt);
                        }
                    } else {//세종시 선택되었을때
                        txt += '<option value=""> - </option>';
                        $("#gugun").html(txt);

                        //동정보 가져오기
                        txt = '';
                        txt += '<option value="">읍/면/동</option>';
                        for (var i = 0; i < data.data.Dong.length; i++) {
                            var splitDong = data.data.Dong[i].split(" ");
                            if (splitDong[0] != prevDong) {
                                txt += '<option value="' + splitDong[0] + '">' + splitDong[0] + '</option>';
                            }
                            prevDong = splitDong[0];
                        }
                        $("#dong").html(txt);

                        if (dong != "") {
                            $("#dong").val(dong).prop("selected", true);
                        }
                    }
                } else {
                    txt += '<option value="">도/시</option>';
                    for (var i = 0; i < data.data.Sido.length; i++) {
                        txt += '<option value="' + data.data.Sido[i] + '">' + data.data.Sido[i] + '</option>';
                    }
                    $("#sido").html(txt);
                }

                var searchText = "";//검색할 주소값.

                if (sido != "") {
                    searchText = sido;
                    if (sido != "세종") {
                        if (gugun != "") {
                            searchText += "," + gugun;
                            if (dong != "") {
                                searchText += "," + dong;
                            }
                        }
                    } else {
                        if (dong != "") {
                            searchText += "," + dong;
                        }
                    }
                }
                $("#SearchText").val(searchText);
            }
        });
        return false;
    },
    SearchList: function () {
        var menuSeq = MENU_SEQ_DEFINE.LAND.GENERAL;
        var sUrl = String.format("/NewsCenter/Land/Index?menuSeq={0}&subMenu={1}&wowcode={2}", menuSeq, 'land', 'W010');

        $('#frmSearch').attr('method', 'POST');
        $('#frmSearch').attr('action', sUrl);
        $('#frmSearch').submit();

        return false;
    },
    GetAdBanner: function () {
        $.ajax({
            method: 'POST',
            url: "/NewsCenter/Land/GetADBanner",
            success: function (data) {
                console.log(data);
                $("#divBanner").html(data);
            }
        });
        return false;
    }
}

$(document).ready(function () {

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    LandMain.GetAdBanner();

    //많이 본 뉴스
    LandMain.ManySeeNews();

    //카드 뉴스
    LandMain.CardNews();

    //이슈 갤러리
    LandMain.PhotoNews();

    //핫한 뉴스
    LandMain.HotNews();

    $('.btnGoNewsPhotoView').click(function () {
        if ($(this).hasClass('onPhoto')) {
            NewsCommon.GoNewsDetailView('photo', '', '', $(this).attr('id'));
        } else {
            $('.btnGoNewsPhotoView').removeClass('onPhoto');
            $(this).addClass('onPhoto');
        }
    });

    $("#sido").on("change", function () {
        $("#gugun").html('<option>구/시/군</option>');
        $("#dong").html('<option>읍/면/동</option>');

        LandMain.GetAddress();
    });

    $("#gugun").on("change", function () {
        $("#dong").html('<option>읍/면/동</option>');
        LandMain.GetAddress();
    });

    $("#dong").on("change", function () {
        LandMain.GetAddress();
    });

    $("#btnSearch").on('click', function () {
        LandMain.SearchList();
    });

    $('#sido').val('').prop('selected', true);
    $('#gugun').val('').prop('selected', true);
    $('#dong').val('').prop('selected', true);

    LandMain.GetMap(searchAddress);
    LandMain.GetAddress();
});