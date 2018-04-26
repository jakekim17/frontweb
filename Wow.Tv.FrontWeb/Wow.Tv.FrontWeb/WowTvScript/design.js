
/* 스크롤 이벤트 */
$(document).scroll(function(){
    var ui_top = $(".top-banner-area").height(); // 상단의 베너 높이 값
    var top_height = 34; // 상단의 베너가 없을때의 높이 
    if($(".top-banner-area").css("display") == "none"){
        if($(document).scrollTop() > top_height){
            $('.contain-search').addClass('on');
            $('.contain-search').css({
                'position':'fixed'
            });
            $('.contain-util').css({
                'marginBottom':'71px'
            });
            $('.contain-sitemap').css({
                'position':'fixed',
                'top':'71px'
            });
        }else{
            $('.contain-search').removeClass('on');
            $('.contain-search').css({
                'position':'relative'
            });
            $('.contain-util').css({
                'marginBottom':'0'
            })
            $('.contain-sitemap').css({
                'position':'absolute',
                'top':'104px'
            });
        }
    }else {
        // console.log(scroll)
        if($(document).scrollTop() > ui_top){
            $('.contain-search').addClass('on');
            $('.contain-search').css({
                'position':'fixed'
            });
            $('.contain-util').css({
                'marginBottom':'71px'
            });
            $('.contain-sitemap').css({
                'position':'fixed',
                'top':'71px'
            });
        }else{
            $('.contain-search').removeClass('on');
            $('.contain-search').css({
                'position':'relative'
            });
            $('.contain-util').css({
                'marginBottom':'0'
            })
            $('.contain-sitemap').css({
                'position':'absolute',
                'top':'104px'
            });
        }
    }



    // 상단 스틱 예외 제거 
    $(".customer .contain-util").css({
        margin: "0px"
    })
    $(".mywow .contain-util").css({
        margin: "0px"
    })
    $(".search .contain-util").css({
        margin: "0px"
    })
});

	//2018-01-23 news_sub002_2.html 감정표현 부분 - 수정
	$(document).ready(function(){
		$(".box-section-emotion .box-emotion a").on("mouseover",function(){
			$(this).children().addClass("on");
			$(this).siblings().find(".on").removeClass("on");
		});
		$(".box-section-emotion .box-emotion a").on("mouseout",function(){
			$(".box-section-emotion .box-emotion a").siblings().find(".on").removeClass("on");
		});
	});
	


// 박스 스크롤 
$(window).on("load",function(){
    if($(".box-scroll").length > 0){
        $(".box-scroll").mCustomScrollbar({});
    }
});



/* select box */
$(document).ready(function() { 
	var selectTarget = $('.selector select'); 
	selectTarget.change(function(){ 
		var select_name = $(this).children('option:selected').text(); 
		$(this).siblings('label').text(select_name); 
	}); 
    selectTarget.change();
});

