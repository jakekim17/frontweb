using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wowcafe;
using Wow.Tv.Middle.Model.Db49.wownet;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Models
{
    public class DomesticStockDetailTotalInfoModel
    {

        public string ArjCode { get; set; }
        public string StockCode { get; set; }
        public ListModel<usp_web_getStockInvestorList_Result> SupplyDemandSellList { get; set; }
        public ListModel<usp_web_getStockInvestorList_Result> SupplyDemandBuyList { get; set; }
        public ListModel<usp_web_getStockInvestorSum_Result> InvestorSumList { get; set; }
        public ListModel<usp_web_getStockPart_Result> StockPartList { get; set; }
        public ListModel<usp_web_getStockThema_Result> StockThemaList { get; set; }
        public ListModel<usp_web_getRelativeStock_Result> RelativeStockList { get; set; }
        public ListModel<usp_web_getStockDiscussionTop9List_Result> DiscussionList { get; set; }
        public ListModel<usp_web_getStockConsultTop9List_Result> ConsultList { get; set; }
        public ListModel<usp_web_select_stock_cafe_list_Result> StockCafeList { get; set; }

        public ListModel<ArticleStock> RecentNewsList { get; set; }
        public ListModel<usp_web_getNoticeTop6List_Result> RecentNoticeList { get; set; }
        //public NSP_BANNER_RANDOM_Result AdBanner1 { get; set; }
        //public NSP_BANNER_RANDOM_Result AdBanner2 { get; set; }
    }
}