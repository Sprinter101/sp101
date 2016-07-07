goog.provide('sv.gSlider.Slider');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sv.gSlider.View');



/**
 * sv.gSlider.Slider
 * @param {sv.gSlider.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper
 * @constructor
 * @extends {cl.giConrol.Control}
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
        PERCENT_SLIDER_MOVE: 'percent-slider-move'
    };

    /**
    * @override
    * @param {Element} element
    */
    Slider.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

    };

     /**
    * @override
    */
    Slider.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.SLIDER_MOVE,
            this.onSliderMove
        );
    };

    /**
    * dispatches event with current slider value
    * @param {View.Event.SLIDER_MOVE} event
    */
    Slider.prototype.onSliderMove = function(event) {
        var currentPercent = event.payload.percent;
         var customEvent = new goog.events.Event(Slider.Event
            .PERCENT_SLIDER_MOVE, this);

         customEvent.payload = { 'percent': currentPercent };
                this.dispatchEvent(customEvent);
    };

});  // goog.scope
