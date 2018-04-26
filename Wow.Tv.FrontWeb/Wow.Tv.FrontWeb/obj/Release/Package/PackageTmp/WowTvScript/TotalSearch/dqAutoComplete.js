
var dq_searchForm = document.searchForm;
var dq_searchFormTextbox = document.getElementById("searchTerm").value;
var dq_searchTextbox = document.getElementById("searchTerm");
//var SEARCH_API_URL = "http://183.111.178.90:5001/collections/search";
var SEARCH_API_URL = "http://search.wowtv.co.kr/collections/search";

var dq_resultDivID = "dqAuto";               //자동완성레이어 ID
var dq_hStartTag = "<span class=\"relation\">";                    //하이라이팅 시작 테그
var dq_hEndTag = "</span>";                     //하이라이팅 끝 테그
var dq_bgColor = "#f2f2f2";                  //선택빽그라운드색
var dq_intervalTime = 500;                   //자동완성 입력대기 시간

//고정값
var dq_acResult = new Object();              //결과값
var dq_acLine = 0;                           //자동완성 키워드 선택  위치(순번)	
var dq_searchResultList = new Array();                //자동완성결과리스트	
var dq_searchKeyword = "";	                 //검색어(한영변환안된)
var dq_ajaxReqObj = "";                      //ajax request object

var dq_keyStatus = 1;                        //키상태구분값
var dq_acuse = 1;                            //자동완성사용여부
var dq_engFlag = 0;                          //자동완성한영변환체크
var dq_acDisplayFlag = 0;                    //자동완성 display 여부
var dq_acArrowFlag = 0;                      //마우스이벤트용 flag	
var dq_acArrowOpenFlag = 0;                  //마우스이벤트용 flag
var dq_acFormFlag = 0;                       //마우스이벤트용 flag
var dq_acListFlag = 0;                       //자동완성 레이어 펼쳐진 상태 여부
var dq_browserType = dqc_getBrowserType();	 //브라우져타입
var dq_keywordBak = "";                      //키워드빽업
var dq_keywordOld = "";                      //키워드빽업

dq_keywordBak = dq_keywordOld = dq_searchTextbox.value;

//엔터체크
function dq_handleEnter(event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

    if (keyCode == 13) {
        //검색스크립트
        goTotalSearch();	
        //return false;
    }
    else {
        return true;
    }
}

//마우스클릭시검색
function dq_keywordSearch(keyword) {
    dq_searchTextbox.value = keyword;
    dq_searchForm.submit();
}

//입력값 체크 - setTextbox
function dq_setTextbox(flag, ev) {
    var _event;
    var key;

    dq_stateChange();

    switch (dq_browserType) {
        case 1: // IE
            _event = window.event;
            key = _event.keyCode;
            break;
        case 2: // Netscape
            key = ev.which;
            break;
        default:
            key = _event.keyCode;
            break;
    }

    if (dq_keyStatus == 1 && flag && key != 13)
        dq_keyStatus = 2;
}

//자동완성레이어 상태변경 - wd
function dq_stateChange() {

    dq_searchTextbox.onclick = dq_acDisplayView;
    dq_searchTextbox.onblur = dq_acDisplayCheck;
    document.body.onclick = dq_acDisplayCheck;
}

//자동완성레이어 보여 주기 - req_ipc
function dq_acDisplayView() {
    dq_acDisplayFlag = 1;
    dq_acFormFlag = 0;
    dq_reqAcResultShow();
}

//자동완성레이어 감추기전  체크 - dis_p
function dq_acDisplayCheck() {
    if (dq_acDisplayFlag) {
        dq_acDisplayFlag = 0;
        return false;
    }

    if (dq_acArrowFlag)
        return ;


    if (dq_acFormFlag)
        return ;

    dq_acDisplayHide();
}

//자동완성레이어 감추기 - ac_hide
function dq_acDisplayHide() {
    var resultDiv = document.getElementById(dq_resultDivID);

    if (resultDiv.style.display == "none")
        return false;

    dq_setDisplayStyle(0);
    dq_acListFlag = 0;
    dq_acLine = 0;
}

