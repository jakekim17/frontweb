using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWebMobile.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Error404(string errorpath)
        {
            ViewBag.ErrorType = "404";
            ViewBag.ErrorDetail = ViewBag.ErrorMessage = $"요청한 경로({Request.QueryString["aspxerrorpath"]}) 는 없는 경로입니다.";
            return View();
        }
    }
}