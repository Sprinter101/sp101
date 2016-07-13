const gulp = require('gulp');
const util = require('gulp-util');
const path = require('path');
const args  = require('yargs').argv;
const livereload = require('gulp-livereload');
livereload({ start: true });


const modulesPath = args.modulesPath || path.join(__dirname, 'node_modules');
const gulpHelper =
    require(path.join(modulesPath, '/clobl/gulp-helper.js'))
        .use(gulp)
        .setPath({
            root: __dirname,
            modules: modulesPath,
            soy: {
                root: path.join(__dirname, 'build')
            },
            public: '/home/arzach/Desktop/sber-together-api/public/frontend'
        });

const quizGulpHelper =
    require('./gulp/gulp-helper')
        .setHelper(gulpHelper)
        .setOptions({
            modulesPath: path.resolve(__dirname, modulesPath)
        });

const apiAddress = args.apiAddress || require('./config/config.json').api.url;
const gulpConfig = require('./gulp/config.json');

const production = !!util.env.production;

//with gulp-helper

gulp.task('lint', function() {
    return gulpHelper.js.lint({
        ignore: gulpConfig
            .lintIgnore
            .map(ignoreItem => path.resolve(__dirname, ignoreItem))
    });
});

gulp.task('soy', function () {
    return gulpHelper.soy.build([]);
});

gulp.task('scripts', ['soy'], function () {
    return gulpHelper.js.build({
        outputFiles: [
            {
                entryPoint: 'sv.lSberVmeste.Main',
                fileName: 'scripts.js'
            }
        ]
        //,compile: true
    });
});

gulp.task('scripts-only', function () {
    return gulpHelper.js.build({
        outputFiles: [
            {
                entryPoint: 'sv.lSberVmeste.Main',
                fileName: 'scripts.js'
            }
        ]
        //,compile: true
    }).then(liveReloader.bind(this));
});

var liveReloader = function() {
    livereload.reload();
};

gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/blocks/l-sber-vmeste/assets/fonts/*.*'))
        .pipe(gulp.dest('/home/arzach/Desktop/sber-together-api/public/frontend/fonts'));
});

gulp.task('images', function () {
    return gulp.src([
        path.join(__dirname + '/blocks/**/**/*.{png,jpg}'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.ico'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.gif'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.jpg')
    ])
    .pipe(gulp.dest('/home/arzach/Desktop/sber-together-api/public/frontend/images'));
});

gulp.task('styles', ['images', 'fonts'], function () {
     return gulpHelper.css.build({
    }).pipe(livereload());
});

gulp.task('html', ['scripts'], function() {
    return quizGulpHelper.buildCordovaHtml({
        template: 'sv.lSberVmeste.Template.sberVmeste',
        templateParams: {
            data: {
                apiUrl: apiAddress
            }
        },
        dest: '/home/arzach/Desktop/sber-together-api/public/frontend/'
    });
});

gulp.task('watch', function () {

    livereload.listen();
    gulp.watch([
        path.join(__dirname, 'blocks', '/**/*.scss'),
        path.join(__dirname, 'blocks', '/**/*.css')
    ], ['styles']);

    gulp.watch(
        [path.join(__dirname, 'blocks', '/**/*.soy')],
        ['html']
    );
    gulp.watch(
        [path.join(__dirname, 'blocks', '/**/*.js')],
        ['scripts-only']
    );
    
});

const tasks = function (bool) {
    return bool ?
        ['soy', 'scripts', 'styles','fonts','images', 'html'] :
        ['watch', 'soy', 'scripts', 'styles', 'html'];
};

gulp.task('default', tasks(production));

gulp.task('build', [
    'html',
    'images',
    'fonts',
    'styles',
    'soy',
    'scripts'
]);