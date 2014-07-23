/**
 * sample Gruntfiles:
 * https://github.com/melonjs/melonJS
 * https://github.com/cabaret/grunt-starter/blob/master/Gruntfile.js
 */
module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

/////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),

        // Variables
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                ' Licensed <%= pkg.license %> */\n',

        // Tasks
        clean: {
            options:{
                force: true
            },
            dist: ["dist", "tmp"],
            tmp: ["tmp"],
            all: [
                "tmp",
                "dist",
                ".sass-cache",
                "node_modules",
                "public/bower_components"
            ]
        },

        watch: {
            compass: {
                files: ['public/scss/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            livereload: {
                files: ['public/css/*.css'],
                options: { livereload: true }
            }
        },

       compass: {  
            dist: {                  
              options: {              
                sassDir: 'public/scss',
                cssDir: 'tmp/css',
                environment: 'production'
              }
            },
            dev: {                    
              options: {
                sassDir: 'public/scss',
                cssDir: 'public/css'
              }
            }
        },

        cssmin: {
          add_banner: {
            options: {
              banner: '<%= banner %>',
              stripBanners: true
            },
            files: {
              'tmp/css/<%= pkg.name %>.min.css': ['tmp/css/main.css']
            }
          }
        },

        //unused
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true,
                removeOptionalTags:true,
              },
              files: {                                   // Dictionary of files
                'dist/index.html': 'dist/index.html'     // 'destination': 'source'
              }
            },
            dev: {                                       // Another target
              files: {
                'public/index.html': 'public/pre-index.html'
              }
            }
        },

        // modifies files using anotations of exclude and ifs
        preprocess:{
            options:{
                inline: true,
                context : {
                    DEBUG: true
                }
            },
            dist:{
                src: "tmp/replaced-index.html",
                dest:"dist/index.html",
                options:{
                    context : {
                        DEBUG: false
                    }
                }
            },
            dev:{
                src: "public/pre-index.html",
                dest:"public/index.html"
            }
        },

        requirejs: {
          compile: {
            options: {
                name: "app",
                baseUrl: "public/js/",
                mainConfigFile: "require.config.js",
                out: "tmp/<%= pkg.name %>.js"
            }
          }
        },

        replace : {
            options : {
                variables : {
                    "VERSION" : "<%= pkg.version %>",
                    "APP_NAME" : "<%= pkg.name %>.min"
                },
                prefix : "@",
                force : true
            },

            dist : {
                options : {
                    patterns : [
                        {
                            match : /this\._super\(\s*([\w\.]+)\s*,\s*"(\w+)"\s*(,\s*)?/g,
                            replacement : "$1.prototype.$2.apply(this$3"
                        },
                        {
                            match: 'timestamp',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ],
                },
                files : [
                    {
                        expand : true,
                        flatten : true,
                        src : [ "<%= requirejs.compile.options.out %>" ],
                        dest : "tmp/replaced/"
                    },
                    { src: ['public/pre-index.html'], dest: 'tmp/replaced-index.html'}
                ]
            }
        },

        uglify : {
            options : {
                report : "min",
                preserveComments : "some",
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist : {
                files : {
                    "dist/js/<%= pkg.name %>.min.js" : ["tmp/replaced/<%= pkg.name %>.js"]
                }
            }
        },

        jshint : {
            options : {
                jshintrc : ".jshintrc"
            },

            dist : {
                files : {
                    src : [ "public/js" ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: "public/", src: ['img/**'], dest: 'dist/'},
                    {expand: true, cwd: "tmp/css/", src: ['<%= pkg.name %>.min.css'], dest: 'dist/css'}
                ]
            },
            preindex: {
                src: 'pre-index.html',
                dest: 'index.html'
            }
        }

    });

/////////////////////////////////////////////////////////////////////////////////////////////////

    grunt.registerTask('default', ['preprocess:dev', 'compass:dev', 'watch']);
    grunt.registerTask("build", [ 
        "clean:dist",    //delete directories: tmp, dist
        "compass:dist",  //compile sass to tmp dir
        "cssmin",        //minify + add banner + copy to dist dir
        "jshint:dist",   //jsHint js source files under public/js
        "requirejs",     // compile to tmp dir a single js file according to require config
        "replace:dist", //replace in html file, variables with values, eg: appName and version + cacheBust
        "preprocess:dist", //preprocess html according to annotations
        "uglify",       // uglify and add banner to the js file generated in tmp by require
        "copy:dist",
        "clean:tmp"     // delete tmp dir
    ]);
    grunt.registerTask('hard-reset', ['clean:main']);

};