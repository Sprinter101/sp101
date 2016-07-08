goog.provide('sv.lSberVmeste.bUserBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.soy');



/**
 * User block View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bUserBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(
        sv.lSberVmeste.bUserBlock.View.CssClass.ROOT
    );
};
goog.inherits(sv.lSberVmeste.bUserBlock.View,
    cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bUserBlock.View;

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

    /**
    * renders generateCategoriesText template into chosenCategories element
    * @param {
    *    'data': {
    *        topicCount: number,
    *        directionCount: number,
    *        fundsCount: number
    *    }
    * } soyParams
    */
    View.prototype.appendCategoriesText = function(soyParams) {
        goog.soy.renderElement(
            this.dom.chosenCategories,
            sv.lSberVmeste.bUserBlock.Template.generateCategoriesText,
            soyParams
        );
    };

});  // goog.scope
