using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.Finance.Models;
using Wow.Tv.FrontWeb.FinanceService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.Article.Finance;
using Wow.Tv.Middle.Model.Db49.wowcafe.Finance;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.Finance;
using Wow.Tv.Middle.Model.Db49.editVOD.Stock;
using Wow.Tv.FrontWeb.App_Start;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.FrontWeb.MyActiveService;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using System.Runtime.InteropServices;
using System.Text;
using Wow.Tv.Middle.Model.Db49.editVOD;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.FrontWeb.Areas.Finance.Controllers
{
    public class DomesticStockController : BaseController
    {
        /// <summary>
        /// JokeBox FoxList.ini 파일 데이터 가져오기
        /// </summary>
        /// <param name="section"></param>
        /// <param name="key"></param>
        /// <param name="def"></param>
        /// <param name="retVal"></param>
        /// <param name="size"></param>
        /// <param name="filepath"></param>
        /// <returns></returns>
        [DllImport("kernel32.dll")]
        //ini 파일 읽기
        private static extern int GetPrivateProfileString(String section, String key, String def, StringBuilder retVal, int size, String filepath);

        // Finance 메인 : Shared > _LayoutFinance.cshtml
        public ActionResult Index()
        {

            HttpCookie cookie = HttpContext.Request.Cookies.Get("searchStock");

            string cookieValue = "";

            if((cookie != null) && (cookie.Value != ""))
            {
                cookieValue = HttpUtility.UrlDecode(cookie.Value);
            }
            
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
                ////GetThemaPartUpperList = new FinanceService.FinanceServiceClient().GetThemaJisuList().ListData.Take(6).ToList()
                GetThemaPartUpperList = new FinanceService.FinanceServiceClient().GetThemaJisuTopList().Take(6).ToList(),
                HotSearchList = new TradingService.TradingServiceClient().GetHotSearchList(DateTime.Now.ToString("yyyyMMdd")).ToList(),
                EconomyStockColumn = new NewsMainService.NewsMainServiceClient().GetNewsMainMarketList("ECONOMY_STOCK", 5, new List<string>().ToArray()).ListData,
                BestProHintStockingList = new FinanceService.FinanceServiceClient().GetBestProHintStockingList(),
                LecturesList = new LectureService.LectureServiceClient().GetLatestLecture(),
                //LecturesList = new LectureService.LectureServiceClient().GetList(new LectureCondition { LecturesDate = "2017-06-23", CurrentSite = "Front" })
                CurrentSearchStockList = new FinanceService.FinanceServiceClient().GetCurrentSearchStockList()
            };
            //ViewBag.RecentlyWord = cookieValue;
            return View(domesticMainModel);
        }

        public ActionResult CharacterStockInfor(CharacterStockCondition condition)
        {
            return View(condition);
        }

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

                consultCondition = new ConsultCondition { CName = condition.CName};

                var consultTop9List = new FinanceService.FinanceServiceClient().GetConsultTop9List(consultCondition);

                stockCafeCondition = new StockCafeCondition { ArjCode = condition.ShortCode };

                var stockCafeTop3List = new FinanceService.FinanceServiceClient().GetStockCafeTop3List(stockCafeCondition);
                //ADBanner
                //ADBannnerCondition adBannerCondition = new ADBannnerCondition { Type = 5, Area = 3 };
                //var adBanner1 = new FinanceService.FinanceServiceClient().GetADBannner(adBannerCondition);
                //adBannerCondition.Type = 5;
                //adBannerCondition.Area = 2;
                //var adBanner2 = new FinanceService.FinanceServiceClient().GetADBannner(adBannerCondition);
                
                totalInfoModel = new DomesticStockDetailTotalInfoModel {
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
                    StockCafeList = stockCafeTop3List
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

        public ActionResult DomesticStockDetailRecentNews(ArticleStockCondition condition)
        {
            var recentNewsTop4List = new FinanceService.FinanceServiceClient().GetRecentNewsTop4List(condition);
            return View(recentNewsTop4List);
        }
        //최근뉴스에서 뉴스,공시 뷰로 가기위한 뷰
        public ActionResult RecentlyNewsNoticeView(CurrentAnalysisCondition condition)
        {
            return View();
        }

        public ActionResult DomesticStockDetailRecentNotices(NoticeStockCondition condition)
        {
            var recentNoticeTop6List = new FinanceService.FinanceServiceClient().GetNoticeTop6List(condition);
            return View(recentNoticeTop6List);
        }

        //종목상세 > 현재가
        public ActionResult DomesticStockDetailCurPrice(CurrentAnalysisCondition condition)
        {
            CurrentAnalysisModel currentAnalysisModel = new CurrentAnalysisModel {
                LatestStockPrice = new FinanceService.FinanceServiceClient().GetLatestStockPrice(condition),
                StockHoga = new FinanceService.FinanceServiceClient().GetStockHoga(condition),
                StockDealing5List = new FinanceService.FinanceServiceClient().GetStockDealing5List(condition),
                DayStockPriceBandList = new FinanceService.FinanceServiceClient().GetDayStockPriceBandList(condition)
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
           
            if(recentlyStockTimeList != null)
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
        private static string GetIniValue(String Section, String Key)
        {
            StringBuilder temp = new StringBuilder(255);
            int i = GetPrivateProfileString(Section, Key, "", temp, 255, System.Web.HttpContext.Current.Server.MapPath("~/Areas/Finance/JukeBox/FoxList.ini"));
            string[] tmpArr = temp.ToString().Split('=');
            return tmpArr[2];
        }
        
        //종목상세 > 주가예측차트
        public ActionResult DomesticStockDetailPredictionChart(CurrentAnalysisCondition condition)
        {
            TradingStockCondition tradingCondition = new TradingStockCondition();
            PredictionChartModel predictionChartModel = new PredictionChartModel();

            if (!String.IsNullOrEmpty(condition.StockCode) && !String.IsNullOrEmpty(condition.ArjCode))
            {
                tradingCondition = new TradingStockCondition { UserCode = "269685359", UserName = "WOWUSER", CodeList = condition.ArjCode.Replace("A", ""), ProgramID = "WOWNET", Mission = "DIAG", StrConversion = 2, CodeOnly = 2 };
                string tradingSignalStr = new TradingService.TradingServiceClient().GetStockData(tradingCondition);
            
                if (!String.IsNullOrEmpty(tradingSignalStr))
                {
                    string[] tradingSignalArr = tradingSignalStr.Split('|');

                    if(tradingSignalArr.Length > 3)
                    {
                        //"269685359|WOWUSER|005930|1_5_6_5_0|1003_|2003_2005_2008_2012_2015_|3004_3017_3020_3029_3030_3031_|4028_4029_4061_4062_4063_|\r"
                        string[] arr1 = tradingSignalArr[4].Split('_');     //강한 매도 관련 리포트
                        string[] arr2 = tradingSignalArr[5].Split('_');     //매도 관련 리포트
                        string[] arr3 = tradingSignalArr[6].Split('_');     //중립 관련 리포트
                        string[] arr4 = tradingSignalArr[7].Split('_');     //매수 관련 리포트
                        string[] arr5 = tradingSignalArr[8].Split('_');     //강한 매수 관련 리포트

                        
                        //0 : 강한매도, 1 매도, 2 중립, 3 매수, 4 강한매수 건수
                        //{"0", "3", "5", "1", "0"}
                        tradingSignalArr = tradingSignalArr[3].Split('_');

                        if(tradingSignalArr.Length > 4)
                        {

                            predictionChartModel = new PredictionChartModel {
                                ArjCode = condition.ArjCode.Replace("A", ""),

                                MaxInvestOpinionCnt = tradingSignalArr.Select(v => int.Parse(v)).Max(),
                                InvestOpinionIdx = Array.IndexOf(tradingSignalArr, tradingSignalArr.Select(v => int.Parse(v)).Max().ToString()),
                                StrongBuyCnt = Convert.ToInt32(tradingSignalArr[4]),
                                BuyCnt = Convert.ToInt32(tradingSignalArr[3]),
                                MiddleCnt = Convert.ToInt32(tradingSignalArr[2]),
                                SellCnt = Convert.ToInt32(tradingSignalArr[1]),
                                StrongSellCnt = Convert.ToInt32(tradingSignalArr[0]),
                                StrongSellReport = GetReportList(arr1),
                                SellReport = GetReportList(arr2),
                                MiddleReport = GetReportList(arr3),
                                BuyReport = GetReportList(arr4),
                                StrongBuyReport = GetReportList(arr5)
                            };
                        }
                    }
                }
            }
            
            return View(predictionChartModel);
        }
        /// <summary>
        /// JukeBox/FoxList.ini 매매신호 가져오기
        /// </summary>
        /// <param name="inputReportData"></param>
        /// <returns></returns>
        private List<string> GetReportList(string[] inputReportData)
        {
            List<string> resultList = new List<string>();
            for (int i = 0; i < inputReportData.Length; i++)
            {
                int tmpNum;

                if (Int32.TryParse(inputReportData[i], out tmpNum))
                {
                    resultList.Add(GetIniValue("MENULIST", inputReportData[i]));
                }
            }

            return resultList;
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

        public ActionResult DomesticStockDetailSubNoticesTab(NoticeStockCondition condition)
        {
            ViewBag.Condition = condition;
            return View();
        }

        public ActionResult DomesticStockDetailSubENoticesTab(NoticeStockCondition condition)
        {
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

            if(Request.UrlReferrer != null)
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
            var model = new NewsCenterServiceClient().GetNewsReadInfo(condition.ArticleId, prevArticleId, "WEB");
            //기자 정보
            var reporterInfo = new ReporterService.ReporterServiceClient().GetReporterInfo(model.REPORTER_ID);

            NewsViewModel newsViewModel = new NewsViewModel { NewsContent = model, ReporterInfo = reporterInfo };
            ViewBag.articleStockList = articleStockList;
            return View(newsViewModel);
        }

        public ActionResult DomesticStockDetailStockNoticesList(NoticeStockCondition condition)
        {
            ListModel < usp_web_getStockGongsi_Result > resultData = new ListModel<usp_web_getStockGongsi_Result>();
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

        //종목상세 > 기업분석
        public ActionResult DomesticStockDetailCompanyAnalysis(CurrentAnalysisCondition condition)
        {
            return View();
        }

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

        //종목상세 > 우측공통 > 종목상담
        public ActionResult DomesticStockDetailRightCommonStockConsult(VodCondition condition)
        {
            var vodTop6List = new FinanceService.FinanceServiceClient().GetVodTop6List(condition);
            return View(vodTop6List);
        }

        //종목상세 > 우측공통 > 투자전략
        public ActionResult DomesticStockDetailRightCommonInvestList(VodInvestCondition condition)
        {
            var vodInvestTop6List = new FinanceService.FinanceServiceClient().GetVodInvestTop6List(condition);
            return View(vodInvestTop6List);
        }

        //종목상세 > 우측공통 > 인기검색
        public ActionResult DomesticStockDetailRightCommonStockHotSearch()
        {
            List<usp_GetBestSearchOnline_TypeA_Result> hotSearchList = new TradingService.TradingServiceClient().GetHotSearchList(DateTime.Now.ToString("yyyyMMdd")).ToList();
            return View(hotSearchList);
        }

        //컨트롤러 로그인 요구
        //[WowTvFrontAuthorizeAttribute(IsLogin = true)]       
        public ActionResult DomesticStockDetailRightCommonFavoriteStock(MyFavoriteStockCondition condition)
        {
            //로그인 유무 체크
            bool loginResult = LoginHandler.IsLogin;
            //넘기면 된다. LoginHandler.CurrentLoginUser;   
            ListModel<tblMyFavoriteJongMok> resultData = new ListModel<tblMyFavoriteJongMok>();

            //MyFavoriteStockCondition condition = new MyFavoriteStockCondition();
            
            if (loginResult)
            {
                condition.loginUserInfo = LoginHandler.CurrentLoginUser;
                resultData = new FinanceService.FinanceServiceClient().GetMyFavoriteJongMokList(condition);
            }
            
            return View(resultData);
        }

        //종목상세 > 우측공통 > 오늘의 공개방송
        public ActionResult DomesticStockDetailRightCommonTBrodCast()
        {
            var resultData = new MyActiveService.MyActiveServiceClient().GetStockRecommendPartner().ToList();
            return View(resultData);
        }

        public ActionResult GetChart(string trId, string code, string width, string height)
        {
            var condition = new HpCondition()
            {
                Trid = trId,
                Code = code
            };

            if(!String.IsNullOrEmpty(width) && !String.IsNullOrEmpty(height))
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

        // Finance > DomesticStock 서브 : Shared > _LayoutFinanceSubDomesticStock.cshtml
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
        /// 국내주요시세 > ETF 
        /// </summary>
        /// <returns></returns>
        public ActionResult ETF()
        {
            ListModel<usp_wownet_ETF_stock_group_Result> siseETFGroupModel = new FinanceService.FinanceServiceClient().GetWowNetETFStockGroupList();

            return View(siseETFGroupModel);
        }
        #endregion
        #region/* =========== Domestic Stock IndustryPart =============*/
        /// <summary>
        /// 국내주요시세 > 업종별
        /// </summary>
        /// <returns></returns>
        public ActionResult IndustryPart()
        {
            return View();
        }

        /// <summary>
        /// 업종별 비교(Security, Foreigner, Personal)/전체  
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult IndustryPartList(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market) || String.IsNullOrEmpty(condition.TargetDT))
            {
                //condition.Market = "t";
                //condition.TargetDT = "2017-06-23";
                condition.Market = "t";
                condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            }
            ListModel<usp_GetIndustryState_Result> industryPartList = new FinanceService.FinanceServiceClient().GetIndustryStateList(condition);
            ViewBag.IndustryCondition = condition;
            return View(industryPartList);
        }

        public ActionResult IndustryPartDetail(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market) || String.IsNullOrEmpty(condition.TargetDT))
            {
                //condition.Market = "t";
                //condition.TargetDT = "2017-06-23";
                //condition.PartCode = "22";
                condition.Market = "t";
                condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
                //condition.PartCode = "22";
            }

            //condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            //ListModel<MarketResearchModel> marketResearchTop3List = new FinanceService.FinanceServiceClient().GetIndustryMarketResearchListTop3(condition);
            //IndustryInfoModel<usp_web_getDomesticIndustryIndex_Result, List<t_part>, List<t_kosdaq_part>, ListModel<usp_GetIndustryDetail_Result>, ListModel<MarketResearchModel>> industryInfo = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);

            var resultData = new FinanceService.FinanceServiceClient().GetIndustryInfo(condition);

            /*
             * 
             f_part_code 값이 
             stock.t_index와 stock.t_part엔 존재하나
             stock.t_stock과 stock.t_online1 엔 존재하지 않는 처리
             나중엔 빼야함
             */
            //if (industryInfo.StockInfo == null)
            //{
            //    industryInfo.StockInfo = new usp_web_getDomesticIndustryIndex_Result {
            //        Price = "9999.99",
            //        ChgPrice = "24.64",
            //        ChgRate = "0.45",
            //        ChgType = "+",
            //        PartVol = 19998,
            //        PartTurn = 747911,
            //        RiseCnt = 73,
            //        FallCnt = 28,
            //        TopCnt = 0,
            //        BottomCnt = 0,
            //        SteadyCnt = 0
            //    };
            //}
            condition.Market = condition.Market.ToUpper();
            ViewBag.IndustryCondition = condition;
            //ViewBag.MarketResearchTop3List = marketResearchTop3List;

            return View(resultData);
        }

        public ActionResult IndustryPartStock(IndustryCondition condition)
        {
            condition.PageSize = 10;
            ListModel<usp_web_getDomesticIndustryStock_Result> industryPartStockList = new FinanceService.FinanceServiceClient().GetIndustryStockList(condition);
            //ViewBag.IndustryCondition = condition;
            return View(industryPartStockList);
        }
        #endregion
        #region/* =========== Domestic Stock ThemaPart =============*/
        /// <summary>
        /// 국내주요시세 > 테마별
        /// </summary>
        /// <returns></returns>
        public ActionResult ThemaPart(ThemaCondition condition)
        {
            ListModel<usp_GetThemaJisu_Result> themaJisuList = new FinanceService.FinanceServiceClient().GetThemaJisuList();
            return View(themaJisuList);
        }

        public ActionResult ThemaPartNameList(ThemaCondition condition)
        {
            if(condition.PartNum == 0)
            {
                condition.PartNum = 310;
            } 

            ListModel<usp_GetThemaOnline_Result> themaOnlineList = new FinanceService.FinanceServiceClient().GetThemaOnlineList(condition);
            return View(themaOnlineList);
        }
        #endregion
        #region/* =========== Domestic Stock Upper =============*/
        /// <summary>
        /// 국내주요시세 > 상한가
        /// </summary>
        /// <returns></returns>
        public ActionResult Upper(UpperCondition condition)
        {
            return View(condition);
        }

        //public ActionResult UpperKospiList(UpperCondition condition)
        //{
        //    return View(condition);
        //}
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
        #endregion
        #region/* =========== Domestic Stock IndustryPartUpper =============*/
        /// <summary>
        /// 국내주요시세 > 업종상위
        /// </summary>
        /// <returns></returns>
        public ActionResult IndustryPartUpper()
        {
            return View();
        }

        //금융 > 국내증시 > 업종상위 > 코스피리스트
        public ActionResult IndustryPartUpperkospi(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market))
            {
                condition.Market = "t";
                //condition.TargetDT = "2017-06-23";
            }
            //업종상위 코스피 리스트 기준날짜는 오늘날짜 as-is 에서 확인
            condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            ViewBag.IndustryCondition = condition;
            ListModel<usp_web_GetSiseStockPlus_Result> industryPartUpperKospiList = new FinanceService.FinanceServiceClient().GetSiseStockPlusList();
            return View(industryPartUpperKospiList);
        }

        //금융 > 국내증시 > 업종상위 > 코스닥리스트
        public ActionResult IndustryPartUpperKosdaq(IndustryCondition condition)
        {
            if (String.IsNullOrEmpty(condition.Market))
            {
                condition.Market = "k";
                //condition.TargetDT = "2017-06-23";
            }
            //업종상위 코스닥 리스트 기준날짜는 오늘날짜 as-is 에서 확인
            condition.TargetDT = String.Format("{0:yyyy-MM-dd}", DateTime.Now);
            ViewBag.IndustryCondition = condition;
            ListModel<usp_web_GetSiseStockPlusK_Result> industryPartUpperKosdaqList = new FinanceService.FinanceServiceClient().GetSiseStockPlusKList();
            return View(industryPartUpperKosdaqList);
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
        #region/* =========== Domestic Stock Invest =============*/
        public ActionResult Invest()
        {
            return View();
        }

        public ActionResult InvestDay()
        {
            ListModel<usp_GetInvestOnline_Result> investDayList = new FinanceService.FinanceServiceClient().GetInvestOnlineList();
            return View(investDayList);
        }

        public ActionResult InvestWeek()
        {
            InvestCondition condition = new InvestCondition { fromDate = 7 };
            ListModel<usp_GetInvestTotal_Result> investWeekList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
            return View(investWeekList);
        }

        public ActionResult InvestMonth()
        {
            DateTime currentDate = DateTime.Now;
            DateTime preMonth = DateTime.Now.AddMonths(-1);
            double distanceDay = (currentDate - preMonth).TotalDays;
            InvestCondition condition = new InvestCondition { fromDate = Convert.ToInt32(distanceDay) };
            ListModel<usp_GetInvestTotal_Result> investMonthList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
            return View(investMonthList);
        }

        public ActionResult InvestQuarter()
        {
            DateTime currentDate = DateTime.Now;
            DateTime quarterDate = DateTime.Now.AddMonths(-3);
            double distanceDay = (currentDate - quarterDate).TotalDays;
            InvestCondition condition = new InvestCondition { fromDate = Convert.ToInt32(distanceDay) };
            ListModel<usp_GetInvestTotal_Result> investQuarterList = new FinanceService.FinanceServiceClient().GetInvestTotalList(condition);
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

        #region/*삭제대상*/
        [ChildActionOnly]
        public ActionResult StockChart()
        {
            return View();
        }
        #endregion

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

        /// <summary>
        /// 금융 > 국내증시 메인 > 환율 탭
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public JsonResult ExchangeTimeData(ExchangeCondition condition)
        {
            ListModel<usp_web_getExchangeTimeList_Result> list = new FinanceService.FinanceServiceClient().GetExchangeTimeList(condition);
            return Json(list.ListData.OrderBy(m => m.insertDT).ToList());
        }
        #endregion

        #region /*실시간에 사용되는 시세 Json 데이터*/
        public JsonResult ClfSelectOnlineIndex()
        {
            var resultList = new FinanceService.FinanceServiceClient().GetClfSelectOnlineIndex();
           
            return Json(resultList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ClfSelectOnlineItem()
        {
            var resultList = new FinanceService.FinanceServiceClient().GetClfSelectOnlineItem().ToList();
            //var resultList = new FinanceService.FinanceServiceClient().GetClfSelectOnlineItem().ToList();
            List<ClfSelectOnlineItem> clfItemList = new List<ClfSelectOnlineItem>();
            foreach (var item in resultList)
            {
                clfItemList.Add(new Models.ClfSelectOnlineItem {
                    StockCode = item.StockCode,
                    InsertDT = item.InsertDT,
                    TradeDay = item.TradeDay,
                    Market = item.Market,
                    korName = Regex.Replace(Regex.Replace(Regex.Replace(Regex.Replace(item.korName, @"\\r\\n", ""), @"\\r", ""), @"\\n", ""), @"\\u0026", "") ,
                    engName = Regex.Replace(Regex.Replace(Regex.Replace(Regex.Replace(item.engName, @"\\r\\n", ""), @"\\r", ""), @"\\n", ""), @"\\u0026", "") ,
                    BasePrice = item.BasePrice,
                    CloseType = item.CloseType,
                    ClosePrice = item.ClosePrice,
                    TotalVol = item.TotalVol,
                    TotalMoney = item.TotalMoney,
                    TradeStop = item.TradeStop,
                    TradeTime = item.TradeTime,
                    TradePrice = item.TradePrice,
                    ChgType = item.ChgType,
                    ChgPrice = item.ChgPrice,
                    TotalVol1 = item.TotalVol1,
                    TotalMoney1 = item.TotalMoney1,
                    BeforeTradeVol = item.BeforeTradeVol,
                    BeforeTradeMoney = item.BeforeTradeMoney,
                    AfterTradeVol = item.AfterTradeVol,
                    AfterTradeMoney = item.AfterTradeMoney
                });
            }
            //string result = JsonConvert.SerializeObject(clfItemList);
            //string resultUnescape = System.Text.RegularExpressions.Regex.Unescape(result);

            return Json(resultList, JsonRequestBehavior.AllowGet);

            //string json = JsonConvert.SerializeObject(clfItemList[0]);
            //return Json(clfItemList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ClfSelectHoliday(SiseHolyCondition condition)
        {
            var resultList = new FinanceService.FinanceServiceClient().GetClfSelectHoliday(condition);
            return Json(resultList, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}