using System.Collections.Generic;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models
{
    public class EntSpoMainModel
    {
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> EntList { get; set; }
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> SpoList { get; set; }
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> TopList { get; set; }
    }
}