using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class TvScheduleController : Controller
    {
        // GET: Broad/TvSchedule
        public ActionResult Index()
        {
            return View();
        }


        [OutputCache(Duration = 10 * 60)]
        public ActionResult SearchList(string date)
        {
            var resultData = new BroadService.NewsProgramServiceClient().SearchListRunDown(date).ToList();

            return View(resultData);
        }

        [HttpPost]
        public ActionResult DownLoad()
        {
            NTB_ATTACH_FILE model = new BroadService.NewsProgramServiceClient().GetExcelFile();

            if (model == null)
            {
                return Content("<script>alert('등록된 파일이 없습니다.');history.back();</script>");
            }
            else
            {
                System.IO.MemoryStream stream = new Wow.Fx.CdnUploadHandler().FtpDownLoad(model.REAL_FILE_PATH);
                return File(stream, "multipart/form-data", model.USER_UPLOAD_FILE_NAME);
                //return File(model.REAL_FILE_PATH, "multipart/form-data", "편성표" + System.IO.Path.GetExtension(model.REAL_FILE_PATH));
            }
        }
    }
}