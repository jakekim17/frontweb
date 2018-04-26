using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.FrontWeb.NewsStandService;
using Wow.Tv.FrontWeb.ReporterService;
using Wow.Tv.FrontWeb.TextAndLinkService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.Reporter;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class MainController : BaseController
    {
        private List<String> articleIdList = new List<String>();

        /// <summary>
        /// 뉴스 메인
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            articleIdList.Clear();

            var model = new NewsMainModel
            {
                newsStandList = new NewsMainServiceClient().GetNewsMainNewsstand().ListData,
                newsStandTopInfo = null,
                newsStandTopList = null,
                newsStandTimeList = null,
                newsMainYList = null,
                newsMainMarket = null,
                newsMainVodTotalList = null,
                newsMainVodMarketList = null,
                newsMainVodOverseasList = null,
                hotStockData = null
            };

            //뉴스 스탠드
            model.newsStandTopInfo = model.newsStandList.Where(p => p.RANK.Equals(1)).SingleOrDefault();
            model.newsStandTopList = model.newsStandList.Where(p => p.RANK >= 2 && p.RANK <= 6).ToList();
            model.newsStandTimeList = model.newsStandList.Where(p => p.RANK >= 7 && p.RANK <= 13).ToList();

            model.newsStandTimeList = model.newsStandTimeList.OrderByDescending(o => o.ARTDATE).ToList();

            //뉴스 스탠드 기사 ID
            foreach (var item in model.newsStandList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 메인 리스트
            model.newsMainYList = new NewsMainServiceClient().GetNewsMainYList(articleIdList.ToArray()).ListData;

            if (model.newsMainYList.Count > 13)
            {
                model.newsMainYList = model.newsMainYList.GetRange(0, 13);
            }

            //뉴스 메인 리스트 기사 ID
            foreach (var item in model.newsMainYList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //주요시세(인기검색어)
            model.hotStockData = new TradingService.TradingServiceClient().GetHotSearchList(DateTime.Now.ToString("yyyyMMdd"));

            //뉴스 주요시세 리스트
            model.newsMainMarket = new NewsMainServiceClient().GetNewsMainMarketList("", 7, articleIdList.ToArray()).ListData;

            //뉴스 주요시세 리스트 기사 ID
            foreach (var item in model.newsMainMarket)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[종합영상]
            model.newsMainVodTotalList = new NewsMainServiceClient().GetNewsMainVodList("TOTAL", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종합영상] 기사 ID
            foreach (var item in model.newsMainVodTotalList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[종목]
            model.newsMainVodMarketList = new NewsMainServiceClient().GetNewsMainVodList("MARKET", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종목] 기사 ID
            foreach (var item in model.newsMainVodMarketList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //뉴스 영상뉴스[해외증시]
            model.newsMainVodOverseasList = new NewsMainServiceClient().GetNewsMainVodList("OVERSEAS", 5, articleIdList.ToArray()).ListData;

            //뉴스 영상뉴스[종목] 기사 ID
            foreach (var item in model.newsMainVodOverseasList)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            //추천 키워드(관리자 > Text&Link > 추천키워드)
            //model.keywordNews = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("KEYWORD")).OrderByDescending(o => o.SEQ).Take(4).ToList();

            //핫 키워드 
            List<NUP_NEWSSTAND_KEWORD_SELECT_Result> newsStandHotKeyword = new NewsStandServiceClient().GetNewsStandHotKeyword().ListData;
            ViewBag.newsStandHotKeyword = newsStandHotKeyword;

            return View(model);
        }


        /// <summary>
        /// 많이본 뉴스
        /// </summary>
        /// <returns></returns>
        ///[OutputCache(Duration = 5 * 60)]
        public ActionResult ManySeeNews()
        {
            var model = new NewsMainModel
            {
                newsTotalCountList = null,
                newsEntSpoCountList = null
            };

            //많이본 뉴스[종합]
            model.newsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData;

            foreach (var item in model.newsTotalCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //많이본 뉴스[연예.스포츠]
            model.newsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

            foreach (var item in model.newsEntSpoCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(model);
        }

        /// <summary>
        /// 오피니언
        /// </summary>
        /// <returns></returns>
        public ActionResult Opinion()
        {
            List<NUP_NEWS_MAIN_OPINION_SELECT_Result>  model = new NewsMainService.NewsMainServiceClient().GetNewsMainOpinionList().ListData;

            return View(model);
        }

        /// <summary>
        /// 금주의 기자[랜덤]
        /// </summary>
        /// <returns></returns>
        public ActionResult WeekReporter()
        {
            //참고.. 랜덤
            //thisWeekReporter.OrderBy(r => Guid.NewGuid()).Take(5);
            var condition = new ReporterListCondtion()
            {
                IsRandom = "TRUE"
            };

            var result = new ReporterServiceClient().GetReporterList(condition.SearchId, condition.SearchName, condition.SearchInitial, 1, 50, condition.IsRandom).ListData.Take(3);

            return View(result);
        }

        /// <summary>
        /// 카드 뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult CardNews()
        {
            var result = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 5, articleIdList.ToArray()).ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        /// <summary>
        /// 색션 뉴스[증권.경제 / 산업.IT 과학 / 생활문화 / 취업]
        /// </summary>
        /// <returns></returns>
        public ActionResult SectionNews()
        {
            var result = new NewsSectionModel()
            {
                StoEcoList = new NewsMainServiceClient().GetNewsMainSectionList("STO_ECO", 5, articleIdList.ToArray()).ListData
            };
            
            foreach(var item in result.StoEcoList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            result.IndITList = new NewsMainServiceClient().GetNewsMainSectionList("IND_IT", 5, articleIdList.ToArray()).ListData;

            foreach(var item in result.IndITList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            result.LifeList = new NewsMainServiceClient().GetNewsMainSectionList("LIFE", 5, articleIdList.ToArray()).ListData;

            foreach (var item in result.LifeList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            result.JobList = new NewsMainServiceClient().GetNewsMainSectionList("JOB", 5, articleIdList.ToArray()).ListData;

            return View(result);
        }

        /// <summary>
        /// 이슈 겔러리
        /// </summary>
        /// <returns></returns>
        public ActionResult PhotoNews()
        {
            //Wow.Fx.WowLog.Write(String.Join(",", articleIdList.ToArray()));

            var result = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;

            foreach (var item in result)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            return View(result);
        }

        /// <summary>
        /// 핫한 뉴우스
        /// </summary>
        /// <returns></returns>
        public ActionResult HotNews()
        {
            var hotNewsList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 5, articleIdList.ToArray()).ListData;
            /*
            var result = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();

            if(hotNewsList != null && hotNewsList.Count > 13)
            {
                for (var i=8; i < hotNewsList.Count; i++)
                {
                    result.Add(hotNewsList[i]);
                }
            }

            return View(result);
            */
            return View(hotNewsList);
        }


    }
}