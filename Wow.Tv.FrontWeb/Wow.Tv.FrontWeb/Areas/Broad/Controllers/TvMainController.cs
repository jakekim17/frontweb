using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Wow.Tv.Middle.Model.Db49.Article;
using Wow.Tv.Middle.Model.Db49.wownet;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.Broad;
using Wow.Tv.Middle.Model.Db90.DNRS;
using Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram;
using Wow.Tv.FrontWeb.Areas.Component.Models;

namespace Wow.Tv.FrontWeb.Areas.Broad.Controllers
{
    public class TvMainController : BaseController
    {
        static string[] TimeValue =  new string[] {"00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
        , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
        , "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
        , "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"};

        // GET: Broad/TvMain
        public ActionResult Index(string selectTime)
        {
            bool isHoliDay = false;
            int tempIndex = 0;
            int currentIndex = 0;
            int nowTimePx = 0; // -48;
            DateTime nowDate = DateTime.Now;
            //nowDate = new DateTime(2017, 10, 26, 1, 0, 0);
            string nowDateString = nowDate.ToString("HH:mm");
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            BroadWatchService.BroadWatchServiceClient broadWatchServiceClient = new BroadWatchService.BroadWatchServiceClient();

            if (String.IsNullOrEmpty(selectTime) == true)
            {
                selectTime = nowDateString;
            }
            //int timeIndex = Array.IndexOf(TimeValue, selectTime);

            int timeIndex = 0;
            for(int i = 0; i < TimeValue.Length; i++)
            {
                if(nowDateString.CompareTo(TimeValue[i]) >= 0)
                {
                    timeIndex = i;
                }
            }
            ViewBag.NowTimePx = (nowTimePx + (timeIndex * 24)).ToString();

            timeIndex = 0;
            for (int i = 0; i < TimeValue.Length; i++)
            {
                if (selectTime.CompareTo(TimeValue[i]) >= 0)
                {
                    timeIndex = i;
                }
            }
            ViewBag.SelectTimePx = (nowTimePx + (timeIndex * 24)).ToString();

            tempIndex = 0;
            var runDownList = newsProgramServiceClient.SearchListRunDown(nowDate.ToString("yyyy-MM-dd")).ToList();
            foreach(var item in runDownList)
            {
                if(item.IsFirst == true)
                {
                    item.TimePx = (nowTimePx + ((Array.IndexOf(TimeValue, item.RUN_START) + 1) * 24)).ToString();
                }
                if (item.IsRenewal == true)
                {
                    item.TimePx = (nowTimePx + ((Array.IndexOf(TimeValue, item.RUN_START) + 1) * 24)).ToString();
                }

                tempIndex++;
                if (item.RUN_START.CompareTo(selectTime) <= 0 && item.RUN_END.CompareTo(selectTime) > 0)
                {
                    currentIndex = tempIndex;
                }

                if (item.RUN_START.CompareTo(nowDateString) <= 0 && item.RUN_END.CompareTo(nowDateString) > 0)
                {
                    item.Status = "Ing";
                }
                else if (item.RUN_START.CompareTo(nowDateString) < 0)
                {
                    if(String.IsNullOrEmpty(item.BroadWatchStatus) == true)
                    {
                        item.Status = "Ready";
                    }
                }
                else if(item.RUN_START.CompareTo(nowDateString) > 0)
                {
                    item.Status = "After";
                }
            }
            currentIndex = currentIndex - 2;
            if(currentIndex < 0)
            {
                currentIndex = 0;
            }
            ViewBag.CurrentIndex = currentIndex;


            BroadWatchCondition broadWatchCondition = new BroadWatchCondition();
            broadWatchCondition.PublishYn = "Y";
            broadWatchCondition.PageSize = 3;

            var listModel = broadWatchServiceClient.SearchList(broadWatchCondition);
            ViewBag.BroadWatchList = listModel;


            isHoliDay = newsProgramServiceClient.IsHoliDayCheck();
            ViewBag.IsHoliDay = isHoliDay;



            // ==========================
            // 해당 시간대 방송


            string programStatusString = "";
            string programImageUrl = "/Content/Images/blank.gif";
            TvPlayerModel tvPlayerParameter = new TvPlayerModel();
            // 시간선택이 없는경우 현재라이브
            if (selectTime == nowDateString)
            {
                programStatusString = "방송중";
                tvPlayerParameter.PlayType = TvPlayTypeModel.LiveTv;
            }
            else // 시간선택의 경우
            {
                var runDown = runDownList.Where(a => a.RUN_START.CompareTo(selectTime) <= 0 && a.RUN_END.CompareTo(selectTime) >= 0).FirstOrDefault();
                if (runDown != null)
                {
                    //programInfo = newsProgramServiceClient.GetAt(runDown.PRG_CD);
                    NTB_ATTACH_FILE rectangleImage = newsProgramServiceClient.GetRectangleAttachFile(runDown.PRG_CD);

                    if (rectangleImage != null && String.IsNullOrEmpty(rectangleImage.REAL_WEB_PATH) == false)
                    {
                        programImageUrl = rectangleImage.REAL_WEB_PATH;
                    }
                }

                // 미래시간 선택시 해당시간의 프로그램 정보 획득
                if (selectTime.CompareTo(nowDateString) >= 0)
                {
                    programStatusString = "방송예정";
                    tvPlayerParameter.PlayType = TvPlayTypeModel.None;
                }
                else // 지난시간일 경우 다시보기에서 정보 취듯
                {
                    programStatusString = "준비중";
                    tvPlayerParameter.PlayType = TvPlayTypeModel.None;
                    if (runDown != null)
                    {
                        broadWatchCondition = new BroadWatchCondition();
                        broadWatchCondition.PublishYn = "Y";
                        broadWatchCondition.ProgramCode = runDown.PRG_CD;
                        broadWatchCondition.PageSize = 1;
                        var broadWatch = broadWatchServiceClient.SearchList(broadWatchCondition).ListData.FirstOrDefault();
                        if (broadWatch != null)
                        {
                            tvPlayerParameter.PlayType = TvPlayTypeModel.TvReplay;
                            tvPlayerParameter.Num = broadWatch.Num;
                            //tvPlayerParameter.Url = broadWatch.FilePath;
                        }
                    }
                }
            }

            ViewBag.TvPlayerParameter = tvPlayerParameter;
            ViewBag.ProgramStatusString = programStatusString;
            ViewBag.ProgramImageUrl = programImageUrl;

            // 해당 시간대 방송
            // ==========================


            // =========
            // 차이나

            string chinaVideoContent = new ChinaService.ChinaServiceClient().GetIssue();
            ViewBag.ChinaVideoContent = chinaVideoContent;

            // 차이나
            // =========

            return View(runDownList);
        }





