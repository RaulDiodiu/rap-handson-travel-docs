sap.ui.define("com.erp.lrp.listreport.ext.controller.ListReportExt", [],
function (){
    "use strict";
    return {
        onExtensionButtonPressed: function(oEvent) {
            var sExternalPage = this.getView().byId("customFilter").getValue();
            window.open(sExternalPage);
        }
    };
});
