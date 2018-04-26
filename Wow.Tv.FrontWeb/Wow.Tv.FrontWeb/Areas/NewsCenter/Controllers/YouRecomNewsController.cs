using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Net;
using System.IO;
using System.Web.Script.Serialization;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class YouRecomNewsController : Controller
    {
        // GET: NewsCenter/YouRecomNews
        public ActionResult Index()
        {
            List<string> keyWordList = GetKeyWord();
            string newsListTag = GetNewsListTag(keyWordList);

            ViewBag.KeyWordList = keyWordList;
            ViewBag.NewsListTag = newsListTag;

            return View();
        }



        [NonAction]
        public List<string> GetKeyWord()
        {
            List<string> keyWordList = new List<string>();

            string prevDateString = DateTime.Now.AddDays(-14).ToString("yyyyMMdd") + "000000";
            string nowDateString = DateTime.Now.ToString("yyyyMMdd") + "235959";
            string queryString = "";

            queryString += "{";
            queryString += "\"querySet\":{";
            queryString += "\"version\":42,";
            queryString += "\"query\":[{";
            queryString += "\"whereSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"SEARCHALL(HASALL|'all'|0)\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"selectSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTID(NONE)\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"orderBySet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTDATE(ASC|POSTWEIGHT)\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"filterSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"groupBySet\": {";
            queryString += "\"fields\": [";
            queryString += "\"KEYWORDS(COUNT;ORDER_COUNT|'DESC 0 30')\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"fromSet\": {";
            queryString += "\"collection\": \"WOWNEWS_2017\",";
            queryString += "\"result\": [0, 29]";
            queryString += "},";
            queryString += "\"useCache\": true,";                                        //캐시 사용 옵션
            queryString += "\"debugOption\": {";
            queryString += "\"printQuery\": false,";
            queryString += "\"debug\": false,";
            queryString += "\"faultless\": false";
            queryString += "}";
            queryString += "}]";
            queryString += "}";
            queryString += "}";


            //string uri = "http://search.wowtv.co.kr/collections/search";
            //System.Net.WebClient webClient = new System.Net.WebClient();
            //webClient.Headers[System.Net.HttpRequestHeader.ContentType] = "application/json; charset=UTF-8";
            //webClient.Encoding = System.Text.UTF8Encoding.UTF8;
            //webClient.Headers.Add(HttpRequestHeader.ContentLength, queryString.Length.ToString());
            ////webClient.Headers.Add("Origin", "http://www.wowtv.co.kr");
            ////webClient.Headers[System.Net.HttpRequestHeader.UserAgent] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";
            //string responseJSON = webClient.UploadString(uri, queryString);




            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://search.wowtv.co.kr/collections/search");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            //httpWebRequest.Connection = "keep-alive";
            httpWebRequest.ServicePoint.Expect100Continue = false;
            httpWebRequest.ContentLength = queryString.Length;
            httpWebRequest.Accept = "application/json, text/javascript, */*; q=0.01";
            httpWebRequest.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(queryString);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseJSON = streamReader.ReadToEnd();
                Newtonsoft.Json.Linq.JObject obj = Newtonsoft.Json.Linq.JObject.Parse(responseJSON);
                Newtonsoft.Json.Linq.JObject resultSet = Newtonsoft.Json.Linq.JObject.Parse(obj["resultSet"].ToString());
                Newtonsoft.Json.Linq.JArray result = Newtonsoft.Json.Linq.JArray.Parse(resultSet["result"].ToString());
                Newtonsoft.Json.Linq.JArray groupResult = Newtonsoft.Json.Linq.JArray.Parse(result[0]["groupResult"].ToString());
                Newtonsoft.Json.Linq.JArray ids = Newtonsoft.Json.Linq.JArray.Parse(groupResult[0]["ids"].ToString());
                List<string> keyWordAllList = (List<string>)ids.ToObject(typeof(List<string>));

                Random random = new Random();

                for (int i = 0; i < 7; i++)
                {
                    if (keyWordAllList.Count > 0)
                    {
                        int randomIndex = random.Next(0, keyWordAllList.Count - 1);
                        string keyWordItem = keyWordAllList[randomIndex];
                        keyWordAllList.RemoveAt(randomIndex);

                        keyWordList.Add(keyWordItem);
                    }
                }
            }

            return keyWordList;
        }


        [NonAction]
        public string GetNewsListTag(List<string> keyWordList)
        {
            string newsListTag = "";

            string startIndex = "0";
            string endIndex = "9";
            string prevDateString = DateTime.Now.AddDays(-14).ToString("yyyyMMdd") + "000000";
            string nowDateString = DateTime.Now.ToString("yyyyMMdd") + "235959";
            string queryString = "";


            queryString += "{";
            queryString += "\"querySet\":{";
            queryString += "\"version\":42,";
            queryString += "\"query\":[{";
            queryString += "\"whereSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"BRACE_OPEN\",";
            //queryString += "                        \"KEYWORDS(HASALL|'aaa';'bbb';'ccc'|200;200;200)\",		";
            queryString += "\"KEYWORDS(HASANY|";

            string tempString = "";
            foreach (string str in keyWordList)
            {
                tempString += "'" + str + "';";
            }
            tempString = tempString.Substring(0, tempString.Length - 1);
            queryString += tempString;

            queryString += "|";

            tempString = "";
            foreach (string str in keyWordList)
            { 
                tempString += "200;";
            }
            tempString = tempString.Substring(0, tempString.Length - 1);
            queryString += tempString;

            queryString += ")\",";

            queryString += "\"OR\",";
            //queryString += "                        \"TAG(HASALL|'aaa';'bbb';'ccc'|200;200;200)\",			";
            queryString += "\"TAG(HASANY|";

            tempString = "";
            foreach (string str in keyWordList)
            {
                tempString += "'" + str + "';";
            }
            tempString = tempString.Substring(0, tempString.Length - 1);
            queryString += tempString;

            queryString += "|";

            tempString = "";
            foreach (string str in keyWordList)
            {
                tempString += "200;";
            }
            tempString = tempString.Substring(0, tempString.Length - 1);
            queryString += tempString;

            queryString += ")\",";

            queryString += "\"BRACE_CLOSE\"";
            queryString += "]";
            queryString += "}, ";
            queryString += "\"selectSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTID(NONE)\", \"COMPCODE(NONE)\", \"COMP_NAME(NONE)\", \"TITLE(NONE)\", \"CONTENT(NONE)\", \"ARTDATE(NONE)\",";
            queryString += "\"DEPTNM(NONE)\", \"IMGDIR(NONE)\", \"KEYWORDS(NONE)\", \"TAG(NONE)\", \"THUMBNAIL_TYPE1(NONE)\", \"USERNM(NONE)\",";
            queryString += "\"LIST_YN(NONE)\", \"RANK(NONE)\", \"WOWNET_YN(NONE)\",";
            queryString += "\"THUMBNAIL_FILENM(NONE)\", \"VOD_NUM(NONE)\", \"IMGDIR(NONE)\", \"GUBUN_NAME(NONE)\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"orderBySet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTDATE(ASC|POSTWEIGHT)\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"filterSet\": {";
            queryString += "\"fields\": [";
            queryString += "\"ARTDATE(RANGE|'" + prevDateString + "';'" + nowDateString + "')\"";
            queryString += "]";
            queryString += "},";
            queryString += "\"fromSet\": {";
            queryString += "\"collection\": \"WOWNEWS_2017\",";
            queryString += "\"result\": [" + startIndex + ", " + endIndex + "]";
            queryString += "},";
            queryString += "\"useCache\": true,";                                        //캐시 사용 옵션
            queryString += "\"debugOption\": {";
            queryString += "\"printQuery\": false,";
            queryString += "\"debug\": false,";
            queryString += "\"faultless\": false";
            queryString += "}";
            queryString += "}]";
            queryString += "}";
            queryString += "}";

            byte[] byteArray = System.Text.Encoding.UTF8.GetBytes(queryString);

            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://search.wowtv.co.kr/collections/search");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            //httpWebRequest.Connection = "keep-alive";
            httpWebRequest.ServicePoint.Expect100Continue = false;
            httpWebRequest.ContentLength = byteArray.Length;
            httpWebRequest.Accept = "application/json, text/javascript, */*; q=0.01";
            httpWebRequest.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(queryString);
                //streamWriter.Write(byteArray, 0, byteArray.Length);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseJSON = streamReader.ReadToEnd();
                Newtonsoft.Json.Linq.JObject obj = Newtonsoft.Json.Linq.JObject.Parse(responseJSON);
                Newtonsoft.Json.Linq.JObject resultSet = Newtonsoft.Json.Linq.JObject.Parse(obj["resultSet"].ToString());
                Newtonsoft.Json.Linq.JArray result = Newtonsoft.Json.Linq.JArray.Parse(resultSet["result"].ToString());
                Newtonsoft.Json.Linq.JArray resultDocuments = Newtonsoft.Json.Linq.JArray.Parse(result[0]["resultDocuments"].ToString());
                foreach(var newsDataItem in resultDocuments)
                {
                    NewsImageInfo newsImageInfo = GetNewsImageUrl("16M", newsDataItem["THUMBNAIL_FILENM"].ToString(), newsDataItem["VOD_NUM"].ToString()
                        , newsDataItem["IMGDIR"].ToString(), newsDataItem["THUMBNAIL_TYPE1"].ToString(), newsDataItem["ARTDATE"].ToString()
                        , newsDataItem["GUBUN_NAME"].ToString());

                    newsListTag += "<li class=\"news-type2\">";
                    newsListTag += "    <a href=\"javascript:void(0)\" onclick=\"return NewsCommon.GoNewsRead('" + newsDataItem["ARTID"].ToString() + "');\">";
                    newsListTag += "        <div>";
                    newsListTag += "            <img src=\"" + newsImageInfo.Href + "\" onerror=\"this.src='" + newsImageInfo.ErrorHref + "'\" alt=\"\">";
                    if (newsDataItem["VOD_NUM"].ToString() != null && newsDataItem["VOD_NUM"].ToString() != "" && newsDataItem["VOD_NUM"].ToString() != "0")
                    {
                        newsListTag += "            <span class=\"icon-play medium\"></span>=\"\">";
                    }
                    newsListTag += "        </div>";
                    newsListTag += "        <strong>";
                    newsListTag += newsImageInfo.GubunIcon;
                    newsListTag += newsDataItem["TITLE"].ToString();
                    newsListTag += "        </strong>";
                    newsListTag += "    </a>";
                    newsListTag += "</li>";
                }
            }

            return newsListTag;
        }



        public NewsImageInfo GetNewsImageUrl(string thumbnailType, string thumbnailFile, string vodNumNull, string imageDir, string imagFile, string artDateNull, string gubunName)
        {
            int? vodNum = null;
            DateTime? artDate = null;

            if(String.IsNullOrEmpty(vodNumNull) == false)
            {
                try
                {
                    vodNum = int.Parse(vodNumNull);
                }
                catch (Exception ex) { }
            }
            if (String.IsNullOrEmpty(artDateNull) == false)
            {
                try
                {
                    artDate = DateTime.Parse(artDateNull);
                }
                catch (Exception ex) { }
            }




            NewsImageInfo newsImageInfo = new NewsImageInfo();

            if (artDate == null)
            {
                artDate = DateTime.Now;
            }
            newsImageInfo.Href = Wow.WowExtensionMethod.NewsThumbnailPath(thumbnailType, thumbnailFile, vodNum, imageDir, imagFile, artDate.Value);
            newsImageInfo.ErrorHref = Wow.WowExtensionMethod.NewsThumbnailOnError(thumbnailType);
            newsImageInfo.GubunIcon = WowExtensionMethod.NewsGugunIcon(gubunName, "S");

            return newsImageInfo;
        }


        public class NewsImageInfo
        {
            public string Href { get; set; }
            public string ErrorHref { get; set; }
            public string GubunIcon { get; set; }
        }
    }
}