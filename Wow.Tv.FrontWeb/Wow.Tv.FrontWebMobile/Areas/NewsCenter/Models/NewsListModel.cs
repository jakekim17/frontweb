using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models
{
    public class NewsListModel
    {
        public List<NUP_NEWS_SECTION_SELECT_Result> ArticleList { get; set; }
        public List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result> SectionManySeeList { get; set; }
        public List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result> SectionRecommendList { get; set; }
    }
}