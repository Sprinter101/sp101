goog.provide('sv.gButton.Button');

goog.require('cl.gButton.Button');
goog.require('sv.gButton.View');



/**
 * Button control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gButton.Button}
 */
sv.gButton.Button = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    this.setAllowTextSelection(false);
};
goog.inherits(sv.gButton.Button, cl.gButton.Button);


goog.scope(function() {
    var Button = sv.gButton.Button,
        View = sv.gButton.View;

    /**
     * Event enum
     * @enum {string}
     */
    Button.Event = {
        CLICK: View.Event.CLICK,
        TOUCH_START: View.Event.TOUCH_START,
        TOUCH_END: View.Event.TOUCH_END
    };
});  // goog.scope
