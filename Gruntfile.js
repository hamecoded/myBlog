/**
 * sample Gruntfiles:
 * https://github.com/melonjs/melonJS
 * https://github.com/cabaret/grunt-starter/blob/master/Gruntfile.js
 */
module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

/////////////////////////////////////////////////////////////////////////////////////////////////
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

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
            dist: ['dist', 'tmp'],
            tmp: ['tmp'],
            all: [
                'tmp',
                'dist',
                '.sass-cache',
                'node_modules',
                'public/bower_components'
            ]
        },

        // Run predefined tasks whenever watched file patterns are added, changed or deleted.
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            options: { 
                // https://github.com/gruntjs/grunt-contrib-watch
                livereload: true,
                atBegin: true //This option will trigger the run of each specified task at startup of the watcher. 
            },
            //watch for sass files changing ; recompile them ; and reload browser
            compass: {
                files: ['public/scss/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            //watch for changes in pre-index.html ; recompile index.html ; and refresh browser page
            preindex: {
                files: ['public/pre-index.html'],
                tasks: ['preprocess:dev']
            }
        },

        //compile sass to css
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
                src: 'tmp/replaced-index.html',
                dest:'dist/index.html',
                options:{
                    context : {
                        DEBUG: false
                    }
                }
            },
            dev:{
                src: 'public/pre-index.html',
                dest:'public/index.html'
            }
        },

        requirejs: {
          compile: {
            options: {
                name: 'app',
                baseUrl: 'public/js/',
                mainConfigFile: 'require.config.js',
                out: 'tmp/<%= pkg.name %>.js'
            }
          }
        },

        replace : {
            options : {
                variables : {
                    'VERSION' : '<%= pkg.version %>',
                    'APP_NAME' : '<%= pkg.name %>.min'
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
                        src : [ '<%= requirejs.compile.options.out %>' ],
                        dest : 'tmp/replaced/'
                    },
                    { src: ['public/pre-index.html'], dest: 'tmp/replaced-index.html'}
                ]
            }
        },

        uglify : {
            options : {
                report : 'min',
                preserveComments : 'some',
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist : {
                files : {
                    'dist/js/<%= pkg.name %>.min.js' : ['tmp/replaced/<%= pkg.name %>.js']
                }
            }
        },

        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },

            dist : {
                files : {
                    src : [ 'public/js' ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'public/', src: ['img/**'], dest: 'dist/'},
                    {expand: true, cwd: 'tmp/css/', src: ['<%= pkg.name %>.min.css'], dest: 'dist/css'}
                ]
            },
            preindex: {
                src: 'pre-index.html',
                dest: 'index.html'
            }
        }

    });

/////////////////////////////////////////////////////////////////////////////////////////////////

    grunt.registerTask('default', [
        'watch' // preprocess html and reload page
                // compass watch sass files and livereload
    ]);
    grunt.registerTask('build', [ 
        'clean:dist',    //delete directories: tmp, dist
        'compass:dist',  //compile sass to tmp dir
        'cssmin',        //minify + add banner + copy to dist dir
        'jshint:dist',   //jsHint js source files under public/js
        'requirejs',     //compile to tmp dir a single js file according to require config
        'replace:dist',  //replace in html file, variables with values, eg: appName and version + cacheBust and copy to tmp dir
        'preprocess:dist', //preprocess html according to annotations and copy to dist dir
        'uglify',       // uglify and add banner to the js file generated in tmp by require
        'copy:dist',    // copy to dist dir: public/img and tmp/css dir
        'clean:tmp'     // delete tmp dir
    ]);
    grunt.registerTask('hard-reset', ['clean:main']);

};