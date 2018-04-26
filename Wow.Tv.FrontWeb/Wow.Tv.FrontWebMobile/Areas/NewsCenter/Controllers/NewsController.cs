using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWebMobile.Areas.NewsCenter.Models;
using Wow.Tv.FrontWebMobile.Controllers;
using Wow.Tv.FrontWebMobile.NewsCenterService;
using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.Article.NewsCenter;
using Wow.Tv.Middle.Model.Db22.stock.Finance;
using Wow.Tv.FrontWebMobile.NewsMainService;
using Wow.Fx;
using System.Collections.Specialized;
using Wow.Tv.Middle.Model.Db49.Article.NewsCmt;
using Wow.Tv.FrontWebMobile.NewsCmtManageService;
using Wow.Tv.FrontWebMobile.NewsTravelService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.FrontWebMobile.HubBusinessService;

namespace Wow.Tv.FrontWebMobile.Areas.NewsCenter.Controllers
{
    public class NewsController : BaseController
    {
        /// <summary>
        /// 제외할 기사 아이디
        /// </summary>
        private List<String> articleIdList = new List<String>();

        /// <summary>
        /// 뉴스 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult SearchList(NewsCenterCondition condition, string IsAppend)
        {
            ViewBag.hubBusinessBanner = new NTB_HUB_BUSINESS();

            var model = new NewsListModel()
            {
                ArticleList = new List<NUP_NEWS_SECTION_SELECT_Result>(),
                SectionManySeeList = new List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result>(),
                SectionRecommendList = new List<NUP_NEWS_SECTION_MANY_SEE_SELECT_Result>()
            };

            // NewsList(Front)와 동일조건으로 검색
            if (string.IsNullOrEmpty(condition.StartDate))
            {
                condition.StartDate = DateTime.Now.AddYears(-1).ToString("yyyy-MM-dd");
                condition.EndDate = DateTime.Now.AddYears(1).ToString("yyyy-MM-dd");
            }

            if (!string.IsNullOrEmpty(condition.SearchSection))
            {
                condition.SearchSection = condition.SearchSection.ToUpper();
            }

            model.ArticleList = new NewsCenterServiceClient().GetNewsSectionList(condition).ListData;

            if (model.ArticleList.Count > 0)
            {
                ViewBag.TotalDataCount = (int)model.ArticleList.First().ROWCNT;
            }
            else
            {
                ViewBag.TotalDataCount = 0;
            }

            if (IsAppend != "Y")
            {
                var sectionManySeeList = new NewsCenterServiceClient().GetNewsSectionManySee(condition.SearchSection, condition.SearchWowCode).ListData;
                if (sectionManySeeList != null && sectionManySeeList.Count > 0)
                {
                    foreach (var item in sectionManySeeList)
                    {
                        if (sectionManySeeList.IndexOf(item) < 3)
                        {
                            model.SectionManySeeList.Add(item);
                        }
                        else
                        {
                            model.SectionRecommendList.Add(item);
                        }
                    }
                }

                ViewBag.hubBusinessBanner = new HubBusinessServiceClient().GetList().ListData.Where(p => p.CODE.Equals("VIEW")).OrderByDescending(o => o.REG_DATE).Take(1).FirstOrDefault();
            }

            ViewBag.IsAppend = IsAppend;
            return View(model);
        }


        /// <summary>
        /// 뉴스 상세
        /// </summary>
        public ActionResult Read()
        {
            #region 뉴스 상세 페이지 설정 정보
            bool isPhotoNews           = false;   // 포토 여부
            bool isReporter            = false;   // 기사 정보 유무
            bool isStock               = false;   // 종목 정보 유무
            string commentActive       = "N";     // 댓글 사용여부
            string viewPageLikeActive  = "Y";     // 당신이 좋아할 만한 기사(포토)
            string viewPageSeeActive   = "Y";     // 이기사와 많이본 기사
            string viewPageRecomActive = "Y";     // 당신에게 맞는 추천 뉴스
            string viewPageSnsPrActive = "Y";     // SNS 홍보 팝업
            #endregion

            string articleId = Request["articleId"];

            string prevArticleId = string.Empty;

            if (Request.UrlReferrer != null)
            {
                prevArticleId = HttpUtility.ParseQueryString(Request.UrlReferrer.Query)["articleId"];
            }

            NUP_NEWS_READ_SELECT_Result newsRead = new NUP_NEWS_READ_SELECT_Result();

            if (!string.IsNullOrEmpty(articleId))
            {
                //기사 상세 내용
                newsRead = new NewsCenterServiceClient().GetNewsReadInfo(articleId, prevArticleId, "MWB");

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
                            viewPageSnsPrActive = viewPageManageInfo.SNS_PR_YN;
                        }
                    }
                }

