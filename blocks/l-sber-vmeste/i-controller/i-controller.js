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
        this.pageManager_.setCurrentPage('StartPage',
            {'headerManager_': this.headerManager_
        });
    };

    /**
     * 'Buttons test' action
     */
    Controller.prototype.actionTest = function() {
        this.pageManager_.setCurrentPage('TestPage', {
            'headerManager_': this.headerManager_
        });
    };

    /**
     * 'List page' action
     * @param {Object=} opt_params
     */
    Controller.prototype.actionListPage = function(opt_params) {
        this.pageManager_.setCurrentPage(
            'ListPage',
            {
                'category': opt_params.category,
                'headerManager_': this.headerManager_
            }
        );
    };

    /**
     * 'Display category card' action
     * @param {Object=} opt_params
     */
    Controller.prototype.actionDisplayCategoryCard = function(opt_params) {
        this.pageManager_.setCurrentPage('CardPage', {
            cardId: opt_params.id,
            'headerManager_': this.headerManager_
        });
    };

    /**
     * 'Donate' action
     */
    Controller.prototype.actionDonate = function() {
        this.pageManager_.setCurrentPage('DonatePage',
            {'headerManager_': this.headerManager_}
        );
    };

    /**
     * Registration action
     * (phone number + name,surname)
     */
    Controller.prototype.actionRegistration = function() {
        this.pageManager_.setCurrentPage('RegistrationPage',
            {'headerManager_': this.headerManager_}
        );
    };

    /**
     * 'Profile' action
     */
    Controller.prototype.actionProfilePage = function() {
        this.pageManager_.setCurrentPage('ProfilePage',
            {'headerManager_': this.headerManager_}
        );
    };

    /**
     * 'Registration' action
     */
    Controller.prototype.actionRegistrationPage = function() {
        this.pageManager_.setCurrentPage('RegistrationPage',
            {'headerManager_': this.headerManager_}
        );
    };

    /**
     * 'Payment' action
     */
    Controller.prototype.actionPayment = function() {
        this.headerManager_.setProfileHeader({
            'type': 'profile',
            'pageType': 'start'
        });
        this.pageManager_.setCurrentPage('PaymentPage');
    };

});  // goog.scope
