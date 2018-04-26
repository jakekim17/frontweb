//var SEARCH_API_URL = "http://183.111.178.90:5001/collections/search";
var SEARCH_API_URL = "http://search.wowtv.co.kr/collections/search";

var stockVal = 0,
    programVal = 1,
    personVal = 2,
    newsVal = 3,
    cafeVal = 4,
    photoVal = 5,
    vodVal = 6,
    targetNumber = 1,
    colVal = 0;
var totalSize = 0,
    stockSize = 0,
    programSize = 0,
    personSize = 0,
    newsSize = 0,
    cafeSize = 0,
    photoSize = 0,
    vodSize = 0;
var colList = new Array("stockData", "programContents", "personContents", "newsContents", "cafeContents", "photoContents", "vodContents", "etcData");
var newsSection = new Array();
var investkind = new Array();
investkind = ["단기-급등주", "단기-개별주", "단기-테마주", "단기-주도주", "단기-가치주", "단기-우량주", "스윙-급등주", "스윙-개별주", "스윙-테마주", "스윙-주도주", "스윙-가치주", "스윙-우량주", "중기-테마주", "중기-주도주", "중기-가치주", "중기-우량주", "선물/옵션", "장기-테마주", "장기-주도주", "장기-가치주", "장기-우량주", "스윙-재료주", "중기-ELW", "단/중기-주도주", "스윙-ELW", "FX거래", "중기-스윙", "주식-선물", "해외선물", "장외", "공모주"];