                // 포토 뉴스
                if (Request["subMenu"] != null)
                {
                    if (Request["subMenu"].Equals("photo") )
                    {
                        isPhotoNews = true;
                    }
                }

                if (newsRead != null)
                {
                    // 기자 페이지 사용여부 || 파트너 이거나..
                    if ((newsRead.REPORTER_PAGE_YN.Equals("Y") && newsRead.IS_BYLINE.ToUpper().Equals("TRUE")) || ( newsRead.TAG != null && newsRead.WRITER_ID != null && newsRead.WRITER_ID.Equals("NET01") && newsRead.TAG.Substring(0, 1).Equals("$")))
                    {
                        isReporter = true;
                    }

                    // 종목 정보 유무
                    if (newsRead.STOCK_COUNT > 0)
                    {
                        isStock = true;
                    }
                }
                #endregion

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

                if (string.IsNullOrEmpty(viewPageSnsPrActive))
                {
                    viewPageSnsPrActive = "Y";
                }
            }



            ViewBag.isPhotoNews         = isPhotoNews;
            ViewBag.isReporter          = isReporter;
            ViewBag.isStock             = isStock;
            ViewBag.commentActive       = commentActive;
            ViewBag.viewPageLikeActive  = viewPageLikeActive;
            ViewBag.viewPageSeeActive   = viewPageSeeActive;
            ViewBag.viewPageRecomActive = viewPageRecomActive;
            ViewBag.viewPageSnsPrActive = viewPageSnsPrActive;
            ViewBag.HardCodingAdList    = new NewsAdService.NewsAdServiceClient().GetHardCodingAdList().ListData;

            articleIdList.Add(articleId);

            return View(newsRead);
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
                    Height = "126"
                };

            }
            else
            {
                chart5DayConditionObj = new HpCondition();
            }

            return View(data);
        }

        /// <summary>
        /// 뉴스 상세 베스트 포토
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadBestPhotoNews()
        {
            //인기 포토  
            List<NUP_NEWS_MAIN_SECTION_SELECT_Result> model = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 30, articleIdList.ToArray()).ListData;

            model = model.Take(12).ToList();

            //인기포토 articleIdList ADD

            foreach (var item in model)
            {


                articleIdList.Add(item.ARTICLEID.Trim());
            }

            return View(model);
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
            }

            ViewBag.ReporterId = condition.SearchText;
            ViewBag.Tag = TagVal;
            ViewBag.HtmlTag = HtmlTag;

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
            return Json(new { NewsPrevNext = newsPrevNext }, JsonRequestBehavior.AllowGet);
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
        /// 관련뉴스
        /// </summary>
        /// <returns></returns>
        [OutputCache(Duration = 5 * 60)]
        public ActionResult ReadRelationNews()
        {
            string articleId = Request["articleId"];

            List<NUP_NEWS_READ_RELATION_SELECT_Result> model = new NewsCenterService.NewsCenterServiceClient().GetNewsReadRelationList(articleId, articleIdList.ToArray()).ListData.Take(5).ToList();

            foreach (var item in model)
            {
                articleIdList.Add(item.ARTICLE_ID.Trim());
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
        /// 인기 갤러리
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadPhotoNews()
        {
            string articleId = Request["articleId"];

            articleIdList.Add(articleId);

            var model = new NewsMainServiceClient().GetNewsMainSectionList("BEST_PHOTO", 30, articleIdList.ToArray()).ListData;

            model = model.Take(18).ToList();

            //인기 갤러리 기사 articleIdList ADD
            foreach (var item in model)
            {
                articleIdList.Add(item.ARTICLEID.Trim());
            }

            return View(model);
        }
        
        /// <summary>
        /// 추천뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult ReadRecomNews()
        {
            return View();
        }

        /// <summary>
        /// 많이 본 뉴스
        /// </summary>
        /// <returns></returns>
        public ActionResult ManySee()
        {
            List<String> articleIdList = new List<String>();

            var model = new NewsMainModel
            {
                //많이본 뉴스[종합]
                NewsTotalCountList = new NewsMainServiceClient().GetNewsMainSectionList("ALL", 20, articleIdList.ToArray()).ListData,
            };

            foreach(var item in model.NewsTotalCountList)
            {
                articleIdList.Add(item.ARTICLEID);
            }

            //많이본 뉴스[연예.스포츠]
            model.NewsEntSpoCountList = new NewsMainServiceClient().GetNewsMainSectionList("ENT_SPO", 20, articleIdList.ToArray()).ListData;

            return View(model);
        }

        public ActionResult ArticleComment(string articleId)
        {
            ViewBag.ArticleId = articleId;
            return View();
        }

        public ActionResult SearchArtComment(CommentCondition condition)
        {
            var resultData = new NewsCmtManageServiceClient().GetCommentList(condition);

            ViewBag.Condition = condition;
            return View(resultData);
        }

        /// <summary>
        /// 댓글 저장
        /// </summary>
        /// <returns></returns>
        [ValidateInput(false)]
        public ActionResult SaveComment(NTB_ARTICLE_COMMENT model)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                if (LoginHandler.IsLogin)
                {
                    new NewsCmtManageServiceClient().SaveComment(model, LoginHandler.CurrentLoginUser);
                }
                else
                {
                    if (LoginHandler.IsEasyLogin)
                    {
                        new NewsCmtManageServiceClient().SaveComment(model, LoginHandler.CurrentEasyLoginUser);
                    }
                }
                
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        public ActionResult DeleteComment(int commentId)
        {
            bool isSuccess = false;
            string msg = "";

            try
            {
                new NewsCmtManageServiceClient().DeleteComment(commentId);
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return Json(new { isSuccess = isSuccess, msg = msg });
        }

        /// <summary>
        /// 생활.문화 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult LifeList()
        {
            return View();
        }

        /// <summary>
        /// 생활.문화 리스트
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelList(NewsCenterCondition condition)
        {
            ListModel<ArticleClass_Hanatour> resultData = new TravelServiceClient().TravelList(condition);

            ViewBag.TotalDataCount = resultData.TotalDataCount;

            var model = resultData.ListData;

            return View(model);
        }


        /// <summary>
        /// 여행 > 상세 정보
        /// </summary>
        /// <returns></returns>
        public ActionResult TravelRead()
        {
            #region 뉴스 상세 페이지 설정 정보
            string viewPageLikeActive  = "Y";     // 인기겔러리
            string viewPageSeeActive   = "Y";     // 이기사와 많이본 기사
            string viewPageRecomActive = "Y";     // 당신에게 맞는 추천 뉴스
            string viewPageSnsPrActive = "Y";     // SNS 홍보 팝업
            #endregion

            string articleId = Request["articleId"];

            ArticleClass_Hanatour model = new ArticleClass_Hanatour();

            if (!string.IsNullOrEmpty(articleId))
            {
                //기사 상세 내용
                model = new TravelServiceClient().GetTravelReadInfo(articleId);

                #region 뉴스 상세 페이지 설정 정보

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
                            viewPageSnsPrActive = viewPageManageInfo.SNS_PR_YN;
                        }
                    }
                }
                #endregion
            }

            ViewBag.viewPageLikeActive  = viewPageLikeActive;
            ViewBag.viewPageSeeActive   = viewPageSeeActive;
            ViewBag.viewPageRecomActive = viewPageRecomActive;
            ViewBag.viewPageSnsPrActive = viewPageSnsPrActive;
            ViewBag.HardCodingAdList    = new NewsAdService.NewsAdServiceClient().GetHardCodingAdList().ListData;

            articleIdList.Add(articleId);

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