﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.IntegratedBoardService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="IntegratedBoardService.IIntegratedBoardService")]
    public interface IIntegratedBoardService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/IntegratedSearchList", ReplyAction="http://tempuri.org/IIntegratedBoardService/IntegratedSearchListResponse")]
        Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> IntegratedSearchList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/IntegratedSearchList", ReplyAction="http://tempuri.org/IIntegratedBoardService/IntegratedSearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> IntegratedSearchListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardDetailResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetBoardDetail(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardDetailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBoardDetailAsync(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardSaveResponse")]
        int BoardSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT board, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardSaveResponse")]
        System.Threading.Tasks.Task<int> BoardSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT board, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardDelete", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardDeleteResponse")]
        void BoardDelete(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardDelete", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardDeleteResponse")]
        System.Threading.Tasks.Task BoardDeleteAsync(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/FileSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/FileSaveResponse")]
        void FileSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE model, int boardContentSeq, bool isDeleteFileAll);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/FileSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/FileSaveResponse")]
        System.Threading.Tasks.Task FileSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE model, int boardContentSeq, bool isDeleteFileAll);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardInfoAndDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardInfoAndDetailResponse")]
        Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBoardInfoAndDetail(int currentMenuSeq, int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardInfoAndDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardInfoAndDetailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetBoardInfoAndDetailAsync(int currentMenuSeq, int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardInfo", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardInfoResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD GetBoardInfo(int currentMenuSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBoardInfo", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBoardInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD> GetBoardInfoAsync(int currentMenuSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/ReadCountIncrease", ReplyAction="http://tempuri.org/IIntegratedBoardService/ReadCountIncreaseResponse")]
        void ReadCountIncrease(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/ReadCountIncrease", ReplyAction="http://tempuri.org/IIntegratedBoardService/ReadCountIncreaseResponse")]
        System.Threading.Tasks.Task ReadCountIncreaseAsync(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetQnaStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetQnaStatsResponse")]
        Wow.Tv.Middle.Model.Common.MainStatsModel[] GetQnaStats();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetQnaStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetQnaStatsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetQnaStatsAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetIRStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetIRStatsResponse")]
        Wow.Tv.Middle.Model.Common.MainStatsModel[] GetIRStats();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetIRStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetIRStatsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetIRStatsAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetReportStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetReportStatsResponse")]
        Wow.Tv.Middle.Model.Common.MainStatsModel[] GetReportStats();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetReportStats", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetReportStatsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetReportStatsAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/DeleteFile", ReplyAction="http://tempuri.org/IIntegratedBoardService/DeleteFileResponse")]
        void DeleteFile(int attachFile);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/DeleteFile", ReplyAction="http://tempuri.org/IIntegratedBoardService/DeleteFileResponse")]
        System.Threading.Tasks.Task DeleteFileAsync(int attachFile);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBroadBoard", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBroadBoardResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>))]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBroadBoard(Wow.Tv.Middle.Model.Db49.wowtv.Board.BoardContentCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetBroadBoard", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetBroadBoardResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetBroadBoardAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.BoardContentCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetProgramList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetProgramListResponse")]
        Wow.Tv.Middle.Model.Db90.DNRS.T_NEWS_PRG[] GetProgramList(string ingYn);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetProgramList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetProgramListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.T_NEWS_PRG[]> GetProgramListAsync(string ingYn);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentSaveResponse")]
        void CommentSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT comment, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentSaveResponse")]
        System.Threading.Tasks.Task CommentSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT comment, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCommentList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCommentListResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT[] GetCommentList(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCommentList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCommentListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT[]> GetCommentListAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentDelete", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentDeleteResponse")]
        void CommentDelete(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentDelete", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentDeleteResponse")]
        System.Threading.Tasks.Task CommentDeleteAsync(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentUpdate", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentUpdateResponse")]
        void CommentUpdate(int seq, string content, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/CommentUpdate", ReplyAction="http://tempuri.org/IIntegratedBoardService/CommentUpdateResponse")]
        System.Threading.Tasks.Task CommentUpdateAsync(int seq, string content, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/UpdateContentBlind", ReplyAction="http://tempuri.org/IIntegratedBoardService/UpdateContentBlindResponse")]
        void UpdateContentBlind(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/UpdateContentBlind", ReplyAction="http://tempuri.org/IIntegratedBoardService/UpdateContentBlindResponse")]
        System.Threading.Tasks.Task UpdateContentBlindAsync(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/UpdateReplyBlind", ReplyAction="http://tempuri.org/IIntegratedBoardService/UpdateReplyBlindResponse")]
        void UpdateReplyBlind(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/UpdateReplyBlind", ReplyAction="http://tempuri.org/IIntegratedBoardService/UpdateReplyBlindResponse")]
        System.Threading.Tasks.Task UpdateReplyBlindAsync(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCommentPaging", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCommentPagingResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT> GetCommentPaging(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCommentPaging", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCommentPagingResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT>> GetCommentPagingAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetFeedBackList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetFeedBackListResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>))]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetFeedBackList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetFeedBackList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetFeedBackListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetFeedBackListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetHelpPageToFeedBackSeq", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetHelpPageToFeedBackSeqResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU GetHelpPageToFeedBackSeq(string menuName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetHelpPageToFeedBackSeq", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetHelpPageToFeedBackSeqResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU> GetHelpPageToFeedBackSeqAsync(string menuName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetFeedBackProgamCodeToBoardSeq", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetFeedBackProgamCodeToBoardSeqRespons" +
            "e")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU GetFeedBackProgamCodeToBoardSeq(string programCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetFeedBackProgamCodeToBoardSeq", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetFeedBackProgamCodeToBoardSeqRespons" +
            "e")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU> GetFeedBackProgamCodeToBoardSeqAsync(string programCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardFeedBackSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardFeedBackSaveResponse")]
        int BoardFeedBackSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/BoardFeedBackSave", ReplyAction="http://tempuri.org/IIntegratedBoardService/BoardFeedBackSaveResponse")]
        System.Threading.Tasks.Task<int> BoardFeedBackSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCreateBoardProgramList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCreateBoardProgramListResponse")]
        Wow.Tv.Middle.Model.Db90.DNRS.TAB_PROGRAM_LIST[] GetCreateBoardProgramList(string ingYn);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetCreateBoardProgramList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetCreateBoardProgramListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.TAB_PROGRAM_LIST[]> GetCreateBoardProgramListAsync(string ingYn);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/MyMainIntegratedSearchCount", ReplyAction="http://tempuri.org/IIntegratedBoardService/MyMainIntegratedSearchCountResponse")]
        Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> MyMainIntegratedSearchCount(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/MyMainIntegratedSearchCount", ReplyAction="http://tempuri.org/IIntegratedBoardService/MyMainIntegratedSearchCountResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> MyMainIntegratedSearchCountAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetMainNoticeContent", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetMainNoticeContentResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetMainNoticeContent();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetMainNoticeContent", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetMainNoticeContentResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetMainNoticeContentAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetMemberInfo", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetMemberInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser GetMemberInfo(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetMemberInfo", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetMemberInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> GetMemberInfoAsync(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetHelpMainNotice", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetHelpMainNoticeResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[] GetHelpMainNotice();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetHelpMainNotice", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetHelpMainNoticeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[]> GetHelpMainNoticeAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetAdminSiteBoardDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetAdminSiteBoardDetailResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetAdminSiteBoardDetail(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetAdminSiteBoardDetail", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetAdminSiteBoardDetailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetAdminSiteBoardDetailAsync(int boardContentSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetQuickNoticeList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetQuickNoticeListResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[] GetQuickNoticeList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIntegratedBoardService/GetQuickNoticeList", ReplyAction="http://tempuri.org/IIntegratedBoardService/GetQuickNoticeListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[]> GetQuickNoticeListAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IIntegratedBoardServiceChannel : Wow.Tv.FrontWeb.IntegratedBoardService.IIntegratedBoardService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class IntegratedBoardServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.IntegratedBoardService.IIntegratedBoardService>, Wow.Tv.FrontWeb.IntegratedBoardService.IIntegratedBoardService {
        
        public IntegratedBoardServiceClient() {
        }
        
        public IntegratedBoardServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public IntegratedBoardServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public IntegratedBoardServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public IntegratedBoardServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> IntegratedSearchList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.IntegratedSearchList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> IntegratedSearchListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.IntegratedSearchListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetBoardDetail(int boardContentSeq) {
            return base.Channel.GetBoardDetail(boardContentSeq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBoardDetailAsync(int boardContentSeq) {
            return base.Channel.GetBoardDetailAsync(boardContentSeq);
        }
        
        public int BoardSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT board, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.BoardSave(board, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> BoardSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT board, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.BoardSaveAsync(board, loginUser);
        }
        
        public void BoardDelete(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.BoardDelete(seq, loginUser);
        }
        
        public System.Threading.Tasks.Task BoardDeleteAsync(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.BoardDeleteAsync(seq, loginUser);
        }
        
        public void FileSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE model, int boardContentSeq, bool isDeleteFileAll) {
            base.Channel.FileSave(model, boardContentSeq, isDeleteFileAll);
        }
        
        public System.Threading.Tasks.Task FileSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE model, int boardContentSeq, bool isDeleteFileAll) {
            return base.Channel.FileSaveAsync(model, boardContentSeq, isDeleteFileAll);
        }
        
        public Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBoardInfoAndDetail(int currentMenuSeq, int boardContentSeq) {
            return base.Channel.GetBoardInfoAndDetail(currentMenuSeq, boardContentSeq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetBoardInfoAndDetailAsync(int currentMenuSeq, int boardContentSeq) {
            return base.Channel.GetBoardInfoAndDetailAsync(currentMenuSeq, boardContentSeq);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD GetBoardInfo(int currentMenuSeq) {
            return base.Channel.GetBoardInfo(currentMenuSeq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD> GetBoardInfoAsync(int currentMenuSeq) {
            return base.Channel.GetBoardInfoAsync(currentMenuSeq);
        }
        
        public void ReadCountIncrease(int boardContentSeq) {
            base.Channel.ReadCountIncrease(boardContentSeq);
        }
        
        public System.Threading.Tasks.Task ReadCountIncreaseAsync(int boardContentSeq) {
            return base.Channel.ReadCountIncreaseAsync(boardContentSeq);
        }
        
        public Wow.Tv.Middle.Model.Common.MainStatsModel[] GetQnaStats() {
            return base.Channel.GetQnaStats();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetQnaStatsAsync() {
            return base.Channel.GetQnaStatsAsync();
        }
        
        public Wow.Tv.Middle.Model.Common.MainStatsModel[] GetIRStats() {
            return base.Channel.GetIRStats();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetIRStatsAsync() {
            return base.Channel.GetIRStatsAsync();
        }
        
        public Wow.Tv.Middle.Model.Common.MainStatsModel[] GetReportStats() {
            return base.Channel.GetReportStats();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.MainStatsModel[]> GetReportStatsAsync() {
            return base.Channel.GetReportStatsAsync();
        }
        
        public void DeleteFile(int attachFile) {
            base.Channel.DeleteFile(attachFile);
        }
        
        public System.Threading.Tasks.Task DeleteFileAsync(int attachFile) {
            return base.Channel.DeleteFileAsync(attachFile);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetBroadBoard(Wow.Tv.Middle.Model.Db49.wowtv.Board.BoardContentCondition condition) {
            return base.Channel.GetBroadBoard(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetBroadBoardAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.BoardContentCondition condition) {
            return base.Channel.GetBroadBoardAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db90.DNRS.T_NEWS_PRG[] GetProgramList(string ingYn) {
            return base.Channel.GetProgramList(ingYn);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.T_NEWS_PRG[]> GetProgramListAsync(string ingYn) {
            return base.Channel.GetProgramListAsync(ingYn);
        }
        
        public void CommentSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT comment, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.CommentSave(comment, loginUser);
        }
        
        public System.Threading.Tasks.Task CommentSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT comment, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.CommentSaveAsync(comment, loginUser);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT[] GetCommentList(int seq) {
            return base.Channel.GetCommentList(seq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT[]> GetCommentListAsync(int seq) {
            return base.Channel.GetCommentListAsync(seq);
        }
        
        public void CommentDelete(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.CommentDelete(seq, loginUser);
        }
        
        public System.Threading.Tasks.Task CommentDeleteAsync(int seq, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.CommentDeleteAsync(seq, loginUser);
        }
        
        public void CommentUpdate(int seq, string content, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.CommentUpdate(seq, content, loginUser);
        }
        
        public System.Threading.Tasks.Task CommentUpdateAsync(int seq, string content, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.CommentUpdateAsync(seq, content, loginUser);
        }
        
        public void UpdateContentBlind(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.UpdateContentBlind(seq, blind, loginUser);
        }
        
        public System.Threading.Tasks.Task UpdateContentBlindAsync(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.UpdateContentBlindAsync(seq, blind, loginUser);
        }
        
        public void UpdateReplyBlind(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            base.Channel.UpdateReplyBlind(seq, blind, loginUser);
        }
        
        public System.Threading.Tasks.Task UpdateReplyBlindAsync(int seq, string blind, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.UpdateReplyBlindAsync(seq, blind, loginUser);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT> GetCommentPaging(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.GetCommentPaging(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_COMMENT>> GetCommentPagingAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.GetCommentPagingAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetFeedBackList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.GetFeedBackList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> GetFeedBackListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.GetFeedBackListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU GetHelpPageToFeedBackSeq(string menuName) {
            return base.Channel.GetHelpPageToFeedBackSeq(menuName);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU> GetHelpPageToFeedBackSeqAsync(string menuName) {
            return base.Channel.GetHelpPageToFeedBackSeqAsync(menuName);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU GetFeedBackProgamCodeToBoardSeq(string programCode) {
            return base.Channel.GetFeedBackProgamCodeToBoardSeq(programCode);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_MENU> GetFeedBackProgamCodeToBoardSeqAsync(string programCode) {
            return base.Channel.GetFeedBackProgamCodeToBoardSeqAsync(programCode);
        }
        
        public int BoardFeedBackSave(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.BoardFeedBackSave(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> BoardFeedBackSaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.BoardFeedBackSaveAsync(model, loginUser);
        }
        
        public Wow.Tv.Middle.Model.Db90.DNRS.TAB_PROGRAM_LIST[] GetCreateBoardProgramList(string ingYn) {
            return base.Channel.GetCreateBoardProgramList(ingYn);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.TAB_PROGRAM_LIST[]> GetCreateBoardProgramListAsync(string ingYn) {
            return base.Channel.GetCreateBoardProgramListAsync(ingYn);
        }
        
        public Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> MyMainIntegratedSearchCount(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.MyMainIntegratedSearchCount(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.IntegratedBoard<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT>> MyMainIntegratedSearchCountAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.MyMainIntegratedSearchCountAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetMainNoticeContent() {
            return base.Channel.GetMainNoticeContent();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetMainNoticeContentAsync() {
            return base.Channel.GetMainNoticeContentAsync();
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser GetMemberInfo(string userId) {
            return base.Channel.GetMemberInfo(userId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> GetMemberInfoAsync(string userId) {
            return base.Channel.GetMemberInfoAsync(userId);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[] GetHelpMainNotice() {
            return base.Channel.GetHelpMainNotice();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[]> GetHelpMainNoticeAsync() {
            return base.Channel.GetHelpMainNoticeAsync();
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT GetAdminSiteBoardDetail(int boardContentSeq) {
            return base.Channel.GetAdminSiteBoardDetail(boardContentSeq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT> GetAdminSiteBoardDetailAsync(int boardContentSeq) {
            return base.Channel.GetAdminSiteBoardDetailAsync(boardContentSeq);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[] GetQuickNoticeList() {
            return base.Channel.GetQuickNoticeList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_BOARD_CONTENT[]> GetQuickNoticeListAsync() {
            return base.Channel.GetQuickNoticeListAsync();
        }
    }
}
