using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.EntSpo;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class EntSpoController : Controller
    {
        private List<String> articleIdList = new List<String>();

        /// <summary>
        /// 연예 스포츠 메인페이지
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            articleIdList.Clear();

            var resultData = new EntSpoMainModel
            {
               //TOP영역
               TopList = new NewsMainServiceClient().GetNewsMainEntSpoList("TOP", articleIdList.ToArray()).ListData
            };

            foreach(var item in resultData.TopList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //연예스타
            resultData.EntList = new NewsMainServiceClient().GetNewsMainEntSpoList("ENT", articleIdList.ToArray()).ListData;

            foreach (var item in resultData.EntList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //스포츠
            resultData.SpoList = new NewsMainServiceClient().GetNewsMainEntSpoList("SPO", articleIdList.ToArray()).ListData;
            
            foreach (var item in resultData.SpoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(resultData);
        }

        public ActionResult CardNews()
        {
            var CardNewsList = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 4, articleIdList.ToArray()).ListData;

            foreach (var item in CardNewsList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(CardNewsList);
        }

        [OutputCache(Duration = 5 * 60)]
        public ActionResult ManySeeNews()
        {
            var resultData = new EntSpoMainModel
            {
                // 종합 뉴스
                BestTotalList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData
            };

            foreach (var item in resultData.BestTotalList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            // 연예 스포츠 뉴스(많이 본 뉴스)
            resultData.BestEntSpoList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

            foreach (var item in resultData.BestEntSpoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(resultData);
        }

        public ActionResult PhotoNews()
        {
            var BestPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;

            foreach (var item in BestPhotoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }
            return View(BestPhotoList);
        }

        //[OutputCache(Duration = 5 * 60)]
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
    }
}