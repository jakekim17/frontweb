using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.Finance.Models;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Controllers
{
    public class MarketController : Controller
    {
        // GET: Finance/Market
        public ActionResult ExchangeDetail()
        {
            MarketExchangeDetailModel marketExchangeDetailModel = new MarketExchangeDetailModel
            {
                MarketBankExchangeList = new FinanceService.FinanceServiceClient().GetMarketIndexBankExchangeList(),
                MarketWorldExchangeList = new FinanceService.FinanceServiceClient().GetMarketIndexWorldExchangeList()
            };
            return View(marketExchangeDetailModel);
        }
    }
}