//var SEARCH_API_URL = "http://192.168.111.61:5001/collections/search";
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
                $('#totalResultSize').html('통합검색(' + numberWithCommas(totalSize) + ')');
                $('#stockResultSize').html('종목(' + numberWithCommas(stockSize) + ')');
                $('#programResultSize').html('프로그램(' + numberWithCommas(programSize) + ')');
                $('#personResultSize').html('인물(' + numberWithCommas(personSize) + ')');
                $('#newsResultSize').html('뉴스(' + numberWithCommas(newsSize) + ')');
                $('#cafeResultSize').html('카페(' + numberWithCommas(cafeSize) + ')');
                $('#photoResultSize').html('포토(' + numberWithCommas(photoSize) + ')');
                $('#vodResultSize').html('동영상(' + numberWithCommas(vodSize) + ')');
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });
    }
    else {
        $('#totalResultSize').html('통합검색(' + numberWithCommas(totalSize) + ')');
        $('#stockResultSize').html('종목(' + numberWithCommas(stockSize) + ')');
        $('#programResultSize').html('프로그램(' + numberWithCommas(programSize) + ')');
        $('#personResultSize').html('인물(' + numberWithCommas(personSize) + ')');
        $('#newsResultSize').html('뉴스(' + numberWithCommas(newsSize) + ')');
        $('#cafeResultSize').html('카페(' + numberWithCommas(cafeSize) + ')');
        $('#photoResultSize').html('포토(' + numberWithCommas(photoSize) + ')');
        $('#vodResultSize').html('동영상(' + numberWithCommas(vodSize) + ')');
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
                content += "    <strong class=\"title\">인기</strong>";
                content += "        <ul>";
                for (var i = 0; i < rs.realSize; i++) {
                    if (i >= 5) break;
                    var result = rs.resultDocuments[i];
                    content += "            <li><a href=\"javascript:goSearch('" + result.KEYWORD + "');\">" + result.KEYWORD + "</a></li>";
                }
                content += "        </ul>";
            }
            $('#trendKeyword').html(content);

            rs = data.resultSet.result[1].groupResult[0];
            content = "";
            if (rs.groupResultSize > 0) {
                content += "    <strong class=\"title\">키워드</strong>";
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
    }
    else if (colTarget == "program") {
        colVal = programVal;
        targetNumber = 1;
    }
    else if (colTarget == "person") {
        colVal = personVal;
        targetNumber = 1;
    }
    else if (colTarget == "news") {
        colVal = newsVal;
        targetNumber = 1;
    }
    else if (colTarget == "cafe") {
        colVal = cafeVal;
        targetNumber = 1;
    }
    else if (colTarget == "photo") {
        colVal = photoVal;
        targetNumber = 1;
    }
    else if (colTarget == "vod") {
        colVal = vodVal;
        targetNumber = 1;
    }
    else targetNumber = 7;
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
                        content += "        <h3>종목(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "        <h3 class=\"mlr15\">종목(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    $('#stockCount').html(content);
                    content = "            <div class=\"section-area\">";
                    content += "                <div class=\"swiper-container box01-slider\">";
                    content += "                 <div class=\"swiper-wrapper\">";
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
                        content += "                        <div class=\"swiper-slide\">";
                        content += "                        <div class=\"box-type-attent01 type01\" onclick=\"goStockDetail('" + result.ARJ_CODE + "');\">";
                        content += "                            <strong>" + result.STOCK_WANNAME + "</strong>";
                        content += "                            <ul class=\"stock-box\">";
                        content += "                                <li class=\"first\"><span class=\"ft-14 font-color04\">" + numberWithCommas(result.CURR_PRICE) + "</span></li>";
                        content += "                                <li><span class=\"stock " + cls + "\"> " + numberWithCommas(result.NET_CHG) + " (<span class=\"stock " + cls2 + "\">" + chgRate + "%</span>)</span></li>";
                        content += "                            </ul>";
                        content += "                        </div>";
                        content += "                        </div>";

                    }
                    content += "                        </div>";
                    content += "                        </div>";
                    content += "                        </div>";


                    $('#stockContents').html(content);
                }
                else if (colTarget == "program" || (i == programVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <h3 class=\"plr15 bdb-col01\">프로그램(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "        <h3 class=\"mlr15\">프로그램(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var type = result.BROAD_TYPE_CODE;
                        if (type.toUpperCase() == 'AFTER') type = "장후방송 | ";
                        else if (type.toUpperCase() == 'PROC') type = "장중방송 | ";
                        else if (type.toUpperCase() == 'SPEC') type = "특집방송 | ";
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
                        content += "                        <div class=\"box-news-img type01 mt15\">";
                        content += "                        	<div class=\"img-area\">";
                        content += "                        		<a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "\" ><img src=\"" + result.IMG_MAIN + "\" class=\"Img\" alt=\"" + result.PRG_NM + "\"></a>";
                        if (result.ING_YN == 'Y') {
                            content += "                        		<span class=\"text-icon type07\">방영중</span>";
                        }
                        else {
                            content += "                        		<span class=\"text-icon type07\">종영</span>";
                        }
                        content += "                        		<span class=\"icon-play\"></span>";
                        content += "                        	</div>";
                        content += "                        </div>";
                        content += "                        <div class=\"section-area\">";
                        content += "                        	<div class=\"news-title mb10\">";
                        content += "                        		<p class=\"tiele\">" + result.PRG_NM + "</p>";
                        content += "                        		<p class=\"num mt10\">" + type + day + " " + result.BRO_START + " ~ " + result.BRO_END + "</p>";
                        //content += "                        		<div class=\"news-view mt20\"><div class=\"content-box font-color08\">리서치·자문사 직격 인터뷰 여의도 LIVE 다차원적 수급분석을 통해</div></div>";
                        content += "                        		<div class=\"icon-box mt15\">";
                        content += "                        			<ul class=\"icon-list\">";
                        content += "                        				<li><a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "\" class=\"is-ico ico-home\"></a></li>";
                        content += "                        				<li><a href=\"javascript:co.PopupScrap('Program', '" + replaceAll(name, '\'', '') + "', '" + result.PRG_CD + "');\" class=\"btn01 type01 w-auto\"><span class=\"is-ico ico-pin\"></span> 핀하기</a></li>";
                        content += "                        				<li><a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "&broadWatchNumber=-1\" class=\"btn01 type02 w-auto\">다시보기</a></li>";
                        var feedbackUrl = "/Common/GetProgramFeedBack?programCode=" + result.PRG_CD;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=UTF-8",
                            dataType: "json",
                            async: false,
                            url: feedbackUrl,
                            success: function (feedbackData) {
                                content += "                        				<li><a href=\"/Broad/ProgramMain/Index?menuSeq=" + MENU_SEQ_DEFINE.BROAD.PROGRAM + "&programCode=" + result.PRG_CD + "&isFeedBack=1&FeedBackContentSeq=0&FeedBackMenuSeq=" + feedbackData.MenuSeq + "\" class=\"btn01 type02 w-auto\">시청자의견</a></li>";
                            },
                            error: function (e) {
                                console.log(JSON.stringify(e));
                            }
                        });
                        content += "                        			</ul>";
                        content += "                        		</div>";
                        content += "                        	</div>";
                        content += "                        </div>";
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
                            content += "                        <h3 class=\"blind\">tab</h3>";
                            content += "                        <div class=\"tab-area tab-btn\">";
                            content += "                        	<ul>";
                            if (personTotalSize > 0) {
                                content += "                        		<li class=\"on\"><a href=\"javascript:void(0);\">출연진</a></li>";
                            }
                            if (vodList.length > 0) {
                                if (personTotalSize == 0)
                                    content += "                        		<li class=\"on\"><a href=\"javascript:void(0);\">VOD</a></li>";
                                else
                                    content += "                        		<li class=\"\"><a href=\"javascript:void(0);\">VOD</a></li>";
                            }
                            content += "                        	</ul>";
                            content += "                        </div>";
                            content += "                        <div class=\"tab-body\">";
                            if (personTotalSize > 0) {
                                content += "                        	<div class=\"tab-cont on\">";
                                content += "                        		<div class=\"section-area mb10\">";
                                content += "                        			<div class=\"swiper-container box-slider box-type-appear pb15\">";
                                content += "                        				<div class=\"swiper-wrapper\">";
                                for (var j = 0; j < personRealSize; j++) {
                                    content += "                        					<div class=\"swiper-slide\">";
                                    content += "                        						<div class=\"box-img-01\">";
                                    content += "                        							<div class=\"img-area\"><img src=\"" + personResult[j].IMAGE_URL + "\" alt=\"" + personResult[j].PERSON_NM + " class=\"Img\"></div>";
                                    content += "                        							<div class=\"txt-area\"><p class=\"txt\"><a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + personResult[j].PRO_ID + "\">" + personResult[j].PERSON_NM + "</a></p></div>";
                                    content += "                        						</div>";
                                    content += "                        					</div>";
                                }
                                content += "                        				</div>";
                                content += "                        			</div>";
                                content += "                        		</div>";
                                content += "                        	</div>";
                            }
                            if (vodList.length > 0) {
                                if (personTotalSize == 0)
                                    content += "                        	<div class=\"tab-cont on\">";
                                else
                                    content += "                        	<div class=\"tab-cont\">";
                                content += "                        		<div class=\"section-area mb10\">";
                                content += "                        			<div class=\"swiper-container box-slider box-type-appear pb15\">";
                                content += "                        				<div class=\"swiper-wrapper\">";
                                for (var j = vodList.length - 1; j >= 0; j--) {
                                    if (vodList.length - j - 1 > 4) break;
                                    content += "                        					<div class=\"swiper-slide\">";
                                    content += "                        						<a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.PRG_CD + "&broadWatchNumber=" + vodList[j] + "\" class=\"box-img-01 type01\">";
                                    content += "                        							<div class=\"img-area\"><img src=\"" + result.IMG_MAIN + "\" alt=\"" + titleList[j] + "><span class=\"icon-play small\"></span></div>";
                                    content += "                        							<div class=\"txt-area\">";
                                    content += "                        								<p class=\"txt\">" + titleList[j] + "</p>";
                                    content += "                        								<span class=\"num font-color07\">" + brdDateList[j].substring(0, 4) + "." + brdDateList[j].substring(4, 6) + "." + brdDateList[j].substring(6, 8) + "</span>";
                                    content += "                        							</div>";
                                    content += "                        						</a>";
                                    content += "                        					</div>";
                                }
                                content += "                        				</div>";
                                content += "                        			</div>";
                                content += "                        		</div>";
                                content += "                        	</div>";
                            }
                            content += "                        </div>";
                        }
                    }
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('program');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 5);
                        content += "                </div></div>";
                    }
                    $('#programContents').html(content);
                }
                else if (colTarget == "person" || (i == personVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "        <div class=\"section-area pd0 mb10\">";
                        content += "        <h3 class=\"plr15 bdb-col01\">인물(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "                    <div class=\"choice-list\">";
                        content += "                    				<ul>";
                        content += "                    					<li>";
                        content += "                    						<ul>";
                        if (filterList == '') {
                            content += "                    							<li class=\"on\"><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "                    							<li><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "                    							<li><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        else if (filterList == 'report') {
                            content += "                    							<li><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "                    							<li class=\"on\"><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "                    							<li><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        else {
                            content += "                    							<li><a href=\"javascript:changePersonFilter('');\">전체</a></li>";
                            content += "                    							<li><a href=\"javascript:changePersonFilter('report');\">기자</a></li>";
                            content += "                    							<li class=\"on\"><a href=\"javascript:changePersonFilter('cast');\">파트너</a></li>";
                        }
                        content += "                    						</ul>";
                        content += "                    					</li>";
                        content += "                    				</ul>";
                        content += "                    			</div>";
                        content += "        <div class=\"section-area pd0 mb10\">";
                        content += "        <h3 class=\"mlr15\">인물(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }

                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        content += "                        	<div class=\"box-type-person\">";
                        if (result.GUBUN == "report") {
                            var imageUrl = result.IMAGE_URL;
                            if (imageUrl != '/images/temp/no_img_reporter.gif') imageUrl = styleRoot.replace("/MobileStyle", "") + imageUrl;
                            else imageUrl = styleRoot + imageUrl;
                            content += "                        		<div class=\"box-cont\">";
                            content += "                        			<div class=\"img-area\"><a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "\" ><img src=\"" + imageUrl + "\" alt=\"" + result.PERSON_NM + "\"></a></div>";
                            content += "                        			<div class=\"txt-area\">";
                            content += "                        				<strong>" + result.PERSON_NM + "</strong>";
                            content += "                        				<span class=\"text-icon\">" + result.POSITION + "</span>";
                            content += "                        				<span class=\"txt-expr\">" + result.DEPT_NM + "</span>";
                            content += "                        				<p class=\"aside-area\">" + result.INTRODUCTION + "</p>";
                            content += "                        			</div>";
                            content += "                        			<div class=\"icon-box\">";
                            content += "                        				<ul class=\"icon-list mt5\">";
                            content += "                        					<li><a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "\" class=\"is-ico ico-home\"></a></li>";
                            content += "                        					<li><a href=\"/NewsCenter/Reporter?menuseq=555&SearchId=" + result.PERSON_ID + "&tabType=2\" class=\"btn-ico\"><span class=\"is-ico reply-tit\"></span></a></li>";
                            content += "                        					<li><a href=\"javascript:PopupSubScript('" + result.PERSON_ID + "');\" class=\"btn01 type03 w-auto\"><span class=\"is-ico ico-reading\"></span> 구독하기</a></li>";
                            content += "                        					<li><a href=\"javascript:co.PopupScrap('Report', '" + replaceAll(result.PERSON_NM, '\'', '') + "', '" + result.PERSON_ID + "');\" class=\"btn01 type01 w-auto\"><span class=\"is-ico ico-pin\"></span> 핀하기	</a></li>";
                            content += "                        				</ul>";
                            content += "                        			</div>";
                            content += "                        		</div>";
                        }
                        else {
                            var ik = result.INVESTKIND;
                            var imageUrl = result.IMAGE_URL;
                            if (imageUrl == '/images/temp/no_img_reporter.gif') imageUrl = styleRoot + imageUrl;
                            content += "                        		<div class=\"box-cont\">";
                            content += "                        			<div class=\"img-area\"><a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" ><img src=\"" + imageUrl + "\" alt=\"" + result.PERSON_NM + "\"></a></div>";
                            content += "                        			<div class=\"txt-area\">";
                            content += "                        				<strong>" + result.PERSON_NM + "</strong>";
                            content += "                        				<span class=\"text-icon\">파트너</span>";
                            if (ik.trim() != '') {
                                var investValue = investkind[ik.trim()];
                                content += "                        				<span class=\"txt-expr\">" + investValue + "</span>";
                            }
                            content += "                        				<ul class=\"list-type-square mb0\">";
                            content += "                        					<li>" + result.INTRODUCTION + "</li>";
                            content += "                        				</ul>";
                            content += "                        			</div>";
                            content += "                        			<div class=\"icon-box\">";
                            content += "                        				<ul class=\"icon-list mt5\">";
                            content += "                        					<li><a href=\"http://www.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" class=\"is-ico ico-home\"></a></li>";
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
                                        content += "                                    <a href=\"http://wowpro.wownet.co.kr/pro/pro_main_new/sub_main.asp?proID=" + result.PRO_ID + "\" class=\"btn01 type02 w-auto\"><span class=\"is-ico ico-grown-arrow\"></span>녹화방송</a>";
                                    else {
                                        if (loginValue == "True")
                                            content += "                                    <li><a href=\"javascript:Pro_Open('" + BROOM.trim() + "', '" + PRODUCT_ID_1 + "', '" + BMEMTYPE + "', 'L');\" class=\"btn01 type04 w-auto\"><span class=\"is-ico ico-red-arrow\"></span>방송중</a></li>";
                                        else
                                            content += "                                    <li><a href=\"javascript:Pro_Open_Cast('" + BROOM.trim() + "', '" + PRODUCT_ID_1 + "', '" + BMEMTYPE + "', 'L','tv');\" class=\"btn01 type04 w-auto\"><span class=\"is-ico ico-red-arrow\"></span>방송중</a></li>";
                                    }
                                },
                                error: function (e) {
                                    console.log(JSON.stringify(e));
                                }
                            });
                            content += "                        					<li><a href=\"javascript:co.PopupScrap('Partner', '" + replaceAll(result.PERSON_NM, '\'', '') + "', '" + result.PERSON_ID + "');\" class=\"btn01 type01 w-auto\"><span class=\"is-ico ico-pin\"></span> 핀하기</a></li>";
                            var cafeUrl = "/TotalSearch/Mariner/GetPartnerCafeDomain?wowtvId=" + result.WOWTV_ID;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=UTF-8",
                                dataType: "json",
                                async: false,
                                url: cafeUrl,
                                success: function (cafeData) {
                                    content += "                        					<li><a href=\"http://cafe.wownet.co.kr/" + cafeData.data + "\" class=\"btn01 type02 w-auto\">카페 바로가기</a></li>";
                                },
                                error: function (e) {
                                    console.log(JSON.stringify(e));
                                }
                            });                            
                            content += "                        				</ul>";
                            content += "                        			</div>";
                            content += "                        		</div>";
                            content += "                        	</div>";
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
                                content += "                        	<div class=\"swiper-container sub-gnb01 mb0 bdt-none\">";
                                content += "                        		<div class=\"swiper-wrapper\">";
                                if (prgTotalSize > 0) {
                                    content += "                        			<div class=\"swiper-slide on\"><span>출연방송</span></div>";
                                }
                                if (eventTotalSize > 0) {
                                    if (prgTotalSize > 0)
                                        content += "                        			<div class=\"swiper-slide\"><span>이벤트</span></div>";
                                    else
                                        content += "                        			<div class=\"swiper-slide on\"><span>이벤트</span></div>";
                                }
                                if (lecTotalSize > 0) {
                                    if (prgTotalSize > 0 || eventTotalSize > 0)
                                        content += "                        			<div class=\"swiper-slide\"><span>강연회</span></div>";
                                    else
                                        content += "                        			<div class=\"swiper-slide on\"><span>강연회</span></div>";
                                }
                                content += "                        		</div>";
                                content += "                        	</div>";
                                content += "                        	<div class=\"tab-body\">";
                                if (prgTotalSize > 0) {
                                    content += "                        		<div class=\"tab-cont on\">";
                                    content += "                        			<div class=\"section-area pb15\">";
                                    content += "                        				<div class=\"swiper-container box-img-slider box-slider\">";
                                    content += "                        					<div class=\"swiper-wrapper\">";
                                    for (var j = 0; j < prgRealSize; j++) {
                                        var on = "";
                                        if (j == 0) on = " on";
                                        content += "                        						<div class=\"swiper-slide" + on + "\">";
                                        content += "                        							<a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + prgResult[j].PRG_CD + "&broadWatchNumber=-1\" class=\"box-img-01 type01\">";
                                        content += "                        								<div class=\"img-area\"><img src=\"" + prgResult[j].IMG_MAIN + "\" alt=\"" + prgResult[j].PRG_NM + "\">";
                                        content += "                        									<span class=\"text-icon\">단독</span>";
                                        content += "                        									<span class=\"icon-play\"></span>";
                                        content += "                        								</div>";
                                        content += "                        								<div class=\"txt-area\">";
                                        content += "                        									<p class=\"txt font-color03\">" + prgResult[j].PRG_NM + "</p>";
                                        //content += "                        									<p class=\"txt mt0\">인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주</p>";
                                        content += "                        								</div>";
                                        content += "                        							</a>	        ";
                                        content += "                        						</div>";
                                    }
                                    content += "                        					</div>";
                                    content += "                        				</div>";
                                    content += "                        			</div>";
                                    content += "                        		</div>";
                                }
                                if (eventTotalSize > 0) {
                                    if (prgTotalSize == 0)
                                        content += "                        		<div class=\"tab-cont on\">";
                                    else
                                        content += "                        		<div class=\"tab-cont\">";
                                    content += "                        			<div class=\"section-area pb15\">";
                                    content += "                        				<div class=\"swiper-container box-img-slider box-slider\">";
                                    content += "                        					<div class=\"swiper-wrapper\">";
                                    for (var j = 0; j < eventRealSize; j++) {
                                        var url = eventResult[j].LINKURL;
                                        if (url == "")
                                            url = "https://mhelp.wowtv.co.kr/LecturesAndEvent/Event/Detail?Seq=" + eventResult[j].SEQ + "&SearchType=&SearchText=&EventType=1&pageSize=12&currentIndex=0&menuSeq=924";
                                        var on = "";
                                        if (j == 0) on = " on";
                                        content += "                        						<div class=\"swiper-slide" + on + "\">		                	";
                                        content += "                        							<a href=\"" + url + "\" class=\"box-img-01 type01\">";
                                        content += "                        								<div class=\"img-area\"><img src=\"" + eventResult[j].BANNERIMAGE + "\" alt=\"" + eventResult[j].TITLE + "\"></div>";
                                        content += "                        								<div class=\"txt-area\">";
                                        content += "                        									<p class=\"txt font-color03\">" + eventResult[j].TITLE + "</p>";
                                        //content += "                        									<p class=\"txt mt0\">인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주인천여우의 일등주도주</p>";
                                        var start = eventResult[j].STARTDATE;
                                        var end = eventResult[j].ENDDATE;
                                        start = start.substring(0, 4) + "." + start.substring(4, 6) + "." + start.substring(6, 8);
                                        end = end.substring(0, 4) + "." + end.substring(4, 6) + "." + end.substring(6, 8);
                                        content += "                        									<span class=\"num font-color08\">" + start + "~" + end + "</span>";
                                        content += "                        								</div>";
                                        content += "                        							</a>	        ";
                                        content += "                        						</div>";
                                    }
                                    content += "                    					    </div>";
                                    content += "                    				    </div>";
                                    content += "                    			    </div>";
                                    content += "                    		    </div>";
                                }
                                if (lecTotalSize > 0) {
                                    if (prgTotalSize == 0 && eventTotalSize == 0)
                                        content += "                    		<div class=\"tab-cont on\">";
                                    else
                                        content += "                    		<div class=\"tab-cont\">";
                                    content += "                    			<div class=\"section-area pb15\">";
                                    content += "                    				<div class=\"swiper-container box-img-slider box-slider\">";
                                    content += "                    					<div class=\"swiper-wrapper\">";
                                    for (var j = 0; j < lecRealSize; j++) {
                                        var on = "";
                                        if (j == 0) on = " on";
                                        content += "                    						<div class=\"swiper-slide" + on + "\">		                	";
                                        content += "                    							<a href=\"javascript:void(0)\" class=\"box-img-01\">";
                                        content += "                    								<div class=\"img-area\"><img src=\"" + lecResult[j].WG_IMAGE_FILE + "\" alt=\"" + lecResult[j].TITLE + "\">";
                                        content += "                    									<span class=\"icon-play small\"></span>";
                                        content += "                    								</div>";
                                        content += "                    								<div class=\"txt-area mt10\">";
                                        content += "                    									<span class=\"text-icon type13\">" + lecResult[j].MAIN_CTGR + "</span>";
                                        content += "                    									<p class=\"txt mt5\">" + lecResult[j].TITLE + "</p>";
                                        var date = lecResult[j].LECTURES_DATE;
                                        date = date.substring(0, 4) + "." + date.substring(4, 6) + "." + date.substring(6, 8);
                                        content += "                    									<p class=\"num mt5 font-color07\">" + date + " " + lecResult[j].LECTURES_TIME + "</p>";
                                        content += "                    									<p class=\"txt mt5 font-color08\">" + lecResult[j].PLACE + "</p>";
                                        content += "                    								</div>";
                                        content += "                    							</a>	        ";
                                        content += "                    						</div>";
                                    }
                                    content += "                    					</div>";
                                    content += "                    				</div>";
                                    content += "                    			</div>";
                                    content += "                    		</div>";
                                    content += "                    	</div>";
                                }
                            }
                        }
                    }
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('person');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 10);
                        content += "                </div></div>";
                    }
                    content += "                </div>";
                    $('#personContents').html(content);
                }
                else if (colTarget == "news" || (i == newsVal && colTarget == "total")) {
                    var filter = new Array();
                    if (filterList != '' && filterList != null) filter = filterList.split("^");
                    else filter = [0, 0, 0, 0, 0];
                    content += "                    <div class=\"section-area pd0 mb10\">";
                    if (colTarget == 'total') {
                        content += "                    <div class=\"box-tit-switch\">";
                        content += "                    	<h3 class=\"mlr15\">뉴스(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                        content += "                    	<div class=\"selection-area\">";
                        content += "                    		<span class=\"title\"> 한국경제TV 기사만</span>";
                        if (filter[0] != 0) {
                            content += "                    		<label class=\"switch-btn\" onclick=\"changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">";
                            content += "                    			<input class=\"switch-input\" type=\"checkbox\" checked=\"checked\">";
                        }
                        else {
                            content += "                    		<label class=\"switch-btn\" onclick=\"changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">";
                            content += "                    			<input class=\"switch-input\" type=\"checkbox\">";
                        }
                        content += "                    			<span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>";
                        content += "                    			<span class=\"switch-handle\"></span> ";
                        content += "                    		</label>";
                        content += "                    	</div>";
                        content += "                    </div>";
                    }
                    else {
                        content += "                    <div class=\"box-tit-switch\">";
                        content += "                    	<h3 class=\"mlr15\">뉴스(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                        content += "                    	<div class=\"selection-area\">";
                        content += "                    		<span class=\"title\"> 한국경제TV 기사만</span>";
                        if (filter[0] != 0) {
                            content += "                    		<label class=\"switch-btn\" onclick=\"changeNewsFilter('0^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">";
                            content += "                    			<input class=\"switch-input\" type=\"checkbox\" checked=\"checked\">";
                        }
                        else {
                            content += "                    		<label class=\"switch-btn\" onclick=\"changeNewsFilter('Y^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">";
                            content += "                    			<input class=\"switch-input\" type=\"checkbox\">";
                        }
                        content += "                    			<span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>";
                        content += "                    			<span class=\"switch-handle\"></span> ";
                        content += "                    		</label>";
                        content += "                    	</div>";
                        content += "                    </div>";
                        content += "                    <div class=\"choice-list\">";
                        content += "                    	<ul>";
                        content += "                    		<li>";
                        content += "                    			<strong class=\"title\">정렬</strong>";
                        content += "                    			<ul>";
                        if (filter[1] == 0 || filter[1] == 'desc') {
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^desc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">최신순</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^asc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">오래된순</a></li>";
                        }
                        else {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^desc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">최신순</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^asc^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\">오래된순</a></li>";
                        }
                        content += "                    			</ul>";
                        content += "                    			<span class=\"arrow\"></span>";
                        content += "                    		</li>";
                        content += "                    		<li>";
                        content += "                    			<strong class=\"title\">섹션</strong>";
                        content += "                    			<ul>";
                        content += "                    				<li ";
                        if (filter[2] == 0) content += "class=\"on\"";
                        content += "                                        ><a href=\"javascript:javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^0^" + filter[3] + "^" + filter[4] + "');\">전체</a></li>";
                        for (var sec = 0; sec < newsSection.length; sec++) {
                            if (newsSection[sec] != '') {
                                content += "                            <li ";
                                if (newsSection[sec] == filter[2]) content += "class=\"on\"";
                                content += "                                 ><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + newsSection[sec] + "^" + filter[3] + "^" + filter[4] + "');\">" + newsSection[sec] + "</a></li>";
                            }
                        }
                        content += "                    			</ul>";
                        content += "                    		</li>";
                        content += "                    		<li>";
                        content += "                    			<strong class=\"title\">분류</strong>";
                        content += "                    			<ul>";
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
                        content += "                    			</ul>";
                        content += "                    		</li>";
                        content += "                    		<li>";
                        content += "                    			<strong class=\"title\">기간</strong>";
                        content += "                    			<ul>";
                        if (filter[3] == 0) {
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
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
                        else {
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^0^" + filter[4] + "');\"> 전체</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(0) + "^" + filter[4] + "');\">1일</a></li>";
                            content += "                                <li><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(1) + "^" + filter[4] + "');\">1주</a></li>";
                            content += "                                <li class=\"on\"><a href=\"javascript:changeNewsFilter('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + date_select(2) + "^" + filter[4] + "');\">1개월</a></li>";
                        }
                        var start = "";
                        var end = "";
                        if (filter[3] != 0) {
                            start = filter[3].split("_")[0];
                            end = filter[3].split("_")[1];
                            start = start.substring(0, 4) + "/" + start.substring(4, 6) + "/" + start.substring(6, 8);
                            end = end.substring(0, 4) + "/" + end.substring(4, 6) + "/" + end.substring(6, 8);
                        }
                        content += "                    				<li><a href=\"javascript:void(0)\" class=\"calendar-btn\">직접입력</a></li>";
                        content += "                    			</ul>";
                        content += "                    		</li>";
                        content += "                    	</ul>";
                        content += "                    	<div class=\"calendar-form \">";
                        content += "                    		<input type=\"text\" class=\"datepicker\" readonly=\"readonly\" id=\"startDate\" value=\"" + start + "\"/>";
                        content += "                    		<span class=\"space\">-</span>";
                        content += "                    		<input type=\"text\" class=\"datepicker\" readonly=\"readonly\" id=\"endDate\" value=\"" + end + "\"/>";
                        content += "                    		<div class=\"btn-area mt10\">";
                        content += "                    			<a href=\"javascript:changeNewsCal('" + filter[0] + "^" + filter[1] + "^" + filter[2] + "^" + filter[3] + "^" + filter[4] + "');\" class=\"btn type03\">적용</a>";
                        content += "                    		</div>";
                        content += "                    	</div>";
                        content += "                    </div>";
                    }
                    content += "                    <div class=\"list-type-new02\">";
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
                        content += "                    	<a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\" class=\"obj-cont\">";
                        if (thumbnailImg != "") {
                            content += "                    		<div class=\"img-area\">";
                            content += "                    			<img src=\"" + thumbnailImg + "\">";
                            content += "                    		</div>";
                        }
                        content += "                    		<p class=\"txt\">";
                        if (result.GUBUN_NAME != '')
                            content += "<span class=\"text-icon\">" + result.GUBUN_NAME+"</span>";
                        content += result.TITLE + "</p>";
                        content += "                    		<p class=\"aside-area\">";
                        content += "                    			<span class=\"aside-txt\">뉴스</span>";
                        content += "                    			<span class=\"aside-txt\">" + result.SECTION_NAME + "</span>";
                        content += "                    			<span class=\"aside-txt\">" + result.COMP_NAME + "</span>";
                        content += "                    		</p>";
                        content += "                    	</a>";
                    }
                    content += "                    </div>";
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('news');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 10);
                        content += "                </div></div>";
                    }
                    content += "                    </div>";
                    $('#newsContents').html(content);
                }
                else if (colTarget == "cafe" || (i == cafeVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "                    <h3 class=\"plr15 bdb-col01\">와우카페(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "        <h3 class=\"mlr15\">와우카페(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    content += "                    <div class=\"cafe-area\">";
                    content += "                    	<ul>";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var regdate = result.REGDATE;
                        regdate = regdate.substring(0, 4) + "-" + regdate.substring(4, 6) + "-" + regdate.substring(6, 8);

                        content += "                    		<li>";
                        content += "                    			<a href=\"" + result.URL + "\">";
                        content += "                    				<strong class=\"title\">" + result.TITLE + "</strong>";
                        content += "                    				<span class=\"text\">" + result.CONTENT + "</span>";
                        content += "                    				<span class=\"data\">" + regdate + "<span>" + result.CATE_NAME + " > " + result.CAFENAME + "</span></span>";
                        content += "                    			</a>";
                        content += "                    		</li>";
                    }
                    content += "                    	</ul>";
                    content += "                    </div>";
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('cafe');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 10);
                        content += "                </div></div>";
                    }
                    $('#cafeContents').html(content);
                }
                else if (colTarget == "photo" || (i == photoVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "                    <h3 class=\"plr15 bdb-col01\">포토(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "        <h3 class=\"mlr15\">포토(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    content += "<div class=\"photos\">";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var altTitle = result.TITLE;
                        altTitle = altTitle.replace("\"", "'");
                        var artdate = result.ARTDATE;
                        artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);
                        var thumbnailImg = "";
                        if (result.WOWCODE == 'W040')
                            thumbnailImg = GetNewsThumbnail('34M', result.THUMBNAIL_FILENM, 0, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                        else
                            thumbnailImg = GetNewsThumbnail('16M', result.THUMBNAIL_FILENM, 0, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                        content += "                        <a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\">";
                        content += "                            <img src=\"" + thumbnailImg + "\" alt=\"" + altTitle + "\">";
                        content += "                        </a>";
                    }
                    content += "</div>";
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('photo');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 21);
                        content += "                </div></div>";
                    }
                    $('#photoContents').html(content);

                }
                else if (colTarget == "vod" || (i == vodVal && colTarget == "total")) {
                    if (colTarget == 'total') {
                        content += "                    <h3 class=\"plr15 bdb-col01\">동영상(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }
                    else {
                        content += "        <h3 class=\"mlr15\">동영상(<em>" + numberWithCommas(rs.totalSize) + "</em>)</h3>";
                    }


                    content += "                    <div class=\"section-area\">";
                    content += "                    	<div class=\"box-img-slider type01\">		                	";
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        var gubun = result.GUBUN_NAME;
                        var date = result.ARTDATE;
                        date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
                        if (gubun == 'PROGRAM') {
                            content += "                    		<a href=\"/Broad/ProgramMain/Index?menuSeq=644&programCode=" + result.ARTID + "\" class=\"box-img-01 type01\">";
                            content += "                    			<div class=\"img-area\"><img src=\"" + result.THUMBNAIL_TYPE1 + "\" alt=\"" + result.TITLE + "\">";
                            content += "                    				<span class=\"icon-play small\"></span>";
                            content += "                    			</div>";
                            content += "                    			<div class=\"txt-area\">";
                            content += "                    				<p class=\"txt\">" + result.TITLE + "</p>";
                            content += "                    				<span class=\"num font-color08\">" + date + "</span>";
                            content += "                    			</div>";
                            content += "                    		</a>	       		                	";
                        }
                        else {
                            var thumbnailImg = "";
                            var artdate = result.ARTDATE;
                            artdate = artdate.substring(0, 4) + "-" + artdate.substring(4, 6) + "-" + artdate.substring(6, 8) + " " + artdate.substring(8, 10) + ":" + artdate.substring(10, 12) + ":" + artdate.substring(12, 14);
                            thumbnailImg = GetNewsThumbnail('16M', result.THUMBNAIL_FILENM, result.VOD_NUM, result.IMGDIR, result.THUMBNAIL_TYPE1, artdate);
                            var stockCode = result.STOCKCODE;
                            var stockName = result.STOCKNAME;
                            stockCode = stockCode.substring(1);
                            content += "                    		<a href=\"/NewsCenter/News/Read?articleId=" + result.ARTID + "\" class=\"box-img-01 type01\">";
                            content += "                    			<div class=\"img-area\"><img src=\"" + thumbnailImg + "\" alt=\"" + result.TITLE + "\">";
                            content += "                    				<span class=\"icon-play small\"></span>";
                            content += "                    			</div>";
                            content += "                    			<div class=\"txt-area\">";
                            content += "                    				<p class=\"txt\">" + result.TITLE + "</p>";
                            //content += "                    				<p class=\"txt\">" + result.STOCKNAME + "(" + stockCode + ")</p>";
                            content += "                    				<span class=\"num font-color08\">" + date + "</span>";
                            content += "                    			</div>";
                            content += "                    		</a>	       		                	";

                        }
                    }
                    content += "                    	</div>";
                    content += "                    </div>";
                    if (colTarget == 'total') {
                        content += "                        		<div class=\"btn-area mt0\">";
                        content += "                        			<a href=\"javascript:changeColTarget('vod');\" class=\"btn type04 icon-arrow\"><span>더보기</span></a>";
                        content += "                        		</div>";
                    } else {
                        content += "                <div class=\"section-area line-top\"><div class=\"txt-paging pb40\">";
                        content += printPaging(currentPage, rs.totalSize, 21);
                        content += "                </div></div>";
                    }
                    $('#vodContents').html(content);
                }
            }
        }

    }
    if (colSize == 0) {
        $('#noResult').show();
    }
}
function printPaging(currentPage, totalSize, rowsperPage) {
    var result = "";
    var labelForFirst = "", labelForPrev = "", labelForNext = "", labelForLast = "", labelForIndex = "";
    //Navigator
    var DISPLAYSIZE10 = 10;
    var totalPage = 0, totalRows = 0, currentPage2 = 0, numOfLinkIndex = 0, startIndex = 0;
    var destination = "#";
    var pageImg1 = "FIRST";
    var pageImg2 = "PREV";
    var pageImg3 = "NEXT";
    var pageImg4 = "LAST";
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

    labelForIndex = "<div>";
    labelForIndex += "<a href=\"javascript: void (0);\">" + currentPage2 + "</a>";
    labelForIndex += "<span>/</span>";
    labelForIndex += "<a href=\"javascript: void (0);\">" + totalPage + "</a>";
    labelForIndex += "</div>";

    result = labelForFirst + labelForPrev + labelForIndex + labelForNext + labelForLast;
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
        else if (val == newsVal) {
            filterField = new Array();
            if (filter[0] != 0) {
                if (filter[0] == 'Y') filterField.push("COMPCODE(MATCH|'WO')");
            }
            if (filter[2] != 0)
                filterField.push("SECTION_NAME(MATCH|'"+filter[2]+"')");
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
    if (colTarget == 'total') rowsperPage = [1000, 1, 2, 3, 3, 8, 8];
    else rowsperPage = [1000, 5, 10, 10, 10, 21, 21];

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

    obj.debugOption = debugOption(0);
    obj.useCache = true;
    obj.dictionary = dictionaryOption();
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
            if (prg_cd != '')
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
    location.href = "/Finance/DomesticStock/DomesticStockDetail?searchStr=" + String(arjCode);
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

        obj.debugOption = debugOption(0);
        obj.useCache = true;
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
function goTotalSearch() {
    $('#filterList').val('');
    $('#currentPage').val(1);
    $('#colTarget').val('total');
    $('#searchForm').submit();
}
function goSearch(searchTerm) {
    $('#searchTerm').val(searchTerm);
    $('#filterList').val('');
    $('#colTarget').val('total');
    $('#currentPage').val(1);
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
    //RecentNews: function () {
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Finance/DomesticStock/DomesticStockDetailRecentNews",
    //        data: $("#frmList_DSDNewAndNoticeTab").serialize(),
    //        success: function (data, textStatus) {
    //            $("#frmList_DSDNewAndNoticeTab > #divList").html(data);
    //        }
    //    });

    //    return false;
    //},
    //RecentNotice: function () {
    //    //alert("클릭");
    //    $.ajax({
    //        type: 'POST',
    //        url: "/Finance/DomesticStock/DomesticStockDetailRecentNotices",
    //        data: $("#frmList_DSDNewAndNoticeTab").serialize(),
    //        success: function (data, textStatus) {
    //            $("#frmList_DSDNewAndNoticeTab > #divList").html(data);
    //        }
    //    });

    //    return false;
    //},
    GetHpChart: function (trId, code, width, height) {
        $.ajax({
            type: 'POST',
            url: "/Finance/DomesticStock/GetChart",
            data: { trId: trId, code: code, width: width, height: height },
            success: function (data) {
                if (data != null && data.splitList.length > 3) {
                    $("#imgChart").attr("src", data.splitList[3]);
                    //var startDate = data.splitList[4];
                    //var endDate = data.splitList[5];

                    //if (startDate.substr(0, 4) >= '2000') {
                    //    startDate = startDate.substr(0, 4) + "-" + startDate.substr(4, 2) + "-" + startDate.substr(6, 2);
                    //    endDate = endDate.substr(0, 4) + "-" + endDate.substr(4, 2) + "-" + endDate.substr(6, 2);

                    //    $("#chartDate > p").children("span").text(startDate + " ~ " + endDate);
                    //}
                }
            }
        });
    }
}
var FinanceChartJs = {
    ThemaUpDownChartDisplay: function (chartAreaElement, chartData) {
        console.log(chartData.TotalCnt + "/" + chartData.RiseCnt + "/" + chartData.FallCnt);
        webponent.chart.init(chartAreaElement, options_themaUpDownChart, styles_themaUpDownChart, series_themaUpDownChart);
        $('.WEBPONENT-TRIAL-UI').css('background', '');
    },
    ExchangeTimeChartData: function (exchangeGubun, chartAreaElement) {
        var jsonObj = { Code: exchangeGubun }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/ExchangeTimeData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("exchange chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.insertDT.substr(11, 16) + '" , "price" : "' + item.Price + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(chartAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKospiChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "P", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKospiData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("kospi chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKosdaqChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "D", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKosdaqData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("kosdaq chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                    //console.log(item.Price);
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";

                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                //console.log(chartData);
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbFutChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "F", Class_2: "D" }
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeFutData",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("fut chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";

                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    CurrentDbKPI200ChartData: function (charAreaElement) {
        var jsonObj = { Class_1: "T", Class_2: "D" };
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/SiseTimeKPI200Data",
            data: JSON.stringify(jsonObj),
            //data: { code: codeVal },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                //console.log("kospi200 chart success");

                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";

                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(charAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    UsaTimeChartData: function (marketSort, priod, chartAreaElement) {
        var jsonObj = { Class_1: marketSort, Class_2: priod };
        //alert(jsonObj.Class_1 + "/" + jsonObj.Class_2);

        $.ajax({
            type: "post",
            url: "/Finance/WorldStock/UsaTimeChartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {
                    //var dt = item.DT.getHours() + ":" + item.DT.getMinutes(); 09:12

                    //var parsed = json.parse(data, function (key, value) {
                    //    if (typeof value === 'string') {
                    //        var d = /\/date\((\d*)\)\//.exec(value);
                    //        return (d) ? new date(+d[1]) : value;
                    //    }
                    //    return value;
                    //});
                    var pattern = /Date\(([^)]+)\)/;
                    var results = pattern.exec(item.DT);
                    var dt = new Date(parseFloat(results[1]));
                    //var resultHour = dt.getHours() > 9 ? dt.getHours() : "0" + dt.getHours();
                    //var resultMinutes = dt.getMinutes > 9 ? dt.getMinutes() : "0" + dt.getMinutes();

                    //var resultDt = resultHour + ":" + resultMinutes;

                    chartData += '{ "DT" : "' + dt.getHours() + ":" + dt.getMinutes() + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(chartAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    AsiaTimeChartData: function (marketSort, priod, chartAreaElement) {
        var jsonObj = { Class_1: marketSort, Class_2: priod };
        //alert(jsonObj.Class_1 + "/" + jsonObj.Class_2);

        $.ajax({
            type: "post",
            url: "/Finance/WorldStock/AsiaTimeChartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var chartData = "";

                chartData += "[";
                $(data).each(function (index, item) {

                    //console.log(item.Price);
                    //var dt = item.DT.getHours() + ":" + item.DT.getMinutes(); 09:12

                    //var parsed = json.parse(data, function (key, value) {
                    //    if (typeof value === 'string') {
                    //        var d = /\/date\((\d*)\)\//.exec(value);
                    //        return (d) ? new date(+d[1]) : value;
                    //    }
                    //    return value;
                    //});



                    //var pattern = /Date\(([^)]+)\)/;
                    //var results = pattern.exec(item.DT);
                    //var dt = new Date(parseFloat(results[1]));
                    ////var resultHour = dt.getHours() > 9 ? dt.getHours() : "0" + dt.getHours();
                    ////var resultMinutes = dt.getMinutes > 9 ? dt.getMinutes() : "0" + dt.getMinutes();

                    ////var resultDt = resultHour + ":" + resultMinutes;

                    //chartData += '{ "DT" : "' + dt.getHours() + ":" + dt.getMinutes() + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';


                    chartData += '{ "DT" : "' + item.DT.substr(11, 16) + '" , "price" : "' + CommonJs.ReplaceAll(item.Price, ",", "") + '"},';
                });

                if (chartData != "") {
                    chartData = chartData.substr(0, chartData.length - 1);
                }
                chartData += "]";
                //console.log(chartData);
                options_01.data.data = JSON.parse(chartData);
                //var chart_01 = char01_Display(JSON.parse(chartData));
                webponent.chart.init(chartAreaElement, options_01, styles_01, series_01);
                $('.WEBPONENT-TRIAL-UI').css('background', '');
            },
            error: function (e) {
                console.log("error ==> " + JSON.stringify(e));
            }
        });
    },
    IndustryPartSecurityChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartSecurityData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Security" : "' + item.Security + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";


                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_security);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }
            }
        });

    },
    IndustryPartForeignerChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartForeignerData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Foreigner" : "' + item.Foreigner + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";

                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_foreigner);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }

            }
        });

    },
    IndustryPartPersonalChart: function (chartAreaElement, marketVal, orderByVal, targetDtVal) {
        //console.log("Market: " + $("#market").val());
        var jsonObj = { Market: marketVal, OrderBy: orderByVal, TargetDT: targetDtVal };
        //console.log("market: " + jsonObj.Market + "/orderByVal: " + jsonObj.OrderBy + "/TargetDt: " + jsonObj.TargetDT);
        $.ajax({
            type: "post",
            url: "/Finance/DomesticStock/IndustryPartData",
            data: JSON.stringify(jsonObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("IndustryPartPersonalData Success");

                if (data.length > 0) {
                    var chartData = "";

                    chartData += "[";
                    $(data).each(function (index, item) {
                        chartData += '{ "PartName" : "' + item.PartName + '" , "Personal" : "' + item.Personal + '"},';
                    });

                    if (chartData != "") {
                        chartData = chartData.substr(0, chartData.length - 1);
                    }
                    chartData += "]";

                    options_04.data.data = JSON.parse(chartData);

                    var chart = webponent.chart.init(chartAreaElement, options_04, styles_04, series_personal);
                    $('.WEBPONENT-TRIAL-UI').css('background', '');
                }

            }
        });

    }
}

