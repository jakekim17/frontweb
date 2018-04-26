using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wow.Tv.FrontWeb.Controllers;
using XdbNet;

namespace Wow.Tv.FrontWeb.Areas.Example.Controllers
{
    public class XecureController : BaseController
    {
        // GET: Example/Xecure
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Encrypt(string value)
        {

            try
            {
                xCrypto.RegisterEx("normal", 2, @"C:\\xecuredb\\conf\\xdsp_pool.properties", "pool1", "wowtv_db", "wowtv_owner", "wowtv_table", "normal");


                var encrypt = xCrypto.Encrypt("normal", value);
                return Json(new { EncryptValue = xCrypto.Encrypt("normal", value) });

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public ActionResult Decrypt(string decrypt)
        {

            try
            {
                xCrypto.RegisterEx("normal", 2, @"C:\\xecuredb\\conf\\xdsp_pool.properties", "pool1", "wowtv_db", "wowtv_owner", "wowtv_table", "normal");

                
                return Json(new { DecryptValue = xCrypto.Decrypt("normal", decrypt) });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
        }


    }
}