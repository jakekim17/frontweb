using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class ProcController : Controller
    {
        // GET: Broad/Proc
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult SearchListPartial(BroadWatchCondition condition)
        {
            condition.PublishYn = "Y";

            var listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);

            return View(listModel);
            //return View();
        }
    }
}