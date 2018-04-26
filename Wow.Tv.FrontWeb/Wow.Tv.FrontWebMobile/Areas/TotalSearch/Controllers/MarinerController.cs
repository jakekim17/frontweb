using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.Finance.Models;
using Wow.Tv.FrontWebMobile.MyActiveService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.wowcafe.Finance;
using Wow.Tv.Middle.Model.Db49.wownet.Finance;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.FrontWebMobile.Areas.TotalSearch.Controllers
{
    public class MarinerController : Controller
    {
        // GET: TotalSearch/Mariner
        public ActionResult Index()
        {
            String colTarget = "";
            String currentPage = "";
            if (Request.Params["colTarget"] == null || Request.Params["colTarget"].Equals(""))
                colTarget = "total";
            else
                colTarget = Request.Params["colTarget"];

            if (Request.Params["currentPage"] == null || Request.Params["currentPage"].Equals(""))
                currentPage = "1";
            else
                currentPage = Request.Params["currentPage"];

            ViewBag.searchTerm = Request.Params["searchTerm"];
            ViewBag.colTarget = colTarget;
            ViewBag.currentPage = currentPage;
            ViewBag.filterList = Request.Params["filterList"];

            var hotStockList = new TradingService.TradingServiceClient().GetHotSearchList(DateTime.Now.ToString("yyyyMMdd"));
            ViewBag.hotStockList = hotStockList;

            StockInvestorCondition conditionChart = new StockInvestorCondition();
            DomesticMainModel totalInfoModel;
            StockInvestorCondition stockInvestorCondition;
            DiscurssionCondition discussionCondition;
            ConsultCondition consultCondition;
            StockCafeCondition stockCafeCondition;

            conditionChart.StockCode = Request.Params["searchTerm"];
            conditionChart.ShortCode = Request.Params["searchTerm"];
            if (!String.IsNullOrEmpty(conditionChart.ShortCode) && !String.IsNullOrEmpty(conditionChart.StockCode))
            {
                stockInvestorCondition = new StockInvestorCondition { Type = "s", ShortCode = conditionChart.ShortCode };

                var stockInvestorSellList = new FinanceService.FinanceServiceClient().GetStockInvestorList(stockInvestorCondition);

                stockInvestorCondition.Type = "b";

                var stockInvestorBuyList = new FinanceService.FinanceServiceClient().GetStockInvestorList(stockInvestorCondition);

                var stockInvestorSumList = new FinanceService.FinanceServiceClient().GetStockInvestorSumList(conditionChart);

                //var stockPartList = new FinanceService.FinanceServiceClient().GetStockPartList(conditionChart);

                //var stockThemaList = new FinanceService.FinanceServiceClient().GetStockThemaList(conditionChart);

                var relativeStockList = new FinanceService.FinanceServiceClient().GetRelativeStockList(conditionChart);

                discussionCondition = new DiscurssionCondition { ArjCode = conditionChart.ShortCode };

                var discussionTop9List = new FinanceService.FinanceServiceClient().GetDiscussionTop9List(discussionCondition);

                consultCondition = new ConsultCondition { CName = conditionChart.CName };

                var consultTop9List = new FinanceService.FinanceServiceClient().GetConsultTop9List(consultCondition);

                stockCafeCondition = new StockCafeCondition { ArjCode = conditionChart.ShortCode };

                var stockCafeTop3List = new FinanceService.FinanceServiceClient().GetStockCafeTop3List(stockCafeCondition);

                ListModel<usp_wownet_Marketindex_BankExchange_Result> marketBankExchangeList = new FinanceService.FinanceServiceClient().GetMarketIndexBankExchangeList();
                //로그인 유무 체크
                bool loginResult = LoginHandler.IsLogin;
                //넘기면 된다. LoginHandler.CurrentLoginUser;   
                ListModel<tblMyFavoriteJongMok> resultData = new ListModel<tblMyFavoriteJongMok>();

                //MyFavoriteStockCondition condition = new MyFavoriteStockCondition();

                if (loginResult)
                {
                    resultData = new FinanceService.FinanceServiceClient().GetMyFavoriteJongMokList(new MyFavoriteStockCondition { loginUserInfo = LoginHandler.CurrentLoginUser });
                }
                totalInfoModel = new DomesticMainModel
                {
                    ChkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = String.Format("{0:yyyyMMdd}", DateTime.Now) }),
                    KospiInfo = new FinanceService.FinanceServiceClient().GetSiseKospiInfo().StockInfo,
                    KosdaqInfo = new FinanceService.FinanceServiceClient().GetSiseKosdaqInfo().StockInfo,
                    Kospi200Info = new FinanceService.FinanceServiceClient().GetSiseKPIInfo().StockInfo,
                    DowJonesInfo = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "D" }),
                    NasdaqInfo = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "N" }),
                    SANDP500Info = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "S" }),
                    SHCInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "CH#SHC" }),
                    HSInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "HK#HS" }),
                    NikkeiInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "JP#NI225" }),
                    ExchangeUSDInfo = marketBankExchangeList.ListData.Where(m => m.ItemName == "미국 USD").SingleOrDefault(),
                    ExchangeJPYInfo = marketBankExchangeList.ListData.Where(m => m.ItemName == "일본 JPY(100엔)").SingleOrDefault(),
                    ExchangeEURInfo = marketBankExchangeList.ListData.Where(m => m.ItemName == "유럽연합 EUR").SingleOrDefault(),
                    ExchangeCNYInfo = marketBankExchangeList.ListData.Where(m => m.ItemName == "중국 CNY").SingleOrDefault(),
                    InvestPartInfo = new FinanceService.FinanceServiceClient().GetSiseMainmergecode(),
                    TodayBroadCastInfo = new MyActiveService.MyActiveServiceClient().GetStockRecommendPartner().ToList(),
                    MyFavoriteList = resultData,
                    GetTodayStockNewsList = new FinanceService.FinanceServiceClient().GetTodayStockNews(),
                    GetCharacterStockNewsList = new CharacterStockService.CharacterStockServiceClient().GetCharaterStockList(new Middle.Model.Db49.Article.NewsCenter.NewsCenterCondition { SearchSection = "STOCKITEM", SearchText = "", SearchWowCode = "", StartDate = "2017-06-23", EndDate = String.Format("{0:yyyy-MM-dd}", DateTime.Now), SearchComp = "", Page = 1, PageSize = 3 }),
                    GetTodayInvests = new FinanceService.FinanceServiceClient().GetTodayInvests().ToList(),
                    GetIndustryPartUpperKospiList = new FinanceService.FinanceServiceClient().GetSiseStockPlusList().ListData.Take(6).ToList(),
                    //GetThemaPartUpperList = new FinanceService.FinanceServiceClient().GetThemaJisuList().ListData.Take(6).ToList()
                    GetThemaPartUpperList = new FinanceService.FinanceServiceClient().GetThemaJisuTopList().ToList(),
                    HotSearchList = new TradingService.TradingServiceClient().GetHotSearchList(DateTime.Now.ToString("yyyyMMdd")).ToList(),
                    EconomyStockColumn = new NewsMainService.NewsMainServiceClient().GetNewsMainMarketList("ECONOMY_STOCK", 5, new List<string>().ToArray()).ListData,
                    BestProHintStockingList = new FinanceService.FinanceServiceClient().GetBestProHintStockingList(),
                    LecturesList = new LectureService.LectureServiceClient().GetLatestLecture(),
                    //LecturesList = new LectureService.LectureServiceClient().GetList(new LectureCondition { LecturesDate = "2017-06-23", CurrentSite = "Front" })
                    CurrentSearchStockList = new FinanceService.FinanceServiceClient().GetCurrentSearchStockList()
                };

            }
            else
            {
                totalInfoModel = new DomesticMainModel();
            }

            ViewBag.totalInfoModel = totalInfoModel;

            usp_GetStockPrice_Result StockObj;
            FinanceCondition condition = new FinanceCondition { };
            condition.SearchStr = Request.Params["searchTerm"];
            if (!String.IsNullOrEmpty(condition.SearchStr))
            {
                StockObj = new FinanceService.FinanceServiceClient().GetStockPrice(condition);
                HpCondition sabuConditionObj;
                HpCondition chart5DayConditionObj;
                TradingStockCondition opinionConditionObj;

                if (!String.IsNullOrEmpty(StockObj.arj_code))
                {
                    sabuConditionObj = new HpCondition { Trid = "3301", Code = StockObj.arj_code.Replace("A", "") };
                    chart5DayConditionObj = new HpCondition { Trid = "9101", Code = StockObj.arj_code.Replace("A", ""), Width = "334", Height = "357" };
                    opinionConditionObj = new TradingStockCondition { UserCode = "269685359", UserName = "WOWUSER", CodeList = StockObj.arj_code.Replace("A", ""), ProgramID = "WOWNET", Mission = "DIAG", StrConversion = 2, CodeOnly = 2 };
                }
                else
                {
                    sabuConditionObj = new HpCondition();
                    chart5DayConditionObj = new HpCondition();
                    opinionConditionObj = new TradingStockCondition();
                }

                string sabuStr = new FinanceService.FinanceServiceClient().GetSabuScore(sabuConditionObj);
                string chart5DayStr = new FinanceService.FinanceServiceClient().GetHpFinderChart(chart5DayConditionObj);
                string tradingSignalStr = new TradingService.TradingServiceClient().GetStockData(opinionConditionObj);

                string sabuScore = "";
                string imgUrl9101 = "";
                //string opinionConsultStr = "";

                //string sabuScoreRaise = "";
                string[] sabuArr = sabuStr.Split('\r');
                string[] chart5DayArr = chart5DayStr.Split('|');
                string[] tradingSignalArr = tradingSignalStr.Split('|');
                string[] tradingSignalCntArr;

                //사부점수
                if (sabuArr.Length > 1)
                {
                    sabuScore = sabuArr[1].Replace("\n", "").Trim();
                    //sabuScoreRaise = sabuScore;
                }
                else
                {
                    sabuScore = "0";
                    //sabuScoreRaise = "0";
                }

                //5일 예측차트
                if (chart5DayArr.Length > 1)
                {
                    imgUrl9101 = chart5DayArr[3];
                    //opinionConsultStr = chart5DayArr[8];
                }
                else
                {
                    imgUrl9101 = "";
                }

                //투자의견
                if (tradingSignalArr.Length > 3)
                {
                    //0 : 강한매도, 1 매도, 2 중립, 3 매수, 4 강한매수 건수
                    tradingSignalCntArr = tradingSignalArr[3].Split('_');
                }
                else
                {
                    tradingSignalCntArr = null;
                }

                ViewBag.SabuScore = sabuScore;
                ViewBag.ImgUrl9101 = imgUrl9101;
                ViewBag.InvestOpinion = tradingSignalCntArr;
                //ViewBag.OpinionConsult = opinionConsultStr;
                //오늘날짜를 8자리로 추출
                bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = String.Format("{0:yyyyMMdd}", DateTime.Now) });
                //bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = "20150815" });
                ViewBag.CheckStockHoliday = chkStockHoliday;

                return View(StockObj);
            }
            else
            {
                ViewBag.SabuScore = "";
                ViewBag.ImgUrl9001 = "";
                ViewBag.InvestOpinion = new string[] { "0", "0", "0", "0", "0" };
                //ViewBag.OpinionConsult = "";
                StockObj = new usp_GetStockPrice_Result { arj_code = "", stock_code = "", stock_wanname = "", chg_type = "", curr_price = 0, mkt_halt = "0", net_chg = 0, high_price = 0, highest_price = 0, net_vol = 0, net_turnover = 0, k_gbn = "", lowest_price = 0, low_price = 0, data_day = DateTime.Now.ToString("yyyy-mm-dd"), list_num = 0, list_sum = 0, final_price = 0, capital = 0, part_code1 = "", part_code2 = "" };
                return View(StockObj);
            }
        }

        public JsonResult GetPartnerCafeDomain(string wowtvId)
        {

            MyActiveServiceClient myActiveService = new MyActiveServiceClient();

            var CafeDomain = new MyActiveServiceClient().GetPartnerCafeDomain(wowtvId);

            return Json(new { data = CafeDomain }, JsonRequestBehavior.AllowGet);
        }
    }
}