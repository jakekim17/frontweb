using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wow.Tv.Middle.Model.Db49.Article.EntSpo
{
    public class EntSpoMainModel
    {
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> EntList { get; set; }
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> SpoList { get; set; }
        public List<NUP_NEWS_MAIN_ENT_SPO_SELECT_Result> TopList { get; set; }
        public List<NUP_NEWS_MAIN_CARD_SELECT_Result> CardNewsList { get; set; }

        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> BestTotalList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> BestEntSpoList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> BestPhotoList { get; set; }
        public List<NUP_NEWS_MAIN_SECTION_SELECT_Result> HotNewsList { get; set; }

        public List<string> ArticleIdList { get; set; }
    }
}
