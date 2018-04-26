using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class DomesticMainModel
    {
        public usp_GetSiseCurrentKospi_Result KospiInfo { get; set; }
        public usp_GetSiseCurrentKosdaq_Result KosdaqInfo { get; set; }
        public usp_GetSiseCurrentKPI_Result Kospi200Info { get; set; }
        public usp_wownet_usa_index_online_Result DowJonesInfo { get; set; }
        public usp_wownet_usa_index_online_Result NasdaqInfo { get; set; }
        public usp_wownet_usa_index_online_Result SANDP500Info { get; set; }
        public usp_wownet_Asia_Index_online_Result SHCInfo { get; set; }
        public usp_wownet_Asia_Index_online_Result HSInfo { get; set; }
        public usp_wownet_Asia_Index_online_Result NikkeiInfo { get; set; }
        public usp_wownet_Marketindex_BankExchange_Result ExchangeUSDInfo { get; set; }
        public usp_wownet_Marketindex_BankExchange_Result ExchangeJPYInfo { get; set; }
        public usp_wownet_Marketindex_BankExchange_Result ExchangeEURInfo { get; set; }
        public usp_wownet_Marketindex_BankExchange_Result ExchangeCNYInfo { get; set; }
        public bool ChkStockHoliday { get; set; }
        public ListModel<usp_getSiseMainmergecode_Result> InvestPartInfo { get; set; }
        public IList<USP_GetRecommendPro3_Result> TodayBroadCastInfo { get; set; }

        public ListModel<tblMyFavoriteJongMok> MyFavoriteList { get; set; }
        public ListModel<NUP_NEWS_SECTION_SELECT_Result> GetTodayStockNewsList { get; set; }
        public ListModel<CharacterStockModel> GetCharacterStockNewsList { get; set; }
        public List<TAB_STRATEGY_APPLICATION> GetTodayInvests { get; set; }
        public List<usp_web_GetSiseStockPlus_Result> GetIndustryPartUpperKospiList { get; set; }
        public List<FNC_GetThemaJisuTop_Result> GetThemaPartUpperList { get; set; }
        public List<usp_GetBestSearchOnline_TypeA_Result> HotSearchList { get; set; }
        public List<NUP_NEWS_MAIN_MARKET_SELECT_Result> EconomyStockColumn{ get; set; }
        public ListModel<usp_web_getBestProHintStocking_Result> BestProHintStockingList { get; set; }
        public ListModel<JOIN_LECTURES_SCHEDULE> LecturesList { get; set; }
        public ListModel<usp_web_getCurrentSearchStockList_Result> CurrentSearchStockList { get; set; }
    }
}