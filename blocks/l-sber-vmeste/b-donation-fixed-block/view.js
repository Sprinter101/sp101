goog.provide('sv.lSberVmeste.bDonationFixedBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.View');



/**
 * sv.lSberVmeste.bDonationFixedBlock.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {'cl.iControl.View'}
 */
sv.lSberVmeste.bDonationFixedBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bDonationFixedBlock.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bDonationFixedBlock.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bDonationFixedBlock.View,
        ButtonView = sv.gButton.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-donate-block',
        FIXED_SUM: 'b-donation-fixed-block__input',
        INPUT_INPUT: 'g-input__input',
        BUTTON_READY: 'b-donation-fixed-block__button_ready'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.inputControl = this.getElementByClass(
            View.CssClass.FIXED_SUM, element
        );

        this.dom.inputInput = this.getElementByClass(
            View.CssClass.INPUT_INPUT, element
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

});  // goog.scope
