using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.broadcast.MyProgram;
using Wow.Tv.Middle.Model.Db49.wowtv.MyProgram;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class ProgramMainController : Controller
    {
        // GET: Broad/ProgramMain
        //[OutputCache(Duration = 10 * 60)]
        public ActionResult Index(string programCode, int? broadWatchNumber)
        {
            Middle.Model.Common.LoginUser loginUser = new Middle.Model.Common.LoginUser();

            // ===============================

            #region 기본 메뉴 확인후 생성

            // 기본 메뉴 확인후 생성
            MenuCondition menuCondition = new MenuCondition();
            menuCondition.SearchProgramCode = programCode;
            menuCondition.UpMenuSeq = -1;

            MenuService.MenuServiceClient menuServiceClient = new MenuService.MenuServiceClient();
            var menuModel = menuServiceClient.SearchList(menuCondition);
            if (menuModel.TotalDataCount == 0)
            {
                #region Admin Menu

                int newMenuSeq = 0;
                NTB_MENU menu = new NTB_MENU();
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_ADMIN_CHANNEL_CODE;
                menu.PRG_CD = programCode;

                menu.CONTENT_TYPE_CODE = "Page";
                menu.LINK_TYPE_CODE = "_self";
                menu.ACTIVE_YN = "Y";
                menu.FIX_YN = "Y";

                #region 기본환경설정

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "기본환경설정";
                menu.LINK_URL = "javascript:void(0);";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "프로그램메뉴관리";
                menu.LINK_URL = "/MyBroadProgram/MenuManage/Index";
                menuServiceClient.Save(menu, loginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "광고배너관리";
                menu.LINK_URL = "/MyBroadProgram/ProgramBanner/Index";
                menuServiceClient.Save(menu, loginUser);

                #endregion


                #region 프로그램홈관리

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램홈관리";
                menu.LINK_URL = "/MyBroadProgram/HomeManage/Index";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion


                #region 프로그램소개

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램소개";
                menu.LINK_URL = "javascript:void(0);";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "프로그램 소개글";
                menu.LINK_URL = "/MyBroadProgram/ProgramIntro/Index";
                menuServiceClient.Save(menu, loginUser);

                menu.UP_MENU_SEQ = newMenuSeq;
                menu.DEPTH = 2;
                menu.MENU_NAME = "출연진 관리";
                menu.LINK_URL = "/MyBroadProgram/CastManage/Index";
                menuServiceClient.Save(menu, loginUser);

                #endregion



                #region 방송보기

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "방송보기";
                menu.LINK_URL = "/MyBroadProgram/BroadWatch/Index";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion


                #endregion



                #region Front Menu

                newMenuSeq = 0;
                menu = new NTB_MENU();
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_FRONT_CHANNEL_CODE;
                menu.PRG_CD = programCode;

                menu.CONTENT_TYPE_CODE = "Page";
                menu.LINK_TYPE_CODE = "_self";
                menu.ACTIVE_YN = "Y";
                menu.FIX_YN = "Y";

                #region 프로그램소개

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램소개";
                menu.LINK_URL = "/Broad/ProgramIntro/Index";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion


                #region 방송보기

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "방송보기";
                menu.LINK_URL = "/Broad/BroadWatch/Index";
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion


                #region 사용안함

                //#region 시청자참여

                //menu.UP_MENU_SEQ = 0;
                //menu.DEPTH = 1;
                //menu.MENU_NAME = "시청자참여";
                //menu.LINK_URL = "";
                //menu.CONTENT_TYPE_CODE = "Board";
                //menu.CONTENT_SEQ = boardSeq;
                //newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                //#endregion


                //#region 공지사항

                //menu.UP_MENU_SEQ = 0;
                //menu.DEPTH = 1;
                //menu.MENU_NAME = "프로그램공지사항";
                //menu.LINK_URL = "";
                //menu.CONTENT_TYPE_CODE = "Board";
                //menu.CONTENT_SEQ = boardSeq2;
                //newMenuSeq = menuServiceClient.Save(menu, LoginHandler.CurrentLoginUser);

                //#endregion

                #endregion


                #endregion



                // 어드민과 프런트 같이 사용
                menu.CHANNEL_CODE = CommonCodeStatic.MENU_BROAD_DUAL_CHANNEL_CODE;

                #region 시청자참여

                // 게시판 먼저 생성
                int boardSeq = 0;
                BoardService.BoardServiceClient boardService = new BoardService.BoardServiceClient();
                NTB_BOARD board = new NTB_BOARD();
                board.BOARD_TYPE_CODE = "FeedBack";
                board.BOARD_NAME = "시청자참여 게시판";
                board.TOP_NOTICE_YN = "N";
                board.NOTICE_COUNT = 0;
                board.COMMENT_YN = "Y";
                board.REPLY_YN = "N";
                board.ATTACH_FILE_YN = "N";
                board.EMAIL_YN = "N";
                board.FILE_COUNT = 1;
                board.SCRAP_YN = "N";
                board.ACTIVE_YN = "Y";
                board.BLIND_YN = "N";
                board.KEYWORD_YN = "N";
                board.PASSWORD_YN = "N";
                board.TOP_CONTENT = "";
                board.BOTTOM_CONTENT = "";
                boardSeq = boardService.Save(board, loginUser);

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "시청자참여";
                menu.LINK_URL = "";
                menu.CONTENT_TYPE_CODE = "Board";
                menu.CONTENT_SEQ = boardSeq;
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion


                #region 공지사항

                // 게시판 먼저 생성
                int boardSeq2 = 0;
                board = new NTB_BOARD();
                board.BOARD_TYPE_CODE = "Notice";
                board.BOARD_NAME = "프로그램공지사항 게시판";
                board.TOP_NOTICE_YN = "N";
                board.NOTICE_COUNT = 0;
                board.COMMENT_YN = "Y";
                board.REPLY_YN = "N";
                board.ATTACH_FILE_YN = "N";
                board.EMAIL_YN = "N";
                board.FILE_COUNT = 0;
                board.SCRAP_YN = "N";
                board.ACTIVE_YN = "Y";
                board.BLIND_YN = "N";
                board.KEYWORD_YN = "N";
                board.PASSWORD_YN = "N";
                board.TOP_CONTENT = "";
                board.BOTTOM_CONTENT = "";
                boardSeq2 = boardService.Save(board, loginUser);

                menu.UP_MENU_SEQ = 0;
                menu.DEPTH = 1;
                menu.MENU_NAME = "프로그램공지사항";
                menu.LINK_URL = "";
                menu.CONTENT_TYPE_CODE = "Board";
                menu.CONTENT_SEQ = boardSeq2;
                newMenuSeq = menuServiceClient.Save(menu, loginUser);

                #endregion
            }

            #endregion

            // ===============================




            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            BroadService.ProgramTemplateServiceClient programTemplateServiceClient = new BroadService.ProgramTemplateServiceClient();

            T_NEWS_PRG model = newsProgramServiceClient.GetAt(programCode);

            #region MainImage

            NTB_ATTACH_FILE mainImage = newsProgramServiceClient.GetMainAttachFile(programCode);

            if (mainImage != null && String.IsNullOrEmpty(mainImage.REAL_WEB_PATH) == false)
            {
                ViewBag.MainImg = mainImage.REAL_WEB_PATH;
            }
            else
            {
                ViewBag.MainImg = "/Content/Images/blank.gif";
            }

            #endregion


            #region Template

            NTB_PROGRAM_TEMPLATE programTemplate = programTemplateServiceClient.GetAtProgramTemplate(programCode);
            if(programTemplate == null || programTemplate.DEL_YN == "Y")
            {
                programTemplate = new NTB_PROGRAM_TEMPLATE();
            }

            ViewBag.ProgramTemplate = programTemplate;

            #endregion

            #region broadWatchNumber

            if (broadWatchNumber == null)
            {
                broadWatchNumber = 0;
            }
            ViewBag.BroadWatchNumber = broadWatchNumber;

            #endregion

            #region familyList

            List<T_NEWS_PRG> familyList = programTemplateServiceClient.GetFamilyList(programCode).ToList();

            ViewBag.FamilyList = familyList;


            #endregion


            #region childList
            
            List<T_NEWS_PRG> childList = programTemplateServiceClient.GetChildList(programCode).ToList();

            ViewBag.ChildList = childList;

            #endregion


            #region Program Type

            string programType = programTemplateServiceClient.GetProgramType(programCode);
            ViewBag.ProgramType = programType;

            #endregion


            #region Menu

            menuCondition = new MenuCondition();
            menuCondition.ChannelCode = CommonCodeStatic.MENU_BROAD_FRONT_OR_DUAL_CHANNEL_CODE;
            menuCondition.SearchProgramCode = programCode;
            menuCondition.Depth = 1;
            menuCondition.ActiveYn = "Y";
            menuCondition.PageSize = -1;
            var menuList1 = new MenuService.MenuServiceClient().SearchList(menuCondition);

            ViewBag.MenuList1 = menuList1.ListData;

            #endregion



            return View(model);
        }


        [OutputCache(Duration = 10 * 60)]
        public ActionResult UnionPartial(string programCode)
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            BroadService.ProgramTemplateServiceClient programTemplateServiceClient = new BroadService.ProgramTemplateServiceClient();
            

            T_NEWS_PRG model = newsProgramServiceClient.GetAt(programCode);

            #region Rectangle Image

            NTB_ATTACH_FILE rectangleImage = newsProgramServiceClient.GetRectangleAttachFile(programCode);

            if (rectangleImage != null && String.IsNullOrEmpty(rectangleImage.REAL_WEB_PATH) == false)
            {
                ViewBag.RectangleImg = rectangleImage.REAL_WEB_PATH;
            }
            else
            {
                ViewBag.RectangleImg = "Content/Images/blank.gif";
            }

            #endregion


            #region 프로그램 소개

            NTB_PROGRAM_INTRO programIntro = new ProgramIntroService.ProgramIntroServiceClient().GetAt(programCode);
            if(programIntro == null)
            {
                programIntro = new NTB_PROGRAM_INTRO();
            }

            ViewBag.ProgramIntro = programIntro;

            #endregion


            #region 출연진

            //List<Pro_wowList> partnerList = new BroadService.NewsProgramServiceClient().GetWowListPartnerList(programCode).ToList();
            //ViewBag.PartnerList = partnerList;

            CastCondition castCondition = new CastCondition();
            castCondition.ProgramCode = programCode;
            List<CastService.ProgramCastModel> castList = new CastService.CastServiceClient().SearchList(castCondition).ListData;
            ViewBag.CastList = castList;


            #endregion


            #region 추천파트너

            List<USP_GetBroadcast1ByWellList_Result> proWowWellList = newsProgramServiceClient.GetProWowWellList().ToList();
            ViewBag.ProWowWellList = proWowWellList;

            List<Pro_wowListStockKing> proStockKing3 = newsProgramServiceClient.GetStockKing3().ToList();
            ViewBag.ProStockKing3 = proStockKing3;

            #endregion



            return View(model);
        }



        [OutputCache(Duration = 10 * 60)]
        public ActionResult Banner(string programCode)
        {
            BannerCondition condition = new BannerCondition();
            condition.PageSize = -1;
            condition.PublishYn = "Y";
            condition.IsNow = true;
            condition.ProgramCode = programCode;

            var resultData = new BannerService.BannerServiceClient().SearchList(condition);

            return View(resultData);
        }

    }
}