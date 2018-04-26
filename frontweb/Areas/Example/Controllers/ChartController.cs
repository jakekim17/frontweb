using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class ChartController : Controller
    {
        // GET: Example/IR
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetList()
        {
            var list = new IRService.IRServiceClient().GetList();
            return Json(list);
        }

        public ActionResult CandleChart()
        {
            return View();
        }
    }
}