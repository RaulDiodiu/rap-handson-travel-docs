sap.ui.define("com.erp.lrp.listreport.ext.controller.ListReportExt", [],
function (){
    "use strict";
    return {
        //(...) other methods are defined above getCustomAppStateDataExtension, restoreCustomAppStateDataExtension, onBeforeRebindTableExtension
        onExtensionButtonPressed: function(oEvent) {
            let sExternalPage = this.getView().byId("customFilter").getValue();
            window.open(sExternalPage);
        },
        onRowButtonPressed: function(oEvent) {
            let sAgencyName = oEvent.getSource().getBindingContext().getProperty("AgencyName");
            sap.m.MessageToast.show(sAgencyName + " was pressed");
        },
        onExtensionButton2Pressed: function(oEvent) {
            const aSelection = this.extensionAPI.getSelectedContexts();
            const fnReduction = function(sValue, oContext) {
                let sCurrentValue = oContext.getProperty("AgencyName");
                if(sValue.length === 0) {
                    return sCurrentValue;
                } else {
                    return sValue + ", " + sCurrentValue;
                }
            };
            const sMessageText = aSelection.reduce(fnReduction, "") + " were selected";
            sap.m.MessageToast.show(sMessageText);
        }
    };
});
