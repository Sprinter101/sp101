goog.provide('sv.gInput.Input');

goog.require('cl.gInput.Input');
goog.require('sv.gInput.Validation');
goog.require('sv.gInput.View');



/**
 * Input control
 * @param {sv.gInput.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sv.gInput.Input = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Boolean}
    * @private
    */
    this.isValid_ = false;

    /**
     * @type {sv.gInput.Validation}
     */
    this.validation_ = null

};
goog.inherits(sv.gInput.Input, cl.gInput.Input);


goog.scope(function() {
    var Input = sv.gInput.Input,
        Validation = sv.gInput.Validation,
        View = sv.gInput.View;

    /**
     * Event enum
     * @enum {string}
     */
    Input.Event = {
        NOT_VALID: 'notValid',
        VALID: 'valid',
        BLUR: View.Event.BLUR,
        INPUT: View.Event.INPUT,
        CHANGE: View.Event.CHANGE,
        FOCUS: View.Event.FOCUS,
        ENTER_KEY_PRESS: View.Event.ENTER_KEY_PRESS
    };

    /**
     * @override
     */
    Input.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.validation_ = new Validation(this.params.valueParams);

        this.viewListen(View.Event.BLUR, this.onBlur);

        this.viewListen(View.Event.INPUT, this.onInput_);
        this.viewListen(View.Event.ENTER_KEY_PRESS,
            this.onEnterKeyPress_);
        this.autoDispatch(View.Event.CHANGE, Input.Event.CHANGE);
        this.autoDispatch(View.Event.FOCUS, Input.Event.FOCUS);

        this.validate(true);
    };

    /**
    * Disables input
    */
    Input.prototype.disable = function() {
        this.getView().disable();
    };

    /**
    * Enables input
    */
    Input.prototype.enable = function() {
        this.getView().enable();
    };

    /**
    * @return {Boolean}
    */
    Input.prototype.isValid = function() {
        return this.isValid_;
    };

    /**
     * Set value
     * @param {string} value
     */
    Input.prototype.setValue = function(value) {
        this.getView().setValue(value);

        this.validate(true);
    };

    /**
     * Validate input depends of it type
     * @param {boolean} quietMode
     * @return {boolean}
     */
    Input.prototype.validate = function(quietMode) {
        var validationResult = this.validation_.validate(
            this.getValue(),
            this.params['validations']
        );

        var isValid = validationResult.isValid;

        this.isValid_ = isValid;

        this.dispatchEvent(isValid ?
            Input.Event.VALID :
            {'type': Input.Event.NOT_VALID,
             'failedValidations': validationResult.failedValidations}
        );

        if (!quietMode) {
            if (isValid) {
                this.getView().unSetNotValidState();
                this.getView().hideErrorMessage();
            } else {
                this.getView().setNotValidState();
                this.getView().showErrorMessage(validationResult.errorMessageText);
            }
        }

        return isValid;
    };

    /**
     * Input handler
     * @private
     */
    Input.prototype.onInput_ = function() {
        this.validate(true);
    };

    /**
     * Enter key press handler
     * @private
     */
    Input.prototype.onEnterKeyPress_ = function() {
        this.validate();

        this.dispatchEvent(Input.Event.ENTER_KEY_PRESS);
    };

});  // goog.scope
