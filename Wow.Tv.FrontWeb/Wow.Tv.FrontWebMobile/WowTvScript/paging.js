/**************************************************************************
 * 페이징 처리 HTML을 가져온다.
 * 
 * @param String totalCnt       : 전체 레코드 수
 * @param String startRowNo     : 시작 레코드 번호
 * @param String pageSize       : 한번에 보여줄 레코드 개수
 * @param String getListFncName : 다른 페이지로 이동할때 호출될 메소드명
 *                                페이지번호 클릭 시 이 메소드에 시작레코드 번호가
 *                                넘어온다.
 * @returns String htmlStr      : 페이징 처리 영역에 들어갈 html
***************************************************************************/


function cfGetPagingHtml(totalCnt, startRowNo, pageSize, getListFncName) {
    //alert("총페이지>" + totalCnt);
    //alert("현재페이지>" + startRowNo);
    //alert("페이지사이즈>" + pageSize);
    //alert("페이지이름>" + getListFncName);

    var iTotalCnt = parseInt(totalCnt + "");
    var iStartRowNo = parseInt(startRowNo + "");
    var iPageSize = parseInt(pageSize + "");

    var htmlStr = "";       //반환할 페이징 처리 html
    var totalPageCnt = 0;   //전체 페이지 수
    var currentPageNo = 0;  //현재 페이지 번호
    var nextPageCnt = 0; 	//다음 페이지 수
    var prevPageCnt = 0; 	//이전 페이지 수

    //전체 페이지 수 계산
    totalPageCnt = Math.floor(iTotalCnt / iPageSize);
    if ((iTotalCnt % iPageSize) > 0) {
        totalPageCnt++;
    }

    //현재 페이지 번호 계산
    currentPageNo = Math.floor(iStartRowNo / iPageSize) + 1;


    //다음 페이지 번호 계산
    nextPageCnt = iStartRowNo + iPageSize;

    // 이전 페이지 번호 계산
    prevPageCnt = iStartRowNo - pageSize;

    htmlStr += "<div class=\"txt-paging\">";
    if (iStartRowNo > 0 && iStartRowNo >1) {
        htmlStr += "<a href=\"#\" onclick=\"return " + getListFncName + "(0);\" class=\"first\">FIRST</a>";
        htmlStr += "<a href=\"#\" onclick=\"return " + getListFncName + "('" + prevPageCnt + "');\" class=\"prev\">PREV</a>";
    }

    htmlStr += "<div>";
    htmlStr += "<a href=\"#\">" + currentPageNo + "</a>"
    htmlStr += "<span>/</span>";
    htmlStr += "<a href=\"#\">" + totalPageCnt + "</a>";
    htmlStr += "</div>";

    if (currentPageNo < totalPageCnt) {
        htmlStr += "<a href=\"#\" onclick=\"return " + getListFncName + "('" + nextPageCnt + "');\" class=\"next\">NEXT</a>";
        htmlStr += "<a href=\"#\" onclick=\"return " + getListFncName + "('" + ((totalPageCnt - 1) * iPageSize) + "');\" class=\"last\">LAST</a>";
    }
    htmlStr += "</div>";

    if (iTotalCnt == 0) {
        htmlStr = "";
    }

    return htmlStr;
};