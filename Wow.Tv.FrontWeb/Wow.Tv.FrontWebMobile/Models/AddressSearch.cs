﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wow.Tv.FrontWebMobile.Models
{
    [Serializable]
    public class AddressSearchResult
    {
        public string ZipCode { get; set; }
        public string Address1 { get; set; }
    }
}