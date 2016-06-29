goog.provide('sv.lSberVmeste.bDonationFixedBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



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
    var View = sv.lSberVmeste.bDonationFixedBlock.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-donate-block',
        FIXED_SUM: 'b-donation-fixed-block__input',
        BUTTON_READY: 'b-donation-fixed-block__button_ready'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        INPUT_FOCUS: 'input-focus',
        INPUT_CHANGE: 'input-change',
        SLIDER_MOVE: 'slider-move',
        BUTTON_READY_CLICK: 'button-ready-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.input = this.getElementByClass(
            View.CssClass.FIXED_SUM, element
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
