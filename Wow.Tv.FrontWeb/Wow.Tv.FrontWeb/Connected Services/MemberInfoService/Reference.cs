﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.FrontWeb.MemberInfoService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="MemberGradeModel", Namespace="http://schemas.datacontract.org/2004/07/Wow.Tv.Middle.Biz.Member")]
    public enum MemberGradeModel : int {
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        GoldPlus = 0,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Gold = 1,
        
        [System.Runtime.Serialization.EnumMemberAttribute()]
        Free = 2,
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TvReplayAuthorityInfoModel", Namespace="http://schemas.datacontract.org/2004/07/Wow.Tv.Middle.Biz.Member")]
    [System.SerializableAttribute()]
    public partial class TvReplayAuthorityInfoModel : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel MemberGradeField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool PointPaidField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string PriceIdField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool UserInfoExistField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private decimal WowCashField;
        
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
        public Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel MemberGrade {
            get {
                return this.MemberGradeField;
            }
            set {
                if ((this.MemberGradeField.Equals(value) != true)) {
                    this.MemberGradeField = value;
                    this.RaisePropertyChanged("MemberGrade");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool PointPaid {
            get {
                return this.PointPaidField;
            }
            set {
                if ((this.PointPaidField.Equals(value) != true)) {
                    this.PointPaidField = value;
                    this.RaisePropertyChanged("PointPaid");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string PriceId {
            get {
                return this.PriceIdField;
            }
            set {
                if ((object.ReferenceEquals(this.PriceIdField, value) != true)) {
                    this.PriceIdField = value;
                    this.RaisePropertyChanged("PriceId");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool UserInfoExist {
            get {
                return this.UserInfoExistField;
            }
            set {
                if ((this.UserInfoExistField.Equals(value) != true)) {
                    this.UserInfoExistField = value;
                    this.RaisePropertyChanged("UserInfoExist");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public decimal WowCash {
            get {
                return this.WowCashField;
            }
            set {
                if ((this.WowCashField.Equals(value) != true)) {
                    this.WowCashField = value;
                    this.RaisePropertyChanged("WowCash");
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
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="TvReplayPaymentByPointModel", Namespace="http://schemas.datacontract.org/2004/07/Wow.Tv.Middle.Biz.Member")]
    [System.SerializableAttribute()]
    public partial class TvReplayPaymentByPointModel : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool LowBalanceField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool PaymentSuccessField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool UserInfoExistField;
        
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
        public bool LowBalance {
            get {
                return this.LowBalanceField;
            }
            set {
                if ((this.LowBalanceField.Equals(value) != true)) {
                    this.LowBalanceField = value;
                    this.RaisePropertyChanged("LowBalance");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool PaymentSuccess {
            get {
                return this.PaymentSuccessField;
            }
            set {
                if ((this.PaymentSuccessField.Equals(value) != true)) {
                    this.PaymentSuccessField = value;
                    this.RaisePropertyChanged("PaymentSuccess");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool UserInfoExist {
            get {
                return this.UserInfoExistField;
            }
            set {
                if ((this.UserInfoExistField.Equals(value) != true)) {
                    this.UserInfoExistField = value;
                    this.RaisePropertyChanged("UserInfoExist");
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
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="MemberInfoService.IMemberInfoService")]
    public interface IMemberInfoService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfo", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoResult MemberInfo(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfo", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoResult> MemberInfoAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfoGeneral", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoGeneralResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoGeneralResult MemberInfoGeneral(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfoGeneral", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoGeneralResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoGeneralResult> MemberInfoGeneralAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfoCompany", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoCompanyResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoCompanyResult MemberInfoCompany(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberInfoCompany", ReplyAction="http://tempuri.org/IMemberInfoService/MemberInfoCompanyResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoCompanyResult> MemberInfoCompanyAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/PasswordValidation", ReplyAction="http://tempuri.org/IMemberInfoService/PasswordValidationResponse")]
        bool PasswordValidation(int userNumber, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/PasswordValidation", ReplyAction="http://tempuri.org/IMemberInfoService/PasswordValidationResponse")]
        System.Threading.Tasks.Task<bool> PasswordValidationAsync(int userNumber, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/IsNickNameDuplicated", ReplyAction="http://tempuri.org/IMemberInfoService/IsNickNameDuplicatedResponse")]
        bool IsNickNameDuplicated(string nickName, int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/IsNickNameDuplicated", ReplyAction="http://tempuri.org/IMemberInfoService/IsNickNameDuplicatedResponse")]
        System.Threading.Tasks.Task<bool> IsNickNameDuplicatedAsync(string nickName, int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSaveGeneral", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSaveGeneralResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult MemberSaveGeneral(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestGeneral request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSaveGeneral", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSaveGeneralResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult> MemberSaveGeneralAsync(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestGeneral request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSaveCompany", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSaveCompanyResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult MemberSaveCompany(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestCompany request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSaveCompany", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSaveCompanyResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult> MemberSaveCompanyAsync(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestCompany request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberNameChange", ReplyAction="http://tempuri.org/IMemberInfoService/MemberNameChangeResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.NameChangeResult MemberNameChange(int userNumber, string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberNameChange", ReplyAction="http://tempuri.org/IMemberInfoService/MemberNameChangeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.NameChangeResult> MemberNameChangeAsync(int userNumber, string requestNo, string encryptedData);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoExistsResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao GetKakaoUserInfoExists(System.Nullable<int> userNumber, long kakaoId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoExistsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao> GetKakaoUserInfoExistsAsync(System.Nullable<int> userNumber, long kakaoId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoExistsResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook GetFacebookUserInfoExists(System.Nullable<int> userNumber, long facebookId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoExistsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook> GetFacebookUserInfoExistsAsync(System.Nullable<int> userNumber, long facebookId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetNaverUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetNaverUserInfoExistsResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver GetNaverUserInfoExists(System.Nullable<int> userNumber, long naverId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetNaverUserInfoExists", ReplyAction="http://tempuri.org/IMemberInfoService/GetNaverUserInfoExistsResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver> GetNaverUserInfoExistsAsync(System.Nullable<int> userNumber, long naverId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetKakaoUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao GetKakaoUserInfo(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetKakaoUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetKakaoUserInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao> GetKakaoUserInfoAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetFacebookUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook GetFacebookUserInfo(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetFacebookUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetFacebookUserInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook> GetFacebookUserInfoAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetNaverUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetNaverUserInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver GetNaverUserInfo(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetNaverUserInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetNaverUserInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver> GetNaverUserInfoAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberPasswordChange", ReplyAction="http://tempuri.org/IMemberInfoService/MemberPasswordChangeResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.PasswordChangeResult MemberPasswordChange(int userNumber, string passwordOriginal, string passwordNew, string passwordConfirm);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberPasswordChange", ReplyAction="http://tempuri.org/IMemberInfoService/MemberPasswordChangeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.PasswordChangeResult> MemberPasswordChangeAsync(int userNumber, string passwordOriginal, string passwordNew, string passwordConfirm);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberAgreementOption2Change", ReplyAction="http://tempuri.org/IMemberInfoService/MemberAgreementOption2ChangeResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.AgreementOption2ChangeResult MemberAgreementOption2Change(int userNumber, string option2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberAgreementOption2Change", ReplyAction="http://tempuri.org/IMemberInfoService/MemberAgreementOption2ChangeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AgreementOption2ChangeResult> MemberAgreementOption2ChangeAsync(int userNumber, string option2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSecession", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSecessionResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberSecessionResult MemberSecession(int userNumber, string secessionReasonKey, string secessionReasonDescription);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/MemberSecession", ReplyAction="http://tempuri.org/IMemberInfoService/MemberSecessionResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberSecessionResult> MemberSecessionAsync(int userNumber, string secessionReasonKey, string secessionReasonDescription);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/PasswordConfirm", ReplyAction="http://tempuri.org/IMemberInfoService/PasswordConfirmResponse")]
        bool PasswordConfirm(int userNumber, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/PasswordConfirm", ReplyAction="http://tempuri.org/IMemberInfoService/PasswordConfirmResponse")]
        System.Threading.Tasks.Task<bool> PasswordConfirmAsync(int userNumber, string password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetMemberGrade", ReplyAction="http://tempuri.org/IMemberInfoService/GetMemberGradeResponse")]
        Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel GetMemberGrade(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetMemberGrade", ReplyAction="http://tempuri.org/IMemberInfoService/GetMemberGradeResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel> GetMemberGradeAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetTvReplayAuthorityInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetTvReplayAuthorityInfoResponse")]
        Wow.Tv.FrontWeb.MemberInfoService.TvReplayAuthorityInfoModel GetTvReplayAuthorityInfo(int userNumber, int num);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetTvReplayAuthorityInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetTvReplayAuthorityInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.TvReplayAuthorityInfoModel> GetTvReplayAuthorityInfoAsync(int userNumber, int num);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/TvReplayPaymentByPoint", ReplyAction="http://tempuri.org/IMemberInfoService/TvReplayPaymentByPointResponse")]
        Wow.Tv.FrontWeb.MemberInfoService.TvReplayPaymentByPointModel TvReplayPaymentByPoint(int userNumber, int num, string ipAddress);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/TvReplayPaymentByPoint", ReplyAction="http://tempuri.org/IMemberInfoService/TvReplayPaymentByPointResponse")]
        System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.TvReplayPaymentByPointModel> TvReplayPaymentByPointAsync(int userNumber, int num, string ipAddress);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetMemberInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetMemberInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUser GetMemberInfo(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetMemberInfo", ReplyAction="http://tempuri.org/IMemberInfoService/GetMemberInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> GetMemberInfoAsync(string userId);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetUserDetail", ReplyAction="http://tempuri.org/IMemberInfoService/GetUserDetailResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserDetail GetUserDetail(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetUserDetail", ReplyAction="http://tempuri.org/IMemberInfoService/GetUserDetailResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserDetail> GetUserDetailAsync(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetUserSMS", ReplyAction="http://tempuri.org/IMemberInfoService/GetUserSMSResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.tblUserSMS GetUserSMS(int userNumber);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IMemberInfoService/GetUserSMS", ReplyAction="http://tempuri.org/IMemberInfoService/GetUserSMSResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSMS> GetUserSMSAsync(int userNumber);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IMemberInfoServiceChannel : Wow.Tv.FrontWeb.MemberInfoService.IMemberInfoService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class MemberInfoServiceClient : System.ServiceModel.ClientBase<Wow.Tv.FrontWeb.MemberInfoService.IMemberInfoService>, Wow.Tv.FrontWeb.MemberInfoService.IMemberInfoService {
        
        public MemberInfoServiceClient() {
        }
        
        public MemberInfoServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public MemberInfoServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MemberInfoServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public MemberInfoServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoResult MemberInfo(int userNumber) {
            return base.Channel.MemberInfo(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoResult> MemberInfoAsync(int userNumber) {
            return base.Channel.MemberInfoAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoGeneralResult MemberInfoGeneral(int userNumber) {
            return base.Channel.MemberInfoGeneral(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoGeneralResult> MemberInfoGeneralAsync(int userNumber) {
            return base.Channel.MemberInfoGeneralAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoCompanyResult MemberInfoCompany(int userNumber) {
            return base.Channel.MemberInfoCompany(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberInfoCompanyResult> MemberInfoCompanyAsync(int userNumber) {
            return base.Channel.MemberInfoCompanyAsync(userNumber);
        }
        
        public bool PasswordValidation(int userNumber, string password) {
            return base.Channel.PasswordValidation(userNumber, password);
        }
        
        public System.Threading.Tasks.Task<bool> PasswordValidationAsync(int userNumber, string password) {
            return base.Channel.PasswordValidationAsync(userNumber, password);
        }
        
        public bool IsNickNameDuplicated(string nickName, int userNumber) {
            return base.Channel.IsNickNameDuplicated(nickName, userNumber);
        }
        
        public System.Threading.Tasks.Task<bool> IsNickNameDuplicatedAsync(string nickName, int userNumber) {
            return base.Channel.IsNickNameDuplicatedAsync(nickName, userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult MemberSaveGeneral(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestGeneral request) {
            return base.Channel.MemberSaveGeneral(request);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult> MemberSaveGeneralAsync(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestGeneral request) {
            return base.Channel.MemberSaveGeneralAsync(request);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult MemberSaveCompany(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestCompany request) {
            return base.Channel.MemberSaveCompany(request);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserResult> MemberSaveCompanyAsync(Wow.Tv.Middle.Model.Db89.wowbill.Member.SaveUserRequestCompany request) {
            return base.Channel.MemberSaveCompanyAsync(request);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.NameChangeResult MemberNameChange(int userNumber, string requestNo, string encryptedData) {
            return base.Channel.MemberNameChange(userNumber, requestNo, encryptedData);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.NameChangeResult> MemberNameChangeAsync(int userNumber, string requestNo, string encryptedData) {
            return base.Channel.MemberNameChangeAsync(userNumber, requestNo, encryptedData);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao GetKakaoUserInfoExists(System.Nullable<int> userNumber, long kakaoId) {
            return base.Channel.GetKakaoUserInfoExists(userNumber, kakaoId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao> GetKakaoUserInfoExistsAsync(System.Nullable<int> userNumber, long kakaoId) {
            return base.Channel.GetKakaoUserInfoExistsAsync(userNumber, kakaoId);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook GetFacebookUserInfoExists(System.Nullable<int> userNumber, long facebookId) {
            return base.Channel.GetFacebookUserInfoExists(userNumber, facebookId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook> GetFacebookUserInfoExistsAsync(System.Nullable<int> userNumber, long facebookId) {
            return base.Channel.GetFacebookUserInfoExistsAsync(userNumber, facebookId);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver GetNaverUserInfoExists(System.Nullable<int> userNumber, long naverId) {
            return base.Channel.GetNaverUserInfoExists(userNumber, naverId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver> GetNaverUserInfoExistsAsync(System.Nullable<int> userNumber, long naverId) {
            return base.Channel.GetNaverUserInfoExistsAsync(userNumber, naverId);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao GetKakaoUserInfo(int userNumber) {
            return base.Channel.GetKakaoUserInfo(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSKakao> GetKakaoUserInfoAsync(int userNumber) {
            return base.Channel.GetKakaoUserInfoAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook GetFacebookUserInfo(int userNumber) {
            return base.Channel.GetFacebookUserInfo(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSFacebook> GetFacebookUserInfoAsync(int userNumber) {
            return base.Channel.GetFacebookUserInfoAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver GetNaverUserInfo(int userNumber) {
            return base.Channel.GetNaverUserInfo(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSNSNaver> GetNaverUserInfoAsync(int userNumber) {
            return base.Channel.GetNaverUserInfoAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.PasswordChangeResult MemberPasswordChange(int userNumber, string passwordOriginal, string passwordNew, string passwordConfirm) {
            return base.Channel.MemberPasswordChange(userNumber, passwordOriginal, passwordNew, passwordConfirm);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.PasswordChangeResult> MemberPasswordChangeAsync(int userNumber, string passwordOriginal, string passwordNew, string passwordConfirm) {
            return base.Channel.MemberPasswordChangeAsync(userNumber, passwordOriginal, passwordNew, passwordConfirm);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.AgreementOption2ChangeResult MemberAgreementOption2Change(int userNumber, string option2) {
            return base.Channel.MemberAgreementOption2Change(userNumber, option2);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.AgreementOption2ChangeResult> MemberAgreementOption2ChangeAsync(int userNumber, string option2) {
            return base.Channel.MemberAgreementOption2ChangeAsync(userNumber, option2);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberSecessionResult MemberSecession(int userNumber, string secessionReasonKey, string secessionReasonDescription) {
            return base.Channel.MemberSecession(userNumber, secessionReasonKey, secessionReasonDescription);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.Member.MemberSecessionResult> MemberSecessionAsync(int userNumber, string secessionReasonKey, string secessionReasonDescription) {
            return base.Channel.MemberSecessionAsync(userNumber, secessionReasonKey, secessionReasonDescription);
        }
        
        public bool PasswordConfirm(int userNumber, string password) {
            return base.Channel.PasswordConfirm(userNumber, password);
        }
        
        public System.Threading.Tasks.Task<bool> PasswordConfirmAsync(int userNumber, string password) {
            return base.Channel.PasswordConfirmAsync(userNumber, password);
        }
        
        public Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel GetMemberGrade(int userNumber) {
            return base.Channel.GetMemberGrade(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.MemberGradeModel> GetMemberGradeAsync(int userNumber) {
            return base.Channel.GetMemberGradeAsync(userNumber);
        }
        
        public Wow.Tv.FrontWeb.MemberInfoService.TvReplayAuthorityInfoModel GetTvReplayAuthorityInfo(int userNumber, int num) {
            return base.Channel.GetTvReplayAuthorityInfo(userNumber, num);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.TvReplayAuthorityInfoModel> GetTvReplayAuthorityInfoAsync(int userNumber, int num) {
            return base.Channel.GetTvReplayAuthorityInfoAsync(userNumber, num);
        }
        
        public Wow.Tv.FrontWeb.MemberInfoService.TvReplayPaymentByPointModel TvReplayPaymentByPoint(int userNumber, int num, string ipAddress) {
            return base.Channel.TvReplayPaymentByPoint(userNumber, num, ipAddress);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.FrontWeb.MemberInfoService.TvReplayPaymentByPointModel> TvReplayPaymentByPointAsync(int userNumber, int num, string ipAddress) {
            return base.Channel.TvReplayPaymentByPointAsync(userNumber, num, ipAddress);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUser GetMemberInfo(string userId) {
            return base.Channel.GetMemberInfo(userId);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUser> GetMemberInfoAsync(string userId) {
            return base.Channel.GetMemberInfoAsync(userId);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserDetail GetUserDetail(int userNumber) {
            return base.Channel.GetUserDetail(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserDetail> GetUserDetailAsync(int userNumber) {
            return base.Channel.GetUserDetailAsync(userNumber);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.tblUserSMS GetUserSMS(int userNumber) {
            return base.Channel.GetUserSMS(userNumber);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.tblUserSMS> GetUserSMSAsync(int userNumber) {
            return base.Channel.GetUserSMSAsync(userNumber);
        }
    }
}
