﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.IRService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="IRService.IIRService")]
    public interface IIRService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIRService/GetList", ReplyAction="http://tempuri.org/IIRService/GetListResponse")]
        Wow.Tv.Middle.Model.Db49.wownet.TAB_STOCK_SITUATION[] GetList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IIRService/GetList", ReplyAction="http://tempuri.org/IIRService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.TAB_STOCK_SITUATION[]> GetListAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IIRServiceChannel : Wow.Tv.FrontWeb.IRService.IIRService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class IRServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.IRService.IIRService>, Wow.Tv.FrontWeb.IRService.IIRService {
        
        public IRServiceClient() {
        }
        
        public IRServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public IRServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public IRServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public IRServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.wownet.TAB_STOCK_SITUATION[] GetList() {
            return base.Channel.GetList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wownet.TAB_STOCK_SITUATION[]> GetListAsync() {
            return base.Channel.GetListAsync();
        }
    }
}