using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.OpinionService;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.Article.Opinion;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class OpinionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 연재/기획취재 데이터 가져오기
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SearchColumnData(OpinionCondition condition)
        {
            var resultData = new OpinionServiceClient().GetColumnList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult List(OpinionCondition condition)
        {
            var resultData = new OpinionServiceClient().GetColumnList(condition).ListData;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        /// <summary>
        /// 연재/ 기획취재 리스트 데이터 가져오기
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SearchColumnList(NewsCenterCondition condition, string text)
        {
            condition.SearchSection = "OPINION";

            var resultData = new OpinionServiceClient().GetDetailList(condition, text).ListData;

            if (resultData != null && resultData.Count > 0)
            {
                ViewBag.TotalDataCount = (int)resultData.First().ROWCNT;
            }
            else
            {
                ViewBag.TotalDataCount = 0;
            }

            ViewBag.condition = condition;
            return View(resultData);
        }

        public ActionResult GetOpinionSelList(OpinionCondition condition)
        {
            var resultData = new OpinionServiceClient().GetColumnList(condition).ListData;
            return Json(new { resultData = resultData });
        }

        public ActionResult GetBannerImg(OpinionCondition condition)
        {
            var resultData = new OpinionServiceClient().ColumnBannerImg(condition);
            return Json(new { resultData = resultData });
        }
    }
}