Excercise 2 - Setting up your grunt file
=========
>1.5h

In this exercise you will

  - Install Grunt
  - Create Gruntfile.js off a template
  - Add Grunt tasks
  - Define build task
  - Define a dev watch task

> use these [tips]

Installing Grunt
----
Before we begin setting our project with grunt, we first need to have grunt installed on our system, so that we can use it's command line interface in our terminal.
````sh
    npm install -g grunt-cli
````

Having grunt installed on our system we now add the grunt module to our project]

````sh
    npm install grunt --save-dev
````

Adding more plugins
----
You can either use the cli to add modules selectively or add them directly to npm package.json file.

```sh
npm install grunt-contrib-clean --save-dev
npm install grunt-contrib-compass --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-requirejs --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-preprocess --save-dev
npm install grunt-replace --save-dev
npm install load-grunt-tasks --save-dev
```

```json
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compass": "^0.9.0",
    "grunt-contrib-copy": "^0.5.0",
    "grunt-contrib-cssmin": "^0.10.0",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-requirejs": "^0.4.4",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-preprocess": "^4.0.0",
    "grunt-replace": "~0.7.8",
    "load-grunt-tasks": "^0.6.0"
  }
```

Define a build task
----
> Follow the presentation slide regarding this flow

This task completion crieteria is to __at least__ define these 3 important modules:
1. define compass through gruntfile rather than through config.rb to transpile your sass into css.
2. Same follows to linting JavaScript through jsHint (see below).
3. And preprocess your html to account for dev and release configurations.

_requirejs through r.js is another important task but we'll come across this later._



Setting Up jsHint (grunt-contrib-jshint)
----

Though you have [jsHint] set for your project it's best you also install the global package to give you cli interface for validating your JavaScript files.

You can find a default .jshintrc file [here]


> An important comment regarding global installs of modules
> is that you should make sure your shell rc has the $PATH updated to include the global npm folder /usr/local/lib/node_modules
> npm install -g jshint


[grunt-init]:http://gruntjs.com/project-scaffolding
[grunt-init-gruntfile]:https://github.com/gruntjs/grunt-init-gruntfile
[jsHint]:http://www.jshint.com/docs/
[here]:https://github.com/jshint/jshint/blob/master/examples/.jshintrc
[tips]:https://github.com/hamecoded/myBlog/blob/master/doc/exercises/ex2-tips.md
