using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock;
namespace Wow.Tv.FrontWeb.Areas.Finance.Models
{
    public class USAADRDowJonesModel
    {
        public ListModel<usp_web_usa_adr_dawo_semiconductor_Result> SemiconductorList { get; set; }
        public ListModel<usp_web_usa_adr_dawo_media_Result> MediaList { get; set; }
        public ListModel<usp_web_usa_adr_dawo_insurance_Result> InsuranceList { get; set; }
        public ListModel<usp_web_usa_adr_dawo_retail_Result> RetailList { get; set; }
        public ListModel<usp_web_usa_adr_dawo_energy_Result> EnergyList { get; set; }
        public ListModel<usp_web_usa_adr_dawo_pharmacy_Result> PharmacyList { get; set; }
    }
}