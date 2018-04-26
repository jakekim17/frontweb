using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.TotalSearch
{
    public class TotalSearchAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "TotalSearch";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "TotalSearch_default",
                "TotalSearch/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}