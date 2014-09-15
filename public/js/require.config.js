define({
    paths:{
        // Libraries
        // ---------
        "vendor": "../bower_components",
        "underscore": "../bower_components/underscore/underscore",
        "mustache": "../bower_components/mustache/mustache",
        "jquery": "../bower_components/jquery/dist/jquery",
        "backbone": "../bower_components/backbone/backbone",
        "backbone.wreqr": "../bower_components/backbone.wreqr/lib/backbone.wreqr",
        "backbone.babysitter": "../bower_components/backbone.babysitter/lib/backbone.babysitter",
        "marionette": "../bower_components/marionette/lib/backbone.marionette",
        "bootstrap": "../bower_components/bootstrap/dist/js/bootstrap",

        // Require Modules to be used as pragmas
        // ---------
        "text": "../bower_components/requirejs-text/text",

        // Backbone Folder Structure
        // -------------------
        "models": "models",
        "collections": "collections",
        "routers": "routers",
        "views": "views",
        "templates": "../templates"
    },
    shim:{
        "underscore":{
            // Exports the global window._ object
            "exports": "_"
        },
        "jquery":{
            "exports": "$"
        },
        "backbone":{
            "exports": "Backbone",
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
            "exports": "Marionette",
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