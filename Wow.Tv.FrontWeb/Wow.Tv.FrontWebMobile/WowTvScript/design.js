// 스위치 버튼 
// function switch_btn(){
// 	var ui_btn = $(".switch-btn input");

// 	ui_btn.click(function(){
// 		if($(this).parent().hasClass("on")){
// 			$(this).parent().removeClass("on")
// 		}else {
// 			$(this).parent().addClass("on");
// 		}
// 	})
// }


// 비트코인 상단 
function bitcoin() {

    var lastRotateIndex = 1;
    var bRotate = true;
    var bRotateStop = false;

    if ($('.bitcoin-area ul.bit-list li').length > 0)
        $('.bitcoin-area ul.bit-list li').first().clone().appendTo('.bitcoin-area ul.bit-list');

    console.log($('.bitcoin-area ul.bit-list li').length)
    function rotateRank(index) {
        setTimeout(function () {
            lastRotateIndex = index;
            if (!bRotate) {
                bRotateStop = true;
                return;
            }
            $('.bitcoin-area ul.bit-list').animate({
                top: -$('.bitcoin-area ul.bit-list li').height() * index
            }, 500, function () {
                if (index == $('.bitcoin-area ul.bit-list li').length - 1) {
                    $('.bitcoin-area ul.bit-list').css('top', '0px');
                    index = 0;
                }
                rotateRank(index + 1);
            });
        }, 2000);
    }

    rotateRank(1);




    $('.bitcoin-area .bitcoin-btn').click(function () {
        $(".bitcoin-area .bitcoin-detail").addClass("on");
    })
    $('.bitcoin-detail .close-btn').click(function () {
        $(".bitcoin-detail").removeClass("on");
    })

}





// footer 사업자정보/한국경제TV패밀리 사이트 클릭시 CLOSE/OPEN
function footer_info() {
    $('.view-comInfor').on('click', function () {
        $('.view-site').removeClass('on');
        $('.box-footer-site').hide();
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.box-footer-comInfor').hide();
        } else {
            $(this).addClass('on');
            $('.box-footer-comInfor').show();
        }
    });
    $('.view-site').on('click', function () {
        $('.view-comInfor').removeClass('on');
        $('.box-footer-comInfor').hide();
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.box-footer-site').hide();
        } else {
            $(this).addClass('on');
            $('.box-footer-site').show();
        }
    });
}






// GNB 드랍 최상단 버튼 
function gnb_top() {
    var ui_btn = $(".gnb-footer .top-btn a");
    ui_btn.click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 300);
    })
}



//통합 메인 검색
function main_search() {

    var ui_btn = $(".menu-area .search");
    ui_btn.click(function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on")
            $(".search-area").stop().slideUp()
        } else {
            $(this).addClass("on");
            $(".search-area").stop().slideDown()
        }
    })
}





// 통합 검색 상단 
function search_menu() {
    var ui_btn = $(".search-header .arrow");
    var dropbox = $(".search-header .top-dropbox");
    var ui_height = $(".search-header .title-area").height();

    //console.log (ui_height)
    ui_btn.click(function () {
        if ($(dropbox).parent().parent().hasClass("on")) {
            $(dropbox).parent().parent().removeClass("on");
            $(".search-header ").css({
                "padding-top": "0px"
            })
        } else {
            $(dropbox).parent().parent().addClass("on");
            $(".search-header ").css({
                "padding-top": ui_height
            })
        }

    })
}

// 통합 검색 선택
function search_choice() {
    var ui_btn = $(".choice-list ul li .arrow");
    var ui_choice = $(".choice-list ul li a");
    var ui_calendar = $(".calendar-btn");
    var calendar_box = $(".calendar-form");

    ui_btn.click(function () {
        $(this).parent().parent().toggleClass("on");
    });

    ui_choice.click(function () {
        $(this).parent().addClass("on").siblings().removeClass("on")
        // console.log($(this).hasClass("searchDay"));
        if ($(this).hasClass("searchDay")) {
            calendar_box.removeClass("on");
        }
    });

    ui_calendar.click(function () {
        if ($(calendar_box).hasClass("on")) {
            calendar_box.removeClass("on");
            calendar_box.addClass("on")
        } else {
            calendar_box.addClass("on")
        }
    });

}



