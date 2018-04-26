using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Tv.FrontWebMobile.ReporterService;
using Wow.Tv.FrontWebMobile.TextAndLinkService;
using Wow.Tv.Middle.Model.Db49.Article.Reporter;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class MainController : Controller
    {
        private List<String> articleIdList = new List<String>();

        public ActionResult Index()
        {
            articleIdList.Clear();

            var newsStandList = new NewsMainServiceClient().GetNewsMainNewsstand().ListData;
            var model = new NewsMainModel
            {
                //뉴스 스탠드
                NewsStandTopInfo = newsStandList.Where(p => p.RANK.Equals(1)).SingleOrDefault(),
                NewsStandTopList = newsStandList.Where(p => p.RANK >= 2 && p.RANK <= 6).ToList(),
                NewsStandSomeList = newsStandList.Where(p => p.RANK >= 7 && p.RANK <= 13).ToList()
            };

            model.NewsStandSomeList = model.NewsStandSomeList.OrderByDescending(o => o.ARTDATE).ToList();

            //뉴스 스탠드 기사 ID
            foreach (var item in newsStandList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 메인 리스트
            model.NewsMainYList = new NewsMainServiceClient().GetNewsMainYList(articleIdList.ToArray()).ListData;

            //뉴스 메인 리스트 기사 ID
            foreach (var item in model.NewsMainYList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[종합영상]
            model.NewsMainVodTotalList = new NewsMainServiceClient().GetNewsMainVodList("TOTAL", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종합영상] 기사 ID
            foreach (var item in model.NewsMainVodTotalList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[종목]
            model.NewsMainVodMarketList = new NewsMainServiceClient().GetNewsMainVodList("MARKET", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종목] 기사 ID
            foreach (var item in model.NewsMainVodMarketList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[해외증시]
            model.NewsMainVodOverseasList = new NewsMainServiceClient().GetNewsMainVodList("OVERSEAS", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종목] 기사 ID
            foreach (var item in model.NewsMainVodOverseasList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //추천 키워드(관리자 > Text&Link > 추천키워드)
            model.keywordNews = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("KEYWORD")).OrderByDescending(o => o.SEQ).Take(4).ToList();

            return View(model);
        }

        public ActionResult ManySeeNews()
        {
            var model = new NewsMainModel
            {
                NewsTotalCountList = null,
                NewsEntSpoCountList = null
            };

            //많이본 뉴스[종합]
            model.NewsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData;

            foreach (var item in model.NewsTotalCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //많이본 뉴스[연예.스포츠]
            model.NewsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

            foreach (var item in model.NewsEntSpoCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }
            return View(model);
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

        public ActionResult Opinion()
        {
            var resultData = new NewsMainServiceClient().GetNewsMainOpinionList().ListData;

            return View(resultData);
        }

        public ActionResult WeekReporter()
        {
            var condition = new ReporterListCondtion()
            {
                IsRandom = "TRUE"
            };
            var resultData = new ReporterServiceClient()
                        .GetReporterList(condition.SearchId, condition.SearchName, condition.SearchInitial, 1, 1000, condition.IsRandom)
                        .ListData.Take(3).ToList();

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