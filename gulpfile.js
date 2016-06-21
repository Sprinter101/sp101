const gulp = require('gulp');
const util = require('gulp-util');
const path = require('path');
const args  = require('yargs').argv;



const modulesPath = args.modulesPath || path.join(__dirname, 'node_modules');
const gulpHelper =
    require(path.join(modulesPath, '/clobl/gulp-helper.js'))
        .use(gulp)
        .setPath({
            root: __dirname,
            modules: modulesPath,
            soy: {
                root: path.join(__dirname, 'build')
            }
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

gulp.task('scripts', ['soy', 'lint'], function () {
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

gulp.task('fonts', function () {
    return gulp.src(path.join(__dirname + '/blocks/l-sber-vmeste/assets/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname + '/public/fonts')));
});

gulp.task('images', function () {
    return gulp.src([
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.png'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.ico'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.gif'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.jpg')
    ])
    .pipe(gulp.dest(path.join(__dirname + '/public/images')));
});

gulp.task('styles', ['images', 'fonts'], function () {
    return gulpHelper.css.build({
    });
});

gulp.task('html', ['scripts'], function() {
    return quizGulpHelper.buildCordovaHtml({
        template: 'sv.lSberVmeste.Template.sberVmeste',
        templateParams: {
            data: {
                apiUrl: apiAddress
            }
        },
        dest: path.join(__dirname, './public')
    });
});

gulp.task('watch', function () {
    gulp.watch(
        [path.join(__dirname, 'blocks', '/**/*.soy')],
        ['scripts']
    );
    gulp.watch(
        [path.join(__dirname, 'blocks', '/**/*.js')],
        ['scripts']
    );
    gulp.watch([
        path.join(__dirname, 'blocks', '/**/*.scss'),
        path.join(__dirname, 'blocks', '/**/*.css')
    ], ['styles']);
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
