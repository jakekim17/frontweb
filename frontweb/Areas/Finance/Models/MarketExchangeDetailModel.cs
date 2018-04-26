using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;

namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class MarketExchangeDetailModel
    {
        public ListModel<usp_wownet_Marketindex_BankExchange_Result> MarketBankExchangeList { get; set; }
        public ListModel<usp_wownet_Marketindex_worldExchange_Result> MarketWorldExchangeList { get; set; }
    }
}