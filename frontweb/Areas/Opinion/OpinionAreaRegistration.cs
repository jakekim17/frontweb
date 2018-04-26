using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.Opinion
{
    public class OpinionAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Opinion";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Opinion_default",
                "Opinion/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}