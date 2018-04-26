using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wow.Tv.FrontWeb.Areas.Component.Models
{
    ///// <summary>
    ///// 팝업영상 플레이 타입 (영상주제)
    ///// </summary>
    //public enum PopupTvPlayType
    //{
    //    LiveTv, LiveAudio, TvReplay, Vod
    //}

    /// <summary>
    /// 영상 재생/제어 방식
    /// </summary>
    public enum TvPlayTypeModel
    {
        /// <summary>
        /// 라이브TV
        /// </summary>
        LiveTv,
        /// <summary>
        /// 라이브AUDIO
        /// </summary>
        LiveAudio,
        /// <summary>
        /// TV다시보기
        /// </summary>
        TvReplay,
        /// <summary>
        /// VOD
        /// </summary>
        Vod,
        /// <summary>
        /// URL로 재생
        /// </summary>
        //Custom,
        /// <summary>
        /// 스크립트로 제어
        /// </summary>
        ByScript,
        /// <summary>
        /// NO VIDEO
        /// </summary>
        None
    }

    public class TvPlayerModel
    {
        public TvPlayTypeModel PlayType { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Num { get; set; }
        public string Url { get; set; }
        public bool FloatingMode { get; set; } = false;
        public bool IncludeVrixonScript { get; set; } = true;
        public string OnScriptPlayEnd { get; set; }
        public string AdCat { get; set; } 
    }
}