function callSearchSize(searchTerm) {
    if (searchTerm != '') {
        var obj = new Object();
        targetNumber = 7;
        obj.querySet = setQuery(searchTerm, 'total', 1, '');
        var jsonData = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            async: false,
            url: SEARCH_API_URL,
            data: jsonData,
            success: function (data) {
                for (var i = 0; i < 7; i++) {
                    var rs = data.resultSet.result[i];
                    if (i == stockVal) stockSize = rs.totalSize;
                    else if (i == programVal) programSize = rs.totalSize;
                    else if (i == personVal) personSize = rs.totalSize;
                    else if (i == newsVal) {
                        newsSize = rs.totalSize;
                        var groupRs = rs.groupResult[0];
                        if (groupRs.groupResultSize > 0) {
                            for (var j = 0; j < groupRs.groupResultSize; j++)
                                newsSection[j] = groupRs.ids[j];
                        }
                    }
                    else if (i == cafeVal) cafeSize = rs.totalSize;
                    else if (i == photoVal) photoSize = rs.totalSize;
                    else if (i == vodVal) vodSize = rs.totalSize;
                    totalSize += rs.totalSize;
                }
                $('#totalResultSize').html('(' + numberWithCommas(totalSize) + ')');
                $('#stockResultSize').html('(' + numberWithCommas(stockSize) + ')');
                $('#programResultSize').html('(' + numberWithCommas(programSize) + ')');
                $('#personResultSize').html('(' + numberWithCommas(personSize) + ')');
                $('#newsResultSize').html('(' + numberWithCommas(newsSize) + ')');
                $('#cafeResultSize').html('(' + numberWithCommas(cafeSize) + ')');
                $('#photoResultSize').html('(' + numberWithCommas(photoSize) + ')');
                $('#vodResultSize').html('(' + numberWithCommas(vodSize) + ')');
                if (stockSize == 0) $('#' + colList[0]).hide();
                if (programSize == 0 && personSize == 0 && newsSize == 0 && cafeSize == 0 && photoSize == 0 && vodSize == 0) $('#' + colList[7]).hide();
                else {
                    if (programSize == 0) $('#' + colList[1]).hide();
                    if (personSize == 0) $('#' + colList[2]).hide();
                    if (newsSize == 0) $('#' + colList[3]).hide();
                    if (cafeSize == 0) $('#' + colList[4]).hide();
                    if (photoSize == 0) $('#' + colList[5]).hide();
                    if (vodSize == 0) $('#' + colList[6]).hide();
                }                
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });
    }
    else {
        $('#totalResultSize').html('(' + numberWithCommas(totalSize) + ')');
        $('#stockResultSize').html('(' + numberWithCommas(stockSize) + ')');
        $('#programResultSize').html('(' + numberWithCommas(programSize) + ')');
        $('#personResultSize').html('(' + numberWithCommas(personSize) + ')');
        $('#newsResultSize').html('(' + numberWithCommas(newsSize) + ')');
        $('#cafeResultSize').html('(' + numberWithCommas(cafeSize) + ')');
        $('#photoResultSize').html('(' + numberWithCommas(photoSize) + ')');
        $('#vodResultSize').html('(' + numberWithCommas(vodSize) + ')');
    }

    if (stockSize > 0)
        $('#popularStock').show();
    else
        $('#popularStock').hide();


    var objTrend = new Object();
    objTrend.querySet = setTrendQuery();
    var jsonTrendData = JSON.stringify(objTrend);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        async: false,
        url: SEARCH_API_URL,
        data: jsonTrendData,
        success: function (data) {
            var rs = data.resultSet.result[0];
            var content = "";
            if (rs.totalSize > 0) {
                content += "    <div class=\"title\">인기검색어</div>";
                content += "    <div class=\"rank-box\" id=\"rank\">";
                content += "        <ol>";
                for (var i = 0; i < rs.realSize; i++) {
                    if (i >= 5) break;
                    var result = rs.resultDocuments[i];
                    content += "            <li><a href=\"javascript:goSearch('" + result.KEYWORD + "');\"><span>" + (i + 1) + "</span> " + result.KEYWORD + "</a></li>";
                }
                content += "        </ol>";
                content += "    </div>";
            }
            $('#trendKeyword').html(content);
            best_search();

            rs = data.resultSet.result[1].groupResult[0];
            content = "";
            if (rs.groupResultSize > 0) {
                content += "<ul>";
                for (var i = 0; i < rs.groupResultSize; i++) {
                    if (i > 9) break;
                    var result = rs.ids[i];
                    content += "    <li><a href=\"javascript:goSearch('" + result + "');\">" + result + "</a></li>";
                }
                content += "</ul>";
            }
            $('#tagKeyword').html(content);
        },
        error: function (e) {
            console.log(JSON.stringify(e));
        }
    });
}
function callSearchTopicker(searchTerm, colTarget, scriptRoot, styleRoot, currentPage, filterList, loginValue) {
    if (colTarget == "stock") {
        colVal = stockVal;
        targetNumber = 1;
        $('#subStock').addClass("on");
        $('#' + colList[7]).hide();
    }
    else if (colTarget == "program") {
        colVal = programVal;
        targetNumber = 1;
        $('#subProgram').addClass("on");
    }
    else if (colTarget == "person") {
        colVal = personVal;
        targetNumber = 1;
        $('#subPerson').addClass("on");
    }
    else if (colTarget == "news") {
        colVal = newsVal;
        targetNumber = 1;
        $('#subNews').addClass("on");
    }
    else if (colTarget == "cafe") {
        colVal = cafeVal;
        targetNumber = 1;
        $('#subCafe').addClass("on");
    }
    else if (colTarget == "photo") {
        colVal = photoVal;
        targetNumber = 1;
        $('#subPhoto').addClass("on");
    }
    else if (colTarget == "vod") {
        colVal = vodVal;
        targetNumber = 1;
        $('#subVod').addClass("on");
    }
    else {
        targetNumber = 7;
        $('#subTotal').addClass("on");
    }
    if (colTarget != 'total') {
        for (var i = 0; i < 7; i++) {
            if(i==colVal)
                $('#' + colList[i]).show();
            else
                $('#' + colList[i]).hide();
        }
    }

    if (searchTerm != '') {
        var obj = new Object();
        obj.querySet = setQuery(searchTerm, colTarget, currentPage, filterList);
        var jsonData = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            async: false,
            dataType: "json",
            url: SEARCH_API_URL,
            data: jsonData,
            success: function (data) {
                printContent(data, colTarget, scriptRoot, styleRoot, searchTerm, currentPage, filterList, loginValue);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });
    } else {
        $('#noResult').show();
    }
}
function printContent(data, colTarget, scriptRoot, styleRoot, searchTerm, currentPage, filterList, loginValue) {
    var colSize = 0;
    if (totalSize > 0) {
        for (var i = 0; i < targetNumber; i++) {
            var content = "";
            var rs = data.resultSet.result[i];
            colSize += rs.totalSize;
            if (rs.totalSize > 0) {
                if (colTarget == "stock" || (i == stockVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h2 class=\"title\">종목<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "개</span>의 <span>종목</span>이 검색 되었습니다.";
                        content += "	    </div>";
                    }
                    $('#stockCount').html(content);
                    content = "            <div class=\"stock-chart-list\">";
                    content += "                <div class=\"chart-list\">";
                    content += "                    <ul>";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var chgRate = Number(result.CHG_RATE);
                        chgRate = chgRate.toFixed(2);
                        if (result.NET_CHG == '0') chgRate = 0;
                        var chgType = result.CHG_TYPE;
                        var cls = "";
                        var cls2 = "";
                        if (chgType == '1' || chgType == '2') {
                            cls = "class=\"up\"";
                            cls2 = "class=\"plus\"";
                        }
                        else if (chgType == '4' || chgType == '5') {
                            cls = "class=\"down\"";
                            cls2 = "class=\"minus\"";
                        }
                        else cls = "";
                        content += "                        <li>";
                        var stockNm = result.STOCK_WANNAME;
                        if (stockNm.lastIndexOf("우") == stockNm.length - 1)
                            stockNm += ";";
                        content += "                            <a href=\"javascript:goStockDetail('" + result.ARJ_CODE + "');\"><strong class=\"title\">" + replaceAll(stockNm, '우;', '<span>우</span>') + "</strong></a>";
                        content += "                            <dl class=\"number\">";
                        content += "                                <dt>" + numberWithCommas(result.CURR_PRICE) + "</dt>";
                        content += "                                <dd " + cls + ">" + numberWithCommas(result.NET_CHG) + "</dd>";
                        content += "                                <dd " + cls2 + ">" + chgRate + "%</dd>";
                        content += "                            </dl>";
                        content += "                        </li>";
                    }
                    content += "                    </ul>";
                    content += "                    <div id=\"stockMore\"></div>";
                    content += "                </div>";
                    if (rs.totalSize > rs.realSize)
                        content += "                <a href=\"javascript:setMoreStockQuery('" + colTarget + "');\" class=\"add-btn\" id=\"stockMoreButton\">더보기</a>";

                    content += "            </div>";
                    $('#stockContents').html(content);
                }
                else if (colTarget == "program" || (i == programVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h2 class=\"title\">프로그램<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "개</span>의 <span>프로그램</span>이 검색 되었습니다.";
                        content += "	    </div>";
                    }
                    content += "                <div class=\"contain-program-area\">";
                    content += "                    <ul class=\"thumbnail-area\">";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var type = result.BROAD_TYPE_CODE;
                        if (type.toUpperCase() == 'AFTER') type = "장후방송";
                        else if (type.toUpperCase() == 'PROC') type = "장중방송";
                        else if (type.toUpperCase() == 'SPEC') type = "특집방송";
                        else type = "";
                        content += "                        <li>";
                        content += "                            <div class=\"top-box\">";
                        content += "                                <div class=\"txt-box\">";
                        content += "                                    <h3 class=\"title\"><a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "\" target=\"_blank\">" + result.PRG_NM + "</a>";
                        if (result.ING_YN == 'Y') {
                            content += "                                    <span class=\"icon\">방영중</span></h3>";
                        }
                        else
                            content += "                                    <span class=\"icon\">종영</span></h3>";
                        content += "                                    <dl>";
                        if(type!="")
                            content += "                                        <dt>" + type + "</dt>";
                        var day = "";
                        var temp = parseInt(result.PGMDAY);
                        var chk = 0;
                        if ((temp & 1) > 0) {
                            day += '월';
                            chk++;
                        } if ((temp & 16) > 0) {
                            if (chk > 0) day += ","
                            day += '화';
                            chk++;
                        } if ((temp & 256) > 0) {
                            if (chk > 0) day += ","
                            day += '수';
                            chk++;
                        } if ((temp & 4096) > 0) {
                            if (chk > 0) day += ","
                            day += '목';
                            chk++;
                        } if ((temp & 65535) > 0) {
                            if (chk > 0) day += ","
                            day += '금';
                            chk++;
                        } if ((temp & 1048576) > 0) {
                            if (chk > 0) day += ","
                            day += '토';
                            chk++;
                        } if ((temp & 16777216) > 0) {
                            if (chk > 0) day += ","
                            day += '일';
                        }
                        if (day != '') day += "요일";
                        content += "                                        <dd>" + day + " " + result.BRO_START + " ~ " + result.BRO_END + "</dd>";
                        content += "                                    </dl>";
                        content += "                                    <p class=\"txt\">" + result.PRG_TITLE + " " + result.PRG_REMARK + "</p>";
                        content += "                                    <div class=\"btn-area\">";
                        content += "                                        <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "\" class=\"btn type1\" target=\"_blank\">홈</a>";
                        content += "                                        <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "&broadWatchNumber=-1\" class=\"btn\" target=\"_blank\"><span class=\"icon\"></span>다시보기</a>";
                        var feedbackUrl = "/Common/GetProgramFeedBack?programCode=" + result.PRG_CD;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=UTF-8",
                            dataType: "json",
                            async: false,
                            url: feedbackUrl,
                            success: function (feedbackData) {
                                content += "                        				<a href=\"/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + result.PRG_CD + "&isFeedBack=1&FeedBackContentSeq=0&FeedBackMenuSeq=" + feedbackData.MenuSeq + "\" class=\"btn\" target=\"_blank\">시청자의견</a>";
                            },
                            error: function (e) {
                                console.log(JSON.stringify(e));
                            }
                        });
                        content += "                                        <a href=\"/Broad/TvSchedule/Index?menuSeq=642\" class=\"btn\" target=\"_blank\">편성표 보기</a>";
                        var name = result.PRG_NM;
                        content += "                                        <a href=\"javascript:co.PopupScrap('Program', '" + replaceAll(name, '\'', '') + "', '" + result.PRG_CD + "');\" class=\"btn type3\"><span class=\"icon2\"></span>핀하기</a>";
                        content += "                                    </div>";
                        content += "                                </div>";
                        content += "                                <div class=\"img-box right\">";
                        content += "                                    <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "\"><img src=\"" + result.IMG_MAIN + "\" alt=\"" + result.PRG_NM + "\"></a>";
                        content += "                                </div>";
                        content += "                            </div>";
                        content += "                            <div class=\"bottom-box\">";
                        var prgPerson = new Object();
                        prgPerson.querySet = setSubQuery(result.PRG_CD, 'program');
                        var jsonPerson = JSON.stringify(prgPerson);
                        var personResult;
                        var personTotalSize = 0;
                        var personRealSize = 0;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=UTF-8",
                            dataType: "json",
                            async: false,
                            url: SEARCH_API_URL,
                            data: jsonPerson,
                            success: function (personData) {
                                personTotalSize = personData.resultSet.result[0].totalSize;
                                personRealSize = personData.resultSet.result[0].realSize;
                                personResult = personData.resultSet.result[0].resultDocuments;
                            },
                            error: function (e) {
                                console.log(JSON.stringify(e));
                            }
                        });
                        var vod = result.FILEPATH;
                        var title = result.TITLE;
                        var brdDate = result.BROAD_DATE;
                        var vodList = vod.split('^');
                        var titleList = title.split('^');
                        var brdDateList = brdDate.split('^');
                        if (personTotalSize + vodList.length > 0) {
                            content += "                                <div class=\"tab-area\">";
                            content += "                                    <ul class=\"tab\">";
                            if (personTotalSize > 0) {
                                content += "                                        <li class=\"on\"><a href=\"#none\">출연진</a></li>";
                            }
                            if (vodList.length > 0) {
                                if (personTotalSize == 0)
                                    content += "                                        <li class=\"on\"><a href=\"#none\">VOD 다시보기</a></li>";
                                else
                                    content += "                                        <li><a href=\"#none\">VOD 다시보기</a></li>";
                            }
                            content += "                                    </ul>";
                            content += "                                </div>";
                            content += "                                <div class=\"tab-box\">";
                            if (personTotalSize > 0) {
                                content += "                                    <div class=\"content on\">";
                                content += "                                        <ul class=\"img-list\">";
                                for (var j = 0; j < personRealSize; j++) {
                                    content += "                                            <li>";
                                    content += "                                                <div class=\"img-box\"><img src=\"" + personResult[j].IMAGE_URL + "\" alt=\"" + personResult[j].PERSON_NM + "\" style=\"width:195px;height:105px;\"></div>";
                                    content += "                                                <p><a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + personResult[j].PRO_ID + "\" target=\"_blank\">" + personResult[j].PERSON_NM + "</a></p>";
                                    content += "                                            </li>";
                                }
                                content += "                                        </ul>";
                                content += "                                    </div>";
                            }
                            if (vodList.length > 0) {
                                if (personTotalSize == 0)
                                    content += "                                    <div class=\"content on\">";
                                else
                                    content += "                                    <div class=\"content\">";
                                content += "                                        <ul class=\"movie-list\">";
                                for (var j = vodList.length - 1; j >= 0; j--) {
                                    if (vodList.length - j - 1 > 4) break;
                                    content += "                                            <li>";
                                    content += "                                                <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "&broadWatchNumber=" + vodList[j] + "\" target=\"_blank\">";
                                    content += "                                                    <span class=\"movie-box\"><img src=\"" + result.IMG_MAIN + "\" alt=\"" + titleList[j] + "\" style=\"width:195px;height:105px;\"></span>";
                                    content += "                                                    <span class=\"title\">" + titleList[j] + "</span>";
                                    //content += "                                                    <span class=\"title\"><span>삼성전자</span>(005930)</span>";
                                    content += "                                                    <span class=\"data\">" + brdDateList[j].substring(0, 4) + "." + brdDateList[j].substring(4, 6) + "." + brdDateList[j].substring(6, 8) + "</span>";
                                    content += "                                                </a>";
                                    content += "                                            </li>";
                                }
                                content += "                                        </ul>";
                                content += "                                    </div>";
                            }
                            content += "                                </div>";
                        }
                        content += "                            </div>";
                        content += "                        </li>";
                    }
                    content += "                    </ul>";
                    content += "                </div>";
                    if (colTarget == 'total')
                        content += "                    <a href=\"javascript:changeColTarget('program');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 5);
                        content += "                </div>";
                    }
                    $('#programContents').html(content);
                }
                else if (colTarget == "person" || (i == personVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "	    <h2 class=\"title\">인물<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "명</span>의 <span>인물</span>이 검색 되었습니다.";
                        content += "	    </div>";
                        content += "	    <div class=\"search-select-box type02\">";
                        content += "	        <div class=\"select-box\">";
                        content += "	            <a href=\"javascript:void(0)\" class=\"title\">정렬 <span class=\"arrow\"></span></a>";
                        content += "	            <div class=\"check-box\">";
                        content += "	                <ul>";
                        if (filterList == '') {
                            content += "	                    <li class=\"on\"><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "	                    <li><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "	                    <li><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        else if (filterList == 'report'){
                            content += "	                    <li><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "	                    <li class=\"on\"><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "	                    <li><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        else {
                            content += "	                    <li><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "	                    <li><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "	                    <li class=\"on\"><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        content += "	                </ul>";
                        content += "	            </div>";
                        content += "	        </div>";
                        content += "	    </div>";
                    }
                    content += "            <div class=\"contain-program-area\">";
                    content += "                <ul class=\"thumbnail-area\">";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        if (result.GUBUN == "report") {
                            var imageUrl = result.IMAGE_URL;
                            if (imageUrl != '/images/temp/no_img_reporter.gif') imageUrl = styleRoot.replace("/PcStyle", "") + imageUrl;
                            else imageUrl = styleRoot + imageUrl;
                            content += "                    <li>";
                            content += "                        <div class=\"top-box small-left\">";
                            content += "                            <div class=\"img-box\">";
                            content += "                                <a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "\" target=\"_blank\" ><img src=\"" + imageUrl + "\" alt=\"" + result.PERSON_NM + "\"></a>";
                            content += "                            </div>";
                            content += "                            <div class=\"txt-box\">";
                            content += "                                <h3 class=\"title\">" + result.PERSON_NM + "<span class=\"icon\">" + result.POSITION + "</span><span class=\"s-txt\">" + result.DEPT_NM + "</span></h3>";
                            content += "                                <p class=\"txt\">" + result.INTRODUCTION + "</p>";
                            content += "                                <div class=\"btn-area\">";
                            content += "                                    <a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "\" class=\"btn type1\" target='_blank'>홈으로</a>";
                            content += "                                    <a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "&tabType=2\" class=\"btn type2\" target='_blank'>기자에게 한마디</a>";
                            content += "                                    <a href=\"javascript:co.PopupScrap('Report', '" + replaceAll(result.PERSON_NM, '\'', '') + "', '" + result.PERSON_ID + "');\" class=\"btn type3\"><span class=\"icon2\"></span>핀하기</a>";
                            content += "                                    <a href=\"javascript:PopupSubScript('" + result.PERSON_ID + "');\" class=\"btn type3\"><span class=\"icon3\"></span>구독하기</a>"; content += "                                </div>";
                            content += "                            </div>";
                            content += "                        </div>";
                            content += "                    </li>";
                        }
                        else {
                            var ik = result.INVESTKIND;
                            var imageUrl = result.IMAGE_URL;
                            if (imageUrl == '/images/temp/no_img_reporter.gif') imageUrl = styleRoot + imageUrl;
                            content += "                    <li>";
                            content += "                        <div class=\"top-box  small-left\">";
                            content += "                            <div class=\"img-box\">";
                            content += "                                <a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" target=\"_blank\"><img src=\"" + imageUrl + "\" alt=\"" + result.PERSON_NM + "\"></a>";
                            content += "                            </div>";
                            content += "                            <div class=\"txt-box\">";
                            content += "                                <h3 class=\"title\">" + result.PERSON_NM + "<span class=\"icon\">파트너</span>";
                            if (ik.trim() != '') {
                                var investValue = investkind[ik.trim()];
                                content += "<span class=\"s-txt\">" + investValue + "</span>";
                            }
                            content += "                                </h3 > ";
                            content += "                                <ul class=\"txt-list\">";
                            content += "                                    <li>" + result.INTRODUCTION + "</li>";
                            content += "                                </ul>";
                            content += "                                <div class=\"btn-area\">";
                            content += "                                    <a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" class=\"btn type1\" target='_blank'>홈으로</a>";
                            var onAirUrl = "/Common/GetJunMunGaData?ProId=" + result.PRO_ID;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=UTF-8",
                                dataType: "json",
                                async: false,
                                url: onAirUrl,
                                success: function (onAirData) {
                                    var BROOM = onAirData.BROOM;
                                    var PRODUCT_ID_1 = result.PRODUCT_ID_1;
                                    var STATE = onAirData.STATE;
                                    var BMEMTYPE = onAirData.BMEMTYPE;
                                    if (STATE != '1')
                                        content += "                                    <a href=\"http://wowpro.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" class=\"btn\" target='_blank'>녹화방송</a>";
                                    else {
                                        if (loginValue == "True")
                                            content += "                                    <a href=\"javascript:Pro_Open('" + BROOM.trim() + "', '" + PRODUCT_ID_1 + "', '" + BMEMTYPE + "', 'L');\" class=\"btn\" target='_blank'><span class=\"icon4\"></span>방송중</a>";
                                        else
                                            content += "                                    <a href=\"javascript:Pro_Open_Cast('" + BROOM.trim() + "', '" + PRODUCT_ID_1 + "', '" + BMEMTYPE + "', 'L','tv');\" class=\"btn\"><span class=\"icon4\" target='_blank'></span>방송중</a>";
                                    }
                                },
                                error: function (e) {
                                    console.log(JSON.stringify(e));
                                }
                            });
                            var cafeUrl = "/TotalSearch/Mariner/GetPartnerCafeDomain?wowtvId=" + result.WOWTV_ID;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=UTF-8",
                                dataType: "json",
                                async: false,
                                url: cafeUrl,
                                success: function (cafeData) {
                                    content += "                                    <a href=\"http://cafe.wownet.co.kr/"+cafeData.data+"\" class=\"btn\" target='_blank'>카페 바로가기</a>";
                                },
                                error: function (e) {
                                    console.log(JSON.stringify(e));
                                }
                            });
                            content += "                                    <a href=\"javascript:co.PopupScrap('Partner', '" + replaceAll(result.PERSON_NM, '\'', '') + "', '" + result.PERSON_ID + "');\" class=\"btn type3\"><span class=\"icon2\"></span>핀하기</a>";
                            content += "                                </div>";
                            content += "                            </div>";
                            content += "                        </div>";
                            var psPrg = new Object();
                            psPrg.querySet = setSubQuery2(result.PRG_CD, result.PERSON_NM);
                            var jsonPrg = JSON.stringify(psPrg);
                            var prgResult;
                            var prgTotalSize = 0;
                            var prgRealSize = 0;
                            var eventResult;
                            var eventTotalSize = 0;
                            var eventRealSize = 0;
                            var lecResult;
                            var lecTotalSize = 0;
                            var lecRealSize = 0;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=UTF-8",
                                dataType: "json",
                                async: false,
                                url: SEARCH_API_URL,
                                data: jsonPrg,
                                success: function (prgData) {
                                    prgTotalSize = prgData.resultSet.result[0].totalSize;
                                    prgRealSize = prgData.resultSet.result[0].realSize;
                                    prgResult = prgData.resultSet.result[0].resultDocuments;
                                    eventTotalSize = prgData.resultSet.result[1].totalSize;
                                    eventRealSize = prgData.resultSet.result[1].realSize;
                                    eventResult = prgData.resultSet.result[1].resultDocuments;
                                    lecTotalSize = prgData.resultSet.result[2].totalSize;
                                    lecRealSize = prgData.resultSet.result[2].realSize;
                                    lecResult = prgData.resultSet.result[2].resultDocuments;
                                },
                                error: function (e) {
                                    console.log(JSON.stringify(e));
                                }
                            });
                            if (prgTotalSize + eventTotalSize + lecTotalSize > 0) {
                                content += "                        <div class=\"bottom-box\">";
                                content += "                            <div class=\"tab-area\">";
                                content += "                                <ul class=\"tab\">";
                                if (prgTotalSize > 0) {
                                    content += "                                    <li class=\"on\"><a href=\"#none\">출연방송</a></li>";
                                }
                                if (eventTotalSize > 0) {
                                    if (prgTotalSize > 0)
                                        content += "                                    <li><a href=\"#none\">이벤트</a></li>";
                                    else
                                        content += "                                    <li class=\"on\"><a href=\"#none\">이벤트</a></li>";
                                }
                                if (lecTotalSize > 0) {
                                    if (prgTotalSize > 0 || eventTotalSize > 0)
                                        content += "                                    <li><a href=\"#none\">강연회</a></li>";
                                    else
                                        content += "                                    <li class=\"on\"><a href=\"#none\">강연회</a></li>";
                                }
                                content += "                                </ul>";
                                content += "                            </div>";
                                content += "                            <div class=\"tab-box\">";
                                if (prgTotalSize > 0) {
                                    content += "                                <div class=\"content on\">";
                                    content += "                                    <ul class=\"movie-list\">";
                                    for (var j = 0; j < prgRealSize; j++) {
                                        content += "                                        <li>";
                                        content += "                                            <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + prgResult[j].PRG_CD + "&broadWatchNumber=-1\" target=\"_blank\">";
                                        content += "                                                <span class=\"movie-box\"><img src=\"" + prgResult[j].IMG_MAIN + "\" alt=\"" + prgResult[j].PRG_NM + "\" style=\"width:195px;height:105px;\"></span>";
                                        content += "                                                <span class=\"title\">" + prgResult[j].PRG_NM + "</span>";
                                        var day = "";
                                        var temp = parseInt(prgResult[j].PGMDAY);
                                        var chk = 0;
                                        if ((temp & 1) > 0) {
                                            day += '월';
                                            chk++;
                                        } if ((temp & 16) > 0) {
                                            if (chk > 0) day += ","
                                            day += '화';
                                            chk++;
                                        } if ((temp & 256) > 0) {
                                            if (chk > 0) day += ","
                                            day += '수';
                                            chk++;
                                        } if ((temp & 4096) > 0) {
                                            if (chk > 0) day += ","
                                            day += '목';
                                            chk++;
                                        } if ((temp & 65535) > 0) {
                                            if (chk > 0) day += ","
                                            day += '금';
                                            chk++;
                                        } if ((temp & 1048576) > 0) {
                                            if (chk > 0) day += ","
                                            day += '토';
                                            chk++;
                                        } if ((temp & 16777216) > 0) {
                                            if (chk > 0) day += ","
                                            day += '일';
                                        }
                                        if (day != '') day += "요일";
                                        content += "                                                <span class=\"data\">" + day + " " + prgResult[j].BRO_START + "</span>";
                                        content += "                                            </a>";
                                        content += "                                        </li>";
                                    }
                                    content += "                                    </ul>";
                                    content += "                                </div>";
                                }
                                if (eventTotalSize > 0) {
                                    if (prgTotalSize == 0)
                                        content += "                                <div class=\"content on\">";
                                    else
                                        content += "                                <div class=\"content\">";
                                    content += "                                    <ul class=\"thumbnail-list\">";
                                    for (var j = 0; j < eventRealSize; j++) {
                                        var url = eventResult[j].LINKURL;
                                        if (url == "")
                                            url = "http://help.wowtv.co.kr/LecturesAndEvent/Event/Detail?Seq=" + eventResult[j].SEQ + "&SearchType=&SearchText=&EventType=1&pageSize=12&currentIndex=0&menuSeq=507";
                                        content += "                                        <li>";
                                        content += "                                            <a href=\"" + url + "\" target=\"_blank\">";
                                        content += "                                                <span class=\"img-box\"><img src=\"" + eventResult[j].BANNERIMAGE + "\" alt=\"" + eventResult[j].TITLE + "\" style=\"width:195px;height:105px;\"></span>";
                                        content += "                                                <span class=\"right\">";
                                        content += "                                                    <span class=\"title\">" + eventResult[j].TITLE + "</span>";
                                        var start = eventResult[j].STARTDATE;
                                        var end = eventResult[j].ENDDATE;
                                        start = start.substring(0, 4) + "." + start.substring(4, 6) + "." + start.substring(6, 8);
                                        end = end.substring(0, 4) + "." + end.substring(4, 6) + "." + end.substring(6, 8);
                                        content += "                                                    <span class=\"data\">기간 : " + start + "~" + end + "</span>";
                                        content += "                                                </span>";
                                        content += "                                            </a>";
                                        content += "                                        </li>";
                                    }
                                    content += "                                    </ul>";
                                    content += "                                </div>";
                                }
                                if (lecTotalSize > 0) {
                                    if (prgTotalSize == 0 && eventTotalSize == 0)
                                        content += "                                <div class=\"content on\">";
                                    else
                                        content += "                                <div class=\"content\">";
                                    content += "                                    <ul class=\"thumbnail-list type2\">";
                                    for (var j = 0; j < lecRealSize; j++) {
                                        content += "                                        <li>";
                                        content += "                                            <a href=\"http://www.wownet.co.kr/center/lectures/lecture_guide_view.asp?bcode=N13050000&mseq=436&seq=" + lecResult[j].LECTURES_SEQ + "\" target=\"_blank\">";
                                        content += "                                                <span class=\"img-box\">";
                                        content += "                                                    <span class=\"icon\">" + lecResult[j].MAIN_CTGR + "</span>";
                                        content += "                                                    <img src=\"" + lecResult[j].WG_IMAGE_FILE + "\" alt=\"" + lecResult[j].TITLE + "\" style=\"width:195px;height:105px;\">";
                                        content += "                                                </span>";
                                        content += "                                                <span class=\"right\">";
                                        content += "                                                    <span class=\"title\">" + lecResult[j].TITLE + "</span>";
                                        var date = lecResult[j].LECTURES_DATE;
                                        date = date.substring(0, 4) + "." + date.substring(4, 6) + "." + date.substring(6, 8);
                                        content += "                                                    <span class=\"data\">일정 : " + date + " " + lecResult[j].LECTURES_TIME + "</span>";
                                        content += "                                                    <span class=\"data\">장소 : " + lecResult[j].PLACE + "</span>";
                                        content += "                                                </span>";
                                        content += "                                            </a>";
                                        content += "                                        </li>";
                                    }
                                    content += "                                    </ul>";
                                    content += "                                </div>";
                                }
                                content += "                            </div>";
                                content += "                        </div>";
                            }
                            content += "                    </li>";
                        }
                    }
                    content += "                </ul>";
                    content += "            </div>";
                    if (colTarget == 'total')
                        content += "                <a href=\"javascript:changeColTarget('person');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 5);
                        content += "                </div>";
                    }
                    $('#personContents').html(content);
                }
                else if (colTarget == "news" || (i == newsVal && colTarget == "total")) {
                    var filter = new Array();
                    if (filterList != '' && filterList != null) filter = filterList.split("^");
                    else filter = [0, 0, 0, 0, 0];
                    if (colTarget == 'total') {
                        content += "            <h2 class=\"title\">";
                        content += "                뉴스<span>(" + numberWithCommas(rs.totalSize) + "건)</span>";
                        content += "                <span class=\"icon\">지난 주요뉴스</span>";
                        content += "                <span class=\"s-txt\">한국경제TV에서 선정한 지난 주요뉴스</span>";
                        content += "                <span class=\"icon\">뉴스썸</span>";
                        content += "                <span class=\"s-txt\">한국경제TV 웹사이트에서 접속자들이 많이 본 뉴스</span>";
                        content += "                <span class=\"title-btn\">";
                        content += "                    <span class=\"txt\">한국경제TV 기사만</span>";
                        content += "                    <span class=\"cheng-btn\">";
                        if (filter[0] != 0) {
                            content += "                        <a href=\"javascript:changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"on\">on</a>";
                            content += "                        <a href=\"javascript:changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">off</a>";
                        }
                        else {
                            content += "                        <a href=\"javascript:changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">on</a>";
                            content += "                        <a href=\"javascript:changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"on\">off</a>";
                        }
                        content += "                    </span>";
                        content += "                </span>";
                        content += "            </h2>";
                    }
                    else {
                        content += "            <div class=\"search-confirm\">";
                        content += "                <span>" + numberWithCommas(rs.totalSize) + "건</span>의 <span>뉴스</span>가 검색 되었습니다.";
                        content += "            </div>";
                        content += "            <div class=\"search-select-box\" >";
                        content += "            <div class=\"select-box\">";
                        content += "                        <a href=\"javascript:void(0)\" class=\"title\">정렬 <span class=\"arrow\"></span></a>";
                        content += "                        <div class=\"check-box\">";
                        content += "                            <ul>";
                        if (filter[1] == 0 || filter[1] == 'desc') {
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^desc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">최신순</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^asc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">오래된순</a></li>";
                        }
                        else {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^desc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">최신순</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^asc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">오래된순</a></li>";
                        }
                        content += "                            </ul>";
                        content += "                        </div>";
                        content += "                    </div>";
                        content += "            <div class=\"select-box\">";
                        content += "                        <a href=\"javascript:void(0)\" class=\"title\">섹션<span class=\"arrow\"></span></a>";
                        content += "                        <div class=\"check-box\">";
                        content += "                            <ul>";
                        content += "                                <li ";
                        if (filter[2] == 0) content += "class=\"on\"";
                        content += "                                    ><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^0^" + filter[3] + "^" + filter[4] + "');\">전체</a></li>";
                        for (var sec = 0; sec < newsSection.length; sec++) {
                            if (newsSection[sec] != '') {
                                content += "                            <li ";
                                if (newsSection[sec] == filter[2]) content += "class=\"on\"";
                                content += "                                 ><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + newsSection[sec] + "^" + filter[3] + "^" + filter[4] + "');\">" + newsSection[sec] + "</a></li>";
                            }
                        }
                        content += "                            </ul>";
                        content += "                        </div>";
                        content += "                    </div>";
                        
                        content += "            <div class=\"select-box\">";
                        content += "                        <a href=\"javascript:void(0)\" class=\"title\">기간 <span class=\"arrow\"></span></a>";
                        content += "                        <div class=\"check-box\">";
                        content += "                            <ul>";
                        if (filter[3] == 0 ) {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(0) + "^" + filter[4] + "');\">1일</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(1) + "^" + filter[4] + "');\">1주</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(2) + "^" + filter[4] + "');\">1개월</a></li>";
                        }
                        else if (filter[3] == date_select(0)) {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(0) + "^" + filter[4] + "');\">1일</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(1) + "^" + filter[4] + "');\">1주</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(2) + "^" + filter[4] + "');\">1개월</a></li>";
                        }
                        else if (filter[3] == date_select(1)) {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(0) + "^" + filter[4] + "');\">1일</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(1) + "^" + filter[4] + "');\">1주</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(2) + "^" + filter[4] + "');\">1개월</a></li>";
                        }
                        else  {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(0) + "^" + filter[4] + "');\">1일</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(1) + "^" + filter[4] + "');\">1주</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(2) + "^" + filter[4] + "');\">1개월</a></li>";
                        }
                        content += "                            </ul>";
                        var start = "";
                        var end = "";
                        if (filter[3] != 0) {
                            start = filter[3].split("_")[0];
                            end = filter[3].split("_")[1];
                            start = start.substring(0, 4) + "/" + start.substring(4, 6) + "/" + start.substring(6, 8);
                            end = end.substring(0, 4) + "/" + end.substring(4, 6) + "/" + end.substring(6, 8);
                        }
                        content += "                            <div class=\"input-box\">";
                        content += "                                <p>직접입력</p>";
                        content += "                                <div class=\"search-local date\">";
                        content += "                                    <input type=\"text\" class=\"form-control\" id=\"startDate\" value=\"" + start + "\">";
                        content += "                                        <span class=\"btn-calendar\"><button>달력</button></span>";
                        content += "                                </div>";
                        content += "                                <div class=\"search-local date\">";
                        content += "                                    <input type=\"text\" class=\"form-control\" id=\"endDate\" value=\"" + end + "\">";
                        content += "                                            <span class=\"btn-calendar\"><button>달력</button></span>";
                        content += "                                 </div>";
                        content += "                                        <a href=\"javascript:changeNewsCal('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"btn\">적용하기</a>";
                        content += "                                    </div>";
                        content += "                                </div>";
                        content += "                            </div>";
                        content += "            <div class=\"select-box\">";
                        content += "                                <a href=\"javascript:void(0)\" class=\"title\">분류 <span class=\"arrow\"></span></a>";
                        content += "                                <div class=\"check-box\">";
                        content += "                                    <ul>";
                        if (filter[4] == 0) {
                            content += "                                        <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^0');\">전체</a></li>";
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^list');\">지난주요 뉴스</a></li>";
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^rank');\">뉴스썸</a></li>";
                        }
                        else if (filter[4] == 'list') {
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^0');\">전체</a></li>";
                            content += "                                        <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^list');\">지난주요 뉴스</a></li>";
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^rank');\">뉴스썸</a></li>";
                        }
                        else if (filter[4] == 'rank') {
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^0');\">전체</a></li>";
                            content += "                                        <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^list');\">지난주요 뉴스</a></li>";
                            content += "                                        <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^rank');\">뉴스썸</a></li>";
                        }
                        content += "                                    </ul>";
                        content += "                                </div>";
                        content += "                            </div>";
                        content += "            </div>";
                        content += "            <h2 class=\"title type02\">";
                        content += "                <span class=\"icon\">지난 주요뉴스</span>";
                        content += "                <span class=\"s-txt\">한국경제TV에서 선정한 지난 주요뉴스</span>";
                        content += "                <span class=\"icon\">뉴스썸</span>";
                        content += "                <span class=\"s-txt\">한국경제TV 웹사이트에서 접속자들이 많이 본 뉴스</span>";
                        content += "            <span class=\"title-btn\">";
                        content += "                    <span class=\"txt\">한국경제TV 기사만</span>";
                        content += "                    <span class=\"cheng-btn\">";
                        if (filter[0] != 0) {
                            content += "                        <a href=\"javascript:changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"on\">on</a>";
                            content += "                        <a href=\"javascript:changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">off</a>";
                        }
                        else {
                            content += "                        <a href=\"javascript:changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">on</a>";
                            content += "                        <a href=\"javascript:changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"on\">off</a>";
                        }
                        content += "                    </span>";
                        content += "                </span>";
                        content += "            </h2>";
                    }
                    content += "            <div class=\"contain-program-area\">";
                    content += "                <ul class=\"thumbnail-area\">";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var list = result.LIST_YN;
                        var rank = result.RANK;
                        var wownet = result.WOWNET_YN;
                        var artdate = result.ARTDATE;
                        artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);
                        var keywords = result.KEYWORDS;
                        var thumbnailImg = "";
                        thumbnailImg = GetNewsThumbnail('11M', result.THUMBNAIL_FILENM, result.VOD_NUM, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                        if (thumbnailImg != "/WowTvStyle/images/common/no_image_11m.jpg") {
                            content += "                    <li>";
                            content += "                        <div class=\"top-box small-right\">";
                            content += "                            <div class=\"txt-box\">";
                            content += "                                <h3 class=\"title\"><a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\">" + result.TITLE + "</a>";
                            if (list == 'Y')
                                content += "                                    <span class=\"icon\">지난 주요뉴스</span>";
                            else if (rank >= 7)
                                content += "                                    <span class=\"icon\">뉴스썸</span>";
                            content += "                                        <span class=\"s-txt\">" + artdate + "</span>";
                            content += "                                </h3>";
                            content += "                                <p class=\"txt\">";
                            content += "                                    " + result.CONTENT;
                            content += "                                </p>";
                            content += "                                <ul class=\"path\">";
                            content += "                                    <li>뉴스 > " + result.SECTION_NAME + "</li>";
                            content += "                                    <li>" + result.COMP_NAME + "</li>";
                            content += "                                    <li class=\"btn\"><a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\" target='_blank'>바로가기</a></li>";
                            content += "                                    <li class=\"tags\">";
                            var keywordList = keywords.split(",");
                            for (var j = 0; j < keywordList.length; j++) {
                                content += "                                        <a href=\"javascript:goSearch('" + keywordList[j] + "');\">#" + keywordList[j] + "</a>";
                            }
                            content += "                                    </li>";
                            content += "                                </ul>";
                            content += "                            </div>";
                            content += "                            <div class=\"img-box\">";
                            content += "                                <img src=\"" + thumbnailImg + "\" alt=\"" + result.TITLE + "\">";
                            content += "                            </div>";
                            content += "                        </div>";
                            content += "                    </li>";
                        }
                        else {
                            content += "                    <li>";
                            content += "                        <div class=\"top-box all-txt\">";
                            content += "                            <div class=\"txt-box\">";
                            content += "                                <h3 class=\"title\"><a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\">" + result.TITLE + "</a>";
                            if (list == 'Y')
                                content += "                                    <span class=\"icon\">지난 주요뉴스</span>";
                            else if (rank >= 7)
                                content += "                                    <span class=\"icon\">뉴스썸</span>";
                            content += "                                        <span class=\"s-txt\">" + artdate + "</span>";
                            content += "                                </h3>";
                            content += "                                <p class=\"txt\">";
                            content += "                                    " + result.CONTENT;
                            content += "                                </p>";
                            content += "                                <ul class=\"path\">";
                            content += "                                    <li>뉴스 > " + result.SECTION_NAME + "</li>";
                            content += "                                    <li>" + result.COMP_NAME + "</li>";
                            content += "                                    <li class=\"btn\"><a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\" target='_blank'>바로가기</a></li>";
                            content += "                                    <li class=\"tags\">";
                            var keywordList = keywords.split(",");
                            for (var j = 0; j < keywordList.length; j++) {
                                content += "                                        <a href=\"javascript:goSearch('" + keywordList[j] + "');\">#" + keywordList[j] + "</a>";
                            }
                            content += "                                    </li>";
                            content += "                                </ul>";
                            content += "                            </div>";
                            content += "                        </div>";
                            content += "                    </li>";
                        }
                    }
                    content += "                </ul>";
                    content += "            </div>";
                    if (colTarget == 'total')
                        content += "                <a href=\"javascript:changeColTarget('news');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 10);
                        content += "                </div>";
                    }
                    $('#newsContents').html(content);
                }
                else if (colTarget == "cafe" || (i == cafeVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h2 class=\"title\">와우카페<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "개</span>의 <span>와우카페</span>가 검색 되었습니다.";
                        content += "	    </div>";
                    }
                    content += "            <div class=\"contain-program-area\">";
                    content += "                <ul class=\"thumbnail-area\">";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var regdate = result.REGDATE;
                        regdate = regdate.substring(0, 4) + "-" + regdate.substring(4, 6) + "-" + regdate.substring(6, 8);
                        content += "                    <li>";
                        content += "                        <div class=\"top-box all-txt\">";
                        content += "                            <div class=\"txt-box\">";
                        content += "                                <h3 class=\"title\"><a href=\"" + result.URL + "\" target='_blank'>" + result.TITLE + "</a><span class=\"s-txt\">" + regdate + "</span></h3>";
                        content += "                                <p class=\"txt\">";
                        content += "                                    " + result.CONTENT;
                        content += "                                </p>";
                        content += "                                <ul class=\"path\">";
                        content += "                                    <li>" + result.CATE_NAME + " > " + result.CAFENAME + "</li>";
                        content += "                                </ul>";
                        content += "                            </div>";
                        content += "                        </div>";
                        content += "                    </li>";
                    }
                    content += "                </ul>";
                    content += "            </div>";
                    if (colTarget == 'total')
                        content += "                <a href=\"javascript:changeColTarget('cafe');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 10);
                        content += "                </div>";
                    }
                    $('#cafeContents').html(content);
                }
                else if (colTarget == "photo" || (i == photoVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h2 class=\"title\">포토<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "개</span>의 <span>포토</span>가 검색 되었습니다.";
                        content += "	    </div>";
                    }
                    content += "            <div class=\"search-photo-area\">";
                    content += "                <ul>";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var artdate = result.ARTDATE;
                        artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);
                        var thumbnailImg = "";
                        if (result.WOWCODE == 'W040')
                            thumbnailImg = GetNewsThumbnail('34M', result.THUMBNAIL_FILENM, 0, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                        else
                            thumbnailImg = GetNewsThumbnail('16M', result.THUMBNAIL_FILENM, 0, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                        content += "                    <li>";
                        content += "                        <a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\" target='_blank'>";
                        content += "                            <img src=\"" + thumbnailImg + "\" alt=\"" + result.TITLE + "\" style=\"width:285px;height:167px\">";
                        content += "                            <span class=\"cont-area\">";
                        content += "                                <strong class=\"tit\">" + result.TITLE + "</strong>";
                        content += "                            </span>";
                        content += "                        </a>";
                        content += "                    </li>";
                    }
                    content += "                </ul>";
                    content += "            </div>";
                    if (colTarget == 'total')
                        content += "                <a href=\"javascript:changeColTarget('photo');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 20);
                        content += "                </div>";
                    }
                    $('#photoContents').html(content);
                }
                else if (colTarget == "vod" || (i == vodVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h2 class=\"title\">동영상<span>(" + numberWithCommas(rs.totalSize) + "건)</span></h2>";
                    }
                    else {
                        content += "	    <div class=\"search-confirm\">";
                        content += "	        <span>" + numberWithCommas(rs.totalSize) + "개</span>의 <span>동영상</span>이 검색 되었습니다.";
                        content += "	    </div>";
                    }
                    content += "            <div class=\"search-box-area\">";
                    content += "                <ul>";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var gubun = result.GUBUN_NAME;
                        var date = result.ARTDATE;
                        date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
                        if (gubun == 'PROGRAM') {
                            if (val % 4 == 0)
                                content += "                    <li>";

                            content += "                        <div class=\"cell\">";
                            content += "                            <a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.ARTID + "\" target='_blank'>";
                            content += "                                <span class=\"img\"><img src=\"" + result.THUMBNAIL_TYPE1 + "\" alt=\"" + result.TITLE + "\"></span>";
                            content += "                                <strong class=\"title\">" + result.TITLE + "</strong>";
                            content += "                                <span class=\"s-txt txt-right\">" + date + "</span>";
                            content += "                            </a>";
                            content += "                        </div>";
                            if (val % 4 == 3 || val > rs.realSize - 1)
                                content += "                    </li>";
                        }
                        else {
                            var thumbnailImg = "";
                            var artdate = result.ARTDATE;
                            artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);
                            thumbnailImg = GetNewsThumbnail('16M', result.THUMBNAIL_FILENM, result.VOD_NUM, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                            var stockCode = result.STOCKCODE;
                            var stockName = result.STOCKNAME;
                            stockCode = stockCode.substring(1);
                            if (val % 4 == 0)
                                content += "                    <li>";

                            content += "                        <div class=\"cell\">";
                            content += "                            <a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\">";
                            content += "                                <span class=\"img\"><img src=\"" + thumbnailImg + "\" alt=\"" + result.TITLE + "\"></span>";
                            content += "                                <strong class=\"title\">" + result.TITLE + "</strong>";
                            if (result.STOCKCODE != '')
                                content += "                                <strong class=\"title\"><span class=\"font-color02\">" + result.STOCKNAME + "</span>(" + stockCode + ")</strong>";
                            content += "                                <span class=\"s-txt txt-right\">" + date + "</span>";
                            content += "                            </a>";
                            content += "                        </div>";
                            if (val % 4 == 3 || val > rs.realSize - 1)
                                content += "                    </li>";
                        }
                        
                    }

                    content += "                </ul>";
                    content += "            </div>";
                    if (colTarget == 'total')
                        content += "                <a href=\"javascript:changeColTarget('vod');\" class=\"add-btn\">더보기</a>";
                    else {
                        content += "                <div class=\"box-paginate\">";
                        content += printPaging(currentPage, rs.totalSize, 20);
                        content += "                </div>";
                    }
                    $('#vodContents').html(content);
                }
            }
        }
        
    }
    if (colSize == 0) {
        $('#noResult').show();
        $('#' + colList[0]).hide();
        $('#' + colList[7]).hide();
    }
}
function printPaging(currentPage, totalSize, rowsperPage) {
    var result = "";
    var labelForFirst = "", labelForPrev = "", labelForNext = "", labelForLast = "", labelForIndex = "";
    //Navigator
    var DISPLAYSIZE10 = 10;
    var totalPage = 0, totalRows = 0, currentPage2 = 0, numOfLinkIndex = 0, startIndex = 0;
    var destination = "#";
    var pageImg1 = "처음목록";
    var pageImg2 = "이전목록";
    var pageImg3 = "다음목록";
    var pageImg4 = "마지막목록";
    totalPage = 0;
    totalRows = 0;

    totalRows = totalSize;

    if ((totalRows % rowsperPage) == 0) totalPage = parseInt(totalRows / rowsperPage);
    else totalPage = parseInt(totalRows / rowsperPage) + 1;
    currentPage2 = currentPage;

    numOfLinkIndex = DISPLAYSIZE10;
    labelForFirst = "<a href=\"javascript:goPage('1');\" class=\"first\">" + pageImg1 + "</a>";
    labelForPrev = "<a href=\"javascript:goPage('" + (parseInt(currentPage2) - 1) + "');\" class=\"prev\">" + pageImg2 + "</a>";
    labelForNext = "<a href=\"javascript:goPage('" + (parseInt(currentPage2) + 1) + "');\" class=\"next\">" + pageImg3 + "</a>";
    labelForLast = "<a href=\"javascript:goPage('" + totalPage + "');\" class=\"last\">" + pageImg4 + "</a>";
    if (currentPage2 == 1) {
        labelForFirst = "<a href=\"" + destination + "this\" class=\"first\">" + pageImg1 + "</a>";
        labelForPrev = "<a href=\"" + destination + "this\" class=\"prev\">" + pageImg2 + "</a>";
    }
    if ((currentPage2 == totalPage) || (totalPage == 0)) {
        labelForNext = "<a href=\"" + destination + "this\" class=\"next\">" + pageImg3 + "</a>";
        labelForLast = "<a href=\"" + destination + "this\" class=\"last\">" + pageImg4 + "</a>";
    }
    startIndex = parseInt((currentPage2 - 1) / numOfLinkIndex) * numOfLinkIndex + 1;

    labelForIndex = "";

    if (currentPage2 == startIndex) labelForIndex = "<a href=\"#\" class=\"on\">" + startIndex + "</a>";
    else labelForIndex = "<a href=\"javascript:goPage('" + startIndex + "');\">" + startIndex + "</a>";

    for (var idx = (startIndex + 1); ((idx <= totalPage) && (idx < (startIndex + numOfLinkIndex))); idx++) {
        if (currentPage2 == idx) labelForIndex += "<a href=\"#\" class=\"on\">" + idx + "</a>";
        else labelForIndex += "<a href=\"javascript:goPage('" + idx + "');\">" + idx + "</a>";
    }
    result = labelForFirst + labelForPrev + "<span>" + labelForIndex + "</span>" + labelForNext + labelForLast;
    return result;
}
function selectSet(val) {
    var obj = new Object();
    var selectField = new Array();
    if (val == stockVal)
        selectField = ["ARJ_CODE(NONE)", "CHG_RATE(NONE)", "CHG_TYPE(NONE)", "CURR_PRICE(NONE)", "FINAL_PRICE(NONE)", "IMG(NONE)", "NET_CHG(NONE)", "NET_TURNOVER(NONE)", "NET_VOL(NONE)", "STOCK_WANNAME(NONE)", "URL(NONE)"];
    else if (val == programVal)
        selectField = ["ANC1_NM(NONE)", "ANC2_NM(NONE)", "AREA_NM(NONE)", "BROAD_DATE(NONE)", "BROAD_TYPE_CODE(NONE)", "BRO_END(NONE)", "BRO_START(NONE)", "FILEPATH(NONE)", "IMG_MAIN(NONE)", "ING_YN(NONE)", "PD2_NM(NONE)", "PD_NM(NONE)", "PGMDAY(NONE)", "PRG_CD(NONE)", "PRG_NM(NONE)", "PRG_REMARK(NONE)", "PRG_TITLE(NONE)", "TITLE(NONE)"];
    else if (val == personVal)
        selectField = ["CAST_TYPE(NONE)", "DEPT_NM(NONE)", "GUBUN(NONE)", "IMAGE_URL(NONE)", "INTRODUCTION(NONE)", "PERSON_ID(NONE)", "PERSON_NM(NONE)", "PRG_CD(NONE)", "PRO_ID(NONE)", "INVESTKIND(NONE)", "POSITION(NONE)", "PRODUCT_ID_1(NONE)", "WOWTV_ID(NONE)"];
    else if (val == newsVal)
        selectField = ["ARTID(NONE)", "COMPCODE(NONE)", "COMP_NAME(NONE)", "TITLE(HIGHLIGHT;SUMMARIZE|150)", "CONTENT(HIGHLIGHT;SUMMARIZE|300)", "ARTDATE(NONE)", "DEPTNM(NONE)", "IMGDIR(NONE)", "KEYWORDS(NONE)", "TAG(NONE)", "THUMBNAIL_TYPE1(NONE)", "USERNM(NONE)", "LIST_YN(NONE)", "RANK(NONE)", "WOWNET_YN(NONE)", "SECTION_NAME(NONE)", "GUBUN_NAME(NONE)", "THUMBNAIL_FILENM(NONE)", "VOD_NUM(NONE)"];
    else if (val == cafeVal)
        selectField = ["CAFECODE(NONE)", "CAFEDOMAIN(NONE)", "CAFENAME(NONE)", "URL(NONE)", "CAFE_FILTER(NONE)", "CATE_NAME(NONE)", "CONTENT(HIGHLIGHT;SUMMARIZE|300)", "ITEM(NONE)", "TITLE(HIGHLIGHT;SUMMARIZE|150)", "MEMCOUNT(NONE)", "REGDATE(NONE)"];
    else if (val == photoVal)
        selectField = ["ARTDATE(NONE)", "THUMBNAIL_TYPE1(NONE)", "IMGDIR(NONE)", "CONTENT(NONE)", "TITLE(NONE)", "COMPCODE(NONE)", "ARTID(NONE)", "WOWCODE(NONE)", "THUMBNAIL_FILENM(NONE)"];
    else if (val == vodVal)
        selectField = ["ARTDATE(NONE)", "THUMBNAIL_TYPE1(NONE)", "IMGDIR(NONE)", "CONTENT(NONE)", "TITLE(NONE)", "ARTID(NONE)", "GUBUN_NAME(NONE)", "THUMBNAIL_FILENM(NONE)", "VOD_NUM(NONE)", "STOCKCODE(NONE)", "STOCKNAME(NONE)"];


    obj.fields = selectField;
    return obj;
}

