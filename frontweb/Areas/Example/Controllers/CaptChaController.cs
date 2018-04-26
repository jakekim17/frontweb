using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class CaptChaController : Controller
    {
        // GET: Example/CaptCha
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CaptChaImage()
        {
            Wow.Fx.CaptChaResult captChaResult = new Wow.Fx.CaptCha().MakeImage();
            Session["CaptChaText"] = captChaResult.Text;
            return File(captChaResult.Image.ToArray(), "image/png");
        }


        public ActionResult Confirm(string InputText)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                if (Session["CaptChaText"].ToString() == InputText)
                {
                    isSuccess = true;
                }
                else
                {
                    msg = "입력값이 일치하지 않습니다.";
                }
            }
            catch(Exception ex)
            {
                msg = ex.Message;
                if(ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new {IsSuccess = isSuccess, Msg = msg });
        }
    }
}