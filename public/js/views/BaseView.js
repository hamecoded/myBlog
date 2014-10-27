/**
 * View
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
    "use strict";

   	var template = require( "text!templates/base.html");

    var BaseView = Backbone.View.extend({
    	template: template,
    	events: {
    	},
    	initialize: function (options) {
            this.listenTo(this.model, "change", this.render);
            this.model.fetch();

            
    	},
    	render: function() {
    		var rendered = Mustache.to_html(this.template, this.model.toJSON()); 
			this.$el.html(rendered); //detached DOM element
			return this;
		}
		

    });
   
    return BaseView; 
});