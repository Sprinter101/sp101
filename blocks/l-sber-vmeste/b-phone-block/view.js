goog.provide('sv.lSberVmeste.bPhoneBlock.View');

goog.require('cl.iControl.Control');


/**
 * sv.SberVmeste.bPhoneBlock.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bPhoneBlock.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bPhoneBlock.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bPhoneBlock.View,cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bPhoneBlock.View;
    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-phone-block',
        INPUT: 'g-input_sber',
        BUTTON: 'g-button_sber'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: 'view-phone-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.inputs = this.getElementsByClass(View.CssClass.INPUT);

        this.dom.buttons = this.getElementsByClass(View.CssClass.BUTTON);
    };


});// goog.scope