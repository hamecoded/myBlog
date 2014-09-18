require(["js/require.config"], function (baseConfig) {
    "use strict";

    // Set the require base configurations
    requirejs.config(baseConfig);

    //common requires to be loaded now that the require paths have been set
    require(["require", "mustache", "backbone", "marionette", "bootstrap"], function(require, mustache, backbone, marionette){

    	//app specific require
		require(["js/test"], function (test) {
			$("body").html(test);

		});
    	
    });
});