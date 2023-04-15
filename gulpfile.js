/**************** gulpfile__.js configuration ****************/

const

    // directory locations
    dir = {
        nm: 'node_modules/',
        theme: '.',
        src: 'src/',
        build: 'dist/'
    },
    url = 'http://starter.local',

    // modules
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    babel = require('gulp-babel'),
    browsersync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    PluginError = require('plugin-error'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass')(require('sass')),
    sassGlob = require('gulp-sass-glob'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    webpackStream = require('webpack-stream');

'use strict';

// Working environment
let isProd = false; // dev by default

// Default error handler
const onError = function (err) {

    console.log('An error occured:', err.message);
    this.emit('end');
};


/**************** fonts task ****************/

const fontsConfig = {

    src: dir.src + 'fonts/**/*',
    build: dir.build + 'fonts/',
    watch: dir.src + 'fonts/**/*',
};

function fonts() {

    return gulp.src(fontsConfig.src)
        .pipe(gulp.dest(fontsConfig.build));

}

/**************** images task ****************/

const imgConfig = {

    src: [dir.src + 'img/**/*'],
    build: dir.build + 'img/',
    watch: dir.src + 'img/**/*',
    minOpts: {
        optimizationLevel: 5
    }
};

function images() {

    return gulp.src(imgConfig.src)
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(imgConfig.build));

}

/**************** CSS task ****************/

const cssConfig = {

    src: [dir.src + 'scss/*.scss', './*.scss'],
    lint: dir.src + 'scss/**/*.scss',
    watch: [dir.src + 'scss/**/*', './*.scss'],
    build: dir.build + 'css/',
    main: dir.build + 'css/main.css',
    sassOpts: {
        sourceMap: false,
        outputStyle: 'compressed',
        imagePath: '../img/',
        precision: 5,
        errLogToConsole: true,
        includePaths: [
            dir.nm
        ]
    },
    cleanOpts: {
        level: {
            2: {
                mergeMedia: false
            }
        }
    },

    postCSS: [
        require('autoprefixer')
    ]

};

function css() {

    return gulp.src(cssConfig.src)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass(cssConfig.sassOpts).on('error', function (error) {
            const message = new PluginError('sass', error.messageFormatted).toString();
            process.stderr.write(`${message}\n`);
            this.emit('end');
            if (isProd) {
                throw new Error('Check your sass files');
            }
        }))
        .pipe(postcss(cssConfig.postCSS))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulpif(isProd, cleanCSS(cssConfig.cleanOpts)))
        .pipe(gulpif(isProd, sourcemaps.write('.')))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(cssConfig.build))
        .pipe(gulpif(!isProd, browsersync.reload({ stream: true })));
}

function cleanDest() {
    return gulp
        .src('dist', {
            allowEmpty: true
        })
        .pipe(rimraf());
}

/**************** JS task ****************/

const jsConfig = {

    srcMain: dir.src + '/js/main.js',
    srcCopy: [dir.src + 'js/copy/*.js'],
    watch: dir.src + 'js/**/*',
    build: dir.build + 'js/'

};

const jsBabelOpts = {
    presets: ['@babel/preset-env']
};


function js() {

    return gulp.src(jsConfig.srcMain)
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpackStream({
            mode: isProd ? 'production' : 'development',
            output: {
                filename: 'main.js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: "defaults"
                                }]
                            ]
                        }
                    }
                }]
            },
            devtool: !isProd ? 'source-map' : false
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
        })
        .pipe(gulp.dest(jsConfig.build))
        .pipe(gulpif(!isProd, browsersync.reload({ stream: true })));
}

function jsCopy() {

    return gulp.src(jsConfig.srcCopy)
        .pipe(gulp.dest(jsConfig.build));
}


/**************** browser-sync task ****************/

const syncConfig = {
    proxy: {
        target: url
    },
    port: 8000,
    files: [
        './**/*.html'
    ],
    open: false
};

// browser-sync
function bs() {

    return  browsersync.init({
        server: {
            baseDir: "./"
        }
    });
}

/**************** watch task ****************/

function watchimages() {
    gulp.watch(imgConfig.watch, images);
}

function watchjs() {
    gulp.watch(jsConfig.watch, js);
}

function watchjsCopy() {
    gulp.watch(jsConfig.watch, jsCopy);
}

function watchcss() {
    gulp.watch(cssConfig.watch, gulp.series(css));
}

function watchfonts() {
    gulp.watch(fontsConfig.watch, fonts);
}

const toProd = (done) => {
    isProd = true;
    done();
};

const start = gulp.parallel(fonts, images, css, js, jsCopy, watchcss, watchjs, watchjsCopy, watchfonts, watchimages);
const watch = gulp.parallel(fonts, images, css, js, jsCopy, bs, watchcss, watchjs, watchjsCopy, watchfonts, watchimages);
const build = gulp.series(toProd, cleanDest, gulp.parallel(fonts, images, css, js, jsCopy));

exports.css = css;
exports.images = images;
exports.js = js;
exports.jsCopy = jsCopy;
exports.bs = bs;
exports.watchimages = watchimages;
exports.watchfonts = watchfonts;
exports.watchjs = watchjs;
exports.watchjsCopy = watchjsCopy;
exports.watchcss = watchcss;
exports.cleanDest = cleanDest;

exports.default = start;
exports.watch = watch;
exports.build = build;
