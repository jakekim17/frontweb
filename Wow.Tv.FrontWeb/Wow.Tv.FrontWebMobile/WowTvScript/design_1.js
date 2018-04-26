



// slick 상단 GNB 메뉴 
function gnb_swipe() { 
	$('.gnb-swipe').slick({
		//dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,
		useCSS : true,
		swipe : true,
		ariableWidth: true,
		responsive : true,
		adaptiveHeight: true
	});
	$(".gnb-swipe li").click(function(){
		$(this).addClass("on").siblings().removeClass("on")
	});
}


// bxslider 상단 비쥬얼 
function top_visual() { 
	$('.top-visual-area').bxSlider({
		// speed: 500,        // 이동 속도를 설정
		// pause: 400, // 일시정지하는 시간
		// slideWidth: 179,   // 슬라이드 너비
		// hideControlOnEnd: true,
		mode: 'horizontal',// 가로 방향 수평 슬라이드
	
		pager: true,      // 현재 위치 페이징 표시 여부 설정
		moveSlides: 1,     // 슬라이드 이동시 개수
		minSlides: 1,      // 최소 노출 개수
		maxSlides: 1,      // 최대 노출 개수
		slideMargin: 30,    // 슬라이드간의 간격
		auto: true,        // 자동 실행 여부
		autoHover: true,   // 마우스 호버시 정지 여부
		controls: true,    // 이전 다음 버튼 노출 여부
		infiniteLoop: true,	 // 무한 루프 설정
		autoDelay: 0
	});
}





// // 상단 GNB 메뉴 
// function gnb_swipe() { 
// 	$('.gnb-swipe').slick({
		
// 		dots: false,
// 		speed : 300 , /* 이미지가 슬라이딩시 걸리는 시간 */
// 		infinite: true,
// 		autoplaySpeed: 3000, /* 이미지가 다른 이미지로 넘어 갈때의 텀 */
		
// 		slidesToShow: 4,
// 		slidesToScroll: 4,
// 		centerMode: true,
// 		useCSS : true, // css 사용
// 		fade: false,
		
// 		//focusOnSelect : true,
// 		//useCSS : true, // css 사용
// 		// infinite: true,
// 		// speed: 300,
// 		// slidesToShow: 1,
// 		//variableWidth: true
// 	});
	
// 	// $(".gnb-swipe li").click(function(){
		
		
// 	// 	$(this).addClass("on").siblings().removeClass("on")
		
// 	// });
	
// }


