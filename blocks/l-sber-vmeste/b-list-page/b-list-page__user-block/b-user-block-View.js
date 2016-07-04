goog.provide('sv.lSberVmeste.bListPage.bUserBlock.View');

goog.require('cl.iControl.View');



/**
 * User block View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bListPage.bUserBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(
        sv.lSberVmeste.bListPage.bUserBlock.View.CssClass.ROOT
    );
};
goog.inherits(sv.lSberVmeste.bListPage.bUserBlock.View,
    cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bListPage.bUserBlock.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-user-block',
        CHOSEN_CATEGORIES: 'b-user-block__chosen-categories',
        BUTTON: 'b-user-block__button'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.chosenCategories = this.getElementByClass(
            View.CssClass.CHOSEN_CATEGORIES,
            this.getElement()
        );

        this.dom.buttonContainer = this.getElementByClass(
            View.CssClass.BUTTON,
            this.getElement()
        );
    };

});  // goog.scope
