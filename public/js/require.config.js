define({
    paths:{
        // Libraries
        // ---------
        "vendor": "bower_components",
        "underscore": "bower_components/underscore/underscore",
        "mustache": "bower_components/mustache/mustache",
        "jquery": "bower_components/jquery/dist/jquery.min",
        "backbone": "bower_components/backbone/backbone", //fully amd

        "marionette": "bower_components/marionette/lib/backbone.marionette.min", //already includes wreqr and babysitter
        "backbone.wreqr": "bower_components/backbone.wreqr/lib/backbone.wreqr.min", //kept for the backbone only example
        "backbone.babysitter": "bower_components/backbone.babysitter/lib/backbone.babysitter.min",

        "bootstrap": "bower_components/bootstrap/dist/js/bootstrap.min", //non-amd

        // Require Modules to be used as pragmas
        // ---------
        "text": "bower_components/requirejs-text/text",

        // Backbone Folder Structure
        // -------------------
        "models": "js/models",
        "collections": "js/collections",
        "controllers": "js/controllers",
        "views": "js/views",
        "templates": "templates"
    },
    shim:{
        //Globally exposed variables:
        //$ jQuery Backbone _ 
        //unexposed globally variables:
        //mustache(need exposing inorder to be used) bootstrap(built ontop of $)
        "backbone":{
            "deps":[
                "underscore",
                "mustache"
            ]
        },
        "backbone.wreqr":{
            "deps": ["backbone"]
        },
        "backbone.babysitter":{
            "deps": ["backbone"]
        },
        "marionette":{
            "deps":[
                "backbone",
                "backbone.wreqr",
                "backbone.babysitter"
            ]
        },
        "bootstrap":{
            "deps":["jquery"]
        }

    }
});