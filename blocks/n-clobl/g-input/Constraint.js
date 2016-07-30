goog.provide('sv.gInput.Constraint');



sv.gInput.Constraint = function(valueParams) {

    /**
     * @type {string}
     */
    this.key_ = '';

    /**
     * @type {string}
     */
    this.currentValue_ = '';

    /**
     * @type {Boolean}
     * @private
     */
    this.keyCheckMode_ = false;

    /**
     * Possible constraint type handlers
     * @type {Object}
     */
    this.constraintsHandlers = {
        'digitsOnly': this.digitsOnly_,
        'charactersLimit': this.charactersLimit_,
        'noLeadingZero': this.noLeadingZero_,
        'name': this.name_,
        'phoneNumber': this.phoneNumber_
    };

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
}

goog.scope(function() {
    var Constraint = sv.gInput.Constraint;

    /**
     * 
     */
    Constraint.prototype.check = function(event, currentValue,
        constraints) {

        var that = this,
            failedConstraints;

        this.keyCheckMode_ = (event && event.event_.key);

        if (this.keyCheckMode_) {
            this.key_ = event.event_.key;

            if (!this.isKeyTypeable_(event.keyCode) || event.ctrlKey) {
                return true;
            }
        }

        this.currentValue_ = currentValue;

        failedConstraints = constraints.filter(
            function(constraintType) {
                return that.doConstraintType_(constraintType);
            }
        );

        if (this.keyCheckMode_) {
            return !failedConstraints.length;
        } else {
            return this.currentValue_;
        }
    };

    /**
    * Executes a constraint of given type
    * and assigns the returned string to the input value
    * @private
    * @param {string} constraintType
    */
    Constraint.prototype.doConstraintType_ = function(constraintType) {
        var constraintFunction =
            this.constraintsHandlers[constraintType];

        return constraintFunction.call(this);
    };

    /**
     * 
     */
    Constraint.prototype.isKeyTypeable_ = function(keyCode) {
        var keyCodes = goog.events.KeyCodes;

        var typeableKeys = [
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68,
            69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
            84, 85, 86, 87, 88, 89, 90, // 0-9 a-z
            keyCodes.SPACE, keyCodes.SEMICOLON, keyCodes.DASH,
            keyCodes.EQUALS, keyCodes.COMMA, keyCodes.PERIOD,
            keyCodes.SLASH, keyCodes.APOSTROPHE, keyCodes.TILDE,
            keyCodes.SINGLE_QUOTE, keyCodes.OPEN_SQUARE_BRACKET,
            keyCodes.BACKSLASH, keyCodes.CLOSE_SQUARE_BRACKET,
            keyCodes.NUM_ZERO, keyCodes.NUM_ONE, keyCodes.NUM_TWO,
            keyCodes.NUM_THREE, keyCodes.NUM_FOUR, keyCodes.NUM_FIVE,
            keyCodes.NUM_SIX, keyCodes.NUM_SEVEN, keyCodes.NUM_EIGHT,
            keyCodes.NUM_NINE, keyCodes.NUM_MULTIPLY, keyCodes.NUM_PLUS,
            keyCodes.NUM_MINUS, keyCodes.NUM_PERIOD,
            keyCodes.NUM_DIVISION
        ];

        return !!(typeableKeys.indexOf(keyCode) + 1);
    };

    /**
     * Removes all non-numeric characters from the string
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.digitsOnly_ = function() {
        var regex = new RegExp(/[\D]/g);

        if (this.keyCheckMode_) {
            return regex.test(this.key_);
        } else {
            this.currentValue_ = this.currentValue_.replace(regex, '');
            return;
        }
    };

    /**
     * Removes all extra characters
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.charactersLimit_ = function() {
        if (this.keyCheckMode_) {
            return (this.currentValue_.length >= this.valueParams_.maxCharacters);
        } else {
            this.currentValue_ = this.currentValue_.slice(0, this.valueParams_.maxCharacters);
            return;
        }
    };

    /**
     * Removes zero if it's the only number in the Constraint.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.noLeadingZero_ = function() {
        var regex = new RegExp(/^0+/g);

        if (this.keyCheckMode_) {
            return (regex.test(this.key_) && !this.currentValue_.length);
        } else {
            this.currentValue_ = this.currentValue_.replace(regex, '');
            return;
        }
    };

    /**
     * Remove extra characters from name.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.name_ = function() {
        var regexKey = new RegExp(/[^ёа-яА-Яa-zA-Z- ]/g);
        var regex = new RegExp(/^[\s-]+|[^ёа-яА-Яa-zA-Z- ]/g);

        if (this.keyCheckMode_) {
            return regexKey.test(this.key_);
        } else {
            this.currentValue_ = this.currentValue_.replace(regex, '');
            return;
        }
    };

    /**
     * Remove extra characters from phone number.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.phoneNumber_ = function() {
        var regexKey = new RegExp(/\D/g);
        var regexBeforePlusSign = new RegExp(/^[^+]/g);
        var regexEmptyString = new RegExp(/^$/g);

        if (this.keyCheckMode_) {
            return regexKey.test(this.key_);
        } else {
            this.currentValue_ = this.currentValue_
                .replace(regexBeforePlusSign, '')
                .replace(regexEmptyString, '+' + this.currentValue_);
            return;
        }
    };
});