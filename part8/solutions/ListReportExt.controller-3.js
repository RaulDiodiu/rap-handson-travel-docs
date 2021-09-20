sap.ui.define("com.erp.lrp.listreport.ext.controller.ListReportExt", [],
function (){
    "use strict";
    return {
        onExtensionButtonPressed: function(oEvent) {
            var sExternalPage = this.getView().byId("customFilter").getValue();
            window.open(sExternalPage);
        },
        onRowButtonPressed: function(oEvent) {
            var sAgencyName = oEvent.getSource().getBindingContext().getProperty("AgencyName");
            sap.m.MessageToast.show(sAgencyName + " was pressed");
        },
        onExtensionButton2Pressed: function(oEvent) {
            var aSelection = this.extensionAPI.getSelectedContexts();
            var fnReduction = function(sValue, oContext) {
                var sCurrentValue = oContext.getProperty("AgencyName");
                if(sValue.length === 0) {
                    return sCurrentValue;
                } else {
                    return sValue + ", " + sCurrentValue;
                }
            };
            var sMessageText = aSelection.reduce(fnReduction, "") + " were selected";
            sap.m.MessageToast.show(sMessageText);
        }
    };
});