// 금융 - 종목상세
function sell_bar() {
    $('.box-type-sell-view > li > a').on('click', function () {
        $('.box-type-sell-view > li > a').removeClass('btn-close').addClass('btn-open');
        $('.box-type-sell-view > li > .bar-cont').removeClass('on');
        if ($(this).parent('li').hasClass('active')) {
            $(this).parent('li').removeClass('active');
            $(this).removeClass('btn-close').addClass('btn-open');
        } else {
            $('.box-type-sell-view > li').removeClass('active');
            $(this).parent('li').addClass('active');
            $(this).removeClass('btn-open').addClass('btn-close');
            $(this).next('.bar-cont').siblings().removeClass('on');
            $(this).next('.bar-cont').addClass('on');
        }
    });
}

// 마이페이지 tab btn
function tab_btn() {
    $('.box-grown-form.txt-empoty').css({ 'padding': '0px' });
    $('.box-grown-form.txt-empoty').addClass('active');
    $('.tab-btn > ul li').on('click', function () {

        if ($(this).hasClass('input-tag')) {
            $('.box-grown-form .input-view').show();
            if ($('.box-grown-form.txt-empoty').hasClass('active') == true) {
                $('.box-grown-form.txt-empoty').removeClass('active');
                $('.box-grown-form.txt-empoty').css({ 'padding': '' });
                $(this).addClass('on');
            }
        } else {
            $('.box-grown-form .input-view').hide();
            if ($('.box-grown-form.txt-empoty').hasClass('active') == false) {
                $('.box-grown-form.txt-empoty').addClass('active').css({ 'padding': '0px' });
                $(this).siblings().removeClass('on');
            }
        }
    });
}

// 추천 & 핀 하기 
function check_btn() {
    $(".btn-area.reporter .heart").click(function () {
        $(this).children().addClass("on")
    })
    $(".btn-area.reporter .pin").click(function () {
        if ($(this).children().hasClass('on')) {
            $(this).children().removeClass("on").parent().css({
                "background": "#fff",
                "color": "#666"
            })
        } else {
            $(this).children().addClass("on").parent().css({
                "background": "#4f5eaf",
                "color": "#fff"
            })
        }
    })
}


// 뉴스 댓글 달기 
function reply_box() {
    var btn = $(".reply-btn .type05");
    btn.click(function () {
        if ($(this).parent().next().hasClass("on")) {
            $(this).parent().next().removeClass("on")
            $(this).text("답글닫기");
        } else {
            $(this).parent().next().addClass("on")
            $(this).text("답글달기");
        }

    });

}


// 마이페이지 총 결제금액 클릭
function box_allPay_click() {
    $('.list-type-allPay li.first').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).siblings().removeClass('active');
        } else {
            $(this).addClass('on');
            $(this).siblings().addClass('active');
        }
    });
}


// customer 상단 전체 드롭 메뉴 
function menu_list() {
    var btn = $(".menu-btn");
    var close_btn = $(".close-btn");
    var toggle_btn = $(".menu-list > .menu > li > a");
    var subMenu_btn = $(".menu-list > .menu > li > .sub-menu > li > a")

    btn.click(function () {
        $(".sitemap-area").addClass("on");
        $(".wrap").css({
            "position": "relative"
        })
    });

    close_btn.click(function () {
        $(".sitemap-area").removeClass("on");
    });
    toggle_btn.click(function () {
        $(this).parent().toggleClass("on"); // 2017-12-26 변경 신용섭 
        $(this).parent().siblings().removeClass("on");
    });
    subMenu_btn.click(function () {
        $(this).parent().addClass("on");
        $(this).parent().siblings().removeClass("on");
    });

}

