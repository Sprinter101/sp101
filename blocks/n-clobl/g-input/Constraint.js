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
    Constraint.prototype.check = function(key, currentValue, constraints) {
        var that = this;

        this.key_ = key;
        this.currentValue_ = currentValue;

        var failedConstraints = constraints.filter(
            function(constraintType) {
                return that.doConstraintType_(constraintType);
            }
        );

        return !failedConstraints.length;
    };

    /**
    * Executes a constraint of given type
    * and assigns the returned string to the input value
    * @private
    * @param {string} constraintType
    */
    Constraint.prototype.doConstraintType_ = function(constraintType) {
        var constraintFunction = this.constraintsHandlers[constraintType];

        return constraintFunction.call(this);
    };

    /**
     * Removes all non-numeric characters from the string
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.constraintDigitsOnly_ = function() {
        var regex = new RegExp(/[\D]/g);

        return regex.test(this.key_);
    };
    /**
     * Removes all non-phone-number characters from the string
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.constraintPhoneOnly_ = function(oldValue) {
        return oldValue.replace(/[.*!"@#$%^&;:?=()_[:space:]-]/g, '');
    };

    /**
     * Removes all extra characters
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.constraintCharactersLimit_ = function() {
        return (this.currentValue_.length >= this.valueParams_.maxCharacters)
    };

    /**
     * Removes zero if it's the only number in the Constraint.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.constraintNoLeadingZero_ = function(oldValue) {
        return oldValue.replace(/^0/, '');
    };

    /**
     * Remove extra characters from name.
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Constraint.prototype.constraintName_ = function(oldValue) {
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
    Constraint.prototype.constraintPhoneNumber_ = function(oldValue) {
        oldValue = oldValue.trim();
        var nameRegex = /.{1,}[+]/g;
        var nameRegex2 = /[^+\d]/g;

        if (oldValue == '') {
            return '+';
        }

        return oldValue.replace(nameRegex, '+').replace(nameRegex2, '');
    };
});