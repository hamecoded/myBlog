# Exercise 4 -Requirejs and r.js


reference an [example r.js config] file the main documentation source of the many properties you can use.

>We'll want that requirejs config will serve both the rjs grunt task to generate the production package, and also serve the expanded execution code.

#[grunt-requirejs](https://github.com/asciidisco/grunt-requirejs) vs [grunt-contrib-requirejs](https://github.com/gruntjs/grunt-contrib-requirejs)
grunt-contrib-requirejs more frequently updated while the latter isn't. Also it is more talked about over the internet. Basically do the same.


#require vs define
Essentially, when you use require you are saying "i want this, but i want all its dependencies too". So in the example below, we're requiring A, but require will search for all dependencies and ensure they are loaded before continuing.

loading file B will have all dependencies loaded while loading file A alone will not load any of the dependencies just specify it depends on them.

>anything that is required need first to be defined

```js
// File B
require(['a'], function(a) {
    // b, c, d, e will be loaded
});

// File A
define(['b','c','d','e'], function() {
    return this;
});
```

#To module or not to module?

```js
requirejs: {
  compile: {
    options: {
        name: 'js/app', //starting point
        baseUrl: 'public',
        //mainConfigFile: 'public/js/require.config.js',  //not needed since app.js will preload it
        out: 'tmp/<%= pkg.name %>.js'
    }
  }
}
```
**verses**
```js
requirejs: {
  compile: {
    options: {
        //properties name out and mainConfigFile should not be defined when using modules
        baseUrl: 'public/js',
        modules: [
            {
                name: "app", //src starting point for rjs optimizer baseUrl+name+.js
                include: [
                    //listed here a filename to be truncated to the optimized file
                ],
                insertRequire: [
                    //adds a require([]) call to the end of the built file
                ],
                exclude:[
                    //ommit from app.js
                ],
                wrap: true
            }
        ],
        dir: 'dist/js/moduleA',
        renameTo: 'main'
    }
  }
}
```

#grunt truncation
if using mainConfigFile without any requirejs({}), require({}), requirejs.config({}) or require.config({}) call found in that file no truncation of none AMD complient files will be done. instead runtime will load them when required.
```js
requirejs.config({
    paths:{
        "vendor": "bower_components", //relative to Gruntfile: baseUrl: 'public'
        ...
```
verses
```js
define({
    paths:{
        "vendor": "../bower_components",//relative to execution of app.js
        ...
```


]






[example r.js config]:https://github.com/jrburke/r.js/blob/master/build/example.build.js
