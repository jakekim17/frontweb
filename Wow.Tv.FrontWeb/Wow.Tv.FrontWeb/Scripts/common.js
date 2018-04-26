//common 스크립트 세팅
if (!window.co) window.co = {};

//Email 확인
window.co.checkEmail = function (emailValue) {
    if (emailValue.length < 8) {
        alert("올바른 E-mail 주소가 아닙니다. E-mail 주소를 확인하시고 다시 입력하여 주십시오.");
        return false;
    }

    var fmt = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!fmt.test(emailValue)) {
        alert("올바른 E-mail 주소가 아닙니다. E-mail 주소를 확인하시고 다시 입력하여 주십시오.");
        return false;
    }

    //테스트용으로 사용 됨
    alert("E-mail 주소가 맞습니다.");
    return true;
}


function HtmlHelper() {
    /// <summary>
    /// <para>Javascript HtmlHelper 입니다.</para>
    /// <para>jquery.js 참조 필수</para>
    /// <para>UI단에 도움이 되는 기능을 담고 있습니다.</para>
    /// <para>new 키워드로 생성하여 사용합니다.</para>
    /// <para>- 작  성  자 : ABC 솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-08-04</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-08-04</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-08-04 생성</para>
    /// </summary>
    /// <remarks>없음</remarks>
    var self = this;

    this.InitPhoneNumberControl = function() {
        var controls = $(".phone_number_control");
        $.each(controls,
            function(i) {
                var $control = $(controls[i]);
                //selectbox 데이터 바인딩
                $control.children(":first-child").attr("selected", "true");
                var $txtNumber2 = $("#" + $control.attr("next"));
                var $txtNumber3 = $("#" + $txtNumber2.attr("next"));
                var $hiddenInput = $("#" + $txtNumber3.attr("next"));

                var bindManager = function() {
                    var num = $control.val() + '-' + $txtNumber2.val() + "-" + $txtNumber3.val();
                    $hiddenInput.val(num).change();
                };

                $hiddenInput.change(function() {
                    var nums = $hiddenInput.val().split('-');
                    if (nums.length == 3) {
                        $control.val(nums[0]);
                        $txtNumber2.val(nums[1]);
                        $txtNumber3.val(nums[2]);
                    } else {
                        $control.children(":first-child").attr("selected", "true");
                        $txtNumber2.val("");
                        $txtNumber3.val("");
                    }
                });

                $control.change(function() {
                    $txtNumber2.focus();
                    bindManager();
                });
                $txtNumber2.change(function() {
                    bindManager();
                });
                $txtNumber3.change(function() {
                    bindManager();
                });
                $txtNumber2.bind("keydown",
                    function(e) {
                        HtmlHelper.ForceNumericOnly(e);
                    });
                $txtNumber3.bind("keydown",
                    function(e) {
                        HtmlHelper.ForceNumericOnly(e);
                    });
                $txtNumber2.bind("keyup",
                    function() {
                        if ($txtNumber2.val().length > 3) {
                            $txtNumber3.focus();
                        }
                    });
                $hiddenInput.change();
            });
    };


    HtmlHelper.ForceNumericOnly = function (e) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY 
        return (key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 37 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
    };

}

// Json Type Control Extract
HtmlHelper.GetJsonDataFromHtml = function (attrName, GetSelectBoxText) {
    //Json 메이커 //타입에 따라 변경되어야함.
    if (attrName == undefined || attrName == '') {
        return null;
    }
    var _attrSelector = "[" + attrName + "]";
    var $elements = $(_attrSelector);
    var returnValue = {};
    for (var i = 0; i < $elements.length; i++) {
        var fieldName = $($elements[i]).attr(attrName);
        var value = $($elements[i]).val();

        if ($($elements[i]).attr("type") == "checkbox") {
            value = $($elements[i]).is(":checked") == true ? "Y" : "N";
        }

        returnValue[fieldName] = value;
        if (GetSelectBoxText == true && $elements[i].type == "select-one") {
            returnValue[fieldName + "_Text"] = $(':selected', $elements[i]).text();
        }
    }
    return returnValue;
};

$(document).ready(function() {
    var htmlHelper = new HtmlHelper(); //HtmlHelper관련
    htmlHelper.InitPhoneNumberControl();
});
// =================================================

$.ajaxSetup({
    cache: false,
    beforeSend: function (xmlHttpRequest) {
        cfShowBlock(true);
    },
    error: function (xhr, textStatus, errorThrown) {
        //에러 메시지 처리
        alert('요청 중 서버에서 에러가 발생하였습니다.');
    },
    complete: function (xhr, textStatus) {
        //처리중 UI 제거
        cfHideBlock();
    }
});


// =================================================


