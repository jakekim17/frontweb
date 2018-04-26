using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWeb.Areas.NewsCenter.Models;
using Wow.Tv.FrontWeb.Controllers;
using Wow.Tv.FrontWeb.MenuService;
using Wow.Tv.FrontWeb.NewsCenterService;
using Wow.Tv.FrontWeb.NewsMainService;
using Wow.Tv.FrontWeb.ReporterService;
using Wow.Tv.FrontWeb.TextAndLinkService;
using Wow.Tv.FrontWeb.HubBusinessService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db49.Article.NewsCmt;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.Article.TextAndLink;
using System.Collections.Specialized;
using Wow.Tv.FrontWeb.NewsTravelService;

namespace Wow.Tv.FrontWeb.Areas.NewsCenter.Controllers
{
    public class NewsController : BaseController
    {
        /// <summary>
        /// 제외할 기사 아이디
        /// </summary>
        private List<String> articleIdList = new List<String>();

        #region 뉴스 리스트
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NewsList()
        {
            return View();
        }

        /// <summary>
        /// 색션 뉴스 리스트 
        /// </summary>
        /// <param name="condition">검색 조건</param>
        /// <returns>ListModel<NUP_NEWS_SECTION_SELECT_Result></returns>
        public ActionResult List(NewsCenterCondition condition)
        {
            #region 색션구분(SearchSection)
            /******************************
            -- 최신뉴스[LATEST]
            -- 증권[stock]
            -- 경제[ECONOMY]
            -- 산업[INDUSTRY]
            -- IT·과학[ITSCIENCES]
            -- 정치·사회·국제[POLITICS]
            -- 생활문화[LIFE]
            -- 취업[JOB]
            -- 티비텐플러스[TVTENPLUS]
            -- 부동산[LAND]            
            -- 연예·스타[ENTSTAR]
            -- 스포츠[SPORTS]            
            -- 포토[PHOTO]
            ******************************/
            #endregion

            string topMenuName = "뉴스";

            if (!string.IsNullOrEmpty(Request["menuSeq"]))
            {
                NTB_MENU currentMenu = new MenuServiceClient().GetAt(int.Parse(Request["menuSeq"]));
                NTB_MENU currentUpMenu = new MenuServiceClient().GetAt(currentMenu.UP_MENU_SEQ);
                if (currentUpMenu != null)
                {
                    topMenuName = currentUpMenu.MENU_NAME;
                }
                else
                {
                    topMenuName = currentMenu.MENU_NAME;
                }
            }

            ViewBag.topMenuName = topMenuName;

            //색션구분 대문자로..
            if (!string.IsNullOrEmpty(condition.SearchSection))
            {
                condition.SearchSection = condition.SearchSection.ToUpper();
            }

            ListModel<NUP_NEWS_SECTION_SELECT_Result> resultData = new NewsCenterServiceClient().GetNewsSectionList(condition);

            resultData.TotalDataCount = 0;

            if (resultData.ListData.Count > 0)
            {
                resultData.TotalDataCount = (int)resultData.ListData.First().ROWCNT;
            }

            var model = resultData;

            return View(model);
        }
        #endregion

        /// <summary>
        /// 뉴스 본문
        /// </summary>
        /// <param name="condition">검색 조건</param>
        /// <returns>NewsReadModel</returns>
        // GET: NewsCenter/News
        public ActionResult Read(NewsCenterCondition condition)
        {
            bool isMobile = WowExtensionMethod.GetIsMobile(Request.UserAgent);
            if (isMobile)
            {
                string mobileUrl    = "http://m.wowtv.co.kr";
                string reqArticleId = string.Empty;

                if(Request["articleId"] != null)
                {
                    reqArticleId = Request["articleId"];
                    mobileUrl = string.Format("{0}/NewsCenter/News/Read?articleId={1}", mobileUrl, reqArticleId);

                    if (Request["resource"] != null)
                    {
                        mobileUrl = string.Format("{0}&resource={1}", mobileUrl, Request["resource"]);
                    }

                    if (Request["language"] != null)
                    {
                        mobileUrl = string.Format("{0}&language={1}", mobileUrl, Request["language"]);
                    }
                }

                Response.Redirect(mobileUrl);
                Response.End();
            }

            #region 뉴스 상세 페이지 설정 정보
            bool isPhotoNews           = false;
            bool isReporter            = false;   // 기사 정보 유무
            bool isStock               = false;   // 종목 정보 유무
            string commentActive       = "N";     // 댓글 사용여부
            string viewPageLikeActive  = "Y";     // 당신이 좋아할 만한 기사(포토)
            string viewPageSeeActive   = "Y";     // 이기사와 많이본 기사
            string viewPageRecomActive = "Y";     // 당신에게 맞는 추천 뉴스

            #endregion

            articleIdList = new List<String>();
            string articleId = Request["articleId"];
            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
            }

