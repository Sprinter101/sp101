goog.provide('sv.gSlider.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.dom.dataset');
goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('sv.iMedia.Media');



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

    /**
    * @type {number}
    * @private
    */
    this.left_ = 0;

    /**
    * @type {number}
    * @private
    */
    this.is_move_ = 0;

    /**
    * @type {number}
    * @private
    */
    this.currentPos_ = null;

    /**
    * @type {number}
    * @private
    */
    this.start_ = null;

    /**
    * @type {number}
    * @private
    */
    this.maxPercent_ = 0;
};
goog.inherits(sv.gSlider.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.gSlider.View,
        Media = sv.iMedia.Media,
        HIDDEN = sv.iUtils.Utils.CssClass.HIDDEN;
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

        var maxPercent = goog.dom.dataset.getAll(this.dom.track);
        this.maxPercent_ = parseInt(maxPercent.params, 10);

        var initValue = goog.dom.dataset.getAll(this.dom.thumb);
        initValue = parseInt(initValue.params, 10);
        this.init(initValue);

    };

     /**
    * set initial slider's value
    * @param {numbe} initValue
    */
    View.prototype.init = function(initValue) {
        this.currentPercent_ = initValue || 1;

        if (this.currentPercent_ === 1) {
            this.currentPos_ = 0;
        }
        else {
            this.currentPos_ = this.MakeInitialPosition_(initValue);
        }
        this.applyMovement_(initValue);

        this.dom.label.innerHTML = this.currentPercent_;
        goog.dom.classlist.remove(this.dom.thumb, HIDDEN);
        goog.dom.classlist.remove(this.dom.label, HIDDEN);
        goog.dom.classlist.remove(this.dom.label_percent, HIDDEN);
        this.left_ = this.currentPos_;
    };


     /**
     * calculates current donation percent
     * @param {number} initValue
     * @return {number} current position
     * @private
     */
    View.prototype.MakeInitialPosition_ = function(initValue) {
        var track_size = goog.style.getSize(this.dom.track).width;
        var currentPos = initValue / (this.maxPercent_ - 1) * track_size;
        currentPos = Math.floor(currentPos);
        if (currentPos >= track_size) {
            currentPos = track_size;
        }
        else if (currentPos < 1) {
            currentPos = 0;
        }
        return currentPos;
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
            this.onThumbFocus_
        )
        .listen(
            document,
            goog.events.EventType.MOUSEMOVE,
            this.onThumbMove_
        )
        .listen(
            document,
             goog.events.EventType.MOUSEUP,
             this.onThumbBlur_
        )
        .listen(
            this.dom.slider,
            goog.events.EventType.TOUCHSTART,
            this.onThumbFocus_
        )
        .listen(
            this.getElement(),
            goog.events.EventType.TOUCHMOVE,
            this.onThumbMove_
        )
        .listen(
            document,
             goog.events.EventType.TOUCHEND,
             this.onThumbBlur_
        );
    };

        /**
         * handles mousedown or touchstart event
         * @param {goog.events.EventType.MOUSEDOWN} event -
         * signal to start moving
         * @private
         */
        View.prototype.onThumbFocus_ = function(event) {
            this.is_move_ = 1;
            this.start_ = event.clientX;
        };

         /**
         * handles mousemove or touchmove event
         * by changing thumb left coordinates
         * @param {goog.events.EventType.MOUSEMOVE} event
         * @private
         */
        View.prototype.onThumbMove_ = function(event) {
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
                    var currentPercent = this.CalculatePercent_(
                        this.currentPos_);
                    currentPercent = Math.floor(currentPercent) + 1;
                    this.dom.label.innerHTML = currentPercent;
                    this.applyMovement_(currentPercent);
                    this.dispatchMoveEvent_(currentPercent);
                    this.currentPercent_ = currentPercent;
                }
        };

         /**
         * applies tranform translateX to thumb and label
         * @param {number} currentPercent
         * @private
         */
        View.prototype.applyMovement_ = function(currentPercent) {
            var percent_right_move;
            if (Media.isExtraSmall() || Media.isSmall()) {
                    percent_right_move = 12;
                }
            else {
                percent_right_move = 2;
            }
            this.dom.slider.style.transform = 'translateX(' +
                this.currentPos_ + 'px)';
                if (currentPercent > 9) {
                    this.dom.label.style.transform = 'translateX(-32px)';
                    this.dom.label_percent.style.transform = 'translateX(-' +
                        percent_right_move + 'px)';
                }
                else if (currentPercent <= 9) {
                    this.dom.label.style.transform = 'translateX(0)';
                    this.dom.label_percent.style.transform = 'translateX(0)';
                }
        };


         /**
         * dispatches view event with slider value
         * @param {number} currentPercent
         * @private
         */
        View.prototype.dispatchMoveEvent_ = function(currentPercent) {
            var customEvent = new goog.events.Event(View.Event
                .SLIDER_MOVE, this);

            customEvent.payload = { 'percent': currentPercent };
                this.dispatchEvent(customEvent);
        };

        /**
         * calculates current donation percent
         * @param {number} currentPos
         * @return {number} current percent value
         * @private
         */
        View.prototype.CalculatePercent_ = function(currentPos) {
            var currentPercent = currentPos / this.track_size *
                (this.maxPercent_ - 1);
            return currentPercent;
        };

        /**
         * handles mouseup or touchend event by stopping movement
         * @param {goog.events.EventType.MOUSEUP} event
         * @return {number}
         * @private
         */
         View.prototype.onThumbBlur_ = function(event) {
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
            return this.currentPercent_;
        };

         /**
         * enable slider
         * @param {Array<string>} classes -
         * css classes to manage disabled state
         */
        View.prototype.enable = function(classes) {
            if (goog.dom.classlist.contains(
                this.getElement(), View.CssClass.DISABLED)) {
                goog.dom.classlist.remove(
                    this.getElement(),
                    View.CssClass.DISABLED
                );
                this.getHandler().listen(
                    this.dom.slider,
                    goog.events.EventType.MOUSEDOWN,
                    this.onThumbFocus_
                )
                .listen(
                    this.getElement(),
                    goog.events.EventType.MOUSEMOVE,
                    this.onThumbMove_
                )
                .listen(
                    document,
                     goog.events.EventType.MOUSEUP,
                     this.onThumbBlur_
                )
                .listen(
                    this.dom.slider,
                    goog.events.EventType.TOUCHSTART,
                    this.onThumbFocus_
                )
                .listen(
                    this.getElement(),
                    goog.events.EventType.TOUCHMOVE,
                    this.onThumbMove_
                )
                .listen(
                    document,
                     goog.events.EventType.TOUCHEND,
                     this.onThumbBlur_
                );
            }
        };

        /**
         * disable slider
         * @param {Array<string>} classes -
         * css classes to manage disabled state
         */
        View.prototype.disable = function(classes) {
            if (!goog.dom.classlist.contains(
                this.getElement(), View.CssClass.DISABLED)) {
                goog.dom.classlist.add(
                    this.getElement(),
                    View.CssClass.DISABLED
                );

                this.getHandler().unlisten(
                    this.dom.slider,
                    goog.events.EventType.MOUSEDOWN,
                    this.onThumbFocus_
                )
                .unlisten(
                    this.getElement(),
                    goog.events.EventType.MOUSEMOVE,
                    this.onThumbMove_
                )
                .unlisten(
                    document,
                     goog.events.EventType.MOUSEUP,
                     this.onThumbBlur_
                )
                .unlisten(
                    this.dom.slider,
                    goog.events.EventType.TOUCHSTART,
                    this.onThumbFocus_
                )
                .unlisten(
                    this.getElement(),
                    goog.events.EventType.TOUCHMOVE,
                    this.onThumbMove_
                )
                .unlisten(
                    document,
                     goog.events.EventType.TOUCHEND,
                     this.onThumbBlur_
                );
            }
        };

});  // goog.scope
