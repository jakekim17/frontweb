using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace Wow.Tv.FrontWeb.Helper
{
    public static partial class WOWHtmlExtension
    {
        /// <summary>
        /// 콤보박스
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="name">Tag의 ID속성</param>
        /// <param name="type">콤보박스 타입(일반, 필수, 비활성)</param>
        /// <param name="DataSource">DataSource</param>
        /// <param name="textColumnName">콤보박스 목록에 표시 될 컬럼명</param>
        /// <param name="valueColumnName">콤보박스 Value 속성에 표시 될 컬럼명</param>
        /// <param name="items">콤보박스에 추가로 들어갈 Item(전체, 선택 등)</param>
        /// <param name="htmlAttributes">html 옵션 </param>
        /// <returns></returns>
        public static MvcHtmlString WOWCombo<T>(this HtmlHelper helper, ComboType type, string name, IList<T> DataSource,
            string textColumnName, string valueColumnName, object htmlAttributes,
            params WOWComboItem[] items)
        {
            var list = DataSource;
            TagBuilder selectBuilder = new TagBuilder("select");
            selectBuilder.GenerateId(name);
            if (type == ComboType.Required)
            {
                selectBuilder.AddCssClass("impor-border");
            }

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

            foreach (T c in list)
            {
                Type t = c.GetType();
                PropertyInfo textColumnProperty = t.GetProperty(textColumnName);
                PropertyInfo vlaueColumnProperty = t.GetProperty(valueColumnName);
                if (textColumnProperty != null)
                {
                    TagBuilder optionBuilder = new TagBuilder("option")
                        { InnerHtml = Convert.ToString(textColumnProperty.GetValue(c, null)) };
                    optionBuilder.Attributes.Add("value", Convert.ToString(vlaueColumnProperty.GetValue(c, null)));
                    optionBuilder.Attributes.Add("title", Convert.ToString(textColumnProperty.GetValue(c, null)));
                    selectBuilder.InnerHtml += optionBuilder.ToString();
                }
            }
            if (htmlAttributes != null)
            {
                selectBuilder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }

            return MvcHtmlString.Create(selectBuilder.ToString());
        }

    }


}
