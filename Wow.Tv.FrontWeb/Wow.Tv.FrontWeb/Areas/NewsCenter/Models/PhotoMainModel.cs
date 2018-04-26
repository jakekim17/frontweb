using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Models
{
    public class PhotoMainModel
    {
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> topPhotoList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> photoTabList { get; set; }
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> vodTabList { get; set; }
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> mostViewedList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> bestPhotoList { get; set; }

    }
}