//자동완성레이어 display style 설정 - popup_ac
function dq_setDisplayStyle(type) {
    var resultDiv = document.getElementById(dq_resultDivID);

    if (type == 0) {
        resultDiv.style.display = "none";
        //dq_switchImage(0);
    }
    else if (type == 1) {
        resultDiv.style.display = "block";
        //dq_switchImage(1);
    }
    else if (type == 2) {
        resultDiv.style.display = "none";
        //dq_switchImage(1);
    }
}

//자동완성 결과 보기 요청 - req_ac2
function dq_reqAcResultShow() {
    var resultDiv = document.getElementById(dq_resultDivID);
    if (dq_acuse == 0) {
        dq_printAcResult();
    }
    if (dq_searchTextbox.value == "" || dq_acuse == 0) 
        return false;
        

    if (dq_acListFlag && dq_acDisplayFlag) {
        dq_acDisplayHide();
        return false;
    }

    var o = dq_getAcResult();

    if (o && o[1][0] != "")
        dq_acResultShow(o[0], o[1]);
    else
        dq_reqSearch();
}

//자동완성 결과 object 리턴 - get_cc
function dq_getAcResult() {
    var ke = dqc_trimSpace(dq_searchTextbox.value);
    return typeof (dq_acResult[ke]) == "undefined" ? null : dq_acResult[ke];
}

//자동완성 결과 object 생성 - set_cc
function dq_setAcResult(aq, al) {
    dq_acResult[aq] = new Array(aq, al);
}

//자동완성 결과 보기 - ac_show
function dq_acResultShow(aq, al) {
    if (aq != dqc_trimSpace(dq_searchTextbox.value))
        dq_engFlag = 1;
    else
        if (aq && aq != "" && aq != dqc_trimSpace(dq_searchTextbox.value))
            return false;

    dq_searchKeyword = aq;
    dq_searchResultList = al;
    dq_printAcResult();

    if (dq_searchResultList.length)
        dq_acListFlag = 1;
    else
        dq_acListFlag = 0;

    if (dq_acListFlag) {
        dq_setAcPos(0);

        if (dq_browserType == 1)
            dq_searchTextbox.onkeydown = dq_acKeywordTextViewIE;
        else if (dq_browserType == 2)
            dq_searchTextbox.onkeydown = dq_acKeywordTextViewFF;
    }
}

//자동완성결과 라인 위치 지정 - set_acpos
function dq_setAcPos(v) {
    dq_acLine = v;
    setTimeout('dq_setAcLineBgColor();', 10);
}

//자동완성레이어에 결과 출력 - print_ac
function dq_printAcResult() {
    var resultDiv = document.getElementById(dq_resultDivID);
    if (dq_searchResultList[0] == "")
        resultDiv.innerHTML = dq_getAcNoResultList();
    else
        resultDiv.innerHTML = dq_getAcResultList();

    dq_setDisplayStyle(1); //자동완성창 보여줌.

    setTimeout('dq_setAcLineBgColor();', 10);
}

//자동완성 키워드 라인의 백그라운드색 설정 - set_ahl
function dq_setAcLineBgColor() {
    var o1, o2, qs_ac_len;

    if (!dq_acListFlag)
        return false;

    qs_ac_len = dq_searchResultList.length;
    for (var i = 0; i < qs_ac_len; i++) {
        o1 = document.getElementById('dq_ac' + (i + 1));

        if (o1 != null) {
            if ((i + 1) == dq_acLine)
                o1.style.backgroundColor = dq_bgColor;
            else
                o1.style.backgroundColor = '';
        }
    }
}

