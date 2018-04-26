using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.App_Start;
using Wow.Tv.FrontWebMobile.MyActiveService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.FrontWebMobile.Controllers
{
    public class PopupController : Controller
    {
        // 구독하기 팝업
        public ActionResult SubScription(string reporterId)
        {
            var commonCondition = new CommonCodeCondition()
            {
                UpCommonCode = "036000000",
                PageSize = -1
            };
            var resultCommon = new CommconCodeService.CommconCodeServiceClient().SearchList(commonCondition);

            ViewBag.ReporterID = reporterId;
            return View(resultCommon);
        }

        // 구독하기 저장
        public ActionResult SaveSubScription(NTB_ARTICLE_SUBSCRIPTION model)
        {
            var isSuccess = false;
            var msg = "";
            var isSave = false;
            try
            {
                isSave = new ReporterService.ReporterServiceClient().SaveSubScription(model, LoginHandler.CurrentLoginUser);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, isSave = isSave });
        }

        // 구독하기 삭제
        public ActionResult DeleteSubScription(string reporterId)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                new ReporterService.ReporterServiceClient().DeleteSubScription(reporterId, LoginHandler.CurrentLoginUser);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        // 공유하기 팝업
        public ActionResult SharesPopup()
        {
            return View();
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        public ActionResult PopupScrap(ScrapCondition condition)
        {
            ViewBag.Condition = condition;
            return View();
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        public ActionResult PopupNewsScrap(ScrapCondition condition)
        {

            MyActiveServiceClient myActiveService = new MyActiveServiceClient();

            var resultData = myActiveService.GetScrapMenu(LoginHandler.CurrentLoginUser).ToList();

            ViewBag.Condition = condition;
            return View(resultData);
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        public JsonResult SaveScrap(ScrapCondition condition)
        {
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            string msg = string.Empty;
            try
            {

                if (condition.PinType.Equals("Report"))
                {
                    NTB_MYPIN_REPORTER mypin = new NTB_MYPIN_REPORTER { REPORTER_ID = condition.ScrapId };

                    myActiveService.SaveReporter(mypin, LoginHandler.CurrentLoginUser);

                }
                else if (condition.PinType.Equals("Program"))
                {
                    NTB_MYPIN_PROGRAM mypin = new NTB_MYPIN_PROGRAM { PRG_CD = condition.ScrapId };

                    myActiveService.SaveProgram(mypin, LoginHandler.CurrentLoginUser);

                }
                else if (condition.PinType.Equals("Partner"))
                {

                    NTB_MYPIN_PARTNER mypin = new NTB_MYPIN_PARTNER { PAY_NO = int.Parse(condition.ScrapId) };

                    myActiveService.SavePartner(mypin, LoginHandler.CurrentLoginUser);
                }
            }
            catch (Exception e)
            {
                return Json(new { IsSuccess = false, Msg = e.Message });
            }

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        public JsonResult SaveScrapNews(ScrapCondition condition)
        {
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            string msg = string.Empty;
            try
            {

                TAB_SCRAP_CONTENT mypin = new TAB_SCRAP_CONTENT { ArticleID = condition.ScrapId, URL = condition.Url, TITLE = condition.Name, BSEQ = condition.Bseq };

                myActiveService.SaveNews(mypin, LoginHandler.CurrentLoginUser);
            }
            catch (Exception e)
            {
                return Json(new { IsSuccess = false, Msg = e.Message });
            }

            return Json(new { IsSuccess = true, Msg = msg });
        }
    }
}