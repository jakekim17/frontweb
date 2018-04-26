using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class BroadWatchController : Controller
    {
        // GET: Broad/BroadWatch
        [OutputCache(Duration = 10 * 60)]
        public ActionResult Index(string programCode, string broadWatchNumber)
        {
            ViewBag.ProgramCode = programCode;

            if (String.IsNullOrEmpty(broadWatchNumber) == true)
            {
                BroadWatchCondition condition = new BroadWatchCondition();
                condition.ProgramCode = programCode;
                var broadWatch = new BroadWatchService.BroadWatchServiceClient().SearchList(condition).ListData.FirstOrDefault();
                if (broadWatch != null)
                {
                    broadWatchNumber = broadWatch.Num.ToString();
                }
            }
            ViewBag.BroadWatchNumber = broadWatchNumber;

            return View();
        }

        [OutputCache(Duration = 10 * 60)]
        public ActionResult PlayInfo(int broadWatchNumber)
        {
            var model = new BroadWatchService.BroadWatchServiceClient().GetAt(broadWatchNumber);

            return View(model);
        }

        [OutputCache(Duration = 10 * 60)]
        public ActionResult SearchList(BroadWatchCondition condition)
        {
            condition.PublishYn = "Y";

            var listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);

            return View(listModel);
        }
    }
}