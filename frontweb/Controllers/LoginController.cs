using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Fx;
using Wow.Tv.FrontWeb.App_Start;
using Wow.Tv.FrontWeb.MemberLoginService;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db89.wowbill;

namespace Wow.Tv.FrontWeb.Controllers
{
    public class LoginController : BaseController
    {
        public ActionResult EncryptCheck()
        {
            string password = Request["password"];
            string[] encList = new MemberLoginService.LoginServiceClient().EncryptCheck(password);
            return new EmptyResult();
        }

        public ActionResult LoginTest()
        {
            return View();
        }

        public ActionResult LoginTestProc()
        {
            string userId = Request["txtUserId"];
            tblUser user = new MemberLoginService.LoginServiceClient().LoginCheckTest(userId);
            bool isSuccess = false;
            string returnMessage = "";
            string sharePassword = "";
            bool historyBack = false;
            string returnUrl = Request["txtReturnUrl"];
            if (string.IsNullOrEmpty(returnUrl) == true)
            {
                returnUrl = System.Configuration.ConfigurationManager.AppSettings["DomainUrlFront"];
            }

            if (user != null)
            {
                if (user.apply == false)
                {
                    returnMessage = "승인되지 않은 회원입니다.";
                    historyBack = true;
                }
                else if (user.IsBlackList == true)
                {
                    returnMessage = user.AlertText;
                    historyBack = true;
                }
                else if (user.IsHumanUser == true)
                {
                    returnMessage = "휴먼회원입니다.";
                }
                else
                {
                    isSuccess = true;
                }
            }
            else
            {
                returnMessage = "정보가 일치하지 않습니다.";
                historyBack = true;
            }

            if (isSuccess == true)
            {
                // 세션 설정 ------------------------------------------------------------
                LoginUserInfo loginUser = new LoginUserInfo();
                loginUser.UserId = user.userId;
                loginUser.UserNumber = user.userNumber;
                loginUser.UserName = user.name;
                loginUser.NickName = user.NickName;
                loginUser.Email = user.email;
                loginUser.LoginDate = DateTime.Now;
                loginUser.Ip = ClientIp;

                LoginDomain loginFrom = LoginDomain.IdPw;
                try { loginFrom = (LoginDomain)int.Parse(Request["loginFrom"]); } catch { }
                loginUser.LoginFrom = loginFrom;

                LoginHandler.SetCurrentLoginUser(loginUser);
                new MemberLoginService.LoginServiceClient().LoginLog(user.userNumber, ClientIp);

                // 비밀번호 변경이 필요한 경우
                if (user.RequiredPasswordChange == true)
                {
                    returnMessage = "보다 안전한 서비스 이용 및 회원님의 정보 보호를 위해 비밀번호를 변경해주세요.";
                }
            }

            ViewBag.LoginId = user?.userId;
            ViewBag.IsSuccess = isSuccess;
            ViewBag.ReturnMessage = returnMessage;
            ViewBag.ReturnUrl = returnUrl;
            ViewBag.SharePassword = sharePassword;
            ViewBag.HistoryBack = historyBack;

            return View();
        }

