goog.provide('sv.gButton.View');

goog.require('cl.gButton.View');



/**
 * Button View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gButton.View}
 */
sv.gButton.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gButton.View.CssClass.ROOT);
};
goog.inherits(sv.gButton.View, cl.gButton.View);


goog.scope(function() {
    var View = sv.gButton.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-button',
        DISABLED: 'g-button_disabled'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: 'button-click',
        TOUCH_START: 'button-touch-start',
        TOUCH_END: 'button-touch-end'
    };

});  // goog.scope