$(document).ready(function(){
    ui_popup(); // 레이어 팝업 
    main_tap();
    drop_box(); // 통합검색 드롭박스
    best_search(); // BEST 검색어 실시간 롤링
    // bottom_slider(); // 메인 하단 슬라이드 롤링
    
    rotate_rank(); // GNB 기사 롤링
    bitcoin(); // 비트코인
    if($('body .wrap').length > 0){
        quickMenu(); // 퀵 매뉴 공통
        quickBanner_view(); //퀵 배너
    }
 

    //bottom_slider_01(); // 메인 포토,영상 갤러리 슬라이드 롤링
    
    // 뉴스기사 스크롤
    /*if($('body.news.main').length > 0){
        ui_scroll();  // 뉴스기사 스크롤
    }*/
    // 뉴스기사 최신기사
    if($('body.news.sub').length > 0){
        //ui_scroll_1();  // 뉴스기사 스크롤
        //ui_scroll_2();  // 최신뉴스기사 타이틀
        //ui_scroll_3();  // 최신영상뉴스 기사 타이틀
    }
    
    // 포토/영상 상세
    if($('body.photo.photo-detail').length > 0){
        //ui_scroll_1();  // 뉴스기사 스크롤
        ui_scroll_4();  // 최신뉴스기사 타이틀
    }
    
    /* Layout 관련 : 좌우 사이드바 유무 */
    if($('.finance .contain-aside').length == 0 && $('.customer .contain-aside').length == 0 ){
        $('.popup-type1 .contain-content').css({'width':'auto'});
        $('.contain-content').css({'width':'auto'});
    }

    /* 체스박스, 라이오버튼 디자인 */
    if($('label.checkbox').size() > 0){
        checkBox_Ck();//checkbox
    }
    if($('label.radio').size() > 0){
        radioBtn_Ck();//radio
    }

    /* 캘린더 버튼 */
    if($('.search-local.date').length > 0){

        $('.search-local.date').datepicker({
            autoclose: true,
            language: "kr",
            orientation: "bottom left" // 캘린더 위치 
        });
        

    }else{}

    /* 금융 - 기업개요 버튼 */
    $('.btn-company').on('click',function(){
        if($(this).hasClass('on') != true){
            $(this).addClass('on');
            $('.contain-infor-company').show();
        }else{
            $(this).removeClass('on');
            $('.contain-infor-company').hide();
        }
    })

    /* 기업상세 정보 */
    $('.box-accordion-detail .btn-accordion-detail').on('click',function(){
        if($(this).hasClass('on') != true){
            $(this).addClass('on');
            $('.section-detail-infor-default').hide();
            $('.section-detail-infor-open').show();
        }else{
            $(this).removeClass('on');
            $('.section-detail-infor-default').show();
            $('.section-detail-infor-open').hide();
        }
    });


    /* Global Search */
    //$('.btn-globalsearch').on('click',function(){
    //    $('.box-search-global').animate({
    //        width: '319px'
    //    });
    //    $('.box-search-global').addClass('on')
    //});

    /* Global Sitemap */
    //$('.btn-sitemap button').on('click',function(){
    //    if($('.contain-search').hasClass('on') == true && $(this).parent().hasClass('on') != true){
    //        hs = 1;
    //    }else if($('.contain-search').hasClass('on') == true && $(this).parent().hasClass('on') == true){
    //        hs = 2;
    //    }else if($(this).parent().hasClass('on') != true){
    //        hs = 3
    //    }else if($(this).parent().hasClass('on') == true){
    //        hs = 4
    //    }

    //    switch(hs){

    //        case 1:
    //            $('.btn-sitemap').addClass('on');
    //            $('.contain-sitemap').animate({
    //                //height: '820px'
    //                height: $('.contain-sitemap .inner').height()
    //            },function(){
    //                $('.contain-sitemap').addClass('on');
    //            });
    //            $('.box-sitemap').delay(100).animate({
    //                top: '0',
    //                opacity: 1
    //            });
    //        break

    //        case 2:
    //            $('.box-sitemap').animate({
    //                top: '50px',
    //                opacity: 0
    //            });
    //            $('.contain-sitemap').removeClass('on');
    //            $('.contain-sitemap').animate({
    //                height: '0'
    //            },function(){
    //                $('.btn-sitemap').removeClass('on');
    //            });
    //        break;

    //        case 3:
                
    //            $('.btn-sitemap').addClass('on');
    //            $('.contain-sitemap').animate({
    //                //height: '820px'
    //                height: $('.contain-sitemap .inner').height()
    //            },function(){
    //                $('.contain-sitemap').addClass('on');
    //            });
    //            $('.box-sitemap').delay(100).animate({
    //                top: '0',
    //                opacity: 1
    //            });

    //        break;  

    //        case 4:
    //            $('.box-sitemap').animate({
    //                top: '50px',
    //                opacity: 0
    //            });
    //            $('.contain-sitemap').removeClass('on');
    //            $('.contain-sitemap').animate({
    //                height: '0'
    //            },function(){
    //                $('.btn-sitemap').removeClass('on');
    //            });
    //        break;

    //        default:

    //    }

    //});

    /* Global Navigation - Sub  */
    $('.contain-navigation .navigation-global >ul >li').on('mouseenter',function(){
        if($(this).find('ul').length > 0){
            $(this).find('>ul').show();
        }else{}
    });
    $('.contain-navigation .navigation-global >ul >li').on('mouseleave',function(){
        if($(this).find('ul').length > 0){
            $(this).find('>ul').hide();
        }else{}
    });


    /* Family Site : Footer */
    $('.btn-familysite').on('click',function(){
        console.log('test');
        if($(this).hasClass('on') != true){
            $('.btn-familysite').addClass('on');
            $('.contain-familysite').animate({
                height: '277px'
            });
        }else{
            $('.contain-familysite').animate({
                height: '0'
            },function(){
                $('.btn-familysite').removeClass('on');
            });
        }
    });

    /* 테이블 내 테이블 아코디언 */
    $('.btn-type4.view-detail').on('click',function(){
        $('.btn-type4.view-detail button').text('보기');
        if($(this).parent().parent().hasClass('on')){
            $(this).parent().parent('tr').removeClass('on');
            $(this).parent().parent().next('.accordion').removeClass('on');
            $(this).children('button').text('보기');
        }else{
            $('tr').removeClass('on');
            $(this).parent().parent('tr').addClass('on');
            $(this).parent().parent().next('.accordion').addClass('on');
            $(this).children('button').text('닫기');
        }
    });
    // $('.btn-type4.view-detail button').text('보기');
    // $('.btn-type4.view-detail').on('click',function(){
    //     if($(this).parent().parent().hasClass('on')){
    //         $('.accordion').removeClass('on').prev().removeClass('on');
    //         $(this).children('button').text('닫기');
    //         alert('111');
    //     }else{
    //         $('.accordion').removeClass('on').prev().removeClass('on');
    //         $(this).parent().parent().addClass('on').next().addClass('on');
    //         $(this).children('button').text('보기');
            
    //         alert('000');
    //     }
    // });

    /* 테이블 내 테이블 아코디언 닫기 */
    $('.btn-close-accordion').on('click',function(){
        $(this).parent().parent().parent().removeClass('on').prev().removeClass('on');
        $('.btn-type4.view-detail button').text('보기');
    });

    /* 답변달기 버튼 */
    $('.btn-reply').on('click',function(){
        if($(this).next('.box-reply-sub').hasClass('on') == false){
            $('.box-reply-sub').removeClass('on');
            $(this).next('.box-reply-sub').addClass('on');
        }else{
            $('.box-reply-sub').removeClass('on');
        }
    });

    /* 댓글 열림 */
    //$('.reply-head .btn-switch').addClass('on')
    $('.reply-body').hide();
    $('.reply-head .btn-switch').on('click',function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.reply-body').hide();
        }else{
            $(this).addClass('on');
            $('.reply-body').show();
        }
    });

    /* 오피니언 리스트 열림/닫침 */
    $('.opinion-aside-area .obj').on('click',function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.opinion-aside-area .obj-view').slideDown();
        }else{
            $(this).addClass('on');
            $('.opinion-aside-area .obj-view').slideUp();
        }
    });

    /* 부동산리스트 열림/닫침 */
    $('.land-map-area .map-view .obj').on('click',function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.land-map-area .map-location').slideDown();
        }else{
            $(this).addClass('on');
            $('.land-map-area .map-location').slideUp();
        }
    });
    
    /* 달력 */
    $('.calendar-news-week ul li a').on('click',function(){
    	$('.calendar-news-week ul li a').removeClass('on');
    	$(this).addClass('on');
    });
    
    
 
    

    if($('.bxslider').length > 0){
        
        $('.list-type-thumnail.bxslider ul').bxSlider({
            minSlides: 1,
            slideWidth: 250,
            slideMargin: 0,
            pager: true,
            controls:false,
            touchEnabled:true
        });

        /* 슬라이더 */
        /*$('.contain-news-like ul').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 245,
            slideMargin: 0,
            touchEnabled:false
        });*/

        $('.contain-like-news ul').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            pager: false,
            slideWidth: 196,
            slideMargin: 31,
            touchEnabled:false
        });

        /* News 본문 영상 콘텐츠 - 큰화면 */
        /*$('.article-video.full ul').bxSlider({
            minSlides: 5,
            maxSlides: 5,
            slideWidth: 197,
            slideMargin: 0,
            touchEnabled:false
        });*/
        //$('.arti-video.full ul').bxSlider({
        //    minSlides: 1,
        //    maxSlides: 4,
        //    slideWidth: 167,
        //    slideMargin: 20,
        //    arrows:false,
        //    pager:false,
        //    touchEnabled:false
        //});
        /* News 본문 영상 콘텐츠 */
        $('.article-video.small ul').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 187,
            slideMargin: 0,
            control:false,
            touchEnabled:false
        });
        
        /* 상단 슬라이더 */
        $('.top-banner-area .banner-slider ul').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            slideWidth: 1200,
            slideMargin: 0,
            pager: false,
            touchEnabled:false,
            auto: true // 이미지 회전이 자동으로 됨
        });

        /* 마이페이지 메인 */
        $('.myfav-box ul').bxSlider({
            minSlides: 1,
            //slideWidth: 1200,
            slideMargin: 0,
            pager: false,
            touchEnabled:false,
            auto: true // 이미지 회전이 자동으로 됨
        });


        $('.top-slider ul').bxSlider({
            minSlides: 8,
            maxSlides: 8,
            slideWidth: 1200,
            moveSlides: 1,
            pager: false,
            control:true,
            touchEnabled:false,
            auto: true // 이미지 회전이 자동으로 됨
            
        });

       
        

        ///* 웹드라마 */
        //$('.box-webDrama-slider ul').bxSlider({
        //    minSlides: 1,
        //    maxSlides: 3,
        //    slideWidth: 490,
        //    slideMargin: 0,
        //    pager: false,
        //    autoControls:true,
        //    controls:true,
        //    auto: true, // 이미지 회전이 자동으로 됨
        //});
      
        
        
        // 오피니언 메인 상단 슬라이드
         $('.serially ul').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            //slideWidth: 220,
            slideMargin: 0,
            pager: false,
            touchEnabled:false,
            auto: true // 이미지 회전이 자동으로 됨
        
            
        });
        
      // 뉴스 서브 상단 메뉴 
         var txtTopLength = $('.sub-visual-area .top-menu .box ul li a span').width();
         //alert(txtTopLength)
         $('.sub-visual-area .top-menu ul').bxSlider({
        	 mode: 'horizontal',
             minSlides: 1,
             maxSlides: 20,
             moveSlides: 1,
             slideWidth: txtTopLength + 150,
             slideMargin: 0,
             infiniteLoop: false,
             hideControlOnEnd: false,
             pager: false,
             //captions: false,
             touchEnabled:true
         });
        // 뉴스 서브 그룹형  
        var txtLength = $('.sub-visual-area .middle-area .menu ul li').width();
     	var tvMiddleSlider = $('.sub-visual-area .middle-area .menu ul').bxSlider({
     	  	mode: 'horizontal',
     	    minSlides: 1,
     	    maxSlides: 20,
     	    moveSlides: 1,
     	    slideWidth: txtLength + 50,
     	    slideMargin: 0,
     	    infiniteLoop: false,
     	    hideControlOnEnd: false,
     	    touchEnabled:false,
     	    pager: false
     	});
        
        // 뉴스 서브 하단 메뉴 
        $('.sub-visual-area .bottom-area .menu ul').bxSlider({
       	 	mode: 'horizontal',
            minSlides: 1,
            maxSlides: 20,
            moveSlides: 1,
            slideWidth: 170,
            slideMargin: 0,
            infiniteLoop: false,
            hideControlOnEnd: false,
            touchEnabled:true,
            pager: false
        });


        ////var imageSlider= 
        //$('.broad-tv-slider ul').bxSlider({
        //    minSlides: 3,
        //    maxSlides: 3,
        //    slideWidth: 419,
        //    moveSlides: 1,
        //    mode:'vertical',
        //    //captions: true,
        //    infiniteLoop: false,
        //    //pager:false,
        //    //speed: 500,
        //    //auto: true
        //    //touchEnabled:false
        //    //preloadImages: 'all' ,
            
        //});


        // tv실시간보기 하단 광고 - 팝업
         $('.adv-v-slider ul').bxSlider({
            minSlides: 1,
            maxSlides: 3,
            slideWidth: 752,
            mode:'vertical',
            pager: false,
            loop:true,
            touchEnabled:false,
            auto: true // 이미지 회전이 자동으로 됨
        });

        //// tv실시간보기 - 팝업
        //$('.movie-slider ul').bxSlider({
        //    minSlides: 5,
        //    maxSlides: 10,
        //    slideWidth: 136,
        //    pager: false,
        //    touchEnabled:false,
        //    auto: false // 이미지 회전이 자동으로 됨
        //});

        //// tv연합형 - 파트너스정보
        // $('.box-partner-infor ul').bxSlider({
        //    minSlides: 4,
        //    maxSlides: 8,
        //    slideWidth: 120,
        //    pager: false,
        //    touchEnabled:false,
        //    auto: false // 이미지 회전이 자동으로 됨
        //});
        // 뉴스최신기사 상세 - 베스트 포토
        $('.bitcoin-slider > ul').bxSlider({
            minSlides: 1,
            slideWidth: 300,
            // pager: true,
            touchEnabled:false,
            auto: false // 이미지 회전이 자동으로 됨
        });



        // 뉴스최신기사 상세 - 베스트 포토
         $('.img-silder ul').bxSlider({
            minSlides: 1,
            slideWidth: 300,
            pager: true,
            touchEnabled:false,
            auto: false // 이미지 회전이 자동으로 됨
        });

        // 금융메인 - 베스트 포토
          $('.part-silder').bxSlider({
             minSlides: 1,
             slideWidth: 479,
             controls:false,
             pager: true,
             touchEnabled:false,
             auto: false // 이미지 회전이 자동으로 됨
        });
          
         // newsMain - 와우넷탭안에 베스트 수익률
          $('.box-type01.type01 .box-img-chart > .box > div').bxSlider({
             minSlides: 1,
             slideWidth: 499,
             moveSlides: 1,
             infiniteLoop: true,
             pager: true,
             controls:true,
             touchEnabled:false,
             auto: false // 이미지 회전이 자동으로 됨
         });

          $('.box-type01.type02 .slider-img div.obj-cont').bxSlider({
              minSlides: 1,
              slideWidth: 'auto',
              moveSlides: 1,
              infiniteLoop: true,
              controls:true,
              pager: true,
              touchEnabled:false,
              auto: false // 이미지 회전이 자동으로 됨
          });
        /* IR 메인 */
        $('.ir-main-slider ul').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            speed: 700,
            /*slideWidth: 875,*/
            responsive: true,
            controls:false,
            pager:true,
            touchEnabled:false,
            auto:true, // 이미지 회전이 자동으로 됨
            autoHover:true // 마우스 호버시 애니메이션 정지 여부
        });

        /* 본문 슬라이더 이미지 */
        var imageSliderNews= $('.news-slider-images ul').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            slideWidth: 600,
            pager:false,
            touchEnabled:false
        });
        
        /* 포토/영상 > 리스트 슬라이더 이미지 */
        var imageSlider= $('.photo-slider-images ul').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            slideWidth: 600,
            pager:false,
            touchEnabled:false
        });

        imageSlider
    }else{

    }
    
    ///* time bar */
    //$(".time-bar > div > div")
    //    .mousemove(function(e) {   

    //        var $targetDiv = $(this);

    //        if(e.pageX - $targetDiv.offset().left <= 1105){

    //            $('.back-white').animate({
    //                    opacity : 1,
    //                    left: e.pageX - $targetDiv.offset().left
    //                }, 0, function() {
    //                // Animation complete.
    //            });
    //            $('.back-black .line').css({'opacity' : '0'});

    //        }else if(e.pageX - $targetDiv.offset().left > 1105){
    //            return false;
    //        }

    //    })
    //    .mouseleave(function() {


    //        $('.back-white').animate({
    //                opacity : 0
    //            }, 0, function() {
    //            // Animation complete.
    //        });
    //        $('.back-black .line').css({'opacity' : '1'});
    //});

    //$(".time-bar > div > div").on('click', function(e){

    //    $(".time-bar > div > div ul li").css({'opacity' : '0'});
    //    var $targetDiv = $(this);
    //    var num = parseInt((e.pageX - $targetDiv.offset().left)/24);
        
    //    //alert(parseInt((e.pageX - $targetDiv.offset().left)/24));
    //    $(this).children('ul').children("li:eq(" + num + ")").css({'opacity' : '1'});
        
    //});

    /* tv sub 2debth click시 위에 빨간점 추가 */
    $('.sub-visual-area .middle-area .menu li').on('click', function(){
    	$(this).siblings().removeClass("on");
        $(this).addClass("on");
    }); 
    
    /* tv sub 3debth click시 노란선 고정 */
    $('.sub-visual-area .bottom-area .menu ul li').on('click', function(){
    	$(this).siblings().removeClass("on");
        $(this).addClass("on");
    });
    
    


    /* 한국경제TV방송 목록 보기 OPEN/CLOSE */
    $(".btn-arrow").on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().next('.box-line-type01').slideDown();
        }else{
            $(this).addClass('active');
            $(this).parent().next('.box-line-type01').slideUp();
        }
    });
    
    /* TV > 전체 프로그램 검색 결과 목록 보기 OPEN/CLOSE */
    $(".btn-tog").on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parent().next('.box-list-program').slideDown();
        }else{
            $(this).addClass('active');
            $(this).parent().next('.box-list-program').slideUp();
        }
    });

    /* 슬라이더 스위치 버튼 */
    $('.slider-switch').on('click',function(){
        if($(this).hasClass('on')  == false){
            $(this).addClass('on').find('button').text('슬라이드로 넘겨보기');
            imageSliderNews.destroySlider();
        }else{
            $(this).removeClass('on').find('button').text('한 페이지로 보기');
            imageSliderNews.reloadSlider();
        }
    });

    /* 팝업 닫기 */
    $('.btn-close-popup').on('click',function(){
        $('.popup-type1').hide();
    });
    
    
    /* tv실시간 - 팝업 - 크게보기 */
    $('.wrap-popup .obj-area .btn-p').on('click',function(){
        $('.obj-area .btn-p').removeClass('on');
        $(this).addClass('on');

        if($(this).hasClass('icon01')){
            $('.wrap-popup .movie-area').removeClass('big');
            $('.wrap-popup .movie-slider').show(); 

        }else if($(this).hasClass('icon02')){
            $('.wrap-popup .movie-area').addClass('big');
            $('.wrap-popup .movie-slider').hide();            
        }else if($(this).hasClass('icon03')){
            //
        }
    });
    
    /* 통합메인 탭*/
	$(".tab-listType1 .box > ul li").click(function(){ 
        var inx = $(this).index();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(this).parent().parent().parent().next('.tab-box').find("div.box-img-news").siblings().removeClass("on");
        $(this).parent().parent().parent().next('.tab-box').find("div.box-img-news:eq(" + inx + " ) " ).addClass("on");

    });

    /* 와우넷/와우파/와우스타 탭*/
	$(".tab-type1 > ul li").click(function(){ 
        var inx = $(this).index();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(this).parent().parent().next('.tab-body').find("div.tab-box").siblings().removeClass("on");
        $(this).parent().parent().next('.tab-body').find("div.tab-box:eq(" + inx + " ) " ).addClass("on");
        
    });
    
    /* 메인 갤러리 탭  */
    var isOneActivate = true ;
    var isTwoActivate = false ;
	$(".tab-type1 > ul li").click(function(){ 
        var inx = $(this).index();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(this).parent().parent().next('.tab-body').find("div.tab-box").siblings().removeClass("on");
        $(this).parent().parent().next('.tab-body').find("div.tab-box:eq(" + inx + " ) " ).addClass("on");
        
        if ( inx == 0 ) {
            if ( !isOneActivate ) new_gallery01() ;
        } else if ( inx == 1 ) {
            if ( isTwoActivate == false) {
                new_gallery02() ;
                isTwoActivate = true ;
            }
        }

    });
	
	
});




