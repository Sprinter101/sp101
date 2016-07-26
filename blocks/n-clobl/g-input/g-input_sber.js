goog.provide('sv.gInput.Input');

goog.require('cl.gInput.Input');
goog.require('sv.gInput.View');



/**
 * Input control
 * @param {sv.gInput.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
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
     * constraint params
     * @type {Object}
     */

    this.valueParams = {};
    this.const = {
        MAX_NUMBER: this.params.MAX_NUMBER ?
                            this.params.MAX_NUMBER : Infinity,
        MAX_CHARACTERS: this.params.MAX_CHARACTERS ?
                            this.params.MAX_CHARACTERS : 11
    };

    /**
     * Possible validation type handlers
     * @type {Object}
     */
    this.validationTypeHandlers = {
        'digits': this.validateDigits_,
        'email': this.validateEmail_,
        'notEmpty': this.validateNotEmpty_,
        'maxDonation': this.validateMaxDonation_,
        'name': this.validateName_,
        'phoneNumber': this.validatePhoneNumber_,
        'minInput': this.validateMinInput_,
        'minDonation': this.validateMinDonation_,
        'confirmCode': this.validateConfirmCode_
    };

    /**
     * Possible constraint type handlers
     * @type {Object}
     */
    this.constraintsHandlers = {
        'digitsOnly': this.constraintDigitsOnly_,
        'charactersLimit': this.constraintCharactersLimit_,
        'noLeadingZero': this.constraintNoLeadingZero_,
        'name': this.constraintName_,
        'phoneNumber': this.constraintPhoneNumber_
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

        this.populateValueParams();

        this.viewListen(View.Event.BLUR, this.onBlur);

        this.viewListen(View.Event.INPUT, this.onInput);
        this.viewListen(View.Event.ENTER_KEY_PRESS,
            this.onEnterKeyPress);
        this.autoDispatch(View.Event.CHANGE, Input.Event.CHANGE);
        this.autoDispatch(View.Event.FOCUS, Input.Event.FOCUS);

        this.validate(true);
    };

    /**
    * populates ValueParams
    */
    Input.prototype.populateValueParams = function() {
        var valueParams = this.params.valueParams;

        this.valueParams = {
            maxNumber: +valueParams.maxNumber || Infinity,
            maxCharacters: +valueParams.maxCharacters || Infinity,
            minIncome: +valueParams.minIncome || -Infinity,
            minDonation: +valueParams.minDonation || -Infinity
        };
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
     * Validate input depends of it type
     * @param {boolean} quietMode
     * @return {boolean}
     */
    Input.prototype.validate = function(quietMode) {
        var that = this,
            failedValidations;

        /** Check all validations, that comes from params
         and add failed validations to array of failed validations **/
        failedValidations = this.params['validations'].filter(
            function(validationType) {
                return that.doValidationType_(validationType);
            }
        );

        var isValid = !failedValidations.length;

        this.isValid_ = isValid;

        this.dispatchEvent(isValid ?
            Input.Event.VALID :
            {'type': Input.Event.NOT_VALID,
             'failedValidations': failedValidations}
        );

        if (!quietMode) {
            if (isValid) {
                this.getView().unSetNotValidState();
                this.getView().hideErrorMessage();
            } else {
                this.getView().setNotValidState();
                this.getView().showErrorMessage(failedValidations);
            }
        }

        return isValid;
    };

    /**
    * @return {Boolean}
    */
    Input.prototype.isValid = function() {
        return this.isValid_;
    };

    /**
     * Input handler
     */
    Input.prototype.onInput = function() {
        var that = this;

        this.params['constraints'].forEach(function(constraintType) {
            that.doConstraintType_(constraintType);
        });

        this.validate(true);
        this.dispatchEvent(Input.Event.INPUT);
    };

    /**
    * Enter key press handler
    */
    Input.prototype.onEnterKeyPress = function() {
        this.validate();

        this.dispatchEvent(Input.Event.ENTER_KEY_PRESS);
    };

    /**
     * Execute a validation of given type and returns true
     * if validation of given type not successful
     * @param {string} validationType
     * @return {boolean}
     * @private
     */
    Input.prototype.doValidationType_ = function(validationType) {
        var validationFunction =
                this.validationTypeHandlers[validationType],
            value = this.getValue();

        return validationFunction ?
            !validationFunction.call(this, value) : false;
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
        if (oldValue_ !== newValue_) {
            this.setValue(newValue_);
        }
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
        return oldValue.slice(0, this.valueParams.maxCharacters);
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
     * Remove extra characters from name.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintName_ = function(oldValue) {
        oldValue = oldValue.trim();
        var nameRegex = /[^ёа-яА-Яa-zA-Z- ]/g;

        return oldValue.replace(nameRegex, '');
    };

    /**
     * Remove extra characters from phone number.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintPhoneNumber_ = function(oldValue) {
        oldValue = oldValue.trim();
        var nameRegex = /.{1,}[+]/g;
        var nameRegex2 = /[^+\d]/g;

        if (oldValue == '') {
            return '+';
        }

        return oldValue.replace(nameRegex, '+').replace(nameRegex2, '');
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
        return !(donationAmount > this.valueParams.maxNumber);
    };

    /**
     * Validate min donation value
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateMinInput_ = function(text) {
        var inputAmount = Number(text);
        return !(inputAmount < this.valueParams.minIncome);
    };

    /**
     * Validate digit
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateMinDonation_ = function(text) {
        var donationAmount = Number(text);
        return !(donationAmount < this.valueParams.minDonation);
    };

    /**
     * Validate name
     * @param {string} name name to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateName_ = function(name) {
        name = name.trim();
        var nameRegex = new RegExp(
            '^[ёа-яА-Яa-zA-Z- ]{2,' + this.valueParams.maxNumber + '}$'
        );

        return nameRegex.test(name);
    };

    /**
     * Validate phone number
     * @param {string} phoneNumber phone number to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validatePhoneNumber_ = function(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        var numberRegex = /^\+\d{11}$/;

        return numberRegex.test(phoneNumber);
    };

    /**
     * validate confirmation code
     * @param {string } confirmCode code to validate
     * @return {boolean}
     * @private
     */
    Input.prototype.validateConfirmCode_ = function(confirmCode) {
        confirmCode = confirmCode.trim();
        var codeRegex = /\d{3}/;

        return codeRegex.test(confirmCode);
    };

    /**
     * Set value
     * @param {string} value
     */
    Input.prototype.setValue = function(value) {
        this.getView().setValue(value);

        this.validate(true);
    };

});  // goog.scope
