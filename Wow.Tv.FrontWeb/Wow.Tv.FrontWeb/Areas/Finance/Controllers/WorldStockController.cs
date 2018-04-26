using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.Finance.Models;
using Wow.Tv.FrontWeb.Controllers;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;

namespace Wow.Tv.FrontWeb.Areas.Finance.Controllers
{
    public class WorldStockController : BaseController
    {
        // GET: Finance/WorldStock
        public ActionResult Index()
        {
            WorldStockMainModel worldStockMainModel = new WorldStockMainModel
            {
                DowJonesInfo = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "D" }),
                NasdaqInfo = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "N" }),
                SANDP500Info = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(new MarketCondition { Market = "S" }),
                SHCInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "CH#SHC" }),
                HSInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "HK#HS" }),
                NikkeiInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "JP#NI225" }),
                WTInfo = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(new MarketCondition { Market = "TW#WT" }),
                CAC40Info = new FinanceService.FinanceServiceClient().GetEuropeIndexOnline(new MarketCondition { Market = "FR#CAC" }),
                DAXInfo = new FinanceService.FinanceServiceClient().GetEuropeIndexOnline(new MarketCondition { Market = "GR#DAX" }),
                GetTodayInvests = new FinanceService.FinanceServiceClient().GetTodayInvests().ToList() /*오늘의 투자전략*/,
                //TodayBroadCastInfo = new MyActiveService.MyActiveServiceClient().GetStockRecommendPartner().ToList() /*오늘의 공개방송*/,
                TodayBroadCastInfo = new BroadService.NewsProgramServiceClient().GetWowNetData2(),
                UsaAdrTotalList = new FinanceService.FinanceServiceClient().GetUSAAdrTotalList(),
                KoreaADRList = new FinanceService.FinanceServiceClient().GetKoreaAdrList(),
                WorldStockNewsList = new FinanceService.FinanceServiceClient().GetWorldStockNews(),
                EconomyStockColumn = new NewsMainService.NewsMainServiceClient().GetNewsMainMarketList("ECONOMY_STOCK", 5, new List<string>().ToArray()).ListData,
                WorldBestPartnerList = new FinanceService.FinanceServiceClient().GetWorldProHindtPartnerList()
            };
            return View(worldStockMainModel);
        }

        #region /* =========== World Stock USA =============*/
        /// <summary>
        /// 해외증시 > USA
        /// </summary>
        /// <returns></returns>
        public ActionResult USA()
        {
            return View();
        }

        #region /* =========== World Stock DowJones =============*/
        /// <summary>
        /// 해외증시 > USA > 다우존스 
        /// </summary>
        /// <returns></returns>
        public ActionResult DowJones(MarketCondition condition)
        {
            condition.Market = "D";
            usp_wownet_usa_index_online_Result dowJones = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(condition);
            
            return View(dowJones);
        }

        public ActionResult SiseTimeDowJonesList(MarketCondition condition)
        {
            condition.Market = "D";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_hour_Result> dowJonesTimeList = new FinanceService.FinanceServiceClient().GetUsaIndexHourList(condition);
            return View(dowJonesTimeList);
        }

        public ActionResult SiseDayDowJonesList(MarketCondition condition)
        {
            condition.Market = "D";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_history_Result> dowJonesDayList = new FinanceService.FinanceServiceClient().GetUsaIndexHistoryList(condition);
            return View(dowJonesDayList);
        }

        public ActionResult SiseStockGroupDowJonesList(MarketCondition condition)
        {
            condition.Market = "D";
            condition.PageSize = 7;
            ListModel<usp_web_usa_stock_group_Result> dowJonesStockGroupList = new FinanceService.FinanceServiceClient().GetUsaStockGroupList(condition);
            return View(dowJonesStockGroupList);
        }
        #endregion
        #region /* =========== World Stock Nasdaq=============*/
        /// <summary>
        /// 해외증시 > USA > Nasdaq
        /// </summary>
        /// <returns></returns>
        public ActionResult Nasdaq(MarketCondition condition)
        {
            condition.Market = "N";
            condition.PageSize = 7;
            usp_wownet_usa_index_online_Result nasdaq = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(condition);
            return View(nasdaq);
        }
        public ActionResult SiseTimeNasdaqList(MarketCondition condition)
        {
            condition.Market = "N";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_hour_Result> nasdaqTimeList = new FinanceService.FinanceServiceClient().GetUsaIndexHourList(condition);
            return View(nasdaqTimeList);
        }

        public ActionResult SiseDayNasdaqList(MarketCondition condition)
        {
            condition.Market = "N";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_history_Result> nasdaqDayList = new FinanceService.FinanceServiceClient().GetUsaIndexHistoryList(condition);
            return View(nasdaqDayList);
        }

        public ActionResult SiseStockGroupNasdaqList(MarketCondition condition)
        {
            condition.Market = "N";
            condition.PageSize = 7;
            ListModel<usp_web_usa_stock_group_Result> nasdaqStockGroupList = new FinanceService.FinanceServiceClient().GetUsaStockGroupList(condition);
            return View(nasdaqStockGroupList);
        }
        #endregion
        #region /* =========== World Stock S&P500=============*/
        /// <summary>
        /// 해외증시 > USA > S&P500
        /// </summary>
        /// <returns></returns>
        public ActionResult SANDP500(MarketCondition condition)
        {
            condition.Market = "S";
            condition.PageSize = 7;
            usp_wownet_usa_index_online_Result sandp500 = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(condition);
            return View(sandp500);
        }
        public ActionResult SiseTimeSANDP500List(MarketCondition condition)
        {
            condition.Market = "S";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_hour_Result> sandp500TimeList = new FinanceService.FinanceServiceClient().GetUsaIndexHourList(condition);
            return View(sandp500TimeList);
        }

        public ActionResult SiseDaySANDP500List(MarketCondition condition)
        {
            condition.Market = "S";
            condition.PageSize = 7;
            ListModel<usp_wownet_usa_index_history_Result> sandp500DayList = new FinanceService.FinanceServiceClient().GetUsaIndexHistoryList(condition);
            return View(sandp500DayList);
        }

        public ActionResult SiseStockGroupSANDP500List(MarketCondition condition)
        {
            condition.Market = "S";
            condition.PageSize = 7;
            ListModel<usp_web_usa_stock_group_Result> sandp500StockGroupList = new FinanceService.FinanceServiceClient().GetUsaStockGroupList(condition);
            return View(sandp500StockGroupList);
        }
        #endregion
        #region /* =========== World Stock USAADR=============*/
        /// <summary>
        /// 해외증시 > USA > USAADR
        /// </summary>
        /// <returns></returns>
        public ActionResult USAADR()
        {
            return View();
        }

        public ActionResult USAADRTotalList()
        {
            ListModel<usp_web_usa_adr_Result> usaAdrTotalList = new FinanceService.FinanceServiceClient().GetUSAAdrTotalList();
            return View(usaAdrTotalList);
        }

        public ActionResult USAADRDetailList(UsaIndustryCondition condition)
        {
            ListModel<USP_WOWNET_USA_DETAIL_Result> usaAdrDetailList = new FinanceService.FinanceServiceClient().GetUSAAdrDetailList(condition);
            return View(usaAdrDetailList);
        }

        public ActionResult USAADRDowJones()
        {
            var usaAdrDowJonesModel = new USAADRDowJonesModel
            {
                SemiconductorList = new FinanceService.FinanceServiceClient().GetUSAADRDawoSemiconductorList(),
                MediaList = new FinanceService.FinanceServiceClient().GetUSAADRDawoMediaList(),
                InsuranceList = new FinanceService.FinanceServiceClient().GetUSAADRDawoInsuranceList(),
                RetailList = new FinanceService.FinanceServiceClient().GetUSAADRDawoRetailList(),
                EnergyList = new FinanceService.FinanceServiceClient().GetUSAADRDawoEnergyList(),
                PharmacyList = new FinanceService.FinanceServiceClient().GetUSAADRDawoPharmacyList()
            };
            return View(usaAdrDowJonesModel);
        }

        public ActionResult USAADRNasdaq()
        {
            var usaAdrNasdaqModel = new USAADRNasdaqModel
            {
                Internet = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqInternetList(),
                Network = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqNetworkList(),
                Comunication = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqComunicationsList(),
                Computer = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqComputerList(),
                Semiconductor = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqSemiconductorList(),
                Bio = new FinanceService.FinanceServiceClient().GetUSAADRNasdaqBioList()
            };
            return View(usaAdrNasdaqModel);
        }

        public ActionResult USAADRSANDP500()
        {
            var usaAdrSANDP500Model = new USAADRSANDP500Model
            {
                Internet = new FinanceService.FinanceServiceClient().GetUSAADRSANDP500InternetList()
            };
            return View(usaAdrSANDP500Model);
        }
        #endregion
        #region /* =========== World Stock KoreaADR=============*/
        /// <summary>
        /// 해외증시 > 미국 > 한국물ADR
        /// </summary>
        /// <returns></returns>
        public ActionResult KoreaADR()
        {
            ListModel<usp_web_korea_adr_Result> koreaADRList = new FinanceService.FinanceServiceClient().GetKoreaAdrList();

           // usp_wownet_usa_index_online_Result dowJones = new FinanceService.FinanceServiceClient().GetUsaIndexOnline(condition);
           

            return View(koreaADRList);
        }
        #endregion

        #endregion /* World Stock USA End */

        #region /* =========== World Stock Asia=============*/
        /// <summary>
        /// 해외증시 > Asia
        /// </summary>
        /// <returns></returns>
        public ActionResult Asia()
        {
            return View();
        }

        #region /* =========== World Stock Nikkei=============*/
        /// <summary>
        /// 해외증시 > 아시아 > 일본(니케이)
        /// </summary>
        /// <returns></returns>
        public ActionResult Nikkei(MarketCondition condition)
        {
            condition.Market = "JP#NI225";
            usp_wownet_Asia_Index_online_Result nikkei = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(condition);
            return View(nikkei);
        }

        public ActionResult SiseTimeNikkeiList(MarketCondition condition)
        {
            condition.Market = "JP#NI225";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_hour_Result> nikkeiTimeList = new FinanceService.FinanceServiceClient().GetAsiaIndexHourList(condition);
            return View(nikkeiTimeList);
        }

        public ActionResult SiseDayNikkeiList(MarketCondition condition)
        {
            condition.Market = "JP#NI225";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_history_Result> nikkeiDayList = new FinanceService.FinanceServiceClient().GetAsiaIndexHistoryList(condition);
            return View(nikkeiDayList);
        }
        #endregion
        #region /* =========== World Stock SHC=============*/
        /// <summary>
        /// 해외증시 > 아시아 > 중국(상해)
        /// </summary>
        /// <returns></returns>
        public ActionResult SHC(MarketCondition condition)
        {
            condition.Market = "CH#SHC";
            usp_wownet_Asia_Index_online_Result shc = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(condition);
            return View(shc);
        }

        public ActionResult SiseTimeSHCList(MarketCondition condition)
        {
            condition.Market = "CH#SHC";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_hour_Result> shcTimeList = new FinanceService.FinanceServiceClient().GetAsiaIndexHourList(condition);
            return View(shcTimeList);
        }

        public ActionResult SiseDaySHCList(MarketCondition condition)
        {
            condition.Market = "CH#SHC";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_history_Result> shcDayList = new FinanceService.FinanceServiceClient().GetAsiaIndexHistoryList(condition);
            return View(shcDayList);
        }
        #endregion
        #region /* =========== World Stock HS=============*/
        /// <summary>
        /// 해외증시 > 아시아 > 홍콩(항생)
        /// </summary>
        /// <returns></returns>
        public ActionResult HS(MarketCondition condition)
        {
            condition.Market = "HK#HS";
            usp_wownet_Asia_Index_online_Result hs = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(condition);
            return View(hs);
        }

        public ActionResult SiseTimeHSList(MarketCondition condition)
        {
            condition.Market = "HK#HS";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_hour_Result> hsTimeList = new FinanceService.FinanceServiceClient().GetAsiaIndexHourList(condition);
            return View(hsTimeList);
        }

        public ActionResult SiseDayHSList(MarketCondition condition)
        {
            condition.Market = "HK#HS";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_history_Result> nikkeiDayList = new FinanceService.FinanceServiceClient().GetAsiaIndexHistoryList(condition);
            return View(nikkeiDayList);
        }
        #endregion
        #region /* =========== World Stock WT=============*/
        /// <summary>
        /// 해외증시 > 아시아 > 대만(가권)
        /// </summary>
        /// <returns></returns>
        public ActionResult WT(MarketCondition condition)
        {
            condition.Market = "TW#WT";
            usp_wownet_Asia_Index_online_Result wt = new FinanceService.FinanceServiceClient().GetAsiaIndexOnline(condition);
            return View(wt);
        }

        public ActionResult SiseTimeWTList(MarketCondition condition)
        {
            condition.Market = "TW#WT";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_hour_Result> wtTimeList = new FinanceService.FinanceServiceClient().GetAsiaIndexHourList(condition);
            return View(wtTimeList);
        }

        public ActionResult SiseDayWTList(MarketCondition condition)
        {
            condition.Market = "TW#WT";
            condition.PageSize = 7;
            ListModel<usp_wownet_Asia_Index_history_Result> wtDayList = new FinanceService.FinanceServiceClient().GetAsiaIndexHistoryList(condition);
            return View(wtDayList);
        }
        #endregion
        #endregion /* World Stock Asia End*/

        #region /* =========== World Stock Europe =============*/
        /// <summary>
        /// 해외증시 > Europe
        /// </summary>
        /// <returns></returns>
        public ActionResult Europe()
        {
            return View();
        }
        #region /* =========== World Stock CAC40 =============*/
        /// <summary>
        /// 해외증시 > Europe > 프랑스(CAC40) 
        /// </summary>
        /// <returns></returns>
        public ActionResult CAC40(MarketCondition condition)
        {
            condition.Market = "FR#CAC";
            usp_wownet_Europe_Index_online_Result cac40 = new FinanceService.FinanceServiceClient().GetEuropeIndexOnline(condition);
            return View(cac40);
        }

        public ActionResult SiseDayCAC40List(MarketCondition condition)
        {
            condition.Market = "FR#CAC";
            condition.PageSize = 7;
            ListModel<usp_wownet_Europe_Index_history_Result> cac40List = new FinanceService.FinanceServiceClient().GetEuropeIndexHistoryList(condition);
            return View(cac40List);
        }
        #endregion
        #region /* =========== World Stock DAX =============*/
        /// <summary>
        /// 해외증시 > Europe > 독일(DAX) 
        /// </summary>
        /// <returns></returns>
        public ActionResult DAX(MarketCondition condition)
        {
            condition.Market = "GR#DAX";
            usp_wownet_Europe_Index_online_Result dax = new FinanceService.FinanceServiceClient().GetEuropeIndexOnline(condition);
            return View(dax);
        }

        public ActionResult SiseDayDAXList(MarketCondition condition)
        {
            condition.Market = "GR#DAX";
            condition.PageSize = 7;
            ListModel<usp_wownet_Europe_Index_history_Result> daxDayList = new FinanceService.FinanceServiceClient().GetEuropeIndexHistoryList(condition);
            return View(daxDayList);
        }
        #endregion
        #endregion /* World Stock Europe End */

        public ActionResult GetChart(string trId, string code)
        {
            var condition = new HpCondition() {
                Trid = trId,
                Code = code
            };

            var resultData = new FinanceService.FinanceServiceClient().GetHpFinderChart(condition);

            if (resultData.Contains("|"))
            {
                var splitList = resultData.Split('|');
                return Json(new { splitList = splitList });
            }

            return Json(new { });
        }

        public JsonResult UsaTimeChartData(ChartCondition condition)
        {
            ListModel<usp_web_getUSAIndex_Result> list = new FinanceService.FinanceServiceClient().GetUSAChartDataList(condition);
            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }

        public JsonResult AsiaTimeChartData(ChartCondition condition)
        {
            ListModel<usp_web_getAsiaIndex_Result> list = new FinanceService.FinanceServiceClient().GetAsiaChartDataList(condition);
            return Json(list.ListData.OrderBy(m => m.DT).ToList());
        }
    }
}