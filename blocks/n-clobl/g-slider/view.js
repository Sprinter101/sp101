goog.provide('sv.gSlider.View');

goog.require('cl.iControl.View');



/**
 * Slider View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.gSlider.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gSlider.View.CssClass.ROOT);
};
goog.inherits(sv.gSlider.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.gSlider.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-slider',
        DISABLED: 'g-slider_disabled'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        MOVE: 'slider-move',
    };

});  // goog.scope
