const gulp = require('gulp');
const util = require('gulp-util');
const path = require('path');
const args  = require('yargs').argv;
const livereload = require('gulp-livereload');
const gulpConfig = require('./gulp/config.json');
const configFile = require('./config/config.json')

const compileToServer = true;

const apiAddress = args.apiAddress || configFile.api.url;
const production = !!util.env.production;
const pathToPublic = compileToServer ?
    '/home/arzach/Desktop/sber-together-api/public/frontend' :
    path.join(__dirname, 'public/');

const modulesPath = args.modulesPath ||
    path.join(__dirname, 'node_modules');

const gulpHelper =
    require(path.join(modulesPath, '/clobl/gulp-helper.js'))
        .use(gulp)
        .setPath({
            root: __dirname,
            modules: modulesPath,
            soy: {
                root: path.join(__dirname, 'build')
            },
            public: pathToPublic
        });

const quizGulpHelper =
    require('./gulp/gulp-helper')
        .setHelper(gulpHelper)
        .setOptions({
            modulesPath: path.resolve(__dirname, modulesPath)
        });

livereload({ start: true });

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
    }).then(liveReloader.bind(this));
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
        .pipe(gulp.dest(path.join(pathToPublic + '/fonts')));
});

gulp.task('images', function () {
    return gulp.src([
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.png'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.ico'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.gif'),
        path.join(__dirname + '/blocks/l-sber-vmeste/**/*.jpg')
    ])
    .pipe(gulp.dest(path.join(pathToPublic + '/images')));
});

gulp.task('sprite', function() {
    var params = {
        src: path.join(
            __dirname,
            'blocks/n-clobl/g-icon/g-icon_img/*.png'
        ),
        imgDir: '.',
        retina: {
            filters: [
                path.join(
                    __dirname,
                    'blocks/n-clobl/g-icon/g-icon_img/*@2x.png'
                )
            ],
        },
        cssDest: path.join(__dirname + '/blocks/n-clobl/g-icon')
    };

    return gulpHelper.sprite.build([params]);
});

gulp.task('styles', ['sprite', 'fonts'], function () {
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
        dest: pathToPublic
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
        ['soy', 'images', 'scripts', 'styles', 'html'];
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