using System.Collections.Generic;
using Wow.Tv.Middle.Model.Db22.stock;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.TextAndLink;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Models
{
    public class NewsMainModel
    {
        /// <summary>
        /// 뉴스 스탠드 뉴스 정보
        /// </summary>
        public NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result newsStandInfo { get; set; }

        /// <summary>
        /// 뉴스 스탠드 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> newsStandList { get; set; }

        /// <summary>
        /// 뉴스 스탠드 TOP 1
        /// </summary>
        public NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result newsStandTopInfo { get; set; }

        /// <summary>
        /// 뉴스 스탠드 TOP List
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> newsStandTopList { get; set; }

        /// <summary>
        /// 뉴스 스탠드 썸 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> newsStandTimeList { get; set; }

        /// <summary>
        /// 관리자 리스트 설정 뉴스
        /// </summary>
        public List<NUP_NEWS_MAIN_LIST_Y_SELECT_Result> newsMainYList { get; set; }

        /// <summary>
        /// 주요시세
        /// </summary>
        public List<NUP_NEWS_MAIN_MARKET_SELECT_Result> newsMainMarket { get; set; }

        /// <summary>
        /// 영상뉴스[종합]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> newsMainVodTotalList { get; set; }

        /// <summary>
        /// 영상뉴스[종목]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> newsMainVodMarketList { get; set; }

        /// <summary>
        /// 영상뉴스[해외증시]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> newsMainVodOverseasList { get; set; }

        /// <summary>
        /// 많이본 뉴스[종합]
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> newsTotalCountList { get; set; }

        /// <summary>
        /// 많이본 뉴스[연예.스포츠]
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> newsEntSpoCountList { get; set; }

        /// <summary>
        /// TV.10+
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> newsTvTenPlusList { get; set; }

        /// <summary>
        /// 금주의 기자
        /// </summary>
        public List<NUP_REPORTER_SELECT_Result> thisWeekReporter { get; set; }

        /// <summary>
        /// 카드뉴스
        /// </summary>
        public List<NUP_NEWS_MAIN_CARD_SELECT_Result> newsCardList { get; set; }

        /// <summary>
        /// 이슈겔러리/베스트 포토
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> newsBestPhotoList { get; set; }

        /// <summary>
        /// 인기종목
        /// </summary>
        public usp_GetBestSearchOnline_TypeA_Result[] hotStockData { get; set; }

        /// <summary>
        /// 키워드 뉴스
        /// </summary>
        public List<JOIN_TXTNLINK_CODE> keywordNews { get; set; }


    }
}