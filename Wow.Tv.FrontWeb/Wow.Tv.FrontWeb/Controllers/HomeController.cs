using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;
using Wow.Tv.FrontWeb.MyActiveService;
using Wow.Tv.FrontWeb.App_Start;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wownet.Lecture;
using Wow.Tv.FrontWeb.TextAndLinkService;
using Wow.Tv.Middle.Model.Db22.stock;
using System.Collections.Specialized;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class HomeController : Controller
    {

        #region 공통부분
#if DEBUG
#else
        //[OutputCache(Duration = 30 * 60)]
#endif
        public ActionResult _TopMenu(string menuSeq)
        {
            return View();
        }

        [OutputCache(Duration = 30 * 60)]
        public ActionResult _LeftMenu(string menuSeq)
        {
            return View();
        }

        [OutputCache(Duration = 30 * 60)]
        public ActionResult _PageLocation(string menuSeq)
        {
            return View();
        }



#if DEBUG
#else
        //[OutputCache(Duration = 30 * 60)]
#endif
        public ActionResult _topBanner()
        {
            var model = new MainManageService.MainManageServiceClient().GetFrontList("MainTop");

            return View(model);
        }


        [OutputCache(Duration = 30 * 60)]
        public ActionResult _SiteMap()
        {
            var model = new MainManageService.MainManageServiceClient().GetFrontList("MainAll");

            return View(model);
        }

        [OutputCache(Duration = 30 * 60)]
        public ActionResult _Hot()
        {
            List<DumyModel> model = new List<DumyModel>();
            model = new BroadService.NewsProgramServiceClient().TickerList().ToList();

            return View(model);
        }

        /// <summary>
        /// 가상화페
        /// </summary>
        /// <returns></returns>
        public ActionResult _VirtualMoney()
        {
            List<usp_web_getVirtualMoney_Result> model = new List<usp_web_getVirtualMoney_Result>();

            model = new FinanceService.FinanceServiceClient().GetVirtualMoney().ToList();

            return View(model);
        }

        public JsonResult VirtualMoney()
        {
            List<usp_web_getVirtualMoney_Result> VirtualMoneyList = new List<usp_web_getVirtualMoney_Result>();

            var model = new FinanceService.FinanceServiceClient().GetVirtualMoney().ToList();

            return Json(new { VirtualMoneyList = model }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HeaderAjax()
        {
            return View();
        }

#endregion

        public ActionResult Index()
        {

            #region == http://news.wowtv.co.kr ==> 뉴스 메인으로..

            Uri referUri       = Request.UrlReferrer;
            string referUrl    = string.Empty;
            string urlHost     = Request.Url.Host;
            string pathAndQuery = string.Empty;

            if (referUri != null)
            {
                referUrl = Request.UrlReferrer.ToString();
                pathAndQuery = referUri.PathAndQuery;
            }

            if (string.IsNullOrEmpty(urlHost))
            {
                // Load ServerVariable collection into NameValueCollection object.
                NameValueCollection coll = Request.ServerVariables;
                // Get names of all keys into a string array. 
                String[] collArr = coll.AllKeys;
                int loopOne, loopTwo;
                for (loopOne = 0; loopOne < collArr.Length; loopOne++)
                {
                    if (collArr[loopOne].Equals("HTTP_HOST"))
                    {
                        String[] arr = coll.GetValues(collArr[loopOne]);
                        for (loopTwo = 0; loopTwo < arr.Length; loopTwo++)
                        {
                            urlHost = Server.HtmlEncode(arr[loopTwo]);
                        }
                        break;
                    }
                }
            }
            Wow.Fx.WowLog.Write("urlHost : " + urlHost);
#if DEBUG
#else
            if(string.IsNullOrEmpty(referUrl) && urlHost.ToLower().Equals("news.wowtv.co.kr") && string.IsNullOrEmpty(pathAndQuery))
            {
                Response.Redirect("/NewsCenter/Main/");
                Response.End();
            }
#endif
            #endregion

            DateTime nowDate = DateTime.Now;
            string nowTime = nowDate.ToString("HH:mm");

            var runDownList = new BroadService.NewsProgramServiceClient().SearchListRunDown(nowDate.ToString("yyyy-MM-dd")).ToList();
            runDownList = runDownList.Where(a => a.RUN_END.CompareTo(nowTime) >= 0).ToList();
            runDownList = runDownList.OrderBy(a => a.RUN_START).Take(3).ToList();
            
            while (runDownList.Count < 3)
            {
                runDownList.Add(new Middle.Model.Db90.DNRS.T_RUNDOWN() { RUN_START = "", PRG_NM = "" });
            }

            return View(runDownList);
        }


#region 상단부분
#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult Vod()
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();

            //Wow.Fx.WowLog.Write("VOD 1");

            List<DumyModel> model = new List<DumyModel>();
            DumyModel dumyModel = null;

#region 영상뉴스

            // 영상뉴스
            List<string> temp = new List<string>();
            List<NUP_NEWS_MAIN_VOD_SELECT_Result> newsData = new NewsMainService.NewsMainServiceClient().GetNewsMainVodList("VOD", 3, temp.ToArray()).ListData;

            //Wow.Fx.WowLog.Write("VOD 2");

            foreach (var item in newsData)
            {
                //Wow.Fx.WowLog.Write("VOD 3");

                dumyModel = new DumyModel();
                dumyModel.StringValue1 = item.ARTICLEID;
                dumyModel.StringValue2 = Wow.WowExtensionMethod.NewsListImage(item.VOD_NUM, item.IMAGE_DIR, item.IMAGE_FILE, item.ARTDATE);
                dumyModel.StringValue3 = item.ARTDATE.ToString("yyyy-MM-dd HH:mm");
                dumyModel.IntValue1 = 0;
                dumyModel.IntValue2 = item.VOD_NUM;

                model.Add(dumyModel);
            }

#endregion

            //Wow.Fx.WowLog.Write("VOD 4");

#region 코너영상

            // 코너영상
            ListModel<NUP_GetCornerVODList_WEB_Result> cornerList = new BroadService.NewsProgramServiceClient().GetCornerVodAll(1, 3);
            foreach (var item in cornerList.ListData)
            {
                //Wow.Fx.WowLog.Write("VOD 5");

                dumyModel = new DumyModel();
                dumyModel.StringValue1 = item.seq.ToString();
                dumyModel.StringValue2 = item.thumbUrl;
                dumyModel.StringValue3 = item.datetime;
                dumyModel.IntValue1 = 0;
                dumyModel.IntValue2 = item.seq;

                model.Add(dumyModel);
            }

#endregion

            //Wow.Fx.WowLog.Write("VOD 6");

#region 마켓

            // 마켓
            var marketList = new BroadService.NewsProgramServiceClient().GetListMarket().ToList();
            foreach (var item in marketList)
            {
                dumyModel = new DumyModel();
                dumyModel.StringValue1 = item.ARTIDX;
                dumyModel.StringValue2 = "http://vodimg.wowtv.co.kr/" + item.ROOTDIR + "/" + item.IMG;
                dumyModel.StringValue3 = (item.REGDT == null ? "" : item.REGDT.Value.ToString("yyyy-MM-dd HH:mm"));
                dumyModel.IntValue1 = 0;
                dumyModel.IntValue2 = item.VODNUM;

                model.Add(dumyModel);
            }

#endregion


            //Wow.Fx.WowLog.Write("VOD 7");

            model = model.OrderByDescending(a => a.StringValue3).Take(3).ToList();

            //Wow.Fx.WowLog.Write("VOD 8");

            while (model.Count < 3)
            {
                //Wow.Fx.WowLog.Write("VOD 9");
                model.Add(new DumyModel() { StringValue1 = "", StringValue2 = "" });
            }




            // =============================================
            // 현재시간 방송정보

            T_NEWS_PRG nowNewsProgram = null;
            List<Pro_wowList> nowProgramPartnerList = null;
            string partnerThumImage = System.Configuration.ConfigurationManager.AppSettings["WowTvStyle"] + "/images/temp/temp_main_03.jpg";

            // 현재방송프로그램 정보
            string programCode = "";
            var nowRunDown = newsProgramServiceClient.GetNowRunDown();
            if (nowRunDown != null)
            {
                programCode = nowRunDown.PRG_CD;
            }

            if (String.IsNullOrEmpty(programCode) == false)
            {
                nowNewsProgram = newsProgramServiceClient.GetAt(programCode);
                nowProgramPartnerList = newsProgramServiceClient.GetWowListPartnerList(programCode).ToList();

                // 현재방송에 파트너가 있다면
                if (nowProgramPartnerList.Count > 0)
                {
                    var programThumbnailAttachFile = newsProgramServiceClient.GetThumbnailAttachFile(programCode);
                    if (programThumbnailAttachFile != null)
                    {
                        partnerThumImage = programThumbnailAttachFile.REAL_WEB_PATH;
                    }
                }
            }
            
            ViewBag.PartnerThumImage = partnerThumImage;


            // 현재시간 방송정보
            // =============================================


            //Wow.Fx.WowLog.Write("VOD 10");

            return View(model);
        }


        [OutputCache(Duration = 10 * 60)]
        public ActionResult VodPartner()
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();

            //Wow.Fx.WowLog.Write("VodPartner 1");

            // =============================================
            // 현재시간 방송정보

            T_NEWS_PRG nowNewsProgram = null;
            List<Pro_wowList> nowProgramPartnerList = null;
            List<tv_program> broadWatchList = null;

            int count = 0;
            List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst> partnerList1 = new List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst>();
            List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst> partnerList2 = new List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst>();
            List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst> partnerList3 = new List<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst>();

            // 현재방송프로그램 정보
            string programCode = "";
            var nowRunDown = newsProgramServiceClient.GetNowRunDown();
            if (nowRunDown != null)
            {
                programCode = nowRunDown.PRG_CD;
            }
            Wow.Fx.WowLog.Write("VodPartner programCode => " + programCode);
#if DEBUG
            //programCode = "P1024";
            //programCode = "P1817";
#endif
            if (String.IsNullOrEmpty(programCode) == false)
            {
                nowNewsProgram = newsProgramServiceClient.GetAt(programCode);
                nowProgramPartnerList = newsProgramServiceClient.GetWowListPartnerList(programCode).ToList();

                BroadWatchCondition broadWatchCondition = new BroadWatchCondition();
                broadWatchCondition.ProgramCode = programCode;
                broadWatchList = new BroadWatchService.BroadWatchServiceClient().SearchList(broadWatchCondition).ListData;
                broadWatchList = broadWatchList.Take(2).ToList();
            }


            ViewBag.NowNewsProgram = nowNewsProgram;
            ViewBag.NowProgramPartnerList = nowProgramPartnerList;
            ViewBag.BroadWatchList = broadWatchList;


            // 현재시간 방송정보
            // =============================================



            //Wow.Fx.WowLog.Write("VodPartner 2");



            // =============================================
            // 와우넷 메인 파트너 정보

            Wow.Tv.FrontWeb.MyActiveService.MyActiveServiceClient myActiveService = new Wow.Tv.FrontWeb.MyActiveService.MyActiveServiceClient();
            //Wow.Fx.WowLog.Write("VodPartner 2-1");
            var netMainPartner = myActiveService.GetRecommendPartner();
            //Wow.Fx.WowLog.Write("VodPartner 2-2");
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["WowNetUrl"];
            foreach (var item in netMainPartner)
            {
                //Wow.Fx.WowLog.Write("VodPartner 2-3");
                item.HtmlTag = Wow.Fx.BroadcastFunction.GetBroadIconAndLink(uploadWebPath, item.BPLAYTYPE, item.BMEMTYPE, item.STATE, item.PRO_ID, item.BROOM, item.PRODUCT_ID_1);
                //Wow.Fx.WowLog.Write("VodPartner 2-4");
                //var temp = new BroadService.NewsProgramServiceClient().PartnerEvent(item.PRO_ID).ToList();
                List<int> partnerEventItemPriceList = new BroadService.NewsProgramServiceClient().GetPartnerEventItemPrice(item.PRO_ID).ToList();
                var temp = new NewsProgram89Service.NewsProgram89ServiceClient().GetPartnerEvent(partnerEventItemPriceList.ToArray()).ToList();
                //Wow.Fx.WowLog.Write("VodPartner 2-5");
                if (count == 0)
                {
                    //Wow.Fx.WowLog.Write("VodPartner 2-6");
                    partnerList1 = temp;
                }
                else if (count == 1)
                {
                    //Wow.Fx.WowLog.Write("VodPartner 2-7");
                    partnerList2 = temp;
                }
                else if (count == 3)
                {
                    //Wow.Fx.WowLog.Write("VodPartner 2-8");
                    partnerList3 = temp;
                }
                //Wow.Fx.WowLog.Write("VodPartner 2-9");
                count++;
            }

            //Wow.Fx.WowLog.Write("VodPartner 3");

            ViewBag.PartnerList1 = partnerList1;
            ViewBag.PartnerList2 = partnerList2;
            ViewBag.PartnerList3 = partnerList3;

            // 와우넷 메인 파트너 정보
            // =============================================

            return View(netMainPartner.ToList());
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="typeCode">최신뉴스 LATEST, 증권경제 STO_ECO, 산업.IT.과학 IND_IT, 생활문화 LIFE, 취업 JOB</param>
        /// <returns></returns>
        [OutputCache(Duration = 5 * 60)]
        public ActionResult Some(string typeCode)
        {
            List<string> temp = new List<string>();
            var list = new NewsMainService.NewsMainServiceClient().GetNewsMainSectionList(typeCode, 4, temp.ToArray());
            
            return View(list);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="typeCode">최신뉴스 LATEST, 증권경제 STO_ECO, 산업.IT.과학 IND_IT, 생활문화 LIFE, 취업 JOB</param>
        /// <returns></returns>
        [OutputCache(Duration = 5 * 60)]
        public ActionResult Some2(string typeCode)
        {
            List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> newsStandMainList = new NewsMainService.NewsMainServiceClient().GetNewsMainNewsstand().ListData.Where(p => p.RANK <= 5).ToList();

            return View(newsStandMainList);
        }




        [OutputCache(Duration = 10 * 60)]
        public ActionResult MarketIssue()
        {
            ListModel<NUP_NEWS_MAIN_MARKET_ISSUE_SELECT_Result> model = new NewsMainService.NewsMainServiceClient().GetNewsMainMarketIssueList();

            return View(model);
        }

        [OutputCache(Duration = 10 * 60)]
        public ActionResult Opinion()
        {
            ListModel<NUP_NEWS_MAIN_OPINION_SELECT_Result> model = new NewsMainService.NewsMainServiceClient().GetNewsMainOpinionList();
            
            return View(model);
        }


#endregion



#region 중단부분

        /// <summary>
        /// 쉽게보는 뉴스
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = 10 * 60)]
        public ActionResult SeeNews()
        {
            NewsMainService.NewsMainServiceClient newsMainService = new NewsMainService.NewsMainServiceClient();

            var articleIdList = new List<String>();
            ListModel<NUP_NEWS_MAIN_CARD_SELECT_Result> list1 = newsMainService.GetNewsMainCardList("CARD_LATEST", 5, articleIdList.ToArray());
            ListModel<NUP_NEWS_MAIN_VOD_SELECT_Result> list2 = newsMainService.GetNewsMainVodList("VOD", 5, articleIdList.ToArray());

            ViewBag.List1 = list1;
            ViewBag.List2 = list2;
             
            return View();
        }


        /// <summary>
        /// 이슈 겔러리
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = 10 * 60)]
        public ActionResult IssueNews()
        {
            var articleIdList = new List<String>();
            var result = new NewsMainService.NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;
            return View(result);
        }



        /// <summary>
        /// TV Live
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = 5 * 60)]
        public ActionResult TvLive()
        {
            NTB_BROAD_LIVE model = new NTB_BROAD_LIVE();
            BroadLiveCondition condition = new BroadLiveCondition();
            condition.PublishYn = "Y";
            var listModel = new BroadService.BroadLiveServiceClient().SearchListLive(condition);
            if (listModel.ListData.Count > 0)
            {
                model = listModel.ListData[0];
            }

            return View(model);
        }

