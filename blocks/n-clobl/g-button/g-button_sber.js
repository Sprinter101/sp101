goog.provide('sv.gButton.Button');

goog.require('cl.gButton.Button');
goog.require('sv.gButton.View');



/**
 * Button control
 * @param {sv.gButton.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 * @constructor
 * @extends {cl.gButton.Button}
 */
sv.gButton.Button = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    this.setAllowTextSelection(true);
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
