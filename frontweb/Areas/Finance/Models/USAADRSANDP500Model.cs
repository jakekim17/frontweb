using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;

namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class USAADRSANDP500Model
    {
        public ListModel<usp_web_usa_adr_sandp500_internet_Result> Internet { get; set; }
    }
}