//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE) - ackhl
function dq_acKeywordTextViewIE() {
    var e = window.event;
    var ac, acq;
    var resultDiv = document.getElementById(dq_resultDivID);
    var qs_ac_len = dq_searchResultList.length;

    if (e.keyCode == 39)
        dq_reqAcResultShow();

    if (e.keyCode == 40 || (e.keyCode == 9 && !e.shiftKey)) {
        if (!dq_acListFlag) {
            dq_reqAcResultShow();
            return false;
        }

        if (dq_acLine < qs_ac_len) {
            if (dq_acLine == 0)
                dq_keywordBak = dq_searchTextbox.value;

            dq_acLine++;

            ac = eval('dq_ac' + dq_acLine);
            acq = eval('dq_acq' + dq_acLine);
            dq_keywordOld = dq_searchTextbox.value = acq.outerText;
            dq_searchTextbox.focus();
            dq_setAcLineBgColor();
            e.returnValue = false;
        }
    }

    if (dq_acListFlag && (e.keyCode == 38 || (e.keyCode == 9 && e.shiftKey))) {
        if (!dq_acListFlag)
            return ;

        if (dq_acLine <= 1) {
            dq_acDisplayHide();
            dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
        }
        else {
            dq_acLine--;

            ac = eval('dq_ac' + dq_acLine);
            acq = eval('dq_acq' + dq_acLine);
            dq_keywordOld = dq_searchTextbox.value = acq.outerText;
            dq_searchTextbox.focus();
            dq_setAcLineBgColor();
            e.returnValue = false;
        }
    }
}

//자동완성레이어의 선택된 키워드를 textbox에 넣어줌(IE외 브라우져) - ackhl_ff
function dq_acKeywordTextViewFF(fireFoxEvent) {
    var ac, acq;
    var resultDiv = document.getElementById(resultDiv);
    var qs_ac_len = dq_searchResultList.length;

    if (fireFoxEvent.keyCode == 39)
        dq_reqAcResultShow();

    if (fireFoxEvent.keyCode == 40 || fireFoxEvent.keyCode == 9) {
        if (!dq_acListFlag) {
            dq_reqAcResultShow();
            return false;
        }

        if (dq_acLine < qs_ac_len) {
            if (dq_acLine == 0)
                dq_keywordBak = dq_searchTextbox.value;

            dq_acLine++;

            ac = document.getElementById('dq_ac' + dq_acLine);
            acq = document.getElementById('dq_acq' + dq_acLine);

            dq_keywordOld = dq_searchTextbox.value = acq.value;

            dq_searchTextbox.focus();
            dq_setAcLineBgColor();
            fireFoxEvent.preventDefault();
        }
    }

    if (dq_acListFlag && (fireFoxEvent.keyCode == 38 || fireFoxEvent.keyCode == 9)) {
        if (!dq_acListFlag)
            return false;

        if (dq_acLine <= 1) {
            dq_acDisplayHide();
            dq_keywordOld = dq_searchTextbox.value = dq_keywordBak;
        }
        else {
            dq_acLine--;

            ac = document.getElementById('dq_ac' + dq_acLine);
            acq = document.getElementById('dq_acq' + dq_acLine);

            dq_keywordOld = dq_searchTextbox.value = acq.value;
            dq_searchTextbox.focus();
            dq_setAcLineBgColor();
            fireFoxEvent.preventDefault();
        }
    }
}

//검색요청 - reqAc
function dq_reqSearch() {
    var ke = $('#searchTerm').val();

    while (ke.indexOf("\\") != -1)
        ke = ke.replace("\\", "");

    while (ke.indexOf("\'") != -1)
        ke = ke.replace("\'", "");
    if (ke == "") {
        dq_acDisplayHide();
        return false;
    }
    var obj = new Object();
    obj.querySet = setAutoCompleteQuery(ke);
    var jsonData = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        async: false,
        url: SEARCH_API_URL,
        data: jsonData,
        success: function (data) {
            if (dq_acuse == 1) {
                var rs = data.resultSet.result[0];
                dq_searchResultList = new Array();
                if (rs.realSize > 0) {
                    for (var val = 0; val < rs.realSize; val++) {
                        var result = rs.resultDocuments[val];
                        dq_searchResultList[val] = result.KEYWORD;
                    }
                }
                else
                    dq_searchResultList[0] = "";
                
                dq_setAcResult(ke, dq_searchResultList);
                dq_acResultShow(ke, dq_searchResultList);
            } else {
                dq_setAcResult(ke, dq_searchResultList);
                dq_acResultShow(ke, dq_searchResultList);
            }
        },
        error: function (e) {
            console.log(JSON.stringify(e));
        }
    });
}
function setAutoCompleteQuery(searchTerm) {
    var querySet = new Object();
    var query = new Array();
    var obj = new Object();
    var whereSet = new Object();
    var whereField = new Array();
    whereField = ["BRACE_OPEN", "KEYWORD(HASALL|'" + searchTerm + "'|100)", "OR", "FKEY(HASALL|'" + searchTerm + "'|1)", "BRACE_CLOSE"];
    whereSet.fields = whereField;
    obj.whereSet = whereSet;


    var selectSet = new Object();
    var selectField = new Array();
    selectField = ["KEYWORD(NONE)"];
    selectSet.fields = selectField;
    obj.selectSet = selectSet;

    var orderBySet = new Object();
    var orderField = new Array();
    orderField = ["COUNT(ASC|PREWEIGHT)"];
    orderBySet.fields = orderField;
    obj.orderBySet = orderBySet;

    var fromSet = new Object();
    var resultSize = new Array();
    fromSet.collection = "SMARTMAKER";

    resultSize = [0, 9];
    fromSet.result = resultSize;
    obj.fromSet = fromSet;
    obj.useCache = true;

    query[0] = obj;
    querySet.version = 42;
    querySet.query = query;
    return querySet;
}
//선택키워드저장 - set_acinput
function dq_setAcInput(keyword) {
    if (!dq_acListFlag)
        return false;

    dq_keywordOld = dq_searchTextbox.value = keyword;
    dq_searchTextbox.focus();
    dq_acDisplayHide();
}