            //기사 상세 내용
            var model = new NewsReadModel
            {
                newsRead = null
            };

            if (!string.IsNullOrEmpty(articleId))
            {
                //기사 상세 내용
                model.newsRead = new NewsCenterServiceClient().GetNewsReadInfo(articleId, prevArticleId, "WEB");

                #region 뉴스 상세 페이지 설정 정보

                // 댓글 사용여부
                NTB_ARTICLE_SHOW_CONFIG newsShowConfig = new NewsCenterServiceClient().GetNewsShowConfig("COMMENT");
                if (newsShowConfig != null)
                {
                    commentActive = newsShowConfig.ACTIVE_YN;
                }

                // 뷰페이지 관리
                if (Request["menuSeq"] != null)
                {
                    double Num;
                    bool isNum = double.TryParse(Request["menuSeq"], out Num);
                    if (isNum)
                    {
                        NTB_ARTICLE_VIEWPAGE_MANAGE viewPageManageInfo = new NewsCenterServiceClient().GetNewsViewPageManageList().ListData.Where(p => p.MENU_SEQ.Equals(int.Parse(Request["menuSeq"]))).Take(1).FirstOrDefault();
                        if (viewPageManageInfo != null)
                        {
                            viewPageLikeActive  = viewPageManageInfo.LIKE_YN;
                            viewPageSeeActive   = viewPageManageInfo.SEE_YN;
                            viewPageRecomActive = viewPageManageInfo.RECOM_YN;
                        }
                    }
                }

                // 포토 뉴스
                if (Request["subMenu"] != null)
                {
                    if (Request["subMenu"].Equals("photo"))
                    {
                        isPhotoNews = true;
                    }
                }

                if (model.newsRead != null)
                {
                    // 기자 페이지 사용여부 
                    //if (model.newsRead.REPORTER_PAGE_YN.Equals("Y"))
                    if ( ( model.newsRead.REPORTER_PAGE_YN.Equals("Y") && model.newsRead.IS_BYLINE.ToUpper().Equals("TRUE") ) || (model.newsRead.TAG != null && model.newsRead.WRITER_ID != null && model.newsRead.WRITER_ID.Equals("NET01") && model.newsRead.TAG.Substring(0, 1).Equals("$")))
                    {
                        isReporter = true;
                    }

                    // 종목 정보 유무
                    if (model.newsRead.STOCK_COUNT > 0)
                    {
                        isStock = true;
                    }
                }
                #endregion

                ViewBag.HardCodingAdList    = new NewsAdService.NewsAdServiceClient().GetHardCodingAdList().ListData;

                articleIdList.Add(articleId);

                if (string.IsNullOrEmpty(viewPageLikeActive))
                {
                    viewPageLikeActive = "Y";
                }

                if (string.IsNullOrEmpty(viewPageSeeActive))
                {
                    viewPageSeeActive = "Y";
                }

                if (string.IsNullOrEmpty(viewPageRecomActive))
                {
                    viewPageRecomActive = "Y";
                }

            }

            ViewBag.isPhotoNews         = isPhotoNews;
            ViewBag.isReporter          = isReporter;
            ViewBag.isStock             = isStock;
            ViewBag.commentActive       = commentActive;
            ViewBag.viewPageLikeActive  = viewPageLikeActive;
            ViewBag.viewPageSeeActive   = viewPageSeeActive;
            ViewBag.viewPageRecomActive = viewPageRecomActive;

            return View(model);
        }