        /// <summary>
        /// 타 사이트 로그인 시 세션유지를 위한 로그인 처리
        /// </summary>
        /// <returns></returns>
        public ActionResult LoginProcSSO()
        {
            string encryptedUserId = Request["p2"];
            string encryptedPassword = Request["p1"];

            if (string.IsNullOrEmpty(encryptedUserId) == false && string.IsNullOrEmpty(encryptedPassword) == false)
            {
                tblUser user = new MemberLoginService.LoginServiceClient().LoginCheckEncrypt(encryptedUserId, encryptedPassword);

                if (user != null)
                {
                    // 세션 설정 ------------------------------------------------------------
                    LoginUserInfo loginUser = new LoginUserInfo();
                    loginUser.UserId = user.userId;
                    loginUser.UserNumber = user.userNumber;
                    loginUser.UserName = user.name;
                    loginUser.NickName = user.NickName;
                    loginUser.Email = user.email;
                    loginUser.LoginFrom = LoginDomain.Membership;
                    loginUser.LoginDate = DateTime.Now;
                    loginUser.Ip = ClientIp;

                    tblUserSNSKakao kakaoInfo = new MemberInfoService.MemberInfoServiceClient().GetKakaoUserInfo(user.userNumber);
                    tblUserSNSNaver naverInfo = new MemberInfoService.MemberInfoServiceClient().GetNaverUserInfo(user.userNumber);
                    tblUserSNSFacebook facebookInfo = new MemberInfoService.MemberInfoServiceClient().GetFacebookUserInfo(user.userNumber);

                    loginUser.KakaoInfo.Id = kakaoInfo?.id;
                    loginUser.KakaoInfo.Nickname = kakaoInfo?.nickname;
                    loginUser.KakaoInfo.Email = kakaoInfo?.email;

                    loginUser.NaverInfo.Id = naverInfo?.id;
                    loginUser.NaverInfo.Name = naverInfo?.name;
                    loginUser.NaverInfo.Email = naverInfo?.email;

                    loginUser.FacebookInfo.Id = facebookInfo?.id;
                    loginUser.FacebookInfo.Name = facebookInfo?.name;
                    loginUser.FacebookInfo.Email = facebookInfo?.email;

                    LoginHandler.SetCurrentLoginUser(loginUser);

                    bool loginFromConverted = false;
                    LoginDomain loginFrom = LoginDomain.IdPw;
                    try { loginFrom = (LoginDomain)int.Parse(Request["loginfrom"]); loginFromConverted = true; } catch { }
                    string webFrom = loginFromConverted == true ? "MEMBER" : "OUT";
                    string webServerName = System.Net.Dns.GetHostName();
                    LoginServiceClient loginService = new LoginServiceClient();
                    //loginService.LoginLog(user.userNumber, ClientIp);
                    loginService.DomainLoginLog(user.userNumber, user.userId, "PC", webFrom, webServerName, "FRONT", DateTime.Now, ClientIp, Request.Url.AbsoluteUri);

                    return Content("[SSO로그인] Result: Success, EncryptedUserId: " + encryptedUserId + ", NormalEncryptedPassword: " + encryptedPassword);
                }
                else
                {
                    WowLog.Write("[SSO로그인] Result: Failed, EncryptedUserId: " + encryptedUserId + ", NormalEncryptedPassword: " + encryptedPassword);
                    return Content("[SSO로그인] Result: Failed, EncryptedUserId: " + encryptedUserId + ", NormalEncryptedPassword: " + encryptedPassword);
                }
            }
            else
            {
                WowLog.Write("[SSO로그인] Result: Empty, EncryptedUserId: " + encryptedUserId + ", NormalEncryptedPassword: " + encryptedPassword);
                return Content("[SSO로그인] Result: Empty, EncryptedUserId: " + encryptedUserId + ", NormalEncryptedPassword: " + encryptedPassword);
            }
        }

        [WowTvFrontAuthorizeAttribute(IsLogin = true)]
        public ActionResult LoginAuthTest()
        {
            return View();
        }

