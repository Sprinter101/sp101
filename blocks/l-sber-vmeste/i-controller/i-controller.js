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
     * 'Nav link 1' action
     */
    Controller.prototype.actionNavLink1 = function() {
        this.headerManager_.setCurrentHeader('Header');
        this.headerManager_.show();
        this.pageManager_.setCurrentPage('NavPage1');
    };

    /**
    * 'Buttons test' action
    */
    Controller.prototype.actionTestPage = function() {
        this.pageManager_.setCurrentPage('TestPage');
    };

});  // goog.scope
