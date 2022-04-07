const {
   src,
   dest,
   series,
   parallel,
   watch
} = require('gulp');

// 搬檔案
// 搬圖片
function package() {
   return src(['src/img/**/*.*' , 'src/img/*.*']).pipe(dest('dist/img'))
}
const rename = require('gulp-rename');

// 搬php
// function package() {
//    return src(['src/img/**/*.*' , 'src/img/*.*']).pipe(dest('dist/img'))
// }
// const movephp = require('gulp-rename');

// css minify
const cleanCSS = require('gulp-clean-css');

function minicss() {
   return src('src/*.css')
      .pipe(cleanCSS())
      .pipe(rename({
         extname: '.min.css'
      }))
      .pipe(dest('dist/css'))
}

exports.c = minicss;

//  js minify ckeck 
const uglify = require('gulp-uglify');


function minijs() {
   return src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(rename({
         extname: '.min.js' // 修改附檔名
         //prefix : 'web-' // 前綴字
         //suffix : '-min'  // 後綴字
         //basename : 'all' //更名
      }))
      .pipe(dest('dist/js'))
}

exports.ugjs = minijs;

// 整合所有檔案



const concat = require('gulp-concat');


function concatall_css() {
   return src('src/*.css')
      .pipe(concat('all.css')) // 整合成一隻css
      .pipe(cleanCSS()) // minify css
      .pipe(dest('dist/css'));
}

exports.allcss = concatall_css;



// sass 編譯
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');


function sassstyle() {
   return src('./src/sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      // .pipe(sass.sync({
      //    outputStyle: 'compressed'  //gulp sass 內建壓縮
      // }).on('error', sass.logError))
      //.pipe(cleanCSS()) // minify css
      .pipe(sourcemaps.write())
      .pipe(dest('./dist/css'));
}

exports.s = sassstyle;

// 合併html

const fileinclude = require('gulp-file-include');

function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}

exports.html = includeHTML;


function watchall(){
   watch(['src/*.html' , 'src/layout/*.html' ,] , includeHTML);
   watch(['src/sass/*.scss' , 'src/sass/**/*.scss'] , sassstyle);
   
}
exports.w = watchall



const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch(['src/*.html' , 'src/layout/*.html' ,] , includeHTML).on('change' , reload);
    watch(['src/sass/*.scss' , 'src/sass/**/*.scss'] , sassstyle).on('change' , reload);
    watch(['src/js/*.js' , 'src/js/**/*.js'] , minijs).on('change' , reload);
    watch(['src/img/*.*' ,  'src/img/**/*.*'] , package).on('change' , reload);
    done();
}

// 圖片壓縮
const imagemin = require('gulp-imagemin');

function min_images(){
    return src(['src/img/*.*' , 'src/img/**/*.*'])
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

exports.minimg = min_images

 // js 瀏覽器適應 babel es6 -> es5

 const babel = require('gulp-babel');

 function babel5() {
     return src(['src/js/*.js' , 'src/js/**/*.js'])
         .pipe(babel({
             presets: ['@babel/env']
         }))
         .pipe(uglify())
         .pipe(dest('dist/js'));
 }

 exports.es5 =babel5

 // 清除舊檔案

const clean = require('gulp-clean');

function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}


exports.cls = clear




// dev
exports.default = series(parallel(includeHTML ,sassstyle, minijs ,package),browser)

// online
exports.online = series(clear, parallel(includeHTML ,sassstyle , babel5 , min_images))