        /// <summary>
        /// 정식 로그인 처리
        /// </summary>
        /// <returns></returns>
        public ActionResult LoginProc()
        {
            string returnUrl = "";

            LoginDomain loginFrom = LoginDomain.IdPw;
            try { loginFrom = (LoginDomain)int.Parse(Request["hidLoginFrom"]); } catch { }

            string snsCallback = Request["hidSnsCallback"];
            string loginId = Request["hidLoginId"];

            // 로그인 체크 ----------------------------------------------------------
            bool isSuccess = false;
            string returnMessage = "";
            string shareUserId = "";
            string sharePassword = "";
            bool historyBack = false;

            tblUser user = null;
            if (loginFrom == LoginDomain.IdPw)
            {
                string password = Request["hidPassword"];
                user = new MemberLoginService.LoginServiceClient().LoginCheck(loginId, password);
            }
            else if (loginFrom == LoginDomain.Kakao)
            {
                long kakaoId = long.Parse(Request["hidKakaoId"]);
                string kakaoEmail = Request["hidKakaoEmail"];
                string kakaoNickname = Request["hidKakaoNickname"];
                user = new MemberLoginService.LoginServiceClient().LoginCheckByKakao(kakaoId, kakaoEmail, kakaoNickname);
                loginId = user?.userId;
            }
            else if (loginFrom == LoginDomain.Facebook)
            {
                long facebookId = long.Parse(Request["hidFacebookId"]);
                string facebookEmail = Request["hidFacebookEmail"];
                string facebookName = Request["hidFacebookName"];
                user = new MemberLoginService.LoginServiceClient().LoginCheckByFacebook(facebookId, facebookEmail, facebookName);
                loginId = user?.userId;
            }
            else if (loginFrom == LoginDomain.Naver)
            {
                long naverId = long.Parse(Request["hidNaverId"]);
                string naverEmail = Request["hidNaverEmail"];
                string naverName = Request["hidNaverName"];
                user = new MemberLoginService.LoginServiceClient().LoginCheckByNaver(naverId, naverEmail, naverName);
                loginId = user?.userId;
            }

            if (user != null)
            {
                if (user.apply == false)
                {
                    returnMessage = "승인되지 않은 회원입니다.";
                    historyBack = true;
                }
                else if (user.IsBlackList == true)
                {
                    returnMessage = user.AlertText;
                    historyBack = true;
                }
                else if (user.IsHumanUser == true)
                {
                    returnMessage = "휴면 회원 입니다.";
                    historyBack = true;
                }
                else
                {
                    isSuccess = true;
                }
            }
            else
            {
                returnMessage = "정보가 일치하지 않습니다.";
                historyBack = true;
            }

            if (isSuccess == true)
            {
                // 세션 설정 ------------------------------------------------------------
                LoginUserInfo loginUser = new LoginUserInfo();
                loginUser.UserId = user.userId;
                loginUser.UserNumber = user.userNumber;
                loginUser.UserName = user.name;
                loginUser.NickName = user.NickName;
                loginUser.Email = user.email;
                loginUser.LoginFrom = loginFrom;
                loginUser.LoginDate = DateTime.Now;
                loginUser.Ip = ClientIp;

                tblUserSNSKakao kakaoInfo = new MemberInfoService.MemberInfoServiceClient().GetKakaoUserInfo(user.userNumber);
                tblUserSNSNaver naverInfo = new MemberInfoService.MemberInfoServiceClient().GetNaverUserInfo(user.userNumber);
                tblUserSNSFacebook facebookInfo = new MemberInfoService.MemberInfoServiceClient().GetFacebookUserInfo(user.userNumber);

                loginUser.KakaoInfo.Id = kakaoInfo?.id;
                loginUser.KakaoInfo.Nickname = kakaoInfo?.nickname;
                loginUser.KakaoInfo.Email = kakaoInfo?.email;

                loginUser.NaverInfo.Id = naverInfo?.id;
                loginUser.NaverInfo.Name = naverInfo?.name;
                loginUser.NaverInfo.Email = naverInfo?.email;

                loginUser.FacebookInfo.Id = facebookInfo?.id;
                loginUser.FacebookInfo.Name = facebookInfo?.name;
                loginUser.FacebookInfo.Email = facebookInfo?.email;

                LoginHandler.SetCurrentLoginUser(loginUser);

                string userName = LoginHandler.CurrentLoginUser.UserName;

                // 반환 URL 설정 --------------------------------------------------------
                string wowTvWebSiteUrl = System.Configuration.ConfigurationManager.AppSettings["WowTvWebSiteUrl"];

                shareUserId = user.ShareUserId;
                sharePassword = user.SharePassword;

                if (string.IsNullOrEmpty(Request["hidReturnUrl"]) == false)
                {
                    string returnUrlUpper = Request["hidReturnUrl"].ToUpper();

                    if (returnUrlUpper.IndexOf("HTTP://") > -1 || returnUrlUpper.IndexOf("HTTP://") > -1)
                    {
                        returnUrl = Request["hidReturnUrl"];
                    }
                    else
                    {
                        returnUrl = wowTvWebSiteUrl + Request["hidReturnUrl"];
                    }
                }
                else
                {// 기타
                    returnUrl = wowTvWebSiteUrl;
                }
            }

            ViewBag.LoginId = loginId;
            ViewBag.IsSuccess = isSuccess;
            ViewBag.ReturnMessage = returnMessage;
            ViewBag.ReturnUrl = returnUrl;
            ViewBag.ShareUserId = shareUserId;
            ViewBag.SharePassword = sharePassword;
            ViewBag.HistoryBack = historyBack;
            ViewBag.LoginFrom = loginFrom;

            return View();
        }

