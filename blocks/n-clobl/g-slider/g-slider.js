goog.provide('sv.gSlider.Slider');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sv.gSlider.View');



/**
 * Slider control
 * @param {sv.gSlider.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 * @constructor
 * @extends {cl.giConrol.Control}
 */
sv.gSlider.Slider = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * slider range
     * @type {Object}
     * @private
     */
    this.range_ = null;
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
        MOVE: View.Event.MOVE
    };

    /**
    * @override
    * @param {Element} element
    */
    Slider.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        /*this.range_ = this.getView().getDom().range;
        this.thumb_ = this.getView().getDom().thumb;
        this.label_ = this.getView().getDom().label;
        this.left_ = this.getView().getDom().left;*/
    };

     /**
    * @override
    */
    Slider.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    }

});  // goog.scope
