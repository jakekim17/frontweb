using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wow.Tv.Middle.Model.Db49.wowtv;

namespace Wow.Tv.FrontWeb.Helper
{
    public static partial class WOWHtmlExtension
    {

        /// <summary>
        /// 공통코드 중 헤더(구분)여역을 삭제합니다.)
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private static IList<NTB_COMMON_CODE> RemoveCodeHeader(IEnumerable<NTB_COMMON_CODE> list)
        {
            var result = from code in list
                where !code.COMMON_CODE.Equals("0000")
                select code;
            return result.ToList();
        }

        private static readonly Random Random = new Random();
        /// <summary>
        /// 랜덤값을 생성합니다.
        /// </summary>
        /// <returns></returns>
        private static string GetRandomSting()
        {

            char[] digits = new char[4];
            digits[0] = (char)(Random.Next(9) + '1');
            for (int i = 1; i < 4; i++)
            {
                digits[i] = (char)(Random.Next(10) + '0');
            }
            return new string(digits);
        }
    }
}
