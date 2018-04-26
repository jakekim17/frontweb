using System;
using System.IO;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class UploadController : Controller
    {
        public ActionResult EditorFileUpload()
        {
            var file = Request.Files[0];

            var filePath = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["UploadPath"]);
            var fileName = Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName);

            file.SaveAs(Path.Combine(filePath, fileName));

            return Redirect("/Script/SE2/photo_uploader/popup/callback.html?" + "&bNewLine=true&sFileURL=" + Server.UrlEncode(filePath) + "&sFileName=" + fileName);
        }
    }
}