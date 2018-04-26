using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.CommconCodeService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class PopupController : Controller
    {
        /// <summary>
        /// URL 복사하기 팝업
        /// </summary>
        /// <returns></returns>
        public ActionResult CopyURL()
        {
            return View();
        }

        /// <summary>
        /// 구독하기 팝업
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 구독하기 저장
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 구독하기 삭제
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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

            return Json(new { isSuccess = isSuccess, msg = msg});
        }

    }
}