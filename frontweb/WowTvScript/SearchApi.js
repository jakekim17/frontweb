var testKeyWordData = {
    "version": 42,						//검색엔진 버전
    "responseTime": "5 ms",					//검색시간
    "returnCode": 1,						//리턴코드
    "status": 200,						//리턴 status
    "resultSet": {						//검색결과 셋
        "resultSize": 1,					//결과셋 사이즈
        "errorCode": 0,					//에러코드
        "result": [{					//검색결과 셋 리스트
            "errorCode": 0,				//검색결과 에러코드
            "groupResult": [{			//검색결과 그룹결과
                "type": 65,			//옵션 타입
                "groupResultSize": 31,		//그룹결과 사이즈
                "ids": [				//그룹결과 ID(데이터) 리스트
                    "방송", "공개", "사진", "시장"
                ],
                "values": [			//그룹결과 SIZE 리스트
                    27195, 21891, 19913, 18570, 18393, 15548, 14686, 14419, 12512,
                    11632, 11569, 11530, 10706, 9713, 9547, 9221, 9123, 9089, 9072, 8972,
                    8636, 8581, 8529, 8253, 8228, 8013, 7759, 7730, 7618, 7529, 7440
                ]
            }],
            "resultFieldSize": 1,			//SELECT 필드 사이즈
            "recommend": null,			//추천어 결과
            "redirect": null,			//바로가기 결과
            "brokerPagingInfo": null,		//브로커페이징 정보
            "data": null,				//부가정보
            "cfRecommendResultSet": null,		//추천결과 정보
            "totalSize": 1358,			//총 검색결과 갯수
            "realSize": 30,				//한페이지 보여줄 검색결과 갯수
            "resultDocuments": [			//검색결과 리스트
                { "ARTID": "A201706230101" },	//SELECTSET 에 설정한 필드명과 그 결과값
                { "ARTID": "A201706220238" },
                { "ARTID": "A201706210007" },
                { "ARTID": "A201704270173" }
            ]
        }]
    },
    "error": null						//에러정보
};


var testNewsData = {
    "version": 42,						//검색엔진 버전
    "responseTime": "6 ms",					//검색시간
    "returnCode": 1,						//리턴코드
    "status": 200,						//리턴 status
    "resultSet": {						//검색결과 셋
        "resultSize": 1,					//결과셋 사이즈
        "errorCode": 0,					//에러코드
        "result": [{					//검색결과 셋 리스트
            "errorCode": 0,				//검색결과 에러코드
            "groupResult": [],			//검색결과 그룹결과
            "resultFieldSize": 15,			//SELECT 필드 사이즈
            "recommend": null,			//추천어 결과
            "redirect": null,			//바로가기 결과
            "brokerPagingInfo": null,		//브로커페이징 정보
            "data": null,				//부가정보
            "cfRecommendResultSet": null,		//추천결과 정보
            "totalSize": 1307,			//총 검색결과 갯수
            "realSize": 4,				//한페이지 보여줄 검색결과 갯수
            "resultDocuments": [			//검색결과 리스트
                { "ARTID": "A201706230101", "COMPCODE": "WO", "COMP_NAME": "한국경제TV", "TITLE": "미리보는 IPO ...."},
				{"ARTID": "A201706220238", "COMPCODE": "WO", "COMP_NAME": "한국경제TV", "TITLE": "연고점 새로 쓴 ...."}
			]
        }]
    },
    "error": null						//에러정보
}


//var SEARCH_API_URL = "http://183.111.178.90:5001/collections/search";
//var SEARCH_API_URL = SITE_DOMAIN.FRONT + ":5001/collections/search";
var SEARCH_API_URL = "http://search.wowtv.co.kr/collections/search";

function dateToYYYYMMDD(date) {
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
}


var nowDate = new Date();
var prevDate = new Date();
prevDate.setDate(nowDate.getDate() - 14);
var nowDateString = dateToYYYYMMDD(nowDate) + "235959";
var prevDateString = dateToYYYYMMDD(prevDate) + "000000";


