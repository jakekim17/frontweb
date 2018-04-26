using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.editVOD;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;
using Wow.Tv.Middle.Model.Db49.broadcast;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;
using Wow.Tv.FrontWebMobile.IntegratedBoardService;
using Wow.Tv.FrontWebMobile.MyActiveService;
using Wow.Tv.FrontWebMobile.CommconCodeService;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;
using Wow.Tv.Middle.Model.Db49.wowtv.Board;
using Wow.Tv.Middle.Model.Db22.stock.MyPage;
using Wow.Tv.Middle.Model.Db22.stock;

namespace Wow.Tv.FrontWebMobile.Controllers
{
    public class HomeController : Controller
    {
        private List<String> articleIdList = new List<String>();

        [OutputCache(Duration = 30 * 60)]
        public ActionResult _PageLocation(string menuSeq)
        {
            return View();
        }


#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult TopMenuFromMain()
        {
            return View();
        }



        public ActionResult Index()
        {
            DateTime nowDate = DateTime.Now;
            string nowTime = nowDate.ToString("HH:mm");
            T_RUNDOWN prevRunDown = null;
            T_RUNDOWN currentRunDown = null;
            T_RUNDOWN nextRunDown = null;

            var toDayRunDownList = new BroadService.NewsProgramServiceClient().SearchListRunDown(nowDate.ToString("yyyy-MM-dd")).ToList();

            prevRunDown = toDayRunDownList.Where(a => a.RUN_END != "00:00" && a.RUN_END.CompareTo(nowTime) < 0).OrderByDescending(a => a.RUN_START).FirstOrDefault();
            currentRunDown = toDayRunDownList.Where(a => a.RUN_END.CompareTo(nowTime) >= 0).OrderBy(a => a.RUN_START).FirstOrDefault();
            nextRunDown = toDayRunDownList.Where(a => a.RUN_START.CompareTo(nowTime) >= 0).OrderBy(a => a.RUN_START).FirstOrDefault();

            ViewBag.PrevRunDown = prevRunDown;
            ViewBag.CurrentRunDown = currentRunDown;
            ViewBag.NextRunDown = nextRunDown;

            return View();
        }

        // 뉴스썸
        [OutputCache(Duration = 5 * 60)]
        public ActionResult NewsSome(string typeCode)
        {
            articleIdList.Clear();

            List<NUP_NEWS_MAIN_SECTION_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();

            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainSectionList(typeCode, 4, articleIdList.ToArray()).ListData;

                foreach (var item in resultData)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 뉴스썸(GetNewsMainSectionList) => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 뉴스썸(GetNewsMainSectionList) Inner => " + ex.InnerException.Message);
                }
            }

