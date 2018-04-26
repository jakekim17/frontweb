using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWeb.Models;
using Wow.Tv.Middle.Model.Common;

namespace Wow.Tv.FrontWeb
{
    public class LoginHandler
    {
        public static void SetCurrentLoginUser(LoginUserInfo userInfo)
        {
            HttpContext.Current.Session["CurrentLoginUser"] = userInfo;
        }

        public static void DisposeCurrentLoginUser()
        {
            HttpContext.Current.Session["CurrentLoginUser"] = null;
        }

        public static LoginUserInfo CurrentLoginUser
        {
            get
            {
                LoginUserInfo loginUser = null;

                if (HttpContext.Current.Session["CurrentLoginUser"] != null)
                {
                    loginUser = (LoginUserInfo)HttpContext.Current.Session["CurrentLoginUser"];
                }

                return loginUser;
            }
            set
            {
                HttpContext.Current.Session["CurrentLoginUser"] = value;
            }
        }

        public static LoginUserInfo CurrentEasyLoginUser
        {
            get
            {
                LoginUserInfo loginUser = null;

                if (HttpContext.Current.Session["CurrentEasyLoginUser"] != null)
                {
                    loginUser = (LoginUserInfo)HttpContext.Current.Session["CurrentEasyLoginUser"];
                }

                return loginUser;
            }
            set
            {
                HttpContext.Current.Session["CurrentEasyLoginUser"] = value;
            }
        }



        /// <summary>
        /// 정식 로그인 여부
        /// </summary>
        public static bool IsLogin { get { if (HttpContext.Current.Session["CurrentLoginUser"] != null) { return true; } else { return false; } } }

        /// <summary>
        /// 간편로그인 여부
        /// </summary>
        public static bool IsEasyLogin { get { if (HttpContext.Current.Session["CurrentEasyLoginUser"] != null) { return true; } else { return false; } } }


        public static RedirectResult RedirectToLogin(string returnUrl = null)
        {
            string loginUrl = System.Configuration.ConfigurationManager.AppSettings["UserLoginUrl"];
            string encodedReturnUrl = "";
            if (string.IsNullOrEmpty(returnUrl) == true)
            {
                encodedReturnUrl = HttpUtility.UrlEncode(HttpContext.Current.Request.Url.AbsoluteUri);
            }
            else
            {
                encodedReturnUrl = HttpUtility.UrlEncode(returnUrl);
            }

            string retval = loginUrl + "?returnurl=" + encodedReturnUrl;
            RedirectResult redirect = new RedirectResult(retval);
            return redirect;
        }

        public static void EasyLogin(LoginUserInfo userInfo)
        {
            HttpContext.Current.Session["CurrentEasyLoginUser"] = userInfo;
        }
    }

    //public class LoginHandler
    //{
    //    public static LoginUser CurrentLoginUser
    //    {
    //        get
    //        {
    //            LoginUser loginUser = null;

    //            if (HttpContext.Current.Session["LoginInfo"] != null)
    //            {
    //                loginUser = (LoginUser)HttpContext.Current.Session["LoginInfo"];
    //            }

    //            return loginUser;
    //        }
    //        set
    //        {
    //            HttpContext.Current.Session["LoginInfo"] = value;
    //        }
    //    }

    //    public static bool IsLogin
    //    {
    //        get
    //        {
    //            return HttpContext.Current.Session["LoginInfo"] != null ? true : false;
    //        }
    //    }
    //}
}