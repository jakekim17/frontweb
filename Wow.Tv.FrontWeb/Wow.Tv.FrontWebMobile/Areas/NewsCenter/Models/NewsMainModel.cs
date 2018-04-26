using System.Collections.Generic;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.TextAndLink;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models
{
    public class NewsMainModel
    {
        /// <summary>
        /// 뉴스 스탠드 뉴스 정보
        /// </summary>
        public NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result NewsStandInfo { get; set; }

        /// <summary>
        /// 뉴스 스탠드 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> NewsStandList { get; set; }

        /// <summary>
        /// 뉴스 스탠드 TOP 1
        /// </summary>
        public NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result NewsStandTopInfo { get; set; }

        /// <summary>
        /// 뉴스 스탠드 TOP List
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> NewsStandTopList { get; set; }

        /// <summary>
        /// 뉴스 스탠드 썸 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> NewsStandSomeList { get; set; }

        /// <summary>
        /// 관리자 리스트 설정 뉴스
        /// </summary>
        public List<NUP_NEWS_MAIN_LIST_Y_SELECT_Result> NewsMainYList { get; set; }

        /// <summary>
        /// 주요시세
        /// </summary>
        public List<NUP_NEWS_MAIN_MARKET_SELECT_Result> NewsMainMarket { get; set; }

        /// <summary>
        /// 영상뉴스[종합]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> NewsMainVodTotalList { get; set; }

        /// <summary>
        /// 영상뉴스[종목]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> NewsMainVodMarketList { get; set; }

        /// <summary>
        /// 영상뉴스[해외증시]
        /// </summary>
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> NewsMainVodOverseasList { get; set; }

        /// <summary>
        /// 많이본 뉴스[종합]
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> NewsTotalCountList { get; set; }

        /// <summary>
        /// 많이본 뉴스[연예.스포츠]
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> NewsEntSpoCountList { get; set; }

        /// <summary>
        /// 키워드 뉴스
        /// </summary>
        public List<JOIN_TXTNLINK_CODE> keywordNews { get; set; }
    }
}