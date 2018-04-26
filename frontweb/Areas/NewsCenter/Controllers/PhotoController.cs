using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class PhotoController : Controller
    {
        ///<summary>
        ///포토 영상 메인
        ///</summary>
        public ActionResult Main()
        {
            var model = new PhotoMainModel
            {
                topPhotoList = null,
                photoTabList = null,
                mostViewedList = null,
                bestPhotoList = null,
            };

            List<String> articleIdList = new List<String>(); //제외할 기사 아이디
            List<String> vodArticleIdList = new List<String>(); //제외할 기사 아이디

            //top 영역 포토리스트
            model.topPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 8, articleIdList.ToArray()).ListData;

            //제외할 포토 기사 아이디 어레이에 넣기.
            var idx = 0;
            foreach (var item in model.topPhotoList)
            {
                articleIdList.Add(item.ARTICLEID);
                idx++;
            }

            //인기 포토 
            model.bestPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 7, articleIdList.ToArray()).ListData;

            //영상 탭 
            model.vodTabList = new NewsMainServiceClient().GetNewsMainVodList("VOD", 12, vodArticleIdList.ToArray()).ListData;


            //제외할 포토 기사 아이디 어레이에 넣기.
            foreach (var item in model.bestPhotoList)
            {
                articleIdList.Add(item.ARTICLEID);
                idx++;
            }

            //제외할 영상 기사 아이디 어레이에 넣기.
            foreach (var item in model.vodTabList)
            {
                vodArticleIdList.Add(item.ARTICLEID);
                idx++;
            }

            //많이 본 영상 
            model.mostViewedList = new NewsMainServiceClient().GetNewsMainVodList("LATEST", 6, vodArticleIdList.ToArray()).ListData;

            //포토 탭 
            model.photoTabList = new NewsMainServiceClient().GetNewsMainSectionList("PHOTO", 10, articleIdList.ToArray()).ListData;

            return View(model);
        }

        ///<summary>
        ///포토 리스트
        ///</summary>
        public ActionResult PhotoList(NewsCenterCondition condition)
        {
            DateTime startDate = DateTime.Now.AddDays(-45);
            DateTime endDate = DateTime.Now.AddDays(1);

            int page = 1;
            if (condition.Page != 0)
            {
                page = condition.Page;
            }

            int pageSize = 50;

            condition.SearchSection = "PHOTO";
            condition.SearchComp = "";
            condition.SearchText = "";
            condition.SearchWowCode = "W040";
            condition.StartDate = startDate.ToString("yyyy-MM-dd");
            condition.EndDate = endDate.ToString("yyyy-MM-dd");
            condition.Page = page;
            condition.PageSize = pageSize;

            var model = new PhotoListModel
            {
                photoList = null
            };

            model.photoList = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData;

            ViewBag.StartDate = startDate.ToString("yyyy-MM-dd");
            ViewBag.EndDate = endDate.ToString("yyyy-MM-dd");
            ViewBag.Page = page;
            ViewBag.PageSize = pageSize;

            return View(model);
        }

        
        public ActionResult TopPhotoList(NewsCenterCondition condition)
        {
            bool isSuccess = false;
            string msg = "";
            var resultData = new List<NUP_NEWS_SECTION_SELECT_Result>();
            try
            {
                if (!String.IsNullOrEmpty(condition.SearchText))
                {
                    resultData = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData;
                }
                isSuccess = true;

            }catch(Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, resultData = resultData });

        }

    }
}