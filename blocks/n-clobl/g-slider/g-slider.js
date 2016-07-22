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
        SLIDER_MOVE: 'slider-move'
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
            this.onSliderMove_
        );
    };

    /**
    * dispatches event with current slider value
    * @param {View.Event.SLIDER_MOVE} event
    * @private
    */
    Slider.prototype.onSliderMove_ = function(event) {
        var currentPercent = event.payload.percent;
         var customEvent = new goog.events.Event(Slider.Event
            .SLIDER_MOVE, this);

         customEvent.payload = { 'percent': currentPercent };
                this.dispatchEvent(customEvent);
    };

    /**
     * slider enable
     */
    Slider.prototype.enable = function() {
        this.getView().enable();
    };

    /**
     * slider disable
     */
    Slider.prototype.disable = function() {
        this.getView().disable();
    };

     /**
     * returns slider current value
     * @return {number} value
     */
    Slider.prototype.getValue = function() {
       return this.getView().getValue();
    };

});  // goog.scope
