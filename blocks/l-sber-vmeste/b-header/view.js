goog.provide('sv.lSberVmeste.bHeader.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.lSberVmeste.bHeader.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeader.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bHeader.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bHeader.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        ARROW_BACK: 'g-icon_arrow-back'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ARROW_BACK_CLICK: 'arrow-back-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.arrowBack  = this.getElementByClass(
            View.CssClass.ARROW_BACK
        );

        };

    /**
     * Handles 'back' icon CLICK
     * @param {goog.events.BrowserEvent} event Click event
     * @protected
     */
    View.prototype.onArrowBackClick = function(event) {
        this.dispatchEvent({
             type: View.Event.ARROW_BACK_CLICK
         });
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.arrowBack,
            goog.events.EventType.CLICK,
            this.onArrowBackClick
        );
    };

});  // goog.scope
