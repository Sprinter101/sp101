goog.provide('sv.lSberVmeste.bCardList.View');

goog.require('cl.iControl.View');



/**
 * Card List View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bCardList.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCardList.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCardList.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bCardList.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card-list',
        CARDS_BLOCK: 'b-card-list__cards',
        EVENT_CARDS_NUMBER: 'b-card-list__cards_even'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.cardsBlock = this.getElementByClass(
            View.CssClass.CARDS_BLOCK,
            this.getElement()
        );
    };

    /**
     * @override
     */
    View.prototype.addEvenCardsNumberClass = function() {
        goog.dom.classlist.add(
            this.getElement(),
            View.CssClass.EVENT_CARDS_NUMBER
        );
    };

});  // goog.scope