// 퀵 매뉴
function quickMenu(){
    /*if($('body').hasClass('main')){
        $('.quickMenu').css({'top' : ht_c});
    }*/

    $('.quick-silder > div').bxSlider({
        minSlides: 1,
        maxSlides: 2,
        slideMargin: 11,
        slideWidth: 'auto',
        moveSlides: 1,
        pager: true,
        control:true,
        //touchEnabled:false,
        //auto: true // 이미지 회전이 자동으로 됨
        
    });
    
	var ht_c = $('body .wrap').offset().top + 100; 
	$('.quickMenu').css({'top' : ht_c});

	$('.quickMenu .btn-top').bind("click", function(e) {
	    //var e = e + 300;
		$('.quickMenu > div > ul > li').removeClass('active');
        $('.quickMenu > div > div > div').hide();
        $('.quickMenu .btn-close').removeClass('btn-close').addClass('btn-open');
        $('.quickMenu > div > ul').animate({
            height: '50px'
        }, 500);
	    e.preventDefault();

	    $('body,html').animate({
	        scrollTop: 0
	    }, 500);
	});
	
    $('.quickMenu .btn-open').on('click', function(){
        if($(this).hasClass('btn-open')){
            $(this).removeClass('btn-open').addClass('btn-close');
            $('.quickMenu > div > ul').animate({
                    height: '283px'
                }, 500);
        }else{
            $(this).removeClass('btn-close').addClass('btn-open');
            $('.quickMenu > div > ul').animate({
                    height: '50px'
                }, 500);
        }
    });

    $('.quickMenu > div > ul > li').on('click', function(){
    	var inx = $(this).index();
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.quickMenu > div > ul > li').removeClass('active');
        	$('.quickMenu > div > div').children('div').hide();
        }else{
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.quickMenu > div > div').children('div').hide();
            $('.quickMenu > div > div').children('div:eq(' + inx + ')').show();
        }
    });

    $('.tab-listType1 .box > ul > li').on('click', function(){
    	var inx = $(this).index();
    	//alert(inx);
    	$(this).parent().parent().parent().next('.tab-body').find(".tab-cont").siblings().removeClass("on");
    	$(this).parent().parent().parent().next('.tab-body').find(".tab-cont:eq(" + inx + ")").addClass("on");
    });
    $(document).scroll(function(){
        
        var scorllY = $(document).scrollTop();
        var ht = $('.wrap');
        var ht_c = $('.wrap').offset().top + 100;  
        //alert(ht_c);
        
        
        //$('.quickMenu').css({'top' : ht_c});
        if(scorllY > ht.offset().top){
            //alert('111');
            
            $('.quickMenu').css({'position' : 'fixed', 'top' : '100px'});
            //$('.quickMenu').css({'top' : '100px'});
            
        }else {
            $('.quickMenu').css({'position' : 'absolute', 'top' : ht_c});
        }
    
    });
}