//기능끄기 버튼을 눌렀을때 - ac_off
function dq_acOff() {
    if (dq_searchTextbox.value == "")
        dq_setDisplayStyle(0);
    else
        dq_acDisplayHide();

    dq_acuse = 0;
    if (dq_searchTextbox.value != "") {
        dq_setDisplayStyle(1);
        dq_acDisplayView();
        dq_searchTextbox.focus();
        dq_wi();
    } else {
        dq_setDisplayStyle(3);
    }
    return false;
}
function dq_acon() {
    dq_acuse = 1;

    if (dq_searchTextbox.value != "") {
        dq_setDisplayStyle(1);
        dq_acDisplayView();
        dq_searchTextbox.focus();
        dq_wi();
    } else {
        dq_setDisplayStyle(3);
    }
    return false;
}
//화살표클릭 - show_ac
function dq_acArrow() {
    var resultDiv = document.getElementById(dq_resultDivID);

    if (dq_acuse == 0) {
        dq_keywordOld = "";
        dq_acuse = 1;

        if (dq_searchTextbox.value == "")
            resultDiv.innerHTML = dq_getAcOnNoKeyword();
    }
    else {
        if (dq_searchTextbox.value == "")
            resultDiv.innerHTML = dq_getAcNoKeyword();
    }

    if (dq_searchTextbox.value == "" && (resultDiv.style.display == "block"))
        dq_setDisplayStyle(0);
    else
        dq_setDisplayStyle(1);

    dq_acDisplayView();
    dq_searchTextbox.focus();
    dq_wi();

    document.body.onclick = null;
    return false;
}


//자동완성 레이어 mouse on
function dq_setMouseon() {
    dq_acFormFlag = 1;
}

//자동완성 레이어 mouse out
function dq_setMouseoff() {
    dq_acFormFlag = 0;
    dq_searchTextbox.focus();
}

