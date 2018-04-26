using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class FileUploadController : Controller
    {
        // GET: Example/FileUpload
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Upload()
        {
            bool isSuccess = false;
            string msg = "";
            string imageUrl = "";

            try
            {
                var file = Request.Files[0];

                string uploadPath = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["UploadPath"]);
                string fileName = DateTime.Now.ToFileTime().ToString() + System.IO.Path.GetExtension(file.FileName);
                file.SaveAs(uploadPath + "\\" + fileName);

                imageUrl = System.Configuration.ConfigurationManager.AppSettings["UploadPath"] + "/" + fileName;

                isSuccess = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg, ImageUrl = imageUrl });
        }



        public ActionResult Multy()
        {
            return View();
        }


        public ActionResult MultyUpload()
        {
            bool isSuccess = false;
            string msg = "";
            List<Models.ImageFile> imageList = new List<Models.ImageFile>();

            try
            {
                string uploadPath = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["UploadPath"]);

                for(int i = 0; i < Request.Files.Count; i++)
                {
                    HttpPostedFileBase file = Request.Files[i];
                    Models.ImageFile item = new Models.ImageFile();

                    string fileName = DateTime.Now.ToFileTime().ToString() + System.IO.Path.GetExtension(file.FileName);
                    file.SaveAs(uploadPath + "\\" + fileName);

                    item.Src = System.Configuration.ConfigurationManager.AppSettings["UploadPath"] + "/" + fileName;
                    imageList.Add(item);
                }

                isSuccess = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                if (ex.InnerException != null)
                {
                    msg += "\r\n" + ex.InnerException.Message;
                }
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg, ImageList = imageList });
        }




        public ActionResult Index2()
        {
            return View();
        }

        public ActionResult Upload2(TempTest aa)
        {
            // TODO

            return Json(new { aaa = "A" });
        }


    }


    public class TempTest
    {
        public string One { get; set; }
        public string Two { get; set; }
        public string Three { get; set; }

        public HttpPostedFileBase UploadFile { get; set; }
    }


}