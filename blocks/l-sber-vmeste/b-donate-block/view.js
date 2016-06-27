goog.provide('sv.lSberVmeste.bDonateBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.lSberVmeste.bDonateBlock.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {'cl.iControl.View'}
 */
sv.lSberVmeste.bDonateBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bDonateBlock.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bDonateBlock.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bDonateBlock.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-donate-block',
        //INPUT: 'g-input_sber',
        FIXED_SUM: 'b-donate-block__input-fixed-sum',
        MONTHLY_INCOME: 'b-donate-block__input-income'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        //this.dom.input = this.getElementByClass(View.CssClass.INPUT);
        this.dom.fixedSum = this.getElementByClass(View.CssClass.FIXED_SUM);
        this.dom.income = this.getElementByClass(View.CssClass.MONTHLY_INCOME);

    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };


});  // goog.scope