        [OutputCache(Duration = 10 * 60)]
        public ActionResult PopularityNews()
        {
            List<string> temp = new List<string>();
            List<NUP_NEWS_MAIN_VOD_SELECT_Result> resultData = new NewsMainService.NewsMainServiceClient().GetNewsMainVodList("LATEST", 4, temp.ToArray()).ListData;
            //BroadWatchCondition condition = new BroadWatchCondition();
            //condition.UploadTimeGreater = DateTime.Now.AddDays(-7).ToString("yyyyMMdd");
            //condition.OrderByType = "Fame";
            //condition.PageSize = 4;

            //var listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(condition);

            //return View(listModel);
            return View(resultData);
        }



        //public ActionResult BroadWatch()
        //{
        //    BroadWatchCondition broadWatchCondition = new BroadWatchCondition();
        //    broadWatchCondition.PageSize = 3;

        //    var listModel = new BroadWatchService.BroadWatchServiceClient().SearchList(broadWatchCondition);

        //    return View(listModel);
        //}



        #region 종목/마켓

        [OutputCache(Duration = 5 * 60)]
        public ActionResult Stock()
        {
            var list = new BroadService.NewsProgramServiceClient().GetListStockVod().ToList();

            return View(list);
        }


        [OutputCache(Duration = 5 * 60)]
        public ActionResult Market()
        {
            var list = new BroadService.NewsProgramServiceClient().GetListMarket().ToList();

            return View(list);
        }

        #endregion


        #region 웹드라마

        public ActionResult WebDrama()
        {
            return View();
        }

        #endregion


        #region SNS 현장라이브

        [OutputCache(Duration = 5 * 60)]
        public ActionResult BroadLive()
        {
            NTB_BROAD_LIVE model = new NTB_BROAD_LIVE();
            BroadLiveCondition condition = new BroadLiveCondition();
            condition.PublishYn = "Y";
            var listModel = new BroadService.BroadLiveServiceClient().SearchListLive(condition);
            if(listModel.ListData.Count > 0)
            {
                model = listModel.ListData[0];
            }

            return View(model);
        }


        #endregion