#endregion

#region 하단부분

        [OutputCache(Duration = 10 * 60)]
        public ActionResult HotNews()
        {
            var articleIdList = new List<String>();
            var hotNewsList = new NewsMainService.NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 25, articleIdList.ToArray()).ListData;
            var result = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();

            if (hotNewsList != null && hotNewsList.Count > 20)
            {
                for (var i = 20; i < hotNewsList.Count; i++)
                {
                    result.Add(hotNewsList[i]);
                }
            }
            return View(result);
        }

#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult WowNetFaStar()
        {
            return View();
        }


#endregion

#region 퀵메뉴

        
        public ActionResult QuickMenu()
        {
#region 마이핀
            //뉴스 가져오기.
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            //추천 키워드
            var keyword = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("KEYWORD")).OrderByDescending(o => o.SEQ).Take(6).ToList();
            ViewBag.HashTag = keyword;
            if (LoginHandler.IsLogin)
            {

                //프로그램핀
                var myPinProgramList = myActiveService.GetQuickProgramPin(LoginHandler.CurrentLoginUser);
                ViewBag.MyProgramList = myPinProgramList.ListData;

                //파트너핀
                var myPartnerPinList = myActiveService.GetQuickPartnerPin(LoginHandler.CurrentLoginUser);
                ViewBag.MyPartnerPinList = myPartnerPinList.ListData;
            }

            var programList = new BroadService.NewsProgramServiceClient().SearchListRandom();
            ViewBag.ProgramList = programList.ListData;

            var partnerList = new EventService.EventServiceClient().GetPartenrRandom();
            ViewBag.PartnerList = partnerList.ListData;

            var UserId = LoginHandler.CurrentLoginUser == null ? "" : LoginHandler.CurrentLoginUser.UserId;
            
            //뉴스핀 
            var myPinNewsList = new NewsQuickMenuService.QuickMenuServiceClient().GetQuickMenuMypinNews(UserId, 4);
            ViewBag.MyPinNewsList = myPinNewsList;

            //기자핀
            var myPinReporterList = new NewsQuickMenuService.QuickMenuServiceClient().GetQuickMenuMypinReporter(UserId, 4);
            ViewBag.MyPinReporterList = myPinReporterList;