//퀵 배너
function quickBanner_view(){
	var htb_c = $('body .wrap').offset().top + 300; 
	$('.quickBanner').css({'top' : htb_c});

	$(document).scroll(function(){
        
        var scorllY = $(document).scrollTop();
        var htb = $('.wrap');
        var htb_c = $('.wrap').offset().top + 300;  
        //alert(ht_c);
        
        
        //$('.quickMenu').css({'top' : ht_c});
        if(scorllY > htb.offset().top){
            //alert('111');
            
            $('.quickBanner').css({'position' : 'fixed', 'top' : '300px', 'z-index': '0' });
            //$('.quickMenu').css({'top' : '100px'});
            
        }else {
            $('.quickBanner').css({'position' : 'absolute', 'top' : htb_c});
        }
    
    });
}

function irGnb(){
    // IR GNB영역 
    $(".gnb-area > .depth1 > li").mouseover(function(){
        $(this).siblings().removeClass("on")
        $(this).addClass("on").children().next().addClass("active").parent().nextAll().children().siblings().removeClass("active");
    });

    $(".depth3 > li").click(function(){
        $(this).siblings().removeClass("on")
        $(this).addClass("on").parent().parent().siblings().children().children().removeClass("on");
        $(this).parent().parent().addClass("on").children().css({display:"block"});
    });
}




// 뉴스기사 스크롤 //
/*function ui_scroll(){
	$(window).on("load, scroll", function(){
        var num = $(".point-height").offset().top - 70;
        var height =  $(document).scrollTop();
        var point_l = $(".point-height").offset().top + ($(".point-height").height() - $(".left-area .ui-scroll").height()) - 80;
        var point_r = $(".point-height").offset().top + ($(".point-height").height() - $(".right-area .ui-scroll").height()) - 80;

        //console.log(num + ":" + height);
		if(num <= height){
            $(".ui-scroll").addClass("fix");
            $(".ui-scroll").css({"top" : "70px"});
            var y_l = 0, y_r = 0;
            if(height > point_l){
                y_l = point_l - height;
            }
            $(".left-area .ui-scroll").css({
                "top" : (y_l + 70) + "px"
            });
            if(height > point_r){
                y_r = point_r - height;
            }
            $(".right-area .ui-scroll").css({
                "top" : (y_r + 70) + "px"
            });
		}else {
			$(".ui-scroll").removeClass("fix")
            $(".ui-scroll").css({
                "top" : "0"
            }); 
        }
	})
}*/




 // 최신뉴스기사 좌측 우측 스크롤 매칭
     
    
// 최신뉴스기사 상세 //
function ui_scroll_2(){
    $(window).scroll(function(e){
        var posY_win = $(window).scrollTop(); //스크롤 위치 값
        var obj_header = $(".wrap-right-adbox");
        var posY_h1 = $(".box-hot-news");
        $('.contain-search').css({
                'position':'relative'
        });
        $('.contain-util').css({
            'marginBottom':'0'
        });
        if(posY_win > obj_header.offset().top) {
            posY_h1.show();
            
        } else {
            posY_h1.hide();
        }
    });
}

function ui_scroll_3(){
    $(window).scroll(function(e){
        var posY_win = $(window).scrollTop(); //스크롤 위치 값
        var obj_header = $(".wrap-right-adbox");
        var posY_h1 = $(".box-hot-movie");
        $('.contain-search').css({
                'position':'relative'
        });
        $('.contain-util').css({
            'marginBottom':'0'
        });
        if(posY_win > obj_header.offset().top) {
            posY_h1.show();
            
        } else {
            posY_h1.hide();
        }
    });
}

//포토/영상 상세 //
function ui_scroll_4(){
    $(window).scroll(function(e){
        var posY_win = $(window).scrollTop(); //스크롤 위치 값
        var obj_header = $(".wrap-right-adbox");
        var posY_h1 = $(".box-hot-news");
        $('.photo-detail .contain-search').css({
                'position':'relative'
        });
        $('.photo-detail .contain-util').css({
            'marginBottom':'0'
        });
        if(posY_win > obj_header.offset().top) {
            posY_h1.show();
            
        } else {
            posY_h1.hide();
        }
    });
}

/* IR Header */
/*function irLayOut(){
    if($(window).height() < 1000){
        $('.ir .header').css({
            'position':'absolute',
            'height':$(document).height()
        });
        $('.ir .header .footer').css({
            'position':'absolute'
        });
        
    }else{
        $('.ir .header').css({
            'position':'fixed',
            'height': '100%'
        });
        $('.ir .header .footer').css({
            'position':'fixed'
        });
    }
}*/



// BEST 검색어 실시간 롤링
function best_search(){
    // var count = $('.rank-box li').length;
    // var height = $('.rank-box li').height();
    // var num = 0
    // function step(index) {
    //     $('.rank-box ol').animate({
    //         top: -height * index
    //     }, 800, function() {
    //        step((index + 1) % count);
           
    //     });
    // }

    // step(1);

    var count = $('#rank li').length  * 2;
    var height = $('#rank li').height();
    $('#rank  ol li').clone().appendTo('#rank ol');
    function step(index) {
        $('#rank ol').delay(500).animate({
            top: -height * index,
        }, 1000, function() {
            // console.log(index);
            if (index == (count/2) && index != 1) {
                $('#rank ol').css({top: 0}); 
                index = 0;
        }
            step((index + 1) % count);
        });
    }
    step(1);

    
};

// 하단 이미지 슬라이드 
// function bottom_slider(){
//     var flat = $(".img-area-slider").flipster({
//         itemContainer: 'ul',
//         itemSelector: 'li',
//         style: 'flat',            
//         buttons: true,
//         touch: false,
//         loop: true,
//         start: 'center',
//         scrollwheel: false,
//         enableMousewheel: true,
//         spacing: 0
//     });
    
// }

/*
function bottom_slider_01(){
    $(document).on('ready', function() {
        
       var flat = $(".img-area-slider.photo").flipster({
              itemContainer: 'ul',
              itemSelector: 'li',
              style: 'flat',            
              buttons: true,
              loop: true,
              start: 'center',
              scrollwheel: false,
              spacing: -0.05
          });
    });
}*/