        /// <summary>
        /// 간편 로그인 처리
        /// </summary>
        /// <returns></returns>
        public ActionResult EasyLoginProc()
        {
            LoginDomain loginFrom = LoginDomain.IdPw;
            try { loginFrom = (LoginDomain)int.Parse(Request["hidLoginFrom"]); } catch { }

            tblUser user = null;
            LoginUserInfo loginUser = new LoginUserInfo();

            bool isSuccess = false;
            string returnMessage = "";
            string returnUrl = Request["hidReturnUrl"];

            if (loginFrom == LoginDomain.Kakao)
            {
                long kakaoId = long.Parse(Request["hidKakaoId"]);
                string kakaoEmail = Request["hidKakaoEmail"];
                string kakaoNickname = Request["hidKakaoNickname"];

                loginUser.KakaoInfo.Id = kakaoId;
                loginUser.KakaoInfo.Email = kakaoEmail;
                loginUser.KakaoInfo.Nickname = kakaoNickname;

                user = new MemberLoginService.LoginServiceClient().LoginCheckByKakao(kakaoId, kakaoEmail, kakaoNickname);

                isSuccess = true;
            }
            else if (loginFrom == LoginDomain.Facebook)
            {
                long facebookId = long.Parse(Request["hidFacebookId"]);
                string facebookEmail = Request["hidFacebookEmail"];
                string facebookName = Request["hidFacebookName"];

                loginUser.FacebookInfo.Id = facebookId;
                loginUser.FacebookInfo.Email = facebookEmail;
                loginUser.FacebookInfo.Name = facebookName;

                user = new MemberLoginService.LoginServiceClient().LoginCheckByFacebook(facebookId, facebookEmail, facebookName);

                isSuccess = true;
            }
            else if (loginFrom == LoginDomain.Naver)
            {
                long naverId = long.Parse(Request["hidNaverId"]);
                string naverEmail = Request["hidNaverEmail"];
                string naverName = Request["hidNaverName"];

                loginUser.NaverInfo.Id = naverId;
                loginUser.NaverInfo.Email = naverEmail;
                loginUser.NaverInfo.Name = naverName;

                user = new MemberLoginService.LoginServiceClient().LoginCheckByNaver(naverId, naverEmail, naverName);

                isSuccess = true;
            }

            if (isSuccess == true)
            {
                if (user != null)
                {
                    loginUser.UserId = user.userId;
                    loginUser.UserNumber = user.userNumber;
                    loginUser.UserName = user.name;
                    loginUser.NickName = user.NickName;
                    loginUser.Email = user.email;
                }
                loginUser.LoginFrom = loginFrom;
                loginUser.LoginDate = DateTime.Now;
                loginUser.Ip = ClientIp;

                LoginHandler.EasyLogin(loginUser);
            }
            else
            {
                returnMessage = "잘못된 접근입니다.";
            }

            ViewBag.IsSuccess = isSuccess;
            ViewBag.ReturnMessage = returnMessage;
            ViewBag.ReturnUrl = returnUrl;
            ViewBag.LoginFrom = loginFrom;

            return View(loginUser);
        }

