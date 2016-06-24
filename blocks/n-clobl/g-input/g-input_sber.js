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
     * Const enum
     * @enum {number}
     */
    this.const = {
        MAX_NUMBER: this.params.MAX_NUMBER ? 
                            this.params.MAX_NUMBER : Infinity,
        MAX_CHARACTERS: this.params.MAX_CHARACTERS ?
                            this.params.MAX_CHARACTERS : Infinity
    };

    /**
     * Possible validation type handlers
     * @type {Object}
     */
    this.validationTypeHandlers = {
        'digits': this.validateDigits_,
        'email': this.validateEmail_,
        'notEmpty': this.validateNotEmpty_,
        'maxDonation': this.validateMaxDonation_
    };

    /**
     * Possible constraint type handlers
     * @type {Object}
     */
    this.constraintsHandlers = {
        'digitsOnly': this.constraintDigitsOnly_,
        'charactersLimit': this.constraintCharactersLimit_,
        'noLeadingZero': this.constraintNoLeadingZero_
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
     * @override
     */
    Input.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.BLUR,
            this.onBlur
        );

        this.viewListen(
            View.Event.INPUT,
            this.onInput
        );

        this.autoDispatch(View.Event.CHANGE, Input.Event.CHANGE);
    };

    /**
     * Validate input depends of it type
     * @return {boolean}
     */
    Input.prototype.validate = function() {
        var that = this,
            failedValidations;

        /** Check all validations, that comes from params
         and add failed validations to array of failed validations **/
        failedValidations = this.params['validations'].filter(
            function(validationType) {
                return that.doValidationType_(validationType);
            }
        );

        /** If array of failed validations is empty => input is valid **/
        var isValid = !failedValidations.length;
        if (isValid) {
            this.getView().unSetNotValidState();
            this.getView().hideErrorMessage();
        } else {
            this.getView().setNotValidState();
            this.getView().showErrorMessage(failedValidations);

            this.dispatchEvent({
                'type': Input.Event.NOT_VALID,
                'failedValidations': failedValidations
            });
        }
        return isValid;
    };

    /**
     * Input handler
     */
    Input.prototype.onInput = function() {
        var that = this;

        this.params['constraints'].forEach(function(constraintType) {
                that.doConstraintType_(constraintType);
        });

    };

    /**
     * Execute a validation of given type and returns true
     * if validation of given type not successful
     * @param {string} validationType
     * @return {boolean}
     * @private
     * @override
     */
    Input.prototype.doValidationType_ = function(validationType) {
        var validationFunction =
                this.validationTypeHandlers[validationType],
            value = this.getValue();

        return validationFunction ? !validationFunction.call(this, value) : false;
    };

    /**
    * Executes a constraint of given type
    * and assigns the returned string to the input value
    * @private
    * @param {string} constraintType
    */
    Input.prototype.doConstraintType_ = function(constraintType) {
        var constraintFunction = this.constraintsHandlers[constraintType];

        var oldValue_ = this.getValue();
        var newValue_ = constraintFunction.call(this, oldValue_);

        this.setValue(newValue_);
    };

    /**
     * Removes all non-numeric characters from the string
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintDigitsOnly_ = function(oldValue) {
        return oldValue.replace(/[\D]/g, '');
    };

    /**
     * Removes all extra characters
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintCharactersLimit_ = function(oldValue) {
        return oldValue.slice(0, this.const.MAX_CHARACTERS);
    };

    /**
     * Removes zero if it's the only number in the input.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintNoLeadingZero_ = function(oldValue) {
        return oldValue.replace(/^0/, '');
    };

    /**
     * Validate digit
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateDigits_ = function(text) {

        if (!text) {
            return true;
        }

        var digitRegex = /^\d+$/;
        return digitRegex.test(text);
    };

    /**
     * Validate digit
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateMaxDonation_ = function(text) {
        var donationAmount = Number(text);
        return !(donationAmount > this.const.MAX_NUMBER);
    };

});  // goog.scope
