using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class ClfSelectOnlineItem
    {
        public string StockCode { get; set; }
        public string InsertDT { get; set; }
        public string TradeDay { get; set; }
        public string Market { get; set; }
        public string korName { get; set; }
        public string engName { get; set; }
        public Nullable<int> BasePrice { get; set; }
        public string CloseType { get; set; }
        public Nullable<int> ClosePrice { get; set; }
        public Nullable<long> TotalVol { get; set; }
        public Nullable<long> TotalMoney { get; set; }
        public string TradeStop { get; set; }
        public string TradeTime { get; set; }
        public Nullable<int> TradePrice { get; set; }
        public string ChgType { get; set; }
        public Nullable<int> ChgPrice { get; set; }
        public Nullable<long> TotalVol1 { get; set; }
        public Nullable<long> TotalMoney1 { get; set; }
        public Nullable<long> BeforeTradeVol { get; set; }
        public Nullable<long> BeforeTradeMoney { get; set; }
        public Nullable<long> AfterTradeVol { get; set; }
        public Nullable<long> AfterTradeMoney { get; set; }
    }
}