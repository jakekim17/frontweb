﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.ChinaService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ChinaService.IChinaService")]
    public interface IChinaService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IChinaService/GetArticle", ReplyAction="http://tempuri.org/IChinaService/GetArticleResponse")]
        Wow.Tv.Middle.Model.Db35.chinaguide.Article.ArticleInfo[] GetArticle(string typeCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IChinaService/GetArticle", ReplyAction="http://tempuri.org/IChinaService/GetArticleResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db35.chinaguide.Article.ArticleInfo[]> GetArticleAsync(string typeCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IChinaService/GetIssue", ReplyAction="http://tempuri.org/IChinaService/GetIssueResponse")]
        string GetIssue();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IChinaService/GetIssue", ReplyAction="http://tempuri.org/IChinaService/GetIssueResponse")]
        System.Threading.Tasks.Task<string> GetIssueAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IChinaServiceChannel : Wow.Tv.FrontWeb.ChinaService.IChinaService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ChinaServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.ChinaService.IChinaService>, Wow.Tv.FrontWeb.ChinaService.IChinaService {
        
        public ChinaServiceClient() {
        }
        
        public ChinaServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ChinaServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ChinaServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ChinaServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db35.chinaguide.Article.ArticleInfo[] GetArticle(string typeCode) {
            return base.Channel.GetArticle(typeCode);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db35.chinaguide.Article.ArticleInfo[]> GetArticleAsync(string typeCode) {
            return base.Channel.GetArticleAsync(typeCode);
        }
        
        public string GetIssue() {
            return base.Channel.GetIssue();
        }
        
        public System.Threading.Tasks.Task<string> GetIssueAsync() {
            return base.Channel.GetIssueAsync();
        }
    }
}
