﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.MemberLoginService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="SetPasswordResult", Namespace="http://schemas.datacontract.org/2004/07/Wow.Tv.Middle.Biz.Member")]
    [System.SerializableAttribute()]
    public partial class SetPasswordResult : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string MobileNoField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string ReturnMessageField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool SuccessField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string TempPasswordField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string MobileNo {
            get {
                return this.MobileNoField;
            }
            set {
                if ((object.ReferenceEquals(this.MobileNoField, value) != true)) {
                    this.MobileNoField = value;
                    this.RaisePropertyChanged("MobileNo");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string ReturnMessage {
            get {
                return this.ReturnMessageField;
            }
            set {
                if ((object.ReferenceEquals(this.ReturnMessageField, value) != true)) {
                    this.ReturnMessageField = value;
                    this.RaisePropertyChanged("ReturnMessage");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool Success {
            get {
                return this.SuccessField;
            }
            set {
                if ((this.SuccessField.Equals(value) != true)) {
                    this.SuccessField = value;
                    this.RaisePropertyChanged("Success");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string TempPassword {
            get {
                return this.TempPasswordField;
            }
            set {
                if ((object.ReferenceEquals(this.TempPasswordField, value) != true)) {
                    this.TempPasswordField = value;
                    this.RaisePropertyChanged("TempPassword");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="MemberLoginService.ILoginService")]
    public interface ILoginService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/EncryptCheck", ReplyAction="http://tempuri.org/ILoginService/EncryptCheckResponse")]
        string[] EncryptCheck(string plainText);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/EncryptCheck", ReplyAction="http://tempuri.org/ILoginService/EncryptCheckResponse")]
        System.Threading.Tasks.Task<string[]> EncryptCheckAsync(string plainText);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheck", ReplyAction="http://tempuri.org/ILoginService/LoginCheckResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheck(string userId, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheck", ReplyAction="http://tempuri.org/ILoginService/LoginCheckResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckAsync(string userId, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckEncrypt", ReplyAction="http://tempuri.org/ILoginService/LoginCheckEncryptResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckEncrypt(string encryptedUserId, string encryptedPassword);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckEncrypt", ReplyAction="http://tempuri.org/ILoginService/LoginCheckEncryptResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckEncryptAsync(string encryptedUserId, string encryptedPassword);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckTest", ReplyAction="http://tempuri.org/ILoginService/LoginCheckTestResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckTest(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckTest", ReplyAction="http://tempuri.org/ILoginService/LoginCheckTestResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckTestAsync(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByKakao", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByKakaoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByKakao(long kakaoId, string kakaoEmail, string kakaoNickname);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByKakao", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByKakaoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByKakaoAsync(long kakaoId, string kakaoEmail, string kakaoNickname);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByFacebook", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByFacebookResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByFacebook(long facebookId, string facebookEmail, string facebookName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByFacebook", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByFacebookResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByFacebookAsync(long facebookId, string facebookEmail, string facebookName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByNaver", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByNaverResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByNaver(long naverId, string naverEmail, string naverName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginCheckByNaver", ReplyAction="http://tempuri.org/ILoginService/LoginCheckByNaverResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByNaverAsync(long naverId, string naverEmail, string naverName);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyCheckMember", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyCheckMemberResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckMemberResult AuthDormancyCheckMember(string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyCheckMember", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyCheckMemberResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckMemberResult> AuthDormancyCheckMemberAsync(string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyIpinInit", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyIpinInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult AuthDormancyIpinInit(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyIpinInit", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyIpinInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> AuthDormancyIpinInitAsync(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyIpinCheck", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyIpinCheckResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckIpinResult AuthDormancyIpinCheck(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancyIpinCheck", ReplyAction="http://tempuri.org/ILoginService/AuthDormancyIpinCheckResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckIpinResult> AuthDormancyIpinCheckAsync(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancySmsInit", ReplyAction="http://tempuri.org/ILoginService/AuthDormancySmsInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult AuthDormancySmsInit(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancySmsInit", ReplyAction="http://tempuri.org/ILoginService/AuthDormancySmsInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> AuthDormancySmsInitAsync(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancySmsCheck", ReplyAction="http://tempuri.org/ILoginService/AuthDormancySmsCheckResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckSmsResult AuthDormancySmsCheck(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/AuthDormancySmsCheck", ReplyAction="http://tempuri.org/ILoginService/AuthDormancySmsCheckResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckSmsResult> AuthDormancySmsCheckAsync(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/MobileSendSms", ReplyAction="http://tempuri.org/ILoginService/MobileSendSmsResponse")]
        string MobileSendSms(string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/MobileSendSms", ReplyAction="http://tempuri.org/ILoginService/MobileSendSmsResponse")]
        System.Threading.Tasks.Task<string> MobileSendSmsAsync(string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdSmsInit", ReplyAction="http://tempuri.org/ILoginService/FindIdSmsInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult FindIdSmsInit(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdSmsInit", ReplyAction="http://tempuri.org/ILoginService/FindIdSmsInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> FindIdSmsInitAsync(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckSms", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckSmsResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckSms(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckSms", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckSmsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckSmsAsync(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdIpinInit", ReplyAction="http://tempuri.org/ILoginService/FindIdIpinInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult FindIdIpinInit(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdIpinInit", ReplyAction="http://tempuri.org/ILoginService/FindIdIpinInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> FindIdIpinInitAsync(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckIpin", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckIpinResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckIpin(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckIpin", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckIpinResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckIpinAsync(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckByMobileInfo", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckByMobileInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckByMobileInfo(string name, string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckByMobileInfo", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckByMobileInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckByMobileInfoAsync(string name, string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckBySSNoInfo", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckBySSNoInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckBySSNoInfo(string name, string ssno);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindIdCheckBySSNoInfo", ReplyAction="http://tempuri.org/ILoginService/FindIdCheckBySSNoInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckBySSNoInfoAsync(string name, string ssno);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordSmsInit", ReplyAction="http://tempuri.org/ILoginService/FindPasswordSmsInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult FindPasswordSmsInit(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordSmsInit", ReplyAction="http://tempuri.org/ILoginService/FindPasswordSmsInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> FindPasswordSmsInitAsync(string returnUrl, string errorUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckSms", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckSmsResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckSms(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckSms", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckSmsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckSmsAsync(string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordIpinInit", ReplyAction="http://tempuri.org/ILoginService/FindPasswordIpinInitResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult FindPasswordIpinInit(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordIpinInit", ReplyAction="http://tempuri.org/ILoginService/FindPasswordIpinInitResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> FindPasswordIpinInitAsync(string returnUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckIpin", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckIpinResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckIpin(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckIpin", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckIpinResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckIpinAsync(string encryptedData, string parameter1, string parameter2, string parameter3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckByMobileInfo", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckByMobileInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckByMobileInfo(string userId, string name, string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/FindPasswordCheckByMobileInfo", ReplyAction="http://tempuri.org/ILoginService/FindPasswordCheckByMobileInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckByMobileInfoAsync(string userId, string name, string mobile1, string mobile2, string mobile3);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/PasswordInitialize", ReplyAction="http://tempuri.org/ILoginService/PasswordInitializeResponse")]
        Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult PasswordInitialize(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/PasswordInitialize", ReplyAction="http://tempuri.org/ILoginService/PasswordInitializeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> PasswordInitializeAsync(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/SendTempPasswordToEmail", ReplyAction="http://tempuri.org/ILoginService/SendTempPasswordToEmailResponse")]
        Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult SendTempPasswordToEmail(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/SendTempPasswordToEmail", ReplyAction="http://tempuri.org/ILoginService/SendTempPasswordToEmailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> SendTempPasswordToEmailAsync(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/ModifyPassword", ReplyAction="http://tempuri.org/ILoginService/ModifyPasswordResponse")]
        Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult ModifyPassword(string userId, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/ModifyPassword", ReplyAction="http://tempuri.org/ILoginService/ModifyPasswordResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> ModifyPasswordAsync(string userId, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginLog", ReplyAction="http://tempuri.org/ILoginService/LoginLogResponse")]
        void LoginLog(int userNumber, string ip);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/LoginLog", ReplyAction="http://tempuri.org/ILoginService/LoginLogResponse")]
        System.Threading.Tasks.Task LoginLogAsync(int userNumber, string ip);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/DomainLoginLog", ReplyAction="http://tempuri.org/ILoginService/DomainLoginLogResponse")]
        void DomainLoginLog(System.Nullable<int> userNumber, string userId, string webType, string webFrom, string webServerName, string loginSite, System.DateTime loginDate, string clientIp, string requestUrl);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ILoginService/DomainLoginLog", ReplyAction="http://tempuri.org/ILoginService/DomainLoginLogResponse")]
        System.Threading.Tasks.Task DomainLoginLogAsync(System.Nullable<int> userNumber, string userId, string webType, string webFrom, string webServerName, string loginSite, System.DateTime loginDate, string clientIp, string requestUrl);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ILoginServiceChannel : Wow.Tv.FrontWeb.MemberLoginService.ILoginService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class LoginServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.MemberLoginService.ILoginService>, Wow.Tv.FrontWeb.MemberLoginService.ILoginService {
        
        public LoginServiceClient() {
        }
        
        public LoginServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public LoginServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public LoginServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public LoginServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string[] EncryptCheck(string plainText) {
            return base.Channel.EncryptCheck(plainText);
        }
        
        public System.Threading.Tasks.Task<string[]> EncryptCheckAsync(string plainText) {
            return base.Channel.EncryptCheckAsync(plainText);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheck(string userId, string password) {
            return base.Channel.LoginCheck(userId, password);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckAsync(string userId, string password) {
            return base.Channel.LoginCheckAsync(userId, password);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckEncrypt(string encryptedUserId, string encryptedPassword) {
            return base.Channel.LoginCheckEncrypt(encryptedUserId, encryptedPassword);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckEncryptAsync(string encryptedUserId, string encryptedPassword) {
            return base.Channel.LoginCheckEncryptAsync(encryptedUserId, encryptedPassword);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckTest(string userId) {
            return base.Channel.LoginCheckTest(userId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckTestAsync(string userId) {
            return base.Channel.LoginCheckTestAsync(userId);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByKakao(long kakaoId, string kakaoEmail, string kakaoNickname) {
            return base.Channel.LoginCheckByKakao(kakaoId, kakaoEmail, kakaoNickname);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByKakaoAsync(long kakaoId, string kakaoEmail, string kakaoNickname) {
            return base.Channel.LoginCheckByKakaoAsync(kakaoId, kakaoEmail, kakaoNickname);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByFacebook(long facebookId, string facebookEmail, string facebookName) {
            return base.Channel.LoginCheckByFacebook(facebookId, facebookEmail, facebookName);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByFacebookAsync(long facebookId, string facebookEmail, string facebookName) {
            return base.Channel.LoginCheckByFacebookAsync(facebookId, facebookEmail, facebookName);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser LoginCheckByNaver(long naverId, string naverEmail, string naverName) {
            return base.Channel.LoginCheckByNaver(naverId, naverEmail, naverName);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> LoginCheckByNaverAsync(long naverId, string naverEmail, string naverName) {
            return base.Channel.LoginCheckByNaverAsync(naverId, naverEmail, naverName);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckMemberResult AuthDormancyCheckMember(string mobile1, string mobile2, string mobile3) {
            return base.Channel.AuthDormancyCheckMember(mobile1, mobile2, mobile3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckMemberResult> AuthDormancyCheckMemberAsync(string mobile1, string mobile2, string mobile3) {
            return base.Channel.AuthDormancyCheckMemberAsync(mobile1, mobile2, mobile3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult AuthDormancyIpinInit(string returnUrl) {
            return base.Channel.AuthDormancyIpinInit(returnUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> AuthDormancyIpinInitAsync(string returnUrl) {
            return base.Channel.AuthDormancyIpinInitAsync(returnUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckIpinResult AuthDormancyIpinCheck(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.AuthDormancyIpinCheck(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckIpinResult> AuthDormancyIpinCheckAsync(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.AuthDormancyIpinCheckAsync(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult AuthDormancySmsInit(string returnUrl, string errorUrl) {
            return base.Channel.AuthDormancySmsInit(returnUrl, errorUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> AuthDormancySmsInitAsync(string returnUrl, string errorUrl) {
            return base.Channel.AuthDormancySmsInitAsync(returnUrl, errorUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckSmsResult AuthDormancySmsCheck(string requestNo, string encryptedData) {
            return base.Channel.AuthDormancySmsCheck(requestNo, encryptedData);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AuthDormancyCheckSmsResult> AuthDormancySmsCheckAsync(string requestNo, string encryptedData) {
            return base.Channel.AuthDormancySmsCheckAsync(requestNo, encryptedData);
        }
        
        public string MobileSendSms(string mobile1, string mobile2, string mobile3) {
            return base.Channel.MobileSendSms(mobile1, mobile2, mobile3);
        }
        
        public System.Threading.Tasks.Task<string> MobileSendSmsAsync(string mobile1, string mobile2, string mobile3) {
            return base.Channel.MobileSendSmsAsync(mobile1, mobile2, mobile3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult FindIdSmsInit(string returnUrl, string errorUrl) {
            return base.Channel.FindIdSmsInit(returnUrl, errorUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> FindIdSmsInitAsync(string returnUrl, string errorUrl) {
            return base.Channel.FindIdSmsInitAsync(returnUrl, errorUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckSms(string requestNo, string encryptedData) {
            return base.Channel.FindIdCheckSms(requestNo, encryptedData);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckSmsAsync(string requestNo, string encryptedData) {
            return base.Channel.FindIdCheckSmsAsync(requestNo, encryptedData);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult FindIdIpinInit(string returnUrl) {
            return base.Channel.FindIdIpinInit(returnUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> FindIdIpinInitAsync(string returnUrl) {
            return base.Channel.FindIdIpinInitAsync(returnUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckIpin(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.FindIdCheckIpin(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckIpinAsync(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.FindIdCheckIpinAsync(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckByMobileInfo(string name, string mobile1, string mobile2, string mobile3) {
            return base.Channel.FindIdCheckByMobileInfo(name, mobile1, mobile2, mobile3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckByMobileInfoAsync(string name, string mobile1, string mobile2, string mobile3) {
            return base.Channel.FindIdCheckByMobileInfoAsync(name, mobile1, mobile2, mobile3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult FindIdCheckBySSNoInfo(string name, string ssno) {
            return base.Channel.FindIdCheckBySSNoInfo(name, ssno);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindIdResult> FindIdCheckBySSNoInfoAsync(string name, string ssno) {
            return base.Channel.FindIdCheckBySSNoInfoAsync(name, ssno);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult FindPasswordSmsInit(string returnUrl, string errorUrl) {
            return base.Channel.FindPasswordSmsInit(returnUrl, errorUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SmsInitResult> FindPasswordSmsInitAsync(string returnUrl, string errorUrl) {
            return base.Channel.FindPasswordSmsInitAsync(returnUrl, errorUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckSms(string requestNo, string encryptedData) {
            return base.Channel.FindPasswordCheckSms(requestNo, encryptedData);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckSmsAsync(string requestNo, string encryptedData) {
            return base.Channel.FindPasswordCheckSmsAsync(requestNo, encryptedData);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult FindPasswordIpinInit(string returnUrl) {
            return base.Channel.FindPasswordIpinInit(returnUrl);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.IpinInitResult> FindPasswordIpinInitAsync(string returnUrl) {
            return base.Channel.FindPasswordIpinInitAsync(returnUrl);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckIpin(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.FindPasswordCheckIpin(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckIpinAsync(string encryptedData, string parameter1, string parameter2, string parameter3) {
            return base.Channel.FindPasswordCheckIpinAsync(encryptedData, parameter1, parameter2, parameter3);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult FindPasswordCheckByMobileInfo(string userId, string name, string mobile1, string mobile2, string mobile3) {
            return base.Channel.FindPasswordCheckByMobileInfo(userId, name, mobile1, mobile2, mobile3);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.FindPasswordResult> FindPasswordCheckByMobileInfoAsync(string userId, string name, string mobile1, string mobile2, string mobile3) {
            return base.Channel.FindPasswordCheckByMobileInfoAsync(userId, name, mobile1, mobile2, mobile3);
        }
        
        public Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult PasswordInitialize(string userId) {
            return base.Channel.PasswordInitialize(userId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> PasswordInitializeAsync(string userId) {
            return base.Channel.PasswordInitializeAsync(userId);
        }
        
        public Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult SendTempPasswordToEmail(string userId) {
            return base.Channel.SendTempPasswordToEmail(userId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> SendTempPasswordToEmailAsync(string userId) {
            return base.Channel.SendTempPasswordToEmailAsync(userId);
        }
        
        public Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult ModifyPassword(string userId, string password) {
            return base.Channel.ModifyPassword(userId, password);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberLoginService.SetPasswordResult> ModifyPasswordAsync(string userId, string password) {
            return base.Channel.ModifyPasswordAsync(userId, password);
        }
        
        public void LoginLog(int userNumber, string ip) {
            base.Channel.LoginLog(userNumber, ip);
        }
        
        public System.Threading.Tasks.Task LoginLogAsync(int userNumber, string ip) {
            return base.Channel.LoginLogAsync(userNumber, ip);
        }
        
        public void DomainLoginLog(System.Nullable<int> userNumber, string userId, string webType, string webFrom, string webServerName, string loginSite, System.DateTime loginDate, string clientIp, string requestUrl) {
            base.Channel.DomainLoginLog(userNumber, userId, webType, webFrom, webServerName, loginSite, loginDate, clientIp, requestUrl);
        }
        
        public System.Threading.Tasks.Task DomainLoginLogAsync(System.Nullable<int> userNumber, string userId, string webType, string webFrom, string webServerName, string loginSite, System.DateTime loginDate, string clientIp, string requestUrl) {
            return base.Channel.DomainLoginLogAsync(userNumber, userId, webType, webFrom, webServerName, loginSite, loginDate, clientIp, requestUrl);
        }
    }
}
