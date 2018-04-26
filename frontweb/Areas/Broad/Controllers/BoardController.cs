using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class BoardController : Controller
    {
        // GET: Broad/Board
        public ActionResult Index()
        {
            return View();
        }
    }
}