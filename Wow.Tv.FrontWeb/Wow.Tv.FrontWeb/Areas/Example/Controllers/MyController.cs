using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Controllers;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class MyController : BaseController
    {
        // GET: Example/My
        public ActionResult Index()
        {
            return View();
        }
    }
}