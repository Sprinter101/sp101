goog.provide('sv.gSlider.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.gSlider.View
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
        ROOT: 'g-slider_sber',
        DISABLED: 'g-slider_disabled',
        THUMB: 'g-slider__thumb',
        RANGE: 'g-slider__range',
        LABEL: 'g-slider__label',
        LEFT: 'g-slider__left'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        SLIDER_MOVE: 'slider-move'
    };

     /**
    * @override
    * @param {Element} element
    */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.range = this.getElementByClass(View.CssClass.RANGE);
        this.dom.thumb = this.getElementByClass(View.CssClass.THUMB);
        this.dom.label = this.getElementByClass(View.CssClass.LABEL);
        this.dom.left = this.getElementByClass(View.CssClass.LEFT);

        this.start_ = null;
        this.is_move_ = 0;
        this.currentPos_ = 0;
        this.left_ = 0;
    };


     /**
    * @override
    */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.dom.thumb.ondragstart = function() {
            return false;
        };

        this.getHandler().listen(
            this.dom.thumb,
            goog.events.EventType.MOUSEDOWN,
            this.onThumbFocus
        )
        .listen(
            this.getElement(),
            goog.events.EventType.MOUSEMOVE,
            this.onThumbMove
        )
        .listen(
            document,
             goog.events.EventType.MOUSEUP,
             this.onThumbBlur
        )
        .listen(
            this.dom.thumb,
            goog.events.EventType.TOUCHSTART,
            this.onThumbFocus
        )
        .listen(
            this.getElement(),
            goog.events.EventType.TOUCHMOVE,
            this.onThumbMove
        )
        .listen(
            document,
             goog.events.EventType.TOUCHEND,
             this.onThumbBlur
        );
    };

        /**
         * handles mousedown or touchstart event
         * @param {goog.events.EventType.MOUSEDOWN} event -
         * signal to start moving
         */
        View.prototype.onThumbFocus = function(event) {
            this.is_move_ = 1;
            this.start_ = event.clientX;
        };

         /**
         * handles mousemove or touchmove event
         * by changing thumb left coordinates
         * @param {goog.events.EventType.MOUSEMOVE} event
         */
        View.prototype.onThumbMove = function(event) {
            var customEvent = new goog.events.Event(View.Event
            .SLIDER_MOVE, this);

            if (this.is_move_ == 1) {
                var step = event.clientX - this.start_;
                this.dom.label.innerHTML = step;
                this.currentPos_ = this.left_ + step;
                if (this.currentPos_ > 286) {
                    this.currentPos_ = 286;
                }
                else if (this.currentPos_ < 1) {
                    this.currentPos_ = 0;
                }
                var currentPercent = this.CalculatePercent(this.currentPos_);
                currentPercent = Math.floor(currentPercent) + 1;
                this.dom.left.innerHTML = currentPercent;
                this.dom.thumb.style.left = this.currentPos_ + 'px';
                customEvent.payload = { 'percent': currentPercent };
                this.dispatchEvent(customEvent);
            }
        };

        /**
         * calculates current donation percent
         * @param {number} delta_x
         * @return {number} current percent value
         */
        View.prototype.CalculatePercent = function(delta_x) {
            var currentPercent = delta_x / 286 * 14;
            return currentPercent;
        };

        /**
         * handles mouseup or touchend event by stopping movement
         * @param {goog.events.EventType.MOUSEUP} event
         * @return {number}
         */
         View.prototype.onThumbBlur = function(event) {
            this.is_move_ = 0;
            this.dom.thumb.style.left = this.currentPos_ + 'px';
            this.left_ = this.currentPos_;
            document.onmousemove = null;
            this.dom.thumb.onmouseup = null;
            return this.currentPos_;
         };

});  // goog.scope
