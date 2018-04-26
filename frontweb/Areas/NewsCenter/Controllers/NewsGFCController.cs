using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsGFCService;
using Wow.Tv.Middle.Model.Db49.Article;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class NewsGFCController : Controller
    {
        // GET: NewsCenter/NewsGFC
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NewsGFCXml(string searchYear)
        {
            //뉴스 리스트
            var NewsGFCList = new NewsGFCServiceClient().NewsGFCList(searchYear).ListData;

			//WebClient Html URL Check(http://www.wowtv.co.kr/NewsCenter/NewsGFC/NewsGFCXML?searchYear=2017)
			try
			{
                using (var webClient = new WebClient())
                {
                    webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                }
            }
            catch (Exception e)
            {
                Wow.Fx.WowLog.Write(e.Message);
            }

            XDocument xDoc = new XDocument();
            XElement channel = new XElement("channel");

            foreach (var newsGFC in NewsGFCList)
            {
                string titleText = newsGFC.title.Replace("<", "&lt;").Replace(">", "&gt;");
                channel.Add(new XElement("item"
                                        , new XElement("idx", newsGFC.idx.ToString())
                                        , new XElement("compcode", newsGFC.compcode)
                                        , new XElement("articleid", newsGFC.articleid)
                                        , new XElement("title", titleText)
                                        , new XElement("body", newsGFC.body)
                                        , new XElement("articledate", newsGFC.articledate)
                                        , new XElement("thumbnail_type1", new XCData(newsGFC.thumbnail_type1))
                                        , new XElement("thumbnail_type2", new XCData(newsGFC.thumbnail_type2))
                                        , new XElement("imgdir", new XCData(newsGFC.imgdir))
                                    ));

            }

            xDoc.Add(channel);

            return new XmlActionResult(xDoc);
        }
		

		public ActionResult NewsGFCViewXml(string artid)
		{
			//뉴스 리스트
			var NewsGFCViewXml = new NewsGFCServiceClient().NewsGFCView(artid);

			//뉴스 뷰
			//	var NewsGFCViewXml = new NewsGFCServiceClient().NewsGFCView(artid).ListData;

			
			//var  NewsGFCView = new NewsGFCServiceClient().NewsGFCView(artid).ListData;
			

			//WebClient Html URL Check(http://www.wowtv.co.kr/NewsCenter/NewsGFC/NewsGFCViewXML?artid=A201711300402)
			try
			{
				using (var webClient = new WebClient())
				{
					webClient.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
				}
			}
			catch (Exception e)
			{
				Wow.Fx.WowLog.Write(e.Message);
			}


			XDocument xDoc = new XDocument();
			XElement channel = new XElement("channel");

            if(NewsGFCViewXml != null)
            {
                string titleText = NewsGFCViewXml.ARTTITLE.Replace("<", "&lt;").Replace(">", "&gt;");
                channel.Add(new XElement("item"
                                        , new XElement("artid", NewsGFCViewXml.ARTID)
                                        , new XElement("arttitle", titleText)
                                        , new XElement("arttext", NewsGFCViewXml.ARTTEXT)
                                        , new XElement("deskdate", NewsGFCViewXml.DESKDATE)
                                    ));

                
            }
            xDoc.Add(channel);
            return new XmlActionResult(xDoc);
		}

		/*
		*/
		public void sendEmailGFC(string email, string year, string language)
		{
			
			if (!string.IsNullOrEmpty(email))
			{
				new NewsGFCService.NewsGFCServiceClient().sendEmailGFC(email, year, language);

			}
				
		}
	}
}

public sealed class XmlActionResult : ActionResult
{
    private readonly XDocument _document;

    public Formatting Formatting { get; set; }
    public string MimeType { get; set; }

    public XmlActionResult(XDocument document)
    {
        if (document == null)
            throw new ArgumentNullException("document");

        _document = document;

        // Default values
        MimeType = "text/xml";
        Formatting = Formatting.None;
    }

    public override void ExecuteResult(ControllerContext context)
    {
        context.HttpContext.Response.Clear();
        context.HttpContext.Response.ContentType = MimeType;

        using (var writer = new XmlTextWriter(context.HttpContext.Response.OutputStream, Encoding.UTF8) { Formatting = Formatting })
            _document.WriteTo(writer);
    }
}