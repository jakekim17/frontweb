using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.wownet;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Models
{
    public class WorldStockMainModel
    {
        public usp_wownet_usa_index_online_Result DowJonesInfo { get; set; }
        public usp_wownet_usa_index_online_Result NasdaqInfo { get; set; }
        public usp_wownet_usa_index_online_Result SANDP500Info { get; set; }
        public usp_wownet_Asia_Index_online_Result SHCInfo { get; set; }
        public usp_wownet_Asia_Index_online_Result HSInfo { get; set; }
        public usp_wownet_Asia_Index_online_Result NikkeiInfo { get; set; }
        public usp_wownet_Asia_Index_online_Result WTInfo { get; set; }
        public usp_wownet_Europe_Index_online_Result CAC40Info { get; set; }
        public usp_wownet_Europe_Index_online_Result DAXInfo { get; set; }
        public List<TAB_STRATEGY_APPLICATION> GetTodayInvests { get; set; }
        public IList<USP_GetRecommendPro3_Result> TodayBroadCastInfo { get; set; }

        public ListModel<usp_web_usa_adr_Result> UsaAdrTotalList { get; set; }
        public ListModel<usp_web_korea_adr_Result> KoreaADRList { get; set; }
        public ListModel<NUP_NEWS_SECTION_SELECT_Result> WorldStockNewsList { get; set; }
        public List<NUP_NEWS_MAIN_MARKET_SELECT_Result> EconomyStockColumn { get; set; }
        public ListModel<usp_web_getWorldProHintPartner_Result> WorldBestPartnerList { get; set; }
    }
}