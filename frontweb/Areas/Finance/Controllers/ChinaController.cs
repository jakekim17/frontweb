using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db35.chinaguide.Article;

namespace Wow.Tv.FrontWeb.Areas.Finance.Controllers
{
    public class ChinaController : BaseController
    {
        // GET: Finance/China
        public ActionResult Index()
        {
            ChinaService.ChinaServiceClient chinaService = new ChinaService.ChinaServiceClient();
            List<ArticleInfo> list1 = chinaService.GetArticle("10").ToList();
            List<ArticleInfo> list2 = chinaService.GetArticle("9").ToList();
            List<ArticleInfo> list3 = chinaService.GetArticle("1").ToList();
            List<ArticleInfo> list4 = chinaService.GetArticle("3").ToList();

            List<ArticleInfo> list5 = chinaService.GetArticle("5").ToList();
            List<ArticleInfo> list6 = chinaService.GetArticle("8").ToList();

            List<ArticleInfo> list7 = chinaService.GetArticle("4").ToList();

            string videoContent = chinaService.GetIssue();

            ViewBag.List1 = list1;
            ViewBag.List2 = list2;
            ViewBag.List3 = list3;
            ViewBag.List4 = list4;
            ViewBag.List5 = list5;
            ViewBag.List6 = list6;
            ViewBag.List7 = list7;

            ViewBag.VideoContent = videoContent;

            return View();
        }

    }
}