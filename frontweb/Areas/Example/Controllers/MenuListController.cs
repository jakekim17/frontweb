using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Controllers;
using Wow.Tv.FrontWeb.MenuService;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class MenuListController : BaseController
    {
        // GET: Example/MenuList
        public ActionResult Index()
        {
            MenuService.MenuServiceClient menuService = new MenuServiceClient();


            Dictionary<string, int?> menuList = menuService.GetMenuList();



            return View( menuList );
        }
    }
}