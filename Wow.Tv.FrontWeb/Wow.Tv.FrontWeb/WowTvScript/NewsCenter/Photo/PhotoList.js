var PhotoList = {

    ShowPhoto: function (articleId) {
        if (typeof articleId == "undefined") {
            articleId = $('#topSlideArea').find('li.on').attr('id');
        }

        $("input[name='SearchText']").val(articleId);

        if (typeof articleId != "undefined") {
            $.ajax({
                type: "POST",
                url: "/NewsCenter/Photo/TopPhotoList",
                data: $("#frmSearch").serialize(),
                async: false,
                success: function (data) {
                    var datas = data.resultData;
                    var txt = '';

                    for (var i = 0; i < datas.length; i++) {

                        txt += '<strong class="tit">' + datas[i].TITLE + '</strong>';
                        txt += '<p class="cont">' + datas[i].CONTENTS_CUT + '</p>';
                        txt += '<span class="btn-type2"><a href="javascript:NewsCommon.GoNewsDetailView(\'photo\',\'\',\'\',\'' + datas[i].ARTICLEID + '\');">기사 원문보기</a></span>';
                    }

                    $("#newsPhotoCont").empty().html(txt);
                },
                beforeSend: function () {
                    $('#middleSlideArea').find('.bx-next').hide();
                    $('#middleSlideArea').find('.bx-prev').hide();
                },
                complete: function () {
                    $('#middleSlideArea').find('.bx-next').show();
                    $('#middleSlideArea').find('.bx-prev').show();
                }
            });
        }
    },

    /**
     * @description 이기사와 많이본 기사
     */
    GetManySeeNews: function (articleId) {

        var targetId = $("#divManySeeNews");

        $.ajax({
            type: "POST",
            url: "/NewsCenter/News/ReadManySeeNews",
            data: { articleId: articleId },
            success: function (data, textStatus) {
                targetId.html(data);
            },
            beforeSend: function () {
                //로딩 처리
                var strLoading = "<div style='width:870px;vertical-align:middle;text-align:center;'><img src='/Content/Images/bigWaiting.gif' style='width:50px;height:50px;'><br><br>로딩 중입니다.</div>";
                targetId.html(strLoading);
            },
            complete: function () {
                //완료..
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("포토 >  이기사와 많이본 기사 리스트 에러..");
                }
            }
        });
    }

}


$(document).ready(function () {

    $("#topSlideArea .bx-wrapper > .bx-viewport > ul > li").on("click", function () {

        var topImgId = $(this).attr("id");
        var middleImgIdx = $("#middleSlideArea").find('ul').find("#" + topImgId).index();

        if (middleImgIdx < 0) {
            middleImgIdx = 0;
        }

        $('#middleSlideArea').find('li').removeClass('on');
        $("#middleSlideArea").find('ul').find("#" + topImgId).addClass('on');

        $("img").removeAttr("style");
        GoToPhotoSlide(middleImgIdx);
        PhotoList.ShowPhoto(topImgId);
    });   

    $("#middleSlideArea .bx-wrapper > .bx-controls > .bx-controls-direction > a").on("click", function () {
        var mdlImgId;
        var thisIndex = photoSlider.getCurrentSlide();
        var cnt = $("#middleSlideArea").find('li').not('.bx-clone').length;
        if ($(this).attr("class") == "bx-next") {
            if (thisIndex == cnt) {
                mdlImgId = $('#middleSlideArea').find('li').not('.bx-clone').eq(0).attr("id");
            } else {
                mdlImgId = $('#middleSlideArea').find('li').not('.bx-clone').eq(thisIndex).attr("id");
            }
        } else if ($(this).attr("class") == "bx-prev") {
            if (thisIndex == 0) {
                mdlImgId = $('#middleSlideArea').find('li').not('.bx-clone').eq(cnt).attr("id");
            } else {
                mdlImgId = $('#middleSlideArea').find('li').not('.bx-clone').eq(thisIndex).attr("id");
            }
        }

        PhotoList.ShowPhoto(mdlImgId);
    });

    

    var index = $('#topSlideArea').find('li').not('.bx-clone').index();

    $('#topSlideArea').find('li').eq(index).click();
    PhotoList.GetManySeeNews($('#topSlideArea').find('li').eq(index).attr('id'));
});



