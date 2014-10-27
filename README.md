The Secrets Of The Full Stack Ninja - The Client Side Boilerplate
======

A modern fullstack web application boilerplate. 

Technology Stack: node, npm, git, grunt, expressjs, requirejs, backbonejs, marionettejs, twitter bootstrap

Install
----
```sh
git clone --depth 1 -b boilerplate --single-branch git@github.com:hamecoded/myBlog.git
```

Develop
----
```sh
npm install & bower install
grunt
```

Distribute
----
```sh
npm install
grunt build
```

```sh
NODE_ENV=production node server.js
```

Common Pitfalls
----
Currently requirejs configuration json in Gruntfile.js is a clone of whatever you use in require.config.js. So for `grunt build` to work you must manually copy your paths to the Gruntfile.js


License
----

MIT


