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
        }
    };
});