        /// <summary>
        /// 뉴스 본문(HTML 용)
        /// </summary>
        /// <param name="condition">검색 조건</param>
        /// <returns>NewsReadModel</returns>
        // GET: NewsCenter/News
        public ActionResult ReadCast(NewsCenterCondition condition)
        {
            #region 뉴스 상세 페이지 설정 정보
            bool isPhotoNews = false;
            bool isReporter = false;   // 기사 정보 유무
            bool isStock = false;   // 종목 정보 유무
            string commentActive = "N";     // 댓글 사용여부
            string viewPageLikeActive = "Y";     // 당신이 좋아할 만한 기사(포토)
            string viewPageSeeActive = "Y";     // 이기사와 많이본 기사
            string viewPageRecomActive = "Y";     // 당신에게 맞는 추천 뉴스

            #endregion

            articleIdList = new List<String>();
            string articleId = Request["articleId"];
            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
            }

            //기사 상세 내용
            var model = new NewsReadModel
            {
                newsRead = null
            };

            if (!string.IsNullOrEmpty(articleId))
            {
                //기사 상세 내용
                model.newsRead = new NewsCenterServiceClient().GetNewsReadInfo(articleId, prevArticleId, "WEB");

                #region 뉴스 상세 페이지 설정 정보

                // 댓글 사용여부
                NTB_ARTICLE_SHOW_CONFIG newsShowConfig = new NewsCenterServiceClient().GetNewsShowConfig("COMMENT");
                if (newsShowConfig != null)
                {
                    commentActive = newsShowConfig.ACTIVE_YN;
                }

                // 뷰페이지 관리
                if (Request["menuSeq"] != null)
                {
                    double Num;
                    bool isNum = double.TryParse(Request["menuSeq"], out Num);
                    if (isNum)
                    {
                        NTB_ARTICLE_VIEWPAGE_MANAGE viewPageManageInfo = new NewsCenterServiceClient().GetNewsViewPageManageList().ListData.Where(p => p.MENU_SEQ.Equals(int.Parse(Request["menuSeq"]))).Take(1).FirstOrDefault();
                        if (viewPageManageInfo != null)
                        {
                            viewPageLikeActive = viewPageManageInfo.LIKE_YN;
                            viewPageSeeActive = viewPageManageInfo.SEE_YN;
                            viewPageRecomActive = viewPageManageInfo.RECOM_YN;
                        }
                    }
                }

                // 포토 뉴스
                if (Request["subMenu"] != null)
                {
                    if (Request["subMenu"].Equals("photo"))
                    {
                        isPhotoNews = true;
                    }
                }

                if (model.newsRead != null)
                {
                    // 기자 페이지 사용여부 
                    //if (model.newsRead.REPORTER_PAGE_YN.Equals("Y"))
                    if ((model.newsRead.REPORTER_PAGE_YN.Equals("Y") && model.newsRead.IS_BYLINE.ToUpper().Equals("TRUE")) || (model.newsRead.TAG != null && model.newsRead.WRITER_ID != null && model.newsRead.WRITER_ID.Equals("NET01") && model.newsRead.TAG.Substring(0, 1).Equals("$")))
                    {
                        isReporter = true;
                    }

                    // 종목 정보 유무
                    if (model.newsRead.STOCK_COUNT > 0)
                    {
                        isStock = true;
                    }
                }
                #endregion

                ViewBag.HardCodingAdList = new NewsAdService.NewsAdServiceClient().GetHardCodingAdList().ListData;

                articleIdList.Add(articleId);

            }

            ViewBag.isPhotoNews = isPhotoNews;
            ViewBag.isReporter = isReporter;
            ViewBag.isStock = isStock;
            ViewBag.commentActive = commentActive;
            ViewBag.viewPageLikeActive = viewPageLikeActive;
            ViewBag.viewPageSeeActive = viewPageSeeActive;
            ViewBag.viewPageRecomActive = viewPageRecomActive;

