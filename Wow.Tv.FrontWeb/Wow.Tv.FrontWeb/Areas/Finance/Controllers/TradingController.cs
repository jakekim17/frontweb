using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db22.stock.Finance;

namespace Wow.Tv.FrontWeb.Areas.Finance.Controllers
{
    public class TradingController : BaseController
    {
        // GET: Finance/Trading
        public ActionResult Rank()
        {
            
            return View();

        }

        public ActionResult MainRankData(RankingCondition condition)
        {
            var hour = DateTime.Now.ToString("HH");
            Double tmpMinute = Int32.Parse(DateTime.Now.ToString("mm")) / 30;
            var minute = (Math.Truncate(tmpMinute) * 30).ToString();

            // 랭킹 시간 가져오기
            if (condition.RnkTime == null)
            {
                if (minute.Equals("0"))
                {
                    minute = "00";
                }
                condition.RnkTime = hour.Substring(hour.Length - 2) + minute.Substring(minute.Length - 2);
            }


            if (condition.RnkTime != "LAST")
            {
                if (Int32.Parse(condition.RnkTime) < Int32.Parse("0900"))
                {
                    condition.RnkTime = "LAST";
                }
                else if (Int32.Parse(condition.RnkTime) > Int32.Parse("1500"))
                {
                    condition.RnkTime = "1500";
                }
                else
                {
                    condition.RnkTime = condition.RnkTime;
                }


            }


            if (condition.Sect == null || condition.Sect == "")
            {
                condition.Sect = "0";
            }
            var data = new FinanceService.FinanceServiceClient().GetRankData(condition);


            data = data.Replace("<HTML>", "");
            data = data.Replace("</HTML>", "");
            data = data.Replace("<BR />", "@");

            var arrData = data.Split('@');

            string[] arrData2;
            List<string[]> list = new List<string[]>();

            if(arrData.Length > 1)
            {
                for (var i = 0; i < 5; i++)
                {
                    arrData2 = arrData[i].Split('|');
                    if (arrData2.Length == 15)
                    {
                        list.Add(arrData2);
                    }
                }
            }
            
            

            return View(list);
            
        }

        public ActionResult RankData(RankingCondition condition)
        {

            var hour = DateTime.Now.ToString("HH");
            Double tmpMinute = Int32.Parse(DateTime.Now.ToString("mm")) / 30;
            var minute = (Math.Truncate(tmpMinute) * 30).ToString();

            // 랭킹 시간 가져오기
            if (condition.RnkTime == null)
            {
                if (minute.Equals("0"))
                {
                    minute = "00";
                }
                condition.RnkTime = hour.Substring(hour.Length - 2) + minute.Substring(minute.Length - 2);
            }


            if (condition.RnkTime != "LAST")
            {
                if (Int32.Parse(condition.RnkTime) < Int32.Parse("0900"))
                {
                    condition.RnkTime = "LAST";
                }
                else if (Int32.Parse(condition.RnkTime) > Int32.Parse("1500"))
                {
                    condition.RnkTime = "1500";
                }
                else
                {
                    condition.RnkTime = condition.RnkTime;
                }


            }


            if (condition.Sect == null || condition.Sect == "")
            {
                condition.Sect = "0";
            }
            var data = new FinanceService.FinanceServiceClient().GetRankData(condition);


            data = data.Replace("<HTML>", "");
            data = data.Replace("</HTML>", "");
            data = data.Replace("<BR />", "@");

            var arrData = data.Split('@'); 

            string[] arrData2;
            List<string[]> list = new List<string[]>();

            for (var i=0; i < arrData.Length; i++)
            {
                arrData2 = arrData[i].Split('|');
                if(arrData2.Length == 15)
                {
                    list.Add(arrData2);
                }
            }


            return View(list);
        }

        public ActionResult KeyConditions()
        {
            return View();
        }

        public ActionResult KeyData(TradingStockCondition condition)
        {
            var data = "";
            var RequestMenu = Int32.Parse(Request.QueryString["currentMenuSeq"]);
            var menu = new MenuService.MenuServiceClient().GetAtByName("WowTv", "핵심조건");

            if (RequestMenu.Equals(menu.MENU_SEQ))
            {
                data = new TradingService.TradingServiceClient().GetStockData(condition);
            }
            else
            {
                data = new TradingService.TradingServiceClient().GetDayTradingData(condition);
            }

            var arrData = data.Split('|');

            string[] arrData2;
            List<string[]> list = new List<string[]>();

            for (var i = 0; i < arrData.Length; i++)
            {
                arrData2 = arrData[i].Split('_');
                if (arrData2.Length == 10)
                {
                    list.Add(arrData2);
                }
               
            }
            
            return View(list);
        }

        public ActionResult DayTrading()
        {
            return View();
        }

        /*** 매수 유망패턴  ***/
        public ActionResult BuyingProspects()
        {
            return View();
        }
        public ActionResult GetBuyingData(string patternNum)
        {
            TradingStockCondition condition = new TradingStockCondition
            {
                DataID = "0",
                Mission = "5MINREPORT",
                VolumeCheck1 = 1,
                AmountRange1 = 0,
                AmountRange2 = 0,
                GwanLiCheck = 1,
                WooSunCheck = 1,
                PatternCandle = 0,
                PatPeriod = "60_0_0_0_0_0_0_0_0",
                DataClass = "0",
                ListedPriceCheck = 1
            };

            var resultData = new TradingService.TradingServiceClient().GetStockData(condition);
            ViewBag.resultData = resultData;
            var convertData = GetListPatternData(resultData, patternNum);

            return View(convertData);
        }

        /*** 해외 고수 기법 ***/
        public ActionResult OverseasTechnique()
        {
            return View();
        }
        public ActionResult GetTechniqueData(string CondMenu, string SearchDate)
        {
            TradingStockCondition condition = new TradingStockCondition
            {
                CondMenu = CondMenu
            };

            ViewBag.SearchDate = SearchDate;

            if (!string.IsNullOrEmpty(SearchDate))
            {
                condition.DateStr = SearchDate.Replace("-", "");
            }

            var resultData = new TradingService.TradingServiceClient().GetStockData(condition);
            var convertData = GetListData(resultData);

            return View(convertData);
        }


        public List<string[]> GetListPatternData(string resultData, string patternNum)
        {
            var result = new List<string[]>();

            if (resultData.Contains("_"))
            {
                var arrData = resultData.Split('|');

                foreach (var item in arrData)
                {
                    var data = item.Split('_');
                    if (patternNum == data[0])
                    {
                        result.Add(data);
                    }
                }
            }
            return result;
        }

        public List<string[]> GetListData(string resultData)
        {
            var result = new List<string[]>();

            if (resultData.Contains("_"))
            {
                var arrData = resultData.Split('|');

                foreach (var item in arrData)
                {
                    var data = item.Split('_');
                    if(data.Length > 9)
                    {
                        result.Add(data);
                    }
                }
            }
            return result;
        }

        /**** 인기 종목 검색 ***/
        public ActionResult GetHotSearchList()
        {
            return View();
        }
        public ActionResult GetHotSearchData(string searchDate)
        {
            if(searchDate != null)
            {
                searchDate = searchDate.Replace("/", "");
            }
            var resultData = new TradingService.TradingServiceClient().GetHotSearchList(searchDate);
            
            return View(resultData);
        }
    }
}