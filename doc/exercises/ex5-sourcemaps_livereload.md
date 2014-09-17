# Exercise 5- Setting up your environment to work with sourcemaps and livereload

## Preperations
To have sourcemaps enabled you'll need to do some modification to your development environment:
1. update your sass gem
```
gem update sass
```
> failing to do so will result in errors when running compass

2. install compass alpha
```
gem install compass --pre
```

3. update your grunt-contrib-compass to latest
> either modify package.json dependency to *latest* rather than a specified version or manually state a version or use *npm-check-updates* module.

```
npm-check-updates -u
npm install
```
> if you haven't already installed it run ```npm install -g npm-check-updates```


###by now your sass gem will be bumped to version 3.4.4 and your compass to 1.1.0.alpha

##Config gruntfile
all you now have to do is to open your Gruntfile.js look for the compass configuration, the one that you'd like sourcemaps to be generated for you (compass:dev) and just add to it's options the sourcemap attribute which you'll set to true
```js
   compass: {
        dist: {
          ...
        },
        dev: {
          options: {
            sassDir: 'public/scss',
            cssDir: 'public/css',
            sourcemap: true //ADD THIS
          }
        }
    },
```
### now run your watch task to listen for changes
> make a change to your sass file and see that under your css directory adjacent to the css file which compass has compiled, there appears another file which was just generated and named exactly as the css but has the *.map* extension truncated to it.

##Setup Chrome Devtool
you are now all ready to setup Chrome Devtool. Follow the next steps:
1. open chrome devtool
2. open it's settings (cog icon) and under the general tab check the **"Enable CSS source maps"** and it's sub-option "Auto-reload generated CSS".
![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/devtool-enable_sourcemaps.png "Enable sourcemaps in Chrome")
3. now we need to allow chrome devtool to modify our file on the disk. For that, go to the workspace tab in the devtool settings and "Add Folder" where you'll browser to the root directory of your project in your filesystem. You'll be prompted to allow full access to the directory you specified.
![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/devtool_fs_access.png "Allow devtool access to your fs")
4.At this point you can load your app and notice that devtool refrences your css selectors to a sass src rather than a css src. Well that's yet not enough. For you to be able to modify sass on the disk:
- follow the link to your sass file. It would show you the file in the devtool *Sources* tab
- find the file in the Sources tree and right-click on the file to select the "Map To FileSystem Resource..". Since you've added your project directory to devtool workspace a selection popup will show you possible matching to the files in your system, based on path, select the right match and you'll be prompted to reload the inspector.
![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/map2fs.png "Map To Filesyatem Resource..")
![Alt text](https://raw.githubusercontent.com/hamecoded/myBlog/master/doc/exercises/img/map2fs-2.png "Apply fs mapping")
- once reloaded the source tree would show the projects folder rather than as domain based resource.

5.Now you can modify a sass file and use the CTRL+S to save it to disk
> an astrix(*) over the file would indicate a unsave modified file.

6.Together with grunt-contrib-watch livereload changing a sass in devtool will modify the disk which inturn will reload the inspector.d

> NOTE: This is necessary because currently if you edit a sass file in devtool the inspector will automatically switch to showing css and not sass **A BUG**, but when used with livereload it we'll reshow it as sass once changed file is reloaded from disk. Hence giving you the ultimate web development workflow for css.


##Configuring LiveReload
1. install *grunt-contrib-watch*
2. set Gruntfile accordingly
```js
  watch: {
    options: {
        livereload: true,
        ...
    },
```
3. add to your html file a livereload script
```html
	<script src="//localhost:35729/livereload.js"></script>
```
4. run the grunt watch task
5. ENJOY!!

>⚠ I like much more this approach than the approach of having a livereload extension installed on each of your browsers.

##Troubleshooting LiveReload
Once in a while livereload server ran by grunt watch may fuck up and require forced restart.
```sh
# how to kill a locked livereload port
➜  myBlog git:(master) ✗ grunt
Running "watch" task
Waiting...
Fatal error: Port 35729 is already in use by another process.
➜  myBlog git:(master) ✗ lsof -i tcp:35729
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google      308 odeds  209u  IPv4 0xa02f8facf3fa33fd      0t0  TCP localhost:50291->localhost:35729 (ESTABLISHED)
node      27569 odeds   12u  IPv4 0xa02f8facdaf1f3fd      0t0  TCP *:35729 (LISTEN)
node      27569 odeds   15u  IPv4 0xa02f8facdaf24be5      0t0  TCP localhost:35729->localhost:50289 (CLOSE_WAIT)
node      27569 odeds   16u  IPv4 0xa02f8facdb1ec3fd      0t0  TCP localhost:35729->localhost:50291 (ESTABLISHED)
➜  myBlog git:(master) ✗ kill -9 27569
[1]  + 27569 killed     grunt
➜  myBlog git:(master) ✗ lsof -i tcp:35729
➜  myBlog git:(master) ✗
```
