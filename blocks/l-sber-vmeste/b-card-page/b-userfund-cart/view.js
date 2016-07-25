goog.provide('sv.lSberVmeste.bCardPage.bUserfundCart.View');

goog.require('cl.iControl.View');



/**
 * User block View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bCardPage.bUserfundCart.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(
        sv.lSberVmeste.bCardPage.bUserfundCart.View.CssClass.ROOT
    );
};
goog.inherits(sv.lSberVmeste.bCardPage.bUserfundCart.View,
    cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bCardPage.bUserfundCart.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-userfund-cart',
        TITLE: 'b-userfund-cart__title',
        FUND_INFO: 'b-userfund-cart__fund-info',
        FUND_BUTTON_CONTAINER: 'b-userfund-cart__fund-button',
        CONTINUE_BUTTON_CONTAINER: 'b-userfund-cart__continue-button',
        CART_VISIBLE: 'b-userfund-cart_visible',
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.title = this.getElementByClass(
            View.CssClass.TITLE,
            element
        );

        this.dom.fundInfo = this.getElementByClass(
            View.CssClass.FUND_INFO,
            element
        );

        this.dom.fundButton = this.getElementByClass(
            View.CssClass.FUND_BUTTON_CONTAINER,
            element
        ).firstChild;

        this.dom.continueButton = this.getElementByClass(
            View.CssClass.CONTINUE_BUTTON_CONTAINER,
            element
        ).firstChild;
    };

    /**
     * shows userfund cart
     */
    View.prototype.show = function() {
        goog.dom.classlist.add(
            this.getElement(),
            View.CssClass.CART_VISIBLE
        );
    };

    /**
     * hides userfund cart
     */
    View.prototype.hide = function() {
        goog.dom.classlist.remove(
            this.getElement(),
            View.CssClass.CART_VISIBLE
        );
    };

    /**
    * renders generateCategoriesText template into fundInfo DOM element
    * @param {
    *    'data': {
    *        topic: number,
    *        direction: number,
    *        fund: number
    *    }
    * } soyParams
    */
    View.prototype.appendCategoriesText = function(soyParams) {
        goog.soy.renderElement(
            this.dom.fundInfo,
            sv.lSberVmeste.bCardPage.bUserfundCart
                .Template.generateCategoriesText,
            soyParams
        );
    };

    /**
     * renders createTitle template into
     * @param {
     *    category: string
     * } soyParams
     */
    View.prototype.appendTitle = function(soyParams) {
        goog.soy.renderElement(
            this.dom.title,
            sv.lSberVmeste.bCardPage.bUserfundCart.Template.createTitle,
            soyParams
        );
    };

});  // goog.scope
