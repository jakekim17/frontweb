using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWeb.Areas.Component.Models;
using Wow.Tv.FrontWeb.MemberInfoService;
using Wow.Tv.FrontWeb.TvPlayerService;

namespace Wow.Tv.FrontWeb.Areas.Component.Controllers
{
    public class TvPlayerController : BaseController
    {
        public ActionResult TvPlayerTest()
        {
            return View();
        }

        /// <summary>
        /// 라이브 TV
        /// </summary>
        /// <returns></returns>
        public ActionResult PlayLiveTv()
        {
            if (LoginHandler.IsLogin == false)
            {
                return Content("<script type=\"text/javascript\">alert(\"로그인이 필요합니다.\"); window.close();</script>");
            }

            int userNumber = LoginHandler.CurrentLoginUser.UserNumber;
            DateTime now = new DateTime(2017, 11, 3, 8, 40, 0);
            //DateTime now = DateTime.Now;
            LiveTvInfoModel liveInfo = new TvPlayerService.TvPlayerServiceClient().LiveTvInfo(/*userNumber*/);
            MemberGradeModel memberGrade = new MemberInfoService.MemberInfoServiceClient().GetMemberGrade(userNumber);

            TvPlayerModel tvPlayerParameter = new TvPlayerModel();
            tvPlayerParameter.PlayType = TvPlayTypeModel.LiveTv;

            ViewBag.LiveInfo = liveInfo;
            ViewBag.MemberGrade = memberGrade;
            ViewBag.TvPlayerParameter = tvPlayerParameter;

            return View("PopupTvPlayer");
        }

        /// <summary>
        /// 라이브 Audio
        /// </summary>
        /// <returns></returns>
        public ActionResult PlayLiveAudio()
        {
            //if (LoginHandler.IsLogin == false)
            //{
            //    return Content("<script type=\"text/javascript\">alert(\"로그인이 필요합니다.\"); window.close();</script>");
            //}

            int userNumber = 0;

            if(LoginHandler.IsLogin == true)
            {
                userNumber = LoginHandler.CurrentLoginUser.UserNumber;
            }

            LiveTvInfoModel liveInfo = new TvPlayerService.TvPlayerServiceClient().LiveTvInfo(/*userNumber*/);
            MemberGradeModel memberGrade = new MemberInfoService.MemberInfoServiceClient().GetMemberGrade(userNumber);

            TvPlayerModel tvPlayerParameter = new TvPlayerModel();
            tvPlayerParameter.PlayType = TvPlayTypeModel.LiveAudio;

            ViewBag.LiveInfo = liveInfo;
            ViewBag.MemberGrade = memberGrade;
            ViewBag.TvPlayerParameter = tvPlayerParameter;

            return View("PopupTvPlayer");
        }

        /// <summary>
        /// TV 다시보기
        /// </summary>
        /// <returns></returns>
        public ActionResult PlayTvReplay()
        {
            int num;
            int.TryParse(Request["num"], out num);
            if (num <= 0)
            {
                return Content("<script type=\"text/javascript\">alert(\"잘못된 접근입니다.\"); window.close();</script>");
            }

            TvReplayInfoModel tvReplayInfo = new TvPlayerService.TvPlayerServiceClient().TvReplayInfo(num);
            if (tvReplayInfo == null)
            {
                return Content("<script type=\"text/javascript\">alert(\"프로그램 정보가 없습니다.\"); window.close();</script>");
            }
            //bool isSuccess = false;
            //bool hasPoint = false;
            //bool withAD = true;

            //int? userNumber = null;
            //string userId = null;
            //if (LoginHandler.IsLogin == true)
            //{
            //    userNumber = LoginHandler.CurrentLoginUser.UserNumber;
            //    userId = LoginHandler.CurrentLoginUser.UserId;
            //}

            //if (tvReplayInfo.Point <= 0)
            //{// 무료 시청인 경우

            //}
            //else
            //{// 유료 시청인 경우
            //    if (LoginHandler.IsLogin == false)
            //    {
            //        return Content("<script type=\"text/javascript\">alert(\"로그인이 필요합니다.\"); window.close();</script>");
            //    }

            //    // TV 다시보기 권한 정보
            //    TvReplayAuthorityInfoModel tvReplayAuthorityInfo = new MemberInfoService.MemberInfoServiceClient().GetTvReplayAuthorityInfo(userNumber.Value, num);
            //    if (tvReplayAuthorityInfo.MemberGrade == MemberGradeModel.GoldPlus ||
            //        tvReplayAuthorityInfo.MemberGrade == MemberGradeModel.Gold ||
            //        tvReplayAuthorityInfo.PointPaid == true)
            //    {// GoldPlus, Gold 회원인 경우, 또는 해당 프로그램 결재 시 시청 가능

            //        isSuccess = true;
            //        withAD = false;
            //    }
            //    else if (tvReplayAuthorityInfo.UserInfoExist == false)
            //    {
            //        return Content("<script type=\"text/javascript\">alert(\"사용자 정보가 없습니다.\"); window.close();</script>");
            //    }
            //    else
            //    {
            //        return Content("<script type=\"text/javascript\">alert(\"시청권한이 없습니다.\"); window.close();</script>");
            //    }

            //    hasPoint = tvReplayInfo.Point - tvReplayAuthorityInfo.WowCash >= 0; // 포인트 결재 가능 여부
            //}

            //if (isSuccess == true)
            //{
            //    new MemberCrmService.MemberCrmServiceClient().TvReplayUserLog(userNumber, userId, num, tvReplayInfo.ProgramId, tvReplayInfo.ProgramName, tvReplayInfo.BroadDate.Value, "TV");
            //}

            TvPlayerModel tvPlayerParameter = new TvPlayerModel();
            tvPlayerParameter.PlayType = TvPlayTypeModel.TvReplay;
            tvPlayerParameter.Num = num;

            ViewBag.TvReplayInfo = tvReplayInfo;
            ViewBag.TvPlayerParameter = tvPlayerParameter;


            return View("PopupTvPlayer");
        }

