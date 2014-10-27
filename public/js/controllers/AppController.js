/**
 * App Router
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(["require",
    "models/BaseModel", "views/BaseView"], 
	function (require, BaseModel, BaseView) {
    "use strict";
	
    var AppController = Backbone.Router.extend({
    	routes: {
    		"": "home",
    		"base": "showWidget"
    	},
    	initialize: function(){

    	},
		// Handlers
		home: function(){
			this.navigate("/base", {trigger: true, replace: true});
		},
    	showWidget: function () {
    		console.log("base");
			var baseModel = new BaseModel();

            var baseView = new BaseView({
                el: "body",
                model: baseModel
            }); 
    	}

    });
			
   
    return AppController; 
});