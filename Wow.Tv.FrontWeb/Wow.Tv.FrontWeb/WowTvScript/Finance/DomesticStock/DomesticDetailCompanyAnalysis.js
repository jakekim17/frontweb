var iframeSrc;
var DomesticDetailCompanyAnalysis = {
    CompanyStatus: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=11&cID=S7";
        //alert(iframeSrc);
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    },
    CompanyOutline: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=12&cID=S7";
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    },
    CompanyState: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=13&cID=S7";
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    },
    CompanyRatio: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=14&cID=S7";
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    },
    CompanyIndicate: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=15&cID=S7";
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    },
    CompanyCompete: function (stockCode) {
        iframeSrc = "http://comp.fnguide.com/SVO/FnCompany.asp?gicode=" + stockCode + "&menuID=17&cID=S7";
        $("#cpAnalysisIframe").attr("src", iframeSrc);
    }
};

$(document).ready(function () {

    var companyAnalysisStockCode = $("#companyAnalysisStockCode").val();

    $("#companyAnalysisTab ul li a").on("click", function () {
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });

    $("#companyAnalysisTab #company-status").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyStatus(companyAnalysisStockCode);
    });

    $("#companyAnalysisTab #company-outline").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyOutline(companyAnalysisStockCode);
    });

    $("#companyAnalysisTab #financial-state").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyState(companyAnalysisStockCode);
    });

    $("#companyAnalysisTab #financial-ratio").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyRatio(companyAnalysisStockCode);
    });

    $("#companyAnalysisTab #invest-indicate").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyIndicate(companyAnalysisStockCode);
    });

    $("#companyAnalysisTab #compete").on("click", function () {
        DomesticDetailCompanyAnalysis.CompanyCompete(companyAnalysisStockCode);
    });

    DomesticDetailCompanyAnalysis.CompanyStatus(companyAnalysisStockCode);
});