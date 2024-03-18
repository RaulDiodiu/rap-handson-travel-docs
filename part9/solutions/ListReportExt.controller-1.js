sap.ui.define("com.erp.lrp.listreport.ext.controller.ListReportExt", [],
function (){
    "use strict";
    return {
        //(...) other methods are defined above getCustomAppStateDataExtension, restoreCustomAppStateDataExtension, onBeforeRebindTableExtension
        onExtensionButtonPressed: function(oEvent) {
            const sExternalPage = this.getView().byId("customFilter").getValue();
            window.open(sExternalPage);
        }
    };
});
