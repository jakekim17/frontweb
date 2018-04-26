//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using Wow.Tv.FrontWeb.App_Start;

//namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
//{
//    [WowTvFrontAuthorizeAttribute(IsLogin = true)]
//    public class LoginController : Controller
//    {
//        readonly HttpContextBase _contextBase = new HttpContextWrapper(System.Web.HttpContext.Current);
//        // GET: Example/Login
//        public ActionResult Index()
//        {
//            return View();
//        }

//        [HttpPost]
//        public ActionResult AdminLogin()
//        {
//            HttpCookie myCookie = new HttpCookie("wowtv")
//            {
                
//                ["adminEmail"] = HttpUtility.UrlEncode("test@gmail.com"),
//                ["adminLevel"] = "A",
//                ["adminName"] = HttpUtility.UrlEncode("홍길동"),
//                ["adminID"] = "test",
//                ["lastLoginDate"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
//                ["adminNo"] = "1"
//            };

//            _contextBase.Response.Cookies.Add(myCookie);


//            return Json(new { IsSuccess = true });
//        }
        
//    }
//}