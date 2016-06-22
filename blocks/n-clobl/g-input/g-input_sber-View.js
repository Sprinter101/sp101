goog.provide('sv.gInput.View');

goog.require('cl.gInput.View');



/**
 * Input View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gInput.View}
 */
sv.gInput.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gInput.View.CssClass.ROOT);
};
goog.inherits(sv.gInput.View, cl.gInput.View);


goog.scope(function() {
    var View = sv.gInput.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-input',
        INPUT: 'g-input__input',
        NOT_VALID: 'g-input_not-valid'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        BLUR: 'blur',
        INPUT: 'input-input',
        CHANGE: 'input-change'
    };

});  // goog.scope
