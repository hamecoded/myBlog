Excercise 2 - Setting up your grunt file
=========

This exercise covers

  - Installing Grunt 
  - Creating a Gruntfile.js off a template
  - Adding and Configuring different Grunt tasks

Installing Grunt
----
Before we begin setting our project with grunt, we first need to have grunt installed on our system, so that we can use it's command line interface in our terminal. 
````sh
    npm install -g grunt-cli
````
Having installed grunt, we can start adding plugins to our project, but say we are lazy and want to start off a template Gruntfile.js we'll need a couple of more system wide grunt npm modules installed, the first one to be is [grunt-init] and to go with that we'll also want [grunt-init-gruntfile]. The two basically will have us scaffold our gruntfile in a friendly cli wizard.
````sh
    npm install -g grunt-init
    npm install -g grunt-init-gruntfile
````
we then can call ``grunt-init gruntfile`` and walkthrough the questions the wizard displays. The result is a new Gruntfile.js file with it's plugins registered into your npm package.json file.

![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/misc/img/grunt-gen.png "Gruntfile through wizard")

> Note that this will override your existing package.json file so back it up first

We'll be adding more plugins along the way, but for the time being lets fix the paths to point to where our project folders.


Adding more plugins
----
Our template is a great starting point, but for the purpose of our project we'll be needing some additional plugins.
You can either use the cli to add modules selectively or add them directly to npm package.json file.

```sh
npm install load-grunt-tasks --save-dev 
npm install grunt-contrib-compass --save-dev
npm install grunt-contrib-requirejs --save-dev
npm install grunt-contrib-clean --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-cache-bust --save-dev
npm install grunt-replace --save-dev
```

```json
 "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-cache-bust": "^0.3.9",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compass": "^0.8.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-cssmin": "^0.10.0",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-requirejs": "^0.4.4",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-replace": "~0.7.8",
    "load-grunt-tasks": "^0.5.0"
  }
```

Another general tool that can come handy
````sh
# updates package.json to latest version
$ npm install -g npm-check-updates
$ npm-check-updates -u
$ npm install 
````
Though you have [jsHint] set for your project it's best you also install the global package to give you cli interface for validating your JavaScript files.

You can find a default .jshintrc file [here]
> An important comment regarding global installs of modules
> is that you should make sure your shell rc has the $PATH updated to include the global npm folder /usr/local/lib/node_modules
> npm install -g jshint


[grunt-init]:http://gruntjs.com/project-scaffolding
[grunt-init-gruntfile]:https://github.com/gruntjs/grunt-init-gruntfile
[jsHint]:http://www.jshint.com/docs/
[here]:https://github.com/jshint/jshint/blob/master/examples/.jshintrc

