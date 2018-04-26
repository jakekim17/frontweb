using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db22.stock.Finance;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Controllers
{
    public class TradingController : Controller
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

            //랭킹데이터 IndexOutOfRangeException 추후 처리 필요 
            for (var i = 0; i < 5; i++)
            {
                arrData2 = arrData[i].Split('|');
                if (arrData2.Length == 15)
                {
                    list.Add(arrData2);
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
            //RnkTime = 1400
            //    count = 100;
            //trid = 5001
            //sect= 0

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

            for (var i = 0; i < arrData.Length; i++)
            {
                arrData2 = arrData[i].Split('|');
                if (arrData2.Length == 15)
                {
                    list.Add(arrData2);
                }
            }
            return View(list);
        }


        /**** 인기 종목 검색 ***/
        public ActionResult GetHotSearchList()
        {
            return View();
        }
        public ActionResult GetHotSearchData(string searchDate)
        {
            if (searchDate != null)
            {
                searchDate = searchDate.Replace("/", "");
                searchDate = searchDate.Replace("-", "");
            }
           var resultData = new TradingService.TradingServiceClient().GetHotSearchList(searchDate);

            return View(resultData);
        }
    }
}