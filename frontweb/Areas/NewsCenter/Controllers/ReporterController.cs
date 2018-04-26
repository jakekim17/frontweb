using System;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.ReporterService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.Article.Reporter;
using Wow.Fx;
using System.Collections.Specialized;
using System.IO;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class ReporterController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 기자 찾기 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult ReporterList(ReporterListCondtion condition)
        {
            //string searchName = Request["txtSearchName"];
            //string searchInitial = Request["hdSearchInitial"];

            ListModel<NUP_REPORTER_SELECT_Result> resultData = new ReporterServiceClient().GetReporterList(null, condition.SearchName, condition.SearchInitial, 1, 1000, null);

            return View(resultData);
        }

        /// <summary>
        /// 기자 상세페이지
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult ReporterDetail(ReporterListCondtion condition)
        {
            var resultData = new ReporterService.ReporterServiceClient().GetReporterInfo(condition.SearchId);
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult GetSubScript(string searchId) {

            bool isData = false;
            var subScriptData = new NTB_ARTICLE_SUBSCRIPTION();

            if (LoginHandler.IsLogin == true)
            {
                subScriptData = new ReporterService.ReporterServiceClient().GetSubScription(searchId, LoginHandler.CurrentLoginUser);
                if(subScriptData != null)
                {
                    isData = true;
                }
            }

            return Json(new { isData = isData });
        }

        /// <summary>
        /// 추천수 가져오기
        /// </summary>
        /// <param name="searchId"></param>
        /// <returns></returns>
        public ActionResult GetRecommend(string searchId)
        {
            var result = new ReporterService.ReporterServiceClient().GetRecommend(searchId);

            return Json(new { recommend = result });
        }

        /// <summary>
        /// 최신 기사가져오기
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult GetLatestArtList(NewsCenterCondition condition)
        {
            condition.SearchSection = "REPORTER";
            condition.Page = condition.CurrentIndex / 20 + 1;
            //condition.SearchText = "IS001";
            var result = new NewsCenterService.NewsCenterServiceClient().GetNewsSectionList(condition);
            return View(result);
        }

        /// <summary>
        /// 기사 > 좋아요
        /// </summary>
        /// <returns></returns>
        public ActionResult GetArticleLiekIt(string articleId)
        {
            NTB_ARTICLE_LIKEIT model = new NewsCenterService.NewsCenterServiceClient().GetArticleLikeit(articleId);

            return View(model);
        }


        /// <summary>
        /// 기자에게 한마디 가져오기
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult GetAWordToReporter(AwordCondition condition)
        {
            var result = new ListModel<ReportAword>();
            if (LoginHandler.IsLogin == true)
            {
                result = new ReporterService.ReporterServiceClient().GetAWordToReporter(condition, LoginHandler.CurrentLoginUser);
            }
            else
            {
                if (LoginHandler.IsEasyLogin == true)
                {
                    result = new ReporterService.ReporterServiceClient().GetAWordToReporter(condition, LoginHandler.CurrentEasyLoginUser);
                }
            }
            
            @ViewBag.ReporterID = condition.ReporterId;
            return View(result);
        }

        /// <summary>
        /// 기자에게 한마디 저장
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult SaveReply(NTB_REPORTER_AWORD model)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                if (LoginHandler.IsLogin == true)
                {
                    new ReporterService.ReporterServiceClient().SaveAWordToReporter(model, LoginHandler.CurrentLoginUser);
                }
                else if (LoginHandler.IsEasyLogin == true)
                {
                    new ReporterService.ReporterServiceClient().SaveAWordToReporter(model, LoginHandler.CurrentEasyLoginUser);
                }
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new{ isSuccess = isSuccess , msg = msg });
        }

        /// <summary>
        /// 기자에게 한마디 삭제
        /// </summary>
        /// <param name="replyId"></param>
        /// <returns></returns>
        public ActionResult DeleteReply(int replyId = 0)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                new ReporterService.ReporterServiceClient().DeleteAWordToReporter(replyId);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 추천하기 저장
        /// </summary>
        /// <param name="reporterId"></param>
        /// <returns></returns>
        public ActionResult SaveRecommend(string reporterId)
        {
            var isSuccess = false;
            var isRecommend = true;
            var msg = "";
            try
            {
                if (CookieMgr.GetCookie("Recommend_" + reporterId, "ReporterId", false, new EncryptTypeEnum()) == "")
                {
                    new ReporterService.ReporterServiceClient().SaveRecommend(reporterId);
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

        /// <summary>
        /// 기자정보 가져오기
        /// </summary>
        /// <param name="reporterId"></param>
        /// <returns></returns>
        public ActionResult GetReporterInfo(string reporterId)
        {
            var result = new ReporterService.ReporterServiceClient().GetReporterInfo(reporterId);

            return View(result);
        }

        /// <summary>
        /// 기자 정보 저장
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
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

        /// <summary>
        /// 이메일 보내기 팝업 가져오기
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public ActionResult GetEmailForm(string email, string reporterName)
        {
            ViewBag.Email = email;
            ViewBag.ReporterName = reporterName;
            return View();
        }

        /// <summary>
        /// 이메일 보내기
        /// </summary>
        /// <param name="sendEmail"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult SendEmail(SendEmail sendEmail)
        {
            var isSuccess = false;
            var msg = "";
            try
            {
                // 이메일 보내기 연결 
                new ReporterService.ReporterServiceClient().SendEmail(sendEmail);
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