var LandIndex = {

    NewsSelDate: function (selDate, index) {

        //console.log(index);

        $('.calendar-news-week ul li a').removeClass('on');
        $("[name='aNewsSelDate']").each(function (index) {

            //console.log(selDate.substring(5, 10));
            //console.log($(this).text());

            if (selDate.substring(5, 10) == $(this).text()) {
                $(this).addClass('on');
            }
        });

        $("#selDateIndex").val(index);
        $("#StartDate").val(selDate);
        $("#EndDate").val(SetAddDay(selDate, 1));
        $("#btnWowNewsOff").click();
    },

    //상단 뉴스 일자 표기
    NewsWeekDate: function () {

        var today = $("#hdToday").val();
        var basicDate = $("#hdBasicDate").val();

        var ulHtml = "";

        for (i = 0; i >= -6; i--) {
            var classToday = "";
            var addDate = SetAddDay(basicDate, i);

            if (today == addDate) {

                classToday = "class='today'";
            }

            ulHtml += String.format('<li {0} ><a href="javascript:LandIndex.NewsSelDate(\'{1}\', {2})" name="aNewsSelDate">{3}</a></li>', classToday, addDate, i, new Date(addDate).format("MM-dd"));
        }

        $("#ulDate").html(ulHtml);
    },
    /**
     * @description 뉴스 리스트 
     */
    NewsList: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();
        else { $("#currentIndex").val(currentIndex); }

        currentIndex = parseInt(currentIndex)
        var pageSize = parseInt($("#PageSize").val());
        var currentPageNo = Math.floor(currentIndex / pageSize);

        if (currentPageNo == 0) {
            currentPageNo = 1;
        } else {
            currentPageNo++;
        }

        $("#Page").val(currentPageNo);

        var targetId = $("#divNewsList");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Land/List",
            data: $("#frmSearch").serialize(),
            success: function (data, textStatus) {

                targetId.html(data);
                LandIndex.NewsListPagingHtml(currentIndex);
            },
            //데이터 받기전
            beforeSend: function () {

                //로딩 처리
                var strLoading = "<div class=\"article-news-list\"><div class=\"contian-news\" style=\"vertical-align:middle;text-align:center;\"><img src='/Content/Images/bigWaiting.gif' width=\"50px\"><br><br>로딩 중입니다.</div></div>";
                targetId.html(strLoading);
            },
            //완료
            complete: function () {
                
                //if (currentPageNo == 1) {
                    //오른쪽 부가 컨텐츠 + AD Area
                 //   NewsCommon.RightContent();
                //}
            },
            //에러
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("부동산 리스트 에러..");
                }
            }
        });
    },
    /**
     * @description 페이징 HTML
     */
    NewsListPagingHtml: function (currentIndex) {

        if (typeof currentIndex == "undefined") currentIndex = $("#currentIndex").val();

        var pageSize = parseInt($("#PageSize").val());
        var totalDataCount = parseInt($("#totalDataCount").val());

        if (totalDataCount == 0) {
            $("#divPaging").html("");
        }
        else {
            $("#divPaging").html(cfGetPagingHtml(totalDataCount, currentIndex, pageSize, "LandIndex.NewsList"));
        }
    },
    GetAddress: function () {
        var sido = $("#sido option:selected").val() == "도/시" ? "" : $.trim($("#sido option:selected").val());
        var gugun = $("#gugun option:selected").val() == "구/시/군" ? "" : $.trim($("#gugun option:selected").val());
        var dong = $("#dong option:selected").val() == "읍/면/동" ? "" : $.trim($("#dong option:selected").val());

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Land/GetAddress",
            data: { Sido: sido, Gugun: gugun},
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
            
                    
                }else {
                    txt += '<option value="">도/시</option>';
                    for (var i = 0; i < data.data.Sido.length; i++) {
                        txt += '<option value="' + data.data.Sido[i] + '">' + data.data.Sido[i] + '</option>';
                    }
                    $("#sido").html(txt);
                }
    
                var myaddress = ""; //넘겨줄 주소값.
                var searchText = "";//검색할 주소값.

                if (sido != "") {
                    myaddress = sido;
                    searchText = sido;
                    if (sido != "세종") {
                        if (gugun != "") {
                            myaddress += " " + gugun;
                            searchText += "," + gugun;
                            if (dong != "") {
                                myaddress += " " + dong;
                                searchText += "," + dong;
                            }
                        }
                    } else {
                        if (dong != "") {
                            myaddress += "시 " + dong;
                            searchText += "," + dong;
                        }
                    }
                        
                } else{
                    myaddress = "서울";
                }


                if (myaddress.split(",").length > 2) {
                    LandIndex.DrawMap(myaddress);
                } else {
                    if (myaddress == "세종") {
                        LandIndex.DrawMap(myaddress+"시");
                    } else {
                        LandIndex.DrawMap(myaddress);
                    }
                }

                $("#SearchText").val(searchText);
                LandIndex.NewsList();
                
            }
        });
    },
    DrawMap: function (adr) {
        var map = new naver.maps.Map('map', {
            zoom: 10, //지도의 초기 줌 레벨
            scrollWheel: false,
            zoomControl: true, //줌 컨트롤의 표시 여부
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT
            }
        });
        var myaddress = adr;// 도로명 주소나 지번 주소만 가능 (건물명 불가!!!!)
        naver.maps.Service.geocode({ address: myaddress }, function (status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
            }
            var result = response.result;
            // 검색 결과 갯수: result.total
            // 첫번째 결과 결과 주소: result.items[0].address
            // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
            var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
            map.setCenter(myaddr); // 검색된 좌표로 지도 이동
        });
    },
    searchAddress: function (searchAddress) {
        var sido = "", gugun = "", dong = "";
        if (typeof searchAddress != "undefined") {
            if (searchAddress.indexOf(',') != -1) {
                var arr = searchAddress.trim().split(',');
                var cnt = arr.length;
                if (arr[0] != "세종") {
                    if (cnt == 2) {
                        sido = arr[0];
                        gugun = arr[1];

                    } else if (cnt == 3) {
                        sido = arr[0];
                        gugun = arr[1];
                        dong = arr[2];
                    }
                } else {
                    if (cnt == 2) {
                        sido = arr[0];
                        gugun = "";
                        dong = arr[1];
                    }
                }

            } else {
                sido = searchAddress;
            }
        } 

        console.log('sido: ' + sido);
        console.log('gugun: ' + gugun);
        console.log('dong: ' + dong);

        $.ajax({
            type: "POST",
            url: "/NewsCenter/Land/GetAddress",
            data: { Sido: sido, Gugun: gugun },
            success: function (data, textStatus) {
                var txt = '';
                var prevDong = "";

                if (sido != "") { //시가 선택되었다면
                    txt += '<option value="">도/시</option>';
                    for (var i = 0; i < data.data.Sido.length; i++) {
                        txt += '<option value="' + data.data.Sido[i].trim() + '">' + data.data.Sido[i].trim() + '</option>';
                    }
                    $("#sido").html(txt);
                    $("#sido").val(sido).prop("selected", true);
                    txt = '';

                    if (sido != "세종") {
                        if (gugun != "") {//구,군이 선택되었다면 동정보 가져오기
                            txt = '<option value="">구/시/군</option>';
                            for (var i = 0; i < data.data.Gugun.length; i++) {
                                txt += '<option value="' + data.data.Gugun[i].trim() + '">' + data.data.Gugun[i].trim() + '</option>';
                            }
                            $("#gugun").html(txt);
                            $("#gugun").val(gugun).prop("selected", true);
                            txt = '';

                            txt = '<option value="">읍/면/동</option>';
                            for (var i = 0; i < data.data.Dong.length; i++) {
                                var splitDong = data.data.Dong[i].split(" ");
                                if (splitDong[0] != prevDong) {
                                    txt += '<option value="' + splitDong[0].trim() + '">' + splitDong[0].trim() + '</option>';
                                }
                                prevDong = splitDong[0];
                            }
                            $("#dong").html(txt);

                            if (dong != "") {
                                $("#dong").val(dong).prop("selected", true);
                            }
                        } else {
                            $("#gugun").html('<option value="">구/시/군</option>');
                        }
                    } else {
                        txt = '<option value="">-</option>';
                        $("#gugun").html(txt);

                        txt = '';
                        txt = '<option value="">읍/면/동</option>';
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
                    $("#sido").html('<option value="">도/시</option>');
                }

                var myaddress = ""; //넘겨줄 주소값.
                var searchText = "";//검색할 주소값.

                if (sido != "") {
                    if (sido != "세종") {
                        if (gugun != "") {
                            myaddress += " " + gugun;
                            searchText += "," + gugun;
                            if (dong != "") {
                                myaddress += " " + dong;
                                searchText += "," + dong;
                            }
                        }
                    } else {
                        if (dong != "") {
                            myaddress = "세종시 " + dong;
                            searchText += "," + dong;
                        }
                    }
                } else {
                    myaddress = "서울";
                }

                $("#SearchText").val(searchText);
                LandIndex.DrawMap(myaddress);
                LandIndex.NewsList();
            }
        });
    }
    
}

