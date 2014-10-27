define(function(require) {
    "use strict";
    
    var BaseModel = Backbone.Model.extend({
    	defaults: {
            id: 2,
    		title: "no title",
    		author: "anonymous",
    		thmbnail: "http://placehold.it/900x300",
    		category: "",
    		date: "30-12-2014",
    		preview: "no preview",
    		content: null
    	},
    	urlRoot: "http://private-anon-8393376f0-blog4.apiary-mock.com/posts/" //for loading independently of being associated to a collection


    });
   
    return BaseModel; 
});