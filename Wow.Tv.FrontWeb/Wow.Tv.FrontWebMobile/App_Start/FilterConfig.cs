using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWebMobile
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
