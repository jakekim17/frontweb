using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.NewsCenterService;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class PhotoController : Controller
    {
        private List<String> articleIdList = new List<String>();
        private List<String> vodArticleIdList = new List<String>();

        public ActionResult Main()
        {
            articleIdList.Clear();
            vodArticleIdList.Clear();

            var model = new PhotoMainModel
            {
                //top 영역 포토리스트
                TopPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 8, articleIdList.ToArray()).ListData
            };

            foreach (var item in model.TopPhotoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            // 인기포토
            model.BestPhoto = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 7, articleIdList.ToArray()).ListData;

            foreach (var item in model.BestPhoto)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            // 포토 
            model.PhotoList = new NewsMainServiceClient().GetNewsMainSectionList("PHOTO", 8, articleIdList.ToArray()).ListData;

            foreach (var item in model.PhotoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //영상 탭 
            model.VodList = new NewsMainServiceClient().GetNewsMainVodList("VOD", 8, vodArticleIdList.ToArray()).ListData;

            foreach (var item in model.VodList)
            {
                vodArticleIdList.Add(item.ARTICLEID);
            }

            return View(model);
        }

        public ActionResult ManySeeVodList()
        {
            var resultData = new NewsMainServiceClient().GetNewsMainVodList("LATEST", 4, vodArticleIdList.ToArray()).ListData;
            return View(resultData);
        }

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

            var resultData = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData;

            return View(resultData);
        }
    }
}