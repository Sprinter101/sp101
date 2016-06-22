goog.provide('sv.gInput.Input');

goog.require('cl.gInput.Input');
goog.require('sv.gInput.View');



/**
 * Input control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sv.gInput.Input = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * Possible validation type handlers
     * @type {Object}
     */
    this.validationTypeHandlers = {
        'digits': this.validateDigits_,
        'email': this.validateEmail_,
        'notEmpty': this.validateNotEmpty_,
        'numbersOnly': this.validateNumbersOnly_
    };
};
goog.inherits(sv.gInput.Input, cl.gInput.Input);


goog.scope(function() {
    var Input = sv.gInput.Input,
        View = sv.gInput.View;

    /**
     * Event enum
     * @enum {string}
     */
    Input.Event = {
        NOT_VALID: 'notValid',
        BLUR: View.Event.BLUR,
        INPUT: View.Event.INPUT,
        CHANGE: View.Event.CHANGE
    };

    /**
     * Check for any non-numeric characters in the input
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateNumbersOnly_ = function(text) {
        var numbersRegex = /^([0-9]+)$/;
        return numbersRegex.test(text.trim());
    };

});  // goog.scope