// checkbox 클릭시 그 라인 배경색 회식으로 변경
function my_li_check() {
    $(".list-type-pin .checkbox-area input[type='checkbox']").change(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent('li').addClass('bg-col01');
        } else {
            $(this).parent().parent('li').removeClass('bg-col01');
        }
    });
}


//공통 100% 텝 
function tab_style() {

    $('.tab-area').each(function () {
        var tab_type = $(this).children().children('li');
        var last = $(this).children().children('li:last');

        var max = 100 / $(this).children().children('li').length;
        var fix = Math.floor(max);

        var num = fix - max;

        tab_type.css("width", fix + "%");
        tab_type.last().css("width", max - num + "%");

        tab_type.click(function () {
            var inx = $(this).index();

            $(this).addClass("on").siblings().removeClass("on");
            $(this).parent().parent().next().find('.tab-cont').siblings().removeClass("on");
            $(this).parent().parent().next().find(".tab-cont:eq(" + inx + ")").addClass("on");
        });

    });

}

//IR 탭 
function tab_style_ir() {

    $('.tab-list').each(function () {
        var tab_type = $(this).children().children('li');
        var last = $(this).children().children('li:last');

        var max = 100 / $(this).children().children('li').length;
        var fix = Math.floor(max);

        var num = fix - max;

        tab_type.css("width", fix + "%");
        tab_type.last().css("width", max - num + "%");

        tab_type.click(function () {
            var inx = $(this).index();

            $(this).addClass("on").siblings().removeClass("on");
            $(this).parent().parent().next().find('.tab-box').siblings().removeClass("on");
            $(this).parent().parent().next().find(".tab-box:eq(" + inx + ")").addClass("on");
        });

    });

}

// 캘린더 
function ui_calendar() {
    $(".datepicker").datepicker({
        firstDay: 1, // 주의 시작일을 일요일로 하려면 0, 월요일은 1
        showOtherMonths: true, // 이전달 다음달의 날자 미리보기
        showMonthAfterYear: true, // 년도와 월의 순서를 변경 
        monthNames: [". 01", ". 02", ". 03", ". 04", ". 05", ". 06", ". 07", ". 08", ". 09", ". 10", ". 11", ". 12"],
        dateFormat: "yy-mm-dd", // 년, 월, 일 순서 
    });

}

//아코디언 faq
function box_accordion() {
    $('.box-accordion ul li.box-q').on('click', function () {
        var inx = $(this).index();
        $(this).siblings().removeClass("on");

        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(this).next().removeClass("on");
        } else {
            $(this).addClass("on");
            $(this).next().addClass("on");
        }
    });
}

//리스트 아코디언
function list_accordion() {
    $('.list-accordion ul li').on('click', function () {

        $(this).siblings().removeClass("on");

        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(this).next().removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
}

/* 검색영역 > 항목검색 열림/닫힘 */
function search_toggle() {
    $('.search-area .search-toggle').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.list-item').removeClass("on");
        } else {
            $(this).addClass('on');
            $('.list-item').addClass("on")
        }
    });
}

/* 댓글 아코디언 */
function reply_toggle() {
    $('.reply-head').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).children().children().next().next().removeClass("on")
            $('.reply-area').slideUp();
        } else {
            $(this).addClass('on');
            $(this).children().children().next().next().addClass("on")
            $('.reply-area').slideDown();

        }
    });
}

/* TV main 방송 미디어 영역 아코디언 */
function broadcast_toggle() {
    $('.broadcast-area .toggle-area').on('click', function () {
        if ($(this).hasClass('on')) {
            if (VodPlayer != null) {
                VodPlayer.PlayButtonHighZIndex();
            }
            $(this).removeClass('on');
            $('.list-schedule-broad').slideUp();
        } else {
            $(this).addClass('on');
            $('.list-schedule-broad').slideDown();
            if (VodPlayer != null) {
                VodPlayer.PlayButtonLowZIndex();
            }
        }
    });
}

