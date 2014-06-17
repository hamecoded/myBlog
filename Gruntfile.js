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

        path : {
            raw : "tmp/<%= pkg.name %>.js",
            replaced:  "tmp/replaced/<%= pkg.name %>.js",
            minJS : "dist/js/<%= pkg.name %>.min.js",
            minCSS : "dist/css/<%= pkg.name %>.min.css"
        },

        // Tasks
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
              '<%= path.minCSS %>': ['tmp/css/main.css']
            }
          }
        },

        requirejs: {
          compile: {
            options: {
                name: "app",
                baseUrl: "public/js",
                mainConfigFile: "require.config.js",
                out: "<%= path.raw %>"
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
                    ],
                },
                files : [
                    {
                        expand : true,
                        flatten : true,
                        src : [ "<%= path.raw %>" ],
                        dest : "tmp/replaced/"
                    },
                    {expand: true, flatten: true, src: ['public/index.html'], dest: 'dist/'}
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
                    "<%= path.minJS %>" : [
                        "<%= path.replaced %>"
                    ]
                }
            }
        },

        jshint : {
            options : {
                jshintrc : ".jshintrc"
            },

            beforeConcat : {
                files : {
                    src : [ "public/js" ]
                }
            },

            afterConcat : {
                files : {
                    src : [ "<%= path.replaced %>" ]
                }
            }
        },

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

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: "public/", src: ['img/**'], dest: 'dist/'}
                ]
            }
        },

        cacheBust: {
            options: {
              encoding: 'utf8',
              algorithm: 'md5',
              length: 16
            },
            assets: {
                files: [{
                    src: [ "dist/index.html" ]
                }]
            }
        }

       
    });

/////////////////////////////////////////////////////////////////////////////////////////////////

    grunt.registerTask('default', ['compass:dev', 'watch']);
    grunt.registerTask("build", [ 
        "clean:dist", "compass:dist", "cssmin", "jshint:beforeConcat", "requirejs", 
        "replace:dist", "jshint:afterConcat" , "uglify", "cacheBust", "copy:dist", "clean:tmp" 
    ]);
    grunt.registerTask('hard-reset', ['clean:main']);

};