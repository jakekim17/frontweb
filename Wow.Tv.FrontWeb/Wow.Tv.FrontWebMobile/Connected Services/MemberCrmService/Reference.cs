﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWebMobile.MemberCrmService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="MemberCrmService.IMemberCrmService")]
    public interface IMemberCrmService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberCrmService/TvReplayUserLog", ReplyAction="http://tempuri.org/IMemberCrmService/TvReplayUserLogResponse")]
        void TvReplayUserLog(System.Nullable<int> userNumber, string userId, int tvReplayNum, string programId, string programName, System.Nullable<System.DateTime> broadDate, string enterRoute);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberCrmService/TvReplayUserLog", ReplyAction="http://tempuri.org/IMemberCrmService/TvReplayUserLogResponse")]
        System.Threading.Tasks.Task TvReplayUserLogAsync(System.Nullable<int> userNumber, string userId, int tvReplayNum, string programId, string programName, System.Nullable<System.DateTime> broadDate, string enterRoute);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IMemberCrmServiceChannel : Wow.Tv.FrontWebMobile.MemberCrmService.IMemberCrmService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class MemberCrmServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWebMobile.MemberCrmService.IMemberCrmService>, Wow.Tv.FrontWebMobile.MemberCrmService.IMemberCrmService {
        
        public MemberCrmServiceClient() {
        }
        
        public MemberCrmServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public MemberCrmServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MemberCrmServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MemberCrmServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public void TvReplayUserLog(System.Nullable<int> userNumber, string userId, int tvReplayNum, string programId, string programName, System.Nullable<System.DateTime> broadDate, string enterRoute) {
            base.Channel.TvReplayUserLog(userNumber, userId, tvReplayNum, programId, programName, broadDate, enterRoute);
        }
        
        public System.Threading.Tasks.Task TvReplayUserLogAsync(System.Nullable<int> userNumber, string userId, int tvReplayNum, string programId, string programName, System.Nullable<System.DateTime> broadDate, string enterRoute) {
            return base.Channel.TvReplayUserLogAsync(userNumber, userId, tvReplayNum, programId, programName, broadDate, enterRoute);
        }
    }
}