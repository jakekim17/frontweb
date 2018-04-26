var CommonJs = {
    ElementsValTotal: function (elements, totalArea) {
        var sumVal = 0;
        $(elements).each(function () {
            sumVal += Number($(this).text());
        });
        //console.log("콤마");
        $(totalArea).text(CommonJs.NumberAddCommaFormat(sumVal));
    },
    StrAddComma: function (str) {
        var len = str.length;
        var rtnStr = "";
        for (var i = 0, j = len; i < len; i++ , j--){
            if (j % 3 === 0 && j !== len) {
                rtnStr += ",";
            }
            rtnStr += str.charAt(i);
        }
        return rtnStr;
    },
    NumberAddCommaFormat: function (data_value) {
        var txtNumber = '' + data_value;    // 입력된 값을 문자열 변수에 저장합니다.

        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');    // 정규식 형태 생성
        var arrNumber = txtNumber.split('.');    // 입력받은 숫자를 . 기준으로 나눔. (정수부와 소수부분으로 분리)
        arrNumber[0] += '.'; // 정수부 끝에 소수점 추가

        do {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2'); // 정수부에서 rxSplit 패턴과 일치하는 부분을 찾아 replace 처리
        } while (rxSplit.test(arrNumber[0])); // 정규식 패턴 rxSplit 가 정수부 내에 있는지 확인하고 있다면 true 반환. 루프 반복.

        if (arrNumber.length > 1) { // txtNumber를 마침표(.)로 분리한 부분이 2개 이상이라면 (즉 소수점 부분도 있다면)
            return arrNumber.join(''); // 배열을 그대로 합칩. (join 함수에 인자가 있으면 인자를 구분값으로 두고 합침)
        }
        else { // txtNumber 길이가 1이라면 정수부만 있다는 의미.
            return arrNumber[0].split('.')[0]; // 위에서 정수부 끝에 붙여준 마침표(.)를 그대로 제거함.
        }
    },
    ChgTypeArrowFormat: function (str) {
        if (str == "+") {
            str = "▲";
        }
        else if (str == "-") {
            str = "▼";
        }
        else if (str == " ") {
            str = " ";
        }
        else {
            str = str;
        }
        return str;
    },
    ChgTypeCheck: function (chgTypeStr, elementObj) {
        if (chgTypeStr == "+") {
            elementObj.removeClass('data-down').addClass('data-up');
        }
        else if (chgTypeStr == "-") {
            elementObj.removeClass('data-up').addClass('data-down');
        }
        else {
            elementObj.removeClass('data-up').removeClass('data-down');
        }
    },
    StockChgTypeCheck: function (chgTypeStr, elementObj) {
        //console.log(chgTypeStr);
        //console.log(elementObj.attr("class"));
        if (chgTypeStr == "1") {
            //elementObj.attr("class", "data-up max");
            elementObj.removeClass('data-down').addClass('data-up');
        }
        else if (chgTypeStr == "2") {
            //elementObj.attr("class", "data-up icon");
            elementObj.removeClass('data-down').addClass('data-up');
        }
        else if (chgTypeStr == "4") {
            //elementObj.attr("class", "data-down min");
            elementObj.removeClass('data-up').addClass('data-down');
        }
        else if (chgTypeStr == "5") {
            //elementObj.attr("class", "data-down icon");
            elementObj.removeClass('data-up').addClass('data-down');
        }
        else {
            elementObj.removeClass('data-up').removeClass('data-down');
        }
        //console.log(chgTypeStr);
        //console.log(elementObj.attr("class"));
    },
    ReplaceAll: function(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    },
    TableTop3AddClass: function (elements) {
        $(elements).each(function (index, elem) {
            //console.log(index);
            if (index < 9) {
                $(elem).addClass("em");
            }
        });
    }
} //Object End

//function getTotalStockCount(elements, totalArea) {
    
//}

