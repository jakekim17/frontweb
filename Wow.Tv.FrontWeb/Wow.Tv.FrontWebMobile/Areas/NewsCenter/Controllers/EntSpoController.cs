using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class EntSpoController : Controller
    {
        private List<String> articleIdList = new List<String>();

        public ActionResult Main()
        {
            articleIdList.Clear();

            var resultData = new EntSpoMainModel
            {
                TopList = new NewsMainServiceClient().GetNewsMainEntSpoList("TOP", articleIdList.ToArray()).ListData
            };

            foreach (var item in resultData.TopList)
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
            var resultData = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 2, articleIdList.ToArray()).ListData;

            foreach (var item in resultData)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(resultData);
        }

        public ActionResult ManySeeNews()
        {
            var resultData = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

            foreach (var item in resultData)
            {
                articleIdList.Add(item.ARTICLEID);
            }
            return View(resultData);
        }

        public ActionResult PhotoNews()
        {
            var resultData = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;

            foreach (var item in resultData)
            {
                articleIdList.Add(item.ARTICLEID);
            }
            return View(resultData);
        }
    }
}