//자동완성 결과 코드 - get_aclist
function dq_getAcResultList() {
    var keywordOrign = "";
    var keyword = "";
    var keywordLength = 0;
    var lenValue = 40;
    var text = "";
    var pos = 0;
    if (dq_acuse == 1) {
        if (dq_searchResultList != null && dq_searchResultList.length > 0) {
            text += "<div class=\"list-search-keyword\"><ul>";
            for (var i = 0; i < dq_searchResultList.length; i++) {
                keyword = keywordOrign = dq_searchResultList[i];
                keywordLength = dqc_strlen(keywordOrign);

                if (keywordLength > lenValue)
                    keyword = dqc_substring(keywordOrign, 0, lenValue) + "..";

                if (dq_engFlag == 0)
                    pos = keywordOrign.toLowerCase().indexOf(dq_searchTextbox.value.toLowerCase());
                else if (dq_engFlag == 1)
                    pos = keywordOrign.toLowerCase().indexOf(dq_searchKeyword.toLowerCase());

                if (pos >= 0) {
                    if (pos == 0) {
                        if (dq_engFlag == 0)
                            keyword = dqc_highlight(keyword, dq_searchTextbox.value, 0, dq_hStartTag, dq_hEndTag);
                        else if (dq_engFlag == 1)
                            keyword = dqc_highlight(keyword, dq_searchKeyword, 0, dq_hStartTag, dq_hEndTag);
                    }
                    else if (pos == keywordOrign.length - 1) {
                        if (dq_engFlag == 0)
                            keyword = dqc_highlight(keyword, dq_searchTextbox.value, -1, dq_hStartTag, dq_hEndTag);
                        else if (dq_engFlag == 1)
                            keyword = dqc_highlight(keyword, dq_searchKeyword, -1, dq_hStartTag, dq_hEndTag);
                    }
                    else {
                        if (dq_engFlag == 0)
                            keyword = dqc_highlight(keyword, dq_searchTextbox.value, pos, dq_hStartTag, dq_hEndTag);
                        else if (dq_engFlag == 1)
                            keyword = dqc_highlight(keyword, dq_searchKeyword, pos, dq_hStartTag, dq_hEndTag);
                    }
                }
                text += "<li id='dq_ac" + (i + 1) + "' onmouseover=\"dq_setAcPos('" + (i + 1) + "');\" onFocus=\"dq_setAcPos('" + (i + 1) + "');\" onmouseout=\"dq_setAcPos(0);\"  onBlur=\"dq_setAcPos(0);\" onclick=\"dq_setAcInput('" + keywordOrign + "');\" onkeypress=\"dq_setAcInput('" + keywordOrign + "');\" style=\"this.style.backgroundColor=''\" >";
                text += "<input type=\"hidden\" id=\"dq_acq" + (i + 1) + "\" value=\"" + keywordOrign + "\"/>";
                text += "<a href=\"javascript:goSearch('" + keywordOrign + "');\">" + keyword + "</a></li>";
            }
            text += "</ul></div>";
        }
    }
    text += "<div class=\"list-search-keyword\"><strong class=\"tit\">인기검색어</strong><ul>";

    for (var i = 0; i < autoTrendArray.length; i++) {
        text += "<li><a href=\"javascript:goSearch('" + autoTrendArray[i] + "');\"><span class=\"popular\">" + autoTrendArray[i] + "</span><span class=\"number\">" + autoTrendCntArray[i] + "회</span></a></li>";
    }
    text += "</div>";
    text += "<div class=\"auto-complete-area\"><span class=\"tit\">자동완성기능</span><div class=\"box-switch-button\">";
    if (dq_acuse==1)
        text += "<span class=\"btn-switch on\"><button>on</button></span><span class=\"btn-switch\"><button onclick=\"dq_acOff()\">off</button></span>";
    else
        text += "<span class=\"btn-switch\"><button onclick=\"dq_acon()\">on</button></span><span class=\"btn-switch on\"><button>off</button></span>";
    text += "</div></div>";
    return text;
}

//자동완성 결과 없는 경우 - get_ac0
function dq_getAcNoResultList() {
    var text = "";
    var ment = "해당 단어로 시작하는 검색어가 없습니다.";

    if (dq_acuse == 1) {
        text += "<div class=\"list-search-keyword\"><ul>";
        text += "	<li></li>";
        text += "	<li><a href=\"#\">";
        text += ment;
        text += "	</a></li>";
        text += "	<li></li>";
        text += "</ul>";
        text += "</div>";
    }
    text += "<div class=\"list-search-keyword\"><strong class=\"tit\">인기검색어</strong><ul>";

    for (var i = 0; i < autoTrendArray.length; i++) {
        text += "<li><a href=\"javascript:goSearch('" + autoTrendArray[i] + "');\"><span class=\"popular\">" + autoTrendArray[i] + "</span><span class=\"number\">" + autoTrendCntArray[i] + "회</span></a></li>";
    }
    text += "</div>";
    text += "<div class=\"auto-complete-area\"><span class=\"tit\">자동완성기능</span><div class=\"box-switch-button\">";
    if (dq_acuse == 1)
        text += "<span class=\"btn-switch on\"><button>on</button></span><span class=\"btn-switch\"><button onclick=\"dq_acOff()\">off</button></span>";
    else
        text += "<span class=\"btn-switch\"><button onclick=\"dq_acon()\">on</button></span><span class=\"btn-switch on\"><button>off</button></span>";
    text += "</div></div>";
    return text;
}

