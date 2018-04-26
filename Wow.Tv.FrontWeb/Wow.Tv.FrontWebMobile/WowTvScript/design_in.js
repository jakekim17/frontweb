$(document).ready(function(){
    bitcoin(); // 비트코인
    bView_swiper(); // 비트코인
    // switch_btn(); // 통합검색 스위치 버튼 
    main_search(); //통합 메인 검색
    gnb_top()    // GNB 드랍 최상단 버튼 

    ui_calendar(); // 캘린더 
    menu_list(); // 전체메뉴 
    file_input(); // 인풋 파일 
    gnb_swiper_new(); //swiper 상단 GNB 메뉴 
    tab_style(); // 텝
    tab_style_ir(); // 텝

    box_accordion(); // 아코디언 *김성은 과장
    menu_accordion(); // 메뉴 아코디언 *김성은 과장
    list_accordion(); // 목록 아코디언 *모정훈 주임
    menu_view(); // 메뉴 view *김성은 과장
    search_toggle(); // 검색영역 > 항목검색 토글 *모정훈 주임
    reply_toggle(); // 댓글 아코디언 *모정훈 주임
    broadcast_toggle(); // TV main 방송 미디어 영역 아코디언 *모정훈 주임
    moresee_toggle(); // 뉴스 main > 많이 본 뉴스 > 더보기 *모정훈 주임
    date_swiper(); // 날짜 슬라이더
    profile_swiper(); // 프로필 슬라이더 *모정훈 주임
    issue_gallery_swiper(); // 이슈갤러리 슬라이더 *모정훈 주임
    local_reg_swiper(); // 지자체 뉴스 슬라이더 *모정훈 주임

    box_allPay_click(); //마이페이지 총 결제금액 클릭 *김성은 과장
    tab_btn(); // 마이페이지 tab btn *김성은 과장
    my_li_check(); // checkbox 클릭시 그 라인 배경색 회식으로 변경 *김성은 과장
    ui_slider_view(); //slider view - 한페이지로 보기, 슬라이더로 보기
    visual_slider(); // 슬라이더
    bann_auto_slider();  //tv - 온에어 slider banner
    tbl_slider(); //table slider
    check_btn(); // 추천 & 핀 하기  
    box_slider(); // box slider - mywow main
    reporter_slider(); // reporter slider - finance main
    chart_slider(); // chart slider - finance main 
    topBtn();  // 스크롤 탑바/상단가기 버튼
    webtoon_slider();  // 웹툰 비쥬얼
    movie_slider();  //movie slider - main main
    main_slider();  //main slider - main main
    onClick_event();  //main slider click event - main main
    photo_slider();  //photo slider - photo main
    hot_photo_slider(); //인기포토 slider - photo main
    visul_slider(); //photo visul slider - photo sub 포토영상리스트
    ir_visual_slider();  //ir 상단 비쥬얼
    sell_bar();  // 금융 - 종목상세 
    box01_slider(); //box01 slider - mywow main

    reply_box(); // 뉴스 댓글 달기    

    ui_popup(); // 레이어 팝업 

    search_menu(); // 통합 검색 상단 
    search_choice(); // 통합 검색 선택
    footer_info(); // footer 사업자정보/한국경제TV패밀리 사이트 클릭시 CLOSE/OPEN

    if($(".movie-area").length > 0){
        video_area(); // 카드뉴스 동영상 
    }
    
    



    // tbl_slider(); // x테이블 슬라이드


    //date_swipe(); // 날짜별 스케쥴 표시 swipe  *모정훈 주임
    //gnb_swipe(); // slick 상단 GNB 메뉴 
    //gnb_swipe01(); //slick 3debth GNB 메뉴 *김성은 과장
    //gnb_swipe02(); //slick 3debth GNB type2 메뉴 *김성은 과장
    //top_visual(); // slick 비쥬얼
});



