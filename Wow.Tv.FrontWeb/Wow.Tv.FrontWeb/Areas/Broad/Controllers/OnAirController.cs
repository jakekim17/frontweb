using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class OnAirController : Controller
    {
        // GET: Broad/OnAir
        [OutputCache(Duration = 10 * 60)]
        public ActionResult Index()
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            T_RUNDOWN model = newsProgramServiceClient.GetNowRunDown();

            List<USP_GetTabStrategetApplication_Result> todayStrategy = newsProgramServiceClient.TodayStrategy().ToList();
            ViewBag.TodayStrategy = todayStrategy;

            List<usp_GetlivePro_Result> onAirPartnerList = newsProgramServiceClient.GetOnAirPartnerList().ToList();
            ViewBag.OnAirPartnerList = onAirPartnerList;


            var hubBusinessList = new HubBusinessService.HubBusinessServiceClient().GetList().ListData.Where(a => a.DEL_YN == "N" && a.OPEN_YN == "Y").ToList();
            hubBusinessList = hubBusinessList.Where(a => a.CODE == "PLAYER").ToList();
            ViewBag.HubBusinessList = hubBusinessList;

            return View(model);
        }
    }
}