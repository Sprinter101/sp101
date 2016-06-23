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
        'maxDonation': this.validateMaxDonation_
    };

    /**
     * Possible constraint type handlers
     * @type {Object}
     */
    this.constraintsHandlers = {
        'digitsOnly': this.constraintDigitsOnly_,
        'charactersLimit': this.constraintCharactersLimit_
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
     * Const enum
     * @enum {number}
     */
    Input.Const = {
        MAX_DONATION_AMOUNT: 500000,
        CHARACTERS_LIMIT: 6
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
    * Executes a constraint of given type
    * and assigns the returned string to the input value
    * @private
    * @param {string} constraintType
    */
    Input.prototype.doConstraintType_ = function(constraintType) {
        var constraintFunction = this.constraintsHandlers[constraintType];

        var oldValue_ = this.getValue();
        var newValue_ = constraintFunction(oldValue_);

        this.setValue(newValue_);
    };

    /**
     * Removes all non-numeric characters from the string
     * @private
     * @param {string} oldValue
     * @return {boolean}
     */
    Input.prototype.constraintDigitsOnly_ = function(oldValue) {
        return oldValue.replace(/[\D]/g, '');
    };

    /**
     * Removes all extra characters
     * @private
     * @param {string} oldValue
     * @return {boolean}
     */
    Input.prototype.constraintCharactersLimit_ = function(oldValue) {
        return oldValue.slice(0, Input.Const.CHARACTERS_LIMIT);
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
        return !(donationAmount > Input.Const.MAX_DONATION_AMOUNT);
    };

});  // goog.scope
