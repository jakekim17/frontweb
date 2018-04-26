using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;

namespace Wow.Tv.FrontWebMobile.Areas.Finance.Models
{
    public class USAADRNasdaqModel
    {
        public ListModel<usp_web_usa_adr_nasdaq_internet_Result> Internet { get; set; }
        public ListModel<usp_web_usa_adr_nasdaq_network_Result> Network { get; set; }
        public ListModel<usp_web_usa_adr_nasdaq_comunications_Result> Comunication { get; set; }
        public ListModel<usp_web_usa_adr_nasdaq_computer_Result> Computer { get; set; }
        public ListModel<usp_web_usa_adr_nasdaq_semiconductor_Result> Semiconductor { get; set; }
        public ListModel<usp_web_usa_adr_nasdaq_bio_Result> Bio { get; set; }
    }
}