            return View(model);
        }



        /// <summary>
        /// 이전, 다음 기사 정보
        /// </summary>
        /// <param name="condition">검색 조건</param>
        /// <returns></returns>
        public ActionResult NewsPrevNext(NewsCenterCondition condition)
        {
            string articleId = Request["articleId"];

            //이전, 다음 기사 정보
            List<NUP_NEWS_PREV_NEXT_SELECT_Result> newsPrevNext = new NewsCenterServiceClient().GetNewsPrevNext(articleId, condition).ListData;

            //return Json(newsPrevNext);
            return Json(new { NewsPrevNext = newsPrevNext}, JsonRequestBehavior.AllowGet);
        }
        
        /// <summary>
        /// 기사 > 좋아요
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadLikeit(string articleId)
        {
            NTB_ARTICLE_LIKEIT model = new NewsCenterServiceClient().GetArticleLikeit(articleId);

            return View(model);
        }

        /// <summary>
        /// 기사 > 좋아요 Insert & Update
        /// </summary>
        public ActionResult SetLikeit(string articleId, string likeitGubun)
        { 
            string msg = "";
            bool isSuccess = false;
            bool isLikeit = false;
            try
            {
                if (CookieMgr.GetCookie("Likeit_" + articleId, "ArticleId", false, new EncryptTypeEnum()) == "")
                {
                    new NewsCenterServiceClient().SetArticleLikeit(articleId, likeitGubun);
                    NameValueCollection nameValue = new NameValueCollection
                    {
                        { "ArticleId", articleId },
                        { "LikeitGubun", likeitGubun },
                        { "Date", DateTime.Now.ToString() }
                    };
                    CookieMgr.SetMultyCookie("Likeit_" + articleId, nameValue, false, new EncryptTypeEnum());
                }
                else
                {
                    isLikeit = true;
                }

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, isLikeit = isLikeit });
        }

        /// <summary>
        /// 인쇄
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadPrintNews()
        {
            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
                //Wow.Fx.WowLog.Write("prevArticleId : " + prevArticleId);
            }

            string articleId = Request["articleId"];

            var model = new NewsReadModel
            {
                //기사 상세 내용
                newsRead = new NewsCenterServiceClient().GetNewsReadInfo(articleId, prevArticleId, "WEB")
            };

            return View(model);  
        }

        /// <summary>
        /// 뉴스 상세 베스트 포토
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadBestPhotoNews()
        {
            string articleId = Request["articleId"];

            articleIdList.Add(articleId);

            //인기 포토 
            List<NUP_NEWS_MAIN_SECTION_SELECT_Result>  model = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 15, articleIdList.ToArray()).ListData;

            //인기포토 articleIdList ADD
            foreach (var item in model)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            return View(model);
        }

        //관련뉴스
        [OutputCache(Duration = 5 * 60)]
        public ActionResult ReadRelationNews()
        {
            string articleId = Request["articleId"];
            List<NUP_NEWS_READ_RELATION_SELECT_Result> model = new NewsCenterService.NewsCenterServiceClient().GetNewsReadRelationList(articleId, articleIdList.ToArray()).ListData;

            foreach(var item in model)
            {
                articleIdList.Add(item.ARTICLE_ID.Trim());
            }

            return View(model);
        }

        //Text&Link
        public ActionResult ReadTextAndLinkNews()
        {
            //뉴스 상세 Text & Link List
            List<JOIN_TXTNLINK_CODE> model = new TextAndLinkServiceClient().GetList().ListData.Where(p => p.CODE.Equals("WOWNET")).OrderByDescending(o => o.SEQ).Take(3).ToList();

            ViewBag.textAndLinkImageBanner = new HubBusinessServiceClient().GetList().ListData.Where(p => p.CODE.Equals("VIEW") && p.OPEN_YN.Equals("Y")).OrderByDescending(o => o.REG_DATE).Take(1).FirstOrDefault();

            return View(model);
        }

        /// <summary>
        /// 당신이 좋아할 만한 기사
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadPhotoNews()
        {
            string articleId = Request["articleId"];

            articleIdList.Add(articleId);

            var model = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 24, articleIdList.ToArray()).ListData;

            //당신이 좋아할 만한 기사 articleIdList ADD
            foreach (var item in model)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            return View(model);
        }

        /// <summary>
        /// 이기사와 많이본 기사
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadManySeeNews()
        {
            string articleId = Request["articleId"];

            var model = new NewsCenterServiceClient().GetNewsThisManySee(articleId).ListData.Take(6).ToList();

            return View(model);
        }
      
        /// <summary>
        /// 당신에게 맞는 추천뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadRecomNews()
        {
            return View();
        }

        /// <summary>
        /// 많이본 뉴스(종합/연예.스포츠) TOP 20
        /// </summary>
        /// <returns></returns>
        public ActionResult ManySee()
        {

            //노출된 기사 ID
            List<String> articleIdList = new List<String>();
            
            var model = new NewsMainModel
            {
                //많이본 뉴스[종합]
                newsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 20, articleIdList.ToArray()).ListData,

                //많이본 뉴스[연예.스포츠]
                newsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 20, articleIdList.ToArray()).ListData,

                //카드뉴스
                newsCardList = new NewsMainServiceClient().GetNewsMainCardList("CARD", 7, articleIdList.ToArray()).ListData
            };

            return View(model);
        }

        public ActionResult ArticleComment(string articleId)
        {
            ViewBag.ArticleId = articleId;
            return View();
        }

        /// <summary>
        /// 댓글 리스트
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public ActionResult GetArtComment(CommentCondition condition)
        {
            var result = new NewsCmtManageService.NewsCmtManageServiceClient().GetCommentList(condition);
            ViewBag.Condition = condition;
            return View(result);
        }

        /// <summary>
        /// 댓글 저장
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult SaveComment(NTB_ARTICLE_COMMENT model)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {
                if(LoginHandler.IsLogin == true)
                {
                    new NewsCmtManageService.NewsCmtManageServiceClient().SaveComment(model, LoginHandler.CurrentLoginUser);
                }
                else if (LoginHandler.IsEasyLogin == true)
                {
                    new NewsCmtManageService.NewsCmtManageServiceClient().SaveComment(model, LoginHandler.CurrentEasyLoginUser);
                }
                isSuccess = true;
             
            }catch(Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 댓글 삭제
        /// </summary>
        /// <param name="deleteId"></param>
        /// <returns></returns>
        public ActionResult DeleteComment(int deleteId)
        {
            bool isSuccess = false;
            string msg = "";
            try
            {            
                new NewsCmtManageService.NewsCmtManageServiceClient().DeleteComment(deleteId);
                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 뉴스 상세 기자 정보
        /// </summary>
        /// <returns></returns>
        public ActionResult ReporterInfo(NewsCenterCondition condition, string reporter_Id, string tag)
        {
            var model = new NewsReadModel();
            var TagVal = "";
            var HtmlTag = "";
            
            //tag = "$P248";//방송중
            //tag = "$P048";//방송예정
            if (!String.IsNullOrEmpty(tag))
            {
                TagVal = tag.Substring(0, 1);
            }

            if (reporter_Id == "NET01" && TagVal == "$")
            {
                condition.SearchText = reporter_Id;
                //파트너 정보 호출
                var result = new NewsCenterServiceClient().GetReportPartnerInfo(condition, tag);

                //방송상태
                string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["WowNetUrl"];

                //HtmlTag = BroadcastFunction.GetBroadIconAndLink(uploadWebPath, broadState.BPLAYTYPE, broadState.BMEMTYPE, broadState.STATE, broadState.PRO_ID, broadState.BROOM, broadState.PRODUCT_ID_1);

                model.reporterPartnerInfo = result;
                ViewBag.broadState = result.BroadState;
            }
            else
            {
                //임시
                //condition.SearchText = "B0014";
                condition.SearchText = reporter_Id;
                condition.SearchSection = "REPORTER";
                condition.PageSize = 3;
                condition.StartDate = condition.StartDate == null ? "" : condition.StartDate;
                condition.EndDate = condition.EndDate == null ? "" : condition.EndDate;
                condition.SearchWowCode = condition.SearchWowCode == null ? "" : condition.SearchWowCode;
                condition.SearchComp = condition.SearchComp == null ? "" : condition.SearchComp;
                condition.EndDate = condition.EndDate == null ? "" : condition.EndDate;

                model.reporterInfo = new NewsCenterServiceClient().GetReporterInfo(condition).ListData;//기자정보
                model.reporterNewsList = new NewsCenterServiceClient().GetReporterRecentlySelect(reporter_Id).ListData; //기자의 기사리스트 
            }

            ViewBag.ReporterId = condition.SearchText;
            ViewBag.Tag = TagVal;
            ViewBag.HtmlTag = HtmlTag;

            return View(model);
        }

        /// <summary>
        /// 뉴스 상세 관련종목 정보
        /// </summary>
        /// <returns></returns>
        public ActionResult StockInfo(string articleId)
        {
            //관련종목데이터
            var data = new NewsCenterServiceClient().GetStockInfo(articleId);

            //주가예측차트(일봉)
            HpCondition chart5DayConditionObj;
            if (data.ListData.Count > 0)
            {
                chart5DayConditionObj = new HpCondition
                {
                    Trid = "7551",
                    Code = data.ListData.First().arj_code.Replace("A", ""),
                    Width = "425",
                    Height = "180"
                };

            }
            else
            {
                chart5DayConditionObj = new HpCondition();
            }

            //주가예측차트
            string chart5DayStr = new FinanceService.FinanceServiceClient().GetHpFinderChart(chart5DayConditionObj);
            string[] chart5DayArr = chart5DayStr.Split('|');

            if (chart5DayArr.Length > 1)
            {
                ViewBag.Chart = chart5DayArr[3];
                ViewBag.StartDate = chart5DayArr[4].Substring(0, 4) + "-" + chart5DayArr[4].Substring(4, 2) + "-" + chart5DayArr[4].Substring(6, 2);
                ViewBag.EndDate = chart5DayArr[5].Substring(0, 4) + "-" + chart5DayArr[5].Substring(4, 2) + "-" + chart5DayArr[5].Substring(6, 2);
            }
            return View(data);
        }

        /// <summary>
        /// 여행 기사
        /// </summary>
        /// <returns></returns>
        public ActionResult Travel()
        {
            return View();
        }

        /// <summary>
        /// 여행 기사 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelList(NewsCenterCondition condition)
        {
            ListModel<ArticleClass_Hanatour> resultData = new TravelServiceClient().TravelList(condition);

            var model = resultData;

            return View(model);
        }

        /// <summary>
        /// 여행 기사 > 상세
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelRead(string articleId)
        {
            var model = new ArticleClass_Hanatour();

            if (!string.IsNullOrEmpty(articleId))
            {
                model = new TravelServiceClient().GetTravelReadInfo(articleId);

                ViewBag.HardCodingAdList = new NewsAdService.NewsAdServiceClient().GetHardCodingAdList().ListData;
            }

            return View(model);
        }

        /// <summary>
        /// 여해 기사 > 좋아요
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelReadLikeit(string articleId)
        {
            NTB_ARTICLE_LIKEIT_HANATOUR model = new TravelServiceClient().GetArticleLikeitHanatour(articleId);

            return View(model);
        }

        /// <summary>
        /// 여행 기사 > 좋아요 Insert & Update
        /// </summary>
        public ActionResult SetTravelLikeit(string articleId, string likeitGubun)
        {
            string msg = "";
            bool isSuccess = false;
            bool isLikeit = false;
            try
            {
                if (CookieMgr.GetCookie("LikeitTravel_" + articleId, "ArticleId", false, new EncryptTypeEnum()) == "")
                {
                    new TravelServiceClient().SetArticleLikeitHanatour(articleId, likeitGubun);
                    NameValueCollection nameValue = new NameValueCollection
                    {
                        { "ArticleId", articleId },
                        { "LikeitGubun", likeitGubun },
                        { "Date", DateTime.Now.ToString() }
                    };
                    CookieMgr.SetMultyCookie("LikeitTravel_" + articleId, nameValue, false, new EncryptTypeEnum());
                }
                else
                {
                    isLikeit = true;
                }

                isSuccess = true;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { isSuccess = isSuccess, msg = msg, isLikeit = isLikeit });
        }

        /// <summary>
        /// 여행 관련 뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelReadRelationNews(NewsCenterCondition condition)
        {
            string articleId = Request["articleId"];

            condition.CurrentIndex = 0;
            condition.PageSize = 10;
            condition.SearchArticleId = articleId;

            List<ArticleClass_Hanatour> resultData = new TravelServiceClient().TravelList(condition).ListData;

            var model = resultData;

            return View(model);
        }

        /// <summary>
        /// 여행 > 이기사와 많이본 기사
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelReadManySeeNews()
        {
            List<String> articleIdList = new List<String>();

            var model = new NewsMainServiceClient().GetNewsMainSectionList("LIFE", 6, articleIdList.ToArray()).ListData;

            return View(model);
        }

        /// <summary>
        /// 이전, 다음 기사 정보
        /// </summary>
        /// <param name="condition">검색 조건</param>
        /// <returns></returns>
        public ActionResult TravelPrevNext(NewsCenterCondition condition)
        {
            string articleId = Request["articleId"];

            //이전, 다음 기사 정보
            List<NUP_NEWS_PREV_NEXT_SELECT_Result> newsPrevNext = new TravelServiceClient().GetTravelPrevNext(articleId, condition).ListData;

            return Json(new { NewsPrevNext = newsPrevNext }, JsonRequestBehavior.AllowGet);
        }

    }
}