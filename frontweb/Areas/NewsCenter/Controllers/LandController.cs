using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class LandController : Controller
    {
        private List<String> articleIdList = new List<String>();

        // 부동산 메인
        public ActionResult Main()
        {
            articleIdList.Clear();

            var result = new NewsMainServiceClient().GetNewsMainLandList().ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLE_ID);
            }

            if(result != null)
            {
                var data = result.SingleOrDefault(a => a.SHOW_NUM.Equals(10));
                if(data != null)
                {
                    ViewBag.SearchAddress = data.TAG;
                }
            }
            
            return View(result);
        }

        // 카드뉴스
        public ActionResult CardNews()
        {
            var result = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 4, articleIdList.ToArray()).ListData;

            foreach(var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        // 이슈 갤러리
        public ActionResult PhotoNews()
        {
            var result = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        // 많이본 뉴스
        public ActionResult ManySeeNews()
        {
            var model = new NewsMainModel()
            {
                newsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData
            };

            foreach (var item in model.newsTotalCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            model.newsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

            foreach (var item in model.newsEntSpoCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }


            return View(model);
        }

        // 핫한 뉴스
        public ActionResult HotNews()
        {
            var hotNewsList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 13, articleIdList.ToArray()).ListData;
            var result = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();

            if (hotNewsList != null && hotNewsList.Count > 9)
            {
                for (var i = 8; i < hotNewsList.Count; i++)
                {
                    result.Add(hotNewsList[i]);
                }
            }
            return View(result);
        }


        ///<summary>
        ///부동산 뉴스 리스트
        ///</summary>
        public ActionResult Index(string SearchText)
        {
            ViewBag.SearchText = SearchText;
            return View();
        }

        ///<summary>
        /// 검색 리스트
        ///</summary>
        public ActionResult List(NewsCenterCondition condition)
        {
            /******************************
           -- 부동산[LAND]            
           ******************************/

            //색션구분 대문자로..
            if (!string.IsNullOrEmpty(condition.SearchSection))
            {
                condition.SearchSection = condition.SearchSection.ToUpper();
            }

            if (condition.SearchText == null)
            {
                condition.SearchText = "";
            }

            ListModel<NUP_NEWS_SECTION_SELECT_Result> resultData = new NewsCenterServiceClient().GetNewsSectionList(condition);

            resultData.TotalDataCount = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
            }

            var model = resultData;

            return View(model);

        }

        ///<summary>
        ///지도 정보
        ///</summary>
        public ActionResult GetAddress(string Sido, string Gugun)
        {
            var data = new LandService.LandServiceClient().GetMapAddress(Sido, Gugun);

            return Json(new { data = data });
        }

        /// <summary>
        /// AD Banner 가져오기
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = 30 * 60)]
        public ActionResult GetADBanner()
        {
            var resultData = new MainManageService.MainManageServiceClient().GetFrontList("RealEstate");
            return View(resultData);
        }
    }
}