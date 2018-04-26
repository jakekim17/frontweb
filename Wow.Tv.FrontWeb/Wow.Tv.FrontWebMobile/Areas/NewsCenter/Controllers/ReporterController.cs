using System;
using System.Collections.Specialized;
using System.IO;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWebMobile.ReporterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.Article.Reporter;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class ReporterController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchReporterList(ReporterListCondtion condition)
        {
            var resultData = new ReporterServiceClient().GetReporterList(null, condition.SearchName, condition.SearchInitial, 1, 1000, null);
            return View(resultData);
        }

        public ActionResult ReporterDetail(ReporterListCondtion condition)
        {
            var resultData = new ReporterServiceClient().GetReporterInfo(condition.SearchId);
            var subScriptData = new NTB_ARTICLE_SUBSCRIPTION();

            if (LoginHandler.IsLogin == true)
            {
                subScriptData = new ReporterService.ReporterServiceClient().GetSubScription(condition.SearchId, LoginHandler.CurrentLoginUser);
            }

            ViewBag.SubScript = subScriptData;
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult GetRecommend(string searchId)
        {
            var recommendCnt = new ReporterServiceClient().GetRecommend(searchId);
            return Json(new { recommendCnt = recommendCnt });
        }

        public ActionResult GetLatestArtList(NewsCenterCondition condition)
        {
            condition.SearchSection = "REPORTER";
            condition.Page = condition.CurrentIndex / 20 + 1;
            var result = new NewsCenterService.NewsCenterServiceClient().GetNewsSectionList(condition);

            return View(result);
        }

        public ActionResult GetArticleLikeIt(string articleId)
        {
            var model = new NewsCenterService.NewsCenterServiceClient().GetArticleLikeit(articleId);
            return View(model);
        }

        public ActionResult GetAWordToReporter(AwordCondition condition, string isAdd)
        {
            var result = new ListModel<ReportAword>();

            if (LoginHandler.IsLogin == true)
            {
                result = new ReporterServiceClient().GetAWordToReporter(condition, LoginHandler.CurrentLoginUser);
            }
            if (LoginHandler.IsEasyLogin == true)
            {
                result = new ReporterServiceClient().GetAWordToReporter(condition, LoginHandler.CurrentEasyLoginUser);
            }

            ViewBag.IsAdd = isAdd;
            ViewBag.ReporterID = condition.ReporterId;

            return View(result);
        }

        [ValidateInput(false)]
        public ActionResult SaveAWordToReporter(NTB_REPORTER_AWORD model)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                if (LoginHandler.IsLogin == true)
                {
                    new ReporterServiceClient().SaveAWordToReporter(model, LoginHandler.CurrentLoginUser);
                }
                else if (LoginHandler.IsEasyLogin == true)
                {
                    new ReporterServiceClient().SaveAWordToReporter(model, LoginHandler.CurrentEasyLoginUser);
                }
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult DeleteAWordToReporter(int replyId = 0)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                new ReporterServiceClient().DeleteAWordToReporter(replyId);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult SaveRecommend(string reporterId)
        {
            var isSuccess = false;
            var isRecommend = true;
            var msg = "";
            try
            {
                if (CookieMgr.GetCookie("Recommend_" + reporterId, "ReporterId", false, new EncryptTypeEnum()) == "")
                {
                    new ReporterServiceClient().SaveRecommend(reporterId);
                    NameValueCollection nameValue = new NameValueCollection
                    {
                        { "ReporterId", reporterId },
                        { "Date", DateTime.Now.ToString() }
                    };
                    CookieMgr.SetMultyCookie("Recommend_" + reporterId, nameValue, false, new EncryptTypeEnum());
                    isRecommend = false;
                }
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, isRecommend = isRecommend });
        }

        public ActionResult GetReporterInfo(string reporterId, ReporterListCondtion condition)
        {
            var result = new ReporterService.ReporterServiceClient().GetReporterInfo(reporterId);

            ViewBag.Condition = condition;
            return View(result);
        }

        [ValidateInput(false)]
        public ActionResult SaveReporterInfo(NTB_REPORTER_PROFILE model, string txtImgURL)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                var file = Request.Files;
                if (file != null && file.Count > 0 && file[0].FileName != "")
                {
                    var upload = file[0];
                    string uploadPath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
                    string uploadWebPath = uploadPath + "/News/Reporter/";
                    uploadPath = uploadPath + "\\News\\Reporter\\";
                    string fileName = model.REPORTER_ID + Path.GetExtension(upload.FileName);

                    new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadPath, fileName, upload.InputStream);
                    model.IMAGE_URL = uploadWebPath + fileName;
                }

                new ReporterService.ReporterServiceClient().SaveReporterInfo(model, txtImgURL, LoginHandler.CurrentLoginUser);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult GetEmailForm(string Email, string ReporterName, ReporterListCondtion condition)
        {
            ViewBag.Email = Email;
            ViewBag.ReporterName = ReporterName;
            ViewBag.Condition = condition;
            return View();
        }

        public ActionResult SendEmail(SendEmail sendEmail)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                new ReporterServiceClient().SendEmail(sendEmail);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }
    }
}