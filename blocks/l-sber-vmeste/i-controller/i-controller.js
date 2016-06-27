goog.provide('sv.lSberVmeste.iController.Controller');

goog.require('goog.object');



/**
 * Application controller
 * @param {{
 *     headerManager: sv.lSberVmeste.bHeaderManager.HeaderManager,
 *     pageManager: sv.lSberVmeste.bPageManager.PageManager
 * }} params
 * @constructor
 */
sv.lSberVmeste.iController.Controller = function(params) {
    this.headerManager_ = params.headerManager;
    this.pageManager_ = params.pageManager;
};


goog.scope(function() {
    var Controller = sv.lSberVmeste.iController.Controller;

    /**
     * 'Start' action
     */
    Controller.prototype.actionStart = function() {
        this.headerManager_.setCurrentHeader('Header');
        this.headerManager_.show();
        this.pageManager_.setCurrentPage('StartPage');
    };

    /**
    * 'Buttons test' action
    */
    Controller.prototype.actionTest = function() {
        this.pageManager_.setCurrentPage('TestPage');
    };

    /**
    * 'Buttons test' action
    */
    Controller.prototype.actionListPage = function() {
        this.pageManager_.setCurrentPage('ListPage');
    };

});  // goog.scope
