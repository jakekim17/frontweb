using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wow.Tv.FrontWeb.Helper
{
    /// <summary>
    /// 콤보박스 타입
    /// </summary>
    public enum ComboType
    {
        /// <summary>
        /// 일반
        /// </summary>
        Normal,

        /// <summary>
        /// 필수
        /// </summary>
        Required
    }
    /// <summary>
    /// 전화번호 종류를 열거합니다.
    /// </summary>
    public enum PhoneKind
    {
        /// <summary>
        /// 휴대폰
        /// </summary>
        Mobile,
        /// <summary>
        /// 일반전화
        /// </summary>
        Telephone,
        /// <summary>
        /// 휴대폰 + 일반전화
        /// </summary>
        All
    }
}
