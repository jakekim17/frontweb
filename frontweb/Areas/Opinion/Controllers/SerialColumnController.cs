using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.OpinionService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.Article.Opinion;

namespace Wow.Tv.FrontWeb.Areas.Opinion.Controllers
{
    public class SerialColumnController : Controller
    {
        /// <summary>
        /// 오피니언 연재 리스트 
        /// </summary>
        public ActionResult ColumnList(OpinionCondition condition)
        {
            var list = new OpinionServiceClient().GetColumnList(condition);

            ViewBag.TotalDataCount = list.TotalDataCount;
            ViewBag.Condition = condition;

            return View(list);

        }


        /// <summary>
        /// 오피니언 연재/취재 상세 리스트 영역 
        /// <param name="text">검색조건</param>
        /// <param name="condition">검색조건</param>
        /// </summary>
        public ActionResult DetailList(OpinionCondition condition)
        {
            var list = new OpinionServiceClient().GetPlanList(condition);

            ViewBag.condition = condition;

            return View(list);
        }

        /// <summary>
        /// 오피니언 연재/취재 상세 리스트 영역 
        /// <param name="text">검색조건</param>
        /// <param name="condition">검색조건</param>
        /// </summary>
        public ActionResult DetailListData(NewsCenterCondition condition, string text)
        {
            condition.SearchSection = "OPINION";

            var list = new OpinionServiceClient().GetDetailList(condition, text);

            list.TotalDataCount = 0;


            if (list.ListData.Count > 0)
            {
                list.TotalDataCount = (int)list.ListData.First().ROWCNT;
            }

            ViewBag.condition = condition;

            return View(list);
        }

        /// <summary>
        /// 오피니언 연재/취재 상세 배너이미지 가져오기
        /// <param name="condition">검색조건</param>
        /// </summary>
        public ActionResult ColumnListBannerImg(OpinionCondition condition)
        {
            var data = new OpinionServiceClient().ColumnBannerImg(condition);

            return Json(new { data = data });
        }
    }
}