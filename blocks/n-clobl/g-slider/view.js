goog.provide('sv.gSlider.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events.EventType');
goog.require('goog.style');



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
        ROOT: 'g-slider',
        DISABLED: 'g-slider_disabled',
        SLIDER: 'g-slider__slider',
        THUMB: 'g-slider__thumb',
        TRACK: 'g-slider__track',
        LABEL: 'g-slider__label',
        LABEL_PERCENT: 'g-slider__label_small'
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

        this.dom.track = this.getElementByClass(View.CssClass.TRACK);
        this.dom.thumb = this.getElementByClass(View.CssClass.THUMB);
        this.dom.label = this.getElementByClass(View.CssClass.LABEL);
        this.dom.label_percent = this.getElementByClass(
            View.CssClass.LABEL_PERCENT);
        this.dom.slider = this.getElementByClass(View.CssClass.SLIDER);

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
            this.dom.slider,
            goog.events.EventType.MOUSEDOWN,
            this.onThumbFocus
        )
        .listen(
            document,
            goog.events.EventType.MOUSEMOVE,
            this.onThumbMove
        )
        .listen(
            document,
             goog.events.EventType.MOUSEUP,
             this.onThumbBlur
        )
        .listen(
            this.dom.slider,
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
            this.track_size = goog.style.getSize(this.dom.track).width;
            if (this.is_move_ == 1) {
                var step = event.clientX - this.start_;
                this.currentPos_ = this.left_ + step;
                if (this.currentPos_ >= this.track_size) {
                    this.currentPos_ = this.track_size;
                }
                else if (this.currentPos_ < 1) {
                    this.currentPos_ = 0;
                }
                var currentPercent = this.CalculatePercent(this.currentPos_);
                currentPercent = Math.floor(currentPercent) + 1;
                this.dom.label.innerHTML = currentPercent;
                this.dom.slider.style.left = this.currentPos_ + 'px';
                if (currentPercent > 9) {
                    this.dom.label.style.left = '-37px';
                    this.dom.label_percent.style.left = '43px';
                }
               else if (currentPercent <= 9) {
                    this.dom.label.style.left = '-17px';
                    this.dom.label_percent.style.left = '28px';
                }
                this.dispatchMoveEvent(currentPercent);
            }
        };

         /**
         * dispatches view event with slider value
         * @param {number} currentPercent
         */
        View.prototype.dispatchMoveEvent = function(currentPercent) {
            var customEvent = new goog.events.Event(View.Event
                .SLIDER_MOVE, this);

            customEvent.payload = { 'percent': currentPercent };
                this.dispatchEvent(customEvent);
        };

        /**
         * calculates current donation percent
         * @param {number} delta_x
         * @return {number} current percent value
         */
        View.prototype.CalculatePercent = function(delta_x) {
            var currentPercent = delta_x / this.track_size * 14;
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

         /**
         * getter for slider value
         * @return {number} currentPercent
         */
        View.prototype.getValue = function() {
            return this.currentPercent;
        };

         /**
         * enable slider
         * @param {Array<string>} classes -
         * css classes to manage disabled state
         */
        View.prototype.enable = function(classes) {
            if (classes.indexOf(View.CssClass.DISABLED) == -1) {
                goog.dom.classlist.remove(
                    this.getElement(),
                    View.CssClass.DISABLED
                );
                this.getHandler().listen(
                    this.dom.slider,
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
                    this.dom.slider,
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
            }
        };

        /**
         * disable slider
         * @param {Array<string>} classes -
         * css classes to manage disabled state
         */
        View.prototype.disable = function(classes) {
            if (classes.indexOf(View.CssClass.DISABLED) == -1) {
                goog.dom.classlist.add(
                    this.getElement(),
                    View.CssClass.DISABLED
                );

                this.getHandler().unlisten(
                    this.dom.slider,
                    goog.events.EventType.MOUSEDOWN,
                    this.onThumbFocus
                )
                .unlisten(
                    this.getElement(),
                    goog.events.EventType.MOUSEMOVE,
                    this.onThumbMove
                )
                .unlisten(
                    document,
                     goog.events.EventType.MOUSEUP,
                     this.onThumbBlur
                )
                .unlisten(
                    this.dom.slider,
                    goog.events.EventType.TOUCHSTART,
                    this.onThumbFocus
                )
                .unlisten(
                    this.getElement(),
                    goog.events.EventType.TOUCHMOVE,
                    this.onThumbMove
                )
                .unlisten(
                    document,
                     goog.events.EventType.TOUCHEND,
                     this.onThumbBlur
                );
            }
        };

});  // goog.scope
