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
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'start'}
            });
        this.pageManager_.setCurrentPage('StartPage');
    };

    /**
    * 'Buttons test' action
    */
    Controller.prototype.actionTest = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'directions'}
            });
        this.pageManager_.setCurrentPage('TestPage');
    };

    /**
    * 'Display category card' action
    */
    Controller.prototype.actionDisplayCategoryCard = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'card', 'category': 'theme'}
            });
        this.pageManager_.setCurrentPage('StartPage');
    };

    /**
     * 'Donate' action
     */
    Controller.prototype.actionDonate = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'donate'}
            });
        this.pageManager_.setCurrentPage('StartPage');
    };

});  // goog.scope
