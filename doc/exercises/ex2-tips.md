Tips for Excercise 2
=========

To help you out in configuring your gruntfile npm offers a number of tasks to aid your grunting process\

  - Creating a Gruntfile.js off a template using grunt-init
  - Updating npm modules using npm-check-updates
  - load tasks from your gruntfile without needing to register them using load-grunt-tasks

grunt-init
----

Having installed grunt, we can start adding plugins to our project, but say we are lazy and want to start off a template Gruntfile.js we'll need a couple of more system wide grunt npm modules installed, the first one to be is [grunt-init] and to go with that we'll also want [grunt-init-gruntfile]. The two basically will have us scaffold our gruntfile in a friendly cli wizard.
````sh
    npm install -g grunt-init
    npm install -g grunt-init-gruntfile
````
we then can call ``grunt-init gruntfile`` and walkthrough the questions the wizard displays. The result is a new Gruntfile.js file with it's plugins registered into your npm package.json file.

![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/grunt-gen.png "Gruntfile through wizard")

> Note that this will override your existing package.json file so back it up first

We'll be adding more plugins along the way, but for the time being lets fix the paths to point to where our project folders.


npm-check-updates
----

Another general tool that can come handy
````sh
# updates package.json to latest version
$ npm install -g npm-check-updates
$ npm-check-updates -u
$ npm install
````
![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/npm-update.png "Updates package.json modules to latest versions")

load-grunt-tasks
----

```sh
npm install load-grunt-tasks --save-dev
```

# Grunt Preprocess
>[link](https://github.com/jsoverson/grunt-preprocess)

used mainly to add conditionals into html files, hence omitting code fragments through booleans.
It can also replace variables inside the files by adding a comment block with the @echo VARIABLE syntax. I personally find it uncomfortable and prefer using grunt-contrib-replace for switching variables with their values, where the @ is a good enough identifier.

[grunt-init]:http://gruntjs.com/project-scaffolding
[grunt-init-gruntfile]:https://github.com/gruntjs/grunt-init-gruntfile
[jsHint]:http://www.jshint.com/docs/
[here]:https://github.com/jshint/jshint/blob/master/examples/.jshintrc

