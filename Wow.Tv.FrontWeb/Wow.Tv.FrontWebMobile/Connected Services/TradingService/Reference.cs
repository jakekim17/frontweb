﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWebMobile.TradingService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="TradingService.ITradingService")]
    public interface ITradingService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetStockData", ReplyAction="http://tempuri.org/ITradingService/GetStockDataResponse")]
        string GetStockData(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetStockData", ReplyAction="http://tempuri.org/ITradingService/GetStockDataResponse")]
        System.Threading.Tasks.Task<string> GetStockDataAsync(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetDayTradingData", ReplyAction="http://tempuri.org/ITradingService/GetDayTradingDataResponse")]
        string GetDayTradingData(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetDayTradingData", ReplyAction="http://tempuri.org/ITradingService/GetDayTradingDataResponse")]
        System.Threading.Tasks.Task<string> GetDayTradingDataAsync(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetHotSearchList", ReplyAction="http://tempuri.org/ITradingService/GetHotSearchListResponse")]
        Wow.Tv.Middle.Model.Db22.stock.usp_GetBestSearchOnline_TypeA_Result[] GetHotSearchList(string searchDate);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ITradingService/GetHotSearchList", ReplyAction="http://tempuri.org/ITradingService/GetHotSearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.usp_GetBestSearchOnline_TypeA_Result[]> GetHotSearchListAsync(string searchDate);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ITradingServiceChannel : Wow.Tv.FrontWebMobile.TradingService.ITradingService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class TradingServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWebMobile.TradingService.ITradingService>, Wow.Tv.FrontWebMobile.TradingService.ITradingService {
        
        public TradingServiceClient() {
        }
        
        public TradingServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public TradingServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public TradingServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public TradingServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string GetStockData(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition) {
            return base.Channel.GetStockData(condition);
        }
        
        public System.Threading.Tasks.Task<string> GetStockDataAsync(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition) {
            return base.Channel.GetStockDataAsync(condition);
        }
        
        public string GetDayTradingData(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition) {
            return base.Channel.GetDayTradingData(condition);
        }
        
        public System.Threading.Tasks.Task<string> GetDayTradingDataAsync(Wow.Tv.Middle.Model.Db22.stock.Finance.TradingStockCondition condition) {
            return base.Channel.GetDayTradingDataAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db22.stock.usp_GetBestSearchOnline_TypeA_Result[] GetHotSearchList(string searchDate) {
            return base.Channel.GetHotSearchList(searchDate);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.usp_GetBestSearchOnline_TypeA_Result[]> GetHotSearchListAsync(string searchDate) {
            return base.Channel.GetHotSearchListAsync(searchDate);
        }
    }
}
