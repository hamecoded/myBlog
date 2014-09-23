/**
 * Gruntfiles exercise:
 * 
 * follow: https://github.com/hamecoded/myBlog/blob/master/doc/exercises/ex2-grunt.md
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
       
        // TODO: Define a Watch task for transpiling sass into css upon sass file change

        // TODO: Define your compass task for both dev and build tasks

        // TODO: Uglify your javascript and save it under the dist directory naming it after the package name.
    });

/////////////////////////////////////////////////////////////////////////////////////////////////

    // TODO: Define the dev task as the default task
    grunt.registerTask('default', [
        
    ]);
    // TODO: Define the build task 
    grunt.registerTask('build', [ 
       
    ]);

};