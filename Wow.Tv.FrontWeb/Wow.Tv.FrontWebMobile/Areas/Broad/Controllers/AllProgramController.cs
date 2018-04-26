using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.FrontWebMobile.Areas.Broad.Controllers
{
    public class AllProgramController : Controller
    {
        // GET: Broad/AllProgram
        public ActionResult Index()
        {
            return View();
        }


        [OutputCache(Duration = 10 * 60)]
        public ActionResult SearchList(NewsProgramCondition condition)
        {

            BroadService.ProgramGroupServiceClient programGroupServiceClient = new BroadService.ProgramGroupServiceClient();

            //condition.PageSize = -1;
            condition.PublishYn = "Y";
            condition.AllProgramViewYn = "Y";

            ViewBag.Condition = condition;

            //var listModel = new BroadService.NewsProgramServiceClient().SearchList(condition);

            ListModel<T_NEWS_PRG> list = new ListModel<T_NEWS_PRG>();
            list.ListData = new List<T_NEWS_PRG>();

            if (condition.ProgramNameTermStart == "Etc")
            {
                var listModel = new BroadService.NewsProgramServiceClient().GetAllProgramEtcList(condition.Year
                    , condition.CurrentIndex + 1, condition.CurrentIndex + condition.PageSize);

                foreach (var item in listModel)
                {
                    list.TotalDataCount = item.total.Value;

                    var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                    if (programGroup != null)
                    {
                        item.PRG_NM = programGroup.GROUP_NAME;
                    }

                    list.ListData.Add(new T_NEWS_PRG { PRG_CD = item.PRG_CD, PRG_NM = item.PRG_NM });
                }
            }
            else
            {
                var listModel = new BroadService.NewsProgramServiceClient().GetAllProgramList(
                    condition.ProgramNameTermStart, condition.ProgramNameTermEnd, condition.Year
                    , condition.CurrentIndex + 1, condition.CurrentIndex + condition.PageSize);

                foreach (var item in listModel)
                {
                    list.TotalDataCount = item.total.Value;

                    var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                    if (programGroup != null)
                    {
                        item.PRG_NM = programGroup.GROUP_NAME;
                    }

                    list.ListData.Add(new T_NEWS_PRG { PRG_CD = item.PRG_CD, PRG_NM = item.PRG_NM });
                }
            }


            if (String.IsNullOrEmpty(condition.ProgramName) == false)
            {
                list.ListData = list.ListData.Where(a => a.PRG_NM.Contains(condition.ProgramName)).ToList();
            }

            return View(list);
        }
    }
}