using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class TradeController : Controller
    {
        // GET: Broad/Trade
        public ActionResult Index(string programCode, int contentSeq)
        {
            var model = new BroadService.NewsProgramServiceClient().GetTrade(contentSeq);

            return View(model);
        }
    }
}