#endregion


#region 고객센터

            //강연회
            LectureCondition condition = new LectureCondition();
            condition.CurrentSite = "Front";
            condition.PageSize = 3;
            var lectureList = new LectureService.LectureServiceClient().GetQuickLectures(condition);
            ViewBag.LectureList = lectureList.ListData;
            
            //이벤트 
            //var eventList = new EventService.EventServiceClient().GetQuickEventList();
            var eventList = new EventService.EventServiceClient().GetEventData();
            
            //var eventList = new ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>();
            //eventList.ListData = new List<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>();
            //ViewBag.EventList = eventList.ListData;
            ViewBag.EventList = eventList.ToList();
            
            //공지사항
            var noticeList = new IntegratedBoardService.IntegratedBoardServiceClient().GetQuickNoticeList();
            ViewBag.NoticeList = noticeList;

#endregion


#region 와우캐시
            if (LoginHandler.IsLogin)
            {
                //나의 캐시
                var myCash = myActiveService.GetMyCashAt(LoginHandler.CurrentLoginUser);
                ViewBag.MyCash = ViewBag.MyCash = $"{myCash.CASHTOTAL:n0}";
                //나의 보유 쿠폰
                var haveCouponCount = myActiveService.GetCouponCount(LoginHandler.CurrentLoginUser, 1);
                ViewBag.HaveCouponCount = haveCouponCount;
                //나의 등급
                var myClass = myActiveService.GetMyClass(LoginHandler.CurrentLoginUser);
                ViewBag.MyClass = myClass;
            }
#endregion



            return View();
        }
#endregion




        public ActionResult SiteMap()
        {
            return View();
        }



        //[OutputCache(Duration = 30)]
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult Test2()
        {
            return Json(new { Msg = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") });
        }
    }
}