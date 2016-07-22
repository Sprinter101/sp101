goog.provide('sv.gInput.Validation');



sv.gInput.Validation = function(valueParams) {

    /**
     * @type {string}
     * @private
     */
    this.value_ = '';

    /**
     * @type {Object}
     * @private
     */
    this.valueParams_ = {
        maxNumber: +valueParams.maxNumber || Infinity,
        maxCharacters: +valueParams.maxCharacters || Infinity,
        minInput: +valueParams.minIncome || -Infinity,
        minDonation: +valueParams.minDonation || -Infinity
    };

    /**
     * Possible validation type handlers
     * @type {Object}
     * @private
     */
    this.validationHandlers_ = {
        'digits': this.validateDigits_,
        'email': this.validateEmail_,
        'notEmpty': this.validateNotEmpty_,
        'maxDonation': this.validateMaxDonation_,
        'name': this.validateName_,
        'phoneNumber': this.validatePhoneNumber_,
        'minInput': this.validateMinInput_,
        'minDonation': this.validateMinDonation_
    };
}

goog.scope(function() {
    var Validation = sv.gInput.Validation;

    /**
     * Error messages for validations
     * @enum {string}
     */
    Validation.ErrorMessages = {
        'digits': 'Допустимо использовать только цифры',
        'email': 'Введён некорректный адрес электронной почты',
        'notEmpty': 'Это поле не может быть пустым',
        'maxDonation': 'Мы не можем принять от вас сразу больше, ' +
                       'чем 500 тыс. рублей',
        'minInput': 'Минимальная сумма ввода — 1000 рублей',
        'minDonation': 'Минимальная сумма пожертвования — 100 рублей',
        'name': 'Не корректно введено имя',
        'phoneNumber': 'Не корректно введён номер телефона'
    };

    /**
     * validates input
     * @param {Array.<string>} validations
     * @return {Array.<string>}
     */
    Validation.prototype.validate = function(value, validations) {
        var that = this;

        this.value_ = value;

        var failedValidations = validations.filter(
            function(validationType) {
                return that.doValidationType_(validationType);
            }
        );

        return {
            isValid: !failedValidations.length,
            failedValidations: failedValidations,
            errorMessageText: this.getErrorMessageText_(failedValidations)
        };
    };

    /**
     * Execute a validation of given type and returns true
     * if validation of given type not successful
     * @param {string} validationType
     * @private
     * @return {boolean}
     */
    Validation.prototype.doValidationType_ = function(validationType) {
        var validationFunction =
                this.validationHandlers_[validationType];

        return validationFunction ?
            !validationFunction.call(this, this.value_) : false;
    };

    /**
     * returns an array with the failed validations' error messages
     * @return {Array.<string>}
     * @private
     */
    Validation.prototype.getErrorMessageText_ = function(failedValidations) {
        var errorMessageText = '';

        failedValidations.forEach(function(type) {
            var errorMessage = Validation.ErrorMessages[type];
            errorMessageText += errorMessageText ? '. ' : ' ';
            errorMessageText += errorMessage;
        }, this);

        return errorMessageText;
    };

    /**
     * Validate digit
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateDigits_ = function(text) {

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
    Validation.prototype.validateMaxDonation_ = function(text) {
        var donationAmount = Number(text);
        return !(donationAmount > this.valueParams_.maxNumber);
    };

    /**
     * Validate min donation value
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateMinInput_ = function(text) {
        var inputAmount = Number(text);
        return !(inputAmount < this.valueParams_.minIncome);
    };

    /**
     * Validate digit
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateMinDonation_ = function(text) {
        var donationAmount = Number(text);
        return !(donationAmount < this.valueParams_.minDonation);
    };

    /**
     * Validate name
     * @param {string} name name to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateName_ = function(name) {
        name = name.trim();
        var nameRegex = new RegExp(
            '^[ёа-яА-Яa-zA-Z- ]{2,' + this.valueParams_.maxNumber + '}$'
        );

        return nameRegex.test(name);
    };

    /**
     * Validate phone number
     * @param {string} phoneNumber phone number to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validatePhoneNumber_ = function(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        var numberRegex = /^\+\d{11}$/;

        return numberRegex.test(phoneNumber);
    };

    /**
     * Validate emptyness
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateNotEmpty_ = function(text) {
        var isValid = false;
        if (text.trim()) {
            isValid = true;
        }
        return isValid;
    };

    /**
     * Validate email
     * @param {string} text text to validate
     * @return {boolean}
     * @private
     */
    Validation.prototype.validateEmail_ = function(text) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(text);
    };
});