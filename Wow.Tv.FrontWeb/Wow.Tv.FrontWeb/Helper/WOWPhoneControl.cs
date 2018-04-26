using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Wow.Tv.FrontWeb.Helper
{
    public static partial class WOWHtmlExtension
    {
       
        /// <summary>
        /// 전화번호 컨트롤
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="name">전화번호 컨트롤 ID</param>
        /// <param name="type">전화번호 종류</param>
        /// <param name="htmlAttributes">html 옵션</param>
        /// <returns></returns>
        public static MvcHtmlString WOWPhoneControl(this HtmlHelper helper, string name, PhoneKind type, object htmlAttributes, params WOWComboItem[] items)
        {
            IList<Phone> list = GetPhoneCode(type);
            string strRandom = GetRandomSting();
            string id1 = $"wow_p_{strRandom}_{1}";
            string id2 = $"wow_p_{strRandom}_{2}";
            string id3 = $"wow_p_{strRandom}_{3}";


            TagBuilder selectBuilder = new TagBuilder("select");
            selectBuilder.Attributes.Add("class", "phone_number_control");
            selectBuilder.Attributes.Add("next", id2);
            bool first = true;

            if (items != null)
            {
                foreach (WOWComboItem item in items)
                {
                    if (!string.IsNullOrEmpty(item.Text))
                    {
                        TagBuilder optionBuilder = new TagBuilder("option") { InnerHtml = item.Text };
                        if (first)
                        {
                            optionBuilder.Attributes.Add("selected", "true");
                            first = false;
                        }
                        optionBuilder.Attributes.Add("value", item.Value);
                        optionBuilder.Attributes.Add("title", item.Text);
                        selectBuilder.InnerHtml += optionBuilder.ToString();
                    }
                }
            }
            foreach (Phone phone in list)
            {
                TagBuilder optionBuilder = new TagBuilder("option") { InnerHtml = phone.Name };
                if (first)
                {
                    optionBuilder.Attributes.Add("selected", "true");
                    first = false;
                }
                optionBuilder.Attributes.Add("title", phone.Name);
                optionBuilder.Attributes.Add("value", phone.Key);
                selectBuilder.InnerHtml += optionBuilder.ToString();
            }

            TagBuilder inputBuilder1 = new TagBuilder("input");
            inputBuilder1.GenerateId(id2);
            inputBuilder1.Attributes.Add("type", "text");
            inputBuilder1.Attributes.Add("class", "fm_text");
            inputBuilder1.Attributes.Add("style", "width: 26px");
            inputBuilder1.Attributes.Add("maxlength", "4");
            inputBuilder1.Attributes.Add("next", id3);

            TagBuilder inputBuilder2 = new TagBuilder("input");
            inputBuilder2.GenerateId(id3);
            inputBuilder2.Attributes.Add("type", "text");
            inputBuilder2.Attributes.Add("class", "fm_text");
            inputBuilder2.Attributes.Add("style", "width: 26px");
            inputBuilder2.Attributes.Add("maxlength", "4");
            inputBuilder2.Attributes.Add("next", name);

            TagBuilder hiddenBuilder = new TagBuilder("input");
            hiddenBuilder.GenerateId(name);
            hiddenBuilder.Attributes.Add("type", "hidden");
            if (htmlAttributes != null)
            {
                hiddenBuilder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            }
            string strHtml = $"{selectBuilder} {inputBuilder1} {inputBuilder2}{hiddenBuilder}";
            return MvcHtmlString.Create(strHtml);

        }

        /// <summary>
        /// 전화번호,핸드폰 번호 정보를 가져온다.
        /// </summary>
        /// <param name="type">전화번호 타입</param>
        /// <returns></returns>
        private static IList<Phone> GetPhoneCode(PhoneKind type)
        {
            IList < Phone > phones = new List<Phone>();

            phones.Add(new Phone() { Key = "02",Name = "02", PhoneKind = PhoneKind.Telephone});
            phones.Add(new Phone() { Key = "031", Name = "031", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "032", Name = "032", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "033", Name = "033", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "041", Name = "041", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "042", Name = "042", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "051", Name = "051", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "052", Name = "052", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "061", Name = "061", PhoneKind = PhoneKind.Telephone });
            phones.Add(new Phone() { Key = "010", Name = "010", PhoneKind = PhoneKind.Mobile });
            phones.Add(new Phone() { Key = "011", Name = "011", PhoneKind = PhoneKind.Mobile });
            phones.Add(new Phone() { Key = "016", Name = "016", PhoneKind = PhoneKind.Mobile });
            phones.Add(new Phone() { Key = "017", Name = "017", PhoneKind = PhoneKind.Mobile });
            phones.Add(new Phone() { Key = "018", Name = "018", PhoneKind = PhoneKind.Mobile });
            phones.Add(new Phone() { Key = "019", Name = "019", PhoneKind = PhoneKind.Mobile });

            switch (type)
            {
                case PhoneKind.Telephone:
                    return phones.Where(x => x.PhoneKind == PhoneKind.Telephone).ToList();
                case PhoneKind.Mobile:
                    return phones.Where(x => x.PhoneKind == PhoneKind.Mobile).ToList();
            }

            return phones;
        }

        private class Phone
        {
            public string Key { get;  set; }
            public string Name { get;  set; }
            public PhoneKind PhoneKind { get;  set; }

        }
    }
}