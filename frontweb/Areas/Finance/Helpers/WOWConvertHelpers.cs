using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.FrontWeb.Areas.Finance.Helpers
{
    public static class WOWConvertHelpers
    {
        public static MvcHtmlString MarketTimeStatus(this HtmlHelper helper)
        {
            DateTime currentTime = DateTime.Now;
            //DateTime currentTime = new DateTime(2017, 8, 16, 13, 0, 0);
            DateTime startTime = new DateTime(Int32.Parse(currentTime.Year.ToString()), Int32.Parse(currentTime.Month.ToString()), Int32.Parse(currentTime.Day.ToString()), 9, 0, 0);
            DateTime endTime = new DateTime(Int32.Parse(currentTime.Year.ToString()), Int32.Parse(currentTime.Month.ToString()), Int32.Parse(currentTime.Day.ToString()), 15, 30, 0);

            TagBuilder tb = new TagBuilder("span");

            string tempStr = currentTime.Hour > 12 ? "오후" : "오전";

            if ((DateTime.Compare(startTime, currentTime) < 0) && (DateTime.Compare(endTime, currentTime) >= 0))
            {
                tb.InnerHtml = string.Format("{0:yyyy-MM-dd} {1} {2:hh:mm:ss} 장중", currentTime, tempStr, currentTime);
            }
            else
            {
                tb.InnerHtml = string.Format("{0:yyyy-MM-dd} {1} {2:hh:mm:ss} 장마감", currentTime, tempStr, currentTime);
            }

            //tb.InnerHtml = "시작시간: " + startTime.ToString() + "/ 현재시간 : " + currentTime.ToString() + "/종료시간 : " + endTime.ToString();

            return new MvcHtmlString(tb.ToString());
        }

        public static MvcHtmlString CurrentTimeFormat(this HtmlHelper helper, string localTimeStr)
        {
            DateTime localTime = Convert.ToDateTime(localTimeStr);
            String resultTimeStr = localTime.ToString("yyyy-MM-dd HH:mm:ss");
            //string tempStr = localTime.Hour > 12 ? "오후" : "오전";
            //String resultTimeStr = String.Format("{0:yyyy-MM-dd} {1} {2:hh:mm:ss}", localTime, tempStr, localTime);
            return new MvcHtmlString(resultTimeStr);
        }

        public static MvcHtmlString CurrentTimeFormat(this HtmlHelper helper)
        {
            string currentTimeStr = String.Format("{0:yyyy-MM-dd} {1} {2:hh:mm:ss}", DateTime.Now, DateTime.Now.Hour > 12 ? "오후" : "오전", DateTime.Now);
            return new MvcHtmlString(currentTimeStr);
        }

        public static MvcHtmlString PlusSimbolConvert(this HtmlHelper helper, string convertStr)
        {
            int tempNum;
            string rtnStr = convertStr.Replace(",", "");

            if (Int32.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "+" + tempNum.ToString("#,##0") + "억";
                }
                else if (tempNum == 0)
                {
                    rtnStr = tempNum.ToString("#,##0");
                }
                else
                {
                    rtnStr = tempNum.ToString("#,##0") + "억";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString PlusSimbolChgRate(this HtmlHelper helper, string convertStr)
        {
            float tempNum;
            string rtnStr = convertStr.Replace("%", "");

            if (float.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "+" + tempNum.ToString() + "%";
                }
                else if (tempNum == 0)
                {
                    rtnStr = rtnStr.ToString() + "%";
                }
                else
                {
                    rtnStr = tempNum.ToString() + "%";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString ChgTypeArrowFormat(this HtmlHelper helper, string convertStr)
        {
            string rtnStr;

            switch (convertStr)
            {
                case "2":
                    rtnStr = "▲";
                    break;
                case "5":
                    rtnStr = "▼";
                    break;
                default:
                    rtnStr = "";
                    break;
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString CommaFormat(this HtmlHelper helper, int? convertVal)
        {
            int rtnVal = convertVal ?? 0;

            return new MvcHtmlString(rtnVal.ToString("#,##0"));
        }

        public static MvcHtmlString CommaFormat(this HtmlHelper helper, long? convertVal)
        {
            long rtnVal = convertVal ?? 0;
            return new MvcHtmlString(rtnVal.ToString("#,##0"));
        }

        public static MvcHtmlString CommaFormat(this HtmlHelper helper, string convertStr)
        {
            string rtnStr = String.Format("{0:#,##0}", Convert.ToDecimal(convertStr));
            return new MvcHtmlString(rtnStr);
        }

        //public static MvcHtmlString UpperHoldRateFormat(this HtmlHelper helper, string convertStr)
        //{
        //    string rtnStr = String.Format("{0:#,##0}", Convert.ToDecimal(convertStr.Replace("%", ""))) + "%";
        //    return new MvcHtmlString(rtnStr);
        //}

        public static MvcHtmlString PublishPriceMiddleFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if(chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up price-stock middleStockData'>" + convertStr + "</span>";
            }
            else if(chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down price-stock middleStockData'>" + convertStr + "</span>";
            }
            else
            {
                resultStr = "<span class='number price-stock middleStockData'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockDetailPriceMiddleFormat(this HtmlHelper helper, string chgTypeStr, int? convertVal)
        {
            string resultStr;
            int tmp = convertVal ?? 0;

            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else
            {
                resultStr = "<span class='number middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailPriceFormat(this HtmlHelper helper, string chgTypeStr, int? convertVal)
        {
            string resultStr;
            int tmp = convertVal ?? 0;

            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else
            {
                resultStr = "<span class='number'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailSigaTotalFormat(this HtmlHelper helper, long? list_sum)
        {
            string resultStr;
            long tmpListSum = list_sum ?? 0;
            decimal tmpListSumNum = Math.Round(Convert.ToDecimal(tmpListSum) / 100000000);
            
            resultStr = String.Format("{0:#,##0}", tmpListSumNum);
            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockDetailBalhangStockFormat(this HtmlHelper helper, long? list_sum)
        {
            string resultStr;
            long tmpListSum = list_sum ?? 0;
            decimal tmpListSumNum = Math.Round(Convert.ToDecimal(tmpListSum) / 10000);
            resultStr = String.Format("{0:#,##0}", tmpListSumNum);
            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockDetailVolumeFormat(this HtmlHelper helper, long? net_vol)
        {
            string resultStr;
            long tmpNetVol = net_vol ?? 0;
            if (tmpNetVol > 1000000)
            {
                decimal tmpNum = Math.Round(Convert.ToDecimal(tmpNetVol) / 1000);
                resultStr = String.Format("{0:#,##0}", tmpNum) + "천";
            }
            else
            {
                resultStr = String.Format("{0:#,##0}", tmpNetVol);
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailVolumeMiddleFormat(this HtmlHelper helper, long? net_vol)
        {
            string resultStr;
            long tmpNetVol = net_vol ?? 0;
            if (tmpNetVol > 1000000)
            {
                decimal tmpNum = Math.Round(Convert.ToDecimal(tmpNetVol) / 1000);
                resultStr = String.Format("<span class='middleStockData'>{0:#,##0}</span>", tmpNum) + "천";
            }
            else
            {
                resultStr = String.Format("<span class='middleStockData'>{0:#,##0}</span>", tmpNetVol);
            }

            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockTradeCostFormat(this HtmlHelper helper, long? net_turn)
        {
            string resultStr;
            long tmpNetTurn = net_turn ?? 0;
            decimal tmpNum;
            if(tmpNetTurn > 100000000)
            {
                tmpNum = Math.Round(Convert.ToDecimal(tmpNetTurn) / 100000000);
            }
            else
            {
                tmpNum = tmpNetTurn;
            }

            resultStr = String.Format("{0:#,##0}", tmpNum);
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockTradeCostMiddleFormat(this HtmlHelper helper, long? net_turn)
        {
            string resultStr;
            long tmpNetTurn = net_turn ?? 0;
            decimal tmpNum;
            if (tmpNetTurn > 100000000)
            {
                tmpNum = Math.Round(Convert.ToDecimal(tmpNetTurn) / 100000000);
            }
            else
            {
                tmpNum = tmpNetTurn;
            }
                
            resultStr = String.Format("<span class='middleStockData'>{0:#,##0}</span>", tmpNum);
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockLastPriceFormat(this HtmlHelper helper, string chgTypeStr, int? curr_price, int? netChg)
        {
            string resultStr;
            int tmpNum;
            if (chgTypeStr == "1" || chgTypeStr == "2")
            {
                tmpNum = curr_price ?? 0 - netChg ?? 0;
                resultStr = "<span class='data-normal'>" + String.Format("{0:#,##0}", tmpNum) + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5")
            {
                tmpNum = curr_price ?? 0 + netChg ?? 0;
                resultStr = "<span class='data-normal'>" + String.Format("{0:#,##0}", tmpNum) + "</span>";
            }
            else
            {
                resultStr = "<span class='data-normal'>" + String.Format("{0:#,##0}", curr_price ?? 0) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockDetailChgPriceMiddleFormat(this HtmlHelper helper, string chgTypeStr, int? convertVal)
        {
            string resultStr;
            int tmp = convertVal ?? 0;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up max middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up icon middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down min middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down icon middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number middleStockData'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DomesticStockDetailChgPriceFormat(this HtmlHelper helper, string chgTypeStr, int? convertVal)
        {
            string resultStr;
            int tmp = convertVal ?? 0;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up max'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up icon'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down min'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down icon'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number'>" + String.Format("{0:#,##0}", tmp) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString RecentlyStockChgPriceFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up max'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up icon'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down min'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down icon'>" + convertStr + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString RecentlyStockChgRateFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PredictionChartPriceFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString SinglePriceFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;

            if (chgTypeStr == "1")      //상한
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "2" || chgTypeStr == "+")        //상승
            {
                resultStr = "<span class='data-up'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4") //하한
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-") //하락
            {
                resultStr = "<span class='data-down'>" + convertStr + "</span>";
            }
            else //보합
            {
                resultStr = "<span class='number'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticForeignerSecurityFormat(this HtmlHelper helper, int tempNum)
        {
            string rtnStr = "";

            if (tempNum > 0)    
            {    
                rtnStr = "<span class='data-up'>" + String.Format("{0:#,##0}", tempNum) + "</span>";    
            }    
            else if (tempNum == 0)    
            {    
                rtnStr = tempNum.ToString("#,##0");    
            }    
            else    
            {    
                rtnStr = "<span class='data-down'>" + String.Format("{0:#,##0}", tempNum) + "</span>";    
            }    
            
            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString DomesticForeignerSecurityFormat(this HtmlHelper helper, long? tempNum)
        {
            string rtnStr = "";

            if (tempNum > 0)
            {
                rtnStr = "<span class='data-up'>" + String.Format("{0:#,##0}", tempNum??0) + "</span>";
            }
            else if (tempNum == 0)
            {
                rtnStr = "0";
            }
            else
            {
                rtnStr = "<span class='data-down'>" + String.Format("{0:#,##0}", tempNum ?? 0) + "</span>";
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString DomesticStockDetailChgRateMiddleFormat(this HtmlHelper helper, string chgTypeStr, int? curr_price, int? netChg)
        {
            string resultStr;
            int tmp_curPrice = curr_price ?? 0;
            int tmp_netChg = netChg ?? 0;
            double tmpPerCent;
            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                if (tmp_curPrice - tmp_netChg == 0)
                {
                    tmpPerCent = 0;
                }
                else
                {
                    tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice - tmp_netChg)) * 100 - 100));
                    tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                }
            }
            else if(chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                if(tmp_curPrice + tmp_netChg == 0)
                {
                    tmpPerCent = 0;
                }
                else
                {
                    tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice + tmp_netChg)) * 100 - 100));
                    tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                }
            }
            else
            {
                tmpPerCent = 0;
            }

            if(tmpPerCent == 0)
            {
                resultStr = "<span class='number middleStockData'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
            }
            else
            {
                if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
                {
                    resultStr = "<span class='data-up symbol middleStockData'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
                else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
                {
                    resultStr = "<span class='data-down symbol middleStockData'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
                else
                {
                    resultStr = "<span class='number middleStockData'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
            }
            

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailChgRateFormat(this HtmlHelper helper, string chgTypeStr, int? curr_price, int? netChg)
        {
            string resultStr;
            int tmp_curPrice = curr_price ?? 0;
            int tmp_netChg = netChg ?? 0;
            double tmpPerCent;
            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                if (tmp_curPrice - tmp_netChg == 0)
                {
                    tmpPerCent = 0;
                }
                else
                {
                    tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice - tmp_netChg)) * 100 - 100));
                    tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                }
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                if (tmp_curPrice + tmp_netChg == 0)
                {
                    tmpPerCent = 0;
                }
                else
                {
                    tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice + tmp_netChg)) * 100 - 100));
                    tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                }
            }
            else
            {
                tmpPerCent = 0;
            }

            if (tmpPerCent == 0)
            {
                resultStr = "<span class='number'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
            }
            else
            {
                if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
                {
                    resultStr = "<span class='data-up symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
                else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
                {
                    resultStr = "<span class='data-down symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
                else
                {
                    resultStr = "<span class='number'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                }
            }


            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailInvestOpinionFormat(this HtmlHelper helper, int maxIndex)
        {
            string maxInvestOpinion = "";

            //0 : 강한매도, 1 매도, 2 중립, 3 매수, 4 강한매수 건수
            switch (maxIndex)
            {
                case 0:
                    maxInvestOpinion = "강한매도";
                    break;
                case 1:
                    maxInvestOpinion = "매도";
                    break;
                case 2:
                    maxInvestOpinion = "중립";
                    break;
                case 3:
                    maxInvestOpinion = "매수";
                    break;
                case 4:
                    maxInvestOpinion = "강한매수";
                    break;
                default:
                    break;
            }

            return new MvcHtmlString(maxInvestOpinion);
        }

        public static MvcHtmlString DomesticStockDetailInvestConsultFormat(this HtmlHelper helper, string opinionStr)
        {
            return new MvcHtmlString(opinionStr.Replace("\r\n", "<br/>").Replace("</HTML>", ""));
        }
        public static MvcHtmlString PublishPriceFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up price-stock'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down price-stock'>" + convertStr + "</span>";
            }
            else
            {
                resultStr = "<span class='number price-stock'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailInvsetorOrgForeinerFormat(this HtmlHelper helper, long? buyVal, long? sellVal)
        {
            string resultStr;
            long tmpNum = (buyVal??0) - (sellVal??0);
            if(tmpNum > 0)
            {
                resultStr = "<span class='data-up'>" + String.Format("{0:#,##0}", tmpNum) + "</span>";
            }
            else if(tmpNum == 0)
            {
                resultStr = "<span class='normal'>" + tmpNum + "</span>";
            }
            else
            {
                resultStr = "<span class='data-down'>" + String.Format("{0:#,##0}", tmpNum) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockTotalInfoRateFormat(this HtmlHelper helper, double? rateVal)
        {
            string resultStr;
            double tmpNum = rateVal ?? 0;
            if(tmpNum > 0)
            {
                resultStr = "<span class='data-up'>" + String.Format("{0}", Math.Truncate(tmpNum * 100) / 100) + "%</span>";
            }
            else if(tmpNum == 0)
            {
                resultStr = "<span class='normal'>" + String.Format("{0:F2}", tmpNum) + "%</span>";
            }
            else
            {
                resultStr = "<span class='data-down'>" + String.Format("{0}", Math.Truncate(tmpNum * 100) / 100) + "%</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DomesticStockDetailRightConsultImgUrl(this HtmlHelper helper, string artid, string editfolder, string image_s)
        {
            string resultStr = "";

            if(artid == "A999999999999" || artid == "A888888888888")
            {
                resultStr = "http://vod.wowtv.co.kr:8080/img/" + editfolder.Trim() + "/" + image_s.Substring(0, 13).Trim() + "/" + image_s.Trim();
            }
            else
            {
                resultStr = "http://vod1.wowtv.co.kr:8080/img/" + editfolder.Trim() + "/" + image_s.Substring(0, 13).Trim() + "/" + image_s.Trim(); ;
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishChgPriceMiddleFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up icon middleStockData'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down icon middleStockData'>" + convertStr + "</span>";
            }
            else
            {
                resultStr = "<span class='number icon middleStockData'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishChgPriceFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up icon'>" + convertStr + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down icon'>" + convertStr + "</span>";
            }
            else
            {
                if (chgTypeStr == "2" || chgTypeStr == "+")
                {
                    resultStr = "<span class='data-up icon'>" + convertStr + "</span>";
                }
                else if (chgTypeStr == "5" || chgTypeStr == "-")
                {
                    resultStr = "<span class='data-down icon'>" + convertStr + "</span>";
                }
                else
                {
                    resultStr = "<span class='normal'>" + convertStr + "</span>";
                }

            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString IndustryPartUpperRate(this HtmlHelper helper, string chgTypeStr, string pchangeStr)
        {
            string resultStr;
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up'>" + pchangeStr + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down'>" + pchangeStr + "</span>";
            }
            else
            {
                resultStr = "<span class='data-normal'>" + pchangeStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishChgRateFormat(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            /*한국물ADR*/
            string resultStr;
            convertStr = convertStr.Replace("%", "");
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up symbol middleStockData'>" + convertStr.Replace("+", "") + "%</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down symbol middleStockData'>" + convertStr.Replace("-", "") + "%</span>";
            }
            else
            {
                resultStr = "<span class='number middleStockData'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishMainIndustryUpper10(this HtmlHelper helper, string chgTypeStr, string chgRateStr)
        {
            string resultStr = "";
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up symbol'>" + chgRateStr.Replace("+", "") + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down symbol'>" + chgRateStr.Replace("-", "") + "</span>";
            }
            else
            {
                resultStr = "<span class='number'>" + chgRateStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishChgRateFormat(this HtmlHelper helper, decimal? convertDecimal)
        {

            string resultStr = "";

            if (convertDecimal > 0)
            {
                resultStr = "<span class='data-up symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("+", "") + "%</span>";
            }
            else if (convertDecimal < 0)
            {
                resultStr = "<span class='data-down symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("-", "") + "%</span>";
            }
            else
            {
                resultStr = "<span class='number'>" + String.Format("{0:F2}", convertDecimal) + "</span>";
            }
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString ThemaRateFormat(this HtmlHelper helper, string chgType, decimal? convertDecimal)
        {
            string resultStr = "";

            //if (convertDecimal > 0)
            //{
            //    resultStr = "<span class='data-up symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("+", "") + "%</span>";
            //}
            //else if (convertDecimal < 0)
            //{
            //    resultStr = "<span class='data-down symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("-", "") + "%</span>";
            //}
            //else
            //{
            //    resultStr = "<span class='number'>" + String.Format("{0:F2}", convertDecimal) + "</span>";
            //}

            if (chgType == "1" || chgType == "2")
            {
                resultStr = "<span class='data-up symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("+", "") + "%</span>";
            }
            else if (chgType == "4" || chgType == "5")
            {
                resultStr = "<span class='data-down symbol'>" + String.Format("{0:F2}", convertDecimal).Replace("-", "") + "%</span>";
            }
            else
            {
                resultStr = "<span class='number'>" + String.Format("{0:F2}", convertDecimal) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishWorldExChangeChgRate(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up'>" + convertStr.Replace("+", "") + "%</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down'>" + convertStr.Replace("-", "") + "%</span>";
            }
            else
            {
                resultStr = "<span class='number'>" + convertStr + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString WorldStockMainUSAADRPrice(this HtmlHelper helper, string chgTypeStr, string curPrirceStr)
        {
            string resultStr;
            if (chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up price-stock'>" + string.Format("{0:#,##0.#0}", Convert.ToDecimal(curPrirceStr)) + "</span>";
            }
            else if (chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down price-stock'>" + string.Format("{0:#,##0.#0}", Convert.ToDecimal(curPrirceStr)) + "</span>";
            }
            else
            {
                resultStr = "<span class='number price-stock'>" + string.Format("{0:#,##0.#0}", Convert.ToDecimal(curPrirceStr)) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishUpDownFormat(this HtmlHelper helper, int? prevolume, int? volume)
        {
            int? tempNum = prevolume - volume;
            string resultStr;
            if (tempNum > 0)
            {
                //resultStr = "<span class='data-up symbol'>" + tempNum + "</span>";
                resultStr = "<span class='data-up symbol'>" + string.Format("{0:#,##0}", tempNum) + "</span>";
            }
            else if (tempNum < 0)
            {
                //resultStr = "<span class='data-down symbol'>" + String.Format("{0:#}tempNum.ToString().Replace("-", "") + "</span>";
                resultStr = "<span class='data-down symbol'>" + string.Format("{0:#,##0}", tempNum).Replace("-", "") + "</span>";
            }
            else
            {
                resultStr = "<span class='number'>0</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishUpDownIconFormat(this HtmlHelper heler, string convertStr)
        {
            int tempNum;
            string rtnStr = convertStr.Replace(",", "");

            if (Int32.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "<span class='data-up symbol'>" + String.Format("{0:#,##0}", tempNum) + "</span>";
                }
                else if (tempNum < 0)
                {
                    rtnStr = "<span class='data-down symbol'>" + String.Format("{0:#,##0}", tempNum).Replace("-", "") + "</span>";
                }
                else
                {
                    rtnStr = "<span class='number'>" + tempNum + "</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString PublishUpDownSymbolPChangeFormat(this HtmlHelper helper, string chgType, string pChange)
        {
            float tempNum;
            string rtnStr = pChange.Replace("%", "");

            if (float.TryParse(rtnStr, out tempNum))
            {
                if (chgType == "+" || chgType == "1" || chgType == "2")
                {
                    rtnStr = "<span class='data-up symbol'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
                else if (chgType == "-" || chgType == "4" || chgType == "5")
                {
                    rtnStr = "<span class='data-down symbol'>" + String.Format("{0:F2}", tempNum.ToString().Replace("-", "")) + "%</span>";
                }
                else
                {
                    rtnStr = "<span class='number'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString PublishUpDownSymbolPChangeMiddleFormat(this HtmlHelper helper, string chgType, string pChange)
        {
            float tempNum;
            string rtnStr = pChange.Replace("%", "");

            if (float.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "<span class='data-up symbol middleStockData'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
                else if (tempNum < 0)
                {
                    rtnStr = "<span class='data-down symbol middleStockData'>" + String.Format("{0:F2}", tempNum.ToString().Replace("-", "")) + "%</span>";
                }
                else
                {
                    rtnStr = "<span class='number middleStockData'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString MaketFormat(this HtmlHelper helper, string MarketCode)
        {
            string resultStr;
            switch (MarketCode.ToUpper())
            {
                case "T":
                    resultStr = "코스피";
                    break;
                case "K":
                    resultStr = "코스닥";
                    break;
                default:
                    resultStr = MarketCode;
                    break;
            }
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString LocationStr(this HtmlHelper helper, string currentMenuSeq)
        {
            string resultStr;
            switch (currentMenuSeq)
            {
                case "0":
                    resultStr = "코스피";
                    break;
                case "1":
                    resultStr = "코스닥";
                    break;
                case "2":
                    resultStr = "선물";
                    break;
                case "3":
                    resultStr = "코스피200";
                    break;
                case "4":
                    resultStr = "ETF";
                    break;
                case "5":
                    resultStr = "업종별";
                    break;
                case "6":
                    resultStr = "테마별";
                    break;
                case "7":
                    resultStr = "상한가";
                    break;
                case "8":
                    resultStr = "하한가";
                    break;
                case "9":
                    resultStr = "업종상위";
                    break;
                case "10":
                    resultStr = "시가총액";
                    break;
                case "11":
                    resultStr = "투자자 매매동향";
                    break;
                case "12":
                    resultStr = "외국인보유현황";
                    break;
                default:
                    resultStr = "";
                    break;
            }
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString LinkStr(this HtmlHelper helper, string stockCode)
        {
            int length = stockCode.Length;
            string resultStr = stockCode.Substring(1, length - 1);
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishGraphData(this HtmlHelper helper, string chgType, int? uCount, int? mCount, int? dCount)
        {
            string resultStr;
            if (chgType == "2")
            {
                resultStr = String.Format("{0:F1}", Convert.ToDouble(uCount) / (uCount + mCount + dCount) * 100) + "%";
                resultStr = "<td class='graph-data up'><span class='graph-horizon' style='width:" + resultStr + "'></span></td>";
            }
            else if (chgType == "5")
            {
                resultStr = String.Format("{0:F1}", Convert.ToDouble(dCount) / (uCount + mCount + dCount) * 100) + "%";
                resultStr = "<td class='graph-data down'><span class='graph-horizon' style='width:" + resultStr + "'></span></td>";
            }
            else
            {
                resultStr = "0%";
            }
            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishChgPriceFormat2(this HtmlHelper helper, string chgTypeStr, string convertStr)
        {
            string resultStr;
            if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='data-up icon'>" + string.Format("{0:#,##0}", Convert.ToDecimal(convertStr.Replace("+", ""))) + "</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='data-down icon'>" + string.Format("{0:#,##0}", Convert.ToDecimal(convertStr.Replace("-", ""))) + "</span>";
            }
            else
            {
                /*if (chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
                {
                    resultStr = "<span class='data-up icon'>" + convertStr.Replace("+", "") + "</span>";
                }
                else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
                {
                    resultStr = "<span class='data-down icon'>" + convertStr.Replace("-", "") + "</span>";
                }
                else
                {
                    resultStr = "<span class='normal'>" + convertStr + "</span>";
                }
                */
                resultStr = "<span class='normal'>" + string.Format("{0:#,##0.#0}", Convert.ToDecimal(convertStr)) + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        

        public static MvcHtmlString PublishUpDownIconFormat2(this HtmlHelper heler, string convertStr)
        {
            int tempNum;
            string rtnStr = convertStr.Replace(",", "");

            if (Int32.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "<span class='data-up icon'>" + tempNum.ToString("#,##0").Replace("+", "") + "</span>";
                }
                else if (tempNum < 0)
                {
                    rtnStr = "<span class='data-down icon'>" + tempNum.ToString("#,##0").Replace("-", "") + "</span>";
                }
                else
                {
                    rtnStr = "<span class='number'>" + tempNum.ToString("#,##0") + "</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString PublishCurrencyFormat(this HtmlHelper heler, string convertStr)
        {
            var rtnStr = @String.Format("{0:#,###}", System.Convert.ToDecimal(convertStr));

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString KeyChgCalc(this HtmlHelper heler, string stockCurrPrice, string stockChg)
        {
            var PartUpRate = 0.0;
            var Price = Double.Parse(stockCurrPrice);
            var StockChg = Double.Parse(stockChg);

            if (Price - StockChg != 0)
            {
                PartUpRate = (StockChg / (Price - StockChg)) * 100;
            }
            else
            {
                PartUpRate = 0;
            }

            return new MvcHtmlString(PartUpRate.ToString());
        }
        public static MvcHtmlString PublishSabuScoreFormat(this HtmlHelper helper, string score)
        {
            string resultStr;
            int tmpScore;

            if(String.IsNullOrEmpty(score) == true)
            {
                tmpScore = 0;
                resultStr = "<span class = 'normal'>" + tmpScore + "</span>"; 
            }
            else
            {
                tmpScore = Convert.ToInt32(score);
                if(tmpScore > 0)
                {
                    resultStr = "<span class='data-up'>"+ tmpScore +"</span>";
                }
                else if(tmpScore < 0)
                {
                    resultStr = "<span class='data-down symbol'>" + tmpScore.ToString().Replace("-", "") + "</span>";
                }
                else
                {
                    resultStr = "<span class = 'normal'>" + tmpScore + "</span>";
                }
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString CharacterStockFormat(this HtmlHelper helper, string chgTypeStr)
        {
            string resultStr ="";

            if(chgTypeStr == "1" || chgTypeStr == "2" || chgTypeStr == "+")
            {
                resultStr = "<span class='font-color03'>상승</span>";
            }
            else if (chgTypeStr == "4" || chgTypeStr == "5" || chgTypeStr == "-")
            {
                resultStr = "<span class='font-color02'>하락</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString PublishSabuScoreChgPoint(this HtmlHelper helper, string chgPoint)
        {
            string resultStr;
            int tmpScore;

            if (String.IsNullOrEmpty(chgPoint) == true)
            {
                tmpScore = 0;
                resultStr = "<span class = 'normal'>" + tmpScore + "</span>";
            }
            else
            {
                tmpScore = Convert.ToInt32(chgPoint);
                if (tmpScore > 0)
                {
                    resultStr = "<span class='data-up symbol'>" + tmpScore + "</span>";
                }
                else if (tmpScore < 0)
                {
                    resultStr = "<span class='data-down symbol'>" + tmpScore.ToString().Replace("-", "") + "</span>";
                }
                else
                {
                    resultStr = "<span class = 'normal'>" + tmpScore + "</span>";
                }
            }

            return new MvcHtmlString(resultStr);
        }



        /*
         * 금융 > 국내증시 > 메인
         */
        public static MvcHtmlString DIndexChgRateMiddleFormat(this HtmlHelper helper, string chgType, string pChange)
        {
            float tempNum;
            string rtnStr = pChange.Replace("%", "");

            if (float.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "<span class='data-up symbol line middleStockData'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
                else if (tempNum < 0)
                {
                    rtnStr = "<span class='data-down symbol line middleStockData'>" + String.Format("{0:F2}", tempNum.ToString().Replace("-", "")) + "%</span>";
                }
                else
                {
                    rtnStr = "<span class='number line middleStockData'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }

        public static MvcHtmlString DIndexChgRateFormat(this HtmlHelper heler, string chgType, string pChange)
        {
            float tempNum;
            string rtnStr = pChange.Replace("%", "");

            if (float.TryParse(rtnStr, out tempNum))
            {
                if (chgType == "+" || chgType == "2")
                {
                    rtnStr = "<span class='data-up symbol line'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
                else if (chgType == "-" || chgType == "5")
                {
                    rtnStr = "<span class='data-down symbol line'>" + String.Format("{0:F2}", tempNum.ToString().Replace("-", "")) + "%</span>";
                }
                else
                {
                    rtnStr = "<span class='number line'>" + String.Format("{0:F2}", tempNum) + "%</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }
        
        public static MvcHtmlString DIndexExchangePriceFormat(this HtmlHelper helper, string chgType, string price)
        {
            string resultStr = "";

            if (chgType == "1" || chgType == "+")
            {
                resultStr = "<span class='data-up'>"+ price +"</span>";
            }
            else if (chgType == "3" || chgType == "-")
            {
                resultStr = "<span class='data-down'>"+ price + "</span>";
            }
            else
            {
                resultStr = "<span class='data-normal'>" + price + "</span>";
            }

            return new MvcHtmlString(resultStr);

        }

        public static MvcHtmlString DIndexExchangeChgPriceFormat(this HtmlHelper helper, string chgType, string chgPrice)
        {
            string resultStr = "";

            if (chgType == "1" || chgType == "+")
            {
                resultStr = "<span class='data-up icon'>" + chgPrice + "</span>";
            }
            else if (chgType == "3" || chgType == "-")
            {
                resultStr = "<span class='data-down icon'>" + chgPrice + "</span>";
            }
            else
            {
                resultStr = "<span class='data-normal'>" + chgPrice + "</span>";
            }

            return new MvcHtmlString(resultStr);
        }

        public static MvcHtmlString DIndexExchangeChgRateFormat(this HtmlHelper helper, string chgTypeStr, string curr_price, string netChg)
        {
            //string resultStr;
            string resultStr = "";

            double tmp_curPrice = Convert.ToDouble(curr_price.Replace(",", ""));
            double tmp_netChg = Convert.ToDouble(netChg.Replace(",", ""));
            double tmpPerCent;

            /*
                확인필요 tblExchangeOnline에 chgCode = 3 인데 chgPrice 값이 존재한다. 
                알고있는것은 3이란 구분값은 등락이 없을때로 알고 있는데...
                chgCode값이 3인데 chgPrice값이 존재한다.
                구분자가 틀린건지 아니면 데이터가 잘못된건지 확인이 필요하다.
            */
            if (chgTypeStr == "1" || chgTypeStr == "+")
            {
                tmpPerCent = (tmp_netChg / (tmp_curPrice - tmp_netChg)) * 100;
                //tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice - tmp_netChg)) * 100 - 100));
                //tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                resultStr = "<span class='data-up line symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
            }
            else if (chgTypeStr == "3" || chgTypeStr == "-")
            {
                tmpPerCent = (tmp_netChg / (tmp_curPrice + tmp_netChg)) * 100;
                //tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice + tmp_netChg)) * 100 - 100));
                //tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                resultStr = "<span class='data-down line symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
            }
            else
            {
                tmpPerCent = 0;
                resultStr = resultStr = "<span class='number line'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>"; ;
            }



                //if (chgTypeStr == "1" || chgTypeStr == "+")
                //{
                //    if (tmp_curPrice - tmp_netChg == 0)
                //    {
                //        tmpPerCent = 0;
                //    }
                //    else
                //    {
                //        tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice - tmp_netChg)) * 100 - 100));
                //        tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                //    }
                //}
                //else if (chgTypeStr == "3" || chgTypeStr == "-")
                //{
                //    if (tmp_curPrice + tmp_netChg == 0)
                //    {
                //        tmpPerCent = 0;
                //    }
                //    else
                //    {
                //        tmpPerCent = Math.Abs((((float)tmp_curPrice / (tmp_curPrice + tmp_netChg)) * 100 - 100));
                //        tmpPerCent = Math.Truncate(tmpPerCent * 100) / 100;
                //    }
                //}
                //else
                //{
                //    tmpPerCent = 0;
                //}

                //if (tmpPerCent == 0)
                //{
                //    resultStr = "<span class='number'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                //}
                //else
                //{
                //    if (chgTypeStr == "1" || chgTypeStr == "+")
                //    {
                //        resultStr = "<span class='data-up line symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                //    }
                //    else if (chgTypeStr == "3" || chgTypeStr == "-")
                //    {
                //        resultStr = "<span class='data-down line symbol'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                //    }
                //    else
                //    {
                //        resultStr = "<span class='number line'>" + String.Format("{0:F2}", tmpPerCent) + "%</span>";
                //    }
                //}


                return new MvcHtmlString(resultStr);
        }
        public static MvcHtmlString DIndexPublishUpDownIconFormat(this HtmlHelper heler, string convertStr)
        {
            int tempNum;
            string rtnStr = convertStr.Replace(",", "");

            if (Int32.TryParse(rtnStr, out tempNum))
            {
                if (tempNum > 0)
                {
                    rtnStr = "<span class='data-up symbol'>" + String.Format("{0:#,##0}", tempNum) + "</span>";
                }
                else if (tempNum < 0)
                {
                    rtnStr = "<span class='data-down symbol'>" + String.Format("{0:#,##0}", tempNum).Replace("-", "") + "</span>";
                }
                else
                {
                    rtnStr = "<span class='number'>" + tempNum + "</span>";
                }
            }

            return new MvcHtmlString(rtnStr);
        }
        public static MvcHtmlString DIndexMarketStatus(this HtmlHelper htmlHelper)
        {
            DateTime currentTime = DateTime.Now;
            //DateTime currentTime = new DateTime(2017, 8, 16, 13, 0, 0);
            DateTime startTime = new DateTime(Int32.Parse(currentTime.Year.ToString()), Int32.Parse(currentTime.Month.ToString()), Int32.Parse(currentTime.Day.ToString()), 9, 0, 0);
            DateTime endTime = new DateTime(Int32.Parse(currentTime.Year.ToString()), Int32.Parse(currentTime.Month.ToString()), Int32.Parse(currentTime.Day.ToString()), 15, 30, 0);

            TagBuilder tb = new TagBuilder("span");

            string tempStr = currentTime.Hour > 12 ? "오후" : "오전";

            if ((DateTime.Compare(startTime, currentTime) < 0) && (DateTime.Compare(endTime, currentTime) >= 0))
            {
                tb.InnerHtml = string.Format("{0:yyyy-MM-dd} {1} {2:hh:mm} 장중(억원)", currentTime, tempStr, currentTime);
            }
            else
            {
                tb.InnerHtml = string.Format("{0:yyyy-MM-dd} {1} {2:hh:mm} 장마감(억원)", currentTime, tempStr, currentTime);
            }

            //tb.InnerHtml = "시작시간: " + startTime.ToString() + "/ 현재시간 : " + currentTime.ToString() + "/종료시간 : " + endTime.ToString();

            return new MvcHtmlString(tb.ToString());
        }

    }
}