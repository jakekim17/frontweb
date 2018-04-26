using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.LandService;
using Wow.Tv.FrontWebMobile.NewsCenterService;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class LandController : Controller
    {
        private List<String> articleIdList = new List<String>();

        /// <summary>
        /// 부동산 메인
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            articleIdList.Clear();

            var result = new NewsMainServiceClient().GetNewsMainLandList().ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLE_ID);
            }

            return View(result);
        }

        /// <summary>
        /// 카드 뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult CardNews()
        {
            var result = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 2, articleIdList.ToArray()).ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        /// <summary>
        /// 포토 뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult PhotoNews()
        {
            var result = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 3, articleIdList.ToArray()).ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        /// <summary>
        /// 부동산 리스트 페이지
        /// </summary>
        /// <returns></returns>
        public ActionResult List()
        {
            return View();
        }

        /// <summary>
        /// 부동산 리스트 페이지 검색
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="IsAppend"></param>
        /// <returns></returns>
        public ActionResult SearchList(NewsCenterCondition condition, string IsAppend)
        {
            var model = new NewsListModel
            {
                ArticleList = new List<NUP_NEWS_SECTION_SELECT_Result>(),
                SectionManySeeList = new List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result>(),
                SectionRecommendList = new List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result>()
            };

            if (!string.IsNullOrEmpty(condition.SearchSection))
            {
                condition.SearchSection = condition.SearchSection.ToUpper();
            }

            if (condition.SearchText == null)
            {
                condition.SearchText = "";
            }

            model.ArticleList = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData;

            if (model.ArticleList.Count > 0)
            {
                ViewBag.TotalDataCount = (int)model.ArticleList.First().ROWCNT;
            }
            else
            {
                ViewBag.TotalDataCount = 0;
            }
        
            if(IsAppend != "Y")
            {
                 var sectionManySeeList = new NewsCenterServiceClient().GetNewsSectionManySee(condition.SearchSection, condition.SearchWowCode).ListData;
                 if(sectionManySeeList != null && sectionManySeeList.Count > 0)
                {
                    foreach(var item in sectionManySeeList)
                    {
                        if(sectionManySeeList.IndexOf(item) < 3)
                        {
                            model.SectionManySeeList.Add(item);
                        }
                        else
                        {
                            model.SectionRecommendList.Add(item);
                        }
                    }
                }
            }

            ViewBag.IsAppend = IsAppend;

            return View(model);
        }

        /// <summary>
        /// 주소 가져오기
        /// </summary>
        /// <param name="Sido"></param>
        /// <param name="Gugun"></param>
        /// <returns></returns>
        public ActionResult GetAddress(string Sido, string Gugun)
        {
            var data = new LandServiceClient().GetMapAddress(Sido, Gugun);

            return Json(new { data = data });
        }

        public ActionResult GetAdBanner()
        {
            var resultData = new MainManageService.MainManageServiceClient().GetFrontList("RealEstate");
            return View(resultData);
        }
    }
}