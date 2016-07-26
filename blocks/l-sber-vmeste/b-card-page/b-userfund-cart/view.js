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
        FUND_BUTTON_CONTAINER: 'b-userfund-cart__fund-button',
        CATEGORY: 'b-userfund-cart__category',
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

        this.dom.category = this.getElementByClass(
            View.CssClass.CATEGORY,
            element
        );

        this.dom.fundButton = this.getElementByClass(
            View.CssClass.FUND_BUTTON_CONTAINER,
            element
        ).firstChild;
    };

    /**
     * shows userfund cart
     * @param {string} cardTitle
     */
    View.prototype.show = function(cardTitle) {

        goog.dom.classlist.add(
            this.getElement(),
            View.CssClass.CART_VISIBLE
        );

        this.appendCategoryText(cardTitle);
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
     * appends a string to category DOM element
     * @param {string} category
     */
    View.prototype.appendCategoryText = function(category) {
        this.dom.category.innerHTML = '' + category.trim();
    };

});  // goog.scope
