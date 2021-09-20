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
        }
    };
});
