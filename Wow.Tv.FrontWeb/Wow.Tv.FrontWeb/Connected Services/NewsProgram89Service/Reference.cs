﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.NewsProgram89Service {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="NewsProgram89Service.INewsProgram89Service")]
    public interface INewsProgram89Service {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsProgram89Service/GetPartnerEvent", ReplyAction="http://tempuri.org/INewsProgram89Service/GetPartnerEventResponse")]
        Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst[] GetPartnerEvent(int[] itemIdList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsProgram89Service/GetPartnerEvent", ReplyAction="http://tempuri.org/INewsProgram89Service/GetPartnerEventResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst[]> GetPartnerEventAsync(int[] itemIdList);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface INewsProgram89ServiceChannel : Wow.Tv.FrontWeb.NewsProgram89Service.INewsProgram89Service, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class NewsProgram89ServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.NewsProgram89Service.INewsProgram89Service>, Wow.Tv.FrontWeb.NewsProgram89Service.INewsProgram89Service {
        
        public NewsProgram89ServiceClient() {
        }
        
        public NewsProgram89ServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public NewsProgram89ServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public NewsProgram89ServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public NewsProgram89ServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst[] GetPartnerEvent(int[] itemIdList) {
            return base.Channel.GetPartnerEvent(itemIdList);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.WOWTV_BILL_DB.TItemPriceMst[]> GetPartnerEventAsync(int[] itemIdList) {
            return base.Channel.GetPartnerEventAsync(itemIdList);
        }
    }
}
