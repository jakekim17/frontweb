using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Models
{
    public class NewsSectionModel
    {
        /// <summary>
        /// 증권 경제 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> StoEcoList { get; set; }

        /// <summary>
        /// 산업 IT 과학 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> IndITList { get; set; }

        /// <summary>
        /// 생활문화리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> LifeList { get; set; }

        /// <summary>
        /// 취업 리스트
        /// </summary>
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> JobList { get; set; }
    }
}