            return View(resultData);
        }

        // 뉴스썸 2
        [OutputCache(Duration = 5 * 60)]
        public ActionResult NewsSubMainTop()
        {
            List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_NEWSSTAND_SELECT_Result>();
            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainNewsstand().ListData.Where(p => p.RANK <= 5).ToList();
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 뉴스썸2(GetNewsMainNewsstand) => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 뉴스썸2(GetNewsMainNewsstand) Inner => " + ex.InnerException.Message);
                }
            }


            return View(resultData);
        }

        // 마켓 이슈
        [OutputCache(Duration = 10 * 60)]
        public ActionResult MarketIssue()
        {
            List<NUP_NEWS_MAIN_MARKET_ISSUE_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_MARKET_ISSUE_SELECT_Result>();
            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainMarketIssueList().ListData;

                foreach (var item in resultData)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 마켓 이슈 => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 마켓 이슈 Inner => " + ex.InnerException.Message);
                }
            }

            return View(resultData);
        }

        // 오피니언
        [OutputCache(Duration = 10 * 60)]
        public ActionResult Opinion()
        {
            List<NUP_NEWS_MAIN_OPINION_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_OPINION_SELECT_Result>();

            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainOpinionList().ListData;
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 오피니언 => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 오피니언 Inner => " + ex.InnerException.Message);
                }
            }
            return View(resultData);
        }

        // 많이 본 뉴스
        [OutputCache(Duration = 10 * 60)]
        public ActionResult ManySeeNews()
        {
            var model = new NewsMainModel
            {
                NewsTotalCountList = null,
                NewsEntSpoCountList = null
            };

            try
            {
                //많이본 뉴스[종합]
                model.NewsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 12, articleIdList.ToArray()).ListData;

                foreach (var item in model.NewsTotalCountList)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 많이본 뉴스[종합] => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 많이본 뉴스[종합] Inner => " + ex.InnerException.Message);
                }
            }

            try
            {
                //많이본 뉴스[연예.스포츠]
                model.NewsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 12, articleIdList.ToArray()).ListData;

                foreach (var item in model.NewsEntSpoCountList)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 많이본 뉴스[연예.스포츠] => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 많이본 뉴스[연예.스포츠] Inner => " + ex.InnerException.Message);
                }
            }

            return View(model);
        }

        // 카드 뉴스
        [OutputCache(Duration = 10 * 60)]
        public ActionResult CardNews()
        {
            List<NUP_NEWS_MAIN_CARD_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_CARD_SELECT_Result>();

            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainCardList("CARD_LATEST", 2, articleIdList.ToArray()).ListData;

                foreach (var item in resultData)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 카드뉴스 => " + ex.Message);
                if (ex.InnerException != null)
                {
                    Wow.Fx.WowLog.Write("모바일 > 홈 > 카드뉴스 Inner => " + ex.InnerException.Message);
                }
            }

            return View(resultData);
        }

        //이슈 갤러리
        [OutputCache(Duration = 10 * 60)]
        public ActionResult PhotoNews()
        {
            List<NUP_NEWS_MAIN_SECTION_SELECT_Result> resultData = new List<NUP_NEWS_MAIN_SECTION_SELECT_Result>();

            try
            {
                resultData = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 20, articleIdList.ToArray()).ListData;

                foreach (var item in resultData)
                {
                    articleIdList.Add(item.ARTICLEID);
                }
            }
            catch (Exception ex)
            {
                Wow.Fx.WowLog.Write("모바일 > 홈 > 이슈 갤러리 => " + ex.Message);
            }
            return View(resultData);
        }

        [OutputCache(Duration = 10 * 60)]
        public ActionResult SiteMap()
        {
            return View();
        }
        public ActionResult LoginStatus()
        {
            return View();
        }

        public ActionResult SiteMapMyPage() {
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            IntegratedBoardServiceClient integratedBoardService = new IntegratedBoardServiceClient();

            if (LoginHandler.IsLogin)
            {
                //나의 보유 쿠폰
                var haveCouponCount = myActiveService.GetCouponCount(LoginHandler.CurrentLoginUser, 1);
                ViewBag.HaveCouponCount = haveCouponCount;

                //나의 투자 파트너
                var myPartner = myActiveService.GetMyPartnerAt(LoginHandler.CurrentLoginUser);
                if (myPartner != null)
                {
                    ViewBag.MyPartnerName = myPartner.NickName;
                    ViewBag.MyPartnerProId = myPartner.Pro_id;
                }
                else
                {

                    ViewBag.MyPartnerName = "-";
                    ViewBag.MyPartnerProId = "";
                }

                ViewBag.ADList = null;

                CommconCodeServiceClient commonCodeService = new CommconCodeServiceClient();
                var codeList = commonCodeService.SearchList(new CommonCodeCondition
                {
                    UpCommonCode = CommonCodeStatic.INTEGRATED_BOARD_FAQ_CODE
                }).ListData;

                var myCash = myActiveService.GetMyCashAt(LoginHandler.CurrentLoginUser);


                IntegratedBoardCondition condition = new IntegratedBoardCondition();


                /***** 1:1 문의 ******/
                var inquiry = new MenuService.MenuServiceClient().GetAtByName("HELP", "1:1문의");
                if (inquiry != null)
                {
                    condition.CurrentMenuSeq = inquiry.MENU_SEQ;
                    condition.LoginId = LoginHandler.CurrentLoginUser.UserId;

                    //나의 1:1문의 
                    var inquiryList = integratedBoardService.MyMainIntegratedSearchCount(condition);
                    if (inquiryList != null)
                    {
                        ViewBag.InquiryCount = inquiryList.ListData.Count;
                        ViewBag.ReplyCount = inquiryList.ListData.Count(x => x.REPLY_YN.Equals("Y"));
                    }
                    else
                    {
                        ViewBag.InquiryCount = 0;
                        ViewBag.ReplyCount = 0;
                    }
                }

                

                double myChangePercent = myActiveService.GetMyChangePercent(LoginHandler.CurrentLoginUser);

                ViewBag.MyChangePercent = myChangePercent;
                ViewBag.MyCash = $"{myCash.CASHTOTAL:n0}";


                //var myClass = myActiveService.GetMyClass(LoginHandler.CurrentLoginUser);
                //ViewBag.MyClass = myClass;
            }

            return View();
        }

        public ActionResult SiteMapMyStock()
        {
            MyActiveServiceClient myActiveService = new MyActiveServiceClient();
            ListModel<tblMyFavoriteJongMok> favoriteJonMokList = new ListModel<tblMyFavoriteJongMok>();

            MyJongMokCondition jongMokCondition = new MyJongMokCondition
            {
                CurrentIndex = 0,
                PageSize = 20
            };

            //var myStockList = myActiveService.GetMyFavoriteJongMokList(LoginHandler.CurrentLoginUser, jongMokCondition);

            if (LoginHandler.IsLogin == true)
            {
                favoriteJonMokList = myActiveService.GetMyFavoriteJongMokList(LoginHandler.CurrentLoginUser, jongMokCondition);
            }
            
            ViewBag.ResultData = favoriteJonMokList.ListData;
            ViewBag.TotalDataCount = favoriteJonMokList.TotalDataCount;

            return View();

        }



#if DEBUG
#else
        [OutputCache(Duration = 10 * 60)]
#endif
        public ActionResult TopMenuBar(string menuSeq)
        {
            return View();
        }






        [OutputCache(Duration = 10 * 60)]
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
            //Wow.Fx.WowLog.Write("VodPartner programCode => " + programCode);
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

            Wow.Tv.FrontWebMobile.MyActiveService.MyActiveServiceClient myActiveService = new Wow.Tv.FrontWebMobile.MyActiveService.MyActiveServiceClient();
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


    }
}