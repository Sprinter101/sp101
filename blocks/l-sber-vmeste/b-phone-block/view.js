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
        INPUT_CONFIRM: 'b-phone-block__input_confirmation',
        INPUT_PHONE: 'b-phone-block__input_phone',
        BUTTON_ENTER: 'b-phone-block__enter-button',
        BUTTON_CONFIRM: 'b-phone-block__confirm-button',
        TEXT_PHONE_NUMBER:'b-phone-block__phone-number-view',
        TEXT_ONTOP_INPUT: 'b-phone-block__text'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: 'view-phone-click',
        VERIFIED: 'verify_success',
        VERIFICATION_ERROR: 'verify_fail'
    };



    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom ={
            texts: {
                textOntopInput: this.getElementByClass(
                    View.CssClass.TEXT_ONTOP_INPUT,
                    this.getElement()),
                textPhoneNumber: this.getElementByClass(
                    View.CssClass.TEXT_PHONE_NUMBER,
                    this.getElement())
            },
            inputs: {
                phoneNumber: this.getElementByClass(
                    View.CssClass.INPUT_PHONE,
                    this.getElement()).firstChild,
                confirmCode: this.getElementByClass(
                    View.CssClass.INPUT_CONFIRM,
                    this.getElement()).firstChild
            },
            buttons:{
                enterButton:this.getElementByClass(
                    View.CssClass.BUTTON_ENTER,
                    this.getElement()).firstChild,
                confirmButton:this.getElementByClass(
                    View.CssClass.BUTTON_CONFIRM,
                    this.getElement()).firstChild
            }

        };

    };


    /**
     * @return {string}
     */
    View.prototype.getPhoneNumber = function() {
        var phoneNumber = this.dom.inputs.phoneNumber;

        return phoneNumber.value.toString();
    };

    /**
     * @return {string}
     */
    View.prototype.getConfirmCode = function() {
        var confirmCodeInput = this.dom.inputs.confirmCode;

        return confirmCodeInput.value.trim();
    };



});// goog.scope