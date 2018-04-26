using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class CornerController : Controller
    {
        // GET: Broad/Corner
        public ActionResult Index(string programCode, string contentSeq)
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();

            ViewBag.ProgramCode = programCode;
            ViewBag.ContentSeq = contentSeq;


            #region 하위메뉴 (하위 코너)

            List<NTB_MENU> innerMenuList = newsProgramServiceClient.GetMenuByProgramCode(programCode).Where(a => a.DEPTH > 1).ToList();
            ViewBag.InnerMenuList = innerMenuList;

            #endregion


            #region 현재메뉴 (현재 코너)

            NTB_MENU currentInnerMenu = new NTB_MENU();
            if (String.IsNullOrEmpty(contentSeq) == true || contentSeq == "0")
            {
                if (innerMenuList.Count > 0)
                {
                    currentInnerMenu = innerMenuList[0];
                }
            }
            else
            {
                currentInnerMenu = newsProgramServiceClient.GetMenuByCornerSeq(programCode, contentSeq);
            }
            if (currentInnerMenu == null)
            {
                currentInnerMenu = new NTB_MENU();
            }
            ViewBag.CurrentInnerMenu = currentInnerMenu;

            #endregion


            return View();
        }


        public ActionResult SearchList(string programCode, string scCode, int currentIndex, int pageSize)
        {
            ViewBag.ProgramCode = programCode;
            ViewBag.ScCode = scCode;

            if (currentIndex > 1)
            {
                currentIndex = (currentIndex / pageSize) + 1;
            }
            if (currentIndex == 0)
            {
                currentIndex = 1;
            }
            
            ListModel<usp_GetCornerVODList_WEB_Result> listModel = new BroadService.NewsProgramServiceClient().GetCornerVod(scCode, currentIndex, pageSize);

            return View(listModel);
        }


    }
}