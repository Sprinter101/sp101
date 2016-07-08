goog.provide('sv.lSberVmeste.bDonationPercentBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.lSberVmeste.bDonationPercentBlock.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {'cl.iControl.View'}
 */
sv.lSberVmeste.bDonationPercentBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bDonationPercentBlock.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bDonationPercentBlock.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bDonationPercentBlock.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-donate-block',
        MONTHLY_INCOME: 'b-donation-percent-block__input',
        SLIDER: 'b-donation-percent-block__slider',
        RESULT_SUM: 'b-donation-percent-block__result-sum',
        BUTTON_READY: 'b-donation-percent-block__button_ready'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        INPUT_FOCUS: 'input-focus',
        INPUT_CHANGE: 'input-change',
        SLIDER_MOVE: 'slider-move'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.inputControl = this.getElementByClass(
            View.CssClass.MONTHLY_INCOME, element
        );

        this.dom.inputControlInput = goog.dom.getChildren(
            this.dom.inputControl)[0];

        this.dom.slider = this.getElementByClass(
            View.CssClass.SLIDER, element
        );

        this.dom.resultSumContainer = this.getElementByClass(
            View.CssClass.RESULT_SUM, element
        );

        this.dom.buttonReady = this.getElementByClass(
            View.CssClass.BUTTON_READY, element
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * show result sum of donation
     * @param {string} resultSum
     */
    View.prototype.showResultSum = function(resultSum) {
        this.dom.resultSumContainer.innerHTML = resultSum + 'Р';
    };

    /**
     * hide result sum of donation
     */
    View.prototype.hideResultSum = function() {
        this.dom.resultSumContainer.innerHTML = '—';
    };

});  // goog.scope
