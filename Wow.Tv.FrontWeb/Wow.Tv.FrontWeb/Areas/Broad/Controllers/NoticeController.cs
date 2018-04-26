using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.FrontWeb.CommconCodeService;
using Wow.Tv.FrontWeb.IntegratedBoardService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class NoticeController : Controller
    {
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(IntegratedBoardCondition condition)
        {
            if (condition.CurrentMenuSeq == 0)
            {
                condition.CurrentMenuSeq = 172;
            }
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            condition.VIEW_YN = "Y";
            var resultData = integratedBoard.IntegratedSearchList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.BoardInfo = resultData.BoardInfo;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            var codeList = commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_NOTICE_CODE
            }).ListData;

            codeList.Insert(0, new NTB_COMMON_CODE { COMMON_CODE = "ALL", CODE_NAME = "전체" });

            resultData.CommonCodes = codeList;

            return View(resultData);
        }

        public ActionResult Detail(int seq, IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetBoardDetail(seq);
            if (resultData != null)
            {
                integratedBoard.ReadCountIncrease(seq);//게시물 조회수 증가
            }
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.CommonCodes = GetCommonCode();
            ViewBag.BoradInfo = GetBoardInfo(condition.CurrentMenuSeq);

            return View(resultData);
        }

        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
        }

        private List<NTB_COMMON_CODE> GetCommonCode()
        {
            CommconCodeServiceClient commonCode = new CommconCodeServiceClient();
            return commonCode.SearchList(new CommonCodeCondition
            {
                UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_NOTICE_CODE
            }).ListData;
        }

    }
}