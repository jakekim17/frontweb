using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.CharacterStockService;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.Article;

using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;

namespace Wow.Tv.FrontWeb.Areas.Finance.Controllers
{
    public class CharacterStockController : BaseController
    {
        // GET: Finance/CharacterStock
        public ActionResult CharacterStock()
        {
            return View();
        }

        public ActionResult List(NewsCenterCondition condition)
        {
            /*************
             * 특징주 [STOCKITEM]
             *************/

            //색션구분 대문자로..
             if (!string.IsNullOrEmpty(condition.SearchSection))
            {
                condition.SearchSection = condition.SearchSection.ToUpper();
            }

            ListModel<CharacterStockModel> resultData = new CharacterStockServiceClient().GetCharaterStockList(condition);

            resultData.TotalDataCount = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().NewsData.ROWCNT;
            }

            var model = resultData;

            return View(resultData);
        }

        /// <summary>
        /// 특징주 뉴스
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="articleId"></param>
        /// <returns></returns>
        public ActionResult Detail(NewsCenterCondition condition, string articleId)
        {
            if(string.IsNullOrEmpty(articleId))
            {
                articleId = Request["articleId"];
            }

            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
            }

            //기사 상세 내용
            var model = new NewsCenterServiceClient().GetNewsReadInfo(articleId, prevArticleId, "WEB");

            //기자 정보
            ViewBag.reporterInfo = new ReporterService.ReporterServiceClient().GetReporterInfo(model.REPORTER_ID);

            //기자의 최신 기사
            condition.SearchSection = "REPORTER";
            condition.SearchText = model.REPORTER_ID;
            condition.Page = 1;
            ViewBag.reporterArticel = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData.Where(p => !p.ARTICLEID.Equals("articleId")).Take(3).ToList();

            //종목코드 리스트
            var articleStockList = new NewsCenterServiceClient().GetArticleStockList(articleId).ListData;
            
            //1개의 종목코드
            string stockCode = string.Empty;

            //관련기업 동영상
            ViewBag.vodList = null; 
            if(articleStockList != null)
            {
                stockCode = articleStockList.FirstOrDefault().StockCode;

                ViewBag.vodList = new CharacterStockServiceClient().GetStockVODList(stockCode);
                ViewBag.currentPrice = new CharacterStockService.CharacterStockServiceClient().GetCurrentPrice(stockCode);

                //해당기사 관련종목 추출
                //var relativeStockList = new List<usp_GetStockPrice_Result>();
                //foreach(var item in articleStockList)
                //{
                //    relativeStockList.Add(new CharacterStockService.CharacterStockServiceClient().GetCurrentPrice(item.StockCode));
                //}

                //ViewBag.relativeStockList = relativeStockList;
            }

            ViewBag.articleStockList = articleStockList;
            ViewBag.stockCode = stockCode;

            return View(model);
        }
    }
}