$(document).ready(function () {

    $('#sido').html('<option value="">도/시</option>');
    $('#sido').val('').prop('selected', true);

    if (searchAddress != "") {
        LandIndex.searchAddress(searchAddress);
    } else {
        //지도 정보 가져오기
        LandIndex.GetAddress();
    }

    //상단 메뉴명 숨김
    $(".contain-aside").hide();

    //기사 상세 페이지서 목록으로 올때.등.한국경제 기사만.. 제어
    if ($("#SearchComp").val() == "WO") {

        $("#btnWowNewsOn").parent().addClass("on");
        $("#btnWowNewsOff").parent().removeClass("on");
    }
    else {
        $("#btnWowNewsOn").parent().removeClass("on");
        $("#btnWowNewsOff").parent().addClass("on");
    }

    //오른쪽 부가 컨텐츠 + AD Area
    NewsCommon.RightContent();

    //뉴스 리스트
    //LandIndex.NewsList();

    //뉴스 일자 > 다음주
    $("#btnNext").click(function () {

        var basicDate = $("#hdBasicDate").val();
        var today = $("#hdToday").val();

        if (today == basicDate) {
            //alert(0);
            return false;
        }
        else {
            //시작일 변경
            $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), 7));

            LandIndex.NewsWeekDate();
        }
    });

    //뉴스 일자 > 이전주
    $("#btnPrev").click(function () {

        //시작일 변경
        $("#hdBasicDate").val(SetAddDay($("#hdBasicDate").val(), -7));

        LandIndex.NewsWeekDate();
    });

    //한국경제 기사만 ON
    $("#btnWowNewsOn").click(function () {

        $("#SearchComp").val("WO");
        $("#btnWowNewsOff").parent().removeClass("on");
        $("#btnWowNewsOn").parent().addClass("on");

        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");
        LandIndex.NewsList();
    });

    //한국경제 기사만 OFF
    $("#btnWowNewsOff").click(function () {
        $("#SearchComp").val("");

        $("#btnWowNewsOff").parent().addClass("on");
        $("#btnWowNewsOn").parent().removeClass("on");

        //검색
        $("#currentIndex").val("1");
        $("#Page").val("1");

        LandIndex.NewsList();
    });

    $("#sido").on("change", function () {
        $("#gugun").html('<option>구/시/군</option>');
        $("#dong").html('<option>읍/면/동</option>');

        LandIndex.GetAddress();
    });

    $("#gugun").on("change", function () {
        $("#dong").html('<option>읍/면/동</option>');
        LandIndex.GetAddress();
    });

    $("#dong").on("change", function () {
        LandIndex.GetAddress();
    });

    $(document).scroll(function () {
        if ($('.goog-te-menu-frame').css('display') != 'none') {
            $('.goog-te-menu-frame').css('display', 'none');
        }
    });

    $(document).on('click', '.skiptranslate > .goog-te-gadget-simple', function () {
        if ($('.goog-te-menu-frame').hasClass('on')) {
            $('.goog-te-menu-frame').css('display', 'none');
            $('.goog-te-menu-frame').removeClass('on');
        } else {
            $('.goog-te-menu-frame').css('display', 'black');
            $('.goog-te-menu-frame').addClass('on');
        }
    });

    var language = getQuerystring('language');
    if (typeof language != "undefined") {
        if (!language.includes('/ko/')) {
            language = '/kr/' + language;
        }
        cookies = 'googtrans' + '=' + escape(language) + '; path=/ ';
        document.cookie = cookies;
    }
});
