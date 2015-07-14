## Gulp Susy Starter 

Starter kit with: Gulp.js / Susy / Compass / svg-to-font (iconfont)

## Project Setup  

1) Clone the repo 

~~~
git clone https://github.com/simonemonetti/gulp-susy-starter-kit.git
~~~

2) Install "compass" gem
~~~
gem install compass
~~~

3) Install Node dependencies 

~~~
$ npm install
~~~

4) Install Bower dependencies

~~~
$ bower install
~~~

## Usage 

The gulpfile in this project is setup to run `compass` and to watch the scss / js files for changes. 
Use the `gulp watch` command to start the process. 

~~~
$ gulp watch
~~~

## Create font from .svg icons / based on [gulp-iconfont](https://github.com/nfroidure/gulp-iconfont)

1. Place your .svg icons in app/assets/icons

2. Run gulp task

~~~
$ gulp fonts
~~~