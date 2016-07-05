goog.provide('sv.gSlider.Slider');

goog.require('cl.iControl.Control');
goog.require('sv.gSlider.View');



/**
 * Slider control
 * @param {sv.gSlider.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 * @constructor
 * @extends {cl.giConrolt.Control}
 */
sv.gSlider.Slider = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.gSlider.Slider, cl.iControl.Control);


goog.scope(function() {
    var Slider = sv.gSlider.Slider,
        View = sv.gSlider.View;

    /**
     * Event enum
     * @enum {string}
     */
    Slider.Event = {
        MOVE: View.Event.MOVE,
    };

});  // goog.scope
