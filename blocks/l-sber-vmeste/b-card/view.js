goog.provide('sv.lSberVmeste.bCard.View');

goog.require('cl.iControl.Control');



/**
 * sv.lSberVmeste.bCard.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.bCard.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCard.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCard.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bCard.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: 'view-card-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onCardClick_
        );
    };

    /**
     * Card click handler
     * @private
     */
    View.prototype.onCardClick_ = function() {
        this.dispatchEvent({
            type: View.Event.CLICK
        });
    };

});  // goog.scope