/* 뉴스 main > 많이 본 뉴스 > 더보기 */
function moresee_toggle() {
    $('.btn-area .btn.type06').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).children().text('더보기');
            $(this).parent().prev('.box-img-02').children('.list-moresee-area').slideUp();
        } else {
            $(this).addClass('on');
            $(this).children().text('닫기');
            $(this).parent().prev('.box-img-02').children('.list-moresee-area').slideDown();
        }
    });
}

// menu view
function menu_view() {
    $('.ico-gnb a').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).children('.is-ico').removeClass('gnb-close').addClass('gnb-view');
            $('.header-gnb-menu').hide();
            $('.header-top').css({
                position: ''
            });
        } else {
            $(this).addClass('active');
            $(this).children('.is-ico').removeClass('gnb-view').addClass('gnb-close');
            $('.header-gnb-menu').show();
            $('.header-top').css({
                position: 'absolute'
            });
        }
    });
}

//menu accordion
function menu_accordion() {
    $('.menu_accordion .gnbwrap h3').on('click', function () {
        var inx = $(this).parent().index();
        $(this).parent().siblings().removeClass("on");
        $(this).parent().toggleClass("on");
    });
}



// 카드뉴스 동영상 픽스 

function video_area() {

    // var num = 444; 
    var ui_fix = $(".movie-area");
    var top = $(".movie-area").offset().top; // 박스 위치 값 
    var box = $(".movie-area").height(); // 박스 높이 값


    $(window).scroll(function () {
        var ui_top = $(document).scrollTop();
        if (ui_top >= top) {
            ui_fix.addClass("fix");
            ui_fix.next().css({
                "padding-top": box + "px"
            })
        } else {
            ui_fix.removeClass("fix");
            ui_fix.next().css({
                "padding-top": 0
            })
        }
    })
}





// 레이어 팝업 
function ui_popup() {
    $('.btn-example').click(function () {
        var $href = $(this).attr('href');
        layer_popup($href);
    });
    function layer_popup(el) {

        var $el = $(el);        //레이어의 id를 $el 변수에 저장
        var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.popup-area').fadeIn() : $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight / 2,
                marginLeft: -$elWidth / 2
            })
        } else {
            $el.css({ top: 0, left: 0 });
        }

        $el.find('.pop-btn').click(function () {
            isDim ? $('.popup-area').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
            return false;
        });

        $('.layer .dimBg').click(function () {
            $('.popup-area').fadeOut();
            return false;
        });

    }

}








/* 인풋 파일 스크립트 */
function file_input() {
    var uploadFile = $('.file-box .upload-btn');
    uploadFile.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
            $(".file-btn").addClass("on")
            $(".file-btn").click(function () {
                $(this).removeClass("on")
            });
            // 파일 리셋
            $('.file-btn').on('click', function (e) {
                var $el = $('.file-name');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
            });
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.file-name').val(filename);
    });


}




//달력 슬라이드
function date_swiper() {
    var dataSwiper = new Swiper('.date-swiper', {
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        //loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    $('.date-swipe-area00 .date-swiper .swiper-wrapper .swiper-slide a').on('click', function () {
        $(this).parent().siblings().removeClass("on");
        $(this).parent().addClass("on");
    });

    $('.date-swipe-area01 .date-swiper .swiper-wrapper .swiper-slide a').on('click', function () {
        $(this).parent().siblings().removeClass("on");
        $(this).parent().addClass("on");
    });

}

// 스크롤 탑바/상단가기 버튼
function topBtn() {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 204) {
            $('.topbtn').fadeIn();
        } else {
            $('.topbtn').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('.topbtn').bind("click", function (e) {
        // Prevents the default action to be triggered.
        e.preventDefault();

        $('body,html').animate({
            scrollTop: 0
        }, 200);
    });
}


/* 플러그인 SWIPER-START */

