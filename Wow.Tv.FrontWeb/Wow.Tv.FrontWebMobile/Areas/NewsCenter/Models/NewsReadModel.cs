using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.broadcast.NewsCenter;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models
{
    public class NewsReadModel
    {
        public NUP_NEWS_READ_SELECT_Result newsRead { get; set; }
        public List<NUP_NEWS_PREV_NEXT_SELECT_Result> newsPrevNext { get; set; }
        public List<NUP_NEWS_THIS_MANY_SEE_SELECT_Result> newsThisManySee { get; set; }
        public List<NUP_REPORTER_SELECT_Result> reporterInfo { get; set; }
        public List<NUP_NEWS_SECTION_SELECT_Result> reporterNewsList { get; set; }
        public PartnerInfo reporterPartnerInfo { get; set; }
    }
}