using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.FrontWeb.ReporterService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class SubscriptionController : BaseController
    {
        /// <summary>
        /// 구독하기 메일 내용
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            List<String> articleIdList = new List<String>();
            List<NUP_NEWS_SECTION_SELECT_Result> articleList = new List<NUP_NEWS_SECTION_SELECT_Result>();
            
            string reporterId       = Request["reporterId"];
            string reporterName     = string.Empty;
            string reporterPosition = string.Empty;
            string reporterImage    = string.Empty;

            if (!string.IsNullOrEmpty(reporterId))
            {
                NUP_REPORTER_SELECT_Result reporterInfo = new ReporterServiceClient().GetReporterInfo(reporterId);
                if (reporterInfo != null)
                {
                    reporterName = reporterInfo.USER_NM;
                    reporterPosition = reporterInfo.POSITION;
                    reporterImage = reporterInfo.IMAGE_URL;
                }

                NewsCenterCondition condition = new NewsCenterCondition();
                condition.SearchSection = "REPORTER";
                condition.Page = 1;
                condition.PageSize = 4;
                condition.SearchText = reporterId;

                articleList = new NewsCenterService.NewsCenterServiceClient().GetNewsSectionList(condition).ListData.Take(3).ToList();

                //제외할 리스트 기사 ID
                foreach (var item in articleList)
                {
                    articleIdList.Add(item.ARTICLEID.Trim());
                }
            }

            List<NUP_NEWS_MAIN_SECTION_SELECT_Result> recomNewsAll = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();
            recomNewsAll = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 3, articleIdList.ToArray()).ListData;

            //제외할 리스트 기사 ID
            foreach (var item in recomNewsAll)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            List<NUP_NEWS_MAIN_SECTION_SELECT_Result> recomNewsEntSpo = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();
            recomNewsEntSpo = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 2, articleIdList.ToArray()).ListData;

            //기자 정보
            ViewBag.reporterId = reporterId;
            ViewBag.reporterName = reporterName;
            ViewBag.reporterPosition = reporterPosition;
            ViewBag.reporterImage = reporterImage;

            //기자의 기사 정보
            ViewBag.articleList = articleList;

            //추천뉴스(종합:3 + 연예.스포츠:2)
            ViewBag.recomNewsAll = recomNewsAll;
            ViewBag.recomNewsEntSpo = recomNewsEntSpo;

            return View();
        }

        /// <summary>
        /// 수신거부
        /// </summary>
        /// <returns></returns>
        public ActionResult Reject()
        {
            string reporterId = Request["reporterId"];
            string rejectId   = Request["rejectId"];            

            ViewBag.reporterId = reporterId;
            ViewBag.rejectId = rejectId;            

            return View();
        }
        
        /// <summary>
        /// 수신거부
        /// </summary>
        /// <returns></returns>
        public ActionResult RejectSend()
        {
            string reporterId = Request["reporterId"];
            string rejectId = Request["rejectId"];

            var isSuccess = false;
            var msg = "";

            if(!string.IsNullOrEmpty(reporterId) && !string.IsNullOrEmpty(rejectId))
            {
                try
                {
                    new ReporterService.ReporterServiceClient().SubScriptionReject(reporterId, rejectId);

                    isSuccess = true;
                }
                catch (Exception e)
                {
                    msg = e.Message;
                }
            }

            return Json(new { isSuccess = isSuccess, msg = msg });

        }

    }
}