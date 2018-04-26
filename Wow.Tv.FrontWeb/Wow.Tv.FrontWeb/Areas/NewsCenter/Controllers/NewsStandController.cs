using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.FrontWeb.NewsStandService;
using Wow.Tv.FrontWeb.TextAndLinkService;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class NewsStandController : Controller
    {
        // GET: NewsCenter/NewsStand
        public ActionResult Index()
        {
            //뉴스 스탠드 No 1 ~ 13
            List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> newsStandList = new NewsMainServiceClient().GetNewsMainNewsstand().ListData;

            ViewBag.newsStandArea1 = newsStandList.Where(p => p.RANK.Equals(1)).SingleOrDefault();
            ViewBag.newsStandArea2 = newsStandList.Where(p => p.RANK >= 2 && p.RANK <= 6).ToList();
            ViewBag.newsStandArea3 = newsStandList.Where(p => p.RANK >= 7 && p.RANK <= 10).ToList();
            ViewBag.newsStandArea4 = newsStandList.Where(p => p.RANK >= 11 && p.RANK <= 13).ToList();

            //핫 키워드 
            List<NUP_NEWSSTAND_KEWORD_SELECT_Result> newsStandHotKeyword = new NewsStandServiceClient().GetNewsStandHotKeyword().ListData;

            ViewBag.newsStandHotKeyword = newsStandHotKeyword;

            return View();
        }

    }
}