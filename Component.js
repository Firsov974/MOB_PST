// redirect library path
if (window.location.hostname !== "") {
    var sLibPath = jQuery.sap.getModulePath("sbt.mob.lib");
    var sPstPath = jQuery.sap.getModulePath("sbt.mob.pst");
    if (sLibPath.indexOf("resources") !== -1) {
        jQuery.sap.registerModulePath("sbt.mob.lib", sPstPath.split("zsb_hr_mob_pst")[0] + "zsb_hr_mob_lib/sbt/mob/lib/");
        sap.ui.getCore().loadLibrary("sbt.mob.lib");
    }
}
sap.ui.define([
   'sap/ui/core/UIComponent',
   'sap/ui/model/json/JSONModel'
], function (UIComponent, JSONModel) {
	'use strict';
	return UIComponent.extend('sbt.mob.pst.Component', {
		metadata : {
			manifest: "json"
	    },

	    init : function () {
	        UIComponent.prototype.init.apply(this, arguments);
            var oRouter = this.getRouter();
            this._initDeviceModel();
            this._initCommonDataModel();
            oRouter.attachRouteMatched(this._onAnyRouteMatched, this);
			oRouter.initialize();
		    try {
			    sap.ui.getCore().byId("shell")._showHeader = false;
			    sap.ui.getCore().byId("shell").setHeaderVisible(false);
		    } catch (ex) {
				console.log(ex); // eslint-disable-line
			}
	    },
        _onAnyRouteMatched: function(oEvent) {
            var sName = oEvent.getParameter("name"),
                mArgs = oEvent.getParameter("arguments"),
                oCommonDataModel = this.getModel("commonData");
            switch (sName) {
                case "object":
                case "externalObject":
                    oCommonDataModel.setProperty("/currentTask", mArgs.WiId);
                    break;
                default:
                    oCommonDataModel.setProperty("/currentTask", null);
            }
        },
        _initDeviceModel: function() {
            var oModel = new JSONModel(sap.ui.Device);
            this.setModel(oModel, "device");
        },
        _initCommonDataModel: function() {
            var oModel = new JSONModel({
                currentTask: null
            });
            this.setModel(oModel, "commonData");
        }
   });
});