// GNB & SUB GNB
function gnb_swiper_new() {

    var num = $(".header-gnb.swiper-container .swiper-slide").length;
    var numLnb = $(".sub-lnb01.swiper-container .swiper-slide").length;

    //header gnb
    if (window.innerWidth <= 610) {
        var swiper = new Swiper('.header-gnb.swiper-container.etc', {
            slidesPerView: 'auto',
            spaceBetween: 0
        });
    } else if (window.innerWidth > 610) {
        $(".header-gnb.swiper-container").removeClass('etc');
    }
    if (num > 4) {
        $(".header-gnb.swiper-container .swiper-slide").addClass('w-auto');
        var swiper = new Swiper('.header-gnb.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            initialSlide: $(".header-gnb.swiper-container .swiper-slide.on").index()
        });
    } else if (num <= 4) {
        var swiper = new Swiper('.header-gnb.swiper-container', {
            slidesPerView: num,
            spaceBetween: 0
        });
    }


    //sub gnb01
    $(".sub-gnb01.swiper-container").each(function () {
        var numS = $(this).children().children(".swiper-slide").length;
        //alert(numS);
        if ($(this).hasClass('etc')) {
            var swiper = new Swiper($(this), {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 0
            });
        } else {
            if (numS > 4) {
                $(this).children().children(".swiper-slide").addClass('w-auto');
                var swiper = new Swiper($(this), {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 'auto',
                    spaceBetween: 0
                });
            } else if (numS <= 4) {
                var swiper = new Swiper($(this), {
                    observer: true,
                    observeParents: true,
                    slidesPerView: numS,
                    spaceBetween: 0
                });
            }
        }
    });


    //sub lnb01
    if (numLnb > 4) {
        $(".sub-lnb01.swiper-container .swiper-slide").addClass('w-auto');

        //sub-visual-lnb
        var subLnb = new Swiper('.sub-visual-lnb .sub-lnb01.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 5,
            navigation: {
                nextEl: '.sub-visual-lnb .swiper-button-next',
                prevEl: '.sub-visual-lnb .swiper-button-prev',
            },
        });
        //sub-visual-lnb01
        var subLnb01 = new Swiper('.sub-visual-lnb01 .sub-lnb01.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 5,
            navigation: {
                nextEl: '.sub-visual-lnb01 .swiper-button-next',
                prevEl: '.sub-visual-lnb01 .swiper-button-prev',
            },
        });
        //sub-visual-lnb02
        var subLnb02 = new Swiper('.sub-visual-lnb02 .sub-lnb01.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 5,
            navigation: {
                nextEl: '.sub-visual-lnb02 .swiper-button-next',
                prevEl: '.sub-visual-lnb02 .swiper-button-prev',
            },
        });
        //sub-visual-lnb03
        var subLnb03 = new Swiper('.sub-visual-lnb03 .sub-lnb01.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 5,
            navigation: {
                nextEl: '.sub-visual-lnb03 .swiper-button-next',
                prevEl: '.sub-visual-lnb03 .swiper-button-prev',
            },
        });
    } else if (numLnb <= 4) {
        //sub-visual-lnb
        var subLnb = new Swiper('.sub-visual-lnb .sub-lnb01.swiper-container', {
            slidesPerView: numLnb,
            spaceBetween: 0,
            navigation: {
                nextEl: '.sub-visual-lnb .swiper-button-next',
                prevEl: '.sub-visual-lnb .swiper-button-prev',
            },
        });
        //sub-visual-lnb01
        var subLnb01 = new Swiper('.sub-visual-lnb01 .sub-lnb01.swiper-container', {
            slidesPerView: numLnb,
            spaceBetween: 0,
            navigation: {
                nextEl: '.sub-visual-lnb01 .swiper-button-next',
                prevEl: '.sub-visual-lnb01 .swiper-button-prev',
            },
        });
        //sub-visual-lnb02
        var subLnb02 = new Swiper('.sub-visual-lnb02 .sub-lnb01.swiper-container', {
            slidesPerView: numLnb,
            spaceBetween: 0,
            navigation: {
                nextEl: '.sub-visual-lnb02 .swiper-button-next',
                prevEl: '.sub-visual-lnb02 .swiper-button-prev',
            },
        });
        //sub-visual-lnb03
        var subLnb03 = new Swiper('.sub-visual-lnb03 .sub-lnb01.swiper-container', {
            slidesPerView: numLnb,
            spaceBetween: 0,
            navigation: {
                nextEl: '.sub-visual-lnb03 .swiper-button-next',
                prevEl: '.sub-visual-lnb03 .swiper-button-prev',
            },
        });
    }


    $(".swiper-container").each(function () {
        $(".swiper-container .swiper-slide").on('click', function () {
            var inx = $(this).index();

            $(this).siblings().removeClass("on");
            $(this).addClass("on");

            $(this).parent().parent().next('.tab-body').children('.tab-cont').siblings().removeClass("on");
            $(this).parent().parent().next('.tab-body').children(".tab-cont:eq(" + inx + ")").addClass("on")
        });
    });

}
//비트코인 슬라이더
function bView_swiper() {

    var bViewSwiper = new Swiper('.bView-slider ', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
        //loop: true,
        pagination: {
            el: '.bView-slider .swiper-pagination',
            clickable: true, // 버튼 클릭 
        },
        navigation: {
            nextEl: '.bView-slider .swiper-button-next',
            prevEl: '.bView-slider .swiper-button-prev',
        },
    });
}
//프로필 슬라이더
function profile_swiper() {
    var profileSwiper = new Swiper('.profile-slider', {
        slidesPerView: 2,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

//이슈갤러리 슬라이더
function issue_gallery_swiper() {
    var issueGallerySwiper = new Swiper('.issue-slider', {
        slidesPerView: 3,
        spaceBetween: 7,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
    });
}

//지자체 뉴스 슬라이더
function local_reg_swiper() {
    var localRegSwiper = new Swiper('.local-slider', {
        slidesPerView: 2,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true
    });

    $('.local-reg-area .local-slider .swiper-wrapper .swiper-slide a').on('click', function () {
        $(this).parent().siblings().removeClass("on");
        $(this).parent().addClass("on");
    });

}

// 상단 비쥬얼 
function visual_slider() {
    $('.swiper-container.ui-slider').each(function () {
        var uiSlider = new Swiper($(this), {
            //loop: true, 
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            spaceBetween: 5,
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // 버튼 클릭 
            },
            navigation: {
                nextEl: $(this).children('.swiper-button-next'),
                prevEl: $(this).children('.swiper-button-prev'),
            },
        });
    });
}

//ir 상단 비쥬얼 
function ir_visual_slider() {
    var uiSlider = new Swiper('.swiper-container.ui-ir-slider', {
        //loop: true, 
        spaceBetween: 0,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // 버튼 클릭 
        },
    });
}

// 웹툰 비쥬얼 
function webtoon_slider() {
    var webtoonSlider = new Swiper('.webtoon-slider', {
        //loop: true, 
        spaceBetween: 15,
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // 버튼 클릭 
        },
    });
}