// 레이어 팝업 
function ui_popup(){
	$('.btn-example').click(function(){
        var $href = $(this).attr('href');
        layer_popup($href);
        
    });
    function layer_popup(el){

        var $el = $(el);        //레이어의 id를 $el 변수에 저장
        var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.popup-type1').fadeIn() : $el.fadeIn();

        var $elWidth = ~~($el.outerWidth()),
            $elHeight = ~~($el.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        // 화면의 중앙에 레이어를 띄운다.
        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('.pop-close-btn').click(function(){
            isDim ? $('.popup-type1').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
            return false;
        });

        $('.layer .dimBg').click(function(){
            $('.popup-type1').fadeOut();
            return false;
        });

    }
	
}

function checkBox_Ck(){//checkbox
    var objCheckbox = $('label.checkbox');
    objCheckbox.each(function(){
        if($(this).find('input[type=checkbox]').is(':checked')){
            $(this).addClass('checked')
        }else{
            $(this).removeClass('checked');
        }
    });

    objCheckbox.on('click', function(){
        if($(this).find('input[type=checkbox]').is(':checked')){
            $(this).addClass('checked');
            $(this).find('input[type=checkbox]').attr('checked',true);
        }else{
            $(this).removeClass('checked');
            $(this).find('input[type=checkbox]').attr('checked',false);
        }
    });
}

function radioBtn_Ck(){//radio
    radioCk();
    $('label.radio input[type=radio]').on('click',function(){
        radioCk();
    });
    function radioCk(){
        $('label.radio input[type=radio]').each(function(){
            if($(this).is(':checked')){
                $(this).parent('label').addClass('checked')
            }else{
                $(this).parent('label').removeClass('checked')
            }
        })
    }
}




// 메인 상단 비쥬얼 텝
function main_tap(){
    var btn = $(".movie-list .cont-btn");
    var btn2 = $(".movie-list .cont-btn02");
    var ui_box = $(".hide-visual")

    var inx_menu = $(".partner-list li");


    btn.click(function(){
        ui_box.addClass("on")
    });
    btn2.click(function(){
        ui_box.removeClass("on")
    });

    inx_menu.click(function(){
        var inx = $(this).index()
        console.log (inx);
        $(this).siblings().removeClass("on")
        $(this).addClass("on");
        $(this).parent().parent().prev().children().children().siblings().removeClass("on")
        $(this).parent().parent().prev().find(".public-list > li:eq(" + inx + " ) " ).addClass("on");
        

        $(this).parent().parent().prev().children().siblings().removeClass("on")
        $(this).parent().parent().prev('.public-list').children("li:eq(" + inx + " ) " ).addClass("on");
        

        //.find(".public-list.type02 > li:eq( " + inx + " ) " ).addClass("on");
    })

    
}


// 통합검색 드롭박스 
function drop_box(){
    var ui_btn = $(".search-select-box .select-box .title");
    var ui_check = $(".search-select-box .select-box .check-box li a");

    ui_btn.click(function(){
        $(this).parent().siblings().removeClass("on")

        if($(this).parent().hasClass("on")){
            $(this).parent().removeClass("on")
        }else {
            $(this).parent().addClass("on");
        }
    });

    ui_check.click(function(){
        $(this).parent().addClass("on").siblings().removeClass("on")
    });
}





$(function(){
    
    btn_slider () /* 연예포토 마우스 오버 버튼 함수 삭제 하시 말 것*/
    function btn_slider (){
        var ui_btn = $(".top-slider .bx-controls-direction a")
        var speed = 200;
        ui_btn.mouseover(function(){
            $(this).css({
                "opacity" : "1"
            }, speed)
        });
        ui_btn.mouseout(function(){
            $(this).css({
                "opacity" : "0.5"
            }, speed)
        });
    }
    




    /* accordion 아코디언 */
    var accordion_btn = $(".accordion ul li a");
    accordion_btn.click(function(){
        $(this).parent().siblings().removeClass("on")
        if($(this).parent().hasClass("on")){
            $(this).parent().toggleClass("on")
        }else {
            $(this).parent().toggleClass("on")
        }
    });

    
    /* IR 사이트 */
    if($('.ir .header').hasClass('main') != true){
        irGnb()
    }else{
        $(".gnb-area > .depth1 > li").removeClass('on');
        $(".gnb-area > .depth1 > li >ul").removeClass('active');
        $(".gnb-area > .depth1 > li >a").on('mouseover',function(){
            $(this).parent().addClass('on');
            $(this).next().addClass('active');
            $(".ir .header.main .gnb-area > .depth1 > li >a").animate({
                paddingLeft: '20px'
            })
            $(".ir .header.main .gnb-area > .depth1 > li >ul").animate({
                right: '0'
            })
            $('.ir .header').delay(50000).removeClass('main');
            irGnb()
        })
        
    }

    /* IR 패밀리 사이트 */
    $(".family-area .family-title").click(function(){
        if($(".foot-select").css("display") == "none"){
            $(".foot-select").slideDown();
        }else{
            $(".foot-select").slideUp();
        }
    })
    $(".foot-select li a").click(function(){
        $(".foot-select").slideUp();
    });



    /* on off 버튼 */
    $(".title-btn .cheng-btn a").click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on")
        }else {
            $(this).addClass("on").siblings().removeClass("on")
        }
    })


    
    /* 마이페이지 기간별 조회 */
    $("td .add-btn").click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on")
        }else {
            $(this).addClass("on").siblings().removeClass("on")
        }
    })


	/* 마이와우 쿠폰 등록 */
    $(".btn-register").click(function(){
        $(this).addClass("on");
		$(".popup-type1.coupon").css("display","block");
    });

	$(".popup-type1.coupon .btn-close-popup").click(function(){
		$(".btn-register").removeClass("on");
	});

	/* 탭 */
	$(".tabs-area .tabs li").click(function(){ 
        var inx = $(this).index();
        $(this).siblings().removeClass("on");
        $(this).addClass("on");

        $(this).parent().next().children().siblings().removeClass("on")
        $(this).parent().next().find("div.tab-cont:eq(" + inx + " ) " ).addClass("on");

    });

    /* 공통 슬라이드 상단 베너  */
    if($(".top-banner-area .top-ad-btn").length > 0){
    	var ht_c = $('.wrap').offset().top + 40; 
        $(".top-banner-area .top-ad-btn").click(function(){
            $(".top-banner-area").slideUp();
            $(".header-sub .top-ad-btn span").css({
                display: "block"
            }); 
            $('.quickMenu').animate({ top: ht_c - 125 });

            setCookie("TopBannerShowHide", "Hide", 1); // 2018-01-08 개발에 필요한 코드
        });
        $(".header-sub .top-ad-btn").click(function(){
            $(".top-banner-area").slideDown();
            $(".header-sub .top-ad-btn span").css({
                display: "none"
            });
            $('.quickMenu').animate({ top: ht_c });

            setCookie("TopBannerShowHide", "Show", 1); // 2018-01-08 개발에 필요한 코드
        });
    }


    /* 뉴스 메인 최상단 우측 베너 */
    $(".news .right-visual .btn-list li").mouseover(function(){
        var inx = $(this).index();

        $(this).siblings().removeClass("on");
		$(this).addClass("on");

        $(this).parent().next().children().siblings().removeClass("on")
        $(this).parent().next().find("li:eq(" + inx + " ) " ).addClass("on");
        // $(".img-area li:eq(" + inx + ")").addClass("on")
    });
    

    /* 뉴스 메인 최상단 우측 베너 */
    $(".tabs-area .right-visual .btn-list li").mouseover(function(){
        var inx = $(this).index();

        $(this).siblings().removeClass("on");
		$(this).addClass("on");

        $(this).parent().next().children().siblings().removeClass("on")
        $(this).parent().next().find("li:eq(" + inx + " ) " ).addClass("on");
        // $(".img-area li:eq(" + inx + ")").addClass("on")
    });

    /* 뉴스 하단 탭 */
    $(".main-tab-area .tab li").click(function(){
        var inx = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")

        $(this).parent().next().children().siblings().removeClass("on")
        $(this).parent().next().find(".box:eq(" + inx + ")").addClass("on")
        
    });

    /* 많이 본 뉴스 > 종합, 연예스포츠 탭*/
    $(".tab-rank-area .tab-type2 li").click(function(){
        var inx = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")

        $(this).parent().parent().next().children().siblings().removeClass("on")
        $(this).parent().parent().next().find(".box:eq(" + inx + ")").addClass("on")
        
    });
    
    /* 통합검색 메인 > 프로그램, 인물 탭*/
    $(".bottom-box .tab-area li").click(function(){
        var inx = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")

        $(this).parent().parent().next().children().siblings().removeClass("on")
        $(this).parent().parent().next().find(".content:eq(" + inx + ")").addClass("on")
        
    });
    
    /* 통합검색 메인 > 프로그램, 인물 탭*/
    $(" .section-divide .right-box .tab-type2.sub-tab-type1 li").click(function(){
        var inx = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")

        $(this).parent().parent().next().children().siblings().removeClass("on")
        $(this).parent().parent().next().find(".content:eq(" + inx + ")").addClass("on")
        
    });
    
    /* 뉴스 하단 탭 */
    $(".move-news-area .tab li").click(function(){
        var inx = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")

        $(this).parent().parent().next().children().siblings().removeClass("on")
        $(this).parent().parent().next().find(".box:eq(" + inx + ")").addClass("on")
        
    });
    
    /* 많이 본 뉴스 > 종합, 연예스포 탭*/

    
    /* 뉴스 하단 탭 */
    $(".much-right li .sub-btn").click(function(){

        $(this).parent().siblings().children().removeClass("on")
        $(this).addClass("on")

        
    });

    // 뉴스 최신기사 상세 탭 2017-12-19 통합 메인 하단 슬라이더 충돌로 인한 주석 처리 
    $('.tab-area .tab-body .tab-cont').hide();
    $('.tab-area .tab-body .tab-cont:first').show();
    $('.tab-area .tabs > li').on('click', function(){
        $('.tab-area .tabs > li').removeClass('on');
        $(this).addClass('on');
        $('.tab-area .tab-body .tab-cont').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });


    


    

    /* 뉴스 최신기사 상세 - 카드뉴스 */
    $('.img-over-chann .img-area > .img-s img').on('mouseover', function(){
        var imgSrc = $(this).attr('src');
        $('.img-over-chann .img-area > .img-b img').attr('src', imgSrc);
    });

    /* 고객센터 메인페이지 탭 */
    $(".customer.main .bx-tabs .tab > li").click(function(){
    	var inx = $(this).index();
    	
    	$(this).siblings().removeClass("on");
    	$(this).addClass("on");
    	
    	$(this).parent().next().children().siblings().removeClass("on")
    	$(".tab-contents > li:eq(" + inx + ")").addClass("on")
    });

    

    /* sns-area 아이콘 */
    $(".sns-area a").click(function(){
        $(this).addClass("on").siblings().removeClass("on")
    })

    /* 영상뉴스 영상펼침 버튼 */
    $(".news.sub .btn-movie").click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.arti-video').removeClass('video-view');
            $('.arti-video .news-slider').css({'display' : 'block'});
            $('.news.sub .btn-movie .btn-type2 a span').text('영상펼침');
        }else{
            $(this).addClass('active');
            $('.arti-video').addClass('video-view');
            $('.arti-video .news-slider').css({'display' : 'none'});
            $('.news.sub .btn-movie .btn-type2 a span').text('영상닫침');
        }
    });


   /* 연예스포츠 더보기 */
   $('.entertain.sub .sub-issue-area .add-btn').on('click',function(){
	  
	   if($(this).hasClass('active01')){
            $(this).removeClass('active01');
            $(this).text("더보기")
	   		$('.entertain.sub .sub-issue-area .list-issue').animate({
	   			height: '377px'
	   		});
	   		$('.entertain.sub .sub-issue-area .list-issue .bx-type2').animate({
	   			height: '377px'
	   		});
	   	}else if($(this).hasClass('active')){
            $(this).removeClass('active').addClass('active01');
            $(this).text("닫기")
               
	   		$('.entertain.sub .sub-issue-area .list-issue').animate({
	   			height: '1171px'
	   		});
	   		$('.entertain.sub .sub-issue-area .list-issue .bx-type2').animate({
	   			height: '1171px'
	   		});
	   	}else{
            $(this).addClass('active');
           
	   		$('.entertain.sub .sub-issue-area .list-issue').animate({
	   			height: '774px'
	   		});
	   		$('.entertain.sub .sub-issue-area .list-issue .bx-type2').animate({
	   			height: '774px'
	   		});
	   	}
    });

	/* 이슈아이콘 삭제 */
	//$(document).on('click', '.entertain.sub .sub-issue-area .hash-area span.hash-tag a.del', function(){
 //   	$(this).parent().hide();
 //   });

	/* 이슈아이콘 생성 */
    $('.entertain.sub .sub-issue-area .list-issue .bx-type2 ul.list-rank li').on('click',function(){
    	txt = $(this).find('a').text();

    	num = "type";
    	int = Math.ceil( Math.random()*4);
    	
		numN = num + int;
		txtTag = "<span class='hash-tag "+ numN + "'> <a href='javascript:void(0)' class='hash-link'>" + txt + "<a href='javascript:void(0)' class='del'>삭제</a></span>";
    	$('.entertain.sub .sub-issue-area .hash-area .hash-tag:first-child').before(txtTag);
    });

    /* 금융 메인 - 김성은 */
    /* 국내/미국/아시아/환율 */
    $(".tab-body.type01 .tab-cont div .box").click(function(){
        $(this).addClass("on").next().addClass("on");
        $(this).parent().siblings().children().removeClass("on");
    });
        




    
    
    /* 인풋 파일 스크립트 */
    var uploadFile = $('.file-box .upload-btn');
    uploadFile.on('change', function(){
        var btn = $(".btn-file");
        var num = 0;
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
            $(".file-btn").addClass("on")
            $(".file-btn").click(function(){
                $(this).removeClass("on")
            })
            // 파일 리셋
            $('.file-btn').on('click', function(e){
                var $el = $('.file-name');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
            });
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.file-name').val(filename);
    });


})






