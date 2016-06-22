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
     * Possible constraint type handlers
     * @type {Object}
     */
    this.constraintsHandlers = {
        'digitsOnly': this.constraintDigitsOnly_
    }

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
     * Input handler
     */
    Input.prototype.onInput = function() {
        var that = this;

        this.params['constraints'].forEach(function(constraintType) {
                that.doConstraintType_(constraintType);
        });
        
    };

    /**
    * Executes a constraint of given type and assigns the returned string to the input value
    * @param {string} constraintType
    */
    Input.prototype.doConstraintType_ = function(constraintType) {
        var constraintFunction = this.constraintsHandlers[constraintType];

        var oldValue_ = this.getValue();
        var newValue_ = constraintFunction(oldValue_);

        this.setValue(newValue_);
    }

    /**
     * Removes all non-numeric characters from the string
     * @param {string} oldValue
     * @return {boolean}
     */
    Input.prototype.constraintDigitsOnly_ = function(oldValue) {
        return oldValue.replace(/[\D]/g, '');
    }

});  // goog.scope