var obj = [];
var SmartEditor = {
    Create: function () {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: obj,
            elPlaceHolder: "editor",
            sSkinURI: "/Scripts/SE2/SmartEditor2Skin.html",
            htParams: {
                // 툴바 사용 여부
                bUseToolbar: true,
                // 입력창 크기 조절바 사용 여부
                bUseVerticalResizer: true,
                // 모드 탭(Editor | HTML | TEXT) 사용 여부
                bUseModeChanger: true
            },
            fCreator: "createSEditor2"
        });
    },
    SaveData: function () {
        obj.getById["editor"].exec("UPDATE_CONTENTS_FIELD", []);
    }
};