//slider view - 한페이지로 보기, 슬라이더로 보기
function ui_slider_view() {
    var uiSliderView = new Swiper('.swiper-container.ui-slider-view', {
        //loop: true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-container.ui-slider-view .swiper-button-next',
            prevEl: '.swiper-container.ui-slider-view .swiper-button-prev',
        },
        centeredSlides: true,
        autoplayDisableOnInteraction: true // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
    });


    /* 슬라이더 스위치 버튼 */
    $('.change-btn').on('click', function (e) {
        if ($(this).hasClass('on') == false) {
            $(this).addClass('on').text('한 페이지로 보기');

            $('.ui-slider-view').children('div:first').addClass('swiper-wrapper');
            $('.ui-slider-view .swiper-button-prev').show();
            $('.ui-slider-view .swiper-button-next').show();
        } else {
            $(this).removeClass('on').text('슬라이드로 넘겨보기');

            uiSliderView.allowTouchMove = false;
            $('.ui-slider-view .swiper-wrapper').removeAttr('style');
            $('.ui-slider-view .swiper-wrapper').removeClass();
            $('.ui-slider-view .swiper-slide').removeAttr('style');
            $('.ui-slider-view .swiper-slide').removeClass().addClass('swiper-slide');
            $('.ui-slider-view .swiper-button-prev').hide();
            $('.ui-slider-view .swiper-button-next').hide();
        }
    });
}


