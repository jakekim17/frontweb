using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.Finance.Models;
using Wow.Tv.FrontWebMobile.Controllers;
using Wow.Tv.FrontWebMobile.FinanceService;
using Wow.Tv.FrontWebMobile.MyActiveService;
using Wow.Tv.FrontWebMobile.NewsCenterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.Finance;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db49.editVOD.Stock;
using Wow.Tv.Middle.Model.Db49.wowcafe.Finance;
using Wow.Tv.Middle.Model.Db49.wownet.Finance;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Controllers
{
    public class DomesticStockController : BaseController
    {
        // GET: Finance/Domestic
        public ActionResult Index()
        {
            //휴일관리 : 8자리 오늘날짜와 비교
            //국내 : 코스피, 코스닥, 코스피200
            //미국 : 다우존스, 나스닥, S&P500
            //아시아 : 상해종합, 홍콩항생, 니케이
            //환율 : 미국 USD, 일본 JPY, 유럽연합 EUR, 중국 CNY
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

            DomesticMainModel domesticMainModel = new DomesticMainModel
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
                //TodayBroadCastInfo = new MyActiveService.MyActiveServiceClient().GetStockRecommendPartner().ToList(),
                TodayBroadCastInfo = new BroadService.NewsProgramServiceClient().GetWowNetData2(),
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


            //var AllRankdata = new FinanceService.FinanceServiceClient().GetRankData(new RankingCondition { RnkTime = "1400", Count = 100, TrId = "5001", Sect = "0" });
            //AllRankdata = AllRankdata.Replace("<HTML>", "");
            //AllRankdata = AllRankdata.Replace("</HTML>", "");
            //AllRankdata = AllRankdata.Replace("<BR />", "@");

            //var arrData = AllRankdata.Split('@');

            //string[] arrData2;
            //List<string[]> list = new List<string[]>();

            //for (var i = 0; i < arrData.Length; i++)
            //{
            //    arrData2 = arrData[i].Split('|');
            //    if (arrData2.Length == 15)
            //    {
            //        list.Add(arrData2);
            //    }
            //}

            return View(domesticMainModel);
        }
        #region /* =========== Domestic Stock Kospi =============*/
        /// <summary>
        /// 국내주요시세 > 코스피 
        /// </summary>
        /// <returns></returns>
        public ActionResult Kospi()
        {
            StockInfoModel<usp_GetSiseCurrentKospi_Result, usp_getSiseMainmergecode_Result> stockInfoModel = new FinanceService.FinanceServiceClient().GetSiseKospiInfo();

            //오늘날짜를 8자리로 추출
            bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = String.Format("{0:yyyyMMdd}", DateTime.Now) });
            //bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = "20150815" });
            ViewBag.CheckStockHoliday = chkStockHoliday;

            return View(stockInfoModel);
        }

        /// <summary>
        /// 코스피 시간별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseTimeKospiList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseTimeKospiList = new FinanceService.FinanceServiceClient().GetSiseTimeKospiList(condition);
            return View(siseTimeKospiList);
        }

        /// <summary>
        /// 코스피 일별 체결 
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseDayKospiList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseDayKospiList = new FinanceService.FinanceServiceClient().GetSiseDayKospiList(condition);
           
            return View(siseDayKospiList);
        }
        #endregion
        #region /* =========== Domestic Stock Kosdaq =============*/
        /// <summary>
        /// 국내주요시세 > 코스닥 
        /// </summary>
        /// <returns></returns>
        public ActionResult Kosdaq()
        {
            StockInfoModel<usp_GetSiseCurrentKosdaq_Result, usp_getSiseMainmergecode_Result> stockInfoModel = new FinanceService.FinanceServiceClient().GetSiseKosdaqInfo();

            //오늘날짜를 8자리로 추출
            bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = String.Format("{0:yyyyMMdd}", DateTime.Now) });
            //bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = "20150815" });
            ViewBag.CheckStockHoliday = chkStockHoliday;

            return View(stockInfoModel);
        }

        /// <summary>
        /// 코스닥 시간별 체결 
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseTimeKosdaqList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseTimeKosdaqList = new FinanceService.FinanceServiceClient().GetSiseTimeKosdaqList(condition);
            return View(siseTimeKosdaqList);
        }

        /// <summary>
        /// 코스닥 일별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseDayKosdaqList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseDayKosdaqList = new FinanceService.FinanceServiceClient().GetSiseDayKosdaqList(condition);
            return View(siseDayKosdaqList);
        }
        #endregion
        #region/* =========== Domestic Stock Fut =============*/
        /// <summary>
        /// 국내주요시세 > 선물
        /// </summary>
        /// <returns></returns>
        public ActionResult Fut()
        {
            StockInfoModel<usp_GetSiseCurrent_Result, usp_getSiseMainmergecode_Result> stockInfoModel = new FinanceService.FinanceServiceClient().GetSiseFutInfo();
            return View(stockInfoModel);
        }

        /// <summary>
        /// 선물 시간대별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseTimeFutList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseTimeFutList = new FinanceService.FinanceServiceClient().GetSiseTimeFutList(condition);
            return View(siseTimeFutList);
        }

        /// <summary>
        /// 선물 일별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseDayFutList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseDayFutList = new FinanceService.FinanceServiceClient().GetSiseDayFutList(condition);
            return View(siseDayFutList);
        }
        #endregion
        #region/* =========== Domestic Stock Kospi200 =============*/
        /// <summary>
        /// 국내주요시세 > 코스피200 
        /// </summary>
        /// <returns></returns>
        public ActionResult Kospi200()
        {
            StockInfoModel<usp_GetSiseCurrentKPI_Result, usp_getSiseMainmergecode_Result> stockInfoModel = new FinanceService.FinanceServiceClient().GetSiseKPIInfo();

            //오늘날짜를 8자리로 추출
            bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = String.Format("{0:yyyyMMdd}", DateTime.Now) });
            //bool chkStockHoliday = new FinanceService.FinanceServiceClient().GetCheckStockHoliday(new HolidayCondition { CheckDt = "20150815" });
            ViewBag.CheckStockHoliday = chkStockHoliday;

            return View(stockInfoModel);
        }

        /// <summary>
        /// 코스피200 시간대별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseTimeKPI200List(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseTimeKPI200List = new FinanceService.FinanceServiceClient().GetSiseTimeKpi200List(condition);
            return View(siseTimeKPI200List);
        }

        /// <summary>
        /// 코스피200 일별 체결
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseDayKPI200List(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseDayKPI200List = new FinanceService.FinanceServiceClient().GetSiseDayKpi200List(condition);
            return View(siseDayKPI200List);
        }

        /// <summary>
        /// 코스피200 편입종목
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult SiseWowNetKPI200StockGroupList(FinanceCondition condition)
        {
            condition.PageSize = 7;
            var siseWowNetKPI200StockGroupList = new FinanceService.FinanceServiceClient().GetWowNetKPI200StockGroupList(condition);
            return View(siseWowNetKPI200StockGroupList);
        }
        #endregion

        #region/* =========== Domestic Stock ETF =============*/
        /// <summary>
        /// 국내증시 > ETF 
        /// </summary>
        /// <returns></returns>
        public ActionResult ETF()
        {
            ListModel<usp_wownet_ETF_stock_group_Result> siseETFGroupModel = new FinanceService.FinanceServiceClient().GetWowNetETFStockGroupList();
            return View(siseETFGroupModel);
        }
        #endregion
        #region/* =========== Domestic Stock IndustryPart =============*/
        public ActionResult IndustryPart(string targetDt, string Market, string menuTab)
        {            
            ViewBag.prevTargetDt = targetDt;
            ViewBag.prevMarket = Market;
            ViewBag.prevMenuTab = menuTab;

            return View();
        }

        public ActionResult IndustryPartList(IndustryCondition condition,string market, string menuTab)
        {
            condition.ViewMode = true;
            if (String.IsNullOrEmpty(menuTab))
            {
                ViewBag.MenuTab = "Security";
            }
            else
            {
                ViewBag.MenuTab = menuTab;
            }

            if (String.IsNullOrEmpty(condition.Market) || String.IsNullOrEmpty(condition.TargetDT))
            {
                condition.Market = "t";
                condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            }

            ListModel<usp_GetIndustryState_Result> industryPartList = new FinanceService.FinanceServiceClient().GetIndustryStateList(condition);
            ViewBag.IndustryCondition = condition;

            //기관,외국인,개인 매매현황 차트종류
            //ViewBag.Chart = chart;

            return View(industryPartList);
        }

        public ActionResult IndustryPartDetail(IndustryCondition condition,string MenuTab)
        {            
            if (String.IsNullOrEmpty(condition.Market) || String.IsNullOrEmpty(condition.TargetDT))
            {
                condition.Market = "t";
                condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
                //condition.PartCode = "22";
            }
            //IndustryInfoModel<usp_web_getDomesticIndustryIndex_Result, List<t_part>, List<t_kosdaq_part>, ListModel<usp_GetIndustryDetail_Result>, ListModel<MarketResearchModel>> industryInfo = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);

            var targetdt = condition.TargetDT.Replace("-", "/");
            
            var resultData = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);
            //IndustryInfoModel industryInfo = new IndustryInfoModel();
            //industryInfo.StockInfo = resultData.StockInfo;
            //if (industryInfo.StockInfo == null)
            //{
            //    condition.TargetDT = targetdt;
            //    resultData = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);
            //}
            //industryInfo.StockInfo = resultData.StockInfo;
            //industryInfo.KospiIndustryPart = resultData.KospiIndustryPart.ToList();
            //industryInfo.KosdaqIndustryPart = resultData.KosdaqIndustryPart.ToList();
            //industryInfo.DetailList = resultData.DetailList;
            //industryInfo.MarketSearchTop3List = resultData.MarketSearchTop3List;

            condition.Market = condition.Market.ToUpper();
            ViewBag.IndustryCondition = condition;
            ViewBag.TargetDt = condition.TargetDT;
            ViewBag.MenuSeq = condition.MenuSeq;
            ViewBag.MenuSubTab = MenuTab;
            //ViewBag.MarketResearchTop3List = marketResearchTop3List;

            return View(resultData);
        }

        public ActionResult IndustryPartStock(IndustryCondition condition)
        {
            condition.PageSize = 20;
            ListModel<usp_web_getDomesticIndustryStock_Result> industryPartStockList = new FinanceService.FinanceServiceClient().GetIndustryStockList(condition);
            //ViewBag.IndustryCondition = condition;

            return View(industryPartStockList);
        }

        #endregion

        #region/*============Domestic Stock ThemaPart==============*/
        public ActionResult ThemaPart()
        {
            ListModel<usp_GetThemaJisu_Result> themaJisuList = new FinanceService.FinanceServiceClient().GetThemaJisuList();
            return View(themaJisuList);
        }

        public ActionResult ThemaPartNameList(ThemaCondition condition, string currentPartNum, string currentPartName)
        {

            condition.PartNum = int.Parse(currentPartNum);
            ViewBag.PartName = currentPartName;

            ListModel<usp_GetThemaOnline_Result> themaOnlineList = new FinanceService.FinanceServiceClient().GetThemaOnlineList(condition);

            return View(themaOnlineList);
        }

        #endregion

        #region/* =========== Domestic Stock Upper =============*/
        /// <summary>
        /// 국내주요시세 > 상한가
        /// </summary>
        /// <returns></returns>
        public ActionResult Upper()
        {
            return View();
        }
        public ActionResult UpperKospi(UpperCondition condition)
        {
            condition.Market = "1";

            ListModel<usp_web_getSiseUpper_Result> KospiUpperList = new FinanceServiceClient().GetSiseUpperList(condition);

            return View(KospiUpperList);
        }
        public ActionResult UpperKosdaq(UpperCondition condition)
        {
            condition.Market = "2";

            ListModel<usp_web_getSiseUpper_Result> KospiUpperList = new FinanceServiceClient().GetSiseUpperList(condition);

            return View(KospiUpperList);
        }
        #endregion

        #region/* =========== Domestic Stock Lower =============*/
        /// <summary>
        /// 국내주요시세 > 하한가
        /// </summary>
        /// <returns></returns>
        public ActionResult Lower()
        {
            return View();
        }
        public ActionResult LowerKospi(LowerCondition condition)
        {
            condition.Market = "1";

            ListModel<usp_web_getSiseLower_Result> KospiLowerList = new FinanceServiceClient().GetSiseLowerList(condition);

            return View(KospiLowerList);
        }
        public ActionResult LowerKosdaq(LowerCondition condition)
        {
            condition.Market = "2";

            ListModel<usp_web_getSiseLower_Result> KospiLowerList = new FinanceServiceClient().GetSiseLowerList(condition);

            return View(KospiLowerList);
        }

        #endregion

        #region/* =========== Domestic Stock IndustryPartUpper =============*/
        /// <summary>
        /// 국내주요시세 > 업종상위
        /// </summary>
        /// <returns></returns>
        public ActionResult IndustryPartUpper(string menuTab)
        {
            ViewBag.menuTab = menuTab;

            return View();
        }
        public ActionResult IndustryPartUpperkospi(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market))
            {
                condition.Market = "t";
                //condition.TargetDT = "2017-06-23";
            }
            condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            ViewBag.IndustryCondition = condition;
            ListModel<usp_web_GetSiseStockPlus_Result> industryPartUpperKospiList = new FinanceService.FinanceServiceClient().GetSiseStockPlusList();
            return View(industryPartUpperKospiList);
        }
        public ActionResult IndustryPartUpperKosdaq(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market))
            {
                condition.Market = "k";
                //condition.TargetDT = "2017-06-23";
            }
            condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            ViewBag.IndustryCondition = condition;
            ListModel<usp_web_GetSiseStockPlusK_Result> industryPartUpperKosdaqList = new FinanceService.FinanceServiceClient().GetSiseStockPlusKList();
            return View(industryPartUpperKosdaqList);
        }
        public ActionResult IndustryPartUpperDetail(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market))
            {
                condition.Market = "t";
                condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
                //condition.PartCode = "22";
            }

            var targetdt = condition.TargetDT.Replace("-", "/");

            var resultData = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);
            IndustryInfoModel industryInfo = new IndustryInfoModel();
            industryInfo.StockInfo = resultData.StockInfo;
            if (industryInfo.StockInfo == null)
            {
                condition.TargetDT = targetdt;
                resultData = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);
            }
            

            ViewBag.IndustryCondition = condition;
            ViewBag.TargetDt = condition.TargetDT;
            ViewBag.MenuSeq = condition.MenuSeq;
            ViewBag.MenuSubTab = condition.Market;

            return View(resultData);
        }
        

        #endregion  

        #region/* =========== Domestic Stock MarketSum =============*/
        /// <summary>
        /// 국내주요시세 > 시가총액
        /// </summary>
        /// <returns></returns>
        public ActionResult MarketSum()
        {
            return View();
        }
        public ActionResult MarketSumKospi(MarketCondition condition)
        {
            //1 : Kospi
            condition.Market = "1";

            ListModel<usp_web_getSiseMarketSum_Result1> marketSumKospiList = new FinanceService.FinanceServiceClient().GetSiseMarketSumList(condition);

            return View(marketSumKospiList);
        }
        public ActionResult MarketSumKosdaq(MarketCondition condition)
        {
            //2 : Kosdaq
            condition.Market = "2";

            ListModel<usp_web_getSiseMarketSum_Result1> marketSumKosdaqList = new FinanceService.FinanceServiceClient().GetSiseMarketSumList(condition);

            return View(marketSumKosdaqList);
        }

        #endregion

        #region/* =========== Domestic Stock Invest =============*/
        public ActionResult Invest()
        {
            return View();
        }

        public ActionResult InvestDay(string menuTab)
        {
            ListModel<usp_GetInvestOnline_Result> investDayList = new FinanceService.FinanceServiceClient().GetInvestOnlineList();
            ViewBag.menuTab = menuTab;
            return View(investDayList);
        }

        public ActionResult InvestWeek(string menuTab)
        {
            InvestCondition condition = new InvestCondition { fromDate = 7 };
            ListModel<usp_GetInvestTotal_Result> investWeekList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
            ViewBag.menuTab = menuTab;
            return View(investWeekList);
        }

        public ActionResult InvestMonth(string menuTab)
        {
            //InvestCondition condition = new InvestCondition { fromDate = Convert.ToInt32(DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month)) };
            DateTime currentDate = DateTime.Now;
            DateTime preMonth = DateTime.Now.AddMonths(-1);
            double distanceDay = (currentDate - preMonth).TotalDays;
            InvestCondition condition = new InvestCondition { fromDate = Convert.ToInt32(distanceDay) };
            ListModel<usp_GetInvestTotal_Result> investMonthList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
            ViewBag.menuTab = menuTab;
            return View(investMonthList);
        }

        public ActionResult InvestQuarter(string menuTab)
        {
            //InvestCondition condition = new InvestCondition { fromDate = getQuarterDays() };
            DateTime currentDate = DateTime.Now;
            DateTime quarterDate = DateTime.Now.AddMonths(-3);
            double distanceDay = (currentDate - quarterDate).TotalDays;
            InvestCondition condition = new InvestCondition { fromDate = Convert.ToInt32(distanceDay) };
            ListModel<usp_GetInvestTotal_Result> investQuarterList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
            ViewBag.menuTab = menuTab;
            return View(investQuarterList);
        }

        private int getQuarterDays()
        {
            int currentYear, currentMonth, quarterDays, i;
            currentYear = DateTime.Now.Year;
            currentMonth = DateTime.Now.Month;
            quarterDays = 0;
            for (i = 0; i < 3; i++)
            {
                quarterDays += DateTime.DaysInMonth(currentYear, currentMonth - i);
            }

            return quarterDays;
        }

        #endregion

        #region/* =========== Domestic Stock ForeignHold =============*/
        /// <summary>
        /// 국내주요시세 > 외국인보유현황
        /// </summary>
        /// <returns></returns>
        public ActionResult ForeignHold()
        {
            return View();
        }

        public ActionResult ForeignHoldKospi(MarketCondition condition)
        {
            //1: Kospi
            condition.Market = "1";
            ListModel<usp_web_getSiseForeignHold_Result> foreignHoldKospiList = new FinanceService.FinanceServiceClient().GetSiseForeignHoldList(condition);
            return View(foreignHoldKospiList);
        }

        public ActionResult ForeignHoldKosdaq(MarketCondition condition)
        {
            //2: Kosdaq
            condition.Market = "2";
            ListModel<usp_web_getSiseForeignHold_Result> foreignHoldKosdaqList = new FinanceService.FinanceServiceClient().GetSiseForeignHoldList(condition);
            return View(foreignHoldKosdaqList);
        }
        #endregion

        #region  DomesticStockDetail

        // Finance 종목상세 
        public ActionResult DomesticStockDetail(FinanceCondition condition)
        {
            usp_GetStockPrice_Result StockObj;

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
                //if (chart5DayArr.Length > 1)
                //{
                //    imgUrl9101 = chart5DayArr[3];
                //    //opinionConsultStr = chart5DayArr[8];
                //}
                //else
                //{
                //    imgUrl9101 = "";
                //}

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
                //ViewBag.ImgUrl9101 = imgUrl9101;
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

        //종목상세 > 관심종목 등록
        public JsonResult SaveMyFavoriteStock(string stockCode)
        {
            string msg = string.Empty;
            bool isSuccess = true;
            try
            {
                MyActiveServiceClient myActiveService = new MyActiveServiceClient();
                myActiveService.SaveMyFavoriteJongMok(LoginHandler.CurrentLoginUser, stockCode);
            }
            catch (Exception e)
            {
                return Json(new { IsSuccess = false, Msg = e.Message });
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }

        //종목상세 > 종합정보
        public ActionResult DomesticStockDetailTotalInfo(StockInvestorCondition condition)
        {
            DomesticStockDetailTotalInfoModel totalInfoModel;
            StockInvestorCondition stockInvestorCondition;
            DiscurssionCondition discussionCondition;
            ConsultCondition consultCondition;
            StockCafeCondition stockCafeCondition;

            if (!String.IsNullOrEmpty(condition.ShortCode) && !String.IsNullOrEmpty(condition.StockCode))
            {
                stockInvestorCondition = new StockInvestorCondition { Type = "s", ShortCode = condition.ShortCode };

                var stockInvestorSellList = new FinanceService.FinanceServiceClient().GetStockInvestorList(stockInvestorCondition);

                stockInvestorCondition.Type = "b";

                var stockInvestorBuyList = new FinanceService.FinanceServiceClient().GetStockInvestorList(stockInvestorCondition);

                var stockInvestorSumList = new FinanceService.FinanceServiceClient().GetStockInvestorSumList(condition);

                var stockPartList = new FinanceService.FinanceServiceClient().GetStockPartList(condition);

                var stockThemaList = new FinanceService.FinanceServiceClient().GetStockThemaList(condition);

                var relativeStockList = new FinanceService.FinanceServiceClient().GetRelativeStockList(condition);

                discussionCondition = new DiscurssionCondition { ArjCode = condition.ShortCode };

                var discussionTop9List = new FinanceService.FinanceServiceClient().GetDiscussionTop9List(discussionCondition);

                consultCondition = new ConsultCondition { CName = condition.CName };

                var consultTop9List = new FinanceService.FinanceServiceClient().GetConsultTop9List(consultCondition);

                stockCafeCondition = new StockCafeCondition { ArjCode = condition.ShortCode };

                var stockCafeTop3List = new FinanceService.FinanceServiceClient().GetStockCafeTop3List(stockCafeCondition);
                //ADBanner
                //ADBannnerCondition adBannerCondition = new ADBannnerCondition { Type = 5, Area = 3 };
                //var adBanner1 = new FinanceService.FinanceServiceClient().GetADBannner(adBannerCondition);
                //adBannerCondition.Type = 5;
                //adBannerCondition.Area = 2;
                //var adBanner2 = new FinanceService.FinanceServiceClient().GetADBannner(adBannerCondition);

                var recentNewsList = new FinanceService.FinanceServiceClient().GetRecentNewsTop4List(new ArticleStockCondition { ArjCode = condition.ShortCode });

                totalInfoModel = new DomesticStockDetailTotalInfoModel
                {
                    ArjCode = condition.ShortCode,
                    StockCode = condition.StockCode,
                    SupplyDemandSellList = stockInvestorSellList,
                    SupplyDemandBuyList = stockInvestorBuyList,
                    InvestorSumList = stockInvestorSumList,
                    StockPartList = stockPartList,
                    StockThemaList = stockThemaList,
                    RelativeStockList = relativeStockList,
                    DiscussionList = discussionTop9List,
                    ConsultList = consultTop9List,
                    StockCafeList = stockCafeTop3List,
                    RecentNewsList = new FinanceService.FinanceServiceClient().GetRecentNewsTop4List(new ArticleStockCondition { ArjCode = condition.ShortCode }),
                    RecentNoticeList = new FinanceService.FinanceServiceClient().GetNoticeTop6List(new NoticeStockCondition { StockCode = condition.StockCode })
                    //AdBanner1 = adBanner1,
                    //AdBanner2 = adBanner2
                };

            }
            else
            {
                totalInfoModel = new DomesticStockDetailTotalInfoModel();
            }

            return View(totalInfoModel);
        }

        //public ActionResult DomesticStockDetailRecentNews(ArticleStockCondition condition)
        //{
        //    var recentNewsTop4List = new FinanceService.FinanceServiceClient().GetRecentNewsTop4List(condition);
        //    return View(recentNewsTop4List);
        //}

        //종목상세 > 현재가
        public ActionResult DomesticStockDetailCurPrice(CurrentAnalysisCondition condition)
        {
            CurrentAnalysisModel currentAnalysisModel = new CurrentAnalysisModel
            {
                LatestStockPrice = new FinanceService.FinanceServiceClient().GetLatestStockPrice(condition),
                StockHoga = new FinanceService.FinanceServiceClient().GetStockHoga(condition),
                StockDealing5List = new FinanceService.FinanceServiceClient().GetStockDealing5List(condition),
                DayStockPriceBandList = new FinanceService.FinanceServiceClient().GetDayStockPriceBandList(condition),
                
            };
            return View(currentAnalysisModel);
        }

        //종목상세 > 현재가 > 단일종목현재가 시간대별 리스트
        public ActionResult GetStockNowPriceTimeList(CurrentAnalysisCondition condition)
        {
            condition.PageSize = 10;
            var stockNowTimeList = new FinanceService.FinanceServiceClient().GetStockNowPriceTimeList(condition);
            return View(stockNowTimeList);
        }

        //종목상세 > 현재가 > 단일종목현재가 일별 리스트
        public ActionResult GetStockNowPriceDayList(CurrentAnalysisCondition condition)
        {
            condition.PageSize = 10;
            var stockNowDayList = new FinanceService.FinanceServiceClient().GetStockNowPriceDayList(condition);
            return View(stockNowDayList);
        }

        public ActionResult RecentlyStockTimeTop10List(CurrentAnalysisCondition condition)
        {
            ListModel<usp_SelectStockRecentlyTime_Result> recentlyStockTimeList = new FinanceService.FinanceServiceClient().GetSelectStockRecentlyTimeList(condition);

            if (recentlyStockTimeList != null)
            {
                recentlyStockTimeList.ListData = recentlyStockTimeList.ListData.Take(10).ToList();
            }

            return View(recentlyStockTimeList);
        }

        public ActionResult RecentlyStockDayTop10List(CurrentAnalysisCondition condition)
        {
            ListModel<usp_SelectStockRecentlyDay_Result> recentlyStockDayList = new FinanceService.FinanceServiceClient().GetSelectStockRecentlyDayList(condition);

            if (recentlyStockDayList != null)
            {
                recentlyStockDayList.ListData = recentlyStockDayList.ListData.Take(10).ToList();
            }

            return View(recentlyStockDayList);
        }

        //종목상세 > 외국인,기관
        public ActionResult DomesticStockDetailForeignerSecurity(CurrentAnalysisCondition condition)
        {
            ListModel<usp_web_getTradeTrend_Result> tradeTrendList = new ListModel<usp_web_getTradeTrend_Result>();
            if (!String.IsNullOrEmpty(condition.StockCode))
            {
                tradeTrendList = new FinanceService.FinanceServiceClient().GetTradeTrendList(condition);
            }
            return View(tradeTrendList);
        }

        //종목상세 > 뉴스, 공시
        public ActionResult DomesticStockDetailNewsNotices(CurrentAnalysisCondition condition)
        {
            return View();
        }

        public ActionResult DomesticStockDetailSubNewsTab(ArticleStockCondition condition)
        {
            ViewBag.Condition = condition;

            return View();
        }

        public ActionResult DomesticStockDetailStockNewsList(ArticleStockCondition condition)
        {
            ListModel<ArticleStock> resultData = new ListModel<ArticleStock>();
            if (!String.IsNullOrEmpty(condition.ArjCode))
            {
                resultData = new FinanceService.FinanceServiceClient().GetStockNewsList(condition);
            }

            return View(resultData);
        }

        public ActionResult DomesticStockDetailSubNoticesTab(NoticeStockCondition condition)
        {
            ViewBag.Condition = condition;
            return View();
        }

        public ActionResult DomesticStockDetailStockNoticesList(NoticeStockCondition condition)
        {
            ListModel<usp_web_getStockGongsi_Result> resultData = new ListModel<usp_web_getStockGongsi_Result>();
            if (!String.IsNullOrEmpty(condition.StockCode))
            {
                resultData = new FinanceService.FinanceServiceClient().GetStockGongsiList(condition);
            }
            return View(resultData);
        }

        public ActionResult DomesticStockDetailSNoticeView(NoticeStockCondition condition)
        {
            //ListModel<usp_web_getStockGongsiView_Result> resultData = new ListModel<usp_web_getStockGongsiView_Result>();
            //resultData = new FinanceService.FinanceServiceClient().GetStockGongsiViewList(condition);
            ViewBag.NoticeCondition = condition;
            return View();
        }

        public ActionResult NoticeIframeView(NoticeStockCondition condition)
        {
            ListModel<usp_web_getStockGongsiView_Result> resultData = new ListModel<usp_web_getStockGongsiView_Result>();
            resultData = new FinanceService.FinanceServiceClient().GetStockGongsiViewList(condition);
            return View(resultData);
        }

        public ActionResult DomesticStockDetailStockNewsView(ArticleStockCondition condition)
        {
            ViewBag.Condition = condition;

            string arjCode = condition.ArjCode;
            string articleId = condition.ArticleId;

            if (string.IsNullOrEmpty(articleId))
            {
                articleId = Request["articleId"];
            }

            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
            }

            //종목코드 리스트
            var articleStockList = new NewsCenterServiceClient().GetArticleStockList(articleId).ListData;

            //1개의 종목코드
            string stockCode = string.Empty;

            if (articleStockList != null)
            {
                stockCode = articleStockList.FirstOrDefault().StockCode;

                ViewBag.currentPrice = new CharacterStockService.CharacterStockServiceClient().GetCurrentPrice(stockCode);

                //해당기사 관련종목 추출
                var relativeStockList = new List<usp_GetStockPrice_Result>();
                foreach (var item in articleStockList)
                {
                    relativeStockList.Add(new CharacterStockService.CharacterStockServiceClient().GetCurrentPrice(item.StockCode));
                }

                ViewBag.relativeStockList = relativeStockList;
            }

            //기사 상세 내용
            var model = new NewsCenterServiceClient().GetNewsReadInfo(condition.ArticleId, prevArticleId, "MWEB");
            //기자 정보
            var reporterInfo = new ReporterService.ReporterServiceClient().GetReporterInfo(model.REPORTER_ID);

            NewsViewModel newsViewModel = new NewsViewModel { NewsContent = model, ReporterInfo = reporterInfo };
            ViewBag.articleStockList = articleStockList;
            return View(newsViewModel);
        }

        //최근뉴스에서 뉴스,공시 뷰로 가기위한 뷰
        public ActionResult RecentlyNewsNoticeView(CurrentAnalysisCondition condition)
        {
            return View();
        }

        ////종목상세 > 기업분석
        //public ActionResult DomesticStockDetailCompanyAnalysis(CurrentAnalysisCondition condition)
        //{
        //    return View();
        //}

        //종목상세 > 종목동영상
        public ActionResult DomesticStockDetailStockVod(CurrentAnalysisCondition condition)
        {
            return View();
        }

        //종목상세 > 종목동영상 > 종목영상
        public ActionResult DomesticStockDetailStockVodList(VodCondition condition)
        {
            ListModel<usp_web_vodList_Result> resultData = new ListModel<usp_web_vodList_Result>();
            if (!String.IsNullOrEmpty(condition.ArjCode))
            {
                condition.ArjCode = "A" + condition.ArjCode;
                resultData = new FinanceService.FinanceServiceClient().GetVodList(condition);
            }

            return View(resultData);
        }

        public ActionResult DomesticStockDetailInvestVodList(VodInvestCondition condition)
        {
            ListModel<usp_web_getInvestVodList_Result> resultData = new ListModel<usp_web_getInvestVodList_Result>();
            if (!String.IsNullOrEmpty(condition.CtCode))
            {
                resultData = new FinanceService.FinanceServiceClient().GetInvestVodList(condition);
            }

            return View(resultData);
        }
        #endregion


        public ActionResult GetChart(string trId, string code, string width, string height)
        {
            var condition = new HpCondition()
            {
                Trid = trId,
                Code = code
            };

            if (!String.IsNullOrEmpty(width) && !String.IsNullOrEmpty(height))
            {
                condition.Width = width;
                condition.Height = height;
            }

            var resultData = new FinanceService.FinanceServiceClient().GetHpFinderChart(condition);

            if (resultData.Contains("|"))
            {
                var splitList = resultData.Split('|');
                return Json(new { splitList = splitList });
            }

            return Json(new { });
        }

        #region/* =========== Chart Data JsonResult =============*/
        /// <summary>
        /// 국내주요시세 > 업종별 차트 데이터
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public JsonResult IndustryPartData(IndustryCondition condition)
        {
            ListModel<usp_GetIndustryState_Result> industryPartList = new FinanceService.FinanceServiceClient().GetIndustryStateList(condition);
            return Json(industryPartList.ListData.ToList().Take(3));
        }

        /// <summary>
        /// 국내주요시세 > 코스피 시간대별 차트 데이터
        /// </summary>
        /// <returns></returns>
        public JsonResult SiseTimeKospiData(ChartCondition condition)
        {
            ListModel<usp_web_getDomesticIndex_Result> list = new FinanceService.FinanceServiceClient().GetSiseChartDataList(condition);
            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }

        /// <summary>
        /// 국내주요시세 > 코스닥 시간대별 차트 데이터
        /// </summary>
        /// <returns></returns>
        public JsonResult SiseTimeKosdaqData(ChartCondition condition)
        {
            ListModel<usp_web_getDomesticIndex_Result> list = new FinanceService.FinanceServiceClient().GetSiseChartDataList(condition);
            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }

        /// <summary>
        /// 국내주요시세 > 선물 시간대별 차트 데이터
        /// </summary>
        /// <returns></returns>
        public JsonResult SiseTimeFutData(ChartCondition condition)
        {
            ListModel<usp_web_getDomesticIndex_Result> list = new FinanceService.FinanceServiceClient().GetSiseChartDataList(condition);

            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }

        /// <summary>
        /// 국내주요시세 > 코스피200 시간대별 차트 데이터
        /// </summary>
        /// <returns></returns>
        public JsonResult SiseTimeKPI200Data(ChartCondition condition)
        {
            ListModel<usp_web_getDomesticIndex_Result> list = new FinanceService.FinanceServiceClient().GetSiseChartDataList(condition);
            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }

    #endregion
    }
}