// 스크롤시 매뉴 제어 
$(window).scroll(function(){
    $(".btn-sitemap").removeClass("on")
    $(".bitcoin-detail").removeClass("on") // 사이트멥 스크롤 시 버튼 아이콘 변경
    $(".contain-sitemap").css({
        "height" : 0  // 사이트멥 스크롤 시 닫힘
    });


    $(".datepicker").css({
        "display" : "none"  // 스크롤 시 캘린더 닫힘
    });

    $(".search-local.date input").blur(); // 캘린더 인풋박스 포커스 초기화 

    

    // 캘린더 GNB 영역의 z-index 값 변경 
    var menu_top = $(document).scrollTop()
    var num = 60
    if(menu_top <= num) {
        $('.contain-search').css({
            "z-index" : "0"
        })
    }else {
        $('.contain-search').css({
            "z-index" : "100"
        })
    }

    
})


// GNB 기사 롤링
function rotate_rank(){

    var lastRotateIndex = 1;
	var bRotate = true;
	var bRotateStop = false;

	if ($('.box-breaknews.list-slick dd ul li').length > 0)
		$('.box-breaknews.list-slick dd ul li').first().clone().appendTo('.box-breaknews.list-slick dd ul');

	function rotateRank(index) {
		setTimeout(function(){
            // console.log("ddd" + index)
			lastRotateIndex = index;
			if (!bRotate) {
				bRotateStop = true;
				return;
			}
			$('.box-breaknews.list-slick dd ul').animate({
				top: -$('.box-breaknews.list-slick dd ul li').height() * index
			}, 500, function() {
				if (index == $('.box-breaknews.list-slick dd ul li').length -1 ) {
					$('.box-breaknews.list-slick dd ul').css('top', '0px');
					index = 0;
				}
				rotateRank(index + 1);
			});
		}, 2000);
	}

    rotateRank(1);


    //$('.box-breaknews.list-slick dd li').clone().appendTo('.box-breaknews.list-slick dd ul');
    
    $(".box-breaknews.list-slick dd ul").mouseover(function(e) {
        bRotateStop = false;
        bRotate = false;
    });
    
    $(".box-breaknews.list-slick dd ul").mouseout(function(e) {
        bRotate = true;
        if(bRotateStop) {
            bRotateStop = false;
            rotateRank(lastRotateIndex);
        }

    }); 
}

// 비트코인 상단 
function bitcoin(){

    var lastRotateIndex = 1;
	var bRotate = true;
	var bRotateStop = false;

	if ($('.bitcoin-area ul.bit-list li').length > 0)
		$('.bitcoin-area ul.bit-list li').first().clone().appendTo('.bitcoin-area ul.bit-list');

	function rotateRank(index) {
		setTimeout(function(){
			lastRotateIndex = index;
			if (!bRotate) {
				bRotateStop = true;
				return;
			}
			$('.bitcoin-area ul.bit-list').animate({
				top: -$('.bitcoin-area ul.bit-list li').height() * index
			}, 500, function() {
				if (index == $('.bitcoin-area ul.bit-list li').length -1 ) {
					$('.bitcoin-area ul.bit-list').css('top', '0px');
					index = 0;
				}
				rotateRank(index + 1);
			});
		}, 2000);
	}

    rotateRank(1);


    //$('.box-breaknews.list-slick dd li').clone().appendTo('.box-breaknews.list-slick dd ul');
    
    $(".bitcoin-area ul.bit-list").mouseover(function(e) {
        bRotateStop = false;
        bRotate = false;
    });
    
    $(".bitcoin-area ul.bit-list").mouseout(function(e) {
        bRotate = true;
        if(bRotateStop) {
            bRotateStop = false;
            rotateRank(lastRotateIndex);
        }
    }); 

    $('.bitcoin-area .bitcoin-btn').click(function(){
        $(".bitcoin-area .bitcoin-detail").addClass("on");
        // bRotateStop = false;
        // bRotate = false;
    })
    $('.bitcoin-detail .close-btn').click(function(){
        $(".bitcoin-detail").removeClass("on");
        // bRotate = true;
        // if(bRotateStop) {
        //     bRotateStop = false;
        //     rotateRank(lastRotateIndex);
        // }
    })

}





























