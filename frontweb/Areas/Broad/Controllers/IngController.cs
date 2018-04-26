using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class IngController : BaseController
    {
        // GET: Broad/Ing
        public ActionResult Index()
        {
            return View();
        }



#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult SearchPartial(string broadTypeCode, string broadSectionCode, string fameYn, string ingYn)
        {
            NewsProgramCondition condition = new NewsProgramCondition();
            condition.PageSize = -1;
            condition.PublishYn = "Y";
            condition.BroadTypeCode = broadTypeCode;
            condition.BroadSectionCode = broadSectionCode;
            condition.IngYn = ingYn;
            condition.FameYn = fameYn;

            var list = new BroadService.NewsProgramServiceClient().SearchList(condition);

            foreach (var item in list.ListData)
            {
                var programGroup = new BroadService.ProgramGroupServiceClient().GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }

            ViewBag.Condition = condition;

            return View(list.ListData);
        }


#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult SearchListPartial(BroadWatchCondition condition)
        {
            condition.PublishYn = "Y";

            ListModel<tv_program> listModel = new ListModel<tv_program>();
            if (String.IsNullOrEmpty(condition.ProgramCode) && String.IsNullOrEmpty(condition.ProgramName))
            {
                listModel = new BroadWatchService.BroadWatchServiceClient().SearchList2(condition);
            }
            else
            {
                listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);
            }

            return View(listModel);
            //return View();
        }
    }
}


