using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models
{
    public class PhotoMainModel
    {
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> TopPhotoList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> PhotoList { get; set; }
        public List<NUP_NEWS_MAIN_VOD_SELECT_Result> VodList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> BestPhoto { get; set; }
    }
}