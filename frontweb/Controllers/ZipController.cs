using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;
using System.Net;

using Wow.Tv.Middle.Model.Db89.wowbill;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class ZipController : Controller
    {
        // GET: Zip
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchRoad(string roadName)
        {
            string searchKeyword = roadName;

            System.Xml.XmlNodeList addressList = null;
            string dataReceived = "N";
            string returnMessage = "";
            string successYN = "";
            string returnCode = "";
            string errMsg = "";
            List<AddressSearchResult> addressListResult = new List<AddressSearchResult>();

            if (string.IsNullOrEmpty(searchKeyword) == false)
            {
                string serviceKey = "LKaP9WD4jVbGU%2F9P6prKd7nckx%2F50CgqZdaz9FB%2FDvRyvXNg6I8iplBJqk72McrPrVRfahcs%2BN6y%2F0I0YsmXwA%3D%3D";
                string url = "http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdService/retrieveNewAdressAreaCdService/getNewAddressListAreaCd";
                string data = "?searchSe=road&srchwrd=" + searchKeyword + "&serviceKey=" + serviceKey;
                string contents = "";

                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url + data);
                req.Method = "GET";
                req.Headers.Add("Accept-Language", "UTF-8");

                HttpStatusCode statusCode = HttpStatusCode.NotImplemented;
                string statusDescription = "";
                using (HttpWebResponse res = (HttpWebResponse)req.GetResponse())
                {
                    statusCode = ((HttpWebResponse)res).StatusCode;
                    statusDescription = ((HttpWebResponse)res).StatusDescription;
                    if (statusCode == HttpStatusCode.OK)
                    {
                        Stream dataStream = res.GetResponseStream();
                        StreamReader reader = new StreamReader(dataStream, System.Text.Encoding.GetEncoding("UTF-8"), true);
                        contents = reader.ReadToEnd();

                        dataReceived = "Y";
                    }
                    else
                    {
                        returnMessage = statusDescription;
                    }
                }

                if (dataReceived == "Y")
                {
                    System.Xml.XmlDocument xmldoc = new System.Xml.XmlDocument();
                    xmldoc.LoadXml(contents);
                    successYN = xmldoc.DocumentElement.SelectSingleNode("//successYN").InnerText;
                    returnCode = xmldoc.DocumentElement.SelectSingleNode("//returnCode").InnerText;
                    errMsg = xmldoc.DocumentElement.SelectSingleNode("//errMsg").InnerText;

                    if (successYN == "Y")
                    {
                        addressList = xmldoc.DocumentElement.SelectNodes("//newAddressListAreaCd");
                    }

                    foreach (System.Xml.XmlNode item in addressList)
                    {
                        AddressSearchResult resultItem = new AddressSearchResult();
                        resultItem.ZipCode = item["zipNo"].InnerText;
                        resultItem.Address1 = item["lnmAdres"].InnerText; // 지번주소 노드명: rnAdres
                        addressListResult.Add(resultItem);
                    }
                    
                }
            }

            return View(addressListResult);
        }

        public ActionResult SearchDong(string dongName)
        {
            string searchKeyword = dongName;

            List<AddressSearchResult> addressListResult = new List<AddressSearchResult>();

            if (string.IsNullOrEmpty(searchKeyword) == false)
            {
                tblPost[] addressList = new MemberJoinService.JoinServiceClient().GetAddress(searchKeyword);

                foreach (tblPost item in addressList)
                {
                    AddressSearchResult resultItem = new AddressSearchResult();
                    resultItem.ZipCode = item.zipcode;
                    string sido = string.IsNullOrEmpty(item.sido) == true ? "" : item.sido;
                    string gugun = string.IsNullOrEmpty(item.gugun) == true ? "" : item.gugun;
                    string dong = string.IsNullOrEmpty(item.dong) == true ? "" : item.dong;
                    string bungi = string.IsNullOrEmpty(item.bungi) == true ? "" : item.bungi;
                    resultItem.Address1 = sido + " " + gugun + " " + dong + " " + bungi;
                    addressListResult.Add(resultItem);
                }
            }

            return View(addressListResult);
        }
    }
}