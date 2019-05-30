sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
  	"sap/m/MessageToast",
  	"sap/ui/model/json/JSONModel"
], function(Controller,Sorter,Filter,FilterOperator,MessageToast,JSONModel) {
	"use strict";
	return Controller.extend("demo01.controller.Table", {
		onInit : function () {
			var oJSONData = {
				busy : false,
				order : 0
			};
			var oModel = new JSONModel(oJSONData);
			this.getView().setModel(oModel, "TableView");
		},
		onFilter:function(oEvent){
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Carrid",FilterOperator.Contains,sQuery));
			}
			// filter binding
			var oList = this.byId("table");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onSort:function(){
		var oView = this.getView(),
			aStates = [undefined, "asc", "desc"],
			aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
			sMessage,
			iOrder = oView.getModel("TableView").getProperty("/order");

			iOrder = (iOrder + 1) % aStates.length;
			var sOrder = aStates[iOrder];

			oView.getModel("TableView").setProperty("/order", iOrder);
			oView.byId("table").getBinding("items").sort(sOrder && new Sorter("Carrid", sOrder === "desc"));

			sMessage = aStateTextIds[iOrder];
			MessageToast.show(sMessage);
		}

	});
});