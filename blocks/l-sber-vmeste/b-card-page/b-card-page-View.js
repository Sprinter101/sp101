goog.provide('sv.lSberVmeste.bCardPage.View');

goog.require('cl.iControl.Control');



/**
 * sv.lSberVmeste.bCardPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.bCardPage.View = function(opt_params, 
                                            opt_template, 
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCardPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCardPage.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bCardPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card-page',
        START_HELPING_BUTTON: 'g-button_sber',
        CARD_LIST: 'b-card-list',
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.startHelpingButton = this.getElementByClass(
                                View.CssClass.START_HELPING_BUTTON);
        this.dom.cardList = this.getElementByClass(View.CssClass.CARD_LIST);
    };

});  // goog.scope