var options_01 = {
    "data": {},
    format: {
        yAxis: function (value) {
            return priceDataFormat(value);
        }
    }
    //'data': [{ Date: '08:59', price: '2370' }, { Date: '09:09', price: '2375' }, { Date: '09:19', price: '2373' }, { Date: '09:29', price: '2374' }, { Date: '09:39', price: '2374' }, { Date: '09:49', price: '2376' }, { Date: '09:59', price: '2377' }, { Date: '10:09', price: '2380' }, { Date: '10:19', price: '2378' }, { Date: '10:29', price: '2373' }, { Date: '10:39', price: '2373' }, { Date: '10:49', price: '2371' }, { Date: '10:59', price: '2371' }, { Date: '11:09', price: '2371' }, { Date: '11:19', price: '2371' }, { Date: '11:29', price: '2371' }, { Date: '11:39', price: '2372' }, { Date: '11:49', price: '2372' }, { Date: '11:59', price: '2374' }, { Date: '12:09', price: '2372' }, { Date: '12:19', price: '2371' }, { Date: '12:29', price: '2370' }, { Date: '12:39', price: '2371' }, { Date: '12:49', price: '2373' }, { Date: '12:59', price: '2372' }, { Date: '13:09', price: '2372' }, { Date: '13:19', price: '2374' }, { Date: '13:29', price: '2373' }, { Date: '13:39', price: '2374' }, { Date: '13:49', price: '2374' }, { Date: '13:59', price: '2374' }, { Date: '14:09', price: '2375' }, { Date: '14:19', price: '2377' }, { Date: '14:29', price: '2377' }, { Date: '14:39', price: '2376' }, { Date: '14:49', price: '2376' }, { Date: '14:59', price: '2377' }, { Date: '15:09', price: '2376' }, { Date: '15:19', price: '2377' }, { Date: '15:29', price: '2377' },]
};


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
function FavoriteStockLogin() {
    alert("로그인 하세요.");
}