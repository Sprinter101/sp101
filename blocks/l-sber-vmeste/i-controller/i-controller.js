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
            'config' : {'headerType': 'list'}
            });
        this.pageManager_.setCurrentPage('TestPage');
    };

    /**
    * 'List page' action
    * @param {Object=} opt_params
    */
    Controller.prototype.actionListPage = function(opt_params) {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'list'}
            });
        this.pageManager_.setCurrentPage('ListPage', {
            'category': opt_params.category}
            );
    };

    /**
    * 'Display category card' action
    * @param {Object=} opt_params
    */
    Controller.prototype.actionDisplayCategoryCard = function(
        opt_params) {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'card', 'category': 'theme'}
            });
        this.pageManager_.setCurrentPage('CardPage', {cardId: opt_params.id});
    };

    /**
     * 'Donate' action
     */
    Controller.prototype.actionDonate = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'donate'}
            });
        this.pageManager_.setCurrentPage('DonatePage');
    };

    /**
     * Registration action
     * (phone number + name,surname)
     */
    Controller.prototype.actionRegistration = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'start'}
            });
        this.pageManager_.setCurrentPage('RegistrationPage');
    };

    /**
     * 'Profile' action
     */
    Controller.prototype.actionProfilePage = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'donate'}
            });
        this.pageManager_.setCurrentPage('ProfilePage');
    };

    /**
     * 'Registration' action
     */
    Controller.prototype.actionRegistrationPage = function() {
        this.headerManager_.setCurrentHeader('Header', {
            'config' : {'headerType': 'donate'}
            });
        this.pageManager_.setCurrentPage('RegistrationPage');
    };


});  // goog.scope
