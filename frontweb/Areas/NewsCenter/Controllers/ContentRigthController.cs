using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using Wow.Tv.FrontWeb.Controllers;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.FrontWeb.TextAndLinkService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.TextAndLink;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class ContentRigthController : BaseController
    {
        // GET: NewsCenter/ContentRigth
        [OutputCache(Duration = 5 * 60)]
        public ActionResult Index()
        {
            //노출된 기사 ID
            List<String> articleIdList = new List<String>();

            var model = new NewsMainModel
            {
                //많이본 뉴스[종합]
                newsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData,

                //많이본 뉴스[연예.스포츠]
                newsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData,

                //베스트 포트
                newsBestPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 9, articleIdList.ToArray()).ListData,

                //티비텐플러스
                newsTvTenPlusList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_TVTENPLUS", 3, articleIdList.ToArray()).ListData
            };
            
            //많이본 뉴스[종합] --> 9번째 기사(Text Link 광고 추가)
            /* 
            if(model.newsTotalCountList.Count > 8)
            {
                JOIN_TXTNLINK_CODE textAndLink = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("MANYSEE")).OrderByDescending(o => o.SEQ).Take(1).FirstOrDefault();

                if(textAndLink != null)
                {
                    model.newsTotalCountList.RemoveAt(9);

                    NUP_NEWS_MAIN_SECTION_SELECT_Result totalCountAddInfo = new NUP_NEWS_MAIN_SECTION_SELECT_Result();

                    totalCountAddInfo.TITLE = textAndLink.KEYWORD;
                    totalCountAddInfo.ARTICLEID = textAndLink.LINK;
                    model.newsTotalCountList.Insert(9, totalCountAddInfo);
                }
            }
            */

            ViewBag.VirtualMoney = new FinanceService.FinanceServiceClient().GetVirtualMoney().ToList();

            return View(model);
        }

        /// <summary>
        /// 상세 페이지 ContentRight 베스트 포토 X
        /// </summary>
        /// <returns></returns>        
        public ActionResult Read()
        {
            //노출된 기사 ID
            List<String> articleIdList = new List<String>();

            var model = new NewsMainModel
            {
                //많이본 뉴스[종합]
                newsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData,

                //많이본 뉴스[연예.스포츠]
                newsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData,

                //티비텐플러스
                newsTvTenPlusList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_TVTENPLUS", 3, articleIdList.ToArray()).ListData,

                //베스트 포트
                newsBestPhotoList = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 9, articleIdList.ToArray()).ListData
            };

            //많이본 뉴스[종합] --> 9번째 기사(Text Link 광고 추가)
            /* 
            if (model.newsTotalCountList.Count > 8)
            {
                JOIN_TXTNLINK_CODE textAndLink = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("MANYSEE")).OrderByDescending(o => o.SEQ).Take(1).FirstOrDefault();

                if (textAndLink != null)
                {
                    model.newsTotalCountList.RemoveAt(9);

                    NUP_NEWS_MAIN_SECTION_SELECT_Result totalCountAddInfo = new NUP_NEWS_MAIN_SECTION_SELECT_Result();

                    totalCountAddInfo.TITLE = textAndLink.KEYWORD;
                    totalCountAddInfo.ARTICLEID = textAndLink.LINK;
                    model.newsTotalCountList.Insert(9, totalCountAddInfo);
                }
            }
            */

            ViewBag.VirtualMoney = new FinanceService.FinanceServiceClient().GetVirtualMoney().ToList();

            return View(model);
        }

    }
}
 