﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWebMobile.BroadWatchService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="BroadWatchService.IBroadWatchService")]
    public interface IBroadWatchService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/GetAt", ReplyAction="http://tempuri.org/IBroadWatchService/GetAtResponse")]
        Wow.Tv.Middle.Model.Db90.DNRS.tv_program GetAt(int uid);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/GetAt", ReplyAction="http://tempuri.org/IBroadWatchService/GetAtResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> GetAtAsync(int uid);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/SearchList", ReplyAction="http://tempuri.org/IBroadWatchService/SearchListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> SearchList(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/SearchList", ReplyAction="http://tempuri.org/IBroadWatchService/SearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program>> SearchListAsync(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/SearchList2", ReplyAction="http://tempuri.org/IBroadWatchService/SearchList2Response")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> SearchList2(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/SearchList2", ReplyAction="http://tempuri.org/IBroadWatchService/SearchList2Response")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program>> SearchList2Async(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/Save", ReplyAction="http://tempuri.org/IBroadWatchService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db90.DNRS.tv_program model, Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE attachFile, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/Save", ReplyAction="http://tempuri.org/IBroadWatchService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db90.DNRS.tv_program model, Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE attachFile, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/ExecuteInsertSp", ReplyAction="http://tempuri.org/IBroadWatchService/ExecuteInsertSpResponse")]
        void ExecuteInsertSp(string today);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBroadWatchService/ExecuteInsertSp", ReplyAction="http://tempuri.org/IBroadWatchService/ExecuteInsertSpResponse")]
        System.Threading.Tasks.Task ExecuteInsertSpAsync(string today);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IBroadWatchServiceChannel : Wow.Tv.FrontWebMobile.BroadWatchService.IBroadWatchService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class BroadWatchServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWebMobile.BroadWatchService.IBroadWatchService>, Wow.Tv.FrontWebMobile.BroadWatchService.IBroadWatchService {
        
        public BroadWatchServiceClient() {
        }
        
        public BroadWatchServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public BroadWatchServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BroadWatchServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BroadWatchServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db90.DNRS.tv_program GetAt(int uid) {
            return base.Channel.GetAt(uid);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> GetAtAsync(int uid) {
            return base.Channel.GetAtAsync(uid);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> SearchList(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition) {
            return base.Channel.SearchList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program>> SearchListAsync(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition) {
            return base.Channel.SearchListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program> SearchList2(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition) {
            return base.Channel.SearchList2(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db90.DNRS.tv_program>> SearchList2Async(Wow.Tv.Middle.Model.Db90.DNRS.NewsProgram.BroadWatchCondition condition) {
            return base.Channel.SearchList2Async(condition);
        }
        
        public int Save(Wow.Tv.Middle.Model.Db90.DNRS.tv_program model, Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE attachFile, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, attachFile, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db90.DNRS.tv_program model, Wow.Tv.Middle.Model.Db49.wowtv.NTB_ATTACH_FILE attachFile, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, attachFile, loginUser);
        }
        
        public void ExecuteInsertSp(string today) {
            base.Channel.ExecuteInsertSp(today);
        }
        
        public System.Threading.Tasks.Task ExecuteInsertSpAsync(string today) {
            return base.Channel.ExecuteInsertSpAsync(today);
        }
    }
}
