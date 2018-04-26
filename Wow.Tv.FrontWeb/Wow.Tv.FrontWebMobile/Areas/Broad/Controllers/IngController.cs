using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class IngController : Controller
    {
        // GET: Broad/Ing
        public ActionResult Index()
        {
            return View();
        }


        [OutputCache(Duration = 10 * 60)]
        public ActionResult SearchListPartial(BroadWatchCondition condition)
        {
            condition.SearchType = "Title";
            condition.PublishYn = "Y";

            ListModel<tv_program> listModel = new ListModel<tv_program>();
            if (String.IsNullOrEmpty(condition.ProgramCode) && String.IsNullOrEmpty(condition.ProgramName))
            {
                listModel = new BroadWatchService.BroadWatchServiceClient().SearchList2(condition);
            }
            else
            {
                listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);
            }

            return View(listModel);
            //return View();
        }

    }
}