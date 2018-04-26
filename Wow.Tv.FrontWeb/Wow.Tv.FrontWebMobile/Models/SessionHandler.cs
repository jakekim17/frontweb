using System;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWebMobile.Models;
using Wow.Tv.Middle.Model.Common;

namespace Wow.Tv.FrontWebMobile.Models
{
    public class SessionHandler
    {
        #region 로그인
        /// <summary>
        /// 로그인 처리
        /// </summary>
        /// <param name="userInfo"></param>
        public static void Login(LoginUserInfo userInfo)
        {
            HttpContext.Current.Session["CurrentLoginUser"] = userInfo;
        }

        /// <summary>
        /// 로그아웃
        /// </summary>
        public static void Logout()
        {
            HttpContext.Current.Session["CurrentLoginUser"] = null;
        }

        /// <summary>
        /// 로그인 회원 정보
        /// </summary>
        public static LoginUserInfo CurrentLoginUser
        {
            get
            {
                LoginUserInfo loginUser = null;

                if (HttpContext.Current.Session["CurrentLoginUser"] != null)
                {
                    loginUser = (LoginUserInfo)HttpContext.Current.Session["CurrentLoginUser"];
                }

                return loginUser;
            }
            set
            {
                HttpContext.Current.Session["CurrentLoginUser"] = value;
            }
        }

        /// <summary>
        /// 로그인 여부
        /// </summary>
        public static bool IsLogin { get { if (HttpContext.Current.Session["CurrentLoginUser"] != null) { return true; } else { return false; } } }

        /// <summary>
        /// 로그인 페이지 이동
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        public static RedirectResult RedirectToLogin(string returnUrl = null)
        {
            string loginUrl = System.Configuration.ConfigurationManager.AppSettings["UserLoginUrl"];
            string encodedReturnUrl = "";
            if (string.IsNullOrEmpty(returnUrl) == true)
            {
                encodedReturnUrl = HttpUtility.UrlEncode(HttpContext.Current.Request.Url.AbsoluteUri);
            }
            else
            {
                encodedReturnUrl = HttpUtility.UrlEncode(returnUrl);
            }

            string retval = loginUrl + "?returnurl=" + encodedReturnUrl;
            RedirectResult redirect = new RedirectResult(retval);
            return redirect;
        }

        /// <summary>
        /// 로그인 실패 횟수 세션 저장
        /// </summary>
        public static void AddLoginFailCount()
        {
            if (HttpContext.Current.Session["LoginFailedCount"] == null)
            {
                HttpContext.Current.Session["LoginFailedCount"] = (int)0;
            }

            HttpContext.Current.Session["LoginFailedCount"] = (int)HttpContext.Current.Session["LoginFailedCount"] + 1;
        }

        /// <summary>
        /// 캡차 로그인 필요 여부
        /// </summary>
        /// <returns></returns>
        public static bool RequireCaptchaLogin()
        {
            if (HttpContext.Current.Session["LoginFailedCount"] == null)
            {
                return false;
            }
            else
            {
                int loginFailedCount = (int)HttpContext.Current.Session["LoginFailedCount"];
                return loginFailedCount > 5;
            }
        }
        #endregion


        public static void EasyLogin(LoginUserInfo userInfo)
        {
            HttpContext.Current.Session["CurrentEasyLoginUser"] = userInfo;
        }

        /// <summary>
        /// 간편로그인 여부
        /// </summary>
        public static bool IsEasyLogin { get { if (HttpContext.Current.Session["CurrentEasyLoginUser"] != null) { return true; } else { return false; } } }



        /// <summary>
        /// 탈퇴절차 설정
        /// </summary>
        /// <param name="passedStep"></param>
        public void SetSecessionStep(int passedStep)
        {
            if (passedStep == 0)
            {
                HttpContext.Current.Session["PassedSecessionStep"] = null;
            }
            else
            {
                HttpContext.Current.Session["PassedSecessionStep"] = passedStep;
            }
        }

        /// <summary>
        /// 탈퇴절차 확인
        /// </summary>
        /// <returns></returns>
        public int GetSecessionStep()
        {
            if (HttpContext.Current.Session["PassedSecessionStep"] == null)
            {
                return 0;
            }
            else
            {
                return (int)HttpContext.Current.Session["PassedSecessionStep"];
            }
        }

