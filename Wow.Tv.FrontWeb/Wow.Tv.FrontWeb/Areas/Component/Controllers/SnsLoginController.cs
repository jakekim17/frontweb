using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Wow.Tv.Middle.Model.Common;
using Wow.Tv.Middle.Model.Db89.wowbill;

namespace Wow.Tv.FrontWeb.Areas.Component.Controllers
{
    public class SnsLoginController : Controller
    {
        // GET: Component/Sns
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 카카오 정보 및 연결여부 리턴
        /// </summary>
        /// <returns></returns>
        public ActionResult GetKakaoUserInfoExists()
        {
            string callbackMessage = Request["callbackMessage"];
            JavaScriptSerializer parser = new JavaScriptSerializer();
            KakaoLoginResult serializedCallbackMessabe = parser.Deserialize<KakaoLoginResult>(callbackMessage);

            string url = "https://kapi.kakao.com/v1/user/me";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "POST";
            req.Headers.Add("Accept-Language", "UTF-8");
            req.Headers.Add("Authorization", "Bearer " + serializedCallbackMessabe.access_token);

            string contents = "";
            bool isSuccess = false;
            string returnMessage = "";
            HttpStatusCode statusCode = HttpStatusCode.NotImplemented;
            string statusDescription = "";

            string data = "propertyKeys=[\"id\",\"name\",\"kaccount_email\"]";
            byte[] bytes = Encoding.ASCII.GetBytes(data);
            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(bytes, 0, bytes.Length);
            }

            using (HttpWebResponse res = (HttpWebResponse)req.GetResponse())
            {
                statusCode = ((HttpWebResponse)res).StatusCode;
                statusDescription = ((HttpWebResponse)res).StatusDescription;
                if (statusCode == HttpStatusCode.OK)
                {
                    Stream dataStream = res.GetResponseStream();
                    StreamReader reader = new StreamReader(dataStream, System.Text.Encoding.GetEncoding("UTF-8"), true);
                    contents = reader.ReadToEnd();
                    isSuccess = true;
                }
                else
                {
                    returnMessage = statusDescription;
                }
            }

            KakaoInfoResult apiResult = new KakaoInfoResult();
            tblUserSNSKakao kakaoUserInfo = null;
            bool snsExists = false;

            if (isSuccess == true)
            {
                if (string.IsNullOrEmpty(contents) == false)
                {
                    apiResult = parser.Deserialize<KakaoInfoResult>(contents);
                    isSuccess = true;

                    int? userNumber = null;
                    if (LoginHandler.IsLogin == true)
                    {
                        userNumber = LoginHandler.CurrentLoginUser.UserNumber;
                    }

                    kakaoUserInfo = new MemberInfoService.MemberInfoServiceClient().GetKakaoUserInfoExists(userNumber, apiResult.id);
                    if (kakaoUserInfo != null)
                    {
                        snsExists = true;
                    }
                }
                else
                {
                    isSuccess = false;
                    returnMessage = "NO_CONTENTS";
                }
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnMessage = "",
                Email = apiResult.kaccount_email,
                EmailVerified = apiResult.kaccount_email_verified,
                Id = apiResult.id,
                Nickname = apiResult.properties.nickname,
                Exists = snsExists
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 페이스북 정보 및 연결여부 리턴
        /// </summary>
        /// <returns></returns>
        public ActionResult GetFacebookUserInfoExists()
        {
            long facebookId = long.Parse(Request["facebookId"]);
            string callbackMessage = Request["callbackMessage"];
            bool isSuccess = false;
            string returnMessage = "";

            tblUserSNSFacebook facebookUserInfo = null;
            bool snsExists = false;

            if (string.IsNullOrEmpty(callbackMessage) == false)
            {
                isSuccess = true;
                int? userNumber = null;
                if (LoginHandler.IsLogin == true)
                {
                    userNumber = LoginHandler.CurrentLoginUser.UserNumber;
                }

                facebookUserInfo = new MemberInfoService.MemberInfoServiceClient().GetFacebookUserInfoExists(userNumber, facebookId);
                if (facebookUserInfo != null)
                {
                    snsExists = true;
                }
            }
            else
            {
                isSuccess = false;
                returnMessage = "NO_CONTENTS";
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnMessage = returnMessage,
                Email = facebookUserInfo?.email,
                Id = facebookUserInfo?.id,
                Name = facebookUserInfo?.name,
                Exists = snsExists
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 네이버 정보 및 연결여부 리턴
        /// </summary>
        /// <returns></returns>
        public ActionResult GetNaverUserInfoExists()
        {
            long naverId = long.Parse(Request["naverId"]);
            bool isSuccess = true;
            string returnMessage = "";

            tblUserSNSNaver naverUserInfo = null;
            bool snsExists = false;

            int? userNumber = null;
            if (LoginHandler.IsLogin == true)
            {
                userNumber = LoginHandler.CurrentLoginUser.UserNumber;
            }

            naverUserInfo = new MemberInfoService.MemberInfoServiceClient().GetNaverUserInfoExists(userNumber, naverId);
            if (naverUserInfo != null)
            {
                isSuccess = false;
                snsExists = true;
            }

            return Json(new
            {
                IsSuccess = isSuccess,
                ReturnMessage = returnMessage,
                Email = naverUserInfo?.email,
                Id = naverUserInfo?.id,
                Name = naverUserInfo?.name,
                Exists = snsExists
            }, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 네이버 호출 후 리턴
        /// </summary>
        /// <returns></returns>
        public ActionResult NaverLoginCallback()
        {
            return View();
        }
    }
}