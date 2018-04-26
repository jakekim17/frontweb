using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.App_Start;
using Wow.Tv.FrontWeb.Areas.MyPin.Models;
using Wow.Tv.FrontWeb.MyActiveService;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.FrontWeb.Areas.MyPin.Controllers
{
    /// <summary>
    /// <para> 마이핀 등록/관리 Controller</para>
    /// <para>- 작  성  자 : ABC솔루션 정재민</para>
    /// <para>- 최초작성일 : 2017-10-27</para>
    /// <para>- 최종수정자 : 정재민</para>
    /// <para>- 최종수정일 : 2017-10-27</para>
    /// <para>- 주요변경로그</para>
    /// <para>  2017-10-27 생성</para>
    /// </summary>
    /// <remarks>마이핀 등록/관리 </remarks>
    [WowTvFrontAuthorize(IsLogin = true)]
    public class ScrapController : BaseController
    {
        // GET: MyPin/Scrap
        public ActionResult Index()
        {

            MyActiveServiceClient myActiveService = new MyActiveServiceClient();

            var resultData = myActiveService.GetScrapMenu(LoginHandler.CurrentLoginUser).ToList();

            return View(resultData);
        }

        // GET: MyPin/Scrap
        public ActionResult PopupScrap(ScrapCondition condition)
        {
            ViewBag.Condition = condition;
            return View();
        }

        public ActionResult PopupNewsScrap(ScrapCondition condition)
        {

            MyActiveServiceClient myActiveService = new MyActiveServiceClient();

            var resultData = myActiveService.GetScrapMenu(LoginHandler.CurrentLoginUser).ToList();

            ViewBag.Condition = condition;
            return View(resultData);
        }

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

        public JsonResult SaveScrapNews(ScrapCondition condition)
        {
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            string msg = string.Empty;
            try
            {

                 TAB_SCRAP_CONTENT mypin = new TAB_SCRAP_CONTENT { ArticleID = condition.ScrapId, URL = condition.Url,TITLE = condition.Name ,BSEQ = condition.Bseq};

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