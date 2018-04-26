using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWebMobile.App_Start
{
    public class WowTvFrontAuthorizeAttribute : AuthorizeAttribute
    {
        public bool IsLogin { get; set; } = false;

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool isSuccess = false;

            if (IsLogin == true)
            {
                isSuccess = HttpContext.Current.Session["CurrentLoginUser"] != null;
            }

            return isSuccess;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            UrlHelper urlHelper = new UrlHelper(filterContext.RequestContext);
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                JsonResult result = new JsonResult();
                result.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

                string msg = "";
                if (HttpContext.Current.Session["CurrentLoginUser"] == null)
                {
                    msg = "로그인이 필요합니다.";
                    filterContext.HttpContext.Response.StatusCode = 401;
                }
                else
                {
                    msg = "권한이 없습니다.";
                    filterContext.HttpContext.Response.StatusCode = 403;
                }

                JsonResult jRe = new JsonResult { Data = new { Msg = msg, IsSuccess = false }, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                filterContext.Result = jRe;
            }
            else
            {
                if (HttpContext.Current.Session["CurrentLoginUser"] == null)
                {
                    string userLoginUrl = System.Configuration.ConfigurationManager.AppSettings["UserLoginUrl"];
                    var re = new ContentResult();
                    re.Content = "<script>alert(\"로그인이 필요한 페이지 입니다.\");location.href=\"" + userLoginUrl + "?returnurl=" + filterContext.HttpContext.Server.UrlEncode(filterContext.HttpContext.Request.Url.AbsoluteUri) + "\";</script>";
                    filterContext.Result = re;
                    //string userLoginUrl = System.Configuration.ConfigurationManager.AppSettings["UserLoginUrl"];
                    //filterContext.Result = new RedirectResult(userLoginUrl + "?returl=" + filterContext.HttpContext.Server.UrlEncode(filterContext.HttpContext.Request.Url.AbsoluteUri));
                    //filterContext.Result = new RedirectResult("/Login/Index?returl=" + filterContext.HttpContext.Server.UrlEncode(filterContext.HttpContext.Request.Url.PathAndQuery));
                }
                else
                {
                    //filterContext.Result = new RedirectResult("/Home/Index");
                    var re = new ContentResult();
                    string homeUrl = System.Configuration.ConfigurationManager.AppSettings["WowTvWebSiteUrl"];
                    re.Content = "<script>alert('권한이 없습니다.');location.href='" + homeUrl + "';</script>";
                    filterContext.Result = re;
                }
            }
        }
    }
}