﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.EventService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="EventService.IEventService")]
    public interface IEventService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetList", ReplyAction="http://tempuri.org/IEventService/GetListResponse")]
        Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetList(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetList", ReplyAction="http://tempuri.org/IEventService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetListAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetData", ReplyAction="http://tempuri.org/IEventService/GetDataResponse")]
        Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetData(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetData", ReplyAction="http://tempuri.org/IEventService/GetDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetDataAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetBroadList", ReplyAction="http://tempuri.org/IEventService/GetBroadListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetBroadList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetBroadList", ReplyAction="http://tempuri.org/IEventService/GetBroadListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> GetBroadListAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/Save", ReplyAction="http://tempuri.org/IEventService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db49.wownet.tblEvent model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/Save", ReplyAction="http://tempuri.org/IEventService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wownet.tblEvent model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/Delete", ReplyAction="http://tempuri.org/IEventService/DeleteResponse")]
        void Delete(int[] deleteList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/Delete", ReplyAction="http://tempuri.org/IEventService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int[] deleteList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetFrontList", ReplyAction="http://tempuri.org/IEventService/GetFrontListResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>))]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetFrontList(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetFrontList", ReplyAction="http://tempuri.org/IEventService/GetFrontListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetFrontListAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetFrontDetail", ReplyAction="http://tempuri.org/IEventService/GetFrontDetailResponse")]
        Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetFrontDetail(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetFrontDetail", ReplyAction="http://tempuri.org/IEventService/GetFrontDetailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetFrontDetailAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/ReadCountIncrease", ReplyAction="http://tempuri.org/IEventService/ReadCountIncreaseResponse")]
        void ReadCountIncrease(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/ReadCountIncrease", ReplyAction="http://tempuri.org/IEventService/ReadCountIncreaseResponse")]
        System.Threading.Tasks.Task ReadCountIncreaseAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetMainEventList", ReplyAction="http://tempuri.org/IEventService/GetMainEventListResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>))]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetMainEventList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetMainEventList", ReplyAction="http://tempuri.org/IEventService/GetMainEventListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetMainEventListAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetQuickEventList", ReplyAction="http://tempuri.org/IEventService/GetQuickEventListResponse")]
        [System.ServiceModel.ServiceKnownTypeAttribute(typeof(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>))]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetQuickEventList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetQuickEventList", ReplyAction="http://tempuri.org/IEventService/GetQuickEventListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetQuickEventListAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetEventData", ReplyAction="http://tempuri.org/IEventService/GetEventDataResponse")]
        Wow.Tv.Middle.Model.Db49.wownet.usp_tblEvent_select_Result[] GetEventData();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetEventData", ReplyAction="http://tempuri.org/IEventService/GetEventDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.usp_tblEvent_select_Result[]> GetEventDataAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetPartenrRandom", ReplyAction="http://tempuri.org/IEventService/GetPartenrRandomResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetPartenrRandom();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventService/GetPartenrRandom", ReplyAction="http://tempuri.org/IEventService/GetPartenrRandomResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> GetPartenrRandomAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IEventServiceChannel : Wow.Tv.FrontWeb.EventService.IEventService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class EventServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.EventService.IEventService>, Wow.Tv.FrontWeb.EventService.IEventService {
        
        public EventServiceClient() {
        }
        
        public EventServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public EventServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EventServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EventServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetList(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetListAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetData(int seq) {
            return base.Channel.GetData(seq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetDataAsync(int seq) {
            return base.Channel.GetDataAsync(seq);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetBroadList() {
            return base.Channel.GetBroadList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> GetBroadListAsync() {
            return base.Channel.GetBroadListAsync();
        }
        
        public int Save(Wow.Tv.Middle.Model.Db49.wownet.tblEvent model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wownet.tblEvent model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, loginUser);
        }
        
        public void Delete(int[] deleteList) {
            base.Channel.Delete(deleteList);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int[] deleteList) {
            return base.Channel.DeleteAsync(deleteList);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetFrontList(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetFrontList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetFrontListAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetFrontListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetFrontDetail(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetFrontDetail(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetFrontDetailAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.GetFrontDetailAsync(condition);
        }
        
        public void ReadCountIncrease(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            base.Channel.ReadCountIncrease(condition);
        }
        
        public System.Threading.Tasks.Task ReadCountIncreaseAsync(Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventCondition condition) {
            return base.Channel.ReadCountIncreaseAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetMainEventList() {
            return base.Channel.GetMainEventList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetMainEventListAsync() {
            return base.Channel.GetMainEventListAsync();
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent> GetQuickEventList() {
            return base.Channel.GetQuickEventList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wownet.ServiceCenter.EventContent>> GetQuickEventListAsync() {
            return base.Channel.GetQuickEventListAsync();
        }
        
        public Wow.Tv.Middle.Model.Db49.wownet.usp_tblEvent_select_Result[] GetEventData() {
            return base.Channel.GetEventData();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.usp_tblEvent_select_Result[]> GetEventDataAsync() {
            return base.Channel.GetEventDataAsync();
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetPartenrRandom() {
            return base.Channel.GetPartenrRandom();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> GetPartenrRandomAsync() {
            return base.Channel.GetPartenrRandomAsync();
        }
    }
}
