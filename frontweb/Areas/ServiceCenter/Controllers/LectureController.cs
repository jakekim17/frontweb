using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;

namespace Wow.Tv.FrontWeb.Areas.ServiceCenter.Controllers
{
    public class LectureController : Controller
    {
        public ActionResult Index(LectureCondition condition)
        {
            condition.CurrentSite = "Front";
            condition.PageSize = 4;
            var resultData = new LectureService.LectureServiceClient().GetList(condition);
            ViewBag.Condition = condition;

            return View(resultData);
        }

        public ActionResult Detail(LectureCondition condition,int seq = 0)
        {
            var resultData = new LectureService.LectureServiceClient().GetDetail(seq);
            ViewBag.Condition = condition;
            return View(resultData);
        }

        public ActionResult Calendar()
        {
            return View();
        }

        //public ActionResult GetCalendarData(string year, string month)
        //{
        //    bool isSuccess = false;
        //    string msg = "";
        //    var resultData = new List<JOIN_LECTURES_PARTNER>();
        //    try
        //    {
        //        var result = new LectureService.LectureServiceClient().GetCalendarDate(year, month);
        //        resultData = new List<JOIN_LECTURES_PARTNER>(result);
        //        isSuccess = true;
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //    }

        //    return Json(new { isSuccess = isSuccess, msg = msg, resultData = resultData });
        //}

        public ActionResult SearchSchedule(int seq=0)
        {
            var result = new LectureService.LectureServiceClient().SearchSchedule(seq);
            if(result == null)
            {
                result = new DtlSchedule();
            }
            return View(result);
        }
    }
}