//자동완성 키워드 없는 경우
function dq_getAcNoKeyword() {
    var text = "";    
    text += "<div class=\"list-search-keyword\"><strong class=\"tit\">인기검색어</strong><ul>";

    for (var i = 0; i < autoTrendArray.length; i++) {
        text += "<li><a href=\"javascript:goSearch('" + autoTrendArray[i] + "');\"><span class=\"popular\">" + autoTrendArray[i] + "</span><span class=\"number\">" + autoTrendCntArray[i] + "회</span></a></li>";
    }
    text += "</div>";
    text += "<div class=\"auto-complete-area\"><span class=\"tit\">자동완성기능</span><div class=\"box-switch-button\">";
    if (dq_acuse == 1)
        text += "<span class=\"btn-switch on\"><button>on</button></span><span class=\"btn-switch\"><button onclick=\"dq_acOff()\">off</button></span>";
    else
        text += "<span class=\"btn-switch\"><button onclick=\"dq_acon()\">on</button></span><span class=\"btn-switch on\"><button>off</button></span>";
    text += "</div></div>";
    return text;
}

//자동완성 복구시 키워드 없는 경우
function dq_getAcOnNoKeyword() {
    var text = "";
    var ment = "자동완성기능이 활성화 되었습니다.";

    if (dq_acuse == 1) {
        text += "<div class=\"list-search-keyword\"><ul>";
        text += "	<li></li>";
        text += "	<li><a href=\"#\">";
        text += ment;
        text += "	</a></li>";
        text += "	<li></li>";
        text += "</ul>";
        text += "</div>";
    }
    text += "<div class=\"list-search-keyword\"><strong class=\"tit\">인기검색어</strong><ul>";

    for (var i = 0; i < autoTrendArray.length; i++) {
        text += "<li><a href=\"javascript:goSearch('" + autoTrendArray[i] + "');\"><span class=\"popular\">" + autoTrendArray[i] + "</span><span class=\"number\">" + autoTrendCntArray[i] + "회</span></a></li>";
    }
    text += "</div>";
    text += "<div class=\"auto-complete-area\"><span class=\"tit\">자동완성기능</span><div class=\"box-switch-button\">";
    if (dq_acuse == 1)
        text += "<span class=\"btn-switch on\"><button>on</button></span><span class=\"btn-switch\"><button onclick=\"dq_acOff()\">off</button></span>";
    else
        text += "<span class=\"btn-switch\"><button onclick=\"dq_acon()\">on</button></span><span class=\"btn-switch on\"><button>off</button></span>";
    text += "</div></div>";
    return text;
}

//브라우져 종류 체크 IE/ETC
function dqc_getBrowserType() {
    //		println.log("dqc_getBrowserType");
    if (navigator.appName == "Microsoft Internet Explorer")
        return 1;
    else
        return 2;
}

//create XMLHTTP 
function dqc_getXMLHTTP(xmlRequest) {
    // 		println.log("dqc_getXMLHTTP");
    if (xmlRequest && xmlRequest.readyState != 0)
        xmlRequest.abort();

    try {
        xmlRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            xmlRequest = false;
        }
    }

    if (!xmlRequest && typeof XMLHttpRequest != "undefined")
        xmlRequest = new XMLHttpRequest();

    return xmlRequest;
}

//trim, 공백제거
function dqc_trimSpace(ke) {
    // 		println.log("dqc_trimSpace(ke:"+ke+")");
    //ke = ke.replace(" ", "");
    return ke;
}

//문장 하이라이팅
function dqc_highlight(s, d, is_suf, sTag, eTag) {
    // 		println.log("dqc_highlight");
    var ret = "";

    if (is_suf == 0)
        ret = dqc_makehigh_pre(s, d, sTag, eTag);
    else if (is_suf == -1)
        ret = dqc_makehigh_suf(s, d, sTag, eTag);
    else
        ret = dqc_makehigh_mid(s, d, is_suf, sTag, eTag);

    if (ret == "")
        return s;
    else
        return ret;
}