function whereSet(searchTerm, val) {
    var obj = new Object();
    var whereField = new Array();

    if (val == stockVal)
        whereField = ["BRACE_OPEN", "STOCK_WANNAME(HASALL|'" + searchTerm + "'|100)", "OR", "ARJ_CODE(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == programVal)
        whereField = ["BRACE_OPEN", "PRG_NM(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == personVal)
        whereField = ["BRACE_OPEN", "PERSON_NM(HASALL|'" + searchTerm + "'|100)", "OR", "INTRODUCTION(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == newsVal)
        whereField = ["BRACE_OPEN", "TITLE(HASALL|'" + searchTerm + "'|100)", "OR", "CONTENT(HASALL|'" + searchTerm + "'|100)", "OR", "KEYWORDS(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == cafeVal)
        whereField = ["BRACE_OPEN", "TITLE(HASALL|'" + searchTerm + "'|100)", "OR", "CONTENT(HASALL|'" + searchTerm + "'|100)", "OR", "NICKNAME(HASALL|'" + searchTerm + "'|100)", "OR", "CAFENAME(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == photoVal)
        whereField = ["BRACE_OPEN", "TITLE(HASALL|'" + searchTerm + "'|100)", "OR", "CONTENT(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (val == vodVal)
        whereField = ["BRACE_OPEN", "TITLE(HASALL|'" + searchTerm + "'|100)", "OR", "CONTENT(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];

    obj.fields = whereField;
    return obj;
}
function orderBySet(val, filterList) {
    var obj = new Object();
    var orderByField = new Array();
    if (val == stockVal) orderByField = ["WEIGHT(ASC|NONE)"];
    else if (val == programVal) orderByField = ["WEIGHT(ASC|NONE)"];
    else if (val == personVal) orderByField = ["WEIGHT(ASC|NONE)"];
    else if (val == newsVal) {
        var filter = new Array();
        if (filterList != '' && filterList != null) filter = filterList.split("^");
        else filter = [0, 0, 0, 0, 0];
        if (filter[1] == 'asc')
            orderByField = ["ARTDATE(DESC|POSTWEIGHT)"];
        else
            orderByField = ["ARTDATE(ASC|POSTWEIGHT)"];
    }
    else if (val == cafeVal) orderByField = ["SORT_MEMCOUNT(ASC|PREWEIGHT)"];
    else if (val == photoVal) orderByField = ["ARTDATE(ASC|PREWEIGHT)"];
    else if (val == vodVal) orderByField = ["ARTDATE(ASC|PREWEIGHT)"];

    obj.fields = orderByField;
    return obj;
}
function filterSet(val, filterList) {
    var obj = new Object();
    var filterField = new Array();
    var filter = new Array();
    if (filterList != '' && filterList != null) filter = filterList.split("^");
    if (val == cafeVal)
        filterField = new Array("FILTER_CAFE_FILTER(MATCH|'CAFE')");
    else if (filterList != '') {
        if (val == personVal) {
            filterField = new Array("GUBUN(MATCH|'" + filter[0] + "')");
        }
        else if (val == newsVal){
            filterField = new Array();
            if (filter[0] != 0) {
                if (filter[0] == 'Y') filterField.push("COMPCODE(MATCH|'WO')");
            }
            if (filter[2] != 0)
                filterField.push("SECTION_NAME(MATCH|'" + filter[2] + "')");
            if (filter[3] != 0) {
                var dateList = filter[3].split("_");
                filterField.push("ARTDATE(RANGE|'" + dateList[0] + "';'" + dateList[1] + "')");
            }
            if (filter[4] != 0) {
                if (filter[4] == 'list') filterField.push("LIST_YN(MATCH|'Y')");
                else filterField.push("RANK(MATCH|'7';'8';'9';'10';'11';'12';'13')");
            }

        }
    }
    obj.fields = filterField;
    return obj;
}
function groupBySet() {
    var obj = new Object();
    var groupByField = new Array();
    var groupBy = new Array();
    groupByField = ["SECTION_NAME(COUNT;ORDER_NAME|'ASC 0 30')"];
    obj.fields = groupByField;
    return obj;
}

function fromSet(colTarget, val, currentPage) {
    var obj = new Object();
    var resultSize = new Array();
    var rowsperPage = new Array();
    var collection = new Array();
    collection = ["WOWSTOCK", "WOWPROGRAM", "WOWPERSON", "WOWNEWS_2017", "WOWCAFE", "WOWPHOTO_2017", "WOWVOD_2017"];
    if (colTarget == 'total') rowsperPage = [12, 1, 2, 3, 3, 8, 8];
    else rowsperPage = [24, 5, 5, 10, 10, 20, 20];

    var start = (currentPage - 1) * rowsperPage[val];
    var end = (currentPage * rowsperPage[val]) - 1;

    obj.collection = collection[val];
    resultSize = [start, end];
    obj.result = resultSize;

    return obj;
}
function debugOption(debug) {
    var print = false;
    if (debug == 1)
        print = true;
    var obj = new Object();
    obj.printQuery = print;
    obj.debug = true;
    obj.faultless = false;

    return obj;
}
function logOption(searchTerm) {
    var obj = new Object();
    obj.loggable = true;
    obj.logKeyword = searchTerm;
    return obj;
}
function dictionaryOption() {
    var obj = new Object();
    var equivSynonym = new Object();
    var stopword = new Object();
    var banned = new Object();

    equivSynonym.use = true;
    equivSynonym.equivSynonymWeight = 1;

    stopword.use = true;
    banned.use = true;

    obj.equivSynonym = equivSynonym;
    obj.stopword = stopword;
    obj.banned = banned;

    return obj;
}
function highlightOption() {
    var obj = new Object();
    obj.tag = "<span class=\"font-color02\">,</span>";
    return obj;
}
function setQuery(searchTerm, colTarget, currentPage, filterList) {
    var querySet = new Object();
    var query = new Array();
    if (colTarget == "total") {
        for (colVal = 0; colVal < targetNumber; colVal++) {
            var obj = new Object();
            obj.whereSet = whereSet(searchTerm, colVal);
            obj.selectSet = selectSet(colVal);
            obj.orderBySet = orderBySet(colVal, filterList);
            if (colVal == cafeVal || filterList != '') obj.filterSet = filterSet(colVal, filterList);
            if (colVal == newsVal) obj.groupBySet = groupBySet();
            obj.fromSet = fromSet(colTarget, colVal, currentPage);
            obj.debugOption = debugOption(0);
            obj.logOption = logOption(searchTerm);
            if (colVal == newsVal || colVal == cafeVal) obj.highlight = highlightOption();
            obj.useCache = true;
            obj.dictionary = dictionaryOption();
            query[colVal] = obj;
        }
    }
    else {
        var obj = new Object();
        obj.whereSet = whereSet(searchTerm, colVal);
        obj.selectSet = selectSet(colVal);
        obj.orderBySet = orderBySet(colVal, filterList);
        if (colTarget == 'cafe' || filterList != '') obj.filterSet = filterSet(colVal, filterList);
        if (colVal == newsVal) obj.groupBySet = groupBySet();
        obj.fromSet = fromSet(colTarget, colVal, currentPage);
        obj.debugOption = debugOption(0);
        obj.logOption = logOption(searchTerm);
        if (colTarget == 'news' || colTarget == 'cafe') obj.highlight = highlightOption();
        obj.useCache = true;
        obj.dictionary = dictionaryOption();
        query[0] = obj;
    }
    querySet.version = 42;
    querySet.query = query;
    return querySet;
}

function setSubQuery(searchTerm, colTarget) {
    var querySet = new Object();
    var query = new Array();
    var obj = new Object();

    var whereSet = new Object();
    var whereField = new Array();
    if (colTarget == "stock")
        whereField = ["BRACE_OPEN", "STOCK_WANNAME_WS(HASALL|'" + searchTerm + "'|100)", "OR", "ARJ_CODE(HASALL|'" + searchTerm + "'|100)", "BRACE_CLOSE"];
    else if (colTarget == "program")
        whereField = ["PRG_CD(HASALL|'" + searchTerm + "'|0)"];

    whereSet.fields = whereField;
    obj.whereSet = whereSet;


    var selectSet = new Object();
    var selectField = new Array();
    if (colTarget == "stock")
        selectField = ["ARJ_CODE(NONE)", "CHG_RATE(NONE)", "CHG_TYPE(NONE)", "CURR_PRICE(NONE)", "FINAL_PRICE(NONE)", "IMG(NONE)", "NET_CHG(NONE)", "NET_TURNOVER(NONE)", "NET_VOL(NONE)", "STOCK_WANNAME(NONE)", "URL(NONE)"];
    else if (colTarget == "program")
        selectField = ["CAST_TYPE(NONE)", "DEPT_NM(NONE)", "GUBUN(NONE)", "IMAGE_URL(NONE)", "INTRODUCTION(NONE)", "PERSON_ID(NONE)", "PERSON_NM(NONE)", "PRG_CD(NONE)", "PRO_ID(NONE)", "INVESTKIND(NONE)"];

    selectSet.fields = selectField;
    obj.selectSet = selectSet;

    var fromSet = new Object();
    var resultSize = new Array();
    if (colTarget == "stock") {
        resultSize = [0, 0];
        fromSet.collection = "WOWSTOCK";
    }
    else if (colTarget == "program") {
        resultSize = [0, 5];
        fromSet.collection = "WOWPERSON";
    }


    fromSet.result = resultSize;
    obj.fromSet = fromSet;
    obj.useCache = true;
    obj.dictionary = dictionaryOption();

    obj.debugOption = debugOption(0);
    query[0] = obj;
    querySet.version = 42;
    querySet.query = query;
    return querySet;
}
function setSubQuery2(prg_cd, searchTerm) {
    var querySet = new Object();
    var query = new Array();
    for (var i = 0; i < 3; i++) {
        var obj = new Object();
        var whereSet = new Object();
        var whereField = new Array();
        if (i == 0) {
            if(prg_cd != '')
                whereField = ["PRG_CD(HASANY|'" + prg_cd + "'|0)"];
            else
                whereField = ["PRG_CD(HASANY|'NODATA'|0)"];
        }
        else
            whereField = ["NICKNAME(HASALL|'" + searchTerm + "'|0)"];
        whereSet.fields = whereField;
        obj.whereSet = whereSet;


        var selectSet = new Object();
        var selectField = new Array();
        if (i == 0)
            selectField = ["ANC1_NM(NONE)", "ANC2_NM(NONE)", "AREA_NM(NONE)", "BROAD_DATE(NONE)", "BROAD_TYPE_CODE(NONE)", "BRO_END(NONE)", "BRO_START(NONE)", "FILEPATH(NONE)", "IMG_MAIN(NONE)", "ING_YN(NONE)", "PD2_NM(NONE)", "PD_NM(NONE)", "PGMDAY(NONE)", "PRG_CD(NONE)", "PRG_NM(NONE)", "PRG_REMARK(NONE)", "PRG_TITLE(NONE)", "TITLE(NONE)"];
        else if (i == 1)
            selectField = ["BANNERIMAGE(NONE)", "CODE_NAME(NONE)", "NICKNAME(NONE)", "PROIMAGE(NONE)", "PRO_ID(NONE)", "SEQ(NONE)", "TITLE(NONE)", "STARTDATE(NONE)", "ENDDATE(NONE)", "LINKURL(NONE)"];
        else
            selectField = ["LECTURES_DATE(NONE)", "LECTURES_TIME(NONE)", "LECTURES_SEQ(NONE)", "SCHEDULE_SEQ(NONE)", "MAIN_CTGR(NONE)", "NICKNAME(NONE)", "PARTNER_NO(NONE)", "PLACE(NONE)", "PRO_ID(NONE)", "TITLE(NONE)", "WG_IMAGE_FILE(NONE)"];

        selectSet.fields = selectField;
        obj.selectSet = selectSet;

        var fromSet = new Object();
        var resultSize = new Array();
        if (i == 0) fromSet.collection = "WOWPROGRAM";
        else if (i == 1) fromSet.collection = "PARTNER_EVENT";
        else fromSet.collection = "PARTNER_LECTURE";

        resultSize = [0, 5];
        fromSet.result = resultSize;
        obj.fromSet = fromSet;

        obj.debugOption = debugOption(0);
        obj.useCache = true;
        obj.dictionary = dictionaryOption();
        query[i] = obj;
    }

    querySet.version = 42;
    querySet.query = query;
    return querySet;
}
function setMoreStockQuery(colTarget) {
    var currentPageStock = $('#currentPageStock').val();
    var stockTerm = $('#searchTerm').val();
    var querySet = new Object();
    var query = new Array();
    var obj = new Object();
    obj.whereSet = whereSet(stockTerm, stockVal);
    obj.selectSet = selectSet(stockVal);
    obj.orderBySet = orderBySet(stockVal, '');
    obj.fromSet = fromSet(colTarget, stockVal, (parseInt(currentPageStock) + 1));
    obj.debugOption = debugOption(0);
    obj.logOption = logOption(stockTerm);
    obj.useCache = true;
    query[0] = obj;
    querySet.version = 42;
    querySet.query = query;

    var moreStock = new Object();
    moreStock.querySet = querySet;
    var jsonMoreStock = JSON.stringify(moreStock);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        async: false,
        url: SEARCH_API_URL,
        data: jsonMoreStock,
        success: function (stockData) {
            var rs = stockData.resultSet.result[0];
            var content = "";
            content += "                    <ul>";
            for (var val = 0; val < rs.realSize; val++) {
                var result = rs.resultDocuments[val];
                var chgRate = Number(result.CHG_RATE);
                chgRate = chgRate.toFixed(2);
                if (result.NET_CHG == '0') chgRate = 0;
                var chgType = result.CHG_TYPE;
                var cls = "";
                var cls2 = "";
                if (chgType == '1' || chgType == '2') {
                    cls = "class=\"up\"";
                    cls2 = "class=\"plus\"";
                }
                else if (chgType == '4' || chgType == '5') {
                    cls = "class=\"down\"";
                    cls2 = "class=\"minus\"";
                }
                else cls = "";
                content += "                        <li>";
                var stockNm = result.STOCK_WANNAME;
                if (stockNm.lastIndexOf("우") == stockNm.length - 1)
                    stockNm += ";";
                content += "                            <a href=\"/Finance/DomesticStock/DomesticStockDetail?searchStr=" + result.ARJ_CODE + "\"><strong class=\"title\">" + replaceAll(stockNm, '우;', '<span>우</span>') + "</strong></a>";
                content += "                            <dl class=\"number\">";
                content += "                                <dt>" + numberWithCommas(result.CURR_PRICE) + "</dt>";
                content += "                                <dd " + cls + ">" + result.NET_CHG + "</dd>";
                content += "                                <dd " + cls2 + ">" + chgRate + "%</dd>";
                content += "                            </dl>";
                content += "                        </li>";
            }
            content += "                    </ul>";
            $('#stockMore').append(content);
            $('#currentPageStock').val((parseInt(currentPageStock) + 1));
            var rowsperPage = 0;
            if (colTarget == 'total') rowsperPage = 12;
            else rowsperPage = 24;
            if (rs.realSize < rowsperPage) $('#stockMoreButton').hide();

        },
        error: function (e) {
            console.log(JSON.stringify(e));
        }
    });
}
function goStockDetail(arjCode) {
    setStockCookie(arjCode);
    location.href = "/Finance/DomesticStock/DomesticStockDetail?menuSeq=464&searchStr=" + String(arjCode);
}
function setStockCookie(cookieValue) {
    var cookieName = 'searchStock';
    var ex = getCookie(cookieName);
    var index = ex.indexOf(cookieValue);
    if (index == -1)
        document.cookie = cookieName + "=" + escape(cookieValue + ";" + ex).replace("undefined", "") + "; path=/";
}

function getCookie(cookieName) {
    var cookie = document.cookie;
    if (cookie.length > 0) {
        startIndex = cookie.indexOf(cookieName);
        if (startIndex != -1) {
            startIndex += cookieName.length;
            endIndex = cookie.indexOf(";", startIndex);
            if (endIndex == -1) endIndex = cookie.length;
            return unescape(cookie.substring(startIndex + 1, endIndex));
        }
        else 
            return "";
    }
    else 
        return "";
}
function setTrendQuery() {
    var querySet = new Object();
    var query = new Array();

    for (var i = 0; i < 2; i++) {
        var obj = new Object();
        var whereSet = new Object();
        var whereField = new Array();
        whereField = ["SEARCHALL(HASALL|'all'|100)"];
        whereSet.fields = whereField;
        obj.whereSet = whereSet;


        var selectSet = new Object();
        var selectField = new Array();
        if (i == 0) selectField = ["KEYWORD(NONE)", "COUNT(NONE)"];
        else selectField = ["SEARCHALL(NONE)"];
        selectSet.fields = selectField;
        obj.selectSet = selectSet;

        var groupBySet = new Object();
        var groupField = new Array();
        groupField = ["KEYWORDS(COUNT;ORDER_COUNT|'DESC 0 30')"];
        groupBySet.fields = groupField;
        if (i != 0)
            obj.groupBySet = groupBySet;

        var filterSet = new Object();
        var filterField = new Array();
        var dateList = date_select(1).split('_');
        filterField = ["ARTDATE(RANGE|'" + dateList[0] + "';'" + dateList[1] + "')"];
        filterSet.fields = filterField;
        if (i != 0)
            obj.filterSet = filterSet;

        var orderBySet = new Object();
        var orderField = new Array();
        orderField = ["RANKING(ASC|NONE)"];
        orderBySet.fields = orderField;
        if (i == 0)
            obj.orderBySet = orderBySet;


        var fromSet = new Object();
        var resultSize = new Array();
        if (i == 0) fromSet.collection = "TRENDKEYWORD";
        else fromSet.collection = "WOWNEWS_2017";

        resultSize = [0, 9];
        fromSet.result = resultSize;
        obj.fromSet = fromSet;
        obj.useCache = true;

        obj.debugOption = debugOption(0);
        query[i] = obj;
    }
    querySet.version = 42;
    querySet.query = query;
    return querySet;
}
function changeColTarget(colTarget) {
    $('#colTarget').val(colTarget);
    $('#filterList').val('');
    $('#currentPage').val(1);
    $('#searchForm').submit();
}
function goSearch(searchTerm) {
    $('#searchTerm').val(searchTerm);
    $('#filterList').val('');
    $('#currentPage').val(1);
    $('#colTarget').val('total');
    $('#searchForm').submit();
}
function goTotalSearch() {
    $('#filterList').val('');
    $('#currentPage').val(1);
    $('#colTarget').val('total');
    $('#searchForm').submit();
}
function goPage(currentPage) {
    $('#currentPage').val(currentPage);
    $('#searchForm').submit();
}
function changePersonFilter(gubun) {
    $('#filterList').val(gubun);
    $('#currentPage').val(1);
    $('#searchForm').submit();
}
function changeNewsFilter(gubun) {
    $('#filterList').val(gubun);
    $('#currentPage').val(1);
    $('#searchForm').submit();
}
function changeNewsCal(filterList) {
    var start = $('#startDate').val();
    var end = $('#endDate').val();
    start = replaceAll(start, "/", "") + "000000";
    end = replaceAll(end, "/", "") + "235959";
    var filter = new Array();
    if (filterList != '' && filterList != null) filter = filterList.split("^");
    else filter = [0, 0, 0, 0, 0];

    filter[3] = start + "_" + end;
    filterList = filter.join("^");
    changeNewsFilter(filterList);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function padZero2(num, leng) {
    var zero = leng - ("" + num).length;
    if (typeof (num) == "number" && zero > 0) {
        var tmp = "";
        for (var i = 0; i < zero; i++) tmp += "0";
        return tmp + num;
    }
    else return num;
}
function date_select(type) {
    var today = new Date();
    var today_year = today.getFullYear();
    var today_month = today.getMonth() + 1;
    var today_date = today.getDate();
    var from;
    var to;
    var year = today_year;
    var month = today_month;
    var date = today_date;
    var month_len = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    month_len[1] = (((today_year % 100 != 0) && (today_year % 4 == 0)) || (today_year % 400 == 0)) ? 29 : 28;
    if (type == 0) {//1일
        date = today_date - 1;
        if (date <= 0) {
            if (month == 1) {
                date = month_len[11] + date;
                month = 12;
                year = year - 1;
            }
            else {
                date = month_len[month - 2] + date;
                month = month - 1;
            }
        }
    }
    else if (type == 1) {//1주일
        date = today_date - 7;
        if (date <= 0) {
            if (month == 1) {
                date = month_len[11] + date;
                month = 12;
                year = year - 1;
            }
            else {
                date = month_len[month - 2] + date;
                month = month - 1;
            }
        }

    }
    else {//1개월 
        month = today_month - 1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }

    }
    from = year + "" + padZero2(month, 2) + "" + padZero2(date, 2) + "000000";
    to = today_year + "" + padZero2(today_month, 2) + "" + padZero2(today_date, 2) + "235959";
    return from + '_' + to;
}
function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}


var DomesticStockDetailTotalInfo = {
    RecentNews: function () {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRecentNews",
            data: $("#frmList_DSDNewAndNoticeTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDNewAndNoticeTab > #divList").html(data);
            }
        });

        return false;
    },
    RecentNotice: function () {
        //alert("클릭");
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/DomesticStockDetailRecentNotices",
            data: $("#frmList_DSDNewAndNoticeTab").serialize(),
            success: function (data, textStatus) {
                $("#frmList_DSDNewAndNoticeTab > #divList").html(data);
            }
        });

        return false;
    },
    GetHpChart: function (trId, code, width, height) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    var startDate = data.splitList[4];
                    var endDate = data.splitList[5];

                    if (startDate.substr(0, 4) >= '2000') {
                        startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                        endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                        $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    }
                }
            }
        });
    }
}
function FavoriteStockReg(arjCode) {
    $.ajax({
        type: 'POST',
        url: "/Finance/DomesticStock/SaveMyFavoriteStock?arjCode",
        data: { stockCode: arjCode },
        success: function (data, textStatus) {
            $(data).each(function (index, item) {
                if (item.IsSuccess == true) {
                    alert("등록되었습니다.");
                }
                else {
                    alert(item.Msg);
                }

            });
        }
    });
    return false;
}