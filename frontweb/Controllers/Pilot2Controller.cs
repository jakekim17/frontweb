using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Pilot;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class Pilot2Controller : Controller
    {
        // GET: Pilot2
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult List(PilotCondition condition)
        {
            var resultData = new PilotService.PilotServiceClient().SearchList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;
            ViewBag.CurrentIndex = condition.CurrentIndex;
            ViewBag.Condition = condition;
            return View(resultData.ListData);
        }


        public ActionResult Edit(int seq)
        {
            var resultData = new PilotService.PilotServiceClient().GetAt(seq);
            if (resultData == null)
            {
                resultData = new TAB_BOARD();
            }

            return View(resultData);
        }


        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Save(TAB_BOARD model)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new PilotService.PilotServiceClient().Save(model);
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

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }




        [HttpPost]
        //[OutputCache(Duration = 10)]
        public ActionResult Detail(int seq)
        {
            var resultData = new PilotService.PilotServiceClient().GetAt(seq);
            
            return View(resultData);
        }




        [HttpPost]
        public ActionResult Delete(int seq)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new PilotService.PilotServiceClient().Delete(seq);
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

            return Json(new { IsSuccess = isSuccess, Msg = msg });
        }


    }
}