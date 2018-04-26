using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWebMobile.Controllers
{
    public class CommonController : Controller
    {
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetProgramImageUrl(int vodNum)
        {
            string href = "";

            var tvProgram = new BroadWatchService.BroadWatchServiceClient().GetAt(vodNum);
            if (tvProgram != null)
            {
                var img = new BroadService.NewsProgramServiceClient().GetThumbnailAttachFile(tvProgram.Dep);
                if (img != null)
                {
                    href = img.REAL_WEB_PATH;
                }
            }


            return Json(new { Href = href });
        }


        public ActionResult GetNewsImageUrl(string thumbnailType, string thumbnailFile, int? vodNum, string imageDir, string imagFile, DateTime? artDate, string gubunName)
        {
            string href = "";
            string errorHref = "";
            string gubunIcon = "";

            if (artDate == null)
            {
                artDate = DateTime.Now;
            }
            href = Wow.WowExtensionMethod.NewsThumbnailPath(thumbnailType, thumbnailFile, vodNum, imageDir, imagFile, artDate.Value);
            errorHref = Wow.WowExtensionMethod.NewsThumbnailOnError(thumbnailType);
            gubunIcon = WowExtensionMethod.NewsGugunIcon(gubunName, "S");

            return Json(new { Href = href, ErrorHref = errorHref, GubunIcon = gubunIcon });
        }


        public ActionResult GetNewsThumbnailUrl(string thumbnailType, string thumbnailFile, int? vodNum, string imageDir, string imagFile, DateTime? artDate)
        {
            string thumbnailUrl = "";

            if (artDate == null)
            {
                artDate = DateTime.Now;
            }
            thumbnailUrl = Wow.WowExtensionMethod.NewsThumbnailPath(thumbnailType, thumbnailFile, vodNum, imageDir, imagFile, artDate.Value);

            return Json(new { ThumbnailUrl = thumbnailUrl });
        }


        public ActionResult GetProgramFeedBack(string programCode)
        {
            int feedBackContentSeq = 0;
            int menuSeq = 0;

            Wow.Tv.Middle.Model.Db49.wowtv.Menu.MenuCondition menuCondition = new Middle.Model.Db49.wowtv.Menu.MenuCondition();
            menuCondition.SearchProgramCode = programCode;
            menuCondition.ActiveYn = "Y";
            menuCondition.ChannelCode = "BroadProgramAdminOrFront";
            menuCondition.ContentTypeCode = "Board";
            var menuList = new MenuService.MenuServiceClient().SearchList(menuCondition);
            foreach (var item in menuList.ListData.ToList())
            {
                if (item.BoardTypeCode == "FeedBack")
                {
                    feedBackContentSeq = (item.CONTENT_SEQ == null ? 0 : item.CONTENT_SEQ.Value);
                    menuSeq = item.MENU_SEQ;
                }
            }

            return Json(new { FeedBackContentSeq = feedBackContentSeq, MenuSeq = menuSeq });
        }
    }
}