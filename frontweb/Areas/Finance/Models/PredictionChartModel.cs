using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class PredictionChartModel
    {
        public string ArjCode { get; set; }
        public int MaxInvestOpinionCnt { get; set; }
        public int InvestOpinionIdx { get; set; }
        public int StrongSellCnt { get; set; }
        public int SellCnt { get; set; }
        public int MiddleCnt { get; set; }
        public int BuyCnt { get; set; }
        public int StrongBuyCnt { get; set; }
        public List<string> StrongSellReport { get; set; }
        public List<string> SellReport { get; set; }
        public List<string> MiddleReport { get; set; }
        public List<string> BuyReport { get; set; }
        public List<string> StrongBuyReport { get; set; }

    }
}