function checkLogin() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '로그인 상태를 Boolean(true|false)형으로 반환하는 함수 구현\n\n';
    msg += '테스트 :\n';
    msg += '[확인버튼 : true  - 로그인 상태]\n';
    msg += '[취소버튼 : false - 미로그인 상태]';
    return confirm(msg);
}

function executeFavorite(nTime, sEtc) {
    var msg = '웹갈피 함수를 구현해야 합니다.\n';
    msg += '인자로 전달되는 재생시간을 이용하는 함수 구현\n\n';
    msg += '웹갈피 정보 : \n';
    msg += '재생시간:nTime = ' + nTime + '\n';
    msg += '기타정보:sEtc = ' + sEtc + '\n';
    alert(msg);
}

function executeLogin() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '로그인 UI를 띄우거나 로그인 페이지로 이동하는 함수 구현';
    alert(msg);
}

function getBookmarkCount() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '데이터베이스 등으로 부터 저장된 북마크 개수를 조회하여 반환하는 함수 구현\n';
    msg += '북마크 제목에 사용되며, 제목은 사용자가 수정 가능\n\n';
    msg += '테스트 :\n';
    msg += '테스트를 위한 북마크 개수를 입력해 주시기 바랍니다.\n';
    msg += '입력값이 숫자가 아니거나 입력하지 않을 경우 0 반환';
    var res = prompt(msg, '0');
    return (!isNaN(res) && res >= 0) ? res : 0;
}

function getThumbPath(nTime) {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '지정한 시간에 해당하는 썸네일 이미지 경로 반환 함수 구현\n\n';
    console.log(msg);
    return 'http://m.imgtech.co.kr/html5/thumbs/' + nTime + '.png';
}

function saveBookmark(sTitle, nStartTime, nEndTime, sEtc) {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '플레이어에서 전달된 북마크 정보를 저장하는 함수 구현\n\n';
    msg += '북마크 정보 : \n';
    msg += '북마크제목:sTitle = ' + sTitle + '\n';
    msg += '시작시간:nStartTime = ' + nStartTime + '\n';
    msg += '종료시간:nEndTime = ' + nEndTime + '\n';
    msg += '기타정보:sEtc = ' + sEtc + '\n';
    msg += '테스트 :\n';
    msg += '[확인버튼 : true  - 저장 성공]\n';
    msg += '[취소버튼 : false - 오류 및 저장 실패]';
    return confirm(msg);
}

function videoCollapse() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '<video> 요소를 감싸고 있는 요소의 사이즈 복원 구현\n\n';
    msg += '테스트 :\n';
    msg += '스타일시트를 이용한 사이즈 복원 사용';
    console.log(msg);
    var area = document.getElementById('video_test');
    area.style.width = '';
    area.style.height = '';
    return true;
}

function videoExpand() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '<video> 요소를 감싸고 있는 요소의 사이즈 확대 구현\n\n';
    msg += '테스트 :\n';
    msg += '스타일시트를 이용한 사이즈 복원 사용';
    console.log(msg);
    var area = document.getElementById('video_test');
    area.style.width = '960px';
    area.style.height = '540px';
    return true;
}

function onChangedResource(nIndex, nTotal, aResources, sEtc) {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += 'VOD 리소스 목록 중 재생 중인 리소스가 변경될 경우 호출되는 함수로 목록 관리 등 구현\n\n';
    msg += '리소스관련 정보 : \n';
    msg += '현재리소스의 인덱스:nIndex = ' + nIndex + '\n';
    msg += '지정된 리소스 개수:nTotal = ' + nTotal + '\n';
    msg += '지정된 리소스 목록:aResources = ' + aResources + '\n';
    msg += '기타정보:sEtc = ' + sEtc + '\n';
    alert(msg);
}

function openPlayList() {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '재생 목록 UI를 출력 구현';
    alert(msg);
}

function openPopup(oConfig, nTime) {
    var msg = '사용자 정의 함수를 구현해야 합니다.\n';
    msg += '레이어 및 새창 구현';
    alert(msg);
    console.log(oConfig, nTime);
}

/*
var mediaplayer_config = {
    autoSetup        : true,
    contextMenuType  : 2,
    controllers      : {
        timeSlider       : true,
        prevButton       : true,
        playButton       : true,
        osdPlayButton    : true,
        nextButton       : true,
        stopButton       : true,
        currentTime      : true,
        durationTime     : true,
        fullscreenButton : true,
        expandButton     : true,
        languageButton   : true,
        subtitlesButton  : true,
        bookmarkButton   : true,
        volumeButton     : true,
        volumeSlider     : true,
        clear            : true,
        backwardButton   : true,
        currentSkip      : true,
        forwardButton    : true,
        speedDownButton  : true,
        currentSpeed     : true,
        speedUpButton    : true,
        popupButton      : true,
        favoriteButton   : true,
        repeatButton     : true,
        playListButton   : true,
        qualityButton    : true
    },
    debugMode        : true,
    domain           : 'http://www.ebs.co.kr',
    externalAPI      : {
        bookmarkCount   : getBookmarkCount,
        bookmarkSave    : saveBookmark,
        changedResource : onChangedResource,
        favoriteExecute : executeFavorite,
        loginCheck      : checkLogin,
        loginExecute    : executeLogin,
        modeCollapse    : videoCollapse,
        modeExpand      : videoExpand,
        playList        : openPlayList,
        popupOpen       : openPopup,
        thumbnailPath   : getThumbPath
    },
    poster           : 'http://m.imgtech.co.kr/html5/thumbs/thumb.png',
    qualityLayerType : 2,
    sources          : [
        {
            poster : 'http://m.imgtech.co.kr/html5/thumbs/thumb.png',
            src    : [
                {
                    quality : '일반화질',
                    src     : 'http://daesung.mimac.hvod.skcdn.com/media/MIMAC/PRIVATE/LEC/2015/U1507105/U1507105_0_900k.mp4'
                },
                {
                    quality : '고화질',
                    src     : 'http://daesung.mimac.hvod.skcdn.com/media/MIMAC/PRIVATE/LEC/2015/U1507105/U1507105_0_900k.mp4'
                },
                {
                    quality : 'HD고화질',
                    src     : 'http://daesung.mimac.hvod.skcdn.com/media/MIMAC/PRIVATE/LEC/2015/U1507105/U1507105_0_900k.mp4'
                }
            ],
            track  : [
                {
                    kind    : 'subtitles',
                    label   : '영문',
                    srclang : 'en',
                    type    : 'srt',
                    src     : 'http://m.imgtech.co.kr/html5/resource/test.smi'
                },
                {
                    kind    : 'subtitles',
                    label   : '한글',
                    srclang : 'ko',
                    type    : 'vtt',
                    src     : 'http://m.imgtech.co.kr/html5/resource/test.smi'
                }
            ]
        },
        {
            poster : 'http://m.imgtech.co.kr/html5/thumbs/thumb.png',
            src    : 'http://daesung.mimac.hvod.skcdn.com/media/MIMAC/PRIVATE/LEC/2015/U1507105/U1507105_0_900k.mp4'
        }
    ],
    useThumb         : true
};
*/