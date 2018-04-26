using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Menu;
using Wow.Tv.Middle.Model.Db49.broadcast.MyProgram;
using Wow.Tv.Middle.Model.Db90.DNRS;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class ProgramIntroController : Controller
    {
        // GET: Broad/ProgramIntro
        //[OutputCache(Duration = 10 * 60)]
        public ActionResult Index(string programCode)
        {
            #region 프로그램 소개 기본정보

            var model = new ProgramIntroService.ProgramIntroServiceClient().GetAt(programCode);
            
            if(model == null)
            {
                model = new NTB_PROGRAM_INTRO();
            }
            if (model.AttachFile == null)
            {
                model.AttachFile = new NTB_ATTACH_FILE();
            }

            #endregion


            #region 프로그램 정보

            T_NEWS_PRG newsProgram = new BroadService.NewsProgramServiceClient().GetAt(programCode);
            ViewBag.NewsProgram = newsProgram;

            #endregion


            #region 출연진 조회

            CastCondition castCondition = new CastCondition();
            castCondition.ProgramCode = programCode;
            List<CastService.ProgramCastModel> castList = new CastService.CastServiceClient().SearchList(castCondition).ListData;
            ViewBag.CastList = castList;


            #endregion



            return View(model);
        }
    }
}