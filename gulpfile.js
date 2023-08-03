const {src, dest, watch, parallel, series}  = require('gulp');


const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

function prepareScripts(){
    return src([
        'app/js/*.js', 
        '!app/js/main.min.js',
        '!app/js/jquery.min.js',
        '!app/js/slick.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function prepareStyles() {
    return src('app/scss/*.scss', {base: 'app/scss'})
    .pipe(concat('main.min.css', {base: }))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function observe(){
    watch(['app/scss/*.scss'], prepareStyles)
    watch([
        'app/js/*.js', 
        '!app/js/main.min.js',
        '!app/js/jquery.min.js',
        '!app/js/slick.min.js'
    ], prepareScripts)
    watch(['app/**/*.html']).on('change', browserSync.reload)
}

function browserRefresh(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return src('dist/*')
    .pipe(clean())
}

 
function build(){
    return src([
        'app/css/*.min.css',
        'app/js/*.min.js',
        'app/**/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

exports.styles = prepareStyles;
exports.scripts = prepareScripts;
exports.observe = observe;
exports.browser = browserRefresh;
exports.clean = cleanDist;

exports.build = series(cleanDist, build);
exports.default = series(prepareStyles, prepareScripts, browserRefresh, observe);


/*
https://www.npmjs.com/package/gulp-rename
gulp.src("./src/**/hello.txt")
.pipe(rename(function (path) {
    // Returns a completely new object, make sure you return all keys needed!
    return {
      dirname: path.dirname + "/ciao",
      basename: path.basename + "-goodbye",
      extname: ".md"
    };
  }))
*/