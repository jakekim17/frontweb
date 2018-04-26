using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Models
{
    public class NewsViewModel
    {
        public NUP_NEWS_READ_SELECT_Result NewsContent { get; set; }
        public NUP_REPORTER_SELECT_Result ReporterInfo { get; set; }
    }
}