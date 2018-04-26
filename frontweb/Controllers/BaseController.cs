using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb
{
    //[WOWHandleException]
    public class BaseController : Controller
    {
        protected string ClientIp
        {
            get
            {
                string ip = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(ip))
                {
                    ip = Request.ServerVariables["REMOTE_ADDR"];
                }

                return ip;
            }
        }
    }
}