        /// <summary>
        /// 타 사이트 로그인 시 세션유지를 위한 로그인 처리
        /// </summary>
        /// <returns></returns>
        public ActionResult EasyLoginProcSSO()
        {
            string p1 = Request["p1"];
            string p2 = Request["p2"];
            string p3 = Request["p3"];
            string p4 = Request["p4"];

            LoginUserInfo loginUser = new LoginUserInfo();
            tblUser user = null;
            LoginDomain loginFrom = (LoginDomain)int.Parse(p1);
            switch (loginFrom)
            {
                case LoginDomain.Naver:
                    loginUser.NaverInfo.Id = long.Parse(p2);
                    loginUser.NaverInfo.Name = p3;
                    loginUser.NaverInfo.Email = p4;
                    user = new MemberLoginService.LoginServiceClient().LoginCheckByNaver(loginUser.NaverInfo.Id.Value, loginUser.NaverInfo.Email, loginUser.NaverInfo.Name);
                    break;
                case LoginDomain.Kakao:
                    loginUser.KakaoInfo.Id = long.Parse(p2);
                    loginUser.KakaoInfo.Nickname = p3;
                    loginUser.KakaoInfo.Email = p4;
                    user = new MemberLoginService.LoginServiceClient().LoginCheckByKakao(loginUser.KakaoInfo.Id.Value, loginUser.KakaoInfo.Email, loginUser.KakaoInfo.Nickname);
                    break;
                case LoginDomain.Facebook:
                    loginUser.FacebookInfo.Id = long.Parse(p2);
                    loginUser.FacebookInfo.Name = p3;
                    loginUser.FacebookInfo.Email = p4;
                    user = new MemberLoginService.LoginServiceClient().LoginCheckByNaver(loginUser.FacebookInfo.Id.Value, loginUser.FacebookInfo.Email, loginUser.FacebookInfo.Name);
                    break;
            }

            if (user != null)
            {
                loginUser.UserId = user.userId;
                loginUser.UserNumber = user.userNumber;
                loginUser.UserName = user.name;
                loginUser.NickName = user.NickName;
                loginUser.Email = user.email;
            }

            loginUser.LoginFrom = loginFrom;
            loginUser.LoginDate = DateTime.Now;
            loginUser.Ip = ClientIp;

            LoginHandler.EasyLogin(loginUser);

            return new EmptyResult();
        }

        public ActionResult Logout()
        {
            LoginHandler.DisposeCurrentLoginUser();
            return Content("<script type=\"text/javascript\">location.href=\"" + System.Configuration.ConfigurationManager.AppSettings["DomainUrlFront"] + "\";</script>");
        }

        /// <summary>
        /// 로그아웃 (외부 요청시)
        /// </summary>
        /// <returns></returns>
        public ActionResult LogoutSSO()
        {
            string returnMessage;
            if (LoginHandler.IsLogin == true)
            {
                returnMessage = "[SSO 로그아웃 성공] : " + LoginHandler.CurrentLoginUser.UserId;
                LoginHandler.DisposeCurrentLoginUser();
            }
            else
            {
                returnMessage = "[SSO 로그아웃 대상없음] : 로그인 되어 있지 않음";
            }
            return Content(returnMessage);
        }

        public ActionResult IsLogin()
        {
            return Json(new { IsLogin = LoginHandler.IsLogin }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult IsEasyLogin()
        {
            return Json(new { IsEasyLogin = LoginHandler.IsEasyLogin }, JsonRequestBehavior.AllowGet);
        }
    }
}