        /// <summary>
        /// 가입회원 DI 값 설정
        /// </summary>
        /// <param name="mobileAuthNo"></param>
        public void SetJoinDI(string mobileAuthNo)
        {
            HttpContext.Current.Session["JoinDI"] = mobileAuthNo;
        }

        /// <summary>
        /// 가입회원 DI 값 확인
        /// </summary>
        /// <returns></returns>
        public string GetJoinDI()
        {
            return HttpContext.Current.Session["JoinDI"] as string;
        }

        /// <summary>
        /// 가입회원 휴대폰번호 설정
        /// </summary>
        /// <param name="mobileAuthNo"></param>
        public void SetJoinMobileNo(string mobileNo)
        {
            HttpContext.Current.Session["JoinMobileNo"] = mobileNo;
        }

        /// <summary>
        /// 가입회원 휴대폰번호 확인
        /// </summary>
        /// <returns></returns>
        public string GetJoinMobileNo()
        {
            return HttpContext.Current.Session["JoinMobileNo"] as string;
        }

        /// <summary>
        /// 가입회원 휴대폰 인증번호 설정
        /// </summary>
        /// <param name="mobileAuthNo"></param>
        public void SetJoinMobileAuthNo(string mobileAuthNo)
        {
            HttpContext.Current.Session["JoinMobileAuthNo"] = mobileAuthNo;
        }

        /// <summary>
        /// 가입회원 휴대폰 인증번호 확인
        /// </summary>
        /// <returns></returns>
        public string GetJoinMobileAuthNo()
        {
            return HttpContext.Current.Session["JoinMobileAuthNo"] as string;
        }

        /// <summary>
        /// 가입회원 이름 확인
        /// </summary>
        /// <returns></returns>
        public string GetJoinName()
        {
            return HttpContext.Current.Session["JoinName"] as string;
        }

        /// <summary>
        /// 가입회원 이름 설정
        /// </summary>
        /// <param name="name"></param>
        public void SetJoinName(string name)
        {
            HttpContext.Current.Session["JoinName"] = name;
        }

        /// <summary>
        /// 가입회원 SSNo 값 설정
        /// </summary>
        /// <param name="mobileAuthNo"></param>
        public void SetJoinSSNo(string ssno)
        {
            HttpContext.Current.Session["JoinSSNo"] = ssno;
        }

        /// <summary>
        /// 가입회원 SSNo 값 확인
        /// </summary>
        /// <returns></returns>
        public string GetJoinSSNo()
        {
            return HttpContext.Current.Session["JoinSSNo"] as string;
        }

        /// <summary>
        /// 휴면회원 휴대폰 인증번호 설정
        /// </summary>
        /// <param name="mobileAuthNo"></param>
        public void SetAuthDormancyMobileAuthNo(string mobileAuthNo)
        {
            HttpContext.Current.Session["AuthDormancyMobileAuthNo"] = mobileAuthNo;
        }

        /// <summary>
        /// 휴면회원 휴대폰 인증번호 확인
        /// </summary>
        /// <returns></returns>
        public string GetAuthDormancyMobileAuthNo()
        {
            return HttpContext.Current.Session["AuthDormancyMobileAuthNo"] as string;
        }

        /// <summary>
        /// 이메일 설정
        /// </summary>
        /// <param name="email"></param>
        public void SetInfoEmail(string email)
        {
            HttpContext.Current.Session["InfoEmail"] = email;
        }

        /// <summary>
        /// 이메일 값 확인
        /// </summary>
        /// <returns></returns>
        public string GetInfoEmail()
        {
            return HttpContext.Current.Session["InfoEmail"] as string;
        }

        /// <summary>
        /// 회원정보수정 인증값 설정
        /// </summary>
        /// <param name="infoEditAuth"></param>
        public void SetInfoEditAuth(bool infoEditAuth)
        {
            HttpContext.Current.Session["InfoEditAuth"] = infoEditAuth;
        }

        /// <summary>
        /// 회원정보수정 인증값 확인
        /// </summary>
        /// <returns></returns>
        public bool GetInfoEditAuth()
        {
            if (HttpContext.Current.Session["InfoEditAuth"] == null)
            {
                return false;
            }
            else
            {
                return (bool)HttpContext.Current.Session["InfoEditAuth"];
            }
        }
    }
}