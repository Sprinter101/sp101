/**
 * TODO: refactor
 */

const path = require('path');
const fs = require('fs');
const q = require('q');

/**
 * GulpHelper
 * @constructor
 */
var GulpHelper = function() {
    /**
     * Soy instance
     * @type {Object}
     */
    this.soy = null;

    /**
     * Gulp helper from clobl instance
     * @type {Object}
     */
    this.helper = null;

    /**
     * Soy Files
     * @type {Array.<string>}
     */
    this.soyFiles_ = [];
};

/**
 * Paths to soy files
 * @type {Array.<string>}
 */
GulpHelper.SOY_FILES = [
    'clobl/blocks/i-utils/i-utils.js',
    path.join(
        __dirname, '../build/compiledServerSoy/server.soy.concat.js'
    )
];

/**
 * Setter for soy options
 * @param  {Object} options
 * @return {GulpHelper}
 */
GulpHelper.prototype.setSoyOptions = function(options) {
    this.soy.setOptions(options);

    return this;
};

/**
 * Setter for options
 * @param  {object} options
 * @return {GulpHelper}
 */
GulpHelper.prototype.setOptions = function(options) {
    var modulesPath = options.modulesPath ||
        path.join(__dirname, 'node_modules');
    this.soy = require(path.join(modulesPath, 'clobl/soy'));
    this.soy.setOptions({
        templateFactory: path.join(
            __dirname,
            '../blocks/n-clobl/i-factory/TemplateFactory.js'
        ),
        closureLibrary: path.join(modulesPath, 'google-closure-library'),
        closureTemplates: path.join(modulesPath, 'closure-templates')
    });

    this.soyFiles_ = GulpHelper.SOY_FILES;

    this.soyFiles_[0] = path.join(modulesPath, this.soyFiles_[0]);

    return this;
};

/**
 * Setter for helper
 * @param  {Object} helper
 * @return {GulpHelper}
 */
GulpHelper.prototype.setHelper = function(helper) {
    this.helper = helper;

    return this;
};

/**
 * Cordova initialization
 * @return {Object} promise
 */
GulpHelper.prototype.initCordova = function() {
    var that = this,
        promise = new Promise(function(resolve) {
            that.initCordova_(resolve);
        });

    return new Promise(function(resolve) {
        promise.then(function() {
            that.addAndroid_(resolve);
        });
    });
};

/**
 * Building of html for cordova
 * @param {Object} params
 * @param {String} params.template
 * @param {Object} params.templateParams
 * @param {String=} params.dest
 * @return {Promise} promise
 */
GulpHelper.prototype.buildCordovaHtml = function(params) {
    var that = this,
        promise = new Promise(function(resolve, reject) {            
            that.soy.loadFiles(that.soyFiles_, resolve, true);
        });
        
    return new Promise(function(resolve) {
        promise.then(function() {
            that.buildCordovaHtml_(params, resolve);
        });
    });
};

/**
 * Building of html for cordova
 * @param {Object} params
 * @param {String} params.template
 * @param {Object} params.templateParams
 * @param {String=} params.dest
 * @param  {Function} callback
 */
GulpHelper.prototype.buildCordovaHtml_ = function(params, callback) {
    var content = this.soy.render(params.template, {
            params: params.templateParams
        }),
        dest = path.join(params.dest || '../cordova/www', 'index.html');

    fs.writeFileSync(dest, content);

    callback();
};

/**
 * Cordova initialization
 * @param  {Function} resolve
 */
GulpHelper.prototype.initCordova_ = function(resolve) {
    this.helper.utils.exec(
        'cordova create cordova com.example.hello Quiz',
        null,
        resolve
    );
};

/**
 * Add android platform to cordova
 * @param  {Function} resolve
 */
GulpHelper.prototype.addAndroid_ = function(resolve) {
    this.helper.utils.exec(
        'cordova platform add android',
        '../cordova',
        resolve
    );
};

/**
 * @exports
 */
module.exports = new GulpHelper();
