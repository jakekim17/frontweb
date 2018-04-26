using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.ServiceCenter.Controllers
{
    public class EventController : Controller
    {
        // GET: ServiceCenter/Event
        public ActionResult Index()
        {
            return View();
        }
    }
}