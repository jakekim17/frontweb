using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using Wow.Tv.FrontWeb.CommconCodeService;
using Wow.Tv.Middle.Model.Db49.wowtv;
using Wow.Tv.Middle.Model.Db49.wowtv.CommonCode;

namespace Wow.Tv.FrontWeb.Helper
{
    public static partial class WOWHtmlExtension
    {
        /// <summary>
        /// 공통코드 콤보박스
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="type">콤보박스 타입(일반, 필수)</param>
        /// <param name="name">Tag의 ID속성</param>
        /// <param name="commandCode">공통코드 분류코드</param>
        /// <param name="textColumnName">콤보박스 목록에 표시 될 컬럼명</param>
        /// <param name="valueColumnName">콤보박스 Value 속성에 표시 될 컬럼명</param>
        /// <returns></returns>
        public static MvcHtmlString WOWCodeCombo(this HtmlHelper helper, ComboType type, string name, string commandCode, string textColumnName, string valueColumnName)
        {
            return WOWCodeCombo(helper, type, name, commandCode, textColumnName, valueColumnName, null, null);
        }
        /// <summary>
        /// 공통코드 콤보박스
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="type">콤보박스 타입(일반, 필수)</param>
        /// <param name="name">Tag의 ID속성</param>
        /// <param name="commandCode">공통코드 분류코드</param>
        /// <param name="textColumnName">콤보박스 목록에 표시 될 컬럼명</param>
        /// <param name="valueColumnName">콤보박스 Value 속성에 표시 될 컬럼명</param>
        /// <param name="item">콤보박스에 추가로 들어갈 Item(전체, 선택 등)</param>
        /// <returns></returns>
        public static MvcHtmlString WOWCodeCombo(this HtmlHelper helper, ComboType type, string name, string commandCode, string textColumnName, string valueColumnName, WOWComboItem items)
        {
            return WOWCodeCombo(helper, type, name, commandCode, textColumnName, valueColumnName, null, items);
        }

        /// <summary>
        /// 공통코드 콤보박스
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="name">Tag의 ID속성</param>
        /// <param name="type">콤보박스 타입(일반, 필수, 비활성)</param>
        /// <param name="commandCode">공통코드 분류코드</param>
        /// <param name="textColumnName">콤보박스 목록에 표시 될 컬럼명</param>
        /// <param name="valueColumnName">콤보박스 Value 속성에 표시 될 컬럼명</param>
        /// <param name="items">콤보박스에 추가로 들어갈 Item(전체, 선택 등)</param>
        /// <param name="htmlAttributes">html 옵션 </param>
        /// <returns></returns>
        public static MvcHtmlString WOWCodeCombo(this HtmlHelper helper, ComboType type, string name, string commandCode, string textColumnName, string valueColumnName, object htmlAttributes, params WOWComboItem[] items)
        {
            CommconCodeServiceClient commcon = new CommconCodeServiceClient();
            var list = commcon.SearchList(new CommonCodeCondition()
            {
                UpCommonCode = commandCode
            }).ListData;

            if (htmlAttributes != null)
            {
                if ((new RouteValueDictionary(htmlAttributes)).Keys.Any(key => key.ToUpper() == "SORT"))
                {
                    var align = (new RouteValueDictionary(htmlAttributes))["SORT"];
                    if (align.ToString().ToLower() == "desc")
                    {
                        list = (from c in list
                            orderby c.SORT_ORDER descending
                            select c).ToList();
                    }
                    else if (align.ToString().ToLower() == "asc")
                    {
                        list = (from c in list
                            orderby c.SORT_ORDER 
                            select c).ToList();
                    }
                }
            }


            TagBuilder selectBuilder = new TagBuilder("select");
            selectBuilder.GenerateId(name);
            selectBuilder.AddCssClass("form-control");
            selectBuilder.AddCssClass("ex1");
            if (type == ComboType.Required)
            {
                selectBuilder.AddCssClass("impor-border");
            }
            if (list.Count > 0)
                selectBuilder.Attributes.Add("title", list[0].CODE_NAME);

            var content = RemoveCodeHeader(list);
            if (items != null)
            {
                foreach (WOWComboItem item in items)
                {
                    if (!string.IsNullOrEmpty(item.Text))
                    {
                        TagBuilder optionBuilder = new TagBuilder("option") { InnerHtml = item.Text };
                        optionBuilder.Attributes.Add("value", item.Value);
                        optionBuilder.Attributes.Add("title", item.Text);
                        selectBuilder.InnerHtml += optionBuilder.ToString();
                    }
                }
            }

            foreach (NTB_COMMON_CODE c in content)
            {
                Type t = c.GetType();
                PropertyInfo textColumnProperty = t.GetProperty(textColumnName);
                PropertyInfo vlaueColumnProperty = t.GetProperty(valueColumnName);
                TagBuilder optionBuilder = new TagBuilder("option") { InnerHtml = Convert.ToString(textColumnProperty.GetValue(c, null)) };
                
                optionBuilder.Attributes.Add("value", Convert.ToString(vlaueColumnProperty.GetValue(c, null)));
                optionBuilder.Attributes.Add("title", Convert.ToString(textColumnProperty.GetValue(c, null)));
                selectBuilder.InnerHtml += optionBuilder.ToString();
            }

            if (htmlAttributes != null)
            {
                selectBuilder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }

            return MvcHtmlString.Create(selectBuilder.ToString());
        }
    }
}
