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
        MOVE: 'slider-move'
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

        this.start = null;
        this.is_move = 0;
        this.currentPos = 0;
        this.left = 0;
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
            this.onMouseDown
        )
        .listen(
            this.getElement(),
            goog.events.EventType.MOUSEMOVE,
            this.onMouseMove
        )
        .listen(
            document,
             goog.events.EventType.MOUSEUP,
             this.onMouseUp
        );
    };

        /**
         * handles mousedown event
         * @param {goog.events.EventType.MOUSEDOWN} event -
         * signal to start moving
         */
        View.prototype.onMouseDown = function(event) {
            this.is_move = 1;
            this.start = event.clientX;
        };

         /**
         * handles mousemove event by changing thumb left coordinates
         * @param {goog.events.EventType.MOUSEMOVE} event
         * @return {number}
         */
        View.prototype.onMouseMove = function(event) {
            var leftCoord = this.dom.thumb.style.left;
            if(this.is_move == 1) {
                var step = event.clientX - this.start;
                this.dom.label.innerHTML = step;
                this.currentPos = this.left + step;
                if (this.currentPos > 286) {
                    this.currentPos = 286;
                }
                else if (this.currentPos < 1) {
                    this.currentPos = 0;
                }
                this.dom.left.innerHTML = this.currentPos;
                this.dom.thumb.style.left = this.currentPos + 'px';
            }
            return leftCoord;
        };

        /**
         * handles mouseup event by stopping movement
         * @param {goog.events.EventType.MOUSEUP} event
         * @return {number}
         */
         View.prototype.onMouseUp = function(event) {
            this.is_move = 0;
            this.dom.thumb.style.left = this.currentPos + 'px';
            this.left = this.currentPos;
            document.onmousemove = null;
            this.dom.thumb.onmouseup = null;
            return this.currentPos;
         };
});  // goog.scope