var SearchApi = {
    GetRecommendationKeyWord: function (count, callBack) {
        var queryString = "";
        
        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,						";
        queryString += "            \"query\":[{						";
        queryString += "                \"whereSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"SEARCHALL(HASALL|'all'|0)\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"orderBySet\": {	";
        queryString += "                    \"fields\": [";
        queryString += "                       \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"groupBySet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                       \"KEYWORDS(COUNT;ORDER_COUNT|'DESC 0 30')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [0, 29]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {					";
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                var keyWrodList = data.resultSet.result[0].groupResult[0].ids;
                var tempKeyWord = keyWrodList;
                if (keyWrodList.length > 0 && keyWrodList.length > count) {
                    keyWrodList = new Array();
                    for (i = 0; i < count; i++) {
                        var num = Math.floor(Math.random() * (tempKeyWord.length - 1));
                        //alert(tempKeyWord.length + ":" + num + ":" + tempKeyWord[num]);
                        keyWrodList.push(tempKeyWord[num]);
                        tempKeyWord.splice(num, 1);
                        //alert(tempKeyWord.length);
                    }
                }
                callBack(keyWrodList);
                //callBack(testKeyWordData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetSomeNews: function (startIndex, endIndex, searchTerm, callBack) {
        var tempString = "";

        if (searchTerm != null && searchTerm != "") {
            var searchTermList = searchTerm.split(",");

            var queryString = "";
            queryString += "{";
            queryString += "    \"querySet\":{";
            queryString += "        \"version\":42,";
            queryString += "            \"query\":[{		";
            queryString += "                \"whereSet\": {					";
            queryString += "                   \"fields\": [";
            queryString += "                        \"BRACE_OPEN\",";

            //queryString += "                        \"KEYWORDS(HASALL|'" + searchTerm + "'|200)\",		";

            queryString += "                        \"KEYWORDS(HASALL|";
            tempString = "";
            $.each(searchTermList, function (index, item) {
                tempString += "'" + item + "';";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;
            queryString += "|";
            tempString = "";
            $.each(searchTermList, function (index, item) {
                tempString += "200;";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;
            queryString += ")\",		";


            queryString += "                        \"OR\",";

            //queryString += "                        \"TAG(HASALL|'" + searchTerm + "'|200)\",			";

            queryString += "                        \"TAG(HASALL|";
            tempString = "";
            $.each(searchTermList, function (index, item) {
                tempString += "'" + item + "';";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;
            queryString += "|";
            tempString = "";
            $.each(searchTermList, function (index, item) {
                tempString += "200;";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;
            queryString += ")\",			";

            queryString += "                       \"BRACE_CLOSE\"";
            queryString += "                   ]";
            queryString += "                }, ";
            queryString += "               \"selectSet\": {					";
            queryString += "                    \"fields\": [";
            queryString += "                        \"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
            queryString += "                        \"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
            queryString += "                        \"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\",";
            queryString += "                        \"THUMBNAIL_FILENM(NONE)\", \"VOD_NUM(NONE)\", \"IMGDIR(NONE)\", \"GUBUN_NAME(NONE)\"";
            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"orderBySet\": {					";
            queryString += "                    \"fields\": [";
            queryString += "                        \"ARTDATE(ASC|PREWEIGHT)\"";
            queryString += "                    ]";
            queryString += "               },";
            queryString += "               \"filterSet\": {					";
            queryString += "                   \"fields\": [				";
            queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
            queryString += "                   ]";
            queryString += "               },";
            queryString += "               \"fromSet\": {					";
            queryString += "                   \"collection\": \"WOWNEWS_2017\",";
            queryString += "                    \"result\": [" + startIndex + ", " + endIndex + "]				";
            queryString += "                },";
            queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
            queryString += "               \"debugOption\": {			";
            queryString += "                   \"printQuery\": false,";
            queryString += "                   \"debug\": false,";
            queryString += "                   \"faultless\": false";
            queryString += "               }";
            queryString += "            }]";
            queryString += "    }";
            queryString += "}";

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                url: SEARCH_API_URL,
                data: queryString,
                success: function (data) {
                    callBack(data);
                    //callBack(testNewsData);
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }

        return false;
    },
    GetRecommendationKeyWordNews: function (startIndex, endIndex, searchTerm, callBack) {

        var queryString = "";
        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,";
        queryString += "            \"query\":[{		";
        queryString += "                \"whereSet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"KEYWORDS(HASALL|'" + searchTerm + "'|200)\",		";
        queryString += "                        \"OR\",";
        queryString += "                        \"TAG(HASALL|'" + searchTerm + "'|200)\",			";
        queryString += "                       \"BRACE_CLOSE\"";
        queryString += "                   ]";
        queryString += "                }, ";
        queryString += "               \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
        queryString += "                        \"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
        queryString += "                        \"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\",";
        queryString += "                        \"THUMBNAIL_FILENM(NONE)\", \"VOD_NUM(NONE)\", \"IMGDIR(NONE)\", \"GUBUN_NAME(NONE)\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"orderBySet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                    ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [" + startIndex + ", " + endIndex + "]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "               \"debugOption\": {			";
        queryString += "                   \"printQuery\": false,";
        queryString += "                   \"debug\": false,";
        queryString += "                   \"faultless\": false";
        queryString += "               }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                callBack(data);
                //callBack(testNewsData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetRecommendationKeyWordListNews: function (startIndex, endIndex, searchTermList, callBack) {
        var tempString = "";

        var queryString = "";

        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,";
        queryString += "            \"query\":[{		";
        queryString += "                \"whereSet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                        \"BRACE_OPEN\",";
        //queryString += "                        \"KEYWORDS(HASALL|'aaa';'bbb';'ccc'|200;200;200)\",		";
        queryString += "                        \"KEYWORDS(HASANY|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "'" + item + "';";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += "|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "200;";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += ")\",		";

        queryString += "                        \"OR\",";
        //queryString += "                        \"TAG(HASALL|'aaa';'bbb';'ccc'|200;200;200)\",			";
        queryString += "                        \"TAG(HASANY|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "'" + item + "';";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += "|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "200;";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += ")\",			";

        queryString += "                       \"BRACE_CLOSE\"";
        queryString += "                   ]";
        queryString += "                }, ";
        queryString += "               \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
        queryString += "                        \"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
        queryString += "                        \"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\",";
        queryString += "                        \"THUMBNAIL_FILENM(NONE)\", \"VOD_NUM(NONE)\", \"IMGDIR(NONE)\", \"GUBUN_NAME(NONE)\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"orderBySet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                    ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [" + startIndex + ", " + endIndex + "]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "               \"debugOption\": {			";
        queryString += "                   \"printQuery\": false,";
        queryString += "                   \"debug\": false,";
        queryString += "                   \"faultless\": false";
        queryString += "               }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                callBack(data);
                //callBack(testNewsData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetEntSpoRecommendationKeyWord: function (count, callBack) {
        var queryString = "";
        
        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,						";
        queryString += "            \"query\":[{						";
        queryString += "                \"whereSet\": {					";
        queryString += "                    \"fields\": [";
        //queryString += "                        \"SEARCHALL(HASALL|'all'|0)\"";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"SEARCHALL(HASALL|'all'|0)\",";
        queryString += "                        \"AND\",";
        queryString += "                        \"WOWCODE(HASANY|'W014';'W021';'W022';'W023';'W014';'W028';'W029';'W030';'W031';'W013'|0;0;0;0;0;0;0;0;0;0)\",";
        queryString += "                        \"BRACE_CLOSE\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"orderBySet\": {	";
        queryString += "                    \"fields\": [";
        queryString += "                       \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"groupBySet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                       \"KEYWORDS(COUNT;ORDER_COUNT|'DESC 0 30')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [0, 29]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {					";
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                var keyWrodList = data.resultSet.result[0].groupResult[0].ids;
                var tempKeyWord = keyWrodList;
                if (keyWrodList.length > 0 && keyWrodList.length > count) {
                    keyWrodList = new Array();
                    for (i = 0; i < count; i++) {
                        var num = Math.floor(Math.random() * (tempKeyWord.length - 1));
                        //alert(tempKeyWord.length + ":" + num + ":" + tempKeyWord[num]);
                        keyWrodList.push(tempKeyWord[num]);
                        tempKeyWord.splice(num, 1);
                        //alert(tempKeyWord.length);
                    }
                }
                callBack(keyWrodList);
                //callBack(testKeyWordData.resultSet.result[0].groupResult[0].ids);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetEntSpoRecommendationKeyWordListNews: function (startIndex, endIndex, searchTermList, callBack) {
        var tempString = "";

        var queryString = "";

        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,";
        queryString += "            \"query\":[{		";
        queryString += "                \"whereSet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"KEYWORDS(HASANY|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "'" + item + "';";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += "|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "200;";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += ")\",		";

        queryString += "                        \"OR\",";
        queryString += "                        \"TAG(HASANY|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "'" + item + "';";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += "|";

        tempString = "";
        $.each(searchTermList, function (index, item) {
            tempString += "200;";
        });
        tempString = tempString.substr(0, tempString.length - 1);
        queryString += tempString;

        queryString += ")\",			";

        queryString += "                       \"BRACE_CLOSE\",";
        queryString += "                       \"AND\",";
        queryString += "                       \"WOWCODE(HASANY|'W014';'W021';'W022';'W023';'W014';'W028';'W029';'W030';'W031';'W013'|0;0;0;0;0;0;0;0;0;0)\",";
        queryString += "                       \"BRACE_CLOSE\"";
        queryString += "                   ]";
        queryString += "                }, ";
        queryString += "               \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
        queryString += "                        \"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
        queryString += "                        \"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\",";
        queryString += "                        \"THUMBNAIL_FILENM(NONE)\", \"VOD_NUM(NONE)\", \"IMGDIR(NONE)\", \"GUBUN_NAME(NONE)\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"orderBySet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                    ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [" + startIndex + ", " + endIndex + "]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "               \"debugOption\": {			";
        queryString += "                   \"printQuery\": false,";
        queryString += "                   \"debug\": false,";
        queryString += "                   \"faultless\": false";
        queryString += "               }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";

        if(1 == 0) {
            queryString = "";
            queryString += "{";
            queryString += "    \"querySet\":{";
            queryString += "        \"version\":42,";
            queryString += "            \"query\":[{";
            queryString += "                \"whereSet\": {";
            queryString += "                    \"fields\": [";
            queryString += "                        \"BRACE_OPEN\",";
            queryString += "                        \"BRACE_OPEN\",";
            queryString += "                        \"KEYWORDS(HASALL|'한국'|200)\",";
            queryString += "                        \"OR\",";
            queryString += "                        \"TAG(HASALL|'한국'|200)\",";
            queryString += "                        \"BRACE_CLOSE\",";
            queryString += "		                \"AND\",";
            queryString += "                        \"WOWCODE(HASALL|'W014';'W021';'W022';'W023';'W014';'W028';'W029';'W030';'W031';'W013'|0;0;0;0;0;0;0;0;0;0)\",";
            queryString += "		                \"BRACE_CLOSE\"";
            queryString += "                    ]";
            queryString += "               },";
            queryString += "               \"selectSet\": {";
            queryString += "                   \"fields\": [";
            queryString += "                       \"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
            queryString += "                        \"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
            queryString += "                        \"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\"";
            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"orderBySet\": {";
            queryString += "                    \"fields\": [";
            queryString += "                        \"ARTDATE(ASC|POSTWEIGHT)\"";
            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"filterSet\": {";
            queryString += "                    \"fields\": [";
              //queryString += "                        \"ARTDATE(RANGE|'20171125000000';'20171202235959')\"";
            queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"fromSet\": {";
            queryString += "                    \"collection\": \"WOWNEWS_2017\",";
            queryString += "                    \"result\": [0, 3]";
            queryString += "                },";
            queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
            queryString += "                \"debugOption\": {";
            queryString += "                    \"printQuery\": false,";
            queryString += "                    \"debug\": false,";
            queryString += "                    \"faultless\": false";
            queryString += "                }";
            queryString += "            }]";
            queryString += "    }";
            queryString += "}";
        }


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                callBack(data.resultSet.result[0].resultDocuments);
                //callBack(testNewsData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetAutoComplete: function (searchTerm, callBack) {
        var queryString = "";

        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,						";
        queryString += "            \"query\":[{						";
        queryString += "                \"whereSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"BRACE_OPEN\", \"KEYWORD(HASALL|'" + searchTerm + "'|200)\", \"OR\", \"FKEY(HASALL|'" + searchTerm + "'|200)\", \"BRACE_CLOSE\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"KEYWORD(NONE)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"orderBySet\": {	";
        queryString += "                    \"fields\": [";
        queryString += "                       \"COUNT(ASC|POSTWEIGHT)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"SMARTMAKER\",";
        queryString += "                    \"result\": [0, 29]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {					";
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                var keyWrodList = data.resultSet.result[0].resultDocuments;
                callBack(keyWrodList);
                //callBack(testKeyWordData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetEntSpoRankingKeyWord: function (startIndex, endIndex, callBack) {
        var queryString = "";

        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,						";
        queryString += "            \"query\":[{						";
        queryString += "                \"whereSet\": {					";
        queryString += "                    \"fields\": [";
        //queryString += "                        \"SEARCHALL(HASALL|'all'|0)\"";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"SEARCHALL(HASALL|'all'|0)\",";
        queryString += "                        \"AND\",";
        queryString += "                        \"WOWCODE(HASANY|'W014';'W021';'W022';'W023';'W014';'W028';'W029';'W030';'W031';'W013'|0;0;0;0;0;0;0;0;0;0)\",";
        queryString += "                        \"BRACE_CLOSE\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"ARTID(NONE)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"orderBySet\": {	";
        queryString += "                    \"fields\": [";
        queryString += "                       \"ARTDATE(ASC|POSTWEIGHT)\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"groupBySet\": {					";
        queryString += "                   \"fields\": [";
        queryString += "                       \"KEYWORDS(COUNT;ORDER_COUNT|'DESC " + startIndex + " " + endIndex + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					";
        queryString += "                   \"collection\": \"WOWNEWS_2017\",";
        queryString += "                    \"result\": [0, 29]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {					";
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                var keyWrodList = data.resultSet.result[0].groupResult[0].ids;
                callBack(keyWrodList);
                //callBack(testKeyWordData.resultSet.result[0].groupResult[0].ids);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },



    GetTvMovieKeyWord: function (num, gubun, callBack) {
        var queryString = "";

        queryString += "{";
        queryString += "    \"querySet\":{";
        queryString += "        \"version\":42,						";
        queryString += "            \"query\":[{						";
        queryString += "                \"whereSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"ID(HASALL|'" + num + "'|0)\",";  //DNRS 일 경우에는 NUM 값, NEWS 일 경우 VODNUM_ARTICLEID 로 검색
        queryString += "                        \"AND\",";
        queryString += "                        \"GUBUN(HASALL|'" + gubun + "'|0)\",";          //DNRS , NEWS  로 구분
        queryString += "                        \"BRACE_CLOSE\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {					";
        queryString += "                    \"fields\": [";
        queryString += "                        \"KEYWORDS(NONE)\"";
        queryString += "                   ]";
        queryString += "               },";


        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"DATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "               \"fromSet\": {					"; //fromSet  (검색대상 컬렉션(테이블), 한페이지당 검색 결과 수 설정)
        queryString += "                   \"collection\": \"VODTOPICKER\",";
        queryString += "                    \"result\": [0, 0]				";
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {					";
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";
        
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                var keyWrodList = data.resultSet.result[0].resultDocuments;
                callBack(keyWrodList);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    },
    GetTvMovieContentByKeyWord: function (startIndex, endIndex, gubun, keyWrodList, callBack) {
        var tempString = "";

        var queryString = "";

        if (keyWrodList.length == 0) {
            callBack(null);
        }
        else if (keyWrodList.length == 1 && keyWrodList[0].KEYWORDS == "") {
            callBack(null);
        }
        else {
            queryString += "{";
            queryString += "\"querySet\":{";
            queryString += "        \"version\":42,";                                                            //검색엔진 버전
            queryString += "            \"query\":[{";                                                                //검색쿼리
            queryString += "                \"whereSet\": {";                                                 //whereSet (검색 대상 필드)
            queryString += "                    \"fields\": [";
            queryString += "                        \"BRACE_OPEN\",";

            //queryString += "                        \"KEYWORDS(HASANY|'코스닥';'부동산재테크';'키덜트족'|0;0;0)\",";

            queryString += "                        \"KEYWORDS(HASANY|";

            tempString = "";
            $.each(keyWrodList, function (index, item) {
                tempString += "'" + item.KEYWORDS + "';";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;

            queryString += "|";

            tempString = "";
            $.each(keyWrodList, function (index, item) {
                tempString += "0;";
            });
            tempString = tempString.substr(0, tempString.length - 1);
            queryString += tempString;

            queryString += ")\",		";


            queryString += "                        \"AND\",";
            queryString += "                        \"GUBUN(HASALL|'" + gubun + "'|0)\",";          //DNRS , NEWS  로 구분
            queryString += "                                   \"BRACE_CLOSE\"";
            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"selectSet\": {";                                                  //selectSet (검색결과 노출 필드)
            queryString += "                   \"fields\": [";

            queryString += "                        \"TITLE(NONE)\",";
            queryString += "                        \"CONTENT(NONE)\",";
            queryString += "                        \"ID(NONE)\","; // VOD_NUM
            queryString += "                        \"DATE(NONE)\","; // ARTDATE
            queryString += "                        \"KEYWORDS(NONE)\",";
            queryString += "                        \"GUBUN(NONE)\","; // GUBUN_NAME
            //queryString += "                      \"FILENM(NONE)\",";
            //queryString += "                      \"IMAGE_S(NONE)\",";
            //queryString += "                      \"EDITFOLDER(NONE)\"";

            queryString += "                        \"ARTICLEID(NONE)\",";
            queryString += "                        \"THUMBNAIL_FILENM(NONE)\",";
            //queryString += "                      \"VOD_NUM(NONE)\",";
            queryString += "                        \"IMGDIR(NONE)\",";
            queryString += "                        \"THUMBNAIL_TYPE1(NONE)\"";
            //queryString += "                      \"ARTDATE(NONE)\",";
            //queryString += "                      \"GUBUN_NAME(NONE)\",";

            queryString += "                    ]";
            queryString += "                },";
            queryString += "                \"orderBySet\": {";                                               //orderBySet (정렬필드)
            queryString += "                    \"fields\": [";
            queryString += "                        \"DATE(ASC|PREWEIGHT)\"";
            queryString += "                    ]";
            queryString += "                },";

            queryString += "               \"filterSet\": {					";
            queryString += "                   \"fields\": [				";
            queryString += "                       \"DATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
            queryString += "                   ]";
            queryString += "               },";
            queryString += "                \"fromSet\": {";                                                   //fromSet  (검색대상 컬렉션(테이블), 한페이지당 검색 결과 수 설정)
            queryString += "                    \"collection\": \"VODTOPICKER\",";
            queryString += "                    \"result\": [0, 11]";                                      // 숫자 변경 가능
            queryString += "                },";
            queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
            queryString += "                \"debugOption\": {";                                            // 디버깅 옵션
            queryString += "                    \"printQuery\": false,";
            queryString += "                    \"debug\": false,";
            queryString += "                    \"faultless\": false";
            queryString += "                }";
            queryString += "            }]";
            queryString += "    }";
            queryString += "}";


            $.ajax({
                type: "POST",
                contentType: "application/json; charset=UTF-8",
                dataType: "json",
                url: SEARCH_API_URL,
                data: queryString,
                success: function (data) {
                    callBack(data.resultSet.result[0].resultDocuments);
                    //callBack(testNewsData);
                },
                error: function (e) {
                    console.log(JSON.stringify(e));
                }
            });
        }

        return false;
    },
    GetTvMovieContentByDay: function (startIndex, endIndex, gubun, callBack) {
        var tempString = "";

        var queryString = "";

        queryString += "{";
        queryString += "\"querySet\":{";
        queryString += "        \"version\":42,";                                                            //검색엔진 버전
        queryString += "            \"query\":[{";                                                                //검색쿼리
        queryString += "                \"whereSet\": {";                                                 //whereSet (검색 대상 필드)
        queryString += "                    \"fields\": [";
        queryString += "                        \"BRACE_OPEN\",";
        queryString += "                        \"SEARCHALL(HASALL|'all'|0)\",";
        queryString += "                        \"AND\",";
        queryString += "                        \"GUBUN(HASALL|'" + gubun + "'|0)\",";          //DNRS , NEWS  로 구분
        queryString += "                        \"BRACE_CLOSE\"";
        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"selectSet\": {";                                                  //selectSet (검색결과 노출 필드)
        queryString += "                   \"fields\": [";

        queryString += "                        \"TITLE(NONE)\",";
        queryString += "                        \"CONTENT(NONE)\",";
        queryString += "                        \"ID(NONE)\","; // VOD_NUM
        queryString += "                        \"DATE(NONE)\","; // ARTDATE
        queryString += "                        \"KEYWORDS(NONE)\",";
        queryString += "                        \"GUBUN(NONE)\","; // GUBUN_NAME
        //queryString += "                      \"FILENM(NONE)\",";
        //queryString += "                      \"IMAGE_S(NONE)\",";
        //queryString += "                      \"EDITFOLDER(NONE)\"";

        queryString += "                        \"ARTICLEID(NONE)\",";
        queryString += "                        \"THUMBNAIL_FILENM(NONE)\",";
        //queryString += "                      \"VOD_NUM(NONE)\",";
        queryString += "                        \"IMGDIR(NONE)\",";
        queryString += "                        \"THUMBNAIL_TYPE1(NONE)\"";
            //queryString += "                      \"ARTDATE(NONE)\",";
            //queryString += "                      \"GUBUN_NAME(NONE)\",";

        queryString += "                    ]";
        queryString += "                },";
        queryString += "                \"orderBySet\": {";                                               //orderBySet (정렬필드)
        queryString += "                    \"fields\": [";
        queryString += "                        \"DATE(ASC|POSTWEIGHT)\"";
        queryString += "                    ]";
        queryString += "                },";

        queryString += "               \"filterSet\": {					";
        queryString += "                   \"fields\": [				";
        queryString += "                       \"DATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
        queryString += "                   ]";
        queryString += "               },";
        queryString += "                \"fromSet\": {";                                                   //fromSet  (검색대상 컬렉션(테이블), 한페이지당 검색 결과 수 설정)
        queryString += "                    \"collection\": \"VODTOPICKER\",";
        queryString += "                    \"result\": [0, 11]";                                      // 숫자 변경 가능
        queryString += "                },";
        queryString += "               \"useCache\": true,";                                        //캐시 사용 옵션
        queryString += "                \"debugOption\": {";                                            // 디버깅 옵션
        queryString += "                    \"printQuery\": false,";
        queryString += "                    \"debug\": false,";
        queryString += "                    \"faultless\": false";
        queryString += "                }";
        queryString += "            }]";
        queryString += "    }";
        queryString += "}";


        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            url: SEARCH_API_URL,
            data: queryString,
            success: function (data) {
                callBack(data.resultSet.result[0].resultDocuments);
                //callBack(testNewsData);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });

        return false;
    }
}


