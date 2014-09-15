require(["js/require.config.js"], function (baseConfig) {
    "use strict";

    // Set the require base configurations
    requirejs.config(baseConfig);

    //common requires to be loaded now that the require paths have been set
    require(["require", "backbone", "bootstrap"], function(require){
    	window.Mustache = require("mustache"); 

    	//app specific require
		require(["js/test.js"], function (test) {
			$("body").html(test);

		});
    	
    });
});