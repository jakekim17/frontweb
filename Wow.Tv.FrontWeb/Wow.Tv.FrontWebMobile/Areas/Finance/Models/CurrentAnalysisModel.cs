using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Models
{
    public class CurrentAnalysisModel
    {
        public usp_LatestStockPrice_Result LatestStockPrice { get; set; }
        public usp_web_stock_hoga_Result StockHoga { get; set; }
        public ListModel<usp_web_getStockDealing5_Result> StockDealing5List { get; set; }
        public ListModel<usp_getDayStockPriceBand_Result> DayStockPriceBandList { get; set; }
        
    }
}