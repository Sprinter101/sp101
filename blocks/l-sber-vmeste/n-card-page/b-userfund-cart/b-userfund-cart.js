goog.provide('sv.lSberVmeste.bUserfundCart.UserfundCart');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserfundService.UserfundService');



/**
 * User block control
 * @param {sv.lSberVmeste.bUserfundCart.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bUserfundCart.UserfundCart = function(
    view, opt_domHelper) {

    /**
     * @type {sv.gButton.Button}
     * @private
     */
    this.fundButton_ = null;

    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.bUserfundCart.UserfundCart,
    cl.iControl.Control);

goog.scope(function() {
    var UserfundCart = sv.lSberVmeste.bUserfundCart.UserfundCart,
        Button = sv.gButton.Button,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router;

    /**
     * @override
     * @param {Element} element
     */
    UserfundCart.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.fundButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().fundButton
        );
    };

    /**
    * @override
    */
    UserfundCart.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
        .listen(
            this.fundButton_,
            Button.Event.CLICK,
            this.onFundButtonClick_
        );
    };

    /**
     * shows userfund cart
     * @param {string} cardTitle
     */
    UserfundCart.prototype.show = function(cardTitle) {
        this.getView().show(cardTitle);
    };

    /**
     * hides userfund cart
     */
    UserfundCart.prototype.hide = function() {
        this.getView().hide();
    };

    /**
     * Fund button click handler
     * @private
     */
    UserfundCart.prototype.onFundButtonClick_ = function() {
        this.redirectUser_();
    };

    /**
     * Redirects user to another page
     * @private
     */
    UserfundCart.prototype.redirectUser_ = function() {
        Router.getInstance().changeLocation(Route['LIST_PAGE']);
    };

});  // goog.scope