/* NEW 갤러리 2018-01-17 */
//****  쉽게 보는 뉴스 갤러리 
function new_gallery01(){
//    $(window).resize(function(){ full_width(); });

//     var full_width = function (){ //bg 100%
//         var wdW = $(window).width();
//         var bgW = (wdW - 1200)/2;
//         if($(window).width() < 1200){
//             $('.main_hot_sale .bn_bg').css({'width':'1200px','left':'-100px'}); //전체 컨텐츠 사이즈 1200 - 상품컨텐츠 간격 -100px (중앙정렬을 위해 사용)
//         }else{
//             $('.main_hot_sale .bn_bg').css({width:wdW,left:-bgW-100});
//         }
//     }
//     full_width();

    var loop_num = $('#main_bd_bn').find('.swiper-slide').length - 1;
    $('#main_bd_bn').find('.swiper-slide').each(function() {	//duplicate before index
        $(this).attr('data-index',''+$(this).index()+'')
    });
    var myBd_bn = new Swiper('#main_bd_bn',{
        speed: 950,
        slidesPerGroup: 1,
        loop: true,
        loopedSlides: loop_num,
        centeredSlides: true,
        slidesPerView: 'auto',
        onSlideChangeEnd : function() {
            myBd_bn.resizeFix();
            $('#main_bd_pg').find('.now').text(myBd_bn.activeLoopIndex+1);
        }
    })

    // 상품 클릭시 중앙으로 이동
    $('#main_bd_bn').find('.swiper-slide').bind('click keyup focus', function(e) {
        var bd_idx = $(this).attr('data-index');
        var bd_pos = $(this).offset().left;
        var activ_pos = $('#main_bd_bn').find('.swiper-slide-active').offset().left;
        var sd_width = $(this).outerWidth();

        if(!$(this).hasClass('swiper-slide-active')){ //move
            if($(this).hasClass('swiper-slide-duplicate')){
                if(bd_pos > activ_pos){
                    e.preventDefault();myBd_bn.swipeTo(bd_idx-((bd_pos-activ_pos)/sd_width),0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }else{
                    e.preventDefault();myBd_bn.swipeTo(myBd_bn.activeLoopIndex+loop_num+1,0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }
            }else{
                e.preventDefault();myBd_bn.swipeTo(bd_idx, 950 , true );
            }
        }
        fnCenter(400);
    });

    // 포지션 버튼
    var main_hot_sale = $('.main_hot_sale');
    main_hot_sale.find('.swiper-bn-left').on('click', function(e){
        $('#main_bd_bn').find('.swiper-slide-active').prev().trigger('click');
        return false;
    })
    main_hot_sale.find('.swiper-bn-right').on('click', function(e){
        $('#main_bd_bn').find('.swiper-slide-active').next().trigger('click');
        return false;
    });

    //상품이 중앙으로 왔을 시 사이즈 변경
    var fnCenter = function(speed){
        $('#main_bd_bn').find('.swiper-slide:not(.swiper-slide-active) .photo').stop(true, true).animate({'width':'225px','height':'225px','margin-top':'30px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#main_bd_bn').find('.swiper-slide-active .photo').stop(true, true).animate({'width':'300px','height':'300px','margin-top':'0'}, speed);
        
        $('#main_bd_bn').find('.swiper-slide:not(.swiper-slide-active) .photo img').stop(true, true).animate({'width':'225px','height':'225px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#main_bd_bn').find('.swiper-slide-active .photo img').stop(true, true).animate({'width':'300px','height':'300px','margin-top':'0'}, speed);
        
        $('#main_bd_bn').find('.swiper-slide:not(.swiper-slide-active)').stop(true, true).animate({'margin':'0',}, speed);
        $('#main_bd_bn').find('.swiper-slide-active').stop(true, true).animate({'margin':'0 50px', 'top' : '0'}, speed); // 중앙 정렬 좌우 정렬 값
        return false;
    }
    //Ready
    // myBd_bn.resizeFix();
    fnCenter(0);
}



function new_gallery02(){
//    $(window).resize(function(){ full_width(); });

    // var full_width = function (){ //bg 100%
    //     var wdW = $(window).width();
    //     var bgW = (wdW - 1200)/2;
    //     if($(window).width() < 1200){
    //         $('.main_hot_sale .bn_bg').css({'width':'1200px','left':'-100px'}); //전체 컨텐츠 사이즈 1200 - 상품컨텐츠 간격 -100px (중앙정렬을 위해 사용)
    //     }else{
    //         $('.main_hot_sale .bn_bg').css({width:wdW,left:-bgW-100});
    //     }
    // }
    // full_width();

    var loop_num = $('#main_bd_bn2').find('.swiper-slide').length - 1;
    $('#main_bd_bn2').find('.swiper-slide').each(function() {	//duplicate before index
        $(this).attr('data-index',''+$(this).index()+'')
    });
    var myBd_bn = new Swiper('#main_bd_bn2',{
        speed: 950,
        slidesPerGroup: 1,
        loop: true,
        loopedSlides: loop_num,
        centeredSlides: true,
        slidesPerView: 'auto',
        onSlideChangeEnd : function() {
            myBd_bn.resizeFix();
            $('#main_bd_pg').find('.now').text(myBd_bn.activeLoopIndex+1);
        }
    })

    // 상품 클릭시 중앙으로 이동
    $('#main_bd_bn2').find('.swiper-slide').bind('click keyup focus', function(e) {
        var bd_idx = $(this).attr('data-index');
        var bd_pos = $(this).offset().left;
        var activ_pos = $('#main_bd_bn2').find('.swiper-slide-active').offset().left;
        var sd_width = $(this).outerWidth();

        if(!$(this).hasClass('swiper-slide-active')){ //move
            if($(this).hasClass('swiper-slide-duplicate')){
                if(bd_pos > activ_pos){
                    e.preventDefault();myBd_bn.swipeTo(bd_idx-((bd_pos-activ_pos)/sd_width),0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }else{
                    e.preventDefault();myBd_bn.swipeTo(myBd_bn.activeLoopIndex+loop_num+1,0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }
            }else{
                e.preventDefault();myBd_bn.swipeTo(bd_idx, 950 , true );
            }
        }
        fnCenter(400);
    });

    // 포지션 버튼
    var main_hot_sale = $('.main_hot_sale');
    main_hot_sale.find('.swiper-bn-left').on('click', function(e){
        $('#main_bd_bn2').find('.swiper-slide-active').prev().trigger('click');
        return false;
    })
    main_hot_sale.find('.swiper-bn-right').on('click', function(e){
        $('#main_bd_bn2').find('.swiper-slide-active').next().trigger('click');
        return false;
    });

    //상품이 중앙으로 왔을 시 사이즈 변경
    var fnCenter = function(speed){
        $('#main_bd_bn2').find('.swiper-slide:not(.swiper-slide-active) .photo').stop(true, true).animate({'width':'225px','height':'300px','margin-top':'50px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#main_bd_bn2').find('.swiper-slide-active .photo').stop(true, true).animate({'width':'300px','height':'400px','margin-top':'0'}, speed);
        
        $('#main_bd_bn2').find('.swiper-slide:not(.swiper-slide-active) .photo img').stop(true, true).animate({'width':'225px','height':'300px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#main_bd_bn2').find('.swiper-slide-active .photo img').stop(true, true).animate({'width':'300px','height':'400px','margin-top':'0'}, speed);
        
        $('#main_bd_bn2').find('.swiper-slide:not(.swiper-slide-active)').stop(true, true).animate({'margin':'0',}, speed);
        $('#main_bd_bn2').find('.swiper-slide-active').stop(true, true).animate({'margin':'0 50px 0', 'top' : '0'}, speed); // 중앙 정렬 좌우 정렬 값
        return false;
    }
    //Ready
    // myBd_bn.resizeFix();
    fnCenter(0);
}


function new_gallery03(){
    var loop_num = $('#galley01').find('.swiper-slide').length - 1;
    $('#galley01').find('.swiper-slide').each(function() {	//duplicate before index
        $(this).attr('data-index',''+$(this).index()+'')
    });
    var myBd_bn = new Swiper('#galley01',{
        speed: 950,
        slidesPerGroup: 1,
        loop: true,
        loopedSlides: loop_num,
        centeredSlides: true,
        slidesPerView: 'auto',
        // onSlideChangeEnd : function() {
        //     myBd_bn.resizeFix();
        //     $('#main_bd_pg').find('.now').text(myBd_bn.activeLoopIndex+1);
        // }
    })

    // 상품 클릭시 중앙으로 이동
    $('#galley01').find('.swiper-slide').bind('click keyup focus', function(e) {
        var bd_idx = $(this).attr('data-index');
        var bd_pos = $(this).offset().left;
        var activ_pos = $('#galley01').find('.swiper-slide-active').offset().left;
        var sd_width = $(this).outerWidth();

        if(!$(this).hasClass('swiper-slide-active')){ //move
            if($(this).hasClass('swiper-slide-duplicate')){
                if(bd_pos > activ_pos){
                    e.preventDefault();myBd_bn.swipeTo(bd_idx-((bd_pos-activ_pos)/sd_width),0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }else{
                    e.preventDefault();myBd_bn.swipeTo(myBd_bn.activeLoopIndex+loop_num+1,0,0);fnCenter(0);myBd_bn.swipeTo(bd_idx,950,true);
                }
            }else{
                e.preventDefault();myBd_bn.swipeTo(bd_idx, 950 , true );
            }
        }
        fnCenter(400);
    });

    // 포지션 버튼
    var main_hot_sale = $('.main_hot_sale');
    main_hot_sale.find('.swiper-bn-left').on('click', function(e){
        $('#galley01').find('.swiper-slide-active').prev().trigger('click');
        return false;
    })
    main_hot_sale.find('.swiper-bn-right').on('click', function(e){
        $('#galley01').find('.swiper-slide-active').next().trigger('click');
        return false;
    });

    //상품이 중앙으로 왔을 시 사이즈 변경
    var fnCenter = function(speed){
        $('#galley01').find('.swiper-slide:not(.swiper-slide-active) .photo').stop(true, true).animate({'width':'225px','height':'300px','margin-top':'50px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#galley01').find('.swiper-slide-active .photo').stop(true, true).animate({'width':'300px','height':'400px','margin-top':'0'}, speed);
        
        $('#galley01').find('.swiper-slide:not(.swiper-slide-active) .photo img').stop(true, true).animate({'width':'225px','height':'300px'}, speed); // 리스트 이미지 사이즈 및 위치 
        $('#galley01').find('.swiper-slide-active .photo img').stop(true, true).animate({'width':'300px','height':'400px','margin-top':'0'}, speed);
        
        $('#galley01').find('.swiper-slide:not(.swiper-slide-active)').stop(true, true).animate({'margin':'0',}, speed);
        $('#galley01').find('.swiper-slide-active').stop(true, true).animate({'margin':'0 50px 0', 'top' : '0'}, speed); // 중앙 정렬 좌우 정렬 값
        return false;
    }
    //Ready
    // myBd_bn.resizeFix();
    fnCenter(0);
}

function PhotoNewsSlider(elementId) {
    var loop_num = $('#' + elementId).find('.swiper-slide').length - 1;
    $('#' + elementId).find('.swiper-slide').each(function () {
        $(this).attr('data-index', '' + $(this).index() + '')
    });
    var myBd_bn = new Swiper('#' + elementId, {
        speed: 950,
        slidesPerGroup: 1,
        loop: true,
        loopedSlides: loop_num,
        centeredSlides: true,
        slidesPerView: 'auto',
    })

    // 상품 클릭시 중앙으로 이동
    $('#' + elementId).find('.swiper-slide').bind('click keyup focus', function (e) {
        var bd_idx = $(this).attr('data-index');
        var bd_pos = $(this).offset().left;
        var activ_pos = $('#' + elementId).find('.swiper-slide-active').offset().left;
        var sd_width = $(this).outerWidth();

        if (!$(this).hasClass('swiper-slide-active')) { //move
            if ($(this).hasClass('swiper-slide-duplicate')) {
                if (bd_pos > activ_pos) {
                    e.preventDefault(); myBd_bn.swipeTo(bd_idx - ((bd_pos - activ_pos) / sd_width), 0, 0); fnCenter(0); myBd_bn.swipeTo(bd_idx, 950, true);
                } else {
                    e.preventDefault(); myBd_bn.swipeTo(myBd_bn.activeLoopIndex + loop_num + 1, 0, 0); fnCenter(0); myBd_bn.swipeTo(bd_idx, 950, true);
                }
            } else {
                e.preventDefault(); myBd_bn.swipeTo(bd_idx, 950, true);
            }
        }
        fnCenter(400);
    });

    // 포지션 버튼
    var main_hot_sale = $('.main_hot_sale');
    main_hot_sale.find('.swiper-bn-left').on('click', function (e) {
        $('#' + elementId).find('.swiper-slide-active').prev().trigger('click');
        return false;
    })
    main_hot_sale.find('.swiper-bn-right').on('click', function (e) {
        $('#' + elementId).find('.swiper-slide-active').next().trigger('click');
        return false;
    });

    //상품이 중앙으로 왔을 시 사이즈 변경
    var fnCenter = function (speed) {
        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active) .photo').stop(true, true).animate({ 'width': '225px', 'height': '300px', 'margin-top': '50px' }, speed); // 리스트 이미지 사이즈 및 위치 
        $('#' + elementId).find('.swiper-slide-active .photo').stop(true, true).animate({ 'width': '300px', 'height': '400px', 'margin-top': '0' }, speed);

        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active) .photo img').stop(true, true).animate({ 'width': '225px', 'height': '300px' }, speed); // 리스트 이미지 사이즈 및 위치 
        $('#' + elementId).find('.swiper-slide-active .photo img').stop(true, true).animate({ 'width': '300px', 'height': '400px', 'margin-top': '0' }, speed);

        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active)').stop(true, true).animate({ 'margin': '0', }, speed);
        $('#' + elementId).find('.swiper-slide-active').stop(true, true).animate({ 'margin': '0 50px 0', 'top': '0' }, speed); // 중앙 정렬 좌우 정렬 값
        return false;
    }
    fnCenter(0);
}

function SeeNewsSlider(elementId) {
    var loop_num = $('#' + elementId).find('.swiper-slide').length - 1;
    $('#' + elementId).find('.swiper-slide').each(function () {
        $(this).attr('data-index', '' + $(this).index() + '')
    });
    var myBd_bn = new Swiper('#' + elementId, {
        speed: 950,
        slidesPerGroup: 1,
        loop: true,
        loopedSlides: loop_num,
        centeredSlides: true,
        slidesPerView: 'auto',
    })

    // 상품 클릭시 중앙으로 이동
    $('#' + elementId).find('.swiper-slide').bind('click keyup focus', function (e) {
        var bd_idx = $(this).attr('data-index');
        var bd_pos = $(this).offset().left;
        var activ_pos = $('#' + elementId).find('.swiper-slide-active').offset().left;
        var sd_width = $(this).outerWidth();

        if (!$(this).hasClass('swiper-slide-active')) { //move
            if ($(this).hasClass('swiper-slide-duplicate')) {
                if (bd_pos > activ_pos) {
                    e.preventDefault(); myBd_bn.swipeTo(bd_idx - ((bd_pos - activ_pos) / sd_width), 0, 0); fnCenter(0); myBd_bn.swipeTo(bd_idx, 950, true);
                } else {
                    e.preventDefault(); myBd_bn.swipeTo(myBd_bn.activeLoopIndex + loop_num + 1, 0, 0); fnCenter(0); myBd_bn.swipeTo(bd_idx, 950, true);
                }
            } else {
                e.preventDefault(); myBd_bn.swipeTo(bd_idx, 950, true);
            }
        }
        fnCenter(400);
    });

    // 포지션 버튼
    var main_hot_sale = $('.main_hot_sale');
    main_hot_sale.find('.swiper-bn-left').on('click', function (e) {
        $('#' + elementId).find('.swiper-slide-active').prev().trigger('click');
        return false;
    })
    main_hot_sale.find('.swiper-bn-right').on('click', function (e) {
        $('#' + elementId).find('.swiper-slide-active').next().trigger('click');
        return false;
    });

    //상품이 중앙으로 왔을 시 사이즈 변경
    var fnCenter = function (speed) {
        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active) .photo').stop(true, true).animate({ 'width': '225px', 'height': '225px', 'margin-top': '50px' }, speed); // 리스트 이미지 사이즈 및 위치 
        $('#' + elementId).find('.swiper-slide-active .photo').stop(true, true).animate({ 'width': '300px', 'height': '400px', 'margin-top': '0' }, speed);

        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active) .photo img').stop(true, true).animate({ 'width': '225px', 'height': '225px' }, speed); // 리스트 이미지 사이즈 및 위치 
        $('#' + elementId).find('.swiper-slide-active .photo img').stop(true, true).animate({ 'width': '300px', 'height': '400px', 'margin-top': '0' }, speed);

        $('#' + elementId).find('.swiper-slide:not(.swiper-slide-active)').stop(true, true).animate({ 'margin': '0', }, speed);
        $('#' + elementId).find('.swiper-slide-active').stop(true, true).animate({ 'margin': '0 50px 0', 'top': '0' }, speed); // 중앙 정렬 좌우 정렬 값
        return false;
    }
    fnCenter(0);
}






$(document).ready(function(){
  
        new_gallery01();
        new_gallery03();    
    
    // new_gallery02();
   
})