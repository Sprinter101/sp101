goog.provide('sv.gInput.Constraint');



sv.gInput.Constraint = function() {

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
}

goog.scope(function() {
    var Constraint = sv.gInput.Constraint;

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
     * Removes all non-phone-number characters from the string
     * @private
     * @param {string} oldValue
     * @return {string}
     */
    Input.prototype.constraintPhoneOnly_ = function(oldValue) {
        return oldValue.replace(/[.*!"@#$%^&;:?=()_[:space:]-]/g, '');
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
}