        #region 최하단 전체목록
#if DEBUG
#else
        [OutputCache(Duration = 5 * 60)]
#endif
        public ActionResult ProgramList()
        {
            BroadService.NewsProgramServiceClient newsProgramServiceClient = new BroadService.NewsProgramServiceClient();
            BroadService.ProgramGroupServiceClient programGroupServiceClient = new BroadService.ProgramGroupServiceClient();

            NewsProgramCondition condition = new NewsProgramCondition();
            condition.PageSize = -1;
            condition.PublishYn = "Y";
            condition.MainBottomViewYn = "Y";
            condition.IngYn = "Y";

            BroadGroupCondition broadGroupCondition = new BroadGroupCondition();

            condition.BroadTypeCode = "Proc";
            var procList = newsProgramServiceClient.SearchList(condition);

            condition.BroadTypeCode = "After";
            var afterList = newsProgramServiceClient.SearchList(condition);

            // =======================================================================
            // -----------------------------------------------------------------------

            //condition.BroadTypeCode = "Spec";
            //var specList = newsProgramServiceClient.SearchList(condition);
            //foreach (var item in specList.ListData)
            //{
            //    var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
            //    if (programGroup != null)
            //    {
            //        item.PRG_NM = programGroup.GROUP_NAME;
            //    }
            //}

            //broadGroupCondition.programCodeList = specList.ListData.Select(a => a.PRG_CD).ToList();
            //var programGroupList = programGroupServiceClient.SearchListProgramGroup(broadGroupCondition);
            //foreach(var item in programGroupList.ListData)
            //{
            //    T_NEWS_PRG newsProgram = new T_NEWS_PRG();
            //    newsProgram.PRG_CD = item.MASTER_PRG_CD;
            //    newsProgram.PRG_NM = item.GROUP_NAME;

            //    specList.ListData.Add(newsProgram);
            //}

            // -----------------------------------------------------------------------
            // =======================================================================

            condition.BroadTypeCode = "";



            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "Stock";
            var stockList = newsProgramServiceClient.SearchList(condition);
            foreach(var item in stockList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if(programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }

            //broadGroupCondition.programCodeList = stockList.ListData.Select(a => a.PRG_CD).ToList();
            //programGroupList = programGroupServiceClient.SearchListProgramGroup(broadGroupCondition);
            //foreach (var item in programGroupList.ListData)
            //{
            //    T_NEWS_PRG newsProgram = new T_NEWS_PRG();
            //    newsProgram.PRG_CD = item.MASTER_PRG_CD;
            //    newsProgram.PRG_NM = item.GROUP_NAME;

            //    stockList.ListData.Add(newsProgram);
            //}

            // -----------------------------------------------------------------------
            // =======================================================================





            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "RealEstate";
            var realEstateList = newsProgramServiceClient.SearchList(condition);
            foreach (var item in realEstateList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }

            //broadGroupCondition.programCodeList = realEstateList.ListData.Select(a => a.PRG_CD).ToList();
            //programGroupList = programGroupServiceClient.SearchListProgramGroup(broadGroupCondition);
            //foreach (var item in programGroupList.ListData)
            //{
            //    T_NEWS_PRG newsProgram = new T_NEWS_PRG();
            //    newsProgram.PRG_CD = item.MASTER_PRG_CD;
            //    newsProgram.PRG_NM = item.GROUP_NAME;

            //    realEstateList.ListData.Add(newsProgram);
            //}

            // -----------------------------------------------------------------------
            // =======================================================================





            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "Insurance";
            var insuranceList = newsProgramServiceClient.SearchList(condition);
            foreach (var item in insuranceList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }

            //broadGroupCondition.programCodeList = insuranceList.ListData.Select(a => a.PRG_CD).ToList();
            //programGroupList = programGroupServiceClient.SearchListProgramGroup(broadGroupCondition);
            //foreach (var item in programGroupList.ListData)
            //{
            //    T_NEWS_PRG newsProgram = new T_NEWS_PRG();
            //    newsProgram.PRG_CD = item.MASTER_PRG_CD;
            //    newsProgram.PRG_NM = item.GROUP_NAME;

            //    insuranceList.ListData.Add(newsProgram);
            //}

            // -----------------------------------------------------------------------
            // =======================================================================





            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "PinTech";
            var pinTechList = newsProgramServiceClient.SearchList(condition);
            foreach (var item in pinTechList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }
            // -----------------------------------------------------------------------
            // =======================================================================



            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "LifeEconomy";
            var lifeEconomyList = newsProgramServiceClient.SearchList(condition);
            foreach (var item in lifeEconomyList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }
            // -----------------------------------------------------------------------
            // =======================================================================




            // =======================================================================
            // -----------------------------------------------------------------------

            condition.BroadSectionCode = "Special";
            var specList = newsProgramServiceClient.SearchList(condition);
            foreach (var item in specList.ListData)
            {
                var programGroup = programGroupServiceClient.GetAtByMainCode(item.PRG_CD);
                if (programGroup != null)
                {
                    item.PRG_NM = programGroup.GROUP_NAME;
                }
            }

            // -----------------------------------------------------------------------
            // =======================================================================


            ViewBag.ProcList = procList;
            ViewBag.AfterList = afterList;
            ViewBag.SpecList = specList;

            ViewBag.StockList = stockList;
            ViewBag.RealEstateList = realEstateList;
            ViewBag.InsuranceList = insuranceList;
            ViewBag.PinTechList = pinTechList;
            ViewBag.LifeEconomyList = lifeEconomyList;

            return View();
        }

        #endregion


        #region 프로그램구매

        public ActionResult ProgramBuy1()
        {
            return View();
        }
        public ActionResult ProgramBuy2()
        {
            return View();
        }
        [OutputCache(Duration = 30 * 60)]
        public ActionResult GetProgramListJson(string ingYn)
        {
            bool isSuccess = true;
            string msg = "";
            NewsProgramCondition condition = new NewsProgramCondition();
            List<KeyValuePair<string, string>> listData = new List<KeyValuePair<string, string>>();

            condition.PageSize = -1;
            condition.IngYn = ingYn;
            var list = new BroadService.NewsProgramServiceClient().SearchList(condition);
            foreach(var item in list.ListData)
            {
                KeyValuePair<string, string> keyValueItem = new KeyValuePair<string, string>(item.PRG_CD, item.PRG_NM);
                listData.Add(keyValueItem);
            }
            
            return Json(new { IsSuccess = isSuccess, Msg = msg, ListData = listData.OrderBy(a => a.Value) });
        }
        public ActionResult ProgramBuySave(TAB_PGM_ORDER model, HttpPostedFileBase uploadFile
            , string programName)
        {
            string uploadFilePath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            uploadFilePath = uploadFilePath + "\\TV\\Buy\\";
            uploadWebPath = uploadWebPath + "/TV/Buy/";
            string realFileName = "";
            NTB_ATTACH_FILE attachFile = null;

            if (uploadFile != null && uploadFile.ContentLength > 0)
            {
                attachFile = new NTB_ATTACH_FILE();
                attachFile.USER_UPLOAD_FILE_NAME = System.IO.Path.GetFileName(uploadFile.FileName);
                attachFile.EXTENSION = System.IO.Path.GetExtension(attachFile.USER_UPLOAD_FILE_NAME);
                attachFile.FILE_SIZE = uploadFile.ContentLength;
                realFileName = DateTime.Now.ToFileTime().ToString() + attachFile.EXTENSION;
                attachFile.REAL_FILE_PATH = uploadFilePath + realFileName;
                attachFile.REAL_WEB_PATH = uploadWebPath + realFileName;

                //if (System.IO.Directory.Exists(uploadFilePath) == false)
                //{
                //    System.IO.Directory.CreateDirectory(uploadFilePath);
                //}
                //uploadFile.SaveAs(attachFile.REAL_FILE_PATH);
                //Wow.Fx.CdnUploadHandler.FileUploadResultModel fileResult = new Wow.Fx.CdnUploadHandler().FileUpload(uploadFilePath, realFileName, uploadFile.InputStream);
                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadFilePath, realFileName, uploadFile.InputStream);

                model.FILE_PATH = attachFile.REAL_WEB_PATH;
            }

            model.PGM_NAME = programName;

            new BroadService.NewsProgramServiceClient().ProgramOrder(model, attachFile);

            return Json(new { IsSuccess = true, Msg = "" });
        }

        #endregion


        #region 공지사항/강연회/시청자의견

        public ActionResult Notice()
        {
            BroadService.NewsProgramServiceClient newsProgramService = new BroadService.NewsProgramServiceClient();
            List<NTB_BOARD_CONTENT> list1 = newsProgramService.GetNotice1().ToList();
            List<TAB_LECTURES_SCHEDULE> list2 = newsProgramService.GetNotice2().ToList();
            List<NTB_BOARD_CONTENT> list3 = newsProgramService.GetNotice3().ToList();

            ViewBag.List1 = list1;
            ViewBag.List2 = list2;
            ViewBag.List3 = list3;

            return View();
        }

        #endregion

    }
}