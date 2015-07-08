## Gulp Susy Starter 

Starter kit with: Gulp.js / Susy / Compass / svg-to-font (iconfont)

## Project Setup  

1. Clone the repo 

~~~
git clone https://github.com/simonemonetti/gulp-susy-starter-kit.git
~~~

2. Install Node dependencies 

~~~
$ npm install
~~~

3. Install Bower dependencies

~~~
$ bower install
~~~

## Usage 

The gruntfile in this project is setup to run `compass` and to watch the scss file for changes. 
Use the `gulp` command to start the process. 

~~~
$ gulp
~~~

## Create font from .svg icons

1. Place your .svg icons in app/assets/icons

2. Run

~~~
$ gulp fonts
~~~