//앞부분 단어 하이라이팅
function dqc_makehigh_pre(s, t, sTag, eTag) {
    // 		println.log("dqc_makehigh_pre");
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");

    t1 = t1.toLowerCase();
    s1 = s1.toLowerCase();

    if (t1 == s1.substring(0, t1.length)) {
        d = sTag;

        for (var i = 0, j = 0; j < t1.length; i++) {
            if (s.substring(i, i + 1) != " ")
                j++;
            d += s.substring(i, i + 1);
        }

        d += eTag + s.substring(i, s.length)
    }
    return d;
}

//뒷부분 단어 하이라이팅
function dqc_makehigh_suf(s, t, sTag, eTag) {
    //		println.log("dqc_makehigh_suf");
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");

    t1 = t1.toLowerCase();
    s1 = s1.toLowerCase();

    if (t1 == s1.substring(s1.length - t1.length)) {
        for (var i = 0, j = 0; j < s1.length - t1.length; i++) {
            if (s.substring(i, i + 1) != " ")
                j++;
            d += s.substring(i, i + 1);
        }

        d += sTag;

        for (var k = i, l = 0; l < t1.length; k++) {
            if (s.substring(k, k + 1) != " ")
                l++;
            d += s.substring(k, k + 1);
        }

        d += eTag;
    }

    return d;
}

//중간부분 단어 하이라이팅
function dqc_makehigh_mid(s, t, pos, sTag, eTag) {
    //		println.log("dqc_makehigh_mid");
    var d = "";
    var s1 = s.replace(/ /g, "");
    var t1 = t.replace(/ /g, "");

    t1 = t1.toLowerCase();
    s1 = s1.toLowerCase();

    d = s.substring(0, pos);
    d += sTag;

    for (var i = pos, j = 0; j < t1.length; i++) {
        if (s.substring(i, i + 1) != " ")
            j++;
        d += s.substring(i, i + 1);
    }

    d += eTag + s.substring(i, s.length);

    return d;
}

//string length
function dqc_strlen(s) {
    //		println.log("dqc_strlen");
    var i, l = 0;

    for (i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) > 127)
            l += 2;
        else
            l++;
    }

    return l;
}

//string substring
function dqc_substring(s, start, len) {
    // 		println.log("dqc_substring");
    var i, l = 0; d = "";

    for (i = start; i < s.length && l < len; i++) {
        if (s.charCodeAt(i) > 127)
            l += 2;
        else
            l++;

        d += s.substr(i, 1);
    }

    return d;
}
//검색박스 키워드 처리 루프 - wi()
function dq_wi() {
    if (dq_acuse == 0)
        return false;

    var keyword = $('#searchTerm').val();

    if (keyword == "" && keyword != dq_keywordOld) {
        dq_acDisplayHide();
    }

    if (keyword != "" && keyword != dq_keywordOld && dq_keyStatus != 1) {
        var o = null;

        o = dq_getAcResult();

        if (o && o[1][0] != "")
            dq_acResultShow(o[0], o[1]);
        else
            dq_reqSearch();
    }

    dq_keywordOld = keyword;
    setTimeout("dq_wi()", dq_intervalTime);
}

setTimeout("dq_wi()", dq_intervalTime);

var autoTrend = new Object();
autoTrend.querySet = setTrendQuery();
var autoTrendData = JSON.stringify(autoTrend);
var autoTrendArray = new Array();
var autoTrendCntArray = new Array();
$.ajax({
    type: "POST",
    contentType: "application/json; charset=UTF-8",
    dataType: "json",
    async: false,
    url: SEARCH_API_URL,
    data: autoTrendData,
    success: function (data) {
        var rs = data.resultSet.result[0];
        if (rs.totalSize > 0) {
            for (var i = 0; i < rs.realSize; i++) {
                if (i >= 5) break;
                var result = rs.resultDocuments[i];
                autoTrendArray[i] = result.KEYWORD;
                autoTrendCntArray[i] = result.COUNT;
            }
        }
    },
    error: function (e) {
        console.log(JSON.stringify(e));
    }
});