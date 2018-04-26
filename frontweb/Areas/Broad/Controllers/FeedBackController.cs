using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.FrontWeb.App_Start;
using Wow.Tv.FrontWeb.IntegratedBoardService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class FeedBackController : Controller
    {
        // GET: IntegratedBoard/Inquiry
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(IntegratedBoardCondition condition)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }
            condition.PageSize = 10;
            NTB_BOARD boardInfo = integratedBoard.GetBoardInfo(condition.CurrentMenuSeq);

            ViewBag.BoardInfo = boardInfo;


            var menuInfo = new MenuService.MenuServiceClient().GetAt(condition.CurrentMenuSeq);
            condition.COMMON_CODE = menuInfo.PRG_CD;
            var resultData = integratedBoard.GetFeedBackList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            //ViewBag.BOARD_SEQ = resultData.BoardInfo.BOARD_SEQ;
            ViewBag.CurrentIndex = condition.CurrentIndex;

            ViewBag.Condition = condition;
            ViewBag.IngYn = condition.IngYn;
            var programList = integratedBoard.GetCreateBoardProgramList("").ToList(); // GetProgramCodeList("");
            programList.Insert(0, new TAB_PROGRAM_LIST { PGM_ID = "", PGM_NAME = "방송 상태 선택" });
            ViewBag.ProgramList = programList;

            return View(resultData);
        }

        public List<T_NEWS_PRG> GetProgramCodeList(string ingYn)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            T_NEWS_PRG[] programList = integratedBoard.GetProgramList(ingYn);
            return programList.ToList();
        }

        public JsonResult GetProgramCode(string ingYn)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            IList<TAB_PROGRAM_LIST> programList = new List<TAB_PROGRAM_LIST>();
            if (string.IsNullOrWhiteSpace(ingYn) || ingYn.Equals("ALL"))
            {

            }
            else
            {
                programList = integratedBoard.GetCreateBoardProgramList(ingYn);
            }

            return Json(new { IsSuccess = true, programList });
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        public ActionResult Delete(int seq)
        {
            string msg = string.Empty;

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };

            integratedBoard.BoardDelete(seq, loginUser);

            return Json(new { IsSuccess = true, Msg = msg });
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        public ActionResult Edit(int seq, IntegratedBoardCondition condition, int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            if (!string.IsNullOrEmpty(HttpContext.Request["menuSeq"]))
            {
                condition.CurrentMenuSeq = int.Parse(HttpContext.Request["menuSeq"]);
            }

            var resultData = integratedBoard.GetBoardDetail(seq);


            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.BoradInfo = GetBoardInfo(condition.CurrentMenuSeq);
            ViewBag.Seq = seq;
            //var programList = integratedBoard.GetCreateBoardProgramList(""); // GetProgramCodeList("");
            //var programInfo = programList.FirstOrDefault(x => x.PGM_ID.Equals(resultData.COMMON_CODE));
            //var ingYn = programInfo.ING_YN;
            //resultData.CommonName = programInfo.PGM_NAME;

            //ViewBag.IngYn = ingYn;

            return View(resultData);
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Save(NTB_BOARD_CONTENT board, int currentMenuSeq)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };


            int boardContentSeq = integratedBoard.BoardSave(board, loginUser);

            bool isSuccess = true;

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult FileSave(NTB_BOARD_CONTENT board, IEnumerable<HttpPostedFileBase> files, int currentMenuSeq)
        {
            string msg = "";
            bool isSuccess = true;

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + @"\\IntegratedBoard\\FeedBack\\";
            uploadWebPath = uploadWebPath + "/IntegratedBoard/FeedBack/";


            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };
            board.BLIND_YN = "N";

            ////고객센터는 따로 프로그램 코드로 Board 번호를 가져온다
            //NTB_MENU menuInfo = integratedBoard.GetFeedBackProgamCodeToBoardSeq(board.COMMON_CODE);
            //board.BOARD_SEQ = menuInfo.CONTENT_SEQ.Value;
            var menuInfo = new MenuService.MenuServiceClient().GetAt(currentMenuSeq);
            board.BOARD_SEQ = menuInfo.CONTENT_SEQ.Value;
            board.COMMON_CODE = menuInfo.PRG_CD;



            int boardContentSeq = integratedBoard.BoardFeedBackSave(board, loginUser);
            bool isDeleteFileAll = true;
            var httpPostedFileBases = files as HttpPostedFileBase[] ?? files.ToArray();
            foreach (var file in httpPostedFileBases)
            {
                if (file == null) continue;

                NTB_ATTACH_FILE model = new NTB_ATTACH_FILE { USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName) };
                model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
                model.FILE_SIZE = file.ContentLength;
                string realFileName = DateTime.Now.ToFileTime() + model.EXTENSION;
                model.REAL_FILE_PATH = uploadFilePath + realFileName;
                model.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //file.SaveAs(model.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, file.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);



                integratedBoard.FileSave(model, boardContentSeq, isDeleteFileAll);
                isDeleteFileAll = false;
            }
            return Json(new { IsSuccess = isSuccess, Msg = msg, NowDate = DateTime.Now.ToDate() });
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        public ActionResult Add(IntegratedBoardCondition condition, int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            ViewBag.MenuSeq = condition.CurrentMenuSeq;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;

            var programList = integratedBoard.GetCreateBoardProgramList("").ToList();

            ViewBag.ProgramList = programList;
            //ViewBag.ProgramList = GetProgramCodeList("");
            
            ViewBag.CurrentMenuSeq = currentMenuSeq;

            return View();
        }

        public ActionResult Detail(int seq, IntegratedBoardCondition condition, int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetBoardDetail(seq);
            if (resultData != null)
            {
                integratedBoard.ReadCountIncrease(seq);//게시물 조회수 증가
                resultData.READ_CNT++;
            }
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            ViewBag.BoradInfo = GetBoardInfo(condition.CurrentMenuSeq);
            ViewBag.Seq = seq;
            //var programList = integratedBoard.GetCreateBoardProgramList("");
            //var programInfo = programList.FirstOrDefault(x => x.PGM_ID.Equals(resultData.COMMON_CODE));
            //var ingYn = programInfo.ING_YN;
            //resultData.CommonName = programInfo.PGM_NAME;
            //ViewBag.IngYn = ingYn;

            ViewBag.CurrentMenuSeq = currentMenuSeq;

            return View(resultData);
        }

        private NTB_BOARD GetBoardInfo(int currentMenuSeq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            return integratedBoard.GetBoardInfo(currentMenuSeq);
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult CommentSave(NTB_BOARD_COMMENT comment)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };

            integratedBoard.CommentSave(comment, loginUser);

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult CommentDelete(int seq)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };

            integratedBoard.CommentDelete(seq, loginUser);

            return Json(new { IsSuccess = true, Msg = msg });
        }

        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult CommentUpdate(int seq, string content)
        {
            string msg = string.Empty;
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };

            integratedBoard.CommentUpdate(seq, content, loginUser);

            return Json(new { IsSuccess = true, Msg = msg });
        }

        public ActionResult ReplyList(int seq)
        {
            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();

            var resultData = integratedBoard.GetCommentList(seq).ToList();
            ViewBag.BoardSeq = seq;
            return View(resultData);
        }


        [WowTvFrontAuthorize(IsLogin = true)]
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult FileUpdate(NTB_BOARD_CONTENT board, IEnumerable<HttpPostedFileBase> files)
        {
            string msg = "";
            bool isSuccess = true;

            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPathRoot"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPathRoot"];
            uploadFilePath = uploadFilePath + @"\\IntegratedBoard/FeedBack\\";
            uploadWebPath = uploadWebPath + "/IntegratedBoard/FeedBack/";

            LoginUser loginUser = new LoginUser
            {
                LoginId = LoginHandler.CurrentLoginUser.UserId,
                UserName = LoginHandler.CurrentLoginUser.NickName
            };

            IntegratedBoardServiceClient integratedBoard = new IntegratedBoardServiceClient();
            board.DEL_YN = "N";
            board.BLIND_YN = "N";

            int boardContentSeq = integratedBoard.BoardFeedBackSave(board, loginUser);
            var httpPostedFileBases = files as HttpPostedFileBase[] ?? files.ToArray();

            foreach (var file in httpPostedFileBases)
            {
                if (file == null) continue;

                NTB_ATTACH_FILE model = new NTB_ATTACH_FILE { USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(file.FileName) };
                model.EXTENSION = System.IO.Path.GetExtension(model.USER_UPLOAD_FILE_NAME);
                model.FILE_SIZE = file.ContentLength;
                string realFileName = DateTime.Now.ToFileTime() + model.EXTENSION;
                model.REAL_FILE_PATH = uploadFilePath + realFileName;
                model.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //file.SaveAs(model.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, file.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, file.InputStream);


                integratedBoard.FileSave(model, boardContentSeq, false);
            }

            return Json(new { IsSuccess = isSuccess, Msg = msg, NowDate = DateTime.Now.ToDate() });
        }


    }
}