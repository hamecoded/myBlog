Excercise 3 - adding Bower
=========
>15min


In this exercise you will
- install Bower using npm
- init a bower package
- configure Bower
- add frameworks to your project]

# Install Bower
```sh
npm install -g bower
```

# Initialize a new Bower project

Run the *bower.json* generator wizard.
You'll be asked to answer a number of questions, for example, *main* will stand for the file which serves as the entry point to the package.

The *ignore* property is where you list all those files that once your package is consumed as a dependency of another package it will deliver only those files when consumed for release.

```sh
bower init
```

![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/bower-init.png "Bower init wizard")

# Configure Bower
we'll want to have the *bower_components* directory under the public directory instead of the default root directory, where the clientside resources are at. For this purpose, we'll generate a *.bowerrc* file under the root directory and add the following configuration:

```
{
	"directory" : "public/bower_components"
}
```


# Add clientside frameworks

start installing libraries much like you would have done with npm.

you can search for packages either through the command-line or on [bower's site].

```sh
bower search bootstrap
```

```sh
bower install bootsrap --save-dev
```

```json
  "dependencies": {
    "bootstrap": "latest",
    "marionette": "latest",
    "requirejs": "latest",
    "requirejs-text": "latest",
    "mustache": "latest"
  }
```
[bower's site]:http://bower.io/search/