//table slider 
function tbl_slider() {
    var tblSlider = new Swiper('.tbl-slider', {
        loop: false,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true,
        },
    });
}

//box01 slider - mywow main
function box01_slider() {
    var box01Slider = new Swiper('.box01-slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 15,
        slidesPerView: 'auto',
    });
}

// box slider  
function box_slider() {
    var boxSlider = new Swiper('.box-slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 5,
        slidesPerView: 'auto',
        autoplay: {
            delay: 3500,
            disableOnInteraction: true,
        },
    });
}

// reporter slider - finance main
function reporter_slider() {
    var reporterSlider = new Swiper('.reporter-slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 15,
        slidesPerView: 'auto',
    });
}

// chart slider - finance main 
function chart_slider() {
    var chartSlider = new Swiper('.chart-slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 15,
        slidesPerView: 'auto',
        pagination: {
            el: '.chart-slider .swiper-pagination',
            clickable: true, // 버튼 클릭 
        },
    });
}

//movie slider - main main
function movie_slider() {
    var movieSlider = new Swiper('.movie-slider', {
        observer: true,
        observeParents: true,
        spaceBetween: 5,
        slidesPerView: 'auto',
    });
}

//main slider - main main
function main_slider() {
    var mainSlider = new Swiper('.main-slider.swiper-container', {
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// main slider click event - main main
function onClick_event() {
    $('.img-area.onClick-event').on('click', function () {
        $('.box-cont-box .box-wowPort-cont').show();
    });
}

//photo slider - photo main
function photo_slider() {
    var photoSlider = new Swiper('.photo-slider.swiper-container', {
        observer: true,
        observeParents: true,
        breakpoints: {
            // when window width is <= 767px
            767: {
                spaceBetween: 5,
                slidesPerView: 'auto',
            },
            // when window width is <= 1023px
            1023: {
                spaceBetween: 5,
                slidesPerView: 5,
            },
            // when window width is <= 2000px
            2000: {
                spaceBetween: 5,
                slidesPerView: 9,
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

}

//photo visul slider - photo sub 포토영상리스트 ---포토영상리스트 prev,next btn 슬라이드도 navigation 속성 추가함 - 김성은 12월 31일
function visul_slider() {
    var visulSlider = new Swiper('.visul-slider.swiper-container', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

}

//인기포토 slider - photo main
function hot_photo_slider() {
    var hotPhotoSlider = new Swiper('.hot-photo-slider.swiper-container', {
        observer: true,
        observeParents: true,
        spaceBetween: 0,
        slidesPerView: 2
    });
}

// tv - 온에어 slider banner
function bann_auto_slider() {
    var hotPhotoSlider = new Swiper('.bann-auto-slider.swiper-container', {
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        spaceBetween: 0,
        slidesPerView: 1
    });
}

// 20180307 tv - 방송 리스트 레이아웃
function program_list_rayout() {
    var program_list_even = $('.list-media > ul > .program-list:even'),
        program_list_odd = $('.list-media > ul > .program-list:odd'),
        even_height = "",
        odd_height = "";

    program_list_even.each(function (i, even) {
        even_height = $(even).find('.cont-area').height();
        program_list_odd.each(function (j, odd) {
            if (j == i) {
                odd_height = $(odd).find('.cont-area').height();
                console.log(even_height + "    " + i + ":::" + odd_height + "       " + j);

                if (odd_height > even_height) { $(even).find('.cont-area').height(odd_height); }
                else if (even_height > odd_height) { $(odd).find('.cont-area').height(even_height); }


                console.log(even_height + " : " + odd_height);
                return false;
            }
        });
    });
}