        /// <summary>
        /// 증권 영상
        /// </summary>
        /// <returns></returns>
        public ActionResult PlayVod()
        {
            int num;
            int.TryParse(Request["num"], out num);
            //string dep = Request["dep"];

            if (num <= 0/* || string.IsNullOrEmpty(dep) == true*/)
            {
                return Content("<script type=\"text/javascript\">alert(\"잘못된 접근입니다.\"); window.close();</script>");
            }

            VodInfoModel vodInfo = new TvPlayerService.TvPlayerServiceClient().VodInfo(num);

            TvPlayerModel tvPlayerParameter = new TvPlayerModel();
            tvPlayerParameter.PlayType = TvPlayTypeModel.Vod;
            tvPlayerParameter.Num = num;

            ViewBag.VodInfo = vodInfo;
            ViewBag.TvPlayerParameter = tvPlayerParameter;

            return View("PopupTvPlayer");
        }

        public ActionResult GetLiveTvInfo()
        {
            bool withAD = true;
            if (LoginHandler.IsLogin == true)
            {
                MemberGradeModel memberGrade = new MemberInfoService.MemberInfoServiceClient().GetMemberGrade(LoginHandler.CurrentLoginUser.UserNumber);
                if (memberGrade == MemberGradeModel.GoldPlus || memberGrade == MemberGradeModel.Gold)
                {
                    withAD = false;
                }
            }

            return Json(new
            {
                WithAD = withAD
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTvReplayInfo()
        {
            bool isSuccess = false;
            bool hasPoint = false;
            string returnCode = "";
            string url = "";
            int tvProgramPoint = 0;
            bool withAD = true;
            int? userNumber = null;
            string userId = null;
            string priceId = "";
            string tvProgramGubunCode = "";

            if (LoginHandler.IsLogin == true)
            {
                userNumber = LoginHandler.CurrentLoginUser.UserNumber;
                userId = LoginHandler.CurrentLoginUser.UserId;
            }

            int num;
            int.TryParse(Request["num"], out num);

            if (num <= 0)
            {
                returnCode = "NUM_ERROR";
            }
            else
            {
                // TV 다시보기 프로그램 정보
                TvReplayInfoModel tvReplayInfo = new TvPlayerService.TvPlayerServiceClient().TvReplayInfo(num);
                if (tvReplayInfo == null)
                {
                    returnCode = "INFO_ERROR";
                }
                else
                {
                    tvProgramPoint = tvReplayInfo.Point;
                    tvProgramGubunCode = tvReplayInfo.ProgramGubunCode;
                    DateTime? broadDate = null;
                    if (tvReplayInfo.BroadDate.HasValue == true)
                    {
                        broadDate = tvReplayInfo.BroadDate.Value;
                    }

                    if (tvReplayInfo.Point <= 0)
                    {// 무료 시청인 경우

                        isSuccess = true;
                        url = tvReplayInfo.Url;
                    }
                    else
                    {// 유료 시청인 경우

                        if (LoginHandler.IsLogin == false)
                        {
                            returnCode = "LOGIN_ERROR";
                        }
                        else
                        {
                            // TV 다시보기 권한 정보
                            TvReplayAuthorityInfoModel tvReplayAuthorityInfo = new MemberInfoService.MemberInfoServiceClient().GetTvReplayAuthorityInfo(userNumber.Value, num);
                            priceId = tvReplayAuthorityInfo.PriceId;

                            if (tvReplayAuthorityInfo.MemberGrade == MemberGradeModel.GoldPlus ||
                                tvReplayAuthorityInfo.MemberGrade == MemberGradeModel.Gold ||
                                tvReplayAuthorityInfo.PointPaid == true)
                            {// GoldPlus, Gold 회원인 경우, 또는 해당 프로그램 결재 시 시청 가능

                                isSuccess = true;
                                withAD = false;
                                url = tvReplayInfo.Url;
                            }
                            else
                            {
                                if (tvReplayAuthorityInfo.UserInfoExist == false)
                                {// 사용자정보 없음
                                    returnCode = "USER_INFO_NOT_EXISTS";
                                }
                                else
                                {// 시청권한 없음
                                    returnCode = "NO_AUTHORYT";
                                }
                                hasPoint = tvReplayAuthorityInfo.WowCash - tvReplayInfo.Point >= 0; // 포인트 결재 가능 여부
                            }
                        }
                    }

                    if (isSuccess == true)
                    {
                        // TV 다시보기 로그
                        new MemberCrmService.MemberCrmServiceClient().TvReplayUserLog(userNumber, userId, num, tvReplayInfo.ProgramId, tvReplayInfo.ProgramName, broadDate, "TV");
                    }
                }
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnCode = returnCode,
                HasPoint = hasPoint,
                Url = url,
                TvProgramPoint = tvProgramPoint,
                WithAD = withAD,
                PriceId = priceId,
                tvProgramGubunCode = tvProgramGubunCode 
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// TV 다시보기 포인트 결재
        /// </summary>
        /// <returns></returns>
        public ActionResult TvReplayPaymentByPoint()
        {
            bool isSuccess = false;
            string returnCode = "";

            if (LoginHandler.IsLogin == false)
            {
                returnCode = "LOGIN_ERROR";
            }
            else
            {
                int userNumber = LoginHandler.CurrentLoginUser.UserNumber;
                int num;
                int.TryParse(Request["num"], out num);

                if (num <= 0)
                {
                    returnCode = "NUM_ERROR";
                }
                else
                {
                    TvReplayPaymentByPointModel retval = new MemberInfoService.MemberInfoServiceClient().TvReplayPaymentByPoint(userNumber, num, ClientIp);
                    isSuccess = retval.PaymentSuccess;
                    if (isSuccess == false)
                    {
                        if (retval.UserInfoExist == false)
                        {
                            returnCode = "USER_INFO_NOT_EXISTS";
                        }
                        else if (retval.LowBalance == true)
                        {
                            returnCode = "LOW_BALANCE";
                        }
                    }
                }
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnCode = returnCode,
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetVodInfo()
        {
            bool isSuccess = false;
            string returnCode = "";
            bool withAD = true;
            int num;
            string url = "";

            int.TryParse(Request["num"], out num);
            if (num <= 0)
            {
                returnCode = "NUM_ERROR";
            }
            else
            {
                if (LoginHandler.IsLogin == true)
                {
                    int userNumber = LoginHandler.CurrentLoginUser.UserNumber;
                    MemberGradeModel memberGrade = new MemberInfoService.MemberInfoServiceClient().GetMemberGrade(userNumber);
                    if (memberGrade == MemberGradeModel.GoldPlus || memberGrade == MemberGradeModel.Gold)
                    {
                        withAD = false;
                    }
                }

                VodInfoModel vodInfo = new TvPlayerService.TvPlayerServiceClient().VodInfo(num);
                url = vodInfo.Url;

                isSuccess = true;
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnCode = returnCode,
                WithAD = withAD,
                Url = url
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VodAdTest()
        {
            return View();
        }

        public ActionResult TvPlayerIMGTech()
        {
            return View();
        }

        public ActionResult ConfirmMemGrade()
        {
            int userNumber = 0;

            if (LoginHandler.IsLogin == true)
            {
                userNumber = LoginHandler.CurrentLoginUser.UserNumber;
            }

            MemberGradeModel memberGrade = new MemberInfoService.MemberInfoServiceClient().GetMemberGrade(userNumber);
            return Json(new { memberGrade